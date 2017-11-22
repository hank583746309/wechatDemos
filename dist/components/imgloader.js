'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Imgloader = function (_wepy$page) {
  _inherits(Imgloader, _wepy$page);

  function Imgloader() {
    var _ref;

    var _temp, _this, _ret;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, Imgloader);

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Imgloader.__proto__ || Object.getPrototypeOf(Imgloader)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      imgLoadList: []
    }, _this.methods = {
      config: function config(context, callback) {
        if (typeof context === 'function') {
          callback = context;
        } else if (typeof context.callback === 'function') {
          callback = context.callback;
        }
        this._cfg = {}; // 预防与wepy冲突
        // this._cfg.context = context
        this._cfg.callback = callback;
        this._cfg.imgInfo = {};
        this._cfg.callbacks = {};
      },
      load: function load(srcs, callback) {
        if (!srcs) {
          return;
        }
        if (typeof srcs === 'string') {
          srcs = [{ url: srcs }];
        }
        if (srcs instanceof Array) {
          var that = this;
          srcs.map(function (src) {
            if (typeof callback === 'function') {
              that.methods._load.call(that, src.url, callback);
            } else {
              that.methods._load.call(that, src.url);
            }
          });
        }
      },
      _load: function _load(src, callback) {
        var list = this.imgLoadList || [];
        var imgInfo = this._cfg.imgInfo[src];
        if (typeof callback === 'function') {
          this._cfg.callbacks[src] = callback;
        }
        // 已经加载成功过的，直接回调
        if (imgInfo) {
          this.methods._runCallback.call(this, null, {
            src: src,
            width: imgInfo.width,
            height: imgInfo.height
          });
          // 新的未在下载队列中的
        } else if (list.indexOf(src) === -1) {
          list.push(src);
          this.imgLoadList = list;
          this.$apply();
        }
      },
      _imgOnLoad: function _imgOnLoad() {
        var ev = arguments[0];
        var src = ev.currentTarget.dataset.src;
        var width = ev.detail.width;
        var height = ev.detail.height;

        // 记录已下载图片的尺寸信息
        this._cfg.imgInfo[src] = { width: width, height: height };
        this.methods._removeFromLoadList.call(this, src);
        this.methods._runCallback.call(this, null, { src: src, width: width, height: height });
      },
      _imgOnLoadError: function _imgOnLoadError() {
        var ev = arguments[0];
        var src = ev.currentTarget.dataset.src;
        this.methods._removeFromLoadList.call(this, src);
        this.methods._runCallback.call(this, 'Loading failed', { src: src });
      },
      _removeFromLoadList: function _removeFromLoadList(src) {
        var list = this.imgLoadList;
        list.splice(list.indexOf(src), 1);
        this.imgLoadList = list;
      },
      _runCallback: function _runCallback(err, data) {
        var callback = this._cfg.callbacks[data.src] || this._cfg.callback;
        callback(err, data);
        delete this._cfg.callbacks[data.src];
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Imgloader;
}(_wepy2.default.page);

exports.default = Imgloader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltZ2xvYWRlci5qcyJdLCJuYW1lcyI6WyJJbWdsb2FkZXIiLCJjb25maWciLCJkYXRhIiwiaW1nTG9hZExpc3QiLCJtZXRob2RzIiwiY29udGV4dCIsImNhbGxiYWNrIiwiX2NmZyIsImltZ0luZm8iLCJjYWxsYmFja3MiLCJsb2FkIiwic3JjcyIsInVybCIsIkFycmF5IiwidGhhdCIsIm1hcCIsIl9sb2FkIiwiY2FsbCIsInNyYyIsImxpc3QiLCJfcnVuQ2FsbGJhY2siLCJ3aWR0aCIsImhlaWdodCIsImluZGV4T2YiLCJwdXNoIiwiJGFwcGx5IiwiX2ltZ09uTG9hZCIsImV2IiwiYXJndW1lbnRzIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJkZXRhaWwiLCJfcmVtb3ZlRnJvbUxvYWRMaXN0IiwiX2ltZ09uTG9hZEVycm9yIiwic3BsaWNlIiwiZXJyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTLEUsUUFHVEMsSSxHQUFPO0FBQ0xDLG1CQUFhO0FBRFIsSyxRQUdQQyxPLEdBQVU7QUFDUkgsY0FBUSxnQkFBVUksT0FBVixFQUFtQkMsUUFBbkIsRUFBNkI7QUFDbkMsWUFBSSxPQUFPRCxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDQyxxQkFBV0QsT0FBWDtBQUNELFNBRkQsTUFFTyxJQUFJLE9BQU9BLFFBQVFDLFFBQWYsS0FBNEIsVUFBaEMsRUFBNEM7QUFDakRBLHFCQUFXRCxRQUFRQyxRQUFuQjtBQUNEO0FBQ0QsYUFBS0MsSUFBTCxHQUFZLEVBQVosQ0FObUMsQ0FNcEI7QUFDZjtBQUNBLGFBQUtBLElBQUwsQ0FBVUQsUUFBVixHQUFxQkEsUUFBckI7QUFDQSxhQUFLQyxJQUFMLENBQVVDLE9BQVYsR0FBb0IsRUFBcEI7QUFDQSxhQUFLRCxJQUFMLENBQVVFLFNBQVYsR0FBc0IsRUFBdEI7QUFDRCxPQVpPO0FBYVJDLFlBQU0sY0FBVUMs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LEdBcEVaLEVBb0VpQjtBQUN2QixZQUFJQyxPQUFPLEtBQUtoQixXQUFoQjtBQUNBZ0IsYUFBS2UsTUFBTCxDQUFZZixLQUFLSSxPQUFMLENBQWFMLEdBQWIsQ0FBWixFQUErQixDQUEvQjtBQUNBLGFBQUtmLFdBQUwsR0FBbUJnQixJQUFuQjtBQUNELE9BeEVPO0FBeUVSQyxrQkF6RVEsd0JBeUVLZSxHQXpFTCxFQXlFVWpDLElBekVWLEVBeUVnQjtBQUN0QixZQUFJSSxXQUFXLEtBQUtDLElBQUwsQ0FBVUUsU0FBVixDQUFvQlAsS0FBS2dCLEdBQXpCLEtBQWlDLEtBQUtYLElBQUwsQ0FBVUQsUUFBMUQ7QUFDQUEsaUJBQVM2QixHQUFULEVBQWNqQyxJQUFkO0FBQ0EsZUFBTyxLQUFLSyxJQUFMLENBQVVFLFNBQVYsQ0FBb0JQLEtBQUtnQixHQUF6QixDQUFQO0FBQ0Q7QUE3RU8sSzs7OztFQVAyQixlQUFLa0IsSTs7a0JBQXZCcEMsUyIsImZpbGUiOiJpbWdsb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbWdsb2FkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcblxuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIGltZ0xvYWRMaXN0OiBbXVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbmZpZzogZnVuY3Rpb24gKGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29udGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNhbGxiYWNrID0gY29udGV4dFxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb250ZXh0LmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY2FsbGJhY2sgPSBjb250ZXh0LmNhbGxiYWNrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2ZnID0ge30gLy8g6aKE6Ziy5LiOd2VweeWGsueqgVxuICAgICAgICAvLyB0aGlzLl9jZmcuY29udGV4dCA9IGNvbnRleHRcbiAgICAgICAgdGhpcy5fY2ZnLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICAgICAgdGhpcy5fY2ZnLmltZ0luZm8gPSB7fVxuICAgICAgICB0aGlzLl9jZmcuY2FsbGJhY2tzID0ge31cbiAgICAgIH0sXG4gICAgICBsb2FkOiBmdW5jdGlvbiAoc3JjcywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCFzcmNzKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzcmNzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHNyY3MgPSBbe3VybDogc3Jjc31dXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyY3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgICAgIHNyY3MubWFwKHNyYyA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIHRoYXQubWV0aG9kcy5fbG9hZC5jYWxsKHRoYXQsIHNyYy51cmwsIGNhbGxiYWNrKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhhdC5tZXRob2RzLl9sb2FkLmNhbGwodGhhdCwgc3JjLnVybClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgX2xvYWQ6IGZ1bmN0aW9uIChzcmMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5pbWdMb2FkTGlzdCB8fCBbXVxuICAgICAgICBsZXQgaW1nSW5mbyA9IHRoaXMuX2NmZy5pbWdJbmZvW3NyY11cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuX2NmZy5jYWxsYmFja3Nbc3JjXSA9IGNhbGxiYWNrXG4gICAgICAgIH1cbiAgICAgICAgLy8g5bey57uP5Yqg6L295oiQ5Yqf6L+H55qE77yM55u05o6l5Zue6LCDXG4gICAgICAgIGlmIChpbWdJbmZvKSB7XG4gICAgICAgICAgdGhpcy5tZXRob2RzLl9ydW5DYWxsYmFjay5jYWxsKHRoaXMsIG51bGwsIHtcbiAgICAgICAgICAgIHNyYzogc3JjLFxuICAgICAgICAgICAgd2lkdGg6IGltZ0luZm8ud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGltZ0luZm8uaGVpZ2h0XG4gICAgICAgICAgfSlcbiAgICAgICAgICAvLyDmlrDnmoTmnKrlnKjkuIvovb3pmJ/liJfkuK3nmoRcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0LmluZGV4T2Yoc3JjKSA9PT0gLTEpIHtcbiAgICAgICAgICBsaXN0LnB1c2goc3JjKVxuICAgICAgICAgIHRoaXMuaW1nTG9hZExpc3QgPSBsaXN0XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgX2ltZ09uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZXYgPSBhcmd1bWVudHNbMF1cbiAgICAgICAgbGV0IHNyYyA9IGV2LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zcmNcbiAgICAgICAgbGV0IHdpZHRoID0gZXYuZGV0YWlsLndpZHRoXG4gICAgICAgIGxldCBoZWlnaHQgPSBldi5kZXRhaWwuaGVpZ2h0XG5cbiAgICAgICAgLy8g6K6w5b2V5bey5LiL6L295Zu+54mH55qE5bC65a+45L+h5oGvXG4gICAgICAgIHRoaXMuX2NmZy5pbWdJbmZvW3NyY10gPSB7IHdpZHRoLCBoZWlnaHQgfVxuICAgICAgICB0aGlzLm1ldGhvZHMuX3JlbW92ZUZyb21Mb2FkTGlzdC5jYWxsKHRoaXMsIHNyYylcbiAgICAgICAgdGhpcy5tZXRob2RzLl9ydW5DYWxsYmFjay5jYWxsKHRoaXMsIG51bGwsIHsgc3JjLCB3aWR0aCwgaGVpZ2h0IH0pXG4gICAgICB9LFxuICAgICAgX2ltZ09uTG9hZEVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBldiA9IGFyZ3VtZW50c1swXVxuICAgICAgICBsZXQgc3JjID0gZXYuY3VycmVudFRhcmdldC5kYXRhc2V0LnNyY1xuICAgICAgICB0aGlzLm1ldGhvZHMuX3JlbW92ZUZyb21Mb2FkTGlzdC5jYWxsKHRoaXMsIHNyYylcbiAgICAgICAgdGhpcy5tZXRob2RzLl9ydW5DYWxsYmFjay5jYWxsKHRoaXMsICdMb2FkaW5nIGZhaWxlZCcsIHsgc3JjIH0pXG4gICAgICB9LFxuICAgICAgX3JlbW92ZUZyb21Mb2FkTGlzdChzcmMpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmltZ0xvYWRMaXN0XG4gICAgICAgIGxpc3Quc3BsaWNlKGxpc3QuaW5kZXhPZihzcmMpLCAxKVxuICAgICAgICB0aGlzLmltZ0xvYWRMaXN0ID0gbGlzdFxuICAgICAgfSxcbiAgICAgIF9ydW5DYWxsYmFjayhlcnIsIGRhdGEpIHtcbiAgICAgICAgbGV0IGNhbGxiYWNrID0gdGhpcy5fY2ZnLmNhbGxiYWNrc1tkYXRhLnNyY10gfHwgdGhpcy5fY2ZnLmNhbGxiYWNrXG4gICAgICAgIGNhbGxiYWNrKGVyciwgZGF0YSlcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NmZy5jYWxsYmFja3NbZGF0YS5zcmNdXG4gICAgICB9XG4gICAgfTtcbiAgfVxuIl19