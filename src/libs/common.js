// import BMF from "browser-md5-file";
// var download = require("downloadjs");
const commonFun = {
  /*
    十六进制颜色随机
  */
  color16() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
  },
  /*
    rgb颜色随机
  */
  rgb() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = "(" + r + "," + g + "," + b + ")";
    return rgb;
  },
  /*
    LoRaWAN EUI 参数格式化
  */
  lorawanParamFormat(str, strs, len = 0) {
    switch (strs) {
      case "devEUI":
        len = 16;
        break;
      case "gwID":
        len = 16;
        break;
      case "mcEUI":
        len = 16;
        break;
      case "appEUI":
        len = 16;
        break;
      case "devAddr":
        len = 8;
        break;
      case "appKey":
        len = 32;
        break;
      case "appSKey":
        len = 32;
        break;
      case "nwkSKey":
        len = 32;
        break;
    }
    if (str.length === len && commonFun.str16Sw(str)) {
      str = str;
    } else if (str.length === len + (len / 2 - 1)) {
      if (
        str.indexOf("-") != -1 &&
        commonFun.str16Sw(commonFun.clearReplace(str, "-", 2))
      ) {
        str = commonFun.clearReplace(str.toLowerCase(), "-", 2);
      } else if (
        str.indexOf(":") != -1 &&
        commonFun.str16Sw(commonFun.clearReplace(str, ":", 2))
      ) {
        str = commonFun.clearReplace(str.toLowerCase(), ":", 2);
      } else {
        str = false;
      }
    } else {
      str = false;
    }
    return str;
  },
  /*
    清除字符串左右空格
  */
  trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  },
  /*
    首字母大写
  */
  titleCase(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
  },
  /*
    删除数组中需要删除的项
  */
  deleteArrNeedItem(rawArr, deleteArr) {
    for (let key in rawArr) {
      deleteArr.indexOf(rawArr[key]) > -1 && delete rawArr[key];
    }
    return commonFun.arrTrim(rawArr);
  },
  /*
    随机生成字母
  */
  getRanLetter(nums) {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = [];
    for (let i = 0; i < nums; i++) {
      let ranNum = Math.ceil(Math.random() * 52);
      result.push(chars[ranNum]);
    }
    return result.join("");
  },
  /* 十六进制字符串转二进制字符串 */
  Str2Bytes(str) {
    var pos = 0;
    var len = str.length;
    if (len % 2 != 0) {
      return null;
    }
    len /= 2;
    var hexA = [];
    for (var i = 0; i < len; i++) {
      var s = str.substr(pos, 2);
      var v = parseInt(s, 16);
      var hexArr = [];
      while (v != 0) {
        var temp = v % 2;
        hexArr.push(temp);
        v = parseInt(v / 2);
      }
      let strs = hexArr.reverse().join("");
      hexA.push(commonFun.createNumsStr(8 - strs.length, "0") + strs);
      pos += 2;
    }
    return hexA;
  },
  /*
    运行时长
  */
  runningTime(Time) {
    var days = Math.floor(Time / (24 * 60 * 60));
    var day_ms = Time % (24 * 60 * 60);
    var hours = Math.floor(day_ms / (60 * 60));
    var day_hour = day_ms % (60 * 60);
    var minutes = Math.floor(day_hour / 60);
    var day_min = day_hour % 60;
    var seconds = Math.round(day_min);
    return days + "D " + hours + "H " + minutes + "M " + seconds + "S";
  },
  /*
    选中的文本
  */
  getSelectedText() {
    if (window.getSelection) {
      return window.getSelection().toString();
    } else if (document.selection) {
      return document.selection.createRange().text;
    }
    return "";
  },
  /*
    根据URL下载文件
  */
  //   downloadUrlFile(url) {
  //     download(url);
  //   },
  /*
    取文件的hax MD5 值
  */
  //   getFileHaxMD5(file) {
  //     const bmf = new BMF();
  //     let fileMd5 = "";
  //     return new Promise(function(resolve, reject) {
  //       bmf.md5(
  //         file,
  //         (err, md5) => {
  //           err ? reject(err) : resolve(md5);
  //         },
  //         progress => {
  //           console.log("progress number:", progress);
  //         }
  //       );
  //     });
  //   },
  /*
    lorawan base64 解析函数集合
  */
  lorawanBase64Analysis(obj) {
    return commonFun.addReplace(
      commonFun
        .clearReplace(
          commonFun.clearReplace(
            commonFun.clearReplace(
              commonFun.hexTostring(
                commonFun.CharToHex(commonFun.base64Decode(obj))
              ),
              "\r"
            ),
            "\n"
          ),
          " "
        )
        .toUpperCase(),
      2,
      " "
    );
  },
  /*
    俩个json合并成一个json
  */
  mergeJsonObject: function (jsonbject1, jsonbject2) {
    var resultJsonObject = {};
    for (var attr in jsonbject1) {
      resultJsonObject[attr] = jsonbject1[attr];
    }
    for (var attr in jsonbject2) {
      resultJsonObject[attr] = jsonbject2[attr];
    }
    return resultJsonObject;
  },
  /*
        创建位数字符串
  */
  createNumsStr(nums, str) {
    let strs = "";
    for (let i = 0; i < nums; i++) {
      strs += str;
    }
    return strs;
  },
  /*
    判断俩个数组是否全等
    */
  equalsArr(arr1, arr2) {
    if (!arr1 || !arr2) return false;
    if (arr1.length != arr2.length) return false;
    for (var i = 0, l = arr1.length; i < l; i++) {
      if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
        if (!arr1[i] == arr2[i]) return false;
      } else if (arr1[i] != arr2[i]) {
        return false;
      }
    }
    return true;
  },
  /*
    判断俩个数据内容是否相同 不包含顺序
  */
  judgeArrContent(arr1, arr2) {
    let flag = true;
    if (arr1.length !== arr2.length) {
      flag = false;
    } else {
      arr1.forEach(item => {
        if (arr2.indexOf(item) === -1) {
          flag = false;
        }
      });
    }
    return flag;
  },
  /*
        url检查
    */
  urlExamine(str) {
    // var match = /^(https|http)?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d{1,5})?$/;
    var match = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
    return match.test(str);
  },
  /*
        string按位增加字符
    */
  addReplace: function (str, lens, strs) {
    let result = "";
    for (var i = 0, len = str.length; i < len; i++) {
      result += str[i].toString();
      if (i % lens == lens - 1) result += strs;
    }
    result = result.substring(0, result.lastIndexOf(strs));
    return result;
  },
  /*
        数组去空
    */
  arrTrim: function (arr) {
    return arr.filter(item => item);
  },
  /*
        清除string，所有特定的字符
    */
  clearReplace: function (str, strs) {
    let re = new RegExp("" + strs, "g");
    str = str.replace(re, ""); // 取消字符串中出现的所有逗号
    return str;
  },
  /*
        判断字符是否为16进制字符
    */
  str16Sw: function (str) {
    return /^([0-9a-fA-F]{2})+$/.test(str);
  },
  /*
        清除所有16进制之外的字符
    */
  str16Init: function (str) {
    return str.replace(/[^/0-9a-fA-F]/g, "");
  },
  /*
        随机生成16进制字符
    */
  get16GandNum: function (nums) {
    let str = "";
    let arr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f"
    ];
    for (let i = 0; i < nums; i++) {
      let value = Math.floor(Math.random() * 16);
      str += arr[value];
    }
    return str;
  },
  /*
        在字符中间加 特定 字符
    */
  addStringFFFF: function (str, strVal) {
    let strs = str.substring(0, str.length / 2);
    strs += strVal;
    let strss = str.substring(str.length / 2, str.length);
    return strs + strss;
  },
  /*
        去除中间 特定4个 字符
    */
  clearStringFFFF: function (str) {
    let strs = str.substring(0, str.length / 2 - 2);
    let strss = str.substring(str.length / 2 + 2, str.length);
    return strs + strss;
  },
  /*
        时间戳转时间
    */
  timestampToTime: function (timestamp) {
    let date = null;
    let times = "";
    if (
      timestamp != undefined &&
      timestamp.toString().length != undefined &&
      timestamp > 0
    ) {
      timestamp.toString().length == 10
        ? (date = new Date(timestamp * 1000))
        : (date = new Date(timestamp)); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear(),
        M =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1,
        D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        m =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
        ms =
          date.getMilliseconds() < 100
            ? "0" + date.getMilliseconds()
            : date.getMilliseconds();
      times =
        timestamp.toString().length == 10
          ? Y + "/" + M + "/" + D + " " + h + ":" + m + ":" + s
          : Y + "/" + M + "/" + D + " " + h + ":" + m + ":" + s + "." + ms;
    } else {
      times = "---";
    }
    return times;
  },
  /*
        本地时间格式化
    */
  Times: function (Times, btn) {
    let date = new Date(Times);
    let Y = date.getFullYear(),
      M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1,
      D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
      s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let dateTime = "";
    if (btn == "yyyy-mm-dd hh:mm:ss") {
      dateTime = Y + "/" + M + "/" + D + " " + h + ":" + m + ":" + s;
    }
    if (btn == "yyyy-mm-dd 00:00:00") {
      dateTime = Y + "/" + M + "/" + D + " " + "00:00:00";
    }
    if (btn == "mm-dd hh:mm") {
      dateTime = M + "/" + D + " " + h + ":" + m;
    }
    if (btn == "ymd hms") {
      dateTime = Y + "-" + M + "-" + D + " " + h + m + s;
    }
    return dateTime;
  },
  /*
        UTC时间转化为本地时间格式化
    */
  utcTimes: function (Times) {
    let date = new Date(Times);
    let Y = date.getUTCFullYear() + "-",
      M =
        (date.getUTCMonth() + 1 < 10
          ? "0" + (date.getUTCMonth() + 1)
          : date.getUTCMonth() + 1) + "-",
      D = date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate(),
      h =
        (date.getUTCHours() < 10
          ? "0" + date.getUTCHours()
          : date.getUTCHours()) + ":",
      m =
        (date.getUTCMinutes() < 10
          ? "0" + date.getUTCMinutes()
          : date.getUTCMinutes()) + ":",
      s =
        date.getUTCSeconds() < 10
          ? "0" + date.getUTCSeconds()
          : date.getUTCSeconds();
    let dateTime = Y + M + D + " " + h + m + s;
    return dateTime;
  },
  // base64解码
  base64Decode: function (str) {
    var base64DecodeChars = new Array(
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      62,
      -1,
      -1,
      -1,
      63,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      -1,
      -1,
      -1,
      -1,
      -1
    );
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
      /* c1 */
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c1 == -1);
      if (c1 == -1) break;

      /* c2 */
      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c2 == -1);
      if (c2 == -1) break;

      out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff;
        if (c3 == 61) return out;
        c3 = base64DecodeChars[c3];
      } while (i < len && c3 == -1);
      if (c3 == -1) break;

      out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff;
        if (c4 == 61) return out;
        c4 = base64DecodeChars[c4];
      } while (i < len && c4 == -1);
      if (c4 == -1) break;
      out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
  },
  // base64编码
  base64Encode: function (str) {
    var base64EncodeChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xf) << 2);
        out += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
      out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
      out += base64EncodeChars.charAt(c3 & 0x3f);
    }
    return out;
  },
  // 16进制转8进制
  utf16to8: function (str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007f) {
        out += str.charAt(i);
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      }
    }
    return out;
  },
  // 8进制转16进制
  utf8to16: function (str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
      c = str.charCodeAt(i++);
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += str.charAt(i - 1);
          break;
        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(
            ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
          );
          break;
      }
    }
    return out;
  },
  // 字符转hex字符
  CharToHex: function (str) {
    var out, i, h;
    out = "";
    i = 0;
    while (i < str.length) {
      h = str.charCodeAt(i++).toString(16);
      h.length > 1 ? (h = h) : (h = "0" + h);
      out += "\\0x" + h;
      out += i > 0 && i % 8 == 0 ? "\r\n" : ", ";
    }
    return out;
  },
  // hex字符转字符串
  hexTostring: function (str) {
    let strs = str
      .split("\\0x")
      .join("")
      .split(",")
      .join("")
      .split("↵")
      .join("");
    return strs.replace(/\s+$/, "");
  },
  // 转换ascill码
  initAscll: function (strs) {
    let result = "";
    for (let item = 0; item < strs.length / 2; item++) {
      result += String.fromCharCode(parseInt(strs.substr(2 * item, 2), 16));
    }
    return result;
  },
  dataFormat: function (fmt, data) { //author: meizz 
    if( !(data instanceof Date)){
      return ''
    }
    var o = {
      "M+": data.getMonth() + 1, //月份 
      "d+": data.getDate(), //日 
      "h+": data.getHours(), //小时 
      "m+": data.getMinutes(), //分 
      "s+": data.getSeconds(), //秒 
      "q+": Math.floor((data.getMonth() + 3) / 3), //季度 
      "S": data.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  //金额装换
  fmoney: function (s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    var isZ = true 
    if(parseFloat(s)<0){
      isZ = false
      s = Math.abs(parseFloat(s))
    }
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";//更改这里n数也可确定要保留的小数位
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var run = r?t.split("").reverse().join("") + "." + r.substring(0, n):0;//保留2位小数  如果要改动 把substring 最后一位数改动就可
    if(!isZ){
      run = `-${run}`
    }
    return run

  },
  getLen: function (str) {
    let len = 0
    if(str){
      str = str + ''
      for(let i=0; i<str.length; i++){
        let c = str.charCodeAt(i)
        if((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)){
          len++
        }else{
          len +=2
        }
      }
    }
    return len
  }
};
export default commonFun;
