'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 用于实现JS前端缓存
 * 
 * 特别说明：
 *  针对 微信小程序 做的改造
 * 源于：
 *  https://github.com/WQTeam/web-storage-cache 提供的思路
 * 
 * 
 * 实现思路：
 * 1、WxStorageCache类,对外只实现该类的单例
 * 2、实现单例时，初始化 storage数据到内存Map对象内
 *    2.1、map为全局独立对象 
 *    2.2、开启定时器
 * 3、当 storage 有新增数据时，同步更新 Map
 * 
 * 4、定义设置参数
 *    4.1、指定日期删除
 *    4.2、固定时间删除
 *    4.3、需参考jquery cache参数设置
 *    4.4、参数举例：
 *        {
 *            key : {
 *              expires : 过期时间戳,
 *              value   : Object 值
 *            }
 *            //,.....
 *        }
 * 
 * 5、打算重构 window.AppCache 这个对象 , 作为独立的 WxStorageCache 对象 ?
 * 
 */

/*============================== 正经逻辑代码的分割线 ===========================*/
if (typeof window == 'undefined') {
  window = getApp();
}

(function () {

  //强制拷贝,非 fromSource 属性, 均不支持 copy
  function copyTo(fromSource, toSource) {
    if ((typeof fromSource === 'undefined' ? 'undefined' : _typeof(fromSource)) != 'object' || (typeof toSource === 'undefined' ? 'undefined' : _typeof(toSource)) != 'object') {
      return;
    }
    for (var key in fromSource) {
      if (typeof toSource[key] != 'undefined') {
        toSource[key] = fromSource[key];
      }
    }
    return toSource;
  }

  function isEmpty(obj) {
    var flag = true;
    for (var key in obj || {}) {
      flag = false;break;
    }
    return flag;
  }

  function WxStorageCache(options) {

    this.dfOptions = {
      defaultTimeout: 60 * 60 //最长保存时间 1 hour
      , prefix: '__cache_'

    };

    copyTo(options || {}, this.dfOptions);

    this._init();

    // interval 当定时器 监听到 内部无对象,则此时可以停止,直到重新put
    this._activeInterval();
  }

  WxStorageCache.prototype._init = function () {
    //内存缓存对象
    var that = this;
    this._map = window.AppCache || (window.AppCache = {}); //这里考虑到全局缓存对象,节省重复初始化开支
    this._interval = null;

    //TODO 初始化内存对象
    try {
      if (isEmpty(this._map)) {
        var res = wx.getStorageInfoSync(),
            keys = res.keys;
        for (var i = 0, len = keys.length; i < len; i++) {
          //TODO 判断属于缓存的
          if (key.indexOf(this.dfOptions.prefix) == 0) {
            var values = wx.getStorageSync(key);
            this._map[key] = values;
          }
        }
      }
    } catch (e) {}
  };

  //获取激活定时器[如果定时器处于销毁状态的话]
  WxStorageCache.prototype._activeInterval = function () {
    if (this._interval == null) {
      var that = this;
      this._map = window.AppCache;
      this._interval = setInterval(function () {
        //处理Map中过期的key,之后 给 remove 处理
        var delKeys = [],
            now = new Date().getTime();
        for (var key in that._map) {
          //获取值,根据expires 判断是否真实删除
          var values = that._map[key],
              expires = values.expires;
          if (expires != -1 && expires < now) {
            delKeys.push(key.substring(that.dfOptions.prefix.length));
          }
        }
        //执行异步删除操作【会不会引发同步问题】 -- 先同步
        if (delKeys.length > 0) {
          that.remove(delKeys);
        }
      }, 1000);
    }
  };

  //销毁定时器
  WxStorageCache.prototype._destoryInterval = function () {
    clearInterval(this._interval);
    this._interval = null;
  };

  /**
   * 设置缓存
   * @param {String} key   缓存KEY
   * @param {Object} value 缓存值
   * @param {Object} options 扩展配置属性
   *
   */
  WxStorageCache.prototype.put = function (key, value, options) {
    if (typeof value == 'undefined') {
      return;
    }
    this._activeInterval();

    var dfOpts = {
      scope: this,
      duration: this.dfOptions.defaultTimeout, //缓存时长 单位 : s
      success: function success() {},
      fail: function fail() {}
    },
        now = new Date().getTime();
    copyTo(options || {}, dfOpts);

    if (value == null) {
      this.remove(key, dfOpts.success, dfOpts.fail);
    }

    var newVal = {
      expires: dfOpts.duration < 0 ? -1 : now + dfOpts.duration * 1000, // -1 不限制时间
      value: value
    };

    key = this.dfOptions.prefix + key;
    this._map = window.AppCache;
    try {
      this._map[key] = newVal;
      wx.setStorageSync(key, newVal);
      dfOpts.success.call(dfOpts.scope);
    } catch (e) {
      dfOpts.fail.call(dfOpts.scope, e.message || '发送错误');
    }
  };

  /**
   * 是否包含未过期的值
   * @param {String} key 缓存KEY
   */
  WxStorageCache.prototype.contains = function (key) {
    this._map = window.AppCache;
    key = this.dfOptions.prefix + key;
    var values = this._map[key];
    if (typeof values !== 'undefined') {
      var expires = values.expires,
          now = new Date().getTime(),
          value = values.value;
      if (expires != -1 && expires < now) {
        value = null;
      }
      return value != null;
    }
    return false;
  };

  /**
   * 获取缓存值
   */
  WxStorageCache.prototype.get = function (key, options) {
    this._map = window.AppCache;
    var _key = this.dfOptions.prefix + key;
    var values = this._map[_key],
        dfOpts = {
      remove: false, //获取值后,立即移除
      success: function success() {},
      fail: function fail() {},
      scope: this
    };
    copyTo(options || {}, dfOpts);

    if (typeof values !== 'undefined') {
      var expires = values.expires,
          now = new Date().getTime(),
          value = values.value;
      if (expires != -1 && expires < now) {
        value = null;
      }
      if (value == null) {
        dfOpts.fail.call(dfOpts.scope, '缓存不存在');
      } else {
        if (dfOpts.remove) {
          this.remove({ key: key });
        } //自动删除前置
        dfOpts.success.call(dfOpts.scope, value);
      }
    }
    // wx.getStorage(key);
  };

  /**
   * 移除 key 对应的缓存值
   */
  WxStorageCache.prototype.remove = function (options) {
    var dfOpts = {
      key: '',
      success: function success() {},
      fail: function fail() {},
      scope: this
    },
        that = this;
    if (typeof options == 'string' || options instanceof Array) {
      dfOpts.key = options;
    } else {
      copyTo(options || {}, dfOpts);
    }

    var key = dfOpts.key;
    this._map = window.AppCache;
    if (typeof key === 'string') {
      key = this.dfOptions.prefix + key;
      delete this._map[key];
      try {
        wx.removeStorageSync(key);
        dfOpts.success.call(dfOpts.scope, key); //回调
      } catch (e) {
        console.log(e);
        dfOpts.fail.call(dfOpts.scope, e.message || '发送错误');
      }
    } else if (key instanceof Array) {
      try {
        for (var i = 0, len = key.length; i < len; i++) {
          var k = key[i];
          k = this.dfOptions.prefix + k;
          delete this._map[k]; //循环执行删除
          wx.removeStorageSync(k);
        }
        dfOpts.success.call(dfOpts.scope, key);
      } catch (e) {
        dfOpts.fail.call(dfOpts.scope, e.message || '发送错误');
      }
    } else {
      throw 'key传参类型有误';
    }
  };

  /**
   * 清除所有缓存
   */
  WxStorageCache.prototype.clear = function (success, fail) {

    try {
      var clearKeys = [];
      for (var key in this._map) {
        if (key.indexOf(this.dfOptions.prefix) == 0) {
          clearKeys.push(key.substring(this.dfOptions.prefix.length));
        }
      }

      this._map = window.AppCache = {};
      this._destoryInterval();

      if (clearKeys.length > 0) {
        this.remove(clearKeys, success || function () {}, fail || function () {});
      } else {
        typeof success == 'function' && success();
      }
    } catch (e) {
      typeof fail == 'function' && fail();
    }
  };

  /**
   * 删除所有过期的值
   */
  WxStorageCache.prototype.deleteAllExpires = function (success, fail) {
    this._map = window.AppCache;
    //处理Map中过期的key,之后 给 remove 处理
    var delKeys = [],
        now = new Date().getTime();
    for (var key in this._map) {
      var values = this._map[key],
          expires = values.expires;
      if (expires != -1 && expires < now) {
        //获取值,根据expires 判断是否真实删除
        delKeys.push(key.substring(this.dfOptions.prefix.length));
      }
    }

    if (delKeys.length > 0) {
      this.remove(delKeys, success || function () {}, fail || function () {});
    } else {
      typeof success == 'function' && success();
    }
  };

  module.exports = new WxStorageCache();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInhjeC1zdG9yYWdlLWNhY2hlLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImdldEFwcCIsImNvcHlUbyIsImZyb21Tb3VyY2UiLCJ0b1NvdXJjZSIsImtleSIsImlzRW1wdHkiLCJvYmoiLCJmbGFnIiwiV3hTdG9yYWdlQ2FjaGUiLCJvcHRpb25zIiwiZGZPcHRpb25zIiwiZGVmYXVsdFRpbWVvdXQiLCJwcmVmaXgiLCJfaW5pdCIsIl9hY3RpdmVJbnRlcnZhbCIsInByb3RvdHlwZSIsInRoYXQiLCJfbWFwIiwiQXBwQ2FjaGUiLCJfaW50ZXJ2YWwiLCJyZXMiLCJ3eCIsImdldFN0b3JhZ2VJbmZvU3luYyIsImtleXMiLCJpIiwibGVuIiwibGVuZ3RoIiwiaW5kZXhPZiIsInZhbHVlcyIsImdldFN0b3JhZ2VTeW5jIiwiZSIsInNldEludGVydmFsIiwiZGVsS2V5cyIsIm5vdyIsIkRhdGUiLCJnZXRUaW1lIiwiZXhwaXJlcyIsInB1c2giLCJzdWJzdHJpbmciLCJyZW1vdmUiLCJfZGVzdG9yeUludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInB1dCIsInZhbHVlIiwiZGZPcHRzIiwic2NvcGUiLCJkdXJhdGlvbiIsInN1Y2Nlc3MiLCJmYWlsIiwibmV3VmFsIiwic2V0U3RvcmFnZVN5bmMiLCJjYWxsIiwibWVzc2FnZSIsImNvbnRhaW5zIiwiZ2V0IiwiX2tleSIsIkFycmF5IiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwiayIsImNsZWFyIiwiY2xlYXJLZXlzIiwiZGVsZXRlQWxsRXhwaXJlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNBO0FBQ0EsSUFBSSxPQUFPQSxNQUFQLElBQWlCLFdBQXJCLEVBQWtDO0FBQUVBLFdBQVNDLFFBQVQ7QUFBb0I7O0FBRXhELENBQUMsWUFBVTs7QUFFVDtBQUNBLFdBQVNDLE1BQVQsQ0FBZ0JDLFVBQWhCLEVBQTJCQyxRQUEzQixFQUFvQztBQUNoQyxRQUFHLFFBQU9ELFVBQVAseUNBQU9BLFVBQVAsTUFBcUIsUUFBckIsSUFBaUMsUUFBT0MsUUFBUCx5Q0FBT0EsUUFBUCxNQUFtQixRQUF2RCxFQUFnRTtBQUFFO0FBQVE7QUFDMUUsU0FBSSxJQUFJQyxHQUFSLElBQWVGLFVBQWYsRUFBMEI7QUFDeEIsVUFBRyxPQUFPQyxTQUFTQyxHQUFULENBQVAsSUFBd0IsV0FBM0IsRUFBdUM7QUFDckNELGlCQUFTQyxHQUFULElBQWdCRixXQUFXRSxHQUFYLENBQWhCO0FBQ0Q7QUFDRjtBQUNELFdBQU9ELFFBQVA7QUFDSDs7QUFFRCxXQUFTRSxPQUFULENBQWlCQyxHQUFqQixFQUFxQjtBQUNuQixRQUFJQyxPQUFPLElBQVg7QUFDQSxTQUFJLElBQUlILEdBQVIsSUFBZ0JFLE9BQU8sRUFBdkIsRUFBMkI7QUFBRUMsYUFBTyxLQUFQLENBQWM7QUFBTztBQUNsRCxXQUFPQSxJQUFQO0FBQ0Q7O0FBRUQsV0FBU0MsY0FBVCxDQUF3QkMsT0FBeEIsRUFBZ0M7O0FBRTlCLFNBQUtDLFNBQUwsR0FBaUI7QUFDZkMsc0JBQWlCLEtBQUssRUFEUCxDQUNhO0FBRGIsUUFFZEMsUUFBZ0I7O0FBRkYsS0FBakI7O0FBTUFYLFdBQU9RLFdBQVcsRUFBbEIsRUFBc0IsS0FBS0MsU0FBM0I7O0FBRUEsU0FBS0csS0FBTDs7QUFFQTtBQUNBLFNBQUtDLGVBQUw7QUFDRDs7QUFFRE4saUJBQWVPLFNBQWYsQ0FBeUJGLEtBQXpCLEdBQWlDLFlBQVU7QUFDekM7QUFDQSxRQUFTRyxPQUFPLElBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFpQmxCLE9BQU9tQixRQUFQLEtBQW9CbkIsT0FBT21CLFFBQVAsR0FBa0IsRUFBdEMsQ0FBakIsQ0FIeUMsQ0FHbUI7QUFDNUQsU0FBS0MsU0FBTCxHQUFpQixJQUFqQjs7QUFFQTtBQUNBLFFBQUk7QUFDRixVQUFJZCxRQUFRLEtBQUtZLElBQWIsQ0FBSixFQUF1QjtBQUNyQixZQUFJRyxNQUFNQyxHQUFHQyxrQkFBSCxFQUFWO0FBQUEsWUFBbUNDLE9BQU9ILElBQUlHLElBQTlDO0FBQ0EsYUFBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsTUFBTUYsS0FBS0csTUFBM0IsRUFBbUNGLElBQUlDLEdBQXZDLEVBQTRDRCxHQUE1QyxFQUFpRDtBQUMvQztBQUNBLGNBQUlwQixJQUFJdUIsT0FBSixDQUFZLEtBQUtqQixTQUFMLENBQWVFLE1BQTNCLEtBQXNDLENBQTFDLEVBQTRDO0FBQzFDLGdCQUFJZ0IsU0FBU1AsR0FBR1EsY0FBSCxDQUFrQnpCLEdBQWxCLENBQWI7QUFDQSxpQkFBS2EsSUFBTCxDQUFVYixHQUFWLElBQWlCd0IsTUFBakI7QUFDRDtBQUNGO0FBQ0Y7QUFFRixLQVpELENBWUUsT0FBT0UsQ0FBUCxFQUFVLENBQUU7QUFHZixHQXRCRDs7QUF3QkE7QUFDQXRCLGlCQUFlTyxTQUFmLENBQXlCRCxlQUF6QixHQUEyQyxZQUFVO0FBQ25ELFFBQUksS0FBS0ssU0FBTCxJQUFrQixJQUF0QixFQUEyQjtBQUN6QixVQUFTSCxPQUFPLElBQWhCO0FBQ0EsV0FBU0MsSUFBVCxHQUFnQmxCLE9BQU9tQixRQUF2QjtBQUNBLFdBQUtDLFNBQUwsR0FBaUJZLFlBQVksWUFBVTtBQUNyQztBQUNBLFlBQUlDLFVBQVUsRUFBZDtBQUFBLFlBQWlCQyxNQUFNLElBQUlDLElBQUosR0FBV0MsT0FBWCxFQUF2QjtBQUNBLGFBQUksSUFBSS9CLEdBQVIsSUFBZVksS0FBS0MsSUFBcEIsRUFBeUI7QUFDdkI7QUFDQSxjQUFJVyxTQUFTWixLQUFLQyxJQUFMLENBQVViLEdBQVYsQ0FBYjtBQUFBLGNBQ0dnQyxVQUFVUixPQUFPUSxPQURwQjtBQUVBLGNBQUlBLFdBQVcsQ0FBQyxDQUFaLElBQWlCQSxVQUFVSCxHQUEvQixFQUFtQztBQUNqQ0Qsb0JBQVFLLElBQVIsQ0FBYWpDLElBQUlrQyxTQUFKLENBQWN0QixLQUFLTixTQUFMLENBQWVFLE1BQWYsQ0FBc0JjLE1BQXBDLENBQWI7QUFDRDtBQUNGO0FBQ0Q7QUFDQSxZQUFHTSxRQUFRTixNQUFSLEdBQWlCLENBQXBCLEVBQXNCO0FBQ3BCVixlQUFLdUIsTUFBTCxDQUFZUCxPQUFaO0FBQ0Q7QUFDRixPQWZnQixFQWVmLElBZmUsQ0FBakI7QUFnQkQ7QUFDRixHQXJCRDs7QUF1QkE7QUFDQXhCLGlCQUFlTyxTQUFmLENBQXlCeUIsZ0JBQXpCLEdBQTRDLFlBQVU7QUFDcERDLGtCQUFjLEtBQUt0QixTQUFuQjtBQUNBLFNBQUtBLFNBQUwsR0FBaUIsSUFBakI7QUFDRCxHQUhEOztBQUtBOzs7Ozs7O0FBT0FYLGlCQUFlTyxTQUFmLENBQXlCMkIsR0FBekIsR0FBK0IsVUFBU3RDLEdBQVQsRUFBYXVDLEtBQWIsRUFBbUJsQyxPQUFuQixFQUEyQjtBQUN0RCxRQUFHLE9BQU9rQyxLQUFQLElBQWdCLFdBQW5CLEVBQStCO0FBQUU7QUFBUztBQUMxQyxTQUFLN0IsZUFBTDs7QUFFQSxRQUFJOEIsU0FBUztBQUNYQyxhQUFVLElBREM7QUFFWEMsZ0JBQVUsS0FBS3BDLFNBQUwsQ0FBZUMsY0FGZCxFQUU4QjtBQUN6Q29DLGVBQVUsbUJBQVUsQ0FBRSxDQUhYO0FBSVhDLFlBQVUsZ0JBQVUsQ0FBRTtBQUpYLEtBQWI7QUFBQSxRQUtFZixNQUFNLElBQUlDLElBQUosR0FBV0MsT0FBWCxFQUxSO0FBTUFsQyxXQUFPUSxXQUFXLEVBQWxCLEVBQXVCbUMsTUFBdkI7O0FBRUEsUUFBR0QsU0FBUyxJQUFaLEVBQWlCO0FBQ2YsV0FBS0osTUFBTCxDQUFZbkMsR0FBWixFQUFpQndDLE9BQU9HLE9BQXhCLEVBQWlDSCxPQUFPSSxJQUF4QztBQUNEOztBQUVELFFBQUlDLFNBQVM7QUFDWGIsZUFBVVEsT0FBT0UsUUFBUCxHQUFrQixDQUFsQixHQUFzQixDQUFDLENBQXZCLEdBQTRCYixNQUFNVyxPQUFPRSxRQUFQLEdBQWtCLElBRG5ELEVBQzJEO0FBQ3RFSCxhQUFVQTtBQUZDLEtBQWI7O0FBS012QyxVQUFNLEtBQUtNLFNBQUwsQ0FBZUUsTUFBZixHQUF3QlIsR0FBOUI7QUFDTixTQUFLYSxJQUFMLEdBQVlsQixPQUFPbUIsUUFBbkI7QUFDQSxRQUFHO0FBQ0QsV0FBS0QsSUFBTCxDQUFVYixHQUFWLElBQWlCNkMsTUFBakI7QUFDQTVCLFNBQUc2QixjQUFILENBQWtCOUMsR0FBbEIsRUFBdUI2QyxNQUF2QjtBQUNBTCxhQUFPRyxPQUFQLENBQWVJLElBQWYsQ0FBb0JQLE9BQU9DLEtBQTNCO0FBQ0QsS0FKRCxDQUlDLE9BQU1mLENBQU4sRUFBUTtBQUNQYyxhQUFPSSxJQUFQLENBQVlHLElBQVosQ0FBaUJQLE9BQU9DLEtBQXhCLEVBQStCZixFQUFFc0IsT0FBRixJQUFhLE1BQTVDO0FBQ0Q7QUFFSixHQS9CRDs7QUFpQ0E7Ozs7QUFJQTVDLGlCQUFlTyxTQUFmLENBQXlCc0MsUUFBekIsR0FBb0MsVUFBU2pELEdBQVQsRUFBYTtBQUMvQyxTQUFLYSxJQUFMLEdBQVlsQixPQUFPbUIsUUFBbkI7QUFDQWQsVUFBTSxLQUFLTSxTQUFMLENBQWVFLE1BQWYsR0FBd0JSLEdBQTlCO0FBQ0EsUUFBSXdCLFNBQVMsS0FBS1gsSUFBTCxDQUFVYixHQUFWLENBQWI7QUFDQSxRQUFJLE9BQU93QixNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDLFVBQUlRLFVBQVVSLE9BQU9RLE9BQXJCO0FBQUEsVUFBOEJILE1BQU0sSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBQXBDO0FBQUEsVUFBMERRLFFBQVFmLE9BQU9lLEtBQXpFO0FBQ0EsVUFBSVAsV0FBVyxDQUFDLENBQVosSUFBaUJBLFVBQVVILEdBQS9CLEVBQW9DO0FBQUVVLGdCQUFRLElBQVI7QUFBZTtBQUNyRCxhQUFPQSxTQUFTLElBQWhCO0FBQ0Q7QUFDRCxXQUFPLEtBQVA7QUFDRCxHQVZEOztBQVlEOzs7QUFHQ25DLGlCQUFlTyxTQUFmLENBQXlCdUMsR0FBekIsR0FBK0IsVUFBU2xELEdBQVQsRUFBYUssT0FBYixFQUFxQjtBQUNsRCxTQUFLUSxJQUFMLEdBQVlsQixPQUFPbUIsUUFBbkI7QUFDQSxRQUFLcUMsT0FBTyxLQUFLN0MsU0FBTCxDQUFlRSxNQUFmLEdBQXdCUixHQUFwQztBQUNBLFFBQUl3QixTQUFRLEtBQUtYLElBQUwsQ0FBVXNDLElBQVYsQ0FBWjtBQUFBLFFBQTRCWCxTQUFTO0FBQ25DTCxjQUFVLEtBRHlCLEVBQ1g7QUFDeEJRLGVBQVUsbUJBQVUsQ0FBRSxDQUZhO0FBR25DQyxZQUFVLGdCQUFVLENBQUUsQ0FIYTtBQUluQ0gsYUFBVTtBQUp5QixLQUFyQztBQU1BNUMsV0FBT1EsV0FBVyxFQUFsQixFQUFzQm1DLE1BQXRCOztBQUVBLFFBQUksT0FBT2hCLE1BQVAsS0FBa0IsV0FBdEIsRUFBa0M7QUFDaEMsVUFBSVEsVUFBVVIsT0FBT1EsT0FBckI7QUFBQSxVQUE2QkgsTUFBTSxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBbkM7QUFBQSxVQUF3RFEsUUFBUWYsT0FBT2UsS0FBdkU7QUFDQSxVQUFJUCxXQUFXLENBQUMsQ0FBWixJQUFpQkEsVUFBVUgsR0FBL0IsRUFBbUM7QUFDakNVLGdCQUFRLElBQVI7QUFDRDtBQUNELFVBQUdBLFNBQVMsSUFBWixFQUFpQjtBQUNmQyxlQUFPSSxJQUFQLENBQVlHLElBQVosQ0FBaUJQLE9BQU9DLEtBQXhCLEVBQThCLE9BQTlCO0FBQ0QsT0FGRCxNQUVLO0FBQ0gsWUFBSUQsT0FBT0wsTUFBWCxFQUFrQjtBQUFFLGVBQUtBLE1BQUwsQ0FBWSxFQUFFbkMsS0FBS0EsR0FBUCxFQUFaO0FBQTRCLFNBRDdDLENBQzhDO0FBQ2pEd0MsZUFBT0csT0FBUCxDQUFlSSxJQUFmLENBQW9CUCxPQUFPQyxLQUEzQixFQUFrQ0YsS0FBbEM7QUFDRDtBQUNGO0FBQ0Q7QUFFRCxHQXpCRDs7QUEyQkE7OztBQUdBbkMsaUJBQWVPLFNBQWYsQ0FBeUJ3QixNQUF6QixHQUFrQyxVQUFTOUIsT0FBVCxFQUFpQjtBQUNqRCxRQUFJbUMsU0FBUztBQUNYeEMsV0FBVSxFQURDO0FBRVgyQyxlQUFVLG1CQUFVLENBQUUsQ0FGWDtBQUdYQyxZQUFVLGdCQUFVLENBQUUsQ0FIWDtBQUlYSCxhQUFVO0FBSkMsS0FBYjtBQUFBLFFBS0U3QixPQUFPLElBTFQ7QUFNQSxRQUFHLE9BQU9QLE9BQVAsSUFBa0IsUUFBbEIsSUFBOEJBLG1CQUFtQitDLEtBQXBELEVBQTBEO0FBQ3hEWixhQUFPeEMsR0FBUCxHQUFhSyxPQUFiO0FBQ0QsS0FGRCxNQUVLO0FBQ0hSLGFBQU9RLFdBQVcsRUFBbEIsRUFBdUJtQyxNQUF2QjtBQUNEOztBQUVELFFBQUl4QyxNQUFPd0MsT0FBT3hDLEdBQWxCO0FBQ0EsU0FBS2EsSUFBTCxHQUFZbEIsT0FBT21CLFFBQW5CO0FBQ0EsUUFBSSxPQUFPZCxHQUFQLEtBQWUsUUFBbkIsRUFBNEI7QUFDeEJBLFlBQU0sS0FBS00sU0FBTCxDQUFlRSxNQUFmLEdBQXdCUixHQUE5QjtBQUNBLGFBQU8sS0FBS2EsSUFBTCxDQUFVYixHQUFWLENBQVA7QUFDQSxVQUFHO0FBQ0RpQixXQUFHb0MsaUJBQUgsQ0FBcUJyRCxHQUFyQjtBQUNBd0MsZUFBT0csT0FBUCxDQUFlSSxJQUFmLENBQW9CUCxPQUFPQyxLQUEzQixFQUFrQ3pDLEdBQWxDLEVBRkMsQ0FFc0M7QUFDeEMsT0FIRCxDQUdDLE9BQU0wQixDQUFOLEVBQVE7QUFDUDRCLGdCQUFRQyxHQUFSLENBQVk3QixDQUFaO0FBQ0FjLGVBQU9JLElBQVAsQ0FBWUcsSUFBWixDQUFpQlAsT0FBT0MsS0FBeEIsRUFBK0JmLEVBQUVzQixPQUFGLElBQWEsTUFBNUM7QUFDRDtBQUNKLEtBVkQsTUFVTSxJQUFHaEQsZUFBZW9ELEtBQWxCLEVBQXdCO0FBQzVCLFVBQUc7QUFDRCxhQUFLLElBQUloQyxJQUFJLENBQVIsRUFBV0MsTUFBTXJCLElBQUlzQixNQUExQixFQUFrQ0YsSUFBSUMsR0FBdEMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQzlDLGNBQUlvQyxJQUFJeEQsSUFBSW9CLENBQUosQ0FBUjtBQUNBb0MsY0FBSSxLQUFLbEQsU0FBTCxDQUFlRSxNQUFmLEdBQXdCZ0QsQ0FBNUI7QUFDQSxpQkFBTyxLQUFLM0MsSUFBTCxDQUFVMkMsQ0FBVixDQUFQLENBSDhDLENBR1A7QUFDdkN2QyxhQUFHb0MsaUJBQUgsQ0FBcUJHLENBQXJCO0FBQ0Q7QUFDRGhCLGVBQU9HLE9BQVAsQ0FBZUksSUFBZixDQUFvQlAsT0FBT0MsS0FBM0IsRUFBa0N6QyxHQUFsQztBQUNELE9BUkQsQ0FRRSxPQUFPMEIsQ0FBUCxFQUFTO0FBQ1RjLGVBQU9JLElBQVAsQ0FBWUcsSUFBWixDQUFpQlAsT0FBT0MsS0FBeEIsRUFBK0JmLEVBQUVzQixPQUFGLElBQWEsTUFBNUM7QUFDRDtBQUNGLEtBWkssTUFZRDtBQUNILFlBQU0sV0FBTjtBQUNEO0FBQ0YsR0F4Q0Q7O0FBMENBOzs7QUFHQTVDLGlCQUFlTyxTQUFmLENBQXlCOEMsS0FBekIsR0FBaUMsVUFBU2QsT0FBVCxFQUFpQkMsSUFBakIsRUFBc0I7O0FBRXJELFFBQUc7QUFDRCxVQUFJYyxZQUFZLEVBQWhCO0FBQ0EsV0FBSyxJQUFJMUQsR0FBVCxJQUFnQixLQUFLYSxJQUFyQixFQUEyQjtBQUN6QixZQUFJYixJQUFJdUIsT0FBSixDQUFZLEtBQUtqQixTQUFMLENBQWVFLE1BQTNCLEtBQXNDLENBQTFDLEVBQTZDO0FBQzNDa0Qsb0JBQVV6QixJQUFWLENBQWVqQyxJQUFJa0MsU0FBSixDQUFjLEtBQUs1QixTQUFMLENBQWVFLE1BQWYsQ0FBc0JjLE1BQXBDLENBQWY7QUFDRDtBQUNGOztBQUVELFdBQUtULElBQUwsR0FBWWxCLE9BQU9tQixRQUFQLEdBQWtCLEVBQTlCO0FBQ0EsV0FBS3NCLGdCQUFMOztBQUVBLFVBQUlzQixVQUFVcEMsTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN4QixhQUFLYSxNQUFMLENBQVl1QixTQUFaLEVBQXVCZixXQUFXLFlBQVksQ0FBRyxDQUFqRCxFQUFtREMsUUFBUSxZQUFZLENBQUcsQ0FBMUU7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPRCxPQUFQLElBQWtCLFVBQWxCLElBQWdDQSxTQUFoQztBQUNEO0FBQ0YsS0FoQkQsQ0FnQkMsT0FBTWpCLENBQU4sRUFBUTtBQUNQLGFBQU9rQixJQUFQLElBQWUsVUFBZixJQUE2QkEsTUFBN0I7QUFDRDtBQUVGLEdBdEJEOztBQXdCQTs7O0FBR0F4QyxpQkFBZU8sU0FBZixDQUF5QmdELGdCQUF6QixHQUE0QyxVQUFTaEIsT0FBVCxFQUFpQkMsSUFBakIsRUFBc0I7QUFDaEUsU0FBSy9CLElBQUwsR0FBWWxCLE9BQU9tQixRQUFuQjtBQUNBO0FBQ0EsUUFBSWMsVUFBVSxFQUFkO0FBQUEsUUFBa0JDLE1BQU0sSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBQXhCO0FBQ0EsU0FBSyxJQUFJL0IsR0FBVCxJQUFnQixLQUFLYSxJQUFyQixFQUEyQjtBQUN6QixVQUFJVyxTQUFTLEtBQUtYLElBQUwsQ0FBVWIsR0FBVixDQUFiO0FBQUEsVUFDRWdDLFVBQVVSLE9BQU9RLE9BRG5CO0FBRUEsVUFBSUEsV0FBVyxDQUFDLENBQVosSUFBaUJBLFVBQVVILEdBQS9CLEVBQW9DO0FBQUM7QUFDbkNELGdCQUFRSyxJQUFSLENBQWFqQyxJQUFJa0MsU0FBSixDQUFjLEtBQUs1QixTQUFMLENBQWVFLE1BQWYsQ0FBc0JjLE1BQXBDLENBQWI7QUFDRDtBQUNGOztBQUVELFFBQUlNLFFBQVFOLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsV0FBS2EsTUFBTCxDQUFZUCxPQUFaLEVBQW9CZSxXQUFXLFlBQVUsQ0FBRSxDQUEzQyxFQUE4Q0MsUUFBUSxZQUFVLENBQUUsQ0FBbEU7QUFDRCxLQUZELE1BRUs7QUFDSCxhQUFPRCxPQUFQLElBQWtCLFVBQWxCLElBQWdDQSxTQUFoQztBQUNEO0FBRUYsR0FsQkQ7O0FBcUJBaUIsU0FBT0MsT0FBUCxHQUFpQixJQUFJekQsY0FBSixFQUFqQjtBQUVELENBalJEIiwiZmlsZSI6InhjeC1zdG9yYWdlLWNhY2hlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOeUqOS6juWunueOsEpT5YmN56uv57yT5a2YXHJcbiAqIFxyXG4gKiDnibnliKvor7TmmI7vvJpcclxuICogIOmSiOWvuSDlvq7kv6HlsI/nqIvluo8g5YGa55qE5pS56YCgXHJcbiAqIOa6kOS6ju+8mlxyXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL1dRVGVhbS93ZWItc3RvcmFnZS1jYWNoZSDmj5DkvpvnmoTmgJ3ot69cclxuICogXHJcbiAqIFxyXG4gKiDlrp7njrDmgJ3ot6/vvJpcclxuICogMeOAgVd4U3RvcmFnZUNhY2hl57G7LOWvueWkluWPquWunueOsOivpeexu+eahOWNleS+i1xyXG4gKiAy44CB5a6e546w5Y2V5L6L5pe277yM5Yid5aeL5YyWIHN0b3JhZ2XmlbDmja7liLDlhoXlrZhNYXDlr7nosaHlhoVcclxuICogICAgMi4x44CBbWFw5Li65YWo5bGA54us56uL5a+56LGhIFxyXG4gKiAgICAyLjLjgIHlvIDlkK/lrprml7blmahcclxuICogM+OAgeW9kyBzdG9yYWdlIOacieaWsOWinuaVsOaNruaXtu+8jOWQjOatpeabtOaWsCBNYXBcclxuICogXHJcbiAqIDTjgIHlrprkuYnorr7nva7lj4LmlbBcclxuICogICAgNC4x44CB5oyH5a6a5pel5pyf5Yig6ZmkXHJcbiAqICAgIDQuMuOAgeWbuuWumuaXtumXtOWIoOmZpFxyXG4gKiAgICA0LjPjgIHpnIDlj4LogINqcXVlcnkgY2FjaGXlj4LmlbDorr7nva5cclxuICogICAgNC4044CB5Y+C5pWw5Li+5L6L77yaXHJcbiAqICAgICAgICB7XHJcbiAqICAgICAgICAgICAga2V5IDoge1xyXG4gKiAgICAgICAgICAgICAgZXhwaXJlcyA6IOi/h+acn+aXtumXtOaIsyxcclxuICogICAgICAgICAgICAgIHZhbHVlICAgOiBPYmplY3Qg5YC8XHJcbiAqICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgICAgIC8vLC4uLi4uXHJcbiAqICAgICAgICB9XHJcbiAqIFxyXG4gKiA144CB5omT566X6YeN5p6EIHdpbmRvdy5BcHBDYWNoZSDov5nkuKrlr7nosaEgLCDkvZzkuLrni6znq4vnmoQgV3hTdG9yYWdlQ2FjaGUg5a+56LGhID9cclxuICogXHJcbiAqL1xyXG5cclxuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0g5q2j57uP6YC76L6R5Luj56CB55qE5YiG5Ymy57q/ID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbmlmICh0eXBlb2Ygd2luZG93ID09ICd1bmRlZmluZWQnKSB7IHdpbmRvdyA9IGdldEFwcCgpOyB9XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuIFxyXG4gIC8v5by65Yi25ou36LSdLOmdniBmcm9tU291cmNlIOWxnuaApywg5Z2H5LiN5pSv5oyBIGNvcHlcclxuICBmdW5jdGlvbiBjb3B5VG8oZnJvbVNvdXJjZSx0b1NvdXJjZSl7XHJcbiAgICAgIGlmKHR5cGVvZiBmcm9tU291cmNlICE9ICdvYmplY3QnIHx8IHR5cGVvZiB0b1NvdXJjZSAhPSAnb2JqZWN0Jyl7IHJldHVybjt9XHJcbiAgICAgIGZvcih2YXIga2V5IGluIGZyb21Tb3VyY2Upe1xyXG4gICAgICAgIGlmKHR5cGVvZiB0b1NvdXJjZVtrZXldICE9ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgIHRvU291cmNlW2tleV0gPSBmcm9tU291cmNlW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b1NvdXJjZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRW1wdHkob2JqKXtcclxuICAgIHZhciBmbGFnID0gdHJ1ZTtcclxuICAgIGZvcih2YXIga2V5IGluIChvYmogfHwge30pKXsgZmxhZyA9IGZhbHNlOyBicmVhazt9XHJcbiAgICByZXR1cm4gZmxhZztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIFd4U3RvcmFnZUNhY2hlKG9wdGlvbnMpe1xyXG4gICAgXHJcbiAgICB0aGlzLmRmT3B0aW9ucyA9IHtcclxuICAgICAgZGVmYXVsdFRpbWVvdXQgOiA2MCAqIDYwICAgIC8v5pyA6ZW/5L+d5a2Y5pe26Ze0IDEgaG91clxyXG4gICAgICAscHJlZml4ICAgICAgICA6ICdfX2NhY2hlXydcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGNvcHlUbyhvcHRpb25zIHx8IHt9LCB0aGlzLmRmT3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5faW5pdCgpO1xyXG4gIFxyXG4gICAgLy8gaW50ZXJ2YWwg5b2T5a6a5pe25ZmoIOebkeWQrOWIsCDlhoXpg6jml6Dlr7nosaEs5YiZ5q2k5pe25Y+v5Lul5YGc5q2iLOebtOWIsOmHjeaWsHB1dFxyXG4gICAgdGhpcy5fYWN0aXZlSW50ZXJ2YWwoKTtcclxuICB9XHJcblxyXG4gIFd4U3RvcmFnZUNhY2hlLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAvL+WGheWtmOe8k+WtmOWvueixoVxyXG4gICAgdmFyICAgICAgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGlzLl9tYXAgICAgICA9IHdpbmRvdy5BcHBDYWNoZSB8fCAod2luZG93LkFwcENhY2hlID0ge30pOyAvL+i/memHjOiAg+iZkeWIsOWFqOWxgOe8k+WtmOWvueixoSzoioLnnIHph43lpI3liJ3lp4vljJblvIDmlK9cclxuICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcclxuXHJcbiAgICAvL1RPRE8g5Yid5aeL5YyW5YaF5a2Y5a+56LGhXHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoaXNFbXB0eSh0aGlzLl9tYXApKXtcclxuICAgICAgICB2YXIgcmVzID0gd3guZ2V0U3RvcmFnZUluZm9TeW5jKCksIGtleXMgPSByZXMua2V5cztcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0ga2V5cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgLy9UT0RPIOWIpOaWreWxnuS6jue8k+WtmOeahFxyXG4gICAgICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuZGZPcHRpb25zLnByZWZpeCkgPT0gMCl7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB3eC5nZXRTdG9yYWdlU3luYyhrZXkpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBba2V5XSA9IHZhbHVlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgXHJcbiAgICBcclxuICB9XHJcblxyXG4gIC8v6I635Y+W5r+A5rS75a6a5pe25ZmoW+WmguaenOWumuaXtuWZqOWkhOS6jumUgOavgeeKtuaAgeeahOivnV1cclxuICBXeFN0b3JhZ2VDYWNoZS5wcm90b3R5cGUuX2FjdGl2ZUludGVydmFsID0gZnVuY3Rpb24oKXtcclxuICAgIGlmICh0aGlzLl9pbnRlcnZhbCA9PSBudWxsKXtcclxuICAgICAgdmFyICAgICAgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHRoaXMgICAgLl9tYXAgPSB3aW5kb3cuQXBwQ2FjaGU7XHJcbiAgICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAvL+WkhOeQhk1hcOS4rei/h+acn+eahGtleSzkuYvlkI4g57uZIHJlbW92ZSDlpITnkIZcclxuICAgICAgICB2YXIgZGVsS2V5cyA9IFtdLG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoYXQuX21hcCl7XHJcbiAgICAgICAgICAvL+iOt+WPluWAvCzmoLnmja5leHBpcmVzIOWIpOaWreaYr+WQpuecn+WunuWIoOmZpFxyXG4gICAgICAgICAgdmFyIHZhbHVlcyA9IHRoYXQuX21hcFtrZXldLCBcclxuICAgICAgICAgICAgIGV4cGlyZXMgPSB2YWx1ZXMuZXhwaXJlcztcclxuICAgICAgICAgIGlmIChleHBpcmVzICE9IC0xICYmIGV4cGlyZXMgPCBub3cpe1xyXG4gICAgICAgICAgICBkZWxLZXlzLnB1c2goa2V5LnN1YnN0cmluZyh0aGF0LmRmT3B0aW9ucy5wcmVmaXgubGVuZ3RoKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5omn6KGM5byC5q2l5Yig6Zmk5pON5L2c44CQ5Lya5LiN5Lya5byV5Y+R5ZCM5q2l6Zeu6aKY44CRIC0tIOWFiOWQjOatpVxyXG4gICAgICAgIGlmKGRlbEtleXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICB0aGF0LnJlbW92ZShkZWxLZXlzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sMTAwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL+mUgOavgeWumuaXtuWZqFxyXG4gIFd4U3RvcmFnZUNhY2hlLnByb3RvdHlwZS5fZGVzdG9yeUludGVydmFsID0gZnVuY3Rpb24oKXtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xyXG4gICAgdGhpcy5faW50ZXJ2YWwgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K6+572u57yT5a2YXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAgIOe8k+WtmEtFWVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSDnvJPlrZjlgLxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyDmianlsZXphY3nva7lsZ7mgKdcclxuICAgKlxyXG4gICAqL1xyXG4gIFd4U3RvcmFnZUNhY2hlLnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbihrZXksdmFsdWUsb3B0aW9ucyl7XHJcbiAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyl7IHJldHVybjsgfVxyXG4gICAgICB0aGlzLl9hY3RpdmVJbnRlcnZhbCgpO1xyXG5cclxuICAgICAgdmFyIGRmT3B0cyA9IHtcclxuICAgICAgICBzY29wZSAgIDogdGhpcyxcclxuICAgICAgICBkdXJhdGlvbjogdGhpcy5kZk9wdGlvbnMuZGVmYXVsdFRpbWVvdXQsIC8v57yT5a2Y5pe26ZW/IOWNleS9jSA6IHNcclxuICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24oKXt9LFxyXG4gICAgICAgIGZhaWwgICAgOiBmdW5jdGlvbigpe31cclxuICAgICAgfSxub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgY29weVRvKG9wdGlvbnMgfHwge30gLCBkZk9wdHMpO1xyXG5cclxuICAgICAgaWYodmFsdWUgPT0gbnVsbCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoa2V5LCBkZk9wdHMuc3VjY2VzcywgZGZPcHRzLmZhaWwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgbmV3VmFsID0ge1xyXG4gICAgICAgIGV4cGlyZXMgOiBkZk9wdHMuZHVyYXRpb24gPCAwID8gLTEgOiAobm93ICsgZGZPcHRzLmR1cmF0aW9uICogMTAwMCkgLCAvLyAtMSDkuI3pmZDliLbml7bpl7RcclxuICAgICAgICB2YWx1ZSAgIDogdmFsdWVcclxuICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGtleSA9IHRoaXMuZGZPcHRpb25zLnByZWZpeCArIGtleTtcclxuICAgICAgdGhpcy5fbWFwID0gd2luZG93LkFwcENhY2hlOyAgICAgIFxyXG4gICAgICB0cnl7XHJcbiAgICAgICAgdGhpcy5fbWFwW2tleV0gPSBuZXdWYWw7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoa2V5LCBuZXdWYWwpO1xyXG4gICAgICAgIGRmT3B0cy5zdWNjZXNzLmNhbGwoZGZPcHRzLnNjb3BlKTtcclxuICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgIGRmT3B0cy5mYWlsLmNhbGwoZGZPcHRzLnNjb3BlLCBlLm1lc3NhZ2UgfHwgJ+WPkemAgemUmeivrycpO1xyXG4gICAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOaYr+WQpuWMheWQq+acqui/h+acn+eahOWAvFxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkg57yT5a2YS0VZXHJcbiAgICovXHJcbiAgV3hTdG9yYWdlQ2FjaGUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oa2V5KXtcclxuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5BcHBDYWNoZTtcclxuICAgIGtleSA9IHRoaXMuZGZPcHRpb25zLnByZWZpeCArIGtleTtcclxuICAgIHZhciB2YWx1ZXMgPSB0aGlzLl9tYXBba2V5XTtcclxuICAgIGlmICh0eXBlb2YgdmFsdWVzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB2YXIgZXhwaXJlcyA9IHZhbHVlcy5leHBpcmVzLCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSwgdmFsdWUgPSB2YWx1ZXMudmFsdWU7XHJcbiAgICAgIGlmIChleHBpcmVzICE9IC0xICYmIGV4cGlyZXMgPCBub3cpIHsgdmFsdWUgPSBudWxsOyB9XHJcbiAgICAgIHJldHVybiB2YWx1ZSAhPSBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAvKipcclxuICAqIOiOt+WPlue8k+WtmOWAvFxyXG4gICovXHJcbiAgV3hTdG9yYWdlQ2FjaGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGtleSxvcHRpb25zKXtcclxuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5BcHBDYWNoZTtcclxuICAgIHZhciAgX2tleSA9IHRoaXMuZGZPcHRpb25zLnByZWZpeCArIGtleTtcclxuICAgIHZhciB2YWx1ZXM9IHRoaXMuX21hcFtfa2V5XSxkZk9wdHMgPSB7XHJcbiAgICAgIHJlbW92ZSAgOiBmYWxzZSwgICAgICAgIC8v6I635Y+W5YC85ZCOLOeri+WNs+enu+mZpFxyXG4gICAgICBzdWNjZXNzIDogZnVuY3Rpb24oKXt9LFxyXG4gICAgICBmYWlsICAgIDogZnVuY3Rpb24oKXt9LFxyXG4gICAgICBzY29wZSAgIDogdGhpc1xyXG4gICAgfTtcclxuICAgIGNvcHlUbyhvcHRpb25zIHx8IHt9LCBkZk9wdHMpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgdmFsdWVzICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgIHZhciBleHBpcmVzID0gdmFsdWVzLmV4cGlyZXMsbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCksdmFsdWUgPSB2YWx1ZXMudmFsdWU7XHJcbiAgICAgIGlmIChleHBpcmVzICE9IC0xICYmIGV4cGlyZXMgPCBub3cpe1xyXG4gICAgICAgIHZhbHVlID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZih2YWx1ZSA9PSBudWxsKXtcclxuICAgICAgICBkZk9wdHMuZmFpbC5jYWxsKGRmT3B0cy5zY29wZSwn57yT5a2Y5LiN5a2Y5ZyoJyk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGlmIChkZk9wdHMucmVtb3ZlKXsgdGhpcy5yZW1vdmUoeyBrZXk6IGtleX0pOyAgfSAvL+iHquWKqOWIoOmZpOWJjee9rlxyXG4gICAgICAgIGRmT3B0cy5zdWNjZXNzLmNhbGwoZGZPcHRzLnNjb3BlLCB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHd4LmdldFN0b3JhZ2Uoa2V5KTtcclxuICAgIFxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOenu+mZpCBrZXkg5a+55bqU55qE57yT5a2Y5YC8XHJcbiAgICovXHJcbiAgV3hTdG9yYWdlQ2FjaGUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgdmFyIGRmT3B0cyA9IHtcclxuICAgICAga2V5ICAgICA6ICcnLFxyXG4gICAgICBzdWNjZXNzIDogZnVuY3Rpb24oKXt9LCBcclxuICAgICAgZmFpbCAgICA6IGZ1bmN0aW9uKCl7fSxcclxuICAgICAgc2NvcGUgICA6IHRoaXNcclxuICAgIH0sdGhhdCA9IHRoaXM7XHJcbiAgICBpZih0eXBlb2Ygb3B0aW9ucyA9PSAnc3RyaW5nJyB8fCBvcHRpb25zIGluc3RhbmNlb2YgQXJyYXkpeyBcclxuICAgICAgZGZPcHRzLmtleSA9IG9wdGlvbnM7IFxyXG4gICAgfWVsc2V7XHJcbiAgICAgIGNvcHlUbyhvcHRpb25zIHx8IHt9ICwgZGZPcHRzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIGtleSAgPSBkZk9wdHMua2V5O1xyXG4gICAgdGhpcy5fbWFwID0gd2luZG93LkFwcENhY2hlO1xyXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKXtcclxuICAgICAgICBrZXkgPSB0aGlzLmRmT3B0aW9ucy5wcmVmaXggKyBrZXk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX21hcFtrZXldO1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKGtleSk7XHJcbiAgICAgICAgICBkZk9wdHMuc3VjY2Vzcy5jYWxsKGRmT3B0cy5zY29wZSwga2V5KTsvL+Wbnuiwg1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgZGZPcHRzLmZhaWwuY2FsbChkZk9wdHMuc2NvcGUsIGUubWVzc2FnZSB8fCAn5Y+R6YCB6ZSZ6K+vJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfWVsc2UgaWYoa2V5IGluc3RhbmNlb2YgQXJyYXkpe1xyXG4gICAgICB0cnl7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGtleS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgdmFyIGsgPSBrZXlbaV07XHJcbiAgICAgICAgICBrID0gdGhpcy5kZk9wdGlvbnMucHJlZml4ICsgaztcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9tYXBba107ICAgICAgICAgICAgICAgICAgIC8v5b6q546v5omn6KGM5Yig6ZmkXHJcbiAgICAgICAgICB3eC5yZW1vdmVTdG9yYWdlU3luYyhrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGZPcHRzLnN1Y2Nlc3MuY2FsbChkZk9wdHMuc2NvcGUsIGtleSk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpeyBcclxuICAgICAgICBkZk9wdHMuZmFpbC5jYWxsKGRmT3B0cy5zY29wZSwgZS5tZXNzYWdlIHx8ICflj5HpgIHplJnor68nKTtcclxuICAgICAgfVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIHRocm93ICdrZXnkvKDlj4LnsbvlnovmnInor68nO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOa4hemZpOaJgOaciee8k+WtmFxyXG4gICAqL1xyXG4gIFd4U3RvcmFnZUNhY2hlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKHN1Y2Nlc3MsZmFpbCl7XHJcblxyXG4gICAgdHJ5e1xyXG4gICAgICB2YXIgY2xlYXJLZXlzID0gW107XHJcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9tYXApIHsgIFxyXG4gICAgICAgIGlmIChrZXkuaW5kZXhPZih0aGlzLmRmT3B0aW9ucy5wcmVmaXgpID09IDApIHtcclxuICAgICAgICAgIGNsZWFyS2V5cy5wdXNoKGtleS5zdWJzdHJpbmcodGhpcy5kZk9wdGlvbnMucHJlZml4Lmxlbmd0aCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fbWFwID0gd2luZG93LkFwcENhY2hlID0ge307XHJcbiAgICAgIHRoaXMuX2Rlc3RvcnlJbnRlcnZhbCgpO1xyXG5cclxuICAgICAgaWYgKGNsZWFyS2V5cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoY2xlYXJLZXlzLCBzdWNjZXNzIHx8IGZ1bmN0aW9uICgpIHsgfSwgZmFpbCB8fCBmdW5jdGlvbiAoKSB7IH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHR5cGVvZiBzdWNjZXNzID09ICdmdW5jdGlvbicgJiYgc3VjY2VzcygpO1xyXG4gICAgICB9XHJcbiAgICB9Y2F0Y2goZSl7XHJcbiAgICAgIHR5cGVvZiBmYWlsID09ICdmdW5jdGlvbicgJiYgZmFpbCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgfTtcclxuICBcclxuICAvKipcclxuICAgKiDliKDpmaTmiYDmnInov4fmnJ/nmoTlgLxcclxuICAgKi9cclxuICBXeFN0b3JhZ2VDYWNoZS5wcm90b3R5cGUuZGVsZXRlQWxsRXhwaXJlcyA9IGZ1bmN0aW9uKHN1Y2Nlc3MsZmFpbCl7XHJcbiAgICB0aGlzLl9tYXAgPSB3aW5kb3cuQXBwQ2FjaGU7XHJcbiAgICAvL+WkhOeQhk1hcOS4rei/h+acn+eahGtleSzkuYvlkI4g57uZIHJlbW92ZSDlpITnkIZcclxuICAgIHZhciBkZWxLZXlzID0gW10sIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuX21hcCkgeyAgICAgIFxyXG4gICAgICB2YXIgdmFsdWVzID0gdGhpcy5fbWFwW2tleV0sXHJcbiAgICAgICAgZXhwaXJlcyA9IHZhbHVlcy5leHBpcmVzO1xyXG4gICAgICBpZiAoZXhwaXJlcyAhPSAtMSAmJiBleHBpcmVzIDwgbm93KSB7Ly/ojrflj5blgLws5qC55o2uZXhwaXJlcyDliKTmlq3mmK/lkKbnnJ/lrp7liKDpmaRcclxuICAgICAgICBkZWxLZXlzLnB1c2goa2V5LnN1YnN0cmluZyh0aGlzLmRmT3B0aW9ucy5wcmVmaXgubGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGVsS2V5cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlKGRlbEtleXMsc3VjY2VzcyB8fCBmdW5jdGlvbigpe30gLCBmYWlsIHx8IGZ1bmN0aW9uKCl7fSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgdHlwZW9mIHN1Y2Nlc3MgPT0gJ2Z1bmN0aW9uJyAmJiBzdWNjZXNzKCk7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcbiAgXHJcblxyXG4gIG1vZHVsZS5leHBvcnRzID0gbmV3IFd4U3RvcmFnZUNhY2hlKCk7XHJcblxyXG59KSgpOyJdfQ==