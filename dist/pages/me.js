'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Me = function (_wepy$page) {
  _inherits(Me, _wepy$page);

  function Me() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Me);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Me.__proto__ || Object.getPrototypeOf(Me)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '个人中心'
    }, _this.data = {
      userInfo: {},
      hasUserInfo: false,
      canIUse: _wepy2.default.canIUse('button.open-type.getUserInfo')
    }, _this.methods = {
      getUserInfo: function getUserInfo(e) {
        this.$parent.globalData.userInfo = e.detail.userInfo;
        this.userInfo = e.detail.userInfo;
        this.hasUserInfo = true;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Me, [{
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      console.log(this.$parent);
      // this.$parent.$wxapp.globalData.userInfo = {userInfo: 'ces '}
      if (this.$parent.globalData.userInfo) {
        this.userInfo = this.$parent.globalData.userInfo;
        this.hasUserInfo = true;
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        this.$parent.userInfoReadyCallback = function (res) {
          _this2.userInfo = res;
          _this2.hasUserInfo = true;
        };
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        this.$parent.getUserInfo({
          success: function success(res) {
            _this2.$parent.globalData.userInfo = res.userInfo;
            _this2.userInfo = _this2.$parent.globalData.userInfo;
            _this2.hasUserInfo = true;
          }
        });
      }
    }
  }]);

  return Me;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Me , 'pages/me'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lLmpzIl0sIm5hbWVzIjpbIk1lIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VySW5mbyIsImhhc1VzZXJJbmZvIiwiY2FuSVVzZSIsIm1ldGhvZHMiLCJnZXRVc2VySW5mbyIsImUiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRldGFpbCIsImNvbnNvbGUiLCJsb2ciLCJ1c2VySW5mb1JlYWR5Q2FsbGJhY2siLCJyZXMiLCJzdWNjZXNzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsRTs7Ozs7Ozs7Ozs7Ozs7OEtBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLEVBREw7QUFFTEMsbUJBQWEsS0FGUjtBQUdMQyxlQUFTLGVBQUtBLE9BQUwsQ0FBYSw4QkFBYjtBQUhKLEssUUE2QlBDLE8sR0FBVTtBQUNSQyxpQkFEUSx1QkFDSUMsQ0FESixFQUNPO0FBQ2IsYUFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCUCxRQUF4QixHQUFtQ0ssRUFBRUcsTUFBRixDQUFTUixRQUE1QztBQUNBLGFBQUtBLFFBQUwsR0FBZ0JLLEVBQUVHLE1BQUYsQ0FBU1IsUUFBekI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0Q7QUFMTyxLOzs7Ozs2QkF4QkQ7QUFBQTs7QUFDUFEsY0FBUUMsR0FBUixDQUFZLEtBQUtKLE9BQWpCO0FBQ0E7QUFDQSxVQUFJLEtBQUtBLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlAsUUFBNUIsRUFBc0M7QUFDcEMsYUFBS0EsUUFBTCxHQUFnQixLQUFLTSxPQUFMLENBQWFDLFVBQWIsQ0FBd0JQLFFBQXhDO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNELE9BSEQsTUFHTyxJQUFJLEtBQUtGLElBQUwsQ0FBVUcsT0FBZCxFQUF1QjtBQUM1QjtBQUNBO0FBQ0EsYUFBS0ksT0FBTCxDQUFhSyxxQkFBYixHQUFxQyxlQUFPO0FBQzFDLGlCQUFLWCxRQUFMLEdBQWdCWSxHQUFoQjtBQUNBLGlCQUFLWCxXQUFMLEdBQW1CLElBQW5CO0FBQ0QsU0FIRDtBQUlELE9BUE0sTUFPQTtBQUNMO0FBQ0EsYUFBS0ssT0FBTCxDQUFhRixXQUFiLENBQXlCO0FBQ3ZCUyxtQkFBUyxzQkFBTztBQUNkLG1CQUFLUCxPQUFMLENBQWFDLFVBQWIsQ0FBd0JQLFFBQXhCLEdBQW1DWSxJQUFJWixRQUF2QztBQUNBLG1CQUFLQSxRQUFMLEdBQWdCLE9BQUtNLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlAsUUFBeEM7QUFDQSxtQkFBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNEO0FBTHNCLFNBQXpCO0FBT0Q7QUFDRjs7OztFQWhDNkIsZUFBS2EsSTs7a0JBQWhCbEIsRSIsImZpbGUiOiJtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIHVzZXJJbmZvOiB7fSxcbiAgICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcbiAgICAgIGNhbklVc2U6IHdlcHkuY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpXG4gICAgfTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLiRwYXJlbnQpXG4gICAgICAvLyB0aGlzLiRwYXJlbnQuJHd4YXBwLmdsb2JhbERhdGEudXNlckluZm8gPSB7dXNlckluZm86ICdjZXMgJ31cbiAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgICB0aGlzLnVzZXJJbmZvID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm9cbiAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWVcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmNhbklVc2UpIHtcbiAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cbiAgICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgICB0aGlzLiRwYXJlbnQudXNlckluZm9SZWFkeUNhbGxiYWNrID0gcmVzID0+IHtcbiAgICAgICAgICB0aGlzLnVzZXJJbmZvID0gcmVzXG4gICAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g5Zyo5rKh5pyJIG9wZW4tdHlwZT1nZXRVc2VySW5mbyDniYjmnKznmoTlhbzlrrnlpITnkIZcbiAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgICAgIHRoaXMudXNlckluZm8gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgICAgICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnZXRVc2VySW5mbyhlKSB7XG4gICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgICAgdGhpcy51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlXG4gICAgICB9XG4gICAgfTtcbiAgfVxuIl19