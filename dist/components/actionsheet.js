'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 根据原生action-sheet改进为ios ui
 */
var Actionsheet = function (_wepy$page) {
  _inherits(Actionsheet, _wepy$page);

  function Actionsheet() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Actionsheet);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Actionsheet.__proto__ || Object.getPrototypeOf(Actionsheet)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      title: '',
      titleCls: '',
      contentCls: '',
      descriptionCls: '',
      actionSheetHidden: true,
      actionSheetItems: [] // { content: '', description: ''}
    }, _this.methods = {
      config: function config(cfg) {
        if ((typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
          cfg = {};
        }
        var actionSheetItems = cfg.items || [];
        if (actionSheetItems.length === 0) {
          console.error('action-sheet中至少包含1项');
        }
        this.title = typeof cfg.title !== 'undefined' ? cfg.title : null;
        this.actionSheetItems = actionSheetItems.map(function (item) {
          if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
            item = { content: item };
          }
          return item;
        });
      },
      show: function show() {
        this.actionSheetHidden = false;
      },
      hide: function hide() {
        this.actionSheetHidden = true;
      },
      toggle: function toggle() {
        this.actionSheetHidden = !this.actionSheetHidden;
      },
      listenerActionSheet: function listenerActionSheet() {
        this.actionSheetHidden = true;
      },
      listenerItemClick: function listenerItemClick(index) {
        this.actionSheetHidden = true;
        this.$emit('onItemClickListener', this.actionSheetItems[index], index);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Actionsheet;
}(_wepy2.default.page);

exports.default = Actionsheet;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnNoZWV0LmpzIl0sIm5hbWVzIjpbIkFjdGlvbnNoZWV0IiwiY29uZmlnIiwiZGF0YSIsInRpdGxlIiwidGl0bGVDbHMiLCJjb250ZW50Q2xzIiwiZGVzY3JpcHRpb25DbHMiLCJhY3Rpb25TaGVldEhpZGRlbiIsImFjdGlvblNoZWV0SXRlbXMiLCJtZXRob2RzIiwiY2ZnIiwiaXRlbXMiLCJsZW5ndGgiLCJjb25zb2xlIiwiZXJyb3IiLCJtYXAiLCJpdGVtIiwiY29udGVudCIsInNob3ciLCJoaWRlIiwidG9nZ2xlIiwibGlzdGVuZXJBY3Rpb25TaGVldCIsImxpc3RlbmVySXRlbUNsaWNrIiwiaW5kZXgiLCIkZW1pdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR3FCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLE0sR0FBUyxFLFFBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsZ0JBQVUsRUFGTDtBQUdMQyxrQkFBWSxFQUhQO0FBSUxDLHNCQUFnQixFQUpYO0FBS0xDLHlCQUFtQixJQUxkO0FBTUxDLHdCQUFrQixFQU5iLENBTWdCO0FBTmhCLEssUUFRUEMsTyxHQUFVO0FBQ1JSLGNBQVEsZ0JBQVVTLEdBQVYsRUFBZTtBQUNyQixZQUFJLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFuQixFQUE2QjtBQUMzQkEsZ0JBQU0sRUFBTjtBQUNEO0FBQ0QsWUFBSUYsbUJBQW1CRSxJQUFJQyxLQUFKLElBQWEsRUFBcEM7QUFDQSxZQUFJSCxpQkFBaUJJLE1BQWpCLEtBQTRCLENBQWhDLEVBQW1DO0FBQUVDLGtCQUFRQyxLQUFSLENBQWMscUJBQWQ7QUFBc0M7QUFDM0UsYUFBS1gsS0FBTCxHQUFhLE9BQU9PLElBQUlQLEtBQVgsS0FBcUIsV0FBckIsR0FBbUNPLElBQUlQLEtBQXZDLEdBQStDLElBQTVEO0FBQ0EsYUFBS0ssZ0JBQUwsR0FBd0JBLGlCQUFpQk8sR0FBakIsQ0FBcUIsZ0JBQVE7QUFDbkQsY0FBSSxRQUFPQyxJQUFQLHlDQUFPQSxJQUFQLE9BQWdCLFFBQXBCLEVBQThCO0FBQzVCQSxtQkFBTyxFQUFFQyxTQUFTRCxJQUFYLEVBQVA7QUFDRDtBQUNELGlCQUFPQSxJQUFQO0FBQ0QsU0FMdUIsQ0FBeEI7QUFNRCxPQWRPO0FBZVJFLFlBQU0sZ0JBQVk7QUFDaEIsYUFBS1gsaUJBQUwsR0FBeUIsS0FBekI7QUFDRCxPQWpCTztBQWtCUlksWUFBTSxnQkFBWTtBQUNoQixhQUFLWixpQkFBTCxHQUF5QixJQUF6QjtBQUNELE9BcEJPO0FBcUJSYSxjQUFRLGtCQUFZO0FBQ2xCLGFBQUtiLGlCQUFMLEdBQXlCLENBQUMsS0FBS0EsaUJBQS9CO0FBQ0QsT0F2Qk87QUF3QlJjLDJCQUFxQiwrQkFBWTtBQUMvQixhQUFLZCxpQkFBTCxHQUF5QixJQUF6QjtBQUNELE9BMUJPO0FBMkJSZSx5QkFBbUIsMkJBQVVDLEtBQVYsRUFBaUI7QUFDbEMsYUFBS2hCLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0EsYUFBS2lCLEtBQUwsQ0FBVyxxQkFBWCxFQUFrQyxLQUFLaEIsZ0JBQUwsQ0FBc0JlLEtBQXRCLENBQWxDLEVBQWdFQSxLQUFoRTtBQUNEO0FBOUJPLEs7Ozs7RUFaNkIsZUFBS0UsSTs7a0JBQXpCekIsVyIsImZpbGUiOiJhY3Rpb25zaGVldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIC8qKlxuICAgKiDmoLnmja7ljp/nlJ9hY3Rpb24tc2hlZXTmlLnov5vkuLppb3MgdWlcbiAgICovXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdGlvbnNoZWV0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG5cbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICB0aXRsZUNsczogJycsXG4gICAgICBjb250ZW50Q2xzOiAnJyxcbiAgICAgIGRlc2NyaXB0aW9uQ2xzOiAnJyxcbiAgICAgIGFjdGlvblNoZWV0SGlkZGVuOiB0cnVlLFxuICAgICAgYWN0aW9uU2hlZXRJdGVtczogW10gLy8geyBjb250ZW50OiAnJywgZGVzY3JpcHRpb246ICcnfVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbmZpZzogZnVuY3Rpb24gKGNmZykge1xuICAgICAgICBpZiAodHlwZW9mIGNmZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjZmcgPSB7fVxuICAgICAgICB9XG4gICAgICAgIHZhciBhY3Rpb25TaGVldEl0ZW1zID0gY2ZnLml0ZW1zIHx8IFtdXG4gICAgICAgIGlmIChhY3Rpb25TaGVldEl0ZW1zLmxlbmd0aCA9PT0gMCkgeyBjb25zb2xlLmVycm9yKCdhY3Rpb24tc2hlZXTkuK3oh7PlsJHljIXlkKsx6aG5JykgfVxuICAgICAgICB0aGlzLnRpdGxlID0gdHlwZW9mIGNmZy50aXRsZSAhPT0gJ3VuZGVmaW5lZCcgPyBjZmcudGl0bGUgOiBudWxsXG4gICAgICAgIHRoaXMuYWN0aW9uU2hlZXRJdGVtcyA9IGFjdGlvblNoZWV0SXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGl0ZW0gPSB7IGNvbnRlbnQ6IGl0ZW0gfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25TaGVldEhpZGRlbiA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFjdGlvblNoZWV0SGlkZGVuID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFjdGlvblNoZWV0SGlkZGVuID0gIXRoaXMuYWN0aW9uU2hlZXRIaWRkZW5cbiAgICAgIH0sXG4gICAgICBsaXN0ZW5lckFjdGlvblNoZWV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uU2hlZXRIaWRkZW4gPSB0cnVlXG4gICAgICB9LFxuICAgICAgbGlzdGVuZXJJdGVtQ2xpY2s6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLmFjdGlvblNoZWV0SGlkZGVuID0gdHJ1ZVxuICAgICAgICB0aGlzLiRlbWl0KCdvbkl0ZW1DbGlja0xpc3RlbmVyJywgdGhpcy5hY3Rpb25TaGVldEl0ZW1zW2luZGV4XSwgaW5kZXgpXG4gICAgICB9XG4gICAgfTtcbiAgfVxuIl19