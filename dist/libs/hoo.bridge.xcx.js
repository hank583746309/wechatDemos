'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (typeof window == 'undefined') {
  window = getApp();
}
var Hoo = window.Hoo || {};

Hoo.apply(Hoo.bridge.db, {});

Hoo.apply(Hoo.bridge.storage, {
  putItem: function putItem(key, value, callback, scope) {
    try {
      wx.setStorageSync(key, value);
      if (callback) {
        callback.call(scope || this);
      }
    } catch (e) {}
  },
  getItem: function getItem(key, callback, scope) {
    var value = null;
    try {
      value = wx.getStorageSync(key);
      if (typeof value == 'undefined') {
        value = null;
      }
    } catch (e) {
      value = null;
    }

    if (callback) {
      callback.call(scope || this, value);
    }
  },
  removeItem: function removeItem(key) {
    try {
      wx.removeStorageSync(key);
    } catch (e) {}
  },
  clear: function clear() {
    try {
      wx.clearStorageSync();
    } catch (e) {}
  }
});

Hoo.apply(Hoo.bridge.doc, {
  setTitle: function setTitle(cfg) {
    if (typeof cfg == 'string') {
      cfg = { title: cfg };
    }
    wx.setNavigationBarTitle(cfg);
  }
});

Hoo.apply(Hoo.bridge.widget, {
  toast: function toast() {},
  tip: {
    error: function error(cfg) {
      if (typeof cfg === 'undefined') {
        return;
      }
      if (typeof cfg === 'string') {
        cfg = { title: cfg };
      }
      var url = getApp().getCurrentUrl(),
          prefix = '',
          dfCfg = { image: 'res/image/icons/error.png' };
      for (var i = 0, len = url.split('/').length - 1; i < len; i++) {
        prefix += '../';
      }
      dfCfg.image = prefix + dfCfg.image;
      Hoo.copyTo(cfg, dfCfg);

      wx.showToast(dfCfg);
    },
    warning: function warning(cfg) {},
    success: function success(cfg) {
      if (typeof cfg === 'undefined') {
        return;
      }
      if (typeof cfg === 'string') {
        cfg = { title: cfg };
      }
      if (typeof cfg.msg == 'string') {
        cfg.title = cfg.msg;
      }

      var dfCfg = { icon: 'success', duration: 1500, afterShow: function afterShow() {}, scope: this };
      Hoo.copyTo(cfg, dfCfg);

      wx.showToast(dfCfg);
      if (dfCfg.duration > 0) {
        setTimeout(function () {
          dfCfg.afterShow.call(dfCfg.scope);
        }, dfCfg.duration);
      }
    }
  },
  alert: function alert(cfg) {
    if (typeof cfg == 'undefined') {
      return;
    }
    if (typeof cfg == 'string') {
      cfg = { content: cfg };
    }
    if (typeof cfg.msg == 'string') {
      cfg.content = cfg.msg;
    }
    var dfCfg = {
      title: '提示',
      content: '',
      showCancel: false,
      success: function success() {},
      fail: function fail() {}
    };
    Hoo.copyTo(cfg || {}, dfCfg);

    wx.showModal(dfCfg);
  },
  confirm: function confirm(cfg) {
    if (typeof cfg == 'undefined') {
      return;
    }
    if (typeof cfg == 'string') {
      cfg = { content: cfg };
    }
    var dfCfg = {
      title: '请选择',
      content: '',
      showCancel: true,
      success: function success() {},
      fail: function fail() {},
      scope: this
    };
    Hoo.copyTo(cfg || {}, dfCfg);
    var success = dfCfg.success,
        scope = dfCfg.scope;
    dfCfg.success = function (res) {
      if (res.confirm) {
        success.call(scope);
      } else {
        dfCfg.fail.call(scope);
      }
    };
    delete dfCfg.scope;
    wx.showModal(dfCfg);
  },
  actionSheet: function actionSheet(cfg) {
    if ((typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
      return;
    }
    var dfCfg = {
      items: [], // 默认属性格式  { label : '', ex : ''}
      success: function success(index, item) {},
      fail: function fail() {},
      scope: this
    };
    Hoo.copyTo(cfg || {}, dfCfg);
    var items = dfCfg.items,
        item = items.length > 0 ? items[0] : null,
        labels = [];
    if (item == null) {
      return;
    }
    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object') {
      items.map(function (item) {
        labels.push(item.label || '');
      });
    } else {
      labels = [].concat(items);
    }

    wx.showActionSheet({
      itemList: labels,
      success: function success(res) {
        if (res.cancel) {
          dfCfg.fail.call(dfCfg.scope);
        } else {
          dfCfg.success.call(dfCfg.scope, res.tapIndex, dfCfg.items[res.tapIndex]);
        }
      }
    });
  }
});

Hoo.apply(Hoo.bridge.location, _defineProperty({
  href: function href(cfg) {
    if (typeof cfg == 'string') {
      cfg = { url: cfg };
    }
    var dfCfg = { url: '', params: {} };
    Hoo.copyTo(cfg, dfCfg);
    if (!Hoo.isEmpty(dfCfg.params)) {
      var url = dfCfg.url + '?',
          params = [];
      for (var key in dfCfg.params) {
        var value = dfCfg.params[key];
        if (value == null) {
          continue;
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          value = JSON.stringify(value);
        }
        params.push(key + '=' + value);
      }
      url += params.join('&');
      delete dfCfg.params;
      dfCfg.url = url;
    }
    wx.navigateTo(dfCfg);
  },
  replace: function replace() {},
  //支持页面跳转
  redirect: function redirect(cfg) {
    if (typeof cfg == 'string') {
      cfg = { url: cfg };
    }
    var dfCfg = { url: '', params: {} };
    Hoo.copyTo(cfg, dfCfg);
    if (!Hoo.isEmpty(dfCfg.params)) {
      var url = dfCfg.url + '?',
          params = [];
      for (var key in dfCfg.params) {
        var value = dfCfg.params[key];
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          value = JSON.stringify(value);
        }
        params.push(key + '=' + value);
      }
      url += params.join('&');
      delete dfCfg.params;
      dfCfg.url = url;
    }
    wx.redirectTo(dfCfg);
  },
  //支持根据路由「app.json配置文件」 返回到 指定路由界面
  back: function back() {
    //关于back值回传解决思路： 返回前 获取上一级 page, 通过调用 通用自定义通用函数[建议] 或 setData方式操作[默认支持]
    var delta = typeof arguments[0] == 'undefined' ? 1 : arguments[0];
    if (typeof delta == 'number') {
      wx.navigateBack({ delta: delta });
    } else if (typeof delta == 'string') {
      // route 支持
      var pages = getCurrentPages(),
          total = pages.length,
          copy = pages.concat().reverse(),
          index = -1;
      for (var i = 0; i < total; i++) {
        var page = copy[i];
        if (page.route == delta) {
          index = i;break;
        }
      }
      wx.navigateBack({
        delta: index == -1 ? total + 1 : index
      });
    }
    /* 暂不支持，另外小程序限制,返回 tabBar页面,需要强制 length 大于当前栈即可
    else if (typeof delta == 'object'){}*/
  }
}, 'replace', function replace(cfg) {}));

Hoo.apply(Hoo.bridge.net, {
  //basePath: 'http://192.168.1.149:8080/IMS/', //TODO 原则上，不允许直接更改该值
  setBasePath: function setBasePath(basePath) {
    Hoo.bridge.net.basePath = basePath;
  },
  upload: function upload(cfg) {
    var dfCfg = {
      url: '',
      basePath: Hoo.bridge.net.basePath,
      data: {},
      name: 'file',
      path: '',
      onProgress: function onProgress(res) {},
      success: function success(data, response) {},
      fail: function fail(code, msg) {},
      complete: function complete() {},
      scope: this
    },
        header = { 'content-type': 'multipart/form-data' },
        pages = getCurrentPages(),
        page = pages[pages.length - 1];
    Hoo.copyTo(cfg || {}, dfCfg);

    var token = wx.getStorageSync('login_token');
    if (token != null && '' != token) {
      header['MINI-TOKEN'] = token;
    }

    //TODO 汉字 encodeURL 或 encodeURIComponent 的问题
    var uploadTask = wx.uploadFile({
      url: (dfCfg.basePath || '') + dfCfg.url,
      filePath: dfCfg.path,
      name: dfCfg.name || 'file',
      formData: dfCfg.data || {},
      header: header,
      success: function success(res) {
        if (res.statusCode = 200) {
          var data = res.data; //响应原数据
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch (e) {}
          }
          if (data.code == 0 || data.code == '0' || data.code == '200') {
            // 200为了兼容nodejs api
            dfCfg.success.call(dfCfg.scope, data.data, data);
          } else {
            dfCfg.fail.call(dfCfg.scope, '' + data.code, data.msg);
          }
        } else {
          dfCfg.fail.call(dfCfg.scope, '' + res.statusCode, res.errMsg);
        }
      },
      fail: function fail(res) {
        dfCfg.fail.call(dfCfg.scope, '500', res.errMsg);
      },
      complete: function complete() {
        dfCfg.complete.apply(dfCfg.scope, arguments);
      }
    });
    uploadTask.onProgressUpdate(function (res) {
      dfCfg.onProgress.call(dfCfg.scope, {
        progress: res.progress,
        sendBytes: res.totalBytesSent,
        totalBytes: res.totalBytesExpectedToSend
      });
    });
    if (page.addListener) {
      page.addListener('beforeUnload', function () {
        try {
          uploadTask.abort();
        } catch (e) {}
      });
    }
    return {
      cancel: function cancel() {
        try {
          uploadTask.abort();
        } catch (e) {} // 取消上传任务 
      }
    };
  },
  post: function post(cfg) {
    //TODO 由于微信小程序C/S特点,故而在这里需检测 用户登录状态、获取用户open_id 发送服务器获取3rdsession,供服务器判别当前用户
    //开启缓存 chache : true / cache : { enable : true , timeout : '缓存时长' , forceRefresh : false }
    var dfCache = {
      enable: false, //是否开启缓存
      forceRefresh: false, //是否强制新的请求
      timeout: 60 * 30 //缓存 30 分钟
    },
        dfCfg = {
      url: '',
      basePath: Hoo.bridge.net.basePath,
      data: {},
      success: function success(data, response) {},
      fail: function fail(code, msg) {},
      complete: function complete() {},
      scope: this,
      cache: false,
      showToast: true,
      loading: false,
      //image    : '../../res/image/icons/error.png',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },
        pages = getCurrentPages(),
        page = pages[pages.length - 1];;
    //header = { 'Content-Type':  'application/json' };
    Hoo.copyTo(cfg || {}, dfCfg);
    if (dfCfg.showToast) {
      wx.hideLoading();
    }
    var header = dfCfg.header;

    var token = wx.getStorageSync('login_token');
    if (token != null && '' != token) {
      header['MINI-TOKEN'] = token;
    }

    if (dfCfg.loading) {
      wx.hideLoading();wx.showLoading({ title: '加载中' });
    }

    //TODO 缓存处理
    var cache = dfCfg.cache;
    if (typeof cache == 'boolean') {
      dfCache.enable = cache;
    } else if ((typeof cache === 'undefined' ? 'undefined' : _typeof(cache)) == 'object') {
      Hoo.copyTo(cache, dfCache);
    }
    dfCfg.cache = dfCache;

    var enacleCache = dfCfg.cache.enable,
        key = (dfCfg.basePath || '') + dfCfg.url + (_typeof(dfCfg.data) == 'object' ? JSON.stringify(dfCfg.data) : dfCfg.data);
    if (!dfCfg.cache.forceRefresh && enacleCache && Hoo.util.Cache.contains(key)) {
      Hoo.util.Cache.get(key, {
        success: function success(data) {
          dfCfg.success.call(dfCfg.scope, data.data, data);
          if (dfCfg.loading) {
            wx.hideLoading();
          }
        }
      });
      return;
    }

    var requestTask = wx.request({
      url: (dfCfg.basePath || '') + dfCfg.url,
      data: dfCfg.data || {},
      header: header,
      method: 'POST',
      success: function success(res) {
        if (res.statusCode = 200) {
          var data = res.data; //响应原数据
          //TODO 根据数据格式进行数据分发,如果业务逻辑正常 & 如果业务逻辑失败
          //if (dfCfg.showToast) { wx.showToast({ title: '请求成功', icon: 'success', duration: 1500 }); }

          if (data.code == 0 || data.code == '0' || data.code == '200') {
            // 200为了兼容nodejs api
            dfCfg.success.call(dfCfg.scope, data.data, data);
            if (enacleCache && data.data != null) {
              Hoo.util.Cache.put(key, data);
            } //TODO 设置缓存数据为  成功时实际响应值
          } else {
            if (dfCfg.showToast) {
              if (typeof data.code == 'undefined') {
                Hoo.bridge.widget.alert('登录失效,请退出并重新进入');return;
              }
              Hoo.bridge.widget.tip.error(data.msg || '请求异常(错误码:' + data.code + ')');
            }
            dfCfg.fail.call(dfCfg.scope, '' + data.code, data.msg);
          }
        } else {
          if (dfCfg.showToast) {
            Hoo.bridge.widget.tip.error(res.msg || '请求异常');
          }
          dfCfg.fail.call(dfCfg.scope, '' + res.statusCode, res.msg);
        }
      },
      fail: function fail(res) {
        if (dfCfg.showToast) {
          Hoo.bridge.widget.tip.error(res.msg || '请求异常');
        }
        dfCfg.fail.call(dfCfg.scope, '500', res.msg);
      },
      complete: function complete() {
        if (dfCfg.loading) {
          wx.hideLoading();
        }
        dfCfg.complete.apply(dfCfg.scope, arguments);
      }
    });
    if (page.addListener) {
      page.addListener('beforeUnload', function () {
        try {
          uploadTask.abort();
        } catch (e) {}
      });
    }
    return {
      cancel: function cancel() {
        try {
          requestTask.abort();
        } catch (e) {} // 取消请求任务
      }
    };
  },
  'get': function get(cfg) {
    /*data  : {},
      method: 'GET',
      header: { 'Accept': 'application/json' }*/
  },
  download: function download(cfg) {}
});

Hoo.apply(Hoo.bridge.media, {
  chooseImage: function chooseImage(cfg) {
    var dfCfg = {
      count: 0,
      success: function success(res) {},
      fail: function fail(code, msg) {},
      scope: this
    };
    Hoo.copyTo(cfg, dfCfg);

    wx.chooseImage({
      count: dfCfg.count,
      success: function success(res) {
        var result = {
          filePaths: res.tempFilePaths,
          files: res.tempFiles
        };
        if (result.filePaths.length == 1) {
          result.filePath = result.filePaths[0];
          result.file = result.files[0];
        }
        dfCfg.success.call(dfCfg.scope, result);
      },
      fail: function fail() {
        var code = 999,
            msg = '操作发生异常';
        dfCfg.fail.call(dfCfg.scope, code, msg);
      }
    });
  }
});

Hoo.apply(Hoo.bridge.device, {
  scanCode: function scanCode(cfg) {
    var dfCfg = {
      success: function success() {},
      fail: function fail() {},
      scope: this
    };
    Hoo.copyTo(cfg, dfCfg);

    wx.scanCode({
      success: function success(res) {
        dfCfg.success.call(dfCfg.scope, {
          content: res.result, //扫码内容
          scanType: res.scanType //扫码类型, CODE_128 、 QR_CODE
        });
      },
      fail: function fail() {
        var code = 999,
            msg = '操作发生异常';
        dfCfg.fail.call(dfCfg.scope, code, msg);
      }
    });
  }
});

Hoo.hybrid = Hoo.bridge; //TODO 兼容系统原有代码

module.exports = Hoo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvby5icmlkZ2UueGN4LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImdldEFwcCIsIkhvbyIsImFwcGx5IiwiYnJpZGdlIiwiZGIiLCJzdG9yYWdlIiwicHV0SXRlbSIsImtleSIsInZhbHVlIiwiY2FsbGJhY2siLCJzY29wZSIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJjYWxsIiwiZSIsImdldEl0ZW0iLCJnZXRTdG9yYWdlU3luYyIsInJlbW92ZUl0ZW0iLCJyZW1vdmVTdG9yYWdlU3luYyIsImNsZWFyIiwiY2xlYXJTdG9yYWdlU3luYyIsImRvYyIsInNldFRpdGxlIiwiY2ZnIiwidGl0bGUiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ3aWRnZXQiLCJ0b2FzdCIsInRpcCIsImVycm9yIiwidXJsIiwiZ2V0Q3VycmVudFVybCIsInByZWZpeCIsImRmQ2ZnIiwiaW1hZ2UiLCJpIiwibGVuIiwic3BsaXQiLCJsZW5ndGgiLCJjb3B5VG8iLCJzaG93VG9hc3QiLCJ3YXJuaW5nIiwic3VjY2VzcyIsIm1zZyIsImljb24iLCJkdXJhdGlvbiIsImFmdGVyU2hvdyIsInNldFRpbWVvdXQiLCJhbGVydCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwiZmFpbCIsInNob3dNb2RhbCIsImNvbmZpcm0iLCJyZXMiLCJhY3Rpb25TaGVldCIsIml0ZW1zIiwiaW5kZXgiLCJpdGVtIiwibGFiZWxzIiwibWFwIiwicHVzaCIsImxhYmVsIiwiY29uY2F0Iiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJjYW5jZWwiLCJ0YXBJbmRleCIsImxvY2F0aW9uIiwiaHJlZiIsInBhcmFtcyIsImlzRW1wdHkiLCJKU09OIiwic3RyaW5naWZ5Iiwiam9pbiIsIm5hdmlnYXRlVG8iLCJyZXBsYWNlIiwicmVkaXJlY3QiLCJyZWRpcmVjdFRvIiwiYmFjayIsImRlbHRhIiwiYXJndW1lbnRzIiwibmF2aWdhdGVCYWNrIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJ0b3RhbCIsImNvcHkiLCJyZXZlcnNlIiwicGFnZSIsInJvdXRlIiwibmV0Iiwic2V0QmFzZVBhdGgiLCJiYXNlUGF0aCIsInVwbG9hZCIsImRhdGEiLCJuYW1lIiwicGF0aCIsIm9uUHJvZ3Jlc3MiLCJyZXNwb25zZSIsImNvZGUiLCJjb21wbGV0ZSIsImhlYWRlciIsInRva2VuIiwidXBsb2FkVGFzayIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsImZvcm1EYXRhIiwic3RhdHVzQ29kZSIsInBhcnNlIiwiZXJyTXNnIiwib25Qcm9ncmVzc1VwZGF0ZSIsInByb2dyZXNzIiwic2VuZEJ5dGVzIiwidG90YWxCeXRlc1NlbnQiLCJ0b3RhbEJ5dGVzIiwidG90YWxCeXRlc0V4cGVjdGVkVG9TZW5kIiwiYWRkTGlzdGVuZXIiLCJhYm9ydCIsInBvc3QiLCJkZkNhY2hlIiwiZW5hYmxlIiwiZm9yY2VSZWZyZXNoIiwidGltZW91dCIsImNhY2hlIiwibG9hZGluZyIsImhpZGVMb2FkaW5nIiwic2hvd0xvYWRpbmciLCJlbmFjbGVDYWNoZSIsInV0aWwiLCJDYWNoZSIsImNvbnRhaW5zIiwiZ2V0IiwicmVxdWVzdFRhc2siLCJyZXF1ZXN0IiwibWV0aG9kIiwicHV0IiwiZG93bmxvYWQiLCJtZWRpYSIsImNob29zZUltYWdlIiwiY291bnQiLCJyZXN1bHQiLCJmaWxlUGF0aHMiLCJ0ZW1wRmlsZVBhdGhzIiwiZmlsZXMiLCJ0ZW1wRmlsZXMiLCJmaWxlIiwiZGV2aWNlIiwic2NhbkNvZGUiLCJzY2FuVHlwZSIsImh5YnJpZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUksT0FBT0EsTUFBUCxJQUFpQixXQUFyQixFQUFrQztBQUFFQSxXQUFTQyxRQUFUO0FBQW9CO0FBQ3hELElBQUlDLE1BQU1GLE9BQU9FLEdBQVAsSUFBYyxFQUF4Qjs7QUFFQUEsSUFBSUMsS0FBSixDQUFVRCxJQUFJRSxNQUFKLENBQVdDLEVBQXJCLEVBQXlCLEVBQXpCOztBQUVBSCxJQUFJQyxLQUFKLENBQVVE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Z0JvQixNQUFNdkIsS0FBdEIsRUFBNkJ5RixJQUE3QixFQUFtQ3hELEdBQW5DO0FBQ0Q7QUFWUyxLQUFaO0FBWUQ7QUFyQjBCLENBQTdCOztBQXdCQTFDLElBQUlvSixNQUFKLEdBQWFwSixJQUFJRSxNQUFqQixDLENBQXlCOztBQUV6Qm1KLE9BQU9DLE9BQVAsR0FBaUJ0SixHQUFqQiIsImZpbGUiOiJob28uYnJpZGdlLnhjeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmICh0eXBlb2Ygd2luZG93ID09ICd1bmRlZmluZWQnKSB7IHdpbmRvdyA9IGdldEFwcCgpOyB9XHJcbnZhciBIb28gPSB3aW5kb3cuSG9vIHx8IHt9O1xyXG5cclxuSG9vLmFwcGx5KEhvby5icmlkZ2UuZGIsIHt9KTtcclxuXHJcbkhvby5hcHBseShIb28uYnJpZGdlLnN0b3JhZ2UsIHtcclxuICAgIHB1dEl0ZW06IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBjYWxsYmFjaywgc2NvcGUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhrZXksIHZhbHVlKTtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2suY2FsbChzY29wZSB8fCB0aGlzKTsgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7IH1cclxuXHJcbiAgICB9LFxyXG4gICAgZ2V0SXRlbTogZnVuY3Rpb24gKGtleSwgY2FsbGJhY2ssIHNjb3BlKSB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IG51bGw7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdmFsdWUgPSB3eC5nZXRTdG9yYWdlU3luYyhrZXkpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHsgdmFsdWUgPSBudWxsOyB9XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHsgdmFsdWUgPSBudWxsOyB9XHJcblxyXG4gICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2suY2FsbChzY29wZSB8fCB0aGlzLCB2YWx1ZSk7IH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVJdGVtOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgd3gucmVtb3ZlU3RvcmFnZVN5bmMoa2V5KTtcclxuICAgICAgfSBjYXRjaCAoZSkgeyB9XHJcblxyXG4gICAgfSxcclxuICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgd3guY2xlYXJTdG9yYWdlU3luYygpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7IH1cclxuXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbkhvby5hcHBseShIb28uYnJpZGdlLmRvYywge1xyXG4gIHNldFRpdGxlOiBmdW5jdGlvbiAoY2ZnKSB7XHJcbiAgICBpZiAodHlwZW9mIGNmZyA9PSAnc3RyaW5nJykgeyBjZmcgPSB7IHRpdGxlOiBjZmcgfTsgfVxyXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKGNmZyk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG5Ib28uYXBwbHkoSG9vLmJyaWRnZS53aWRnZXQse1xyXG4gIHRvYXN0ICAgOiBmdW5jdGlvbigpe1xyXG4gICAgXHJcbiAgfSxcclxuICB0aXAgICAgIDoge1xyXG4gICAgZXJyb3IgICA6IGZ1bmN0aW9uIChjZmcpe1xyXG4gICAgICBpZiAodHlwZW9mIGNmZyA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XHJcbiAgICAgIGlmICh0eXBlb2YgY2ZnID09PSAnc3RyaW5nJykgeyBjZmcgPSB7IHRpdGxlOiBjZmcgfTsgfVxyXG4gICAgICB2YXIgdXJsID0gZ2V0QXBwKCkuZ2V0Q3VycmVudFVybCgpLCBwcmVmaXggPSAnJyxcclxuICAgICAgZGZDZmcgPSB7IGltYWdlOiAncmVzL2ltYWdlL2ljb25zL2Vycm9yLnBuZycgfTtcclxuICAgICAgZm9yKHZhciBpPTAsbGVuID0gdXJsLnNwbGl0KCcvJykubGVuZ3RoIC0gMTsgaTxsZW47aSsrKXsgIHByZWZpeCArPSAnLi4vJzsgfVxyXG4gICAgICBkZkNmZy5pbWFnZSA9IHByZWZpeCArIGRmQ2ZnLmltYWdlO1xyXG4gICAgICBIb28uY29weVRvKGNmZywgZGZDZmcpO1xyXG5cclxuICAgICAgd3guc2hvd1RvYXN0KGRmQ2ZnKTtcclxuICAgIH0sXHJcbiAgICB3YXJuaW5nIDogZnVuY3Rpb24oY2ZnKXt9LFxyXG4gICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChjZmcpe1xyXG4gICAgICBpZih0eXBlb2YgY2ZnID09PSAndW5kZWZpbmVkJyl7IHJldHVybjsgfVxyXG4gICAgICBpZih0eXBlb2YgY2ZnID09PSAnc3RyaW5nJyl7IGNmZyA9IHsgdGl0bGUgOiBjZmcgfTt9XHJcbiAgICAgIGlmKHR5cGVvZiBjZmcubXNnID09ICdzdHJpbmcnKSB7IGNmZy50aXRsZSA9IGNmZy5tc2c7IH1cclxuICAgICAgXHJcbiAgICAgIHZhciBkZkNmZyA9IHsgaWNvbjogJ3N1Y2Nlc3MnLCBkdXJhdGlvbjogMTUwMCwgYWZ0ZXJTaG93IDogZnVuY3Rpb24oKXt9ICwgc2NvcGUgOiB0aGlzfTtcclxuICAgICAgSG9vLmNvcHlUbyhjZmcsZGZDZmcpO1xyXG4gICAgICBcclxuICAgICAgd3guc2hvd1RvYXN0KGRmQ2ZnKTtcclxuICAgICAgaWYoZGZDZmcuZHVyYXRpb24gPiAwKXtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IGRmQ2ZnLmFmdGVyU2hvdy5jYWxsKGRmQ2ZnLnNjb3BlKTsgfSxkZkNmZy5kdXJhdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGFsZXJ0ICAgOiBmdW5jdGlvbihjZmcpe1xyXG4gICAgaWYodHlwZW9mIGNmZyA9PSAndW5kZWZpbmVkJyl7IHJldHVybjsgfVxyXG4gICAgaWYodHlwZW9mIGNmZyA9PSAnc3RyaW5nJyl7IGNmZyA9IHsgY29udGVudCA6IGNmZ307fVxyXG4gICAgaWYgKHR5cGVvZiBjZmcubXNnID09ICdzdHJpbmcnKSB7IGNmZy5jb250ZW50ID0gY2ZnLm1zZzsgfVxyXG4gICAgdmFyIGRmQ2ZnID0ge1xyXG4gICAgICB0aXRsZSAgICAgIDogJ+aPkOekuicsXHJcbiAgICAgIGNvbnRlbnQgICAgOiAnJyxcclxuICAgICAgc2hvd0NhbmNlbCA6IGZhbHNlLFxyXG4gICAgICBzdWNjZXNzICAgIDogZnVuY3Rpb24oKXt9LFxyXG4gICAgICBmYWlsICAgICAgIDogZnVuY3Rpb24oKXt9XHJcbiAgICB9O1xyXG4gICAgSG9vLmNvcHlUbyhjZmcgfHwge30gLCBkZkNmZyk7XHJcblxyXG4gICAgd3guc2hvd01vZGFsKGRmQ2ZnKTtcclxuICB9LFxyXG4gIGNvbmZpcm0gOiBmdW5jdGlvbihjZmcpe1xyXG4gICAgaWYgKHR5cGVvZiBjZmcgPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XHJcbiAgICBpZiAodHlwZW9mIGNmZyA9PSAnc3RyaW5nJykgeyBjZmcgPSB7IGNvbnRlbnQ6IGNmZyB9OyB9XHJcbiAgICB2YXIgZGZDZmcgPSB7XHJcbiAgICAgICAgdGl0bGUgICAgIDogJ+ivt+mAieaLqScsXHJcbiAgICAgICAgY29udGVudCAgIDogJycsXHJcbiAgICAgICAgc2hvd0NhbmNlbDogdHJ1ZSxcclxuICAgICAgICBzdWNjZXNzICAgOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICAgICAgZmFpbCAgICAgIDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICAgIHNjb3BlICAgICA6IHRoaXNcclxuICAgICAgfTtcclxuICAgIEhvby5jb3B5VG8oY2ZnIHx8IHt9LCBkZkNmZyk7XHJcbiAgICBjb25zdCBzdWNjZXNzID0gZGZDZmcuc3VjY2VzcyxzY29wZSA9IGRmQ2ZnLnNjb3BlO1xyXG4gICAgZGZDZmcuc3VjY2VzcyA9IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgIGlmIChyZXMuY29uZmlybSkgeyBzdWNjZXNzLmNhbGwoc2NvcGUpOyB9IGVsc2UgeyBkZkNmZy5mYWlsLmNhbGwoc2NvcGUpO31cclxuICAgIH1cclxuICAgIGRlbGV0ZSBkZkNmZy5zY29wZTtcclxuICAgIHd4LnNob3dNb2RhbChkZkNmZyk7XHJcbiAgfSwgXHJcbiAgYWN0aW9uU2hlZXQ6IGZ1bmN0aW9uIChjZmcpIHsgXHJcbiAgICBpZiAodHlwZW9mIGNmZyAhPT0gJ29iamVjdCcpIHsgcmV0dXJuOyB9XHJcbiAgICB2YXIgZGZDZmcgPSB7XHJcbiAgICAgIGl0ZW1zIDogW10sIC8vIOm7mOiupOWxnuaAp+agvOW8jyAgeyBsYWJlbCA6ICcnLCBleCA6ICcnfVxyXG4gICAgICBzdWNjZXNzIDogZnVuY3Rpb24oaW5kZXgsaXRlbSl7fSxcclxuICAgICAgZmFpbCAgICA6IGZ1bmN0aW9uKCl7fSxcclxuICAgICAgc2NvcGUgICA6IHRoaXNcclxuICAgIH07XHJcbiAgICBIb28uY29weVRvKGNmZyB8fCB7fSwgZGZDZmcpO1xyXG4gICAgdmFyIGl0ZW1zID0gZGZDZmcuaXRlbXMsaXRlbSA9IGl0ZW1zLmxlbmd0aCA+IDAgPyBpdGVtc1swXSA6IG51bGwsbGFiZWxzID0gW107XHJcbiAgICBpZihpdGVtID09IG51bGwpeyByZXR1cm47IH1cclxuICAgIGlmKHR5cGVvZiBpdGVtID09ICdvYmplY3QnKXtcclxuICAgICAgaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7IGxhYmVscy5wdXNoKGl0ZW0ubGFiZWwgfHwgJycpOyB9KTtcclxuICAgIH1lbHNle1xyXG4gICAgICBsYWJlbHMgPSBbXS5jb25jYXQoaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XHJcbiAgICAgIGl0ZW1MaXN0OiBsYWJlbHMsXHJcbiAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5jYW5jZWwpIHsgZGZDZmcuZmFpbC5jYWxsKGRmQ2ZnLnNjb3BlKTsgfWVsc2V7XHJcbiAgICAgICAgICBkZkNmZy5zdWNjZXNzLmNhbGwoZGZDZmcuc2NvcGUsIHJlcy50YXBJbmRleCwgZGZDZmcuaXRlbXNbcmVzLnRhcEluZGV4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG59KTtcclxuXHJcbkhvby5hcHBseShIb28uYnJpZGdlLmxvY2F0aW9uLCB7XHJcbiAgaHJlZjogZnVuY3Rpb24gKGNmZykge1xyXG4gICAgaWYgKHR5cGVvZiBjZmcgPT0gJ3N0cmluZycpIHsgY2ZnID0geyB1cmw6IGNmZyB9OyB9XHJcbiAgICB2YXIgZGZDZmcgPSB7IHVybDogJycsIHBhcmFtczoge30gfTtcclxuICAgIEhvby5jb3B5VG8oY2ZnLCBkZkNmZyk7XHJcbiAgICBpZiAoIUhvby5pc0VtcHR5KGRmQ2ZnLnBhcmFtcykpIHtcclxuICAgICAgdmFyIHVybCA9IGRmQ2ZnLnVybCArICc/JywgcGFyYW1zID0gW107XHJcbiAgICAgIGZvciAodmFyIGtleSBpbiBkZkNmZy5wYXJhbXMpe1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGRmQ2ZnLnBhcmFtc1trZXldO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7IGNvbnRpbnVlOyB9ZWxzZVxyXG4gICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpeyB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTsgfVxyXG4gICAgICAgIHBhcmFtcy5wdXNoKGtleSArICc9JyArIHZhbHVlICk7XHJcbiAgICAgIH1cclxuICAgICAgdXJsICs9IHBhcmFtcy5qb2luKCcmJyk7XHJcbiAgICAgIGRlbGV0ZSBkZkNmZy5wYXJhbXM7XHJcbiAgICAgIGRmQ2ZnLnVybCA9IHVybDtcclxuICAgIH1cclxuICAgIHd4Lm5hdmlnYXRlVG8oZGZDZmcpO1xyXG4gIH0sXHJcbiAgcmVwbGFjZSA6IGZ1bmN0aW9uKCl7fSxcclxuICAvL+aUr+aMgemhtemdoui3s+i9rFxyXG4gIHJlZGlyZWN0OiBmdW5jdGlvbihjZmcpe1xyXG4gICAgaWYgKHR5cGVvZiBjZmcgPT0gJ3N0cmluZycpIHsgY2ZnID0geyB1cmw6IGNmZyB9OyB9XHJcbiAgICB2YXIgZGZDZmcgPSB7IHVybDogJycsIHBhcmFtczoge30gfTtcclxuICAgIEhvby5jb3B5VG8oY2ZnLCBkZkNmZyk7XHJcbiAgICBpZiAoIUhvby5pc0VtcHR5KGRmQ2ZnLnBhcmFtcykpIHtcclxuICAgICAgdmFyIHVybCA9IGRmQ2ZnLnVybCArICc/JywgcGFyYW1zID0gW107XHJcbiAgICAgIGZvciAodmFyIGtleSBpbiBkZkNmZy5wYXJhbXMpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBkZkNmZy5wYXJhbXNba2V5XTtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgeyB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTsgfVxyXG4gICAgICAgIHBhcmFtcy5wdXNoKGtleSArICc9JyArIHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICB1cmwgKz0gcGFyYW1zLmpvaW4oJyYnKTtcclxuICAgICAgZGVsZXRlIGRmQ2ZnLnBhcmFtcztcclxuICAgICAgZGZDZmcudXJsID0gdXJsO1xyXG4gICAgfVxyXG4gICAgd3gucmVkaXJlY3RUbyhkZkNmZyk7XHJcbiAgfSxcclxuICAvL+aUr+aMgeagueaNrui3r+eUseOAjGFwcC5qc29u6YWN572u5paH5Lu244CNIOi/lOWbnuWIsCDmjIflrprot6/nlLHnlYzpnaJcclxuICBiYWNrICAgOiBmdW5jdGlvbigpeyAvL+WFs+S6jmJhY2vlgLzlm57kvKDop6PlhrPmgJ3ot6/vvJog6L+U5Zue5YmNIOiOt+WPluS4iuS4gOe6pyBwYWdlLCDpgJrov4fosIPnlKgg6YCa55So6Ieq5a6a5LmJ6YCa55So5Ye95pWwW+W7uuiurl0g5oiWIHNldERhdGHmlrnlvI/mk43kvZxb6buY6K6k5pSv5oyBXVxyXG4gICAgdmFyIGRlbHRhID0gdHlwZW9mIGFyZ3VtZW50c1swXSA9PSAndW5kZWZpbmVkJyA/IDEgOiBhcmd1bWVudHNbMF07XHJcbiAgICBpZiAodHlwZW9mIGRlbHRhID09ICdudW1iZXInKXtcclxuICAgICAgd3gubmF2aWdhdGVCYWNrKHsgZGVsdGE6IGRlbHRhIH0pO1xyXG4gICAgfWVsc2UgaWYodHlwZW9mIGRlbHRhID09ICdzdHJpbmcnKXsgLy8gcm91dGUg5pSv5oyBXHJcbiAgICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpLCB0b3RhbCA9IHBhZ2VzLmxlbmd0aCxjb3B5ID0gcGFnZXMuY29uY2F0KCkucmV2ZXJzZSgpLGluZGV4ID0gLTE7XHJcbiAgICAgIGZvcih2YXIgaT0wIDtpIDwgdG90YWwgOyBpKyspe1xyXG4gICAgICAgIHZhciBwYWdlID0gY29weVtpXTtcclxuICAgICAgICBpZiAocGFnZS5yb3V0ZSA9PSBkZWx0YSkgeyBpbmRleCA9IGk7IGJyZWFrOyB9XHJcbiAgICAgIH1cclxuICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICBkZWx0YSA6IGluZGV4ID09IC0xID8gdG90YWwgKyAxIDogaW5kZXhcclxuICAgICAgfSk7IFxyXG4gICAgfVxyXG4gICAgLyog5pqC5LiN5pSv5oyB77yM5Y+m5aSW5bCP56iL5bqP6ZmQ5Yi2LOi/lOWbniB0YWJCYXLpobXpnaIs6ZyA6KaB5by65Yi2IGxlbmd0aCDlpKfkuo7lvZPliY3moIjljbPlj69cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWx0YSA9PSAnb2JqZWN0Jyl7fSovXHJcbiAgfSxcclxuICByZXBsYWNlOiBmdW5jdGlvbiAoY2ZnKSB7XHJcblxyXG4gIH1cclxufSk7XHJcblxyXG5Ib28uYXBwbHkoSG9vLmJyaWRnZS5uZXQsIHtcclxuICAvL2Jhc2VQYXRoOiAnaHR0cDovLzE5Mi4xNjguMS4xNDk6ODA4MC9JTVMvJywgLy9UT0RPIOWOn+WImeS4iu+8jOS4jeWFgeiuuOebtOaOpeabtOaUueivpeWAvFxyXG4gIHNldEJhc2VQYXRoIDogZnVuY3Rpb24oYmFzZVBhdGgpe1xyXG4gICAgSG9vLmJyaWRnZS5uZXQuYmFzZVBhdGggPSBiYXNlUGF0aDtcclxuICB9LFxyXG4gIHVwbG9hZCAgOiBmdW5jdGlvbiAoY2ZnKSB7XHJcbiAgICBsZXQgZGZDZmcgPSB7XHJcbiAgICAgIHVybCAgICAgICAgOiAnJyxcclxuICAgICAgYmFzZVBhdGggICA6IEhvby5icmlkZ2UubmV0LmJhc2VQYXRoLFxyXG4gICAgICBkYXRhICAgICAgIDoge30sXHJcbiAgICAgIG5hbWUgICAgICAgOiAnZmlsZScsXHJcbiAgICAgIHBhdGggICAgICAgOiAnJyxcclxuICAgICAgb25Qcm9ncmVzcyA6IGZ1bmN0aW9uKHJlcyl7fSxcclxuICAgICAgc3VjY2VzcyAgICA6IGZ1bmN0aW9uIChkYXRhLCByZXNwb25zZSkgeyB9LFxyXG4gICAgICBmYWlsICAgICAgIDogZnVuY3Rpb24gKGNvZGUsIG1zZykgeyB9LFxyXG4gICAgICBjb21wbGV0ZSAgIDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICBzY29wZSAgICAgIDogdGhpc1xyXG4gICAgfSwgaGVhZGVyID0geyAnY29udGVudC10eXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH0sIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCkscGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xyXG4gICAgSG9vLmNvcHlUbyhjZmcgfHwge30sIGRmQ2ZnKTtcclxuXHJcbiAgICB2YXIgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW5fdG9rZW4nKTtcclxuICAgIGlmKHRva2VuICE9IG51bGwgJiYgJycgIT0gdG9rZW4peyBoZWFkZXJbJ01JTkktVE9LRU4nXSA9IHRva2VuOyB9XHJcblxyXG4gICAgLy9UT0RPIOaxieWtlyBlbmNvZGVVUkwg5oiWIGVuY29kZVVSSUNvbXBvbmVudCDnmoTpl67pophcclxuICAgIGNvbnN0IHVwbG9hZFRhc2sgPSB3eC51cGxvYWRGaWxlKHtcclxuICAgICAgICB1cmwgICAgIDogKGRmQ2ZnLmJhc2VQYXRoIHx8ICcnKSArIGRmQ2ZnLnVybCxcclxuICAgICAgICBmaWxlUGF0aDogZGZDZmcucGF0aCxcclxuICAgICAgICBuYW1lICAgIDogZGZDZmcubmFtZSB8fCAnZmlsZScsXHJcbiAgICAgICAgZm9ybURhdGE6IGRmQ2ZnLmRhdGEgfHwge30sXHJcbiAgICAgICAgaGVhZGVyICA6IGhlYWRlcixcclxuICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID0gMjAwKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7IC8v5ZON5bqU5Y6f5pWw5o2uXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyl7IHRyeXsgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7IH1jYXRjaChlKXt9IH1cclxuICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAwIHx8IGRhdGEuY29kZSA9PSAnMCcgfHwgZGF0YS5jb2RlID09ICcyMDAnKSB7IC8vIDIwMOS4uuS6huWFvOWuuW5vZGVqcyBhcGlcclxuICAgICAgICAgICAgICBkZkNmZy5zdWNjZXNzLmNhbGwoZGZDZmcuc2NvcGUsIGRhdGEuZGF0YSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZGZDZmcuZmFpbC5jYWxsKGRmQ2ZnLnNjb3BlLCAnJyArIGRhdGEuY29kZSwgZGF0YS5tc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkZkNmZy5mYWlsLmNhbGwoZGZDZmcuc2NvcGUsICcnICsgcmVzLnN0YXR1c0NvZGUsIHJlcy5lcnJNc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbCAgICA6IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICBkZkNmZy5mYWlsLmNhbGwoZGZDZmcuc2NvcGUsICc1MDAnLCByZXMuZXJyTXNnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgZGZDZmcuY29tcGxldGUuYXBwbHkoZGZDZmcuc2NvcGUsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHVwbG9hZFRhc2sub25Qcm9ncmVzc1VwZGF0ZSgocmVzKSA9PiB7XHJcbiAgICAgIGRmQ2ZnLm9uUHJvZ3Jlc3MuY2FsbChkZkNmZy5zY29wZSx7XHJcbiAgICAgICAgcHJvZ3Jlc3MgIDogcmVzLnByb2dyZXNzLFxyXG4gICAgICAgIHNlbmRCeXRlcyA6IHJlcy50b3RhbEJ5dGVzU2VudCxcclxuICAgICAgICB0b3RhbEJ5dGVzOiByZXMudG90YWxCeXRlc0V4cGVjdGVkVG9TZW5kXHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICAgIGlmIChwYWdlLmFkZExpc3RlbmVyKSB7IFxyXG4gICAgICBwYWdlLmFkZExpc3RlbmVyKCdiZWZvcmVVbmxvYWQnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdHJ5IHsgdXBsb2FkVGFzay5hYm9ydCgpIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgIH0pOyBcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNhbmNlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRyeSB7IHVwbG9hZFRhc2suYWJvcnQoKSB9Y2F0Y2goZSl7fSAvLyDlj5bmtojkuIrkvKDku7vliqEgXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHBvc3QgIDogZnVuY3Rpb24gKGNmZykge1xyXG4gICAgLy9UT0RPIOeUseS6juW+ruS/oeWwj+eoi+W6j0MvU+eJueeCuSzmlYXogIzlnKjov5nph4zpnIDmo4DmtYsg55So5oi355m75b2V54q25oCB44CB6I635Y+W55So5oi3b3Blbl9pZCDlj5HpgIHmnI3liqHlmajojrflj5YzcmRzZXNzaW9uLOS+m+acjeWKoeWZqOWIpOWIq+W9k+WJjeeUqOaIt1xyXG4gICAgLy/lvIDlkK/nvJPlrZggY2hhY2hlIDogdHJ1ZSAvIGNhY2hlIDogeyBlbmFibGUgOiB0cnVlICwgdGltZW91dCA6ICfnvJPlrZjml7bplb8nICwgZm9yY2VSZWZyZXNoIDogZmFsc2UgfVxyXG4gICAgbGV0IGRmQ2FjaGUgPSB7XHJcbiAgICAgIGVuYWJsZSA6IGZhbHNlLCAgICAgICAvL+aYr+WQpuW8gOWQr+e8k+WtmFxyXG4gICAgICBmb3JjZVJlZnJlc2ggOiBmYWxzZSwgLy/mmK/lkKblvLrliLbmlrDnmoTor7fmsYJcclxuICAgICAgdGltZW91dDogNjAgKiAzMCAgICAgIC8v57yT5a2YIDMwIOWIhumSn1xyXG4gICAgfSxkZkNmZyA9IHtcclxuICAgICAgdXJsICAgICA6ICcnLFxyXG4gICAgICBiYXNlUGF0aDogSG9vLmJyaWRnZS5uZXQuYmFzZVBhdGgsXHJcbiAgICAgIGRhdGEgICAgOiB7fSxcclxuICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEscmVzcG9uc2Upe30sXHJcbiAgICAgIGZhaWwgICAgOiBmdW5jdGlvbihjb2RlLG1zZyl7fSxcclxuICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7fSxcclxuICAgICAgc2NvcGUgICA6IHRoaXMsXHJcbiAgICAgIGNhY2hlICAgOiBmYWxzZSxcclxuICAgICAgc2hvd1RvYXN0OiB0cnVlLFxyXG4gICAgICBsb2FkaW5nICA6IGZhbHNlLFxyXG4gICAgICAvL2ltYWdlICAgIDogJy4uLy4uL3Jlcy9pbWFnZS9pY29ucy9lcnJvci5wbmcnLFxyXG4gICAgICBoZWFkZXIgICA6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH1cclxuICAgIH0sIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCksIHBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXTs7XHJcbiAgICAvL2hlYWRlciA9IHsgJ0NvbnRlbnQtVHlwZSc6ICAnYXBwbGljYXRpb24vanNvbicgfTtcclxuICAgIEhvby5jb3B5VG8oY2ZnIHx8IHt9LGRmQ2ZnKTtcclxuICAgIGlmIChkZkNmZy5zaG93VG9hc3QpIHsgd3guaGlkZUxvYWRpbmcoKTsgfVxyXG4gICAgdmFyIGhlYWRlciA9IGRmQ2ZnLmhlYWRlcjtcclxuXHJcbiAgICB2YXIgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW5fdG9rZW4nKTtcclxuICAgIGlmICh0b2tlbiAhPSBudWxsICYmICcnICE9IHRva2VuKSB7IGhlYWRlclsnTUlOSS1UT0tFTiddID0gdG9rZW47IH1cclxuXHJcbiAgICBpZiAoZGZDZmcubG9hZGluZykge1xyXG4gICAgICB3eC5oaWRlTG9hZGluZygpOyB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295LitJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g57yT5a2Y5aSE55CGXHJcbiAgICB2YXIgY2FjaGUgPSBkZkNmZy5jYWNoZTtcclxuICAgIGlmKHR5cGVvZiBjYWNoZSA9PSAnYm9vbGVhbicpeyBkZkNhY2hlLmVuYWJsZSA9IGNhY2hlOyB9ZWxzZSBpZih0eXBlb2YgY2FjaGUgPT0gJ29iamVjdCcpeyBIb28uY29weVRvKGNhY2hlLGRmQ2FjaGUpOyB9XHJcbiAgICBkZkNmZy5jYWNoZSA9IGRmQ2FjaGU7XHJcblxyXG4gICAgY29uc3QgZW5hY2xlQ2FjaGUgPSBkZkNmZy5jYWNoZS5lbmFibGUsa2V5ID0gKGRmQ2ZnLmJhc2VQYXRoIHx8ICcnKSArIGRmQ2ZnLnVybCArICh0eXBlb2YgZGZDZmcuZGF0YSA9PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KGRmQ2ZnLmRhdGEpIDogZGZDZmcuZGF0YSk7XHJcbiAgICBpZiAoIWRmQ2ZnLmNhY2hlLmZvcmNlUmVmcmVzaCAmJiBlbmFjbGVDYWNoZSAmJiBIb28udXRpbC5DYWNoZS5jb250YWlucyhrZXkpKXtcclxuICAgICAgSG9vLnV0aWwuQ2FjaGUuZ2V0KGtleSwge1xyXG4gICAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgZGZDZmcuc3VjY2Vzcy5jYWxsKGRmQ2ZnLnNjb3BlLCBkYXRhLmRhdGEsIGRhdGEpO1xyXG4gICAgICAgICAgaWYgKGRmQ2ZnLmxvYWRpbmcpIHsgd3guaGlkZUxvYWRpbmcoKTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICBcclxuICAgIGNvbnN0IHJlcXVlc3RUYXNrID0gd3gucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsICAgIDogKGRmQ2ZnLmJhc2VQYXRoIHx8ICcnKSArIGRmQ2ZnLnVybCxcclxuICAgICAgICBkYXRhICAgOiBkZkNmZy5kYXRhIHx8IHt9LFxyXG4gICAgICAgIGhlYWRlciA6IGhlYWRlcixcclxuICAgICAgICBtZXRob2QgOiAnUE9TVCcsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGUgPSAyMDApe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhOyAvL+WTjeW6lOWOn+aVsOaNrlxyXG4gICAgICAgICAgICAvL1RPRE8g5qC55o2u5pWw5o2u5qC85byP6L+b6KGM5pWw5o2u5YiG5Y+RLOWmguaenOS4muWKoemAu+i+keato+W4uCAmIOWmguaenOS4muWKoemAu+i+keWksei0pVxyXG4gICAgICAgICAgICAvL2lmIChkZkNmZy5zaG93VG9hc3QpIHsgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfor7fmsYLmiJDlip8nLCBpY29uOiAnc3VjY2VzcycsIGR1cmF0aW9uOiAxNTAwIH0pOyB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlID09IDAgfHwgZGF0YS5jb2RlID09ICcwJyB8fCBkYXRhLmNvZGUgPT0gJzIwMCcpeyAvLyAyMDDkuLrkuoblhbzlrrlub2RlanMgYXBpXHJcbiAgICAgICAgICAgICAgZGZDZmcuc3VjY2Vzcy5jYWxsKGRmQ2ZnLnNjb3BlLCBkYXRhLmRhdGEsIGRhdGEpO1xyXG4gICAgICAgICAgICAgIGlmIChlbmFjbGVDYWNoZSAmJiBkYXRhLmRhdGEgIT0gbnVsbCkgeyBIb28udXRpbC5DYWNoZS5wdXQoa2V5LCBkYXRhKTsgfS8vVE9ETyDorr7nva7nvJPlrZjmlbDmja7kuLogIOaIkOWKn+aXtuWunumZheWTjeW6lOWAvFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBpZiAoZGZDZmcuc2hvd1RvYXN0KSB7IFxyXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIGRhdGEuY29kZSA9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgICAgICAgIEhvby5icmlkZ2Uud2lkZ2V0LmFsZXJ0KCfnmbvlvZXlpLHmlYgs6K+36YCA5Ye65bm26YeN5paw6L+b5YWlJyk7IHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEhvby5icmlkZ2Uud2lkZ2V0LnRpcC5lcnJvcihkYXRhLm1zZyB8fCAoJ+ivt+axguW8guW4uCjplJnor6/noIE6JyArIGRhdGEuY29kZSArICcpJykpOyBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZGZDZmcuZmFpbC5jYWxsKGRmQ2ZnLnNjb3BlLCAnJyArIGRhdGEuY29kZSwgZGF0YS5tc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYgKGRmQ2ZnLnNob3dUb2FzdCkgeyBIb28uYnJpZGdlLndpZGdldC50aXAuZXJyb3IocmVzLm1zZyB8fCAn6K+35rGC5byC5bi4Jyk7IH1cclxuICAgICAgICAgICAgZGZDZmcuZmFpbC5jYWxsKGRmQ2ZnLnNjb3BlLCAnJyArIHJlcy5zdGF0dXNDb2RlLCByZXMubXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsICA6IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICBpZiAoZGZDZmcuc2hvd1RvYXN0KSB7IEhvby5icmlkZ2Uud2lkZ2V0LnRpcC5lcnJvcihyZXMubXNnIHx8ICfor7fmsYLlvILluLgnKTsgfVxyXG4gICAgICAgICAgZGZDZmcuZmFpbC5jYWxsKGRmQ2ZnLnNjb3BlLCAnNTAwJywgcmVzLm1zZyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZSA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBpZiAoZGZDZmcubG9hZGluZyl7IHd4LmhpZGVMb2FkaW5nKCk7IH1cclxuICAgICAgICAgIGRmQ2ZnLmNvbXBsZXRlLmFwcGx5KGRmQ2ZnLnNjb3BlLGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGlmIChwYWdlLmFkZExpc3RlbmVyKSB7XHJcbiAgICAgIHBhZ2UuYWRkTGlzdGVuZXIoJ2JlZm9yZVVubG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0cnkgeyB1cGxvYWRUYXNrLmFib3J0KCkgfSBjYXRjaCAoZSkgeyB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2FuY2VsIDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0cnkgeyByZXF1ZXN0VGFzay5hYm9ydCgpIH0gY2F0Y2ggKGUpIHsgfSAgLy8g5Y+W5raI6K+35rGC5Lu75YqhXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuICAnZ2V0JyAgIDogZnVuY3Rpb24oY2ZnKXtcclxuICAgIC8qZGF0YSAgOiB7fSxcclxuICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgaGVhZGVyOiB7ICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicgfSovXHJcbiAgfSxcclxuICBkb3dubG9hZDogZnVuY3Rpb24gKGNmZykgeyB9XHJcbn0pO1xyXG5cclxuSG9vLmFwcGx5KEhvby5icmlkZ2UubWVkaWEsIHtcclxuICBjaG9vc2VJbWFnZTogZnVuY3Rpb24gKGNmZykge1xyXG4gICAgdmFyIGRmQ2ZnID0ge1xyXG4gICAgICBjb3VudCAgOiAwLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7IH0sXHJcbiAgICAgIGZhaWwgICA6IGZ1bmN0aW9uIChjb2RlLG1zZykgeyB9LFxyXG4gICAgICBzY29wZSAgOiB0aGlzXHJcbiAgICB9O1xyXG4gICAgSG9vLmNvcHlUbyhjZmcsIGRmQ2ZnKTtcclxuXHJcbiAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgIGNvdW50ICA6IGRmQ2ZnLmNvdW50LFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICAgIGZpbGVQYXRoczogcmVzLnRlbXBGaWxlUGF0aHMsXHJcbiAgICAgICAgICBmaWxlczogcmVzLnRlbXBGaWxlc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHJlc3VsdC5maWxlUGF0aHMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgIHJlc3VsdC5maWxlUGF0aCA9IHJlc3VsdC5maWxlUGF0aHNbMF07XHJcbiAgICAgICAgICByZXN1bHQuZmlsZSA9IHJlc3VsdC5maWxlc1swXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGZDZmcuc3VjY2Vzcy5jYWxsKGRmQ2ZnLnNjb3BlLCByZXN1bHQpO1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsICAgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvZGUgPSA5OTksIG1zZyA9ICfmk43kvZzlj5HnlJ/lvILluLgnO1xyXG4gICAgICAgIGRmQ2ZnLmZhaWwuY2FsbChkZkNmZy5zY29wZSwgY29kZSwgbXNnKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG59KTtcclxuXHJcbkhvby5hcHBseShIb28uYnJpZGdlLmRldmljZSwge1xyXG4gIHNjYW5Db2RlOiBmdW5jdGlvbiAoY2ZnKSB7XHJcbiAgICB2YXIgZGZDZmcgPSB7XHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgICAgZmFpbDogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICBzY29wZTogdGhpc1xyXG4gICAgfTtcclxuICAgIEhvby5jb3B5VG8oY2ZnLCBkZkNmZyk7XHJcblxyXG4gICAgd3guc2NhbkNvZGUoe1xyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgZGZDZmcuc3VjY2Vzcy5jYWxsKGRmQ2ZnLnNjb3BlLCB7XHJcbiAgICAgICAgICBjb250ZW50OiByZXMucmVzdWx0LCAgICAvL+aJq+eggeWGheWuuVxyXG4gICAgICAgICAgc2NhblR5cGU6IHJlcy5zY2FuVHlwZSAgIC8v5omr56CB57G75Z6LLCBDT0RFXzEyOCDjgIEgUVJfQ09ERVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvZGUgPSA5OTksIG1zZyA9ICfmk43kvZzlj5HnlJ/lvILluLgnO1xyXG4gICAgICAgIGRmQ2ZnLmZhaWwuY2FsbChkZkNmZy5zY29wZSwgY29kZSwgbXNnKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn0pO1xyXG5cclxuSG9vLmh5YnJpZCA9IEhvby5icmlkZ2U7IC8vVE9ETyDlhbzlrrnns7vnu5/ljp/mnInku6PnoIFcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSG9vOyJdfQ==