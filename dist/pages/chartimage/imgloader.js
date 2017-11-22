'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _ToBeMaintainedFragment = require('./../../components/top_fragments/ToBeMaintainedFragment.js');

var _ToBeMaintainedFragment2 = _interopRequireDefault(_ToBeMaintainedFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Imgloader = function (_wepy$page) {
  _inherits(Imgloader, _wepy$page);

  function Imgloader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Imgloader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Imgloader.__proto__ || Object.getPrototypeOf(Imgloader)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {
      tobemaintained: _ToBeMaintainedFragment2.default
    }, _this.data = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Imgloader, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$invoke('tobemaintained', 'init');
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.$invoke('tobemaintained', 'show');
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      this.$invoke('tobemaintained', 'hide');
    }
  }]);

  return Imgloader;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Imgloader , 'pages/chartimage/imgloader'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltZ2xvYWRlci5qcyJdLCJuYW1lcyI6WyJJbWdsb2FkZXIiLCJjb25maWciLCJjb21wb25lbnRzIiwidG9iZW1haW50YWluZWQiLCJkYXRhIiwibWV0aG9kcyIsIiRpbnZva2UiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTLEUsUUFHVEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUdiQyxJLEdBQU8sRSxRQUdQQyxPLEdBQVUsRTs7Ozs7NkJBR0Q7QUFDUCxXQUFLQyxPQUFMLENBQWEsZ0JBQWIsRUFBK0IsTUFBL0I7QUFDRDs7OzZCQUNRO0FBQ1AsV0FBS0EsT0FBTCxDQUFhLGdCQUFiLEVBQStCLE1BQS9CO0FBQ0Q7Ozs2QkFDUTtBQUNQLFdBQUtBLE9BQUwsQ0FBYSxnQkFBYixFQUErQixNQUEvQjtBQUNEOzs7O0VBckJvQyxlQUFLQyxJOztrQkFBdkJQLFMiLCJmaWxlIjoiaW1nbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBUb0JlTWFpbnRhaW5lZEZyYWdtZW50IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdG9wX2ZyYWdtZW50cy9Ub0JlTWFpbnRhaW5lZEZyYWdtZW50J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEltZ2xvYWRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgdG9iZW1haW50YWluZWQ6IFRvQmVNYWludGFpbmVkRnJhZ21lbnRcbiAgICB9XG4gICAgZGF0YSA9IHtcblxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcblxuICAgIH07XG4gICAgb25Mb2FkKCkge1xuICAgICAgdGhpcy4kaW52b2tlKCd0b2JlbWFpbnRhaW5lZCcsICdpbml0JylcbiAgICB9XG4gICAgb25TaG93KCkge1xuICAgICAgdGhpcy4kaW52b2tlKCd0b2JlbWFpbnRhaW5lZCcsICdzaG93JylcbiAgICB9XG4gICAgb25IaWRlKCkge1xuICAgICAgdGhpcy4kaW52b2tlKCd0b2JlbWFpbnRhaW5lZCcsICdoaWRlJylcbiAgICB9XG4gIH1cbiJdfQ==