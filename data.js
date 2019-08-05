//对外提供接口  需要暴露在外面才能调用
module.exports = {
  getGhostHost: getGhostHost,// 获取 ghost 的主机域名
  getContentKey: getContentKey,//获取内存授权 key
}


function getGhostHost () {
  return 'https://www.todayios.com';
};

function getContentKey (){
  return 'ea8d7e40008c3b64db2636c802';
}
