'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 图片预加载组件
 *
 * @author HuiminLiu
 */

var ImgLoader = function () {
  /**
   * 初始化方法，在页面的 onLoad 方法中调用，传入 Page 对象及图片加载完成的默认回调
   */
  function ImgLoader(pageContext, defaultCallback) {
    _classCallCheck(this, ImgLoader);

    this.page = pageContext;
    this.defaultCallback = defaultCallback || function () {};
    this.callbacks = {};
    this.imgInfo = {};

    this.page.data.imgLoadList = []; //下载队列
    this.page._imgOnLoad = this._imgOnLoad.bind(this);
    this.page._imgOnLoadError = this._imgOnLoadError.bind(this);
  }

  /**
   * 加载图片
   *
   * @param  {String}   src      图片地址
   * @param  {Function} callback 加载完成后的回调（可选），第一个参数个错误信息，第二个为图片信息
   */


  _createClass(ImgLoader, [{
    key: 'load',
    value: function load(src, callback) {
      if (!src) return;

      var list = this.page.imgLoadList || [],
          imgInfo = this.imgInfo[src];
      if (callback) this.callbacks[src] = callback;

      // 已经加载成功过的，直接回调
      if (imgInfo) {
        this._runCallback(null, {
          src: src,
          width: imgInfo.width,
          height: imgInfo.height
        });

        // 新的未在下载队列中的
      } else if (list.indexOf(src) === -1) {
        list.push(src);
        this.page.imgLoadList = list;
        this.page.$apply();
        // this.page.setData({ 'imgLoadList': list })
      }
    }
  }, {
    key: '_imgOnLoad',
    value: function _imgOnLoad(ev) {
      var src = ev.currentTarget.dataset.src,
          width = ev.detail.width,
          height = ev.detail.height;

      // 记录已下载图片的尺寸信息
      this.imgInfo[src] = { width: width, height: height };
      this._removeFromLoadList(src);

      this._runCallback(null, { src: src, width: width, height: height });
    }
  }, {
    key: '_imgOnLoadError',
    value: function _imgOnLoadError(ev) {
      var src = ev.currentTarget.dataset.src;
      this._removeFromLoadList(src);
      this._runCallback('Loading failed', { src: src });
    }

    // 将图片从下载队列中移除

  }, {
    key: '_removeFromLoadList',
    value: function _removeFromLoadList(src) {
      var list = this.page.imgLoadList;
      list.splice(list.indexOf(src), 1);
      this.page.imgLoadList = list;
      this.page.$apply();
      // this.page.setData({ 'imgLoadList': list })
    }

    // 执行回调

  }, {
    key: '_runCallback',
    value: function _runCallback(err, data) {
      var callback = this.callbacks[data.src] || this.defaultCallback;
      callback(err, data);
      delete this.callbacks[data.src];
    }
  }]);

  return ImgLoader;
}();

module.exports = ImgLoader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltZy1sb2FkZXIuanMiXSwibmFtZXMiOlsiSW1nTG9hZGVyIiwicGFnZUNvbnRleHQiLCJkZWZhdWx0Q2FsbGJhY2siLCJwYWdlIiwiY2FsbGJhY2tzIiwiaW1nSW5mbyIsImRhdGEiLCJpbWdMb2FkTGlzdCIsIl9pbWdPbkxvYWQiLCJiaW5kIiwiX2ltZ09uTG9hZEVycm9yIiwic3JjIiwiY2FsbGJhY2siLCJsaXN0IiwiX3J1bkNhbGxiYWNrIiwid2lkdGgiLCJoZWlnaHQiLCJpbmRleE9mIiwicHVzaCIsIiRhcHBseSIsImV2IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJkZXRhaWwiLCJfcmVtb3ZlRnJvbUxvYWRMaXN0Iiwic3BsaWNlIiwiZXJyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztJQU1NQSxTO0FBQ0o7OztBQUdBLHFCQUFZQyxXQUFaLEVBQXlCQyxlQUF6QixFQUEwQztBQUFBOztBQUN4QyxTQUFLQyxJQUFMLEdBQVlGLFdBQVo7QUFDQSxTQUFLQyxlQUFMLEdBQXVCQSxtQkFBbUIsWUFBVSxDQUFFLENBQXREO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxFQUFmOztBQUVBLFNBQUtGLElBQUwsQ0FBVUcsSUFBVixDQUFlQyxXQUFmLEdBQTZCLEVBQTdCLENBTndDLENBTVI7QUFDaEMsU0FBS0osSUFBTCxDQUFVSyxVQUFWLEdBQXVCLEtBQUtBLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLElBQXJCLENBQXZCO0FBQ0EsU0FBS04sSUFBTCxDQUFVTyxlQUFWLEdBQTRCLEtBQUtBLGVBQUwsQ0FBcUJELElBQXJCLENBQTBCLElBQTFCLENBQTVCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7eUJBTUtFLEcsRUFBS0MsUSxFQUFVO0FBQ2xCLFVBQUksQ0FBQ0QsR0FBTCxFQUFVOztBQUVWLFVBQUlFLE9BQU8sS0FBS1YsSUFBTCxDQUFVSSxXQUFWLElBQXlCLEVBQXBDO0FBQUEsVUFDRUYsVUFBVSxLQUFLQSxPQUFMLENBQWFNLEdBQWIsQ0FEWjtBQUVBLFVBQUlDLFFBQUosRUFDRSxLQUFLUixTQUFMLENBQWVPLEdBQWYsSUFBc0JDLFFBQXRCOztBQUVGO0FBQ0EsVUFBSVAsT0FBSixFQUFhO0FBQ1gsYUFBS1MsWUFBTCxDQUFrQixJQUFsQixFQUF3QjtBQUN0QkgsZUFBS0EsR0FEaUI7QUFFdEJJLGlCQUFPVixRQUFRVSxLQUZPO0FBR3RCQyxrQkFBUVgsUUFBUVc7QUFITSxTQUF4Qjs7QUFNQTtBQUNELE9BUkQsTUFRTyxJQUFJSCxLQUFLSSxPQUFMLENBQWFOLEdBQWIsTUFBc0IsQ0FBQyxDQUEzQixFQUE4QjtBQUNuQ0UsYUFBS0ssSUFBTCxDQUFVUCxHQUFWO0FBQ0EsYUFBS1IsSUFBTCxDQUFVSSxXQUFWLEdBQXdCTSxJQUF4QjtBQUNBLGFBQUtWLElBQUwsQ0FBVWdCLE1BQVY7QUFDQTtBQUNEO0FBQ0Y7OzsrQkFFVUMsRSxFQUFJO0FBQ2IsVUFBSVQsTUFBTVMsR0FBR0MsYUFBSCxDQUFpQkMsT0FBakIsQ0FBeUJYLEdBQW5DO0FBQUEsVUFDRUksUUFBUUssR0FBR0csTUFBSCxDQUFVUixLQURwQjtBQUFBLFVBRUVDLFNBQVNJLEdBQUdHLE1BQUgsQ0FBVVAsTUFGckI7O0FBSUE7QUFDQSxXQUFLWCxPQUFMLENBQWFNLEdBQWIsSUFBb0IsRUFBRUksWUFBRixFQUFTQyxjQUFULEVBQXBCO0FBQ0EsV0FBS1EsbUJBQUwsQ0FBeUJiLEdBQXpCOztBQUVBLFdBQUtHLFlBQUwsQ0FBa0IsSUFBbEIsRUFBd0IsRUFBRUgsUUFBRixFQUFPSSxZQUFQLEVBQWNDLGNBQWQsRUFBeEI7QUFDRDs7O29DQUVlSSxFLEVBQUk7QUFDbEIsVUFBSVQsTUFBTVMsR0FBR0MsYUFBSCxDQUFpQkMsT0FBakIsQ0FBeUJYLEdBQW5DO0FBQ0EsV0FBS2EsbUJBQUwsQ0FBeUJiLEdBQXpCO0FBQ0EsV0FBS0csWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MsRUFBRUgsUUFBRixFQUFwQztBQUNEOztBQUVEOzs7O3dDQUNvQkEsRyxFQUFLO0FBQ3ZCLFVBQUlFLE9BQU8sS0FBS1YsSUFBTCxDQUFVSSxXQUFyQjtBQUNBTSxXQUFLWSxNQUFMLENBQVlaLEtBQUtJLE9BQUwsQ0FBYU4sR0FBYixDQUFaLEVBQStCLENBQS9CO0FBQ0EsV0FBS1IsSUFBTCxDQUFVSSxXQUFWLEdBQXdCTSxJQUF4QjtBQUNBLFdBQUtWLElBQUwsQ0FBVWdCLE1BQVY7QUFDQTtBQUNEOztBQUVEOzs7O2lDQUNhTyxHLEVBQUtwQixJLEVBQU07QUFDdEIsVUFBSU0sV0FBVyxLQUFLUixTQUFMLENBQWVFLEtBQUtLLEdBQXBCLEtBQTRCLEtBQUtULGVBQWhEO0FBQ0FVLGVBQVNjLEdBQVQsRUFBY3BCLElBQWQ7QUFDQSxhQUFPLEtBQUtGLFNBQUwsQ0FBZUUsS0FBS0ssR0FBcEIsQ0FBUDtBQUNEOzs7Ozs7QUFHSGdCLE9BQU9DLE9BQVAsR0FBaUI1QixTQUFqQiIsImZpbGUiOiJpbWctbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDlm77niYfpooTliqDovb3nu4Tku7ZcbiAqXG4gKiBAYXV0aG9yIEh1aW1pbkxpdVxuICovXG5cbmNsYXNzIEltZ0xvYWRlciB7XG4gIC8qKlxuICAgKiDliJ3lp4vljJbmlrnms5XvvIzlnKjpobXpnaLnmoQgb25Mb2FkIOaWueazleS4reiwg+eUqO+8jOS8oOWFpSBQYWdlIOWvueixoeWPiuWbvueJh+WKoOi9veWujOaIkOeahOm7mOiupOWbnuiwg1xuICAgKi9cbiAgY29uc3RydWN0b3IocGFnZUNvbnRleHQsIGRlZmF1bHRDYWxsYmFjaykge1xuICAgIHRoaXMucGFnZSA9IHBhZ2VDb250ZXh0XG4gICAgdGhpcy5kZWZhdWx0Q2FsbGJhY2sgPSBkZWZhdWx0Q2FsbGJhY2sgfHwgZnVuY3Rpb24oKXt9XG4gICAgdGhpcy5jYWxsYmFja3MgPSB7fVxuICAgIHRoaXMuaW1nSW5mbyA9IHt9XG5cbiAgICB0aGlzLnBhZ2UuZGF0YS5pbWdMb2FkTGlzdCA9IFtdIC8v5LiL6L296Zif5YiXXG4gICAgdGhpcy5wYWdlLl9pbWdPbkxvYWQgPSB0aGlzLl9pbWdPbkxvYWQuYmluZCh0aGlzKVxuICAgIHRoaXMucGFnZS5faW1nT25Mb2FkRXJyb3IgPSB0aGlzLl9pbWdPbkxvYWRFcnJvci5iaW5kKHRoaXMpXG4gIH1cblxuICAvKipcbiAgICog5Yqg6L295Zu+54mHXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ30gICBzcmMgICAgICDlm77niYflnLDlnYBcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIOWKoOi9veWujOaIkOWQjueahOWbnuiwg++8iOWPr+mAie+8ie+8jOesrOS4gOS4quWPguaVsOS4qumUmeivr+S/oeaBr++8jOesrOS6jOS4quS4uuWbvueJh+S/oeaBr1xuICAgKi9cbiAgbG9hZChzcmMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFzcmMpIHJldHVyblxuXG4gICAgbGV0IGxpc3QgPSB0aGlzLnBhZ2UuaW1nTG9hZExpc3QgfHwgW10sXG4gICAgICBpbWdJbmZvID0gdGhpcy5pbWdJbmZvW3NyY11cbiAgICBpZiAoY2FsbGJhY2spXG4gICAgICB0aGlzLmNhbGxiYWNrc1tzcmNdID0gY2FsbGJhY2tcblxuICAgIC8vIOW3sue7j+WKoOi9veaIkOWKn+i/h+eahO+8jOebtOaOpeWbnuiwg1xuICAgIGlmIChpbWdJbmZvKSB7XG4gICAgICB0aGlzLl9ydW5DYWxsYmFjayhudWxsLCB7XG4gICAgICAgIHNyYzogc3JjLFxuICAgICAgICB3aWR0aDogaW1nSW5mby53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBpbWdJbmZvLmhlaWdodFxuICAgICAgfSlcblxuICAgICAgLy8g5paw55qE5pyq5Zyo5LiL6L296Zif5YiX5Lit55qEXG4gICAgfSBlbHNlIGlmIChsaXN0LmluZGV4T2Yoc3JjKSA9PT0gLTEpIHtcbiAgICAgIGxpc3QucHVzaChzcmMpXG4gICAgICB0aGlzLnBhZ2UuaW1nTG9hZExpc3QgPSBsaXN0XG4gICAgICB0aGlzLnBhZ2UuJGFwcGx5KClcbiAgICAgIC8vIHRoaXMucGFnZS5zZXREYXRhKHsgJ2ltZ0xvYWRMaXN0JzogbGlzdCB9KVxuICAgIH1cbiAgfVxuXG4gIF9pbWdPbkxvYWQoZXYpIHtcbiAgICBsZXQgc3JjID0gZXYuY3VycmVudFRhcmdldC5kYXRhc2V0LnNyYyxcbiAgICAgIHdpZHRoID0gZXYuZGV0YWlsLndpZHRoLFxuICAgICAgaGVpZ2h0ID0gZXYuZGV0YWlsLmhlaWdodFxuXG4gICAgLy8g6K6w5b2V5bey5LiL6L295Zu+54mH55qE5bC65a+45L+h5oGvXG4gICAgdGhpcy5pbWdJbmZvW3NyY10gPSB7IHdpZHRoLCBoZWlnaHQgfVxuICAgIHRoaXMuX3JlbW92ZUZyb21Mb2FkTGlzdChzcmMpXG5cbiAgICB0aGlzLl9ydW5DYWxsYmFjayhudWxsLCB7IHNyYywgd2lkdGgsIGhlaWdodCB9KVxuICB9XG5cbiAgX2ltZ09uTG9hZEVycm9yKGV2KSB7XG4gICAgbGV0IHNyYyA9IGV2LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zcmNcbiAgICB0aGlzLl9yZW1vdmVGcm9tTG9hZExpc3Qoc3JjKVxuICAgIHRoaXMuX3J1bkNhbGxiYWNrKCdMb2FkaW5nIGZhaWxlZCcsIHsgc3JjIH0pXG4gIH1cblxuICAvLyDlsIblm77niYfku47kuIvovb3pmJ/liJfkuK3np7vpmaRcbiAgX3JlbW92ZUZyb21Mb2FkTGlzdChzcmMpIHtcbiAgICBsZXQgbGlzdCA9IHRoaXMucGFnZS5pbWdMb2FkTGlzdFxuICAgIGxpc3Quc3BsaWNlKGxpc3QuaW5kZXhPZihzcmMpLCAxKVxuICAgIHRoaXMucGFnZS5pbWdMb2FkTGlzdCA9IGxpc3RcbiAgICB0aGlzLnBhZ2UuJGFwcGx5KClcbiAgICAvLyB0aGlzLnBhZ2Uuc2V0RGF0YSh7ICdpbWdMb2FkTGlzdCc6IGxpc3QgfSlcbiAgfVxuXG4gIC8vIOaJp+ihjOWbnuiwg1xuICBfcnVuQ2FsbGJhY2soZXJyLCBkYXRhKSB7XG4gICAgbGV0IGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3NbZGF0YS5zcmNdIHx8IHRoaXMuZGVmYXVsdENhbGxiYWNrXG4gICAgY2FsbGJhY2soZXJyLCBkYXRhKVxuICAgIGRlbGV0ZSB0aGlzLmNhbGxiYWNrc1tkYXRhLnNyY11cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEltZ0xvYWRlclxuIl19