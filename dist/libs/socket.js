'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var reConnectTime = 0,
    maxConnectTime = 5,
    socketOpen = false,
    socketMsgQueue = [];
var _open, close, sendSocketMessage;
_open = function open(cfg) {
  var _c = cfg;
  var dfCfg = {
    url: null,
    data: {},
    onMessage: function onMessage() {},
    scope: this || getApp(),
    onError: function onError() {
      // 发生错误时，尝试5此重连      
      socketOpen = false;
      if (reConnectTime <= maxConnectTime) {
        setTimeout(function () {
          _open(_c);
        }, 5000);
        reConnectTime++;
      }
      if (reConnectTime > maxConnectTime) {
        wx.showToast({ title: '请检查网络设置,并重新打开小程序' });
      }
    }
  };
  if (typeof cfg == 'string') {
    dfCfg.url = cfg;
  } else if ((typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) == 'object') {
    for (var key in cfg) {
      dfCfg[key] = cfg[key];
    }
  }
  if (dfCfg.url == null || socketOpen) {
    return;
  }

  wx.connectSocket({
    url: dfCfg.url,
    data: dfCfg.data || {},
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function success() {},
    fail: function fail() {
      console.log("打开失败:");console.log(arguments);
      dfCfg.onError();
    }
  });

  wx.onSocketOpen(function () {
    // 监听WS连接打开事件
    socketOpen = true;
    for (var i = 0; i < socketMsgQueue.length; i++) {
      sendSocketMessage(socketMsgQueue[i]);
    }
    socketMsgQueue = [];
  });

  wx.onSocketMessage(function (res) {
    // 接收到服务器内容
    try {
      dfCfg.onMessage.call(dfCfg.scope, _typeof(res.data) != 'object' ? JSON.parse(res.data) : res.data);
    } catch (e) {
      console.log(e);
    }
  });

  wx.onSocketClose(function () {
    socketOpen = false;
  });

  wx.onSocketError(function () {
    console.log("连接错误:");console.log(arguments);
    dfCfg.onError();
  });
};

close = function close() {
  wx.onSocketOpen(function () {
    wx.closeSocket();
  });
};

sendSocketMessage = function sendSocketMessage(msg) {
  if (typeof msg == 'undefined') {
    return;
  }
  if (socketOpen) {
    if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) == 'object') {
      msg = JSON.stringify(msg);
    }
    try {
      wx.sendSocketMessage({ data: msg });
    } catch (e) {}
  } else {
    socketMsgQueue.push(msg);
  }
};

module.exports = {
  open: _open,
  close: close,
  isOpening: function isOpening() {
    //建议使用 isOpened 语义更明确
    return socketOpen;
  },
  isOpened: function isOpened() {
    return socketOpen;
  },
  sendMessage: sendSocketMessage
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2tldC5qcyJdLCJuYW1lcyI6WyJyZUNvbm5lY3RUaW1lIiwibWF4Q29ubmVjdFRpbWUiLCJzb2NrZXRPcGVuIiwic29ja2V0TXNnUXVldWUiLCJvcGVuIiwiY2xvc2UiLCJzZW5kU29ja2V0TWVzc2FnZSIsImNmZyIsIl9jIiwiZGZDZmciLCJ1cmwiLCJkYXRhIiwib25NZXNzYWdlIiwic2NvcGUiLCJnZXRBcHAiLCJvbkVycm9yIiwic2V0VGltZW91dCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJrZXkiLCJjb25uZWN0U29ja2V0IiwibWV0aG9kIiwiaGVhZGVyIiwic3VjY2VzcyIsImZhaWwiLCJjb25zb2xlIiwibG9nIiwiYXJndW1lbnRzIiwib25Tb2NrZXRPcGVuIiwiaSIsImxlbmd0aCIsIm9uU29ja2V0TWVzc2FnZSIsInJlcyIsImNhbGwiLCJKU09OIiwicGFyc2UiLCJlIiwib25Tb2NrZXRDbG9zZSIsIm9uU29ja2V0RXJyb3IiLCJjbG9zZVNvY2tldCIsIm1zZyIsInN0cmluZ2lmeSIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIiwiaXNPcGVuaW5nIiwiaXNPcGVuZWQiLCJzZW5kTWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUlBLGdCQUFnQixDQUFwQjtBQUFBLElBQXVCQyxpQkFBaUIsQ0FBeEM7QUFBQSxJQUEwQ0MsYUFBYSxLQUF2RDtBQUFBLElBQThEQyxpQkFBaUIsRUFBL0U7QUFDQSxJQUFJQyxLQUFKLEVBQVVDLEtBQVYsRUFBaUJDLGlCQUFqQjtBQUNBRixRQUFPLGNBQVNHLEdBQVQsRUFBYTtBQUNsQixNQUFNQyxLQUFLRCxHQUFYO0FBQ0EsTUFBSUUsUUFBUTtBQUNWQyxTQUFZLElBREY7QUFFVkMsVUFBWSxFQUZGO0FBR1ZDLGVBQVkscUJBQVUsQ0FBRSxDQUhkO0FBSVZDLFdBQVksUUFBUUMsUUFKVjtBQUtWQyxhQUFZLG1CQUFVO0FBQUU7QUFDdEJiLG1CQUFhLEtBQWI7QUFDQSxVQUFJRixpQkFB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QUFDTGxDLG1CQUFld0MsSUFBZixDQUFvQkYsR0FBcEI7QUFDRDtBQUNGLENBUkQ7O0FBVUFHLE9BQU9DLE9BQVAsR0FBaUI7QUFDZnpDLFFBQU9BLEtBRFE7QUFFZkMsU0FBT0EsS0FGUTtBQUdmeUMsYUFBVyxxQkFBWTtBQUFFO0FBQ3ZCLFdBQU81QyxVQUFQO0FBQ0QsR0FMYztBQU1mNkMsWUFBVyxvQkFBVTtBQUNuQixXQUFPN0MsVUFBUDtBQUNELEdBUmM7QUFTZjhDLGVBQWExQztBQVRFLENBQWpCIiwiZmlsZSI6InNvY2tldC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZUNvbm5lY3RUaW1lID0gMCwgbWF4Q29ubmVjdFRpbWUgPSA1LHNvY2tldE9wZW4gPSBmYWxzZSwgc29ja2V0TXNnUXVldWUgPSBbXTtcclxudmFyIG9wZW4sIGNsb3NlLCBzZW5kU29ja2V0TWVzc2FnZTtcclxub3BlbiA9IGZ1bmN0aW9uKGNmZyl7XHJcbiAgY29uc3QgX2MgPSBjZmc7XHJcbiAgdmFyIGRmQ2ZnID0ge1xyXG4gICAgdXJsICAgICAgIDogbnVsbCAsXHJcbiAgICBkYXRhICAgICAgOiB7fSwgXHJcbiAgICBvbk1lc3NhZ2UgOiBmdW5jdGlvbigpe30sXHJcbiAgICBzY29wZSAgICAgOiB0aGlzIHx8IGdldEFwcCgpLFxyXG4gICAgb25FcnJvciAgIDogZnVuY3Rpb24oKXsgLy8g5Y+R55Sf6ZSZ6K+v5pe277yM5bCd6K+VNeatpOmHjei/niAgICAgIFxyXG4gICAgICBzb2NrZXRPcGVuID0gZmFsc2U7XHJcbiAgICAgIGlmIChyZUNvbm5lY3RUaW1lIDw9IG1heENvbm5lY3RUaW1lKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IG9wZW4oX2MpO30sNTAwMCk7XHJcbiAgICAgICAgcmVDb25uZWN0VGltZSsrO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZUNvbm5lY3RUaW1lID4gbWF4Q29ubmVjdFRpbWUpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogJ+ivt+ajgOafpee9kee7nOiuvue9rizlubbph43mlrDmiZPlvIDlsI/nqIvluo8nIH0pXHJcbiAgICAgIH1cclxuICAgIH0gXHJcbiAgfTtcclxuICBpZih0eXBlb2YgY2ZnID09ICdzdHJpbmcnKXsgZGZDZmcudXJsID0gY2ZnOyB9ZWxzZSBcclxuICBpZih0eXBlb2YgY2ZnID09ICdvYmplY3QnKXsgZm9yKHZhciBrZXkgaW4gY2ZnKXsgZGZDZmdba2V5XSA9IGNmZ1trZXldOyB9fVxyXG4gIGlmIChkZkNmZy51cmwgPT0gbnVsbCB8fCBzb2NrZXRPcGVuKXsgcmV0dXJuOyB9XHJcblxyXG4gIHd4LmNvbm5lY3RTb2NrZXQoeyBcclxuICAgIHVybCAgICAgOiBkZkNmZy51cmwgLCBcclxuICAgIGRhdGEgICAgOiBkZkNmZy5kYXRhIHx8IHt9LFxyXG4gICAgbWV0aG9kICA6ICdHRVQnLFxyXG4gICAgaGVhZGVyOnsgXHJcbiAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzIDogZnVuY3Rpb24oKXtcclxuICAgICAgXHJcbiAgICB9LFxyXG4gICAgZmFpbCAgICA6IGZ1bmN0aW9uICgpIHsgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi5omT5byA5aSx6LSlOlwiKTsgY29uc29sZS5sb2coYXJndW1lbnRzKVxyXG4gICAgICBkZkNmZy5vbkVycm9yKClcclxuICAgIH1cclxuICB9KVxyXG5cclxuICB3eC5vblNvY2tldE9wZW4oZnVuY3Rpb24gKCkgeyAgICAgICAvLyDnm5HlkKxXU+i/nuaOpeaJk+W8gOS6i+S7tlxyXG4gICAgc29ja2V0T3BlbiA9IHRydWVcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc29ja2V0TXNnUXVldWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgc2VuZFNvY2tldE1lc3NhZ2Uoc29ja2V0TXNnUXVldWVbaV0pXHJcbiAgICB9XHJcbiAgICBzb2NrZXRNc2dRdWV1ZSA9IFtdXHJcbiAgfSlcclxuXHJcbiAgd3gub25Tb2NrZXRNZXNzYWdlKGZ1bmN0aW9uIChyZXMpIHsgLy8g5o6l5pS25Yiw5pyN5Yqh5Zmo5YaF5a65XHJcbiAgICB0cnl7XHJcbiAgICAgIGRmQ2ZnLm9uTWVzc2FnZS5jYWxsKGRmQ2ZnLnNjb3BlLHR5cGVvZiByZXMuZGF0YSAhPSAnb2JqZWN0JyA/IEpTT04ucGFyc2UocmVzLmRhdGEpIDogcmVzLmRhdGEpXHJcbiAgICB9Y2F0Y2goZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgd3gub25Tb2NrZXRDbG9zZShmdW5jdGlvbigpe1xyXG4gICAgc29ja2V0T3BlbiA9IGZhbHNlXHJcbiAgfSlcclxuXHJcbiAgd3gub25Tb2NrZXRFcnJvcihmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIui/nuaOpemUmeivrzpcIik7Y29uc29sZS5sb2coYXJndW1lbnRzKVxyXG4gICAgZGZDZmcub25FcnJvcigpXHJcbiAgfSlcclxuXHJcbn1cclxuXHJcbmNsb3NlID0gZnVuY3Rpb24oKXtcclxuICB3eC5vblNvY2tldE9wZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgd3guY2xvc2VTb2NrZXQoKVxyXG4gIH0pXHJcbn1cclxuXHJcbnNlbmRTb2NrZXRNZXNzYWdlID0gZnVuY3Rpb24obXNnKSB7XHJcbiAgaWYgKHR5cGVvZiBtc2cgPT0gJ3VuZGVmaW5lZCcpeyByZXR1cm4gfVxyXG4gIGlmIChzb2NrZXRPcGVuKSB7XHJcbiAgICBpZiAodHlwZW9mIG1zZyA9PSAnb2JqZWN0JykgeyBtc2cgPSBKU09OLnN0cmluZ2lmeShtc2cpIH1cclxuICAgIHRyeSB7IHd4LnNlbmRTb2NrZXRNZXNzYWdlKHsgZGF0YTogbXNnIH0pfWNhdGNoKGUpe31cclxuICB9IGVsc2Uge1xyXG4gICAgc29ja2V0TXNnUXVldWUucHVzaChtc2cpXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBvcGVuIDogb3BlbixcclxuICBjbG9zZTogY2xvc2UsXHJcbiAgaXNPcGVuaW5nOiBmdW5jdGlvbiAoKSB7IC8v5bu66K6u5L2/55SoIGlzT3BlbmVkIOivreS5ieabtOaYjuehrlxyXG4gICAgcmV0dXJuIHNvY2tldE9wZW5cclxuICB9LFxyXG4gIGlzT3BlbmVkIDogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBzb2NrZXRPcGVuXHJcbiAgfSxcclxuICBzZW5kTWVzc2FnZTogc2VuZFNvY2tldE1lc3NhZ2VcclxufTsiXX0=