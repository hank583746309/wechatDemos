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
      id: '',
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
        this.id = typeof cfg.id !== 'undefined' ? cfg.id : null;
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
        this.$emit('onItemClickListener', this.actionSheetItems[index], index, this.id); // 加id标识为了兼顾 tabs 多页面时wepe事件传递机制
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Actionsheet;
}(_wepy2.default.page);

exports.default = Actionsheet;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnNoZWV0LmpzIl0sIm5hbWVzIjpbIkFjdGlvbnNoZWV0IiwiY29uZmlnIiwiZGF0YSIsImlkIiwidGl0bGUiLCJ0aXRsZUNscyIsImNvbnRlbnRDbHMiLCJkZXNjcmlwdGlvbkNscyIsImFjdGlvblNoZWV0SGlkZGVuIiwiYWN0aW9uU2hlZXRJdGVtcyIsIm1ldGhvZHMiLCJjZmciLCJpdGVtcyIsImxlbmd0aCIsImNvbnNvbGUiLCJlcnJvciIsIm1hcCIsIml0ZW0iLCJjb250ZW50Iiwic2hvdyIsImhpZGUiLCJ0b2dnbGUiLCJsaXN0ZW5lckFjdGlvblNoZWV0IiwibGlzdGVuZXJJdGVtQ2xpY2siLCJpbmRleCIsIiRlbWl0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTLEUsUUFHVEMsSSxHQUFPO0FBQ0xDLFVBQUksRUFEQztBQUVMQyxhQUFPLEVBRkY7QUFHTEMsZ0JBQVUsRUFITDtBQUlMQyxrQkFBWSxFQUpQO0FBS0xDLHNCQUFnQixFQUxYO0FBTUxDLHlCQUFtQixJQU5kO0FBT0xDLHdCQUFrQixFQVBiLENBT2dCO0FBUGhCLEssUUFTUEMsTyxHQUFVO0FBQ1JULGNBQVEsZ0JBQVVVLEdBQVYsRUFBZTtBQUNyQixZQUFJLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFuQixFQUE2QjtBQUMzQkEsZ0JBQU0sRUFBTjtBQUNEO0FBQ0QsWUFBSUYsbUJBQW1CRSxJQUFJQyxLQUFKLElBQWEsRUFBcEM7QUFDQSxZQUFJSCxpQkFBaUJJLE1BQWpCLEtBQTRCLENBQWhDLEVBQW1DO0FBQUVDLGtCQUFRQyxLQUFSLENBQWMscUJBQWQ7QUFBc0M7QUFDM0UsYUFBS1osRUFBTCxHQUFVLE9BQU9RLElBQUlSLEVBQVgsS0FBa0IsV0FBbEIsR0FBZ0NRLElBQUlSLEVBQXBDLEdBQXlDLElBQW5EO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLE9BQU9PLElBQUlQLEtBQVgsS0FBcUIsV0FBckIsR0FBbUNPLElBQUlQLEtBQXZDLEdBQStDLElBQTVEO0FBQ0EsYUFBS0ssZ0JBQUwsR0FBd0JBLGlCQUFpQk8sR0FBakIsQ0FBcUIsZ0JBQVE7QUFDbkQsY0FBSSxRQUFPQyxJQUFQLHlDQUFPQSxJQUFQLE9BQWdCLFFBQXBCLEVBQThCO0FBQzVCQSxtQkFBTyxFQUFFQyxTQUFTRCxJQUFYLEVBQVA7QUFDRDtBQUNELGlCQUFPQSxJQUFQO0FBQ0QsU0FMdUIsQ0FBeEI7QUFNRCxPQWZPO0FBZ0JSRSxZQUFNLGdCQUFZO0FBQ2hCLGFBQUtYLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0QsT0FsQk87QUFtQlJZLFlBQU0sZ0JBQVk7QUFDaEIsYUFBS1osaUJBQUwsR0FBeUIsSUFBekI7QUFDRCxPQXJCTztBQXNCUmEsY0FBUSxrQkFBWTtBQUNsQixhQUFLYixpQkFBTCxHQUF5QixDQUFDLEtBQUtBLGlCQUEvQjtBQUNELE9BeEJPO0FBeUJSYywyQkFBcUIsK0JBQVk7QUFDL0IsYUFBS2QsaUJBQUwsR0FBeUIsSUFBekI7QUFDRCxPQTNCTztBQTRCUmUseUJBQW1CLDJCQUFVQyxLQUFWLEVBQWlCO0FBQ2xDLGFBQUtoQixpQkFBTCxHQUF5QixJQUF6QjtBQUNBLGFBQUtpQixLQUFMLENBQVcscUJBQVgsRUFBa0MsS0FBS2hCLGdCQUFMLENBQXNCZSxLQUF0QixDQUFsQyxFQUFnRUEsS0FBaEUsRUFBdUUsS0FBS3JCLEVBQTVFLEVBRmtDLENBRThDO0FBQ2pGO0FBL0JPLEs7Ozs7RUFiNkIsZUFBS3VCLEk7O2tCQUF6QjFCLFciLCJmaWxlIjoiYWN0aW9uc2hlZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICAvKipcbiAgICog5qC55o2u5Y6f55SfYWN0aW9uLXNoZWV05pS56L+b5Li6aW9zIHVpXG4gICAqL1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rpb25zaGVldCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgaWQ6ICcnLFxuICAgICAgdGl0bGU6ICcnLFxuICAgICAgdGl0bGVDbHM6ICcnLFxuICAgICAgY29udGVudENsczogJycsXG4gICAgICBkZXNjcmlwdGlvbkNsczogJycsXG4gICAgICBhY3Rpb25TaGVldEhpZGRlbjogdHJ1ZSxcbiAgICAgIGFjdGlvblNoZWV0SXRlbXM6IFtdIC8vIHsgY29udGVudDogJycsIGRlc2NyaXB0aW9uOiAnJ31cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjb25maWc6IGZ1bmN0aW9uIChjZmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjZmcgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY2ZnID0ge31cbiAgICAgICAgfVxuICAgICAgICB2YXIgYWN0aW9uU2hlZXRJdGVtcyA9IGNmZy5pdGVtcyB8fCBbXVxuICAgICAgICBpZiAoYWN0aW9uU2hlZXRJdGVtcy5sZW5ndGggPT09IDApIHsgY29uc29sZS5lcnJvcignYWN0aW9uLXNoZWV05Lit6Iez5bCR5YyF5ZCrMemhuScpIH1cbiAgICAgICAgdGhpcy5pZCA9IHR5cGVvZiBjZmcuaWQgIT09ICd1bmRlZmluZWQnID8gY2ZnLmlkIDogbnVsbFxuICAgICAgICB0aGlzLnRpdGxlID0gdHlwZW9mIGNmZy50aXRsZSAhPT0gJ3VuZGVmaW5lZCcgPyBjZmcudGl0bGUgOiBudWxsXG4gICAgICAgIHRoaXMuYWN0aW9uU2hlZXRJdGVtcyA9IGFjdGlvblNoZWV0SXRlbXMubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGl0ZW0gPSB7IGNvbnRlbnQ6IGl0ZW0gfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hY3Rpb25TaGVldEhpZGRlbiA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFjdGlvblNoZWV0SGlkZGVuID0gdHJ1ZVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFjdGlvblNoZWV0SGlkZGVuID0gIXRoaXMuYWN0aW9uU2hlZXRIaWRkZW5cbiAgICAgIH0sXG4gICAgICBsaXN0ZW5lckFjdGlvblNoZWV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uU2hlZXRIaWRkZW4gPSB0cnVlXG4gICAgICB9LFxuICAgICAgbGlzdGVuZXJJdGVtQ2xpY2s6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLmFjdGlvblNoZWV0SGlkZGVuID0gdHJ1ZVxuICAgICAgICB0aGlzLiRlbWl0KCdvbkl0ZW1DbGlja0xpc3RlbmVyJywgdGhpcy5hY3Rpb25TaGVldEl0ZW1zW2luZGV4XSwgaW5kZXgsIHRoaXMuaWQpIC8vIOWKoGlk5qCH6K+G5Li65LqG5YW86aG+IHRhYnMg5aSa6aG16Z2i5pe2d2VwZeS6i+S7tuS8oOmAkuacuuWItlxuICAgICAgfVxuICAgIH07XG4gIH1cbiJdfQ==