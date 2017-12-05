'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _emptyview = require('./../../components/emptyview.js');

var _emptyview2 = _interopRequireDefault(_emptyview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var listempty = function (_wepy$page) {
  _inherits(listempty, _wepy$page);

  function listempty() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, listempty);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = listempty.__proto__ || Object.getPrototypeOf(listempty)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {
      emptyview: _emptyview2.default
    }, _this.data = {
      list: []
    }, _this.events = {
      onEmptyButtonClick: function onEmptyButtonClick(id) {
        this.list = [{}, {}];
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(listempty, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      this.$invoke('emptyview', 'config', {
        id: 'one',
        emptyText: '列表暂无数据'
      });
      setTimeout(function () {
        that.$invoke('emptyview', 'inited');
      }, 1000);
    }
  }]);

  return listempty;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(listempty , 'pages/ui/listempty'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3RlbXB0eS5qcyJdLCJuYW1lcyI6WyJsaXN0ZW1wdHkiLCJjb25maWciLCJjb21wb25lbnRzIiwiZW1wdHl2aWV3IiwiZGF0YSIsImxpc3QiLCJldmVudHMiLCJvbkVtcHR5QnV0dG9uQ2xpY2siLCJpZCIsInRoYXQiLCIkaW52b2tlIiwiZW1wdHlUZXh0Iiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVMsRSxRQUdUQyxVLEdBQWE7QUFDWEM7QUFEVyxLLFFBR2JDLEksR0FBTztBQUNMQyxZQUFNO0FBREQsSyxRQUdQQyxNLEdBQVM7QUFDUEMsMEJBQW9CLDRCQUFTQyxFQUFULEVBQWE7QUFDL0IsYUFBS0gsSUFBTCxHQUFZLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBWjtBQUNEO0FBSE0sSzs7Ozs7NkJBS0E7QUFDUCxVQUFJSSxPQUFPLElBQVg7QUFDQSxXQUFLQyxPQUFMLENBQWEsV0FBYixFQUEwQixRQUExQixFQUFvQztBQUNsQ0YsWUFBSSxLQUQ4QjtBQUVsQ0csbUJBQVc7QUFGdUIsT0FBcEM7QUFJQUMsaUJBQVcsWUFBWTtBQUNyQkgsYUFBS0MsT0FBTCxDQUFhLFdBQWIsRUFBMEIsUUFBMUI7QUFDRCxPQUZELEVBRUcsSUFGSDtBQUdEOzs7O0VBeEJvQyxlQUFLRyxJOztrQkFBdkJiLFMiLCJmaWxlIjoibGlzdGVtcHR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBFbXB0eVZpZXcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9lbXB0eXZpZXcnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgbGlzdGVtcHR5IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG5cbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBlbXB0eXZpZXc6IEVtcHR5Vmlld1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgbGlzdDogW11cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICAgIG9uRW1wdHlCdXR0b25DbGljazogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gW3t9LCB7fV1cbiAgICAgIH1cbiAgICB9O1xuICAgIG9uTG9hZCgpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgdGhpcy4kaW52b2tlKCdlbXB0eXZpZXcnLCAnY29uZmlnJywge1xuICAgICAgICBpZDogJ29uZScsXG4gICAgICAgIGVtcHR5VGV4dDogJ+WIl+ihqOaaguaXoOaVsOaNridcbiAgICAgIH0pXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhhdC4kaW52b2tlKCdlbXB0eXZpZXcnLCAnaW5pdGVkJylcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICB9XG4iXX0=