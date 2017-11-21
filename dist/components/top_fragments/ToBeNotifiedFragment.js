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
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ToBeNotifiedFragment;
}(_wepy2.default.page);

exports.default = ToBeNotifiedFragment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvQmVOb3RpZmllZEZyYWdtZW50LmpzIl0sIm5hbWVzIjpbIlRvQmVOb3RpZmllZEZyYWdtZW50IiwiY29uZmlnIiwiZGF0YSIsIm1zZyIsIm1ldGhvZHMiLCJpbml0IiwiY29uc29sZSIsImxvZyIsInRoYXQiLCJzZXRUaW1lb3V0IiwiJGFwcGx5Iiwic2hvdyIsImhpZGUiLCJldmVudHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsb0I7Ozs7Ozs7Ozs7Ozs7O2tOQUNuQkMsTSxHQUFTLEUsUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUs7QUFEQSxLLFFBR1BDLE8sR0FBVTtBQUNSQyxZQUFNLGdCQUFZO0FBQ2hCQyxnQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDQSxZQUFJQyxPQUFPLElBQVg7QUFDQSxhQUFLTCxHQUFMLEdBQVcsT0FBWDtBQUNBTSxtQkFBVyxZQUFZO0FBQ3JCRCxlQUFLTCxHQUFMLEdBQVcsS0FBWDtBQUNBSyxlQUFLRSxNQUFMO0FBQ0QsU0FIRCxFQUdHLElBSEg7QUFJRCxPQVRPO0FBVVJDLFlBQU0sZ0JBQVk7QUFDaEJMLGdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNELE9BWk87QUFhUkssWUFBTSxnQkFBWTtBQUNoQk4sZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0Q7QUFmTyxLLFFBaUJWTSxNLEdBQVMsRTs7OztFQXhCdUMsZUFBS0MsSTs7a0JBQWxDZCxvQiIsImZpbGUiOiJUb0JlTm90aWZpZWRGcmFnbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvQmVOb3RpZmllZEZyYWdtZW50IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG5cbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICBtc2c6ICcnXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25Jbml0JylcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgIHRoaXMubXNnID0gJ+aooeaLn+WKoOi9veS4rSdcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5tc2cgPSAn5bey5Yqg6L29J1xuICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgfSwgMzAwMClcbiAgICAgIH0sXG4gICAgICBzaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvblNob3cnKVxuICAgICAgfSxcbiAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uSGlkZScpXG4gICAgICB9XG4gICAgfTtcbiAgICBldmVudHMgPSB7XG4gICAgfVxuICB9XG4iXX0=