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
        module: 'ui',
        pages: [{ label: '基础组件', id: '' }, { label: '表单', id: '' }, { label: '操作反馈actionsheet', id: 'actionsheet' }, { label: '扩展组件(Search)', id: '' }, { label: 'List空视图', id: 'listempty' }, { label: 'List加载更多', id: 'listloadmore' }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsaXN0IiwiaWQiLCJuYW1lIiwib3BlbiIsIm1vZHVsZSIsInBhZ2VzIiwibGFiZWwiLCJtZXRob2RzIiwiYmluZENvbnRhY3QiLCJlIiwibmF2aWdhdGVUbyIsInVybCIsImtpbmRUb2dnbGUiLCJmb3JFYWNoIiwidiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0FBRUY7Ozs7Ozs7Ozs7SUFVdUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxZQUFNLENBQ0o7QUFDRUMsWUFBSSxNQUROO0FBRUVDLGNBQU0sTUFGUjtBQUdFQyxjQUFNLEtBSFI7QUFJRUMsZ0JBQVEsSUFKVjtBQUtFQyxlQUFPLENBQUMsRUFBRUMsT0FBTyxNQUFULEVBQWlCTCxJQUFJLEVBQXJCLEVBQUQsRUFBNEIsRUFBRUssT0FBTyxJQUFULEVBQWVMLElBQUksRUFBbkIsRUFBNUIsRUFBcUQsRUFBRUssT0FBTyxpQkFBVCxFQUE0QkwsSUFBSSxhQUFoQyxFQUFyRCxFQUFzRyxFQUFFSyxPQUFPLGNBQVQsRUFBeUJMLElBQUksRUFBN0IsRUFBdEcsRUFBeUksRUFBRUssT0FBTyxTQUFULEVBQW9CTCxJQUFJLFdBQXhCLEVBQXpJLEVBQWdMLEVBQUNLLE9BQU8sVUFBUixFQUFvQkwsSUFBSSxjQUF4QixFQUFoTDtBQUxULE9BREksRUFRSjtBQUNFQSxZQUFJLEtBRE47QUFFRUMsY0FBTSxJQUZSO0FBR0VDLGNBQU0sS0FIUjtBQUlFQyxnQkFBUSxLQUpWO0FBS0VDLGVBQU8sQ0FBQyxFQUFFQyxPQUFPLE1BQVQsRUFBaUJMLElBQUksS0FBckIsRUFBRCxFQUErQixFQUFFSyxPQUFPLE1BQVQsRUFBaUJMLElBQUksUUFBckIsRUFBL0IsRUFBZ0UsRUFBRUssT0FBTyxVQUFULEVBQXFCTCxJQUFJLE9BQXpCLEVBQWhFO0FBTFQsT0FSSSxFQWVKO0FBQ0VBLFlBQUksVUFETjtBQUVFQyxjQUFNLElBRlI7QUFHRUMsY0FBTSxLQUhSO0FBSUVDLGdCQUFRLFlBSlY7QUFLRUMsZUFBTyxDQUFDLEVBQUVDLE9BQU8sTUFBVCxFQUFpQkwsSUFBSSxFQUFyQixFQUFELEVBQTRCLEVBQUVLLE9BQU8sTUFBVCxFQUFpQkwsSUFBSSxXQUFyQixFQUE1QjtBQUxULE9BZkksRUFzQko7QUFDRUEsWUFBSSxRQUROO0FBRUVDLGNBQU0sT0FGUjtBQUdFQyxjQUFNLEtBSFI7QUFJRUUsZUFBTyxDQUFDLEVBQUVDLE9BQU8sY0FBVCxFQUF5QkwsSUFBSSxFQUE3QixFQUFELEVBQW9DLEVBQUVLLE9BQU8sV0FBVCxFQUFzQkwsSUFBSSxFQUExQixFQUFwQztBQUpULE9BdEJJLEVBNEJKO0FBQ0VBLFlBQUksUUFETjtBQUVFQyxjQUFNLE9BRlI7QUFHRUMsY0FBTSxLQUhSO0FBSUVFLGVBQU8sQ0FBQyxFQUFFQyxPQUFPLFdBQVQsRUFBc0JMLElBQUksRUFBMUIsRUFBRDtBQUpULE9BNUJJO0FBREQsSyxRQXNDUE0sTyxHQUFVO0FBQ1JDLGlCQURRLHVCQUNJQyxDQURKLEVBQ087QUFDYix1QkFBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGFBQU4sRUFBaEI7QUFDRCxPQUhPO0FBSVJDLGdCQUpRLHNCQUlHWCxFQUpILEVBSU87QUFDYixhQUFLRCxJQUFMLENBQVVhLE9BQVYsQ0FBa0IsYUFBSztBQUFFQyxZQUFFWCxJQUFGLEdBQVVXLEVBQUViLEVBQUYsS0FBU0EsRUFBVixHQUFnQixDQUFDYSxFQUFFWCxJQUFuQixHQUEwQixLQUFuQztBQUEwQyxTQUFuRTtBQUNEO0FBTk8sSzs7OztFQTNDdUIsZUFBS1ksSTs7a0JBQW5CbkIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4vKlxuLy8g5Y+v5Y+C54Wn77yaIERFTU/lkIjpm4YgICAgaGh0dHA6Ly9qYXZhc2NyaXB0LmN0b2xpYi5jb20vV2VjaGF0U21hbGxBcHBzLmh0bWxcbi8vICAgICAgICAg5bCP5ZWG5Z+O5ZCO5Y+wICAgaHR0cDovL2phdmFzY3JpcHQuY3RvbGliLmNvbS9tLW1hbGwtYWRtaW4uaHRtbFxuLy8gICAgICAgICDlnKjnur/mlofmoaPpmIXor7sgaHR0cDovL2phdmFzY3JpcHQuY3RvbGliLmNvbS9TbWFsbFJ1cmFsRG9nLWNsb3VkLWRvYy5odG1sXG4vLyAgICAgICAgICoqWHBtSlMgICAgaHR0cDovL2phdmFzY3JpcHQuY3RvbGliLmNvbS94cG1qcy5odG1sXG4vLyAgICAgICAgIOeIrOiZqyblkI7lj7AgICBodHRwOi8vamF2YXNjcmlwdC5jdG9saWIuY29tL2FwcF9tYXJrZXQuaHRtbFxuLy8gICAgICAgICAqKiogY2FudmFzIOe7g+S5oCAmJiDlm77niYfngJHluIPmtYHlj6/ku6XkvKroo4XkuLrigJzlpKnkuIrkurrpl7TigJ1cbi8vICAgICAgICAgKioqKioqKuWwj+eoi+W6j+ahiOS+i+S4iuS8oOaooeW8jyBodHRwOi8vamF2YXNjcmlwdC5jdG9saWIuY29tL3dlY2hhdC1kcmliYmJsZWQuaHRtbFxuKi9cblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wwj+eoi+W6j+agt+S+i+Wkp+WFqCdcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdmb3JtJyxcbiAgICAgICAgICBuYW1lOiAnVUnnlYzpnaInLFxuICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgIG1vZHVsZTogJ3VpJyxcbiAgICAgICAgICBwYWdlczogW3sgbGFiZWw6ICfln7rnoYDnu4Tku7YnLCBpZDogJycgfSwgeyBsYWJlbDogJ+ihqOWNlScsIGlkOiAnJyB9LCB7IGxhYmVsOiAn5pON5L2c5Y+N6aaIYWN0aW9uc2hlZXQnLCBpZDogJ2FjdGlvbnNoZWV0JyB9LCB7IGxhYmVsOiAn5omp5bGV57uE5Lu2KFNlYXJjaCknLCBpZDogJycgfSwgeyBsYWJlbDogJ0xpc3Tnqbrop4blm74nLCBpZDogJ2xpc3RlbXB0eScgfSwge2xhYmVsOiAnTGlzdOWKoOi9veabtOWkmicsIGlkOiAnbGlzdGxvYWRtb3JlJ31dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ25hdicsXG4gICAgICAgICAgbmFtZTogJ+WvvOiIqicsXG4gICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgbW9kdWxlOiAnbmF2JyxcbiAgICAgICAgICBwYWdlczogW3sgbGFiZWw6ICfpobbpg6jlr7zoiKonLCBpZDogJ3RvcCcgfSwgeyBsYWJlbDogJ+W6lemDqOWvvOiIqicsIGlkOiAnYm90dG9tJyB9LCB7IGxhYmVsOiAn5bimQmFkZ2Xlr7zoiKonLCBpZDogJ2JhZGdlJyB9XVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdmZWVkYmFjaycsXG4gICAgICAgICAgbmFtZTogJ+WKn+iDvScsXG4gICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgbW9kdWxlOiAnY2hhcnRpbWFnZScsXG4gICAgICAgICAgcGFnZXM6IFt7IGxhYmVsOiAn5Zu+6KGo5Zu+5YOPJywgaWQ6ICcnIH0sIHsgbGFiZWw6ICflm77niYfliqDovb0nLCBpZDogJ2ltZ2xvYWRlcicgfV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnd2lkZ2V0JyxcbiAgICAgICAgICBuYW1lOiAnQVBJ5bCB6KOFJyxcbiAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICBwYWdlczogW3sgbGFiZWw6ICd3eC5yZXF1ZXN05bCB6KOFJywgaWQ6ICcnIH0sIHsgbGFiZWw6ICdwcmFtaXNl5bCB6KOFJywgaWQ6ICcnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ3NlYXJjaCcsXG4gICAgICAgICAgbmFtZTogJ+Wwj+eoi+W6j+eahOWdkScsXG4gICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgcGFnZXM6IFt7IGxhYmVsOiAnd2Vic29ja2V0JywgaWQ6ICcnIH1dXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGJpbmRDb250YWN0KGUpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICduZXcvd2Vidmlldyd9KVxuICAgICAgfSxcbiAgICAgIGtpbmRUb2dnbGUoaWQpIHtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2godiA9PiB7IHYub3BlbiA9ICh2LmlkID09PSBpZCkgPyAhdi5vcGVuIDogZmFsc2UgfSlcbiAgICAgIH1cbiAgICB9O1xuICB9XG4iXX0=