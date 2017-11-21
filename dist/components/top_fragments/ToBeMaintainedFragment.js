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

var ToBeMaintainedFragment = function (_wepy$page) {
  _inherits(ToBeMaintainedFragment, _wepy$page);

  function ToBeMaintainedFragment() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToBeMaintainedFragment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToBeMaintainedFragment.__proto__ || Object.getPrototypeOf(ToBeMaintainedFragment)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      imgUrls: []
    }, _this.methods = {
      init: function init() {
        console.log('onInit');
        this.imgUrls = ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'];
      },
      show: function show() {
        console.log('onShow');
      },
      hide: function hide() {
        console.log('onHide');
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ToBeMaintainedFragment;
}(_wepy2.default.page);

exports.default = ToBeMaintainedFragment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvQmVNYWludGFpbmVkRnJhZ21lbnQuanMiXSwibmFtZXMiOlsiVG9CZU1haW50YWluZWRGcmFnbWVudCIsImNvbmZpZyIsImRhdGEiLCJpbWdVcmxzIiwibWV0aG9kcyIsImluaXQiLCJjb25zb2xlIiwibG9nIiwic2hvdyIsImhpZGUiLCJldmVudHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsc0I7Ozs7Ozs7Ozs7Ozs7O3NOQUNuQkMsTSxHQUFTLEUsUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVM7QUFESixLLFFBR1BDLE8sR0FBVTtBQUNSQyxZQUFNLGdCQUFZO0FBQ2hCQyxnQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDQSxhQUFLSixPQUFMLEdBQWUsQ0FDYixzRUFEYSxFQUViLHNFQUZhLEVBR2Isc0VBSGEsQ0FBZjtBQUtELE9BUk87QUFTUkssWUFBTSxnQkFBWTtBQUNoQkYsZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0QsT0FYTztBQVlSRSxZQUFNLGdCQUFZO0FBQ2hCSCxnQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQWRPLEssUUFnQlZHLE0sR0FBUyxFOzs7O0VBdkJ5QyxlQUFLQyxJOztrQkFBcENYLHNCIiwiZmlsZSI6IlRvQmVNYWludGFpbmVkRnJhZ21lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBUb0JlTWFpbnRhaW5lZEZyYWdtZW50IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG5cbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICBpbWdVcmxzOiBbXVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uSW5pdCcpXG4gICAgICAgIHRoaXMuaW1nVXJscyA9IFtcbiAgICAgICAgICAnaHR0cDovL2ltZzAyLnRvb29wZW4uY29tL2ltYWdlcy8yMDE1MDkyOC90b29vcGVuX3N5XzE0MzkxMjc1NTcyNi5qcGcnLFxuICAgICAgICAgICdodHRwOi8vaW1nMDYudG9vb3Blbi5jb20vaW1hZ2VzLzIwMTYwODE4L3Rvb29wZW5fc3lfMTc1ODY2NDM0Mjk2LmpwZycsXG4gICAgICAgICAgJ2h0dHA6Ly9pbWcwNi50b29vcGVuLmNvbS9pbWFnZXMvMjAxNjA4MTgvdG9vb3Blbl9zeV8xNzU4MzMwNDc3MTUuanBnJ1xuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25TaG93JylcbiAgICAgIH0sXG4gICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkhpZGUnKVxuICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgIH1cbiAgfVxuIl19