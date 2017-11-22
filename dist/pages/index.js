'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
// 可参照： DEMO合集    hhttp://javascript.ctolib.com/WechatSmallApps.html
//         小商城后台   http://javascript.ctolib.com/m-mall-admin.html
//         在线文档阅读 http://javascript.ctolib.com/SmallRuralDog-cloud-doc.html
//         **XpmJS    http://javascript.ctolib.com/xpmjs.html
//         爬虫&后台   http://javascript.ctolib.com/app_market.html
//         *** canvas 练习 && 图片瀑布流可以伪装为“天上人间”
//         *******小程序案例上传模式 http://javascript.ctolib.com/wechat-dribbbled.html
*/

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '小程序样例大全'
    }, _this.data = {
      list: [{
        id: 'form',
        name: 'UI界面',
        open: false,
        pages: [{ label: '基础组件', id: '' }, { label: '表单', id: '' }, { label: '操作反馈', id: '' }, { label: '扩展组件(Search)', id: '' }]
      }, {
        id: 'nav',
        name: '导航',
        open: false,
        module: 'nav',
        pages: [{ label: '顶部导航', id: 'top' }, { label: '底部导航', id: 'bottom' }, { label: '带Badge导航', id: 'badge' }]
      }, {
        id: 'feedback',
        name: '功能',
        open: false,
        module: 'chartimage',
        pages: [{ label: '图表图像', id: '' }, { label: '图片加载', id: 'imgloader' }]
      }, {
        id: 'widget',
        name: 'API封装',
        open: false,
        pages: [{ label: 'wx.request封装', id: '' }, { label: 'pramise封装', id: '' }]
      }, {
        id: 'search',
        name: '小程序的坑',
        open: false,
        pages: [{ label: 'websocket', id: '' }]
      }]
    }, _this.methods = {
      bindContact: function bindContact(e) {
        _wepy2.default.navigateTo({ url: 'new/webview' });
      },
      kindToggle: function kindToggle(id) {
        this.list.forEach(function (v) {
          v.open = v.id === id ? !v.open : false;
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsaXN0IiwiaWQiLCJuYW1lIiwib3BlbiIsInBhZ2VzIiwibGFiZWwiLCJtb2R1bGUiLCJtZXRob2RzIiwiYmluZENvbnRhY3QiLCJlIiwibmF2aWdhdGVUbyIsInVybCIsImtpbmRUb2dnbGUiLCJmb3JFYWNoIiwidiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0FBRUY7Ozs7Ozs7Ozs7SUFVdUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxZQUFNLENBQ0o7QUFDRUMsWUFBSSxNQUROO0FBRUVDLGNBQU0sTUFGUjtBQUdFQyxjQUFNLEtBSFI7QUFJRUMsZUFBTyxDQUFDLEVBQUVDLE9BQU8sTUFBVCxFQUFpQkosSUFBSSxFQUFyQixFQUFELEVBQTRCLEVBQUVJLE9BQU8sSUFBVCxFQUFlSixJQUFJLEVBQW5CLEVBQTVCLEVBQXFELEVBQUVJLE9BQU8sTUFBVCxFQUFpQkosSUFBSSxFQUFyQixFQUFyRCxFQUFnRixFQUFFSSxPQUFPLGNBQVQsRUFBeUJKLElBQUksRUFBN0IsRUFBaEY7QUFKVCxPQURJLEVBT0o7QUFDRUEsWUFBSSxLQUROO0FBRUVDLGNBQU0sSUFGUjtBQUdFQyxjQUFNLEtBSFI7QUFJRUcsZ0JBQVEsS0FKVjtBQUtFRixlQUFPLENBQUMsRUFBRUMsT0FBTyxNQUFULEVBQWlCSixJQUFJLEtBQXJCLEVBQUQsRUFBK0IsRUFBRUksT0FBTyxNQUFULEVBQWlCSixJQUFJLFFBQXJCLEVBQS9CLEVBQWdFLEVBQUVJLE9BQU8sVUFBVCxFQUFxQkosSUFBSSxPQUF6QixFQUFoRTtBQUxULE9BUEksRUFjSjtBQUNFQSxZQUFJLFVBRE47QUFFRUMsY0FBTSxJQUZSO0FBR0VDLGNBQU0sS0FIUjtBQUlFRyxnQkFBUSxZQUpWO0FBS0VGLGVBQU8sQ0FBQyxFQUFFQyxPQUFPLE1BQVQsRUFBaUJKLElBQUksRUFBckIsRUFBRCxFQUE0QixFQUFFSSxPQUFPLE1BQVQsRUFBaUJKLElBQUksV0FBckIsRUFBNUI7QUFMVCxPQWRJLEVBcUJKO0FBQ0VBLFlBQUksUUFETjtBQUVFQyxjQUFNLE9BRlI7QUFHRUMsY0FBTSxLQUhSO0FBSUVDLGVBQU8sQ0FBQyxFQUFFQyxPQUFPLGNBQVQsRUFBeUJKLElBQUksRUFBN0IsRUFBRCxFQUFvQyxFQUFFSSxPQUFPLFdBQVQsRUFBc0JKLElBQUksRUFBMUIsRUFBcEM7QUFKVCxPQXJCSSxFQTJCSjtBQUNFQSxZQUFJLFFBRE47QUFFRUMsY0FBTSxPQUZSO0FBR0VDLGNBQU0sS0FIUjtBQUlFQyxlQUFPLENBQUMsRUFBRUMsT0FBTyxXQUFULEVBQXNCSixJQUFJLEVBQTFCLEVBQUQ7QUFKVCxPQTNCSTtBQURELEssUUFxQ1BNLE8sR0FBVTtBQUNSQyxpQkFEUSx1QkFDSUMsQ0FESixFQUNPO0FBQ2IsdUJBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxhQUFOLEVBQWhCO0FBQ0QsT0FITztBQUlSQyxnQkFKUSxzQkFJR1gsRUFKSCxFQUlPO0FBQ2IsYUFBS0QsSUFBTCxDQUFVYSxPQUFWLENBQWtCLGFBQUs7QUFBRUMsWUFBRVgsSUFBRixHQUFVVyxFQUFFYixFQUFGLEtBQVNBLEVBQVYsR0FBZ0IsQ0FBQ2EsRUFBRVgsSUFBbkIsR0FBMEIsS0FBbkM7QUFBMEMsU0FBbkU7QUFDRDtBQU5PLEs7Ozs7RUExQ3VCLGVBQUtZLEk7O2tCQUFuQm5CLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuLypcbi8vIOWPr+WPgueFp++8miBERU1P5ZCI6ZuGICAgIGhodHRwOi8vamF2YXNjcmlwdC5jdG9saWIuY29tL1dlY2hhdFNtYWxsQXBwcy5odG1sXG4vLyAgICAgICAgIOWwj+WVhuWfjuWQjuWPsCAgIGh0dHA6Ly9qYXZhc2NyaXB0LmN0b2xpYi5jb20vbS1tYWxsLWFkbWluLmh0bWxcbi8vICAgICAgICAg5Zyo57q/5paH5qGj6ZiF6K+7IGh0dHA6Ly9qYXZhc2NyaXB0LmN0b2xpYi5jb20vU21hbGxSdXJhbERvZy1jbG91ZC1kb2MuaHRtbFxuLy8gICAgICAgICAqKlhwbUpTICAgIGh0dHA6Ly9qYXZhc2NyaXB0LmN0b2xpYi5jb20veHBtanMuaHRtbFxuLy8gICAgICAgICDniKzomasm5ZCO5Y+wICAgaHR0cDovL2phdmFzY3JpcHQuY3RvbGliLmNvbS9hcHBfbWFya2V0Lmh0bWxcbi8vICAgICAgICAgKioqIGNhbnZhcyDnu4PkuaAgJiYg5Zu+54mH54CR5biD5rWB5Y+v5Lul5Lyq6KOF5Li64oCc5aSp5LiK5Lq66Ze04oCdXG4vLyAgICAgICAgICoqKioqKirlsI/nqIvluo/moYjkvovkuIrkvKDmqKHlvI8gaHR0cDovL2phdmFzY3JpcHQuY3RvbGliLmNvbS93ZWNoYXQtZHJpYmJibGVkLmh0bWxcbiovXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflsI/nqIvluo/moLfkvovlpKflhagnXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnZm9ybScsXG4gICAgICAgICAgbmFtZTogJ1VJ55WM6Z2iJyxcbiAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICBwYWdlczogW3sgbGFiZWw6ICfln7rnoYDnu4Tku7YnLCBpZDogJycgfSwgeyBsYWJlbDogJ+ihqOWNlScsIGlkOiAnJyB9LCB7IGxhYmVsOiAn5pON5L2c5Y+N6aaIJywgaWQ6ICcnIH0sIHsgbGFiZWw6ICfmianlsZXnu4Tku7YoU2VhcmNoKScsIGlkOiAnJyB9XVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICduYXYnLFxuICAgICAgICAgIG5hbWU6ICflr7zoiKonLFxuICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgIG1vZHVsZTogJ25hdicsXG4gICAgICAgICAgcGFnZXM6IFt7IGxhYmVsOiAn6aG26YOo5a+86IiqJywgaWQ6ICd0b3AnIH0sIHsgbGFiZWw6ICflupXpg6jlr7zoiKonLCBpZDogJ2JvdHRvbScgfSwgeyBsYWJlbDogJ+W4pkJhZGdl5a+86IiqJywgaWQ6ICdiYWRnZScgfV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnZmVlZGJhY2snLFxuICAgICAgICAgIG5hbWU6ICflip/og70nLFxuICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgIG1vZHVsZTogJ2NoYXJ0aW1hZ2UnLFxuICAgICAgICAgIHBhZ2VzOiBbeyBsYWJlbDogJ+WbvuihqOWbvuWDjycsIGlkOiAnJyB9LCB7IGxhYmVsOiAn5Zu+54mH5Yqg6L29JywgaWQ6ICdpbWdsb2FkZXInIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ3dpZGdldCcsXG4gICAgICAgICAgbmFtZTogJ0FQSeWwgeijhScsXG4gICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgcGFnZXM6IFt7IGxhYmVsOiAnd3gucmVxdWVzdOWwgeijhScsIGlkOiAnJyB9LCB7IGxhYmVsOiAncHJhbWlzZeWwgeijhScsIGlkOiAnJyB9XVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdzZWFyY2gnLFxuICAgICAgICAgIG5hbWU6ICflsI/nqIvluo/nmoTlnZEnLFxuICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgIHBhZ2VzOiBbeyBsYWJlbDogJ3dlYnNvY2tldCcsIGlkOiAnJyB9XVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBiaW5kQ29udGFjdChlKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbmV3L3dlYnZpZXcnfSlcbiAgICAgIH0sXG4gICAgICBraW5kVG9nZ2xlKGlkKSB7XG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKHYgPT4geyB2Lm9wZW4gPSAodi5pZCA9PT0gaWQpID8gIXYub3BlbiA6IGZhbHNlIH0pXG4gICAgICB9XG4gICAgfTtcbiAgfVxuIl19