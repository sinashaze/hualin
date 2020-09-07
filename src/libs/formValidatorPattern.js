/*
 * @Author: 李振宇
 * @Date: 2020-05-29 13:36:15
 * @LastEditTime: 2020-08-07 14:28:08
 * @LastEditors: Please set LastEditors
 * @Description: 基础  验证
 * @FilePath: \CRM_ADMIN_PRO\src\libs\formValidatorPattern.js
 */
import common from './common.js'
const formValidator = {
    integer:{ pattern: /^[1-9]\d*$/, message: '该字段为整数', trigger: 'blur',label:"正整数" },
    mobile:{ pattern: /^[1][0-9][0-9]{9}$/, message: '该字段为手机号', trigger: 'blur',label:"手机号" },
    tell:{ pattern: /\d{3}-\d{8}|\d{4}-\d{7}/, message: '该字段为电话号', trigger: 'blur',label:"电话号" },
    chinese:{ pattern: /^[\u4e00-\u9fa5]*$/, message: '该字段为中文', trigger: 'blur',label:"中文" },
    idcard:{ pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '该字段为身份证号', trigger: 'blur',label:"身份证号" },
    shuziandmu:{ pattern: /^[A-Za-z0-9]*$/, message: '该字段为数字和字母', trigger: 'blur',label:"数字和字母" },
    zipcode:{ pattern: /[1-9]\d{5}(?!\d)/, message: '该字段为邮政编码', trigger: 'blur',label:"邮政编码" },
    decimal:{ pattern: /^(-?\d+)(\.\d+)?$/, message: '该字段为浮点数', trigger: 'blur',label:"浮点数" },
    hascode:{ pattern: /([a-z A-Z ]|[^\u0000-\u00FF])/, message: '该字段至少一个字符', trigger: 'blur',label:"至少一个字符" },
    tdate:{ pattern: /^(\d{1,4})-(\d{1,2})-(\d{1,2})$/, message: '该字段为日期格式', trigger: 'blur',label:"日期格式" },
    english:{ pattern: /^[a-zA-Z]*$/, message: '该字段为英文', trigger: 'blur',label:"英文" },
    number:{ pattern: /^[0-9]*$/, message: '该字段为纯数字', trigger: 'blur',label:"纯数字" },
    email:{ pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, message: '该字段为邮箱号', trigger: 'blur',label:"邮箱号" },
    lenValid:(str, num, cb) => {
        if(str){
            let len = common.getLen(str)
            if(len > num){
                return cb(new Error(`长度不能超过${num}字符`))
            }
        }
        cb()
    } 
}

export default formValidator