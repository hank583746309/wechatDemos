'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _actionsheet = require('./../../components/actionsheet.js');

var _actionsheet2 = _interopRequireDefault(_actionsheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var actionsheet = function (_wepy$page) {
  _inherits(actionsheet, _wepy$page);

  function actionsheet() {
    var _ref;

    var _temp, _this, _ret;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, actionsheet);

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = actionsheet.__proto__ || Object.getPrototypeOf(actionsheet)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {}, _this.components = {
      actionsheet: _actionsheet2.default
    }, _this.methods = {
      showActionSheet: function showActionSheet() {
        this.$invoke('actionsheet', 'show');
      }
    }, _this.events = {
      onItemClickListener: function onItemClickListener() {
        console.log(arguments);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(actionsheet, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$invoke('actionsheet', 'config', {
        title: '我是标题部分',
        items: [{ content: '实例一', cls: 'red' }, { content: '实例一', cls: 'green' }, { content: '实例一', cls: 'orange' }, { content: '实例一', cls: 'yellow' }, { content: '实例一', cls: 'blue' }, { content: '实例一', cls: 'purple' }]
      });
    }
  }]);

  return actionsheet;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(actionsheet , 'pages/ui/actionsheet'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnNoZWV0LmpzIl0sIm5hbWVzIjpbImFjdGlvbnNoZWV0IiwiY29uZmlnIiwiZGF0YSIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwic2hvd0FjdGlvblNoZWV0IiwiJGludm9rZSIsImV2ZW50cyIsIm9uSXRlbUNsaWNrTGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiYXJndW1lbnRzIiwidGl0bGUiLCJpdGVtcyIsImNvbnRlbnQiLCJjbHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTLEUsUUFHVEMsSSxHQUFPLEUsUUFHUEMsVSxHQUFhO0FBQ1hIO0FBRFcsSyxRQUdiSSxPLEdBQVU7QUFDUkMsdUJBQWlCLDJCQUFZO0FBQzNCLGFBQUtDLE9BQUwsQ0FBYSxhQUFiLEVBQTRCLE1BQTVCO0FBQ0Q7QUFITyxLLFFBS1ZDLE0sR0FBUztBQUNQQywyQkFBcUIsK0JBQVk7QUFDL0JDLGdCQUFRQyxHQUFSLENBQVlDLFNBQVo7QUFDRDtBQUhNLEs7Ozs7OzZCQUtBO0FBQ1AsV0FBS0wsT0FBTCxDQUFhLGFBQWIsRUFBNEIsUUFBNUIsRUFBc0M7QUFDcENNLGVBQU8sUUFENkI7QUFFcENDLGVBQU8sQ0FBQyxFQUFDQyxTQUFTLEtBQVYsRUFBaUJDLEtBQUssS0FBdEIsRUFBRCxFQUErQixFQUFDRCxTQUFTLEtBQVYsRUFBaUJDLEtBQUssT0FBdEIsRUFBL0IsRUFBK0QsRUFBQ0QsU0FBUyxLQUFWLEVBQWlCQyxLQUFLLFFBQXRCLEVBQS9ELEVBQWdHLEVBQUNELFNBQVMsS0FBVixFQUFpQkMsS0FBSyxRQUF0QixFQUFoRyxFQUFpSSxFQUFDRCxTQUFTLEtBQVYsRUFBaUJDLEtBQUssTUFBdEIsRUFBakksRUFBZ0ssRUFBQ0QsU0FBUyxLQUFWLEVBQWlCQyxLQUFLLFFBQXRCLEVBQWhLO0FBRjZCLE9BQXRDO0FBSUQ7Ozs7RUF6QnNDLGVBQUtDLEk7O2tCQUF6QmhCLFciLCJmaWxlIjoiYWN0aW9uc2hlZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEFjdGlvblNoZWV0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYWN0aW9uc2hlZXQnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgYWN0aW9uc2hlZXQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcblxuICAgIH07XG4gICAgZGF0YSA9IHtcblxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGFjdGlvbnNoZWV0OiBBY3Rpb25TaGVldFxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHNob3dBY3Rpb25TaGVldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRpbnZva2UoJ2FjdGlvbnNoZWV0JywgJ3Nob3cnKVxuICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgb25JdGVtQ2xpY2tMaXN0ZW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmd1bWVudHMpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgIHRoaXMuJGludm9rZSgnYWN0aW9uc2hlZXQnLCAnY29uZmlnJywge1xuICAgICAgICB0aXRsZTogJ+aIkeaYr+agh+mimOmDqOWIhicsXG4gICAgICAgIGl0ZW1zOiBbe2NvbnRlbnQ6ICflrp7kvovkuIAnLCBjbHM6ICdyZWQnfSwge2NvbnRlbnQ6ICflrp7kvovkuIAnLCBjbHM6ICdncmVlbid9LCB7Y29udGVudDogJ+WunuS+i+S4gCcsIGNsczogJ29yYW5nZSd9LCB7Y29udGVudDogJ+WunuS+i+S4gCcsIGNsczogJ3llbGxvdyd9LCB7Y29udGVudDogJ+WunuS+i+S4gCcsIGNsczogJ2JsdWUnfSwge2NvbnRlbnQ6ICflrp7kvovkuIAnLCBjbHM6ICdwdXJwbGUnfV1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=