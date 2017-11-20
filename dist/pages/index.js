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
        pages: [{ label: '顶部导航', id: 'index' }, { label: '底部导航', id: 'bottom' }, { label: '带Badge导航', id: 'badge' }]
      }, {
        id: 'feedback',
        name: '功能',
        open: false,
        pages: [{ label: '图表图像', id: '' }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsaXN0IiwiaWQiLCJuYW1lIiwib3BlbiIsInBhZ2VzIiwibGFiZWwiLCJtZXRob2RzIiwiYmluZENvbnRhY3QiLCJlIiwibmF2aWdhdGVUbyIsInVybCIsImtpbmRUb2dnbGUiLCJmb3JFYWNoIiwidiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0FBRUY7Ozs7Ozs7Ozs7SUFVdUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxZQUFNLENBQ0o7QUFDRUMsWUFBSSxNQUROO0FBRUVDLGNBQU0sTUFGUjtBQUdFQyxjQUFNLEtBSFI7QUFJRUMsZUFBTyxDQUFDLEVBQUVDLE9BQU8sTUFBVCxFQUFpQkosSUFBSSxFQUFyQixFQUFELEVBQTRCLEVBQUVJLE9BQU8sSUFBVCxFQUFlSixJQUFJLEVBQW5CLEVBQTVCLEVBQXFELEVBQUVJLE9BQU8sTUFBVCxFQUFpQkosSUFBSSxFQUFyQixFQUFyRCxFQUFnRixFQUFFSSxPQUFPLGNBQVQsRUFBeUJKLElBQUksRUFBN0IsRUFBaEY7QUFKVCxPQURJLEVBT0o7QUFDRUEsWUFBSSxLQUROO0FBRUVDLGNBQU0sSUFGUjtBQUdFQyxjQUFNLEtBSFI7QUFJRUMsZUFBTyxDQUFDLEVBQUVDLE9BQU8sTUFBVCxFQUFpQkosSUFBSSxPQUFyQixFQUFELEVBQWlDLEVBQUVJLE9BQU8sTUFBVCxFQUFpQkosSUFBSSxRQUFyQixFQUFqQyxFQUFrRSxFQUFFSSxPQUFPLFVBQVQsRUFBcUJKLElBQUksT0FBekIsRUFBbEU7QUFKVCxPQVBJLEVBYUo7QUFDRUEsWUFBSSxVQUROO0FBRUVDLGNBQU0sSUFGUjtBQUdFQyxjQUFNLEtBSFI7QUFJRUMsZUFBTyxDQUFDLEVBQUVDLE9BQU8sTUFBVCxFQUFpQkosSUFBSSxFQUFyQixFQUFEO0FBSlQsT0FiSSxFQW1CSjtBQUNFQSxZQUFJLFFBRE47QUFFRUMsY0FBTSxPQUZSO0FBR0VDLGNBQU0sS0FIUjtBQUlFQyxlQUFPLENBQUMsRUFBRUMsT0FBTyxjQUFULEVBQXlCSixJQUFJLEVBQTdCLEVBQUQsRUFBb0MsRUFBRUksT0FBTyxXQUFULEVBQXNCSixJQUFJLEVBQTFCLEVBQXBDO0FBSlQsT0FuQkksRUF5Qko7QUFDRUEsWUFBSSxRQUROO0FBRUVDLGNBQU0sT0FGUjtBQUdFQyxjQUFNLEtBSFI7QUFJRUMsZUFBTyxDQUFDLEVBQUVDLE9BQU8sV0FBVCxFQUFzQkosSUFBSSxFQUExQixFQUFEO0FBSlQsT0F6Qkk7QUFERCxLLFFBbUNQSyxPLEdBQVU7QUFDUkMsaUJBRFEsdUJBQ0lDLENBREosRUFDTztBQUNiLHVCQUFLQyxVQUFMLENBQWdCLEVBQUNDLEtBQUssYUFBTixFQUFoQjtBQUNELE9BSE87QUFJUkMsZ0JBSlEsc0JBSUdWLEVBSkgsRUFJTztBQUNiLGFBQUtELElBQUwsQ0FBVVksT0FBVixDQUFrQixhQUFLO0FBQUVDLFlBQUVWLElBQUYsR0FBVVUsRUFBRVosRUFBRixLQUFTQSxFQUFWLEdBQWdCLENBQUNZLEVBQUVWLElBQW5CLEdBQTBCLEtBQW5DO0FBQTBDLFNBQW5FO0FBQ0Q7QUFOTyxLOzs7O0VBeEN1QixlQUFLVyxJOztrQkFBbkJsQixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbi8qXG4vLyDlj6/lj4LnhafvvJogREVNT+WQiOmbhiAgICBoaHR0cDovL2phdmFzY3JpcHQuY3RvbGliLmNvbS9XZWNoYXRTbWFsbEFwcHMuaHRtbFxuLy8gICAgICAgICDlsI/llYbln47lkI7lj7AgICBodHRwOi8vamF2YXNjcmlwdC5jdG9saWIuY29tL20tbWFsbC1hZG1pbi5odG1sXG4vLyAgICAgICAgIOWcqOe6v+aWh+aho+mYheivuyBodHRwOi8vamF2YXNjcmlwdC5jdG9saWIuY29tL1NtYWxsUnVyYWxEb2ctY2xvdWQtZG9jLmh0bWxcbi8vICAgICAgICAgKipYcG1KUyAgICBodHRwOi8vamF2YXNjcmlwdC5jdG9saWIuY29tL3hwbWpzLmh0bWxcbi8vICAgICAgICAg54is6JmrJuWQjuWPsCAgIGh0dHA6Ly9qYXZhc2NyaXB0LmN0b2xpYi5jb20vYXBwX21hcmtldC5odG1sXG4vLyAgICAgICAgICoqKiBjYW52YXMg57uD5LmgICYmIOWbvueJh+eAkeW4g+a1geWPr+S7peS8quijheS4uuKAnOWkqeS4iuS6uumXtOKAnVxuLy8gICAgICAgICAqKioqKioq5bCP56iL5bqP5qGI5L6L5LiK5Lyg5qih5byPIGh0dHA6Ly9qYXZhc2NyaXB0LmN0b2xpYi5jb20vd2VjaGF0LWRyaWJiYmxlZC5odG1sXG4qL1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5bCP56iL5bqP5qC35L6L5aSn5YWoJ1xuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBsaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2Zvcm0nLFxuICAgICAgICAgIG5hbWU6ICdVSeeVjOmdoicsXG4gICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgcGFnZXM6IFt7IGxhYmVsOiAn5Z+656GA57uE5Lu2JywgaWQ6ICcnIH0sIHsgbGFiZWw6ICfooajljZUnLCBpZDogJycgfSwgeyBsYWJlbDogJ+aTjeS9nOWPjemmiCcsIGlkOiAnJyB9LCB7IGxhYmVsOiAn5omp5bGV57uE5Lu2KFNlYXJjaCknLCBpZDogJycgfV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnbmF2JyxcbiAgICAgICAgICBuYW1lOiAn5a+86IiqJyxcbiAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICBwYWdlczogW3sgbGFiZWw6ICfpobbpg6jlr7zoiKonLCBpZDogJ2luZGV4JyB9LCB7IGxhYmVsOiAn5bqV6YOo5a+86IiqJywgaWQ6ICdib3R0b20nIH0sIHsgbGFiZWw6ICfluKZCYWRnZeWvvOiIqicsIGlkOiAnYmFkZ2UnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2ZlZWRiYWNrJyxcbiAgICAgICAgICBuYW1lOiAn5Yqf6IO9JyxcbiAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICBwYWdlczogW3sgbGFiZWw6ICflm77ooajlm77lg48nLCBpZDogJycgfV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnd2lkZ2V0JyxcbiAgICAgICAgICBuYW1lOiAnQVBJ5bCB6KOFJyxcbiAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICBwYWdlczogW3sgbGFiZWw6ICd3eC5yZXF1ZXN05bCB6KOFJywgaWQ6ICcnIH0sIHsgbGFiZWw6ICdwcmFtaXNl5bCB6KOFJywgaWQ6ICcnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ3NlYXJjaCcsXG4gICAgICAgICAgbmFtZTogJ+Wwj+eoi+W6j+eahOWdkScsXG4gICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgcGFnZXM6IFt7IGxhYmVsOiAnd2Vic29ja2V0JywgaWQ6ICcnIH1dXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGJpbmRDb250YWN0KGUpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICduZXcvd2Vidmlldyd9KVxuICAgICAgfSxcbiAgICAgIGtpbmRUb2dnbGUoaWQpIHtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2godiA9PiB7IHYub3BlbiA9ICh2LmlkID09PSBpZCkgPyAhdi5vcGVuIDogZmFsc2UgfSlcbiAgICAgIH1cbiAgICB9O1xuICB9XG4iXX0=