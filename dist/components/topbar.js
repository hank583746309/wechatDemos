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

var Hoo = require('./../libs/Hoo.all.js');

var Topbar = function (_wepy$component) {
  _inherits(Topbar, _wepy$component);

  function Topbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Topbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Topbar.__proto__ || Object.getPrototypeOf(Topbar)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      items: [],
      allowChangeTitle: false,
      badgeType: 'dot', // dot or number
      current: -1
    }, _this.methods = {
      updateTabItems: function updateTabItems(items) {
        this.items = items || [];
        this.items.map(function (item) {
          if (typeof item.id === 'undefined') {
            item.id = 'tab' + Hoo.id();
          }
        });
      },
      switchTab: function switchTab(index) {
        var _this2 = this;

        if (this.current !== -1 && this.current === index) {
          return;
        }
        this.items.map(function (row, i) {
          // data.
          row.checked = i === index;
          if (i === index && _this2.allowChangeTitle) {
            Hoo.bridge.doc.setTitle(row.value);
          }
        });
        this.$emit('onTabChange', this.current = index);
      },
      /**
       * 初始配置入口
       * @param cfg
       */
      config: function config(cfg) {
        cfg = cfg || {};
        this.allowChangeTitle = cfg.allowChangeTitle || false;
        this.methods.updateTabItems.call(this, cfg.items || []);
        this.methods.switchTab.call(this, cfg.current || 0);
      },
      /**
       * 设置badge的数量（为0不显示,大于0，根据badgeType定）
       * @param tag
       * @param count
       */
      setCount: function setCount(tag, count) {
        this.items.forEach(function (item) {
          if (item.id === tag || item.name === tag) {
            item.badgeCount = count;
            return true;
          }
        });
      }
    }, _this.events = {
      onTabChange: function onTabChange(index) {
        // 接收父类事件
        this.methods.switchTab.call(this, index);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Topbar;
}(_wepy2.default.component);

exports.default = Topbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcGJhci5qcyJdLCJuYW1lcyI6WyJIb28iLCJyZXF1aXJlIiwiVG9wYmFyIiwiY29uZmlnIiwiZGF0YSIsIml0ZW1zIiwiYWxsb3dDaGFuZ2VUaXRsZSIsImJhZGdlVHlwZSIsImN1cnJlbnQiLCJtZXRob2RzIiwidXBkYXRlVGFiSXRlbXMiLCJtYXAiLCJpdGVtIiwiaWQiLCJzd2l0Y2hUYWIiLCJpbmRleCIsInJvdyIsImkiLCJjaGVja2VkIiwiYnJpZGdlIiwiZG9jIiwic2V0VGl0bGUiLCJ2YWx1ZSIsIiRlbWl0IiwiY2ZnIiwiY2FsbCIsInNldENvdW50IiwidGFnIiwiY291bnQiLCJmb3JFYWNoIiwibmFtZSIsImJhZGdlQ291bnQiLCJldmVudHMiLCJvblRhYkNoYW5nZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxNQUFNQyxRQUFRLG9CQUFSLENBQVY7O0lBRXFCQyxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsd0JBQWtCLEtBRmI7QUFHTEMsaUJBQVcsS0FITixFQUdhO0FBQ2xCQyxlQUFTLENBQUM7QUFKTCxLLFFBTVBDLE8sR0FBVTtBQUNSQyxzQkFBZ0Isd0JBQVVMLEtBQVYsRUFBaUI7QUFDL0IsYUFBS0EsS0FBTCxHQUFhQSxTQUFTLEVBQXRCO0FBQ0EsYUFBS0EsS0FBTCxDQUFXTSxHQUFYLENBQWUsZ0JBQVE7QUFDckIsY0FBSSxPQUFPQyxLQUFLQyxFQUFaLEtBQW1CLFdBQXZCLEVBQW9DO0FBQ2xDRCxpQkFBS0MsRUFBTCxHQUFVLFFBQVFiLElBQUlhLEVBQUosRUFBbEI7QUFDRDtBQUNGLFNBSkQ7QUFLRCxPQVJPO0FBU1JDLGlCQUFXLG1CQUFVQyxLQUFWLEVBQWlCO0FBQUE7O0FBQzFCLFlBQUksS0FBS1AsT0FBTCxLQUFpQixDQUFDLENBQWxCLElBQXVCLEtBQUtBLE9BQUwsS0FBaUJPLEtBQTVDLEVBQW1EO0FBQ2pEO0FBQ0Q7QUFDRCxhQUFLVixLQUFMLENBQVdNLEdBQVgsQ0FBZSxVQUFDSyxHQUFELEVBQU1DLENBQU4sRUFBWTtBQUFFO0FBQzNCRCxjQUFJRSxPQUFKLEdBQWNELE1BQU1GLEtBQXBCO0FBQ0EsY0FBSUUsTUFBTUYsS0FBTixJQUFlLE9BQUtULGdCQUF4QixFQUEwQztBQUFFTixnQkFBSW1CLE1BQUosQ0FBV0MsR0FBWCxDQUFlQyxRQUFmLENBQXdCTCxJQUFJTSxLQUE1QjtBQUFvQztBQUNqRixTQUhEO0FBSUEsYUFBS0MsS0FBTCxDQUFXLGFBQVgsRUFBMEIsS0FBS2YsT0FBTCxHQUFlTyxLQUF6QztBQUNELE9BbEJPO0FBbUJSOzs7O0FBSUFaLGNBQVEsZ0JBQVVxQixHQUFWLEVBQWU7QUFDckJBLGNBQU1BLE9BQU8sRUFBYjtBQUNBLGFBQUtsQixnQkFBTCxHQUF3QmtCLElBQUlsQixnQkFBSixJQUF3QixLQUFoRDtBQUNBLGFBQUtHLE9BQUwsQ0FBYUMsY0FBYixDQUE0QmUsSUFBNUIsQ0FBaUMsSUFBakMsRUFBdUNELElBQUluQixLQUFKLElBQWEsRUFBcEQ7QUFDQSxhQUFLSSxPQUFMLENBQWFLLFNBQWIsQ0FBdUJXLElBQXZCLENBQTRCLElBQTVCLEVBQWtDRCxJQUFJaEIsT0FBSixJQUFlLENBQWpEO0FBQ0QsT0E1Qk87QUE2QlI7Ozs7O0FBS0FrQixnQkFBVSxrQkFBVUMsR0FBVixFQUFlQyxLQUFmLEVBQXNCO0FBQzlCLGFBQUt2QixLQUFMLENBQVd3QixPQUFYLENBQW1CLGdCQUFRO0FBQ3pCLGNBQUlqQixLQUFLQyxFQUFMLEtBQVljLEdBQVosSUFBbUJmLEtBQUtrQixJQUFMLEtBQWNILEdBQXJDLEVBQTBDO0FBQ3hDZixpQkFBS21CLFVBQUwsR0FBa0JILEtBQWxCO0FBQ0EsbUJBQU8sSUFBUDtBQUNEO0FBQ0YsU0FMRDtBQU1EO0FBekNPLEssUUEyQ1ZJLE0sR0FBUztBQUNQQyxtQkFBYSxxQkFBVWxCLEtBQVYsRUFBaUI7QUFBRTtBQUM5QixhQUFLTixPQUFMLENBQWFLLFNBQWIsQ0FBdUJXLElBQXZCLENBQTRCLElBQTVCLEVBQWtDVixLQUFsQztBQUNEO0FBSE0sSzs7OztFQXBEeUIsZUFBS21CLFM7O2tCQUFwQmhDLE0iLCJmaWxlIjoidG9wYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIHZhciBIb28gPSByZXF1aXJlKCcuLi9saWJzL0hvby5hbGwuanMnKVxuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvcGJhciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBjb25maWcgPSB7XG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgaXRlbXM6IFtdLFxuICAgICAgYWxsb3dDaGFuZ2VUaXRsZTogZmFsc2UsXG4gICAgICBiYWRnZVR5cGU6ICdkb3QnLCAvLyBkb3Qgb3IgbnVtYmVyXG4gICAgICBjdXJyZW50OiAtMVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHVwZGF0ZVRhYkl0ZW1zOiBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zIHx8IFtdXG4gICAgICAgIHRoaXMuaXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5pZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGl0ZW0uaWQgPSAndGFiJyArIEhvby5pZCgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHN3aXRjaFRhYjogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnQgIT09IC0xICYmIHRoaXMuY3VycmVudCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW1zLm1hcCgocm93LCBpKSA9PiB7IC8vIGRhdGEuXG4gICAgICAgICAgcm93LmNoZWNrZWQgPSBpID09PSBpbmRleFxuICAgICAgICAgIGlmIChpID09PSBpbmRleCAmJiB0aGlzLmFsbG93Q2hhbmdlVGl0bGUpIHsgSG9vLmJyaWRnZS5kb2Muc2V0VGl0bGUocm93LnZhbHVlKSB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuJGVtaXQoJ29uVGFiQ2hhbmdlJywgdGhpcy5jdXJyZW50ID0gaW5kZXgpXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDliJ3lp4vphY3nva7lhaXlj6NcbiAgICAgICAqIEBwYXJhbSBjZmdcbiAgICAgICAqL1xuICAgICAgY29uZmlnOiBmdW5jdGlvbiAoY2ZnKSB7XG4gICAgICAgIGNmZyA9IGNmZyB8fCB7fVxuICAgICAgICB0aGlzLmFsbG93Q2hhbmdlVGl0bGUgPSBjZmcuYWxsb3dDaGFuZ2VUaXRsZSB8fCBmYWxzZVxuICAgICAgICB0aGlzLm1ldGhvZHMudXBkYXRlVGFiSXRlbXMuY2FsbCh0aGlzLCBjZmcuaXRlbXMgfHwgW10pXG4gICAgICAgIHRoaXMubWV0aG9kcy5zd2l0Y2hUYWIuY2FsbCh0aGlzLCBjZmcuY3VycmVudCB8fCAwKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6K6+572uYmFkZ2XnmoTmlbDph4/vvIjkuLow5LiN5pi+56S6LOWkp+S6jjDvvIzmoLnmja5iYWRnZVR5cGXlrprvvIlcbiAgICAgICAqIEBwYXJhbSB0YWdcbiAgICAgICAqIEBwYXJhbSBjb3VudFxuICAgICAgICovXG4gICAgICBzZXRDb3VudDogZnVuY3Rpb24gKHRhZywgY291bnQpIHtcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChpdGVtLmlkID09PSB0YWcgfHwgaXRlbS5uYW1lID09PSB0YWcpIHtcbiAgICAgICAgICAgIGl0ZW0uYmFkZ2VDb3VudCA9IGNvdW50XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICAgIG9uVGFiQ2hhbmdlOiBmdW5jdGlvbiAoaW5kZXgpIHsgLy8g5o6l5pS254i257G75LqL5Lu2XG4gICAgICAgIHRoaXMubWV0aG9kcy5zd2l0Y2hUYWIuY2FsbCh0aGlzLCBpbmRleClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==