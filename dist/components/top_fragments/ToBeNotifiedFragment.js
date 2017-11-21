'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToBeNotifiedFragment = function (_wepy$page) {
  _inherits(ToBeNotifiedFragment, _wepy$page);

  function ToBeNotifiedFragment() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToBeNotifiedFragment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToBeNotifiedFragment.__proto__ || Object.getPrototypeOf(ToBeNotifiedFragment)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      msg: ''
    }, _this.methods = {
      init: function init() {
        console.log('onInit');
        var that = this;
        this.msg = '模拟加载中';
        setTimeout(function () {
          that.msg = '已加载';
          that.$apply();
        }, 3000);
      },
      show: function show() {
        console.log('onShow');
      },
      hide: function hide() {
        console.log('onHide');
      },
      pullDownRefresh: function pullDownRefresh() {
        wx.hideNavigationBarLoading();
        wx.showNavigationBarLoading();
        setTimeout(function () {
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
        }, 2000);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ToBeNotifiedFragment;
}(_wepy2.default.page);

exports.default = ToBeNotifiedFragment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvQmVOb3RpZmllZEZyYWdtZW50LmpzIl0sIm5hbWVzIjpbIlRvQmVOb3RpZmllZEZyYWdtZW50IiwiY29uZmlnIiwiZGF0YSIsIm1zZyIsIm1ldGhvZHMiLCJpbml0IiwiY29uc29sZSIsImxvZyIsInRoYXQiLCJzZXRUaW1lb3V0IiwiJGFwcGx5Iiwic2hvdyIsImhpZGUiLCJwdWxsRG93blJlZnJlc2giLCJ3eCIsImhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInN0b3BQdWxsRG93blJlZnJlc2giLCJldmVudHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsb0I7Ozs7Ozs7Ozs7Ozs7O2tOQUNuQkMsTSxHQUFTLEUsUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUs7QUFEQSxLLFFBR1BDLE8sR0FBVTtBQUNSQyxZQUFNLGdCQUFZO0FBQ2hCQyxnQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDQSxZQUFJQyxPQUFPLElBQVg7QUFDQSxhQUFLTCxHQUFMLEdBQVcsT0FBWDtBQUNBTSxtQkFBVyxZQUFZO0FBQ3JCRCxlQUFLTCxHQUFMLEdBQVcsS0FBWDtBQUNBSyxlQUFLRSxNQUFMO0FBQ0QsU0FIRCxFQUdHLElBSEg7QUFJRCxPQVRPO0FBVVJDLFlBQU0sZ0JBQVk7QUFDaEJMLGdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNELE9BWk87QUFhUkssWUFBTSxnQkFBWTtBQUNoQk4sZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0QsT0FmTztBQWdCUk0sdUJBQWlCLDJCQUFZO0FBQzNCQyxXQUFHQyx3QkFBSDtBQUNBRCxXQUFHRSx3QkFBSDtBQUNBUCxtQkFBVyxZQUFZO0FBQ3JCSyxhQUFHQyx3QkFBSDtBQUNBRCxhQUFHRyxtQkFBSDtBQUNELFNBSEQsRUFHRyxJQUhIO0FBSUQ7QUF2Qk8sSyxRQXlCVkMsTSxHQUFTLEU7Ozs7RUFoQ3VDLGVBQUtDLEk7O2tCQUFsQ25CLG9CIiwiZmlsZSI6IlRvQmVOb3RpZmllZEZyYWdtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9CZU5vdGlmaWVkRnJhZ21lbnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcblxuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIG1zZzogJydcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkluaXQnKVxuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgdGhpcy5tc2cgPSAn5qih5ouf5Yqg6L295LitJ1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0Lm1zZyA9ICflt7LliqDovb0nXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICB9LCAzMDAwKVxuICAgICAgfSxcbiAgICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uU2hvdycpXG4gICAgICB9LFxuICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25IaWRlJylcbiAgICAgIH0sXG4gICAgICBwdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAgICAgfSwgMjAwMClcbiAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICB9XG4gIH1cbiJdfQ==