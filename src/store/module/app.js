import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from '@/libs/util'
import { saveErrorLogger } from '@/api/data'
import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}
export default {
  state: {
    breadCrumbList: [],
    crumbList: {},
    tagNavList: [],
    homeRoute: {},
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    getRoleType: (state, getters, rootState) => rootState.user.RoleType,
    errorCount: state => state.errorList.length
  },
  mutations: {
    setCrumbList(state, crmItemPar) {
      //获取历史路由
      let arrPar = Object.keys(state.crumbList)
      //判断路由是否假面包屑
      if (crmItemPar.parent === 'parent_lzy') {
        state.crumbList = {}
      }else {
        //当前===历史
        if (arrPar[0] === crmItemPar.parent) {
          let i = 0
          let wc= 0 
          let tempArra = []
          //当前路由是否在历史路由里
          state.crumbList[crmItemPar.parent].forEach((ii,indexs) => {
            if (ii.name === crmItemPar.route.name) {
              i++ 
              wc = indexs
            }
            tempArra.push(ii.name)
          })
          //i ===0 新路由
          if (i === 0) {
            if(!tempArra.includes(crmItemPar.route.name)){
              state.crumbList[crmItemPar.parent].push(crmItemPar.route)
            }
          }else{
            //有重复 >2 根据重复wc截取
            if(state.crumbList[crmItemPar.parent].length!==2){
              if(wc===0){
                state.crumbList[crmItemPar.parent] = state.crumbList[crmItemPar.parent].slice(0,1)
              }else{
                state.crumbList[crmItemPar.parent] = state.crumbList[crmItemPar.parent].slice(0,wc+1)
              }
              
            }else if(state.crumbList[crmItemPar.parent].length===2 && wc===0){
              //有重复 ===2 wc===0  截取1
              state.crumbList[crmItemPar.parent] = state.crumbList[crmItemPar.parent].slice(0,1)
            }
            // state.crumbList[crmItemPar.parent] = state.crumbList[crmItemPar.parent].slice(0,i)
          }

        } else {
          if (arrPar[0]) {
            if(crmItemPar.route.name === crmItemPar.route.meta.crumb){
              delete state.crumbList[arrPar[0]]
              state.crumbList[crmItemPar.parent] = [crmItemPar.route]
            }else{
              crmItemPar.route.meta.crumb = arrPar[0]
              state.crumbList[arrPar[0]].push(crmItemPar.route)
            }
            
          } else {
            state.crumbList[crmItemPar.parent] = [crmItemPar.route]
          }
        }
      }
      sessionStorage.setItem("crmItemPar_lzy", JSON.stringify(state.crumbList))
    },
    setChuShiCrumb(state) {
      let list = sessionStorage.getItem("crmItemPar_lzy")
      if (list) {
        state.crumbList = JSON.parse(list)
      } else {
        state.crumbList = {}
      }
    },
    setBreadCrumb(state, route) {
      state.breadCrumbList =  getBreadCrumbList(route, state.homeRoute, state.crumbList,state.breadCrumbList) //res
    },
    setHomeRoute(state, routes) {
      let len = sessionStorage.getItem("RoleType_indexs")
      state.homeRoute = getHomeRoute(routes, homeName(len))
    },
    setTagNavList(state, list) {
      let len = sessionStorage.getItem("RoleType_indexs")
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName(len)) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName(len))
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag(state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag(state, { route, type = 'unshift' }) {
      let len = sessionStorage.getItem("RoleType_indexs")
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName(len)) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal(state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    addError(state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus(state, status = true) {
      state.hasReadErrorPage = status
    }
  },
  actions: {
    addErrorLog({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
      const { user: { token, userId, userName } } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
      saveErrorLogger(info).then(() => {
        commit('addError', data)
      })
    }
  }
}
