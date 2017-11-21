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

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, ToBeMaintainedFragment);

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
      },
      pullDownRefresh: function pullDownRefresh() {
        var t = wx;
        t.hideNavigationBarLoading();
        t.showNavigationBarLoading();
        setTimeout(function () {
          t.hideNavigationBarLoading();
          t.stopPullDownRefresh();
        }, 2000);
      },
      handlerScrolltolower: function handlerScrolltolower() {
        console.log(arguments);
        console.log(this);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ToBeMaintainedFragment;
}(_wepy2.default.page);

exports.default = ToBeMaintainedFragment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvQmVNYWludGFpbmVkRnJhZ21lbnQuanMiXSwibmFtZXMiOlsiVG9CZU1haW50YWluZWRGcmFnbWVudCIsImNvbmZpZyIsImRhdGEiLCJpbWdVcmxzIiwibWV0aG9kcyIsImluaXQiLCJjb25zb2xlIiwibG9nIiwic2hvdyIsImhpZGUiLCJwdWxsRG93blJlZnJlc2giLCJ0Iiwid3giLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJzZXRUaW1lb3V0Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImhhbmRsZXJTY3JvbGx0b2xvd2VyIiwiYXJndW1lbnRzIiwiZXZlbnRzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLHNCOzs7Ozs7Ozs7Ozs7OztzTkFDbkJDLE0sR0FBUyxFLFFBR1RDLEksR0FBTztBQUNMQyxlQUFTO0FBREosSyxRQUdQQyxPLEdBQVU7QUFDUkMsWUFBTSxnQkFBWTtBQUNoQkMsZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0EsYUFBS0osT0FBTCxHQUFlLENBQ2Isc0VBRGEsRUFFYixzRUFGYSxFQUdiLHNFQUhhLENBQWY7QUFLRCxPQVJPO0FBU1JLLFlBQU0sZ0JBQVk7QUFDaEJGLGdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNELE9BWE87QUFZUkUsWUFBTSxnQkFBWTtBQUNoQkgsZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0QsT0FkTztBQWVSRyx1QkFBaUIsMkJBQVk7QUFDM0IsWUFBSUMsSUFBSUMsRUFBUjtBQUNBRCxVQUFFRSx3QkFBRjtBQUNBRixVQUFFRyx3QkFBRjtBQUNBQyxtQkFBVyxZQUFZO0FBQ3JCSixZQUFFRSx3QkFBRjtBQUNBRixZQUFFSyxtQkFBRjtBQUNELFNBSEQsRUFHRyxJQUhIO0FBSUQsT0F2Qk87QUF3QlJDLDRCQUFzQixnQ0FBWTtBQUNoQ1gsZ0JBQVFDLEdBQVIsQ0FBWVcsU0FBWjtBQUNBWixnQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDRDtBQTNCTyxLLFFBNkJWWSxNLEdBQVMsRTs7OztFQXBDeUMsZUFBS0MsSTs7a0JBQXBDcEIsc0IiLCJmaWxlIjoiVG9CZU1haW50YWluZWRGcmFnbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvQmVNYWludGFpbmVkRnJhZ21lbnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcblxuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIGltZ1VybHM6IFtdXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25Jbml0JylcbiAgICAgICAgdGhpcy5pbWdVcmxzID0gW1xuICAgICAgICAgICdodHRwOi8vaW1nMDIudG9vb3Blbi5jb20vaW1hZ2VzLzIwMTUwOTI4L3Rvb29wZW5fc3lfMTQzOTEyNzU1NzI2LmpwZycsXG4gICAgICAgICAgJ2h0dHA6Ly9pbWcwNi50b29vcGVuLmNvbS9pbWFnZXMvMjAxNjA4MTgvdG9vb3Blbl9zeV8xNzU4NjY0MzQyOTYuanBnJyxcbiAgICAgICAgICAnaHR0cDovL2ltZzA2LnRvb29wZW4uY29tL2ltYWdlcy8yMDE2MDgxOC90b29vcGVuX3N5XzE3NTgzMzA0NzcxNS5qcGcnXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBzaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvblNob3cnKVxuICAgICAgfSxcbiAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uSGlkZScpXG4gICAgICB9LFxuICAgICAgcHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0ID0gd3hcbiAgICAgICAgdC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICB0LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHQuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgICB0LnN0b3BQdWxsRG93blJlZnJlc2goKVxuICAgICAgICB9LCAyMDAwKVxuICAgICAgfSxcbiAgICAgIGhhbmRsZXJTY3JvbGx0b2xvd2VyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3VtZW50cylcbiAgICAgICAgY29uc29sZS5sb2codGhpcylcbiAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICB9XG4gIH1cbiJdfQ==