import {
    getAllParamsClass,
    getParamByClassCode,
    delClassById,
    deleteSubClass,
    editClass,
    editSubClass,
    addNewClass,
    addNewSubClass,
    sortSubClass,
    getUserList,
    getUserInfoById,
    updateOrDelUserInfo,
    addUserInfo,
    roleAuth,
    getUserRoleList,
    editUserRegion,
    delUserRole,
    getUserOperationLog,
    importUserList,
    exportUserOperationLog,
    getRoleList,
    addRole,
    delRole,
    getRoleById,
    updateRole,
    getUserListByRoleId,
    delUserRole2,
    getCustomerList,
    getCollegeAndMajor,
    getTeacherContactr,
    getMailList,
    addNewCollege,
    editCollegeById,
    deleteCollegeById
} from '@/api/user'
import { getPage, setPage } from '@/libs/util'
export default {
    state: {
        parentDate: [], //主数据
        childDate: [],//子数据
        stateG: 1,//默认第一个
        thisParentPage: getPage('thisParentPage'),//主当前选中页码
        thisChildPage: getPage('thisChildPage'),//子当前选中页码
        thisParenPageTotal: getPage('thisParenPageTotal'),
        thisChildPageTotal: getPage('thisChildPageTotal'),
        teacherObj:{},
        projectListXh:0,
        professionalList:[],
        teacherList:[],
        agentList:[]
    },
    actions: {
        async getAllParamsClass({ commit, state }, params) {
            let parnet = await getAllParamsClass(params)
            let { data, page, pageTotal } = parnet
            commit("setParentDate", data) //执行保存列表数据
            commit("setThisParentPage", page) //执行保存页码
            commit("setThisParentPageTotal", pageTotal) //执行保存条数
            return { data, page, pageTotal }
        },
        async  getParamByClassCode({ commit, state }, params) {
            let child = await getParamByClassCode(params)
            let { data, page, pageTotal } = child
            commit("setChildDate", data) //执行保存列表数据
            commit("setThisChildPage", page) //执行保存页码
            commit("setThisChildPageTotal", pageTotal) //执行保存条数
            return { data, page, pageTotal }
        },
        async delClassById({ commit, state }, params) {
            let deleteInId = await delClassById(params)
            if (deleteInId === null) {
                return { message: "删除成功！！！" }
            }

        },
        async deleteSubClass({ commit, state }, params) {
            let deleteInId = await deleteSubClass(params)
            if (deleteInId === null) {
                return { message: "删除成功！！！" }
            }

        },
        async editClass({ commit, state }, params) {
            let deleteInId = await editClass(params)
            if (deleteInId === null) {
                return { message: "编辑成功！！！" }
            }

        },
        async editSubClass({ commit, state }, params) {
            let deleteInId = await editSubClass(params)
            if (deleteInId === null) {
                return { message: "编辑成功！！！" }
            }
        },
        async addNewClass({ commit, state }, params) {
            let deleteInId = await addNewClass(params)
            if (deleteInId === null) {
                return { message: "新增成功！！！" }
            }

        },
        async addNewSubClass({ commit, state }, params) {
            let deleteInId = await addNewSubClass(params)
            if (deleteInId === null) {
                return { message: "新增成功！！！" }
            }
        },
        async sortSubClass({ commit, state }, params) {
            let deleteInId = await sortSubClass(params)
            if (deleteInId === null) {
                return { message: "操作成功！！！" }
            }
        },
        async getUserList({ commit, state }, params) {
            let parnet = await getUserList(params)
            let { data, page, pageTotal } = parnet
            commit("setParentDate", data) //执行保存列表数据
            commit("setThisParentPage", page) //执行保存页码
            commit("setThisParentPageTotal", pageTotal) //执行保存条数
            return { data, page, pageTotal }
        },
        async getUserInfoById({ commit, state }, params){
            let deleteInId = await getUserInfoById(params)
            return {data:deleteInId}
        },
        async updateOrDelUserInfo({ commit, state }, data){
            let deleteInId = await updateOrDelUserInfo(data)
            if (deleteInId === null) {
                return { message: "操作成功！！！" }
            }
        },
        async addUserInfo({ commit, state }, data){
            let deleteInId = await addUserInfo(data)
            return {Id:deleteInId,message:"操作成功！！！"}
        },
        async roleAuth({ commit, state }, data){
            let deleteInId = await roleAuth(data)
            if (deleteInId === null) {
                return { message: "操作成功！！！" }
            }
        },
        async getUserRoleList({ commit, state }, data1){
            let parnet = await getUserRoleList(data1)
            let { data, page, pageTotal } = parnet
            commit("setParentDate", data) //执行保存列表数据
            commit("setThisParentPage", page) //执行保存页码
            commit("setThisParentPageTotal", pageTotal) //执行保存条数
            return { data, page, pageTotal }
        },
        async editUserRegion({ commit, state }, data){
            let deleteInId = await editUserRegion(data)
            if (deleteInId === null) {
                return { message: "操作成功！！！" }
            }
        },
        async delUserRole({ commit, state }, data){       
            let deleteInId = await delUserRole(data)
            if (deleteInId === null) {
                return { message: "操作成功！！！" }
            }
        },
        async getUserOperationLog({ commit, state }, data1){
            let parnet = await getUserOperationLog(data1)
            let { data, page, pageTotal } = parnet
            commit("setParentDate", data) //执行保存列表数据
            commit("setThisParentPage", page) //执行保存页码
            commit("setThisParentPageTotal", pageTotal) //执行保存条数
            return { data, page, pageTotal }
        },
        async importUserList({ commit, state }, data){
            let deleteInId = await importUserList(data)
            return  { message: deleteInId }
        },
        async exportUserOperationLog({ commit, state }, data){
            let deleteInId = await exportUserOperationLog(data)
            return  { path: deleteInId }
        },
        async getRoleList({ commit, state }, data1){
            let parnet = await getRoleList(data1)
            let { data, page, pageTotal } = parnet
            commit("setParentDate", data) //执行保存列表数据
            commit("setThisParentPage", page) //执行保存页码
            commit("setThisParentPageTotal", pageTotal) //执行保存条数
            return { data, page, pageTotal }
        },
        async addRole({ commit, state }, data){
            let deleteInId = await addRole(data)
            if (deleteInId === null) {
                return { message: "操作成功！！！" }
            }
        },
        async delRole({ commit, state }, data){
            let deleteInId = await delRole(data)
            if (deleteInId === null) {
                return { message: "操作成功！！！" }
            }
        },
        async getRoleById({ commit, state }, data1){
            let parnet = await getRoleById(data1)
            return parnet
        },
        async updateRole({ commit, state }, data){
            let deleteInId = await updateRole(data)
            if (deleteInId === null) {
                return { message: "操作成功！！！" }
            }
        },
        async getUserListByRoleId({ commit, state }, data1){
            let parnet = await getUserListByRoleId(data1)
            let { data, page, pageTotal } = parnet
            commit("setParentDate", data) //执行保存列表数据
            commit("setThisParentPage", page) //执行保存页码
            commit("setThisParentPageTotal", pageTotal) //执行保存条数
            return { data, page, pageTotal }
        },
        async delUserRole2({ commit, state }, data1){
            let deleteInId = await delUserRole2(data1)
            if (deleteInId === null) {
                return { message: "操作成功！！！" }
            }
        },
        async getCustomerList({ commit, state }, data1){
            let parnet = await getCustomerList(data1)
            let { data, page, pageTotal } = parnet
            return { data, page, pageTotal }
        },
        async getCollegeAndMajor({ commit, state }, data1){
            let parnet = await getCollegeAndMajor(data1)
            commit('setTeacherObj',parnet)
            let data = parnet
            return data
        },
        async getTeacherContactr({ commit, state }, data1){
            let parnet = await getTeacherContactr(data1)
            let data = parnet
            return data
        },
        async getMailList({ commit, state }, data1){
            let parnet = await getMailList(data1)
            let data = parnet
            return data
        },
        async addNewCollege({ commit, state }, data1){
            let parnet = await addNewCollege(data1)
            let data = parnet
            return data
        },
        async editCollegeById({ commit, state }, data1){
            let parnet = await editCollegeById(data1)
            let data = parnet
            return data
        },
        async addNewMajor({ commit, state }, data1){
            let parnet = await addNewMajor(data1)
            let data = parnet
            return data
        },
    
    },
    mutations: {
        //
        setProfessionalListAnch(state, professionalList){
            state.professionalList = professionalList
        },
        setTeacherList(state, teacherList){
            state.teacherList = teacherList
        },
        setAgentList(state, agentList){
            state.agentList = agentList
        },
        //存储父列表数据
        setParentDate(state, parentDate) {
            state.parentDate = parentDate
        },
        //存储子列表数据
        setChildDate(state, childDate) {
            state.childDate = childDate
        },
        //设置默认选中数据
        setStateG(state, stateG) {
            state.stateG = stateG
        },
        //存储父页码
        setThisParentPage(state, thisParentPage) {
            setPage("thisParentPage", thisParentPage)
            state.thisParentPage = thisParentPage
        },
        //存储子页码
        setThisChildPage(state, thisChildPage) {
            setPage("thisChildPage", thisChildPage)
            state.thisChildPage = thisChildPage
        },
        //存储父总条数
        setThisParentPageTotal(state, thisParenPageTotal) {
            setPage("thisParenPageTotal", thisParenPageTotal)
            state.thisParenPageTotal = thisParenPageTotal
        },
        //存储子总条数
        setThisChildPageTotal(state, thisChildPageTotal) {
            setPage("thisChildPageTotal", thisChildPageTotal)
            state.thisChildPageTotal = thisChildPageTotal
        },
        setProjectListXh(state,projectListXh){
            state.projectListXh = projectListXh
        },
        setTeacherObj(state,teacherObj){
            
            let obj = {}
            teacherObj.forEach(element => {
                obj[element.CMId] = element.CollegeName
            });
            state.teacherObj = obj
        }
        
    },
    getters: {
        getCollegeNameInCMid: state => state.teacherObj,
        getProfessionalList: state => state.professionalList,
        getTeacherList: state => state.teacherList,
        getAgentList: state => state.agentList
    },
}