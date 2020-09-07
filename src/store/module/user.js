import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount
} from '@/api/user'
import { setToken, getToken,setSecret,getSecret ,getUserId,setUserId ,setLoginNo,getLoginNo,getFullName,setFullName } from '@/libs/util'

export default {
  state: {
    userId:getUserId(),// 用户ID
    loginNo:getLoginNo(),//登录账号
    JobNumber:'',//工号
    FullName:getFullName(),//姓名
    token:getToken(),
    secret_key:getSecret(),//秘钥
    hasGetInfo: false,
    avatarImgPath: '',
    access:[],
    roleS:[],
    detailControl:{},
    RoleId:"",
    RoleType:"",
    UserProvince:"",
    userInFo:[],//userInfoapi 数据
    PState:0,
    clickPstate:0,
    searchInPageObj:{},
    /*userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    secret_key: '',
    access: '',
    hasGetInfo: false,
    roleS:[],*/
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {},

  },
  mutations: {
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setLoginNo (state, loginNo) {
      state.loginNo = loginNo
      setLoginNo(loginNo)
    },
    setId (state, id) {
      state.userId = id
      setUserId(id)
    },
    setJobNumber (state, JobNumber) {
      state.JobNumber = JobNumber
    },
    setSecret_key (state, secret_key) {
      state.secret_key = secret_key
      setSecret(secret_key)
    },
    setSearchInPageObj(state,searchInPageObj){
      state.searchInPageObj = searchInPageObj
    },
    setFullName (state, FullName) {
      state.FullName = FullName
      setFullName(FullName)
    },
    setAccess (state, access) {
      state.access = access
    },
    setPState(state, PState){
      state.PState = PState
    }, //clickPstate
    setClickPstate(state, clickPstate){
      state.clickPstate = clickPstate
    },
    setRoleS(state, roleS){
      state.roleS = roleS
    },
    setDetailControl(state, detailControl){
      state.detailControl = detailControl
    },
    // 权限 角色Id
    setRoleId (state, RoleId) {
      state.RoleId = RoleId
    },
    //角色的类型
    setRoleType (state, RoleType) {
      state.RoleType = RoleType
    },
    //所有角色的集合
    setUserInFo (state, userInFo) {
      state.userInFo = userInFo
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    // 秘钥
    setKey (state, secret_key) {
      state.secret_key = secret_key
      setKey(secret_key)
    },
    setUserProvince(state,UserProvince){
      state.UserProvince = UserProvince
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    },
    // 登录账号
    setloginNo (state, setloginNo) {
      state.setloginNo = setloginNo
      setKey(setloginNo)
    },
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length,
    userNameGet: state => state.FullName
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res;
          commit('setToken', data.token)
          commit('setLoginNo', data.loginNo)
          commit('setId', data.Id)
          commit('setJobNumber', data.JobNumber)
          commit('setSecret_key', data.secret_key)
          commit('setFullName', data.FullName)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        setToken('')
        resolve()
        /*logout(state.token).then(() => {
          resolve()
        }).catch(err => {
          reject(err)
        })*/
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res
            let userObj = {"1":"admin","2":"customer","3":"marke",}
            let access = []
            let roles = []
            if(sessionStorage.getItem("loginAccess")===null){
              sessionStorage.setItem("loginAccess","0")
            }
            let index = Number(sessionStorage.getItem("loginAccess"));
            if(data[index]===undefined){
              sessionStorage.setItem("loginAccess","0")
              index = 0
            }
            let detailControl = {}
            data.forEach(element => {
              detailControl = {}
              access = element.RoleList.map((item) => {
                let strArray = item.DetailControl?item.DetailControl.split("-"):[]
                let insertBool = strArray[1]==='1'?true : false
                let deleteBool = strArray[3]==='1'?true : false
                let selectBool = strArray[0]==='1'?true : false
                let updateBool = strArray[2]==='1'?true : false
                let startBool = false
                let lixiangBool = false
                let updateDistory = false
                let ProjectRollback =  false
                if(item.RoleJurisdiction==="1"){
                  startBool = strArray[4] === '1'?true : false
                  if(element.RoleType==2){
                    updateDistory =  strArray[5] === '1'?true : false
                    ProjectRollback =  strArray[6] === '1'?true : false
                  }else{
                    lixiangBool = strArray[5] === '1'?true : false
                    updateDistory =  strArray[6] === '1'?true : false
                    ProjectRollback =  strArray[7] === '1'?true : false
                  }
                }else if(item.RoleJurisdiction==="2"){
                  if(element.RoleType==2){
                    updateDistory =  strArray[4] === '1'?true : false
                  }else{
                    lixiangBool = strArray[4] === '1'?true : false
                    updateDistory =  strArray[5] === '1'?true : false
                  }
                  
                }
                detailControl[item.RoleJurisdiction] = {insertBool,deleteBool,selectBool,updateBool,startBool,lixiangBool,updateDistory}
                if(element.RoleType==='2' &&  (item.RoleJurisdiction==='12' || item.RoleJurisdiction===12) ){
                  return undefined
                }else{
                  return Number(item.RoleJurisdiction)
                }
               
               }
              ).filter(r => r)
              access.unshift(userObj[element.RoleType])
              if(state.loginNo==="dyadmin"){
                access.unshift('dyadmin')
              }
              roles.push({name:element.RoleTypeName,roleName:element.RoleName,access,detailControl})
            });
            sessionStorage.setItem("RoleType_indexs",data[index].RoleType)
            commit('setDetailControl', roles[index].detailControl)
            commit('setUserProvince', data[index].UserProvince)
            commit('setUserInFo', data)
            // let access=data.RoleList.map((item) => Number(item.RoleJurisdiction))
            // access.unshift(userObj[data.RoleTypeName])
            // let roles = [{name:data.RoleTypeName,access}]
            commit('setAvatar', "https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png")
            commit('setAccess', roles[index].access)
            commit('setHasGetInfo', true)
            commit('setRoleS', roles)//全部角色
            commit('setRoleId', data[index].RoleId)
            commit('setRoleType', data[index].RoleType)
            resolve({access:roles[index].access})
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({ state, commit }) {
      getUnreadCount().then(res => {
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const { unread, readed, trash } = res.data
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data
            commit('updateMessageContentStore', { msg_id, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreTrash ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
