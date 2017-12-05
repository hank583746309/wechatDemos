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
      pages: ['pages/index', 'pages/me', 'pages/ui/index', 'pages/nav/bottom', 'pages/nav/top', 'pages/nav/badge', 'pages/chartimage/imgloader', 'pages/api/index', 'pages/funs/index', 'pages/bugs/index', 'pages/new/webview', 'pages/ui/listempty', 'pages/ui/listloadmore', 'pages/ui/actionsheet'],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJsb2dpbiIsInN1Y2Nlc3MiLCJnZXRTZXR0aW5nIiwicmVzIiwiYXV0aFNldHRpbmciLCJnZXRVc2VySW5mbyIsInVzZXJJbmZvUmVhZHlDYWxsYmFjayIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJzbGVlcCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY2IiLCJ0aGF0IiwiYXBwIiwiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFtREUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQWhEZkEsTUFnRGUsR0FoRE47QUFDUEMsYUFBTyxDQUNMLGFBREssRUFFTCxVQUZLLEVBR0wsZ0JBSEssRUFJTCxrQkFKSyxFQUtMLGVBTEssRUFNTCxpQkFOSyxFQU9MLDRCQVBLLEVBUUwsaUJBUkssRUFTTCxrQkFUSyxFQVVMLGtCQVZLLEVBV0wsbUJBWEssRUFZTCxvQkFaSyxFQWFMLHVCQWJLLEVBY0wsc0JBZEssQ0FEQTtBQWlCUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsU0FGeEI7QUFHTkMsZ0NBQXdCLFNBSGxCO0FBSU5DLHlCQUFpQixTQUpYO0FBS05DLGdDQUF3QjtBQUxsQixPQWpCRDtBQXdCUEMsY0FBUTtBQUNOQyxlQUFPLFNBREQ7QUFFTkMsdUJBQWUsU0FGVDtBQUdOSix5QkFBaUIsU0FIWDtBQUlOSyxxQkFBYSxTQUpQO0FBS05DLGNBQU0sQ0FBQztBQUNMQyxvQkFBVSxhQURMO0FBRUxDLGdCQUFNLElBRkQ7QUFHTEMsb0JBQVUsaUJBSEw7QUFJTEMsNEJBQWtCO0FBSmIsU0FBRCxFQU1OO0FBQ0VILG9CQUFVLFVBRFo7QUFFRUMsZ0JBQU0sTUFGUjtBQUdFQyxvQkFBVSx3QkFIWjtBQUlFQyw0QkFBa0I7QUFKcEIsU0FOTTtBQUxBO0FBeEJELEtBZ0RNO0FBQUEsVUFKZkMsVUFJZSxHQUpGO0FBQ1hDLGdCQUFVO0FBREMsS0FJRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZhO0FBR2Q7Ozs7K0JBRVU7QUFBQTs7QUFDVDtBQUNBLHFCQUFLQyxLQUFMLENBQVc7QUFDVEMsaUJBQVMsc0JBQU87QUFDZDtBQUNEO0FBSFEsT0FBWDtBQUtBO0FBQ0EscUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEQsaUJBQVMsc0JBQU87QUFDZCxjQUFJRSxJQUFJQyxXQUFKLENBQWdCLGdCQUFoQixDQUFKLEVBQXVDO0FBQ3JDO0FBQ0EsMkJBQUtDLFdBQUwsQ0FBaUI7QUFDZkosdUJBQVMsc0JBQU87QUFDZDtBQUNBLHVCQUFLSixVQUFMLENBQWdCQyxRQUFoQixHQUEyQkssSUFBSUwsUUFBL0I7QUFDQTtBQUNBO0FBQ0Esb0JBQUksT0FBS1EscUJBQVQsRUFBZ0M7QUFDOUIseUJBQUtBLHFCQUFMLENBQTJCSCxHQUEzQjtBQUNEO0FBQ0Y7QUFUYyxhQUFqQjtBQVdEO0FBQ0Y7QUFoQmEsT0FBaEI7QUFrQkQ7OzswQkFFTUksQyxFQUFHO0FBQ1IsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxtQkFBVyxZQUFNO0FBQ2ZGLGtCQUFRLGtCQUFSO0FBQ0QsU0FGRCxFQUVHRixJQUFJLElBRlA7QUFHRCxPQUpNLENBQVA7QUFLRDs7Ozs7Ozs7Ozs7dUJBR29CLEtBQUtLLEtBQUwsQ0FBVyxDQUFYLEM7OztBQUFiQyxvQjs7QUFDTkMsd0JBQVFDLEdBQVIsQ0FBWUYsSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUdVRyxFLEVBQUk7QUFDZCxVQUFNQyxPQUFPLElBQWI7QUFDQSxVQUFJLEtBQUtwQixVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRCxxQkFBS08sV0FBTCxDQUFpQjtBQUNmSixlQURlLG1CQUNORSxHQURNLEVBQ0Q7QUFDWmMsZUFBS3BCLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCSyxJQUFJTCxRQUEvQjtBQUNBa0IsZ0JBQU1BLEdBQUdiLElBQUlMLFFBQVAsQ0FBTjtBQUNEO0FBSmMsT0FBakI7QUFNRDs7OztFQTFHMEIsZUFBS29CLEc7Ozs7QUE0R2xDQyxJQUFJO0FBQ0Z0QixjQUFZO0FBQ1ZDLGNBQVU7QUFEQTtBQURWLENBQUoiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL21lJyxcbiAgICAgICdwYWdlcy91aS9pbmRleCcsXG4gICAgICAncGFnZXMvbmF2L2JvdHRvbScsXG4gICAgICAncGFnZXMvbmF2L3RvcCcsXG4gICAgICAncGFnZXMvbmF2L2JhZGdlJyxcbiAgICAgICdwYWdlcy9jaGFydGltYWdlL2ltZ2xvYWRlcicsXG4gICAgICAncGFnZXMvYXBpL2luZGV4JyxcbiAgICAgICdwYWdlcy9mdW5zL2luZGV4JyxcbiAgICAgICdwYWdlcy9idWdzL2luZGV4JyxcbiAgICAgICdwYWdlcy9uZXcvd2VidmlldycsXG4gICAgICAncGFnZXMvdWkvbGlzdGVtcHR5JyxcbiAgICAgICdwYWdlcy91aS9saXN0bG9hZG1vcmUnLFxuICAgICAgJ3BhZ2VzL3VpL2FjdGlvbnNoZWV0J1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnYmxhY2snLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMzOTNBM0YnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wwj+eoi+W6j+agt+S+i+Wkp+WFqCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjJGMkYyJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdsaWdodCdcbiAgICB9LFxuICAgIHRhYkJhcjoge1xuICAgICAgY29sb3I6ICcjOGE4YThhJyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjMmFhNTE1JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNGQ0ZDRkMnLFxuICAgICAgYm9yZGVyU3R5bGU6ICcjRUJFQkVCJyxcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICB0ZXh0OiAn5Yqf6IO9JyxcbiAgICAgICAgaWNvblBhdGg6ICdpbWFnZXMvZGVtby5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL2RlbW9fc2VsZWN0ZWQucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9tZScsXG4gICAgICAgIHRleHQ6ICfkuKrkurrkuK3lv4MnLFxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy9wZXJzb25hbF91bi5wbmcnLFxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL3BlcnNvbmFsLnBuZydcbiAgICAgIH1dXG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbFxuICB9XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICAvLyDnmbvlvZVcbiAgICB3ZXB5LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vIOWPkemAgSByZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXG4gICAgICB9XG4gICAgfSlcbiAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbiAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7DvvIzkuI3kvJrlvLnmoYZcbiAgICAgICAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIC8vIOWPr+S7peWwhiByZXMg5Y+R6YCB57uZ5ZCO5Y+w6Kej56CB5Ye6IHVuaW9uSWRcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgICAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXG4gICAgICAgICAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcbiAgICAgICAgICAgICAgaWYgKHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzbGVlcCAocykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXG4gICAgICB9LCBzICogMTAwMClcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgdGVzdEFzeW5jICgpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gIH1cblxuICBnZXRVc2VySW5mbyhjYikge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgIH1cbiAgICB3ZXB5LmdldFVzZXJJbmZvKHtcbiAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbkFwcCh7XG4gIGdsb2JhbERhdGE6IHtcbiAgICB1c2VySW5mbzogbnVsbFxuICB9XG59KVxuIl19