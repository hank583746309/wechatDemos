'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy-ant/lib/wepy.js');

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

      console.log(_wepy2.default.canIUse('button.open-type.getUserInfo'));
      if (this.$parent.globalData.userInfo) {
        this.setData({
          userInfo: this.$parent.globalData.userInfo,
          hasUserInfo: true
        });
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        this.$parent.userInfoReadyCallback = function (res) {
          _this2.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        };
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        this.$parent.getUserInfo({
          success: function success(res) {
            _this2.$parent.globalData.userInfo = res.userInfo;
            _this2.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            });
          }
        });
      }
    }
  }]);

  return Me;
}(_wepy2.default.page);


Page(require('./../npm/wepy-ant/lib/wepy.js').default.$createPage(Me , 'pages/me'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lLmpzIl0sIm5hbWVzIjpbIk1lIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VySW5mbyIsImhhc1VzZXJJbmZvIiwiY2FuSVVzZSIsIm1ldGhvZHMiLCJnZXRVc2VySW5mbyIsImUiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImRldGFpbCIsImNvbnNvbGUiLCJsb2ciLCJzZXREYXRhIiwidXNlckluZm9SZWFkeUNhbGxiYWNrIiwicmVzIiwic3VjY2VzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7Ozs7OzhLQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxnQkFBVSxFQURMO0FBRUxDLG1CQUFhLEtBRlI7QUFHTEMsZUFBUyxlQUFLQSxPQUFMLENBQWEsOEJBQWI7QUFISixLLFFBa0NQQyxPLEdBQVU7QUFDUkMsaUJBRFEsdUJBQ0lDLENBREosRUFDTztBQUNiLGFBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlAsUUFBeEIsR0FBbUNLLEVBQUVHLE1BQUYsQ0FBU1IsUUFBNUM7QUFDQSxhQUFLQSxRQUFMLEdBQWdCSyxFQUFFRyxNQUFGLENBQVNSLFFBQXpCO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNEO0FBTE8sSzs7Ozs7NkJBN0JEO0FBQUE7O0FBQ1BRLGNBQVFDLEdBQVIsQ0FBWSxlQUFLUixPQUFMLENBQWEsOEJBQWIsQ0FBWjtBQUNBLFVBQUksS0FBS0ksT0FBTCxDQUFhQyxVQUFiLENBQXdCUCxRQUE1QixFQUFzQztBQUNwQyxhQUFLVyxPQUFMLENBQWE7QUFDWFgsb0JBQVUsS0FBS00sT0FBTCxDQUFhQyxVQUFiLENBQXdCUCxRQUR2QjtBQUVYQyx1QkFBYTtBQUZGLFNBQWI7QUFJRCxPQUxELE1BS08sSUFBSSxLQUFLRixJQUFMLENBQVVHLE9BQWQsRUFBdUI7QUFDNUI7QUFDQTtBQUNBLGFBQUtJLE9BQUwsQ0FBYU0scUJBQWIsR0FBcUMsZUFBTztBQUMxQyxpQkFBS0QsT0FBTCxDQUFhO0FBQ1hYLHNCQUFVYSxJQUFJYixRQURIO0FBRVhDLHlCQUFhO0FBRkYsV0FBYjtBQUlELFNBTEQ7QUFNRCxPQVRNLE1BU0E7QUFDTDtBQUNBLGFBQUtLLE9BQUwsQ0FBYUYsV0FBYixDQUF5QjtBQUN2QlUsbUJBQVMsc0JBQU87QUFDZCxtQkFBS1IsT0FBTCxDQUFhQyxVQUFiLENBQXdCUCxRQUF4QixHQUFtQ2EsSUFBSWIsUUFBdkM7QUFDQSxtQkFBS1csT0FBTCxDQUFhO0FBQ1hYLHdCQUFVYSxJQUFJYixRQURIO0FBRVhDLDJCQUFhO0FBRkYsYUFBYjtBQUlEO0FBUHNCLFNBQXpCO0FBU0Q7QUFDRjs7OztFQXJDNkIsZUFBS2MsSTs7a0JBQWhCbkIsRSIsImZpbGUiOiJtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIHVzZXJJbmZvOiB7fSxcbiAgICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcbiAgICAgIGNhbklVc2U6IHdlcHkuY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpXG4gICAgfTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICBjb25zb2xlLmxvZyh3ZXB5LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSlcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHVzZXJJbmZvOiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyxcbiAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuY2FuSVVzZSkge1xuICAgICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxuICAgICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XG4gICAgICAgIHRoaXMuJHBhcmVudC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSByZXMgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDlnKjmsqHmnIkgb3Blbi10eXBlPWdldFVzZXJJbmZvIOeJiOacrOeahOWFvOWuueWkhOeQhlxuICAgICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oe1xuICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcbiAgICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ2V0VXNlckluZm8oZSkge1xuICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgICAgIHRoaXMudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZVxuICAgICAgfVxuICAgIH07XG4gIH1cbiJdfQ==