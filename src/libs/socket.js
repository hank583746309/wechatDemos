var reConnectTime = 0, maxConnectTime = 5,socketOpen = false, socketMsgQueue = [];
var open, close, sendSocketMessage;
open = function(cfg){
  const _c = cfg;
  var dfCfg = {
    url       : null ,
    data      : {}, 
    onMessage : function(){},
    scope     : this || getApp(),
    onError   : function(){ // 发生错误时，尝试5此重连      
      socketOpen = false;
      if (reConnectTime <= maxConnectTime) {
        setTimeout(function () { open(_c);},5000);
        reConnectTime++;
      }
      if (reConnectTime > maxConnectTime) {
        wx.showToast({ title: '请检查网络设置,并重新打开小程序' })
      }
    } 
  };
  if(typeof cfg == 'string'){ dfCfg.url = cfg; }else 
  if(typeof cfg == 'object'){ for(var key in cfg){ dfCfg[key] = cfg[key]; }}
  if (dfCfg.url == null || socketOpen){ return; }

  wx.connectSocket({ 
    url     : dfCfg.url , 
    data    : dfCfg.data || {},
    method  : 'GET',
    header:{ 
      'content-type': 'application/json'
    },
    success : function(){
      
    },
    fail    : function () { 
      console.log("打开失败:"); console.log(arguments)
      dfCfg.onError()
    }
  })

  wx.onSocketOpen(function () {       // 监听WS连接打开事件
    socketOpen = true
    for (var i = 0; i < socketMsgQueue.length; i++) {
      sendSocketMessage(socketMsgQueue[i])
    }
    socketMsgQueue = []
  })

  wx.onSocketMessage(function (res) { // 接收到服务器内容
    try{
      dfCfg.onMessage.call(dfCfg.scope,typeof res.data != 'object' ? JSON.parse(res.data) : res.data)
    }catch(e){
      console.log(e)
    }
  })

  wx.onSocketClose(function(){
    socketOpen = false
  })

  wx.onSocketError(function () {
    console.log("连接错误:");console.log(arguments)
    dfCfg.onError()
  })

}

close = function(){
  wx.onSocketOpen(function () {
    wx.closeSocket()
  })
}

sendSocketMessage = function(msg) {
  if (typeof msg == 'undefined'){ return }
  if (socketOpen) {
    if (typeof msg == 'object') { msg = JSON.stringify(msg) }
    try { wx.sendSocketMessage({ data: msg })}catch(e){}
  } else {
    socketMsgQueue.push(msg)
  }
}

module.exports = {
  open : open,
  close: close,
  isOpening: function () { //建议使用 isOpened 语义更明确
    return socketOpen
  },
  isOpened : function(){
    return socketOpen
  },
  sendMessage: sendSocketMessage
};