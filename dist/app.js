'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/me', 'pages/ui/index', 'pages/nav/bottom', 'pages/nav/top', 'pages/nav/badge', 'pages/chartimage/imgloader', 'pages/api/index', 'pages/funs/index', 'pages/bugs/index', 'pages/new/webview'],
      window: {
        backgroundTextStyle: 'black',
        navigationBarBackgroundColor: '#393A3F',
        navigationBarTitleText: '小程序样例大全',
        backgroundColor: '#F2F2F2',
        navigationBarTextStyle: 'light'
      },
      tabBar: {
        color: '#8a8a8a',
        selectedColor: '#2aa515',
        backgroundColor: '#FCFCFC',
        borderStyle: '#EBEBEB',
        list: [{
          pagePath: 'pages/index',
          text: '功能',
          iconPath: 'images/demo.png',
          selectedIconPath: 'images/demo_selected.png'
        }, {
          pagePath: 'pages/me',
          text: '个人中心',
          iconPath: 'images/personal_un.png',
          selectedIconPath: 'images/personal.png'
        }]
      }
    };
    _this.globalData = {
      userInfo: null
    };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      var _this2 = this;

      // 登录
      _wepy2.default.login({
        success: function success(res) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      });
      // 获取用户信息
      _wepy2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            _wepy2.default.getUserInfo({
              success: function success(res) {
                // 可以将 res 发送给后台解码出 unionId
                _this2.globalData.userInfo = res.userInfo;
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (_this2.userInfoReadyCallback) {
                  _this2.userInfoReadyCallback(res);
                }
              }
            });
          }
        }
      });
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }
  }, {
    key: 'testAsync',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sleep(3);

              case 2:
                data = _context.sent;

                console.log(data);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testAsync() {
        return _ref.apply(this, arguments);
      }

      return testAsync;
    }()
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          that.globalData.userInfo = res.userInfo;
          cb && cb(res.userInfo);
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));


App({
  globalData: {
    userInfo: null
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJsb2dpbiIsInN1Y2Nlc3MiLCJnZXRTZXR0aW5nIiwicmVzIiwiYXV0aFNldHRpbmciLCJnZXRVc2VySW5mbyIsInVzZXJJbmZvUmVhZHlDYWxsYmFjayIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJzbGVlcCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY2IiLCJ0aGF0IiwiYXBwIiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFnREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQTdDZkEsTUE2Q2UsR0E3Q047QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxVQUZLLEVBR0wsZ0JBSEssRUFJTCxrQkFKSyxFQUtMLGVBTEssRUFNTCxpQkFOSyxFQU9MLDRCQVBLLEVBUUwsaUJBUkssRUFTTCxrQkFUSyxFQVVMLGtCQVZLLEVBV0wsbUJBWEssQ0FEQTtBQWNQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsU0FIbEI7QUFJTkMseUJBQWlCLFNBSlg7QUFLTkMsZ0NBQXdCO0FBTGxCLE9BZEQ7QUFxQlBDLGNBQVE7QUFDTkMsZUFBTyxTQUREO0FBRU5DLHVCQUFlLFNBRlQ7QUFHTkoseUJBQWlCLFNBSFg7QUFJTksscUJBQWEsU0FKUDtBQUtOQyxjQUFNLENBQUM7QUFDTEMsb0JBQVUsYUFETDtBQUVMQyxnQkFBTSxJQUZEO0FBR0xDLG9CQUFVLGlCQUhMO0FBSUxDLDRCQUFrQjtBQUpiLFNBQUQsRUFNTjtBQUNFSCxvQkFBVSxVQURaO0FBRUVDLGdCQUFNLE1BRlI7QUFHRUMsb0JBQVUsd0JBSFo7QUFJRUMsNEJBQWtCO0FBSnBCLFNBTk07QUFMQTtBQXJCRCxLQTZDTTtBQUFBLFVBSmZDLFVBSWUsR0FKRjtBQUNYQyxnQkFBVTtBQURDLEtBSUU7O0FBRWIsVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFGYTtBQUdkOzs7OytCQUVVO0FBQUE7O0FBQ1Q7QUFDQSxxQkFBS0MsS0FBTCxDQUFXO0FBQ1RDLGlCQUFTLHNCQUFPO0FBQ2Q7QUFDRDtBQUhRLE9BQVg7QUFLQTtBQUNBLHFCQUFLQyxVQUFMLENBQWdCO0FBQ2RELGlCQUFTLHNCQUFPO0FBQ2QsY0FBSUUsSUFBSUMsV0FBSixDQUFnQixnQkFBaEIsQ0FBSixFQUF1QztBQUNyQztBQUNBLDJCQUFLQyxXQUFMLENBQWlCO0FBQ2ZKLHVCQUFTLHNCQUFPO0FBQ2Q7QUFDQSx1QkFBS0osVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJLLElBQUlMLFFBQS9CO0FBQ0E7QUFDQTtBQUNBLG9CQUFJLE9BQUtRLHFCQUFULEVBQWdDO0FBQzlCLHlCQUFLQSxxQkFBTCxDQUEyQkgsR0FBM0I7QUFDRDtBQUNGO0FBVGMsYUFBakI7QUFXRDtBQUNGO0FBaEJhLE9BQWhCO0FBa0JEOzs7MEJBRU1JLEMsRUFBRztBQUNSLGFBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0MsbUJBQVcsWUFBTTtBQUNmRixrQkFBUSxrQkFBUjtBQUNELFNBRkQsRUFFR0YsSUFBSSxJQUZQO0FBR0QsT0FKTSxDQUFQO0FBS0Q7Ozs7Ozs7Ozs7O3VCQUdvQixLQUFLSyxLQUFMLENBQVcsQ0FBWCxDOzs7QUFBYkMsb0I7O0FBQ05DLHdCQUFRQyxHQUFSLENBQVlGLElBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FHVUcsRSxFQUFJO0FBQ2QsVUFBTUMsT0FBTyxJQUFiO0FBQ0EsVUFBSSxLQUFLcEIsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLRCxVQUFMLENBQWdCQyxRQUF2QjtBQUNEO0FBQ0QscUJBQUtPLFdBQUwsQ0FBaUI7QUFDZkosZUFEZSxtQkFDTkUsR0FETSxFQUNEO0FBQ1pjLGVBQUtwQixVQUFMLENBQWdCQyxRQUFoQixHQUEyQkssSUFBSUwsUUFBL0I7QUFDQWtCLGdCQUFNQSxHQUFHYixJQUFJTCxRQUFQLENBQU47QUFDRDtBQUpjLE9BQWpCO0FBTUQ7Ozs7RUF2RzBCLGVBQUtvQixHOzs7O0FBeUdsQ0MsSUFBSTtBQUNGdEIsY0FBWTtBQUNWQyxjQUFVO0FBREE7QUFEVixDQUFKIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9tZScsXG4gICAgICAncGFnZXMvdWkvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL25hdi9ib3R0b20nLFxuICAgICAgJ3BhZ2VzL25hdi90b3AnLFxuICAgICAgJ3BhZ2VzL25hdi9iYWRnZScsXG4gICAgICAncGFnZXMvY2hhcnRpbWFnZS9pbWdsb2FkZXInLFxuICAgICAgJ3BhZ2VzL2FwaS9pbmRleCcsXG4gICAgICAncGFnZXMvZnVucy9pbmRleCcsXG4gICAgICAncGFnZXMvYnVncy9pbmRleCcsXG4gICAgICAncGFnZXMvbmV3L3dlYnZpZXcnXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdibGFjaycsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzM5M0EzRicsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5bCP56iL5bqP5qC35L6L5aSn5YWoJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGMkYyRjInLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2xpZ2h0J1xuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBjb2xvcjogJyM4YThhOGEnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyMyYWE1MTUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0ZDRkNGQycsXG4gICAgICBib3JkZXJTdHlsZTogJyNFQkVCRUInLFxuICAgICAgbGlzdDogW3tcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgIHRleHQ6ICflip/og70nLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy9kZW1vLnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvZGVtb19zZWxlY3RlZC5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL21lJyxcbiAgICAgICAgdGV4dDogJ+S4quS6uuS4reW/gycsXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL3BlcnNvbmFsX3VuLnBuZycsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvcGVyc29uYWwucG5nJ1xuICAgICAgfV1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4JylcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuICAgIC8vIOeZu+W9lVxuICAgIHdlcHkubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgLy8g5Y+R6YCBIHJlcy5jb2RlIOWIsOWQjuWPsOaNouWPliBvcGVuSWQsIHNlc3Npb25LZXksIHVuaW9uSWRcbiAgICAgIH1cbiAgICB9KVxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgIHdlcHkuZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensO+8jOS4jeS8muW8ueahhlxuICAgICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgLy8g5Y+v5Lul5bCGIHJlcyDlj5HpgIHnu5nlkI7lj7Dop6PnoIHlh7ogdW5pb25JZFxuICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cbiAgICAgICAgICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgICAgICAgICBpZiAodGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNsZWVwIChzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcbiAgICAgIH0sIHMgKiAxMDAwKVxuICAgIH0pXG4gIH1cblxuICBhc3luYyB0ZXN0QXN5bmMgKCkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpXG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgfVxuXG4gIGdldFVzZXJJbmZvKGNiKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgfVxuICAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuQXBwKHtcbiAgZ2xvYmFsRGF0YToge1xuICAgIHVzZXJJbmZvOiBudWxsXG4gIH1cbn0pXG4iXX0=