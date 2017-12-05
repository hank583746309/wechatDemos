'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 主要用于ListView空数据状态界面显示
 */
var EmptyView = function (_wepy$page) {
  _inherits(EmptyView, _wepy$page);

  function EmptyView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EmptyView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EmptyView.__proto__ || Object.getPrototypeOf(EmptyView)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      id: null,
      inited: false,
      emptyIcon: 'http://www.easyicon.net/api/resizeApi.php?id=1176490&size=128',
      emptyText: '空空如也～',
      showButton: true,
      btnCls: '',
      btnHoverCls: 'btn_hover',
      buttonText: '点击刷新'
    }, _this.methods = {
      /**
       * 用于动态修改参数配置
       * @param cfg 支持更改 data 中所有参数
       */
      config: function config(cfg) {
        if (typeof cfg === 'undefined') {
          cfg = {};
        }
        for (var key in cfg) {
          if (typeof this[key] === 'undefined') {
            continue;
          }
          this[key] = cfg[key];
        }
        this.showButton = !(cfg.showButton === false);
        this.inited = false; // 默认初始状态为
        this.$apply();
      },
      inited: function inited() {
        this.inited = true; // 告知已经完成数据初始化动作,之后可以显示数据空问题
      },
      onBtnClick: function onBtnClick() {
        this.$emit('onEmptyButtonClick', this.id); // 通过自定义ID 来区分同一个Page中 多一个emptyview点击事件，方便通知对应的fragment分发处理
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return EmptyView;
}(_wepy2.default.page);

exports.default = EmptyView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcHR5dmlldy5qcyJdLCJuYW1lcyI6WyJFbXB0eVZpZXciLCJjb25maWciLCJkYXRhIiwiaWQiLCJpbml0ZWQiLCJlbXB0eUljb24iLCJlbXB0eVRleHQiLCJzaG93QnV0dG9uIiwiYnRuQ2xzIiwiYnRuSG92ZXJDbHMiLCJidXR0b25UZXh0IiwibWV0aG9kcyIsImNmZyIsImtleSIsIiRhcHBseSIsIm9uQnRuQ2xpY2siLCIkZW1pdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVMsRSxRQUdUQyxJLEdBQU87QUFDTEMsVUFBSSxJQURDO0FBRUxDLGNBQVEsS0FGSDtBQUdMQyxpQkFBVywrREFITjtBQUlMQyxpQkFBVyxPQUpOO0FBS0xDLGtCQUFZLElBTFA7QUFNTEMsY0FBUSxFQU5IO0FBT0xDLG1CQUFhLFdBUFI7QUFRTEMsa0JBQVk7QUFSUCxLLFFBVVBDLE8sR0FBVTtBQUNSOzs7O0FBSUFWLGNBQVEsZ0JBQVVXLEdBQVYsRUFBZTtBQUNyQixZQUFJLE9BQU9BLEdBQVAsS0FBZSxXQUFuQixFQUFnQztBQUM5QkEsZ0JBQU0sRUFBTjtBQUNEO0FBQ0QsYUFBSyxJQUFJQyxHQUFULElBQWdCRCxHQUFoQixFQUFxQjtBQUNuQixjQUFJLE9BQU8sS0FBS0MsR0FBTCxDQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQUU7QUFBVTtBQUNsRCxlQUFLQSxHQUFMLElBQVlELElBQUlDLEdBQUosQ0FBWjtBQUNEO0FBQ0QsYUFBS04sVUFBTCxHQUFrQixFQUFFSyxJQUFJTCxVQUFKLEtBQW1CLEtBQXJCLENBQWxCO0FBQ0EsYUFBS0gsTUFBTCxHQUFjLEtBQWQsQ0FUcUIsQ0FTRDtBQUNwQixhQUFLVSxNQUFMO0FBQ0QsT0FoQk87QUFpQlJWLGNBQVEsa0JBQVk7QUFDbEIsYUFBS0EsTUFBTCxHQUFjLElBQWQsQ0FEa0IsQ0FDQztBQUNwQixPQW5CTztBQW9CUlcsa0JBQVksc0JBQVk7QUFDdEIsYUFBS0MsS0FBTCxDQUFXLG9CQUFYLEVBQWlDLEtBQUtiLEVBQXRDLEVBRHNCLENBQ29CO0FBQzNDO0FBdEJPLEs7Ozs7RUFkMkIsZUFBS2MsSTs7a0JBQXZCakIsUyIsImZpbGUiOiJlbXB0eXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICAvKipcbiAgICog5Li76KaB55So5LqOTGlzdFZpZXfnqbrmlbDmja7nirbmgIHnlYzpnaLmmL7npLpcbiAgICovXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtcHR5VmlldyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgaWQ6IG51bGwsXG4gICAgICBpbml0ZWQ6IGZhbHNlLFxuICAgICAgZW1wdHlJY29uOiAnaHR0cDovL3d3dy5lYXN5aWNvbi5uZXQvYXBpL3Jlc2l6ZUFwaS5waHA/aWQ9MTE3NjQ5MCZzaXplPTEyOCcsXG4gICAgICBlbXB0eVRleHQ6ICfnqbrnqbrlpoLkuZ/vvZ4nLFxuICAgICAgc2hvd0J1dHRvbjogdHJ1ZSxcbiAgICAgIGJ0bkNsczogJycsXG4gICAgICBidG5Ib3ZlckNsczogJ2J0bl9ob3ZlcicsXG4gICAgICBidXR0b25UZXh0OiAn54K55Ye75Yi35pawJ1xuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8qKlxuICAgICAgICog55So5LqO5Yqo5oCB5L+u5pS55Y+C5pWw6YWN572uXG4gICAgICAgKiBAcGFyYW0gY2ZnIOaUr+aMgeabtOaUuSBkYXRhIOS4reaJgOacieWPguaVsFxuICAgICAgICovXG4gICAgICBjb25maWc6IGZ1bmN0aW9uIChjZmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjZmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY2ZnID0ge31cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gY2ZnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7IGNvbnRpbnVlIH1cbiAgICAgICAgICB0aGlzW2tleV0gPSBjZmdba2V5XVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0J1dHRvbiA9ICEoY2ZnLnNob3dCdXR0b24gPT09IGZhbHNlKVxuICAgICAgICB0aGlzLmluaXRlZCA9IGZhbHNlIC8vIOm7mOiupOWIneWni+eKtuaAgeS4ulxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgaW5pdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZSAvLyDlkYrnn6Xlt7Lnu4/lrozmiJDmlbDmja7liJ3lp4vljJbliqjkvZws5LmL5ZCO5Y+v5Lul5pi+56S65pWw5o2u56m66Zeu6aKYXG4gICAgICB9LFxuICAgICAgb25CdG5DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRlbWl0KCdvbkVtcHR5QnV0dG9uQ2xpY2snLCB0aGlzLmlkKSAvLyDpgJrov4foh6rlrprkuYlJRCDmnaXljLrliIblkIzkuIDkuKpQYWdl5LitIOWkmuS4gOS4qmVtcHR5dmlld+eCueWHu+S6i+S7tu+8jOaWueS+v+mAmuefpeWvueW6lOeahGZyYWdtZW505YiG5Y+R5aSE55CGXG4gICAgICB9XG4gICAgfTtcbiAgfVxuIl19