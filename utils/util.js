export const img_url = 'https://sports-bureau.oss-cn-hangzhou.aliyuncs.com/images/'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

let formatDate = function (date, fmt) {
  if (!date) return null
  date = new Date(date);
  let currentDate = new Date(date);
  var o = {
      "M+": currentDate.getMonth() + 1,                 //月份 
      "d+": currentDate.getDate(),                    //日 
      "h+": currentDate.getHours(),                   //小时 
      "m+": currentDate.getMinutes(),                 //分 
      "s+": currentDate.getSeconds(),                 //秒 
      "q+": Math.floor((currentDate.getMonth() + 3) / 3), //季度 
      "S": currentDate.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
  }
  return fmt;
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate,
}
