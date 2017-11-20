'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wepy = require('./../npm/wepy-ant/lib/wepy.js');

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
        pages: [{ label: '顶部导航', id: '' }, { label: '底部导航', id: '' }, { label: '带Badge导航', id: '' }]
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
        console.log(_wepy2.default);
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


Page(require('./../npm/wepy-ant/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsaXN0IiwiaWQiLCJuYW1lIiwib3BlbiIsInBhZ2VzIiwibGFiZWwiLCJtZXRob2RzIiwiYmluZENvbnRhY3QiLCJlIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJraW5kVG9nZ2xlIiwiZm9yRWFjaCIsInYiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztBQUVGOzs7Ozs7Ozs7O0lBVXVCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsWUFBTSxDQUNKO0FBQ0VDLFlBQUksTUFETjtBQUVFQyxjQUFNLE1BRlI7QUFHRUMsY0FBTSxLQUhSO0FBSUVDLGVBQU8sQ0FBQyxFQUFFQyxPQUFPLE1BQVQsRUFBaUJKLElBQUksRUFBckIsRUFBRCxFQUE0QixFQUFFSSxPQUFPLElBQVQsRUFBZUosSUFBSSxFQUFuQixFQUE1QixFQUFxRCxFQUFFSSxPQUFPLE1BQVQsRUFBaUJKLElBQUksRUFBckIsRUFBckQsRUFBZ0YsRUFBRUksT0FBTyxjQUFULEVBQXlCSixJQUFJLEVBQTdCLEVBQWhGO0FBSlQsT0FESSxFQU9KO0FBQ0VBLFlBQUksS0FETjtBQUVFQyxjQUFNLElBRlI7QUFHRUMsY0FBTSxLQUhSO0FBSUVDLGVBQU8sQ0FBQyxFQUFFQyxPQUFPLE1BQVQsRUFBaUJKLElBQUksRUFBckIsRUFBRCxFQUE0QixFQUFFSSxPQUFPLE1BQVQsRUFBaUJKLElBQUksRUFBckIsRUFBNUIsRUFBdUQsRUFBRUksT0FBTyxVQUFULEVBQXFCSixJQUFJLEVBQXpCLEVBQXZEO0FBSlQsT0FQSSxFQWFKO0FBQ0VBLFlBQUksVUFETjtBQUVFQyxjQUFNLElBRlI7QUFHRUMsY0FBTSxLQUhSO0FBSUVDLGVBQU8sQ0FBQyxFQUFFQyxPQUFPLE1BQVQsRUFBaUJKLElBQUksRUFBckIsRUFBRDtBQUpULE9BYkksRUFtQko7QUFDRUEsWUFBSSxRQUROO0FBRUVDLGNBQU0sT0FGUjtBQUdFQyxjQUFNLEtBSFI7QUFJRUMsZUFBTyxDQUFDLEVBQUVDLE9BQU8sY0FBVCxFQUF5QkosSUFBSSxFQUE3QixFQUFELEVBQW9DLEVBQUVJLE9BQU8sV0FBVCxFQUFzQkosSUFBSSxFQUExQixFQUFwQztBQUpULE9BbkJJLEVBeUJKO0FBQ0VBLFlBQUksUUFETjtBQUVFQyxjQUFNLE9BRlI7QUFHRUMsY0FBTSxLQUhSO0FBSUVDLGVBQU8sQ0FBQyxFQUFFQyxPQUFPLFdBQVQsRUFBc0JKLElBQUksRUFBMUIsRUFBRDtBQUpULE9BekJJO0FBREQsSyxRQW1DUEssTyxHQUFVO0FBQ1JDLGlCQURRLHVCQUNJQyxDQURKLEVBQ087QUFDYkMsZ0JBQVFDLEdBQVI7QUFDQSx1QkFBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGFBQU4sRUFBaEI7QUFDRCxPQUpPO0FBS1JDLGdCQUxRLHNCQUtHWixFQUxILEVBS087QUFDYixhQUFLRCxJQUFMLENBQVVjLE9BQVYsQ0FBa0IsYUFBSztBQUFFQyxZQUFFWixJQUFGLEdBQVVZLEVBQUVkLEVBQUYsS0FBU0EsRUFBVixHQUFnQixDQUFDYyxFQUFFWixJQUFuQixHQUEwQixLQUFuQztBQUEwQyxTQUFuRTtBQUNEO0FBUE8sSzs7OztFQXhDdUIsZUFBS2EsSTs7a0JBQW5CcEIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4vKlxuLy8g5Y+v5Y+C54Wn77yaIERFTU/lkIjpm4YgICAgaGh0dHA6Ly9qYXZhc2NyaXB0LmN0b2xpYi5jb20vV2VjaGF0U21hbGxBcHBzLmh0bWxcbi8vICAgICAgICAg5bCP5ZWG5Z+O5ZCO5Y+wICAgaHR0cDovL2phdmFzY3JpcHQuY3RvbGliLmNvbS9tLW1hbGwtYWRtaW4uaHRtbFxuLy8gICAgICAgICDlnKjnur/mlofmoaPpmIXor7sgaHR0cDovL2phdmFzY3JpcHQuY3RvbGliLmNvbS9TbWFsbFJ1cmFsRG9nLWNsb3VkLWRvYy5odG1sXG4vLyAgICAgICAgICoqWHBtSlMgICAgaHR0cDovL2phdmFzY3JpcHQuY3RvbGliLmNvbS94cG1qcy5odG1sXG4vLyAgICAgICAgIOeIrOiZqyblkI7lj7AgICBodHRwOi8vamF2YXNjcmlwdC5jdG9saWIuY29tL2FwcF9tYXJrZXQuaHRtbFxuLy8gICAgICAgICAqKiogY2FudmFzIOe7g+S5oCAmJiDlm77niYfngJHluIPmtYHlj6/ku6XkvKroo4XkuLrigJzlpKnkuIrkurrpl7TigJ1cbi8vICAgICAgICAgKioqKioqKuWwj+eoi+W6j+ahiOS+i+S4iuS8oOaooeW8jyBodHRwOi8vamF2YXNjcmlwdC5jdG9saWIuY29tL3dlY2hhdC1kcmliYmJsZWQuaHRtbFxuKi9cblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Wwj+eoi+W6j+agt+S+i+Wkp+WFqCdcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdmb3JtJyxcbiAgICAgICAgICBuYW1lOiAnVUnnlYzpnaInLFxuICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgIHBhZ2VzOiBbeyBsYWJlbDogJ+WfuuehgOe7hOS7ticsIGlkOiAnJyB9LCB7IGxhYmVsOiAn6KGo5Y2VJywgaWQ6ICcnIH0sIHsgbGFiZWw6ICfmk43kvZzlj43ppognLCBpZDogJycgfSwgeyBsYWJlbDogJ+aJqeWxlee7hOS7tihTZWFyY2gpJywgaWQ6ICcnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ25hdicsXG4gICAgICAgICAgbmFtZTogJ+WvvOiIqicsXG4gICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgcGFnZXM6IFt7IGxhYmVsOiAn6aG26YOo5a+86IiqJywgaWQ6ICcnIH0sIHsgbGFiZWw6ICflupXpg6jlr7zoiKonLCBpZDogJycgfSwgeyBsYWJlbDogJ+W4pkJhZGdl5a+86IiqJywgaWQ6ICcnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2ZlZWRiYWNrJyxcbiAgICAgICAgICBuYW1lOiAn5Yqf6IO9JyxcbiAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICBwYWdlczogW3sgbGFiZWw6ICflm77ooajlm77lg48nLCBpZDogJycgfV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnd2lkZ2V0JyxcbiAgICAgICAgICBuYW1lOiAnQVBJ5bCB6KOFJyxcbiAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICBwYWdlczogW3sgbGFiZWw6ICd3eC5yZXF1ZXN05bCB6KOFJywgaWQ6ICcnIH0sIHsgbGFiZWw6ICdwcmFtaXNl5bCB6KOFJywgaWQ6ICcnIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ3NlYXJjaCcsXG4gICAgICAgICAgbmFtZTogJ+Wwj+eoi+W6j+eahOWdkScsXG4gICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgcGFnZXM6IFt7IGxhYmVsOiAnd2Vic29ja2V0JywgaWQ6ICcnIH1dXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGJpbmRDb250YWN0KGUpIHtcbiAgICAgICAgY29uc29sZS5sb2cod2VweSlcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICduZXcvd2Vidmlldyd9KVxuICAgICAgfSxcbiAgICAgIGtpbmRUb2dnbGUoaWQpIHtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2godiA9PiB7IHYub3BlbiA9ICh2LmlkID09PSBpZCkgPyAhdi5vcGVuIDogZmFsc2UgfSlcbiAgICAgIH1cbiAgICB9O1xuICB9XG4iXX0=