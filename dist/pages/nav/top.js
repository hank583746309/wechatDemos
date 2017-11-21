'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _topbar = require('./../../components/topbar.js');

var _topbar2 = _interopRequireDefault(_topbar);

var _ToBeNotifiedFragment = require('./../../components/top_fragments/ToBeNotifiedFragment.js');

var _ToBeNotifiedFragment2 = _interopRequireDefault(_ToBeNotifiedFragment);

var _ToBeMaintainedFragment = require('./../../components/top_fragments/ToBeMaintainedFragment.js');

var _ToBeMaintainedFragment2 = _interopRequireDefault(_ToBeMaintainedFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO 再考虑是否将数据控制独立抽离 保留基本的视图和组件引入

var top = function (_wepy$page) {
  _inherits(top, _wepy$page);

  function top() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, top);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = top.__proto__ || Object.getPrototypeOf(top)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      enablePullDownRefresh: true
    }, _this.components = {
      topbar: _topbar2.default,
      tobenotified: _ToBeNotifiedFragment2.default,
      tobemaintained: _ToBeMaintainedFragment2.default
    }, _this.data = {
      fragments: [{
        name: 'tobenotified',
        init: false
      }, {
        name: 'tobemaintained',
        init: false
      }],
      indicatorDots: false,
      autoplay: false,
      interval: 8000,
      duration: 400,
      current: -1
    }, _this.methods = {
      bindSwiperChange: function bindSwiperChange(e) {
        if (this.current === e.detail.current) {
          return;
        }
        var current = this.current = e.detail.current;
        this.$broadcast('onTabChange', current);
      }
    }, _this.events = {
      onTabChange: function onTabChange(index) {
        var item = this.fragments[index];
        if (!item.init) {
          this.$invoke(item.name, 'init');
          this.fragments[index]['init'] = true;
        }
        if (this.current !== -1) {
          this.$invoke(this.fragments[this.current].name, 'hide');
        }
        this.current = index;
        this.$invoke(item.name, 'show');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(top, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$invoke('topbar', 'config', {
        items: [{ id: 'tobenotified', title: '待通知' }, { id: 'tobemaintained', title: '待保养' }]
      });
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.$invoke(this.fragments[this.current].name, 'pullDownRefresh');
    }
  }]);

  return top;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(top , 'pages/nav/top'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcC5qcyJdLCJuYW1lcyI6WyJ0b3AiLCJjb25maWciLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJjb21wb25lbnRzIiwidG9wYmFyIiwidG9iZW5vdGlmaWVkIiwidG9iZW1haW50YWluZWQiLCJkYXRhIiwiZnJhZ21lbnRzIiwibmFtZSIsImluaXQiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudCIsIm1ldGhvZHMiLCJiaW5kU3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsIiRicm9hZGNhc3QiLCJldmVudHMiLCJvblRhYkNoYW5nZSIsImluZGV4IiwiaXRlbSIsIiRpbnZva2UiLCJpdGVtcyIsImlkIiwidGl0bGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7O0lBRXFCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFDbkJDLE0sR0FBUztBQUNQQyw2QkFBdUI7QUFEaEIsSyxRQUdUQyxVLEdBQWE7QUFDWEMsOEJBRFc7QUFFWEMsa0RBRlc7QUFHWEM7QUFIVyxLLFFBS2JDLEksR0FBTztBQUNMQyxpQkFBVyxDQUFDO0FBQ1ZDLGNBQU0sY0FESTtBQUVWQyxjQUFNO0FBRkksT0FBRCxFQUdSO0FBQ0RELGNBQU0sZ0JBREw7QUFFREMsY0FBTTtBQUZMLE9BSFEsQ0FETjtBQVFMQyxxQkFBZSxLQVJWO0FBU0xDLGdCQUFVLEtBVEw7QUFVTEMsZ0JBQVUsSUFWTDtBQVdMQyxnQkFBVSxHQVhMO0FBWUxDLGVBQVMsQ0FBQztBQVpMLEssUUFjUEMsTyxHQUFVO0FBQ1JDLHdCQUFrQiwwQkFBVUMsQ0FBVixFQUFhO0FBQzdCLFlBQUksS0FBS0gsT0FBTCxLQUFpQkcsRUFBRUMsTUFBRixDQUFTSixPQUE5QixFQUF1QztBQUFFO0FBQVE7QUFDakQsWUFBTUEsVUFBVSxLQUFLQSxPQUFMLEdBQWVHLEVBQUVDLE1BQUYsQ0FBU0osT0FBeEM7QUFDQSxhQUFLSyxVQUFMLENBQWdCLGFBQWhCLEVBQStCTCxPQUEvQjtBQUNEO0FBTE8sSyxRQU9WTSxNLEdBQVM7QUFDUEMsbUJBQWEscUJBQVVDLEtBQVYsRUFBaUI7QUFDNUIsWUFBSUMsT0FBTyxLQUFLaEIsU0FBTCxDQUFlZSxLQUFmLENBQVg7QUFDQSxZQUFJLENBQUNDLEtBQUtkLElBQVYsRUFBZ0I7QUFDZCxlQUFLZSxPQUFMLENBQWFELEtBQUtmLElBQWxCLEVBQXdCLE1BQXhCO0FBQ0EsZUFBS0QsU0FBTCxDQUFlZSxLQUFmLEVBQXNCLE1BQXRCLElBQWdDLElBQWhDO0FBQ0Q7QUFDRCxZQUFJLEtBQUtSLE9BQUwsS0FBaUIsQ0FBQyxDQUF0QixFQUF5QjtBQUN2QixlQUFLVSxPQUFMLENBQWEsS0FBS2pCLFNBQUwsQ0FBZSxLQUFLTyxPQUFwQixFQUE2Qk4sSUFBMUMsRUFBZ0QsTUFBaEQ7QUFDRDtBQUNELGFBQUtNLE9BQUwsR0FBZVEsS0FBZjtBQUNBLGFBQUtFLE9BQUwsQ0FBYUQsS0FBS2YsSUFBbEIsRUFBd0IsTUFBeEI7QUFDRDtBQVpNLEs7Ozs7OzZCQWNBO0FBQ1AsV0FBS2dCLE9BQUwsQ0FBYSxRQUFiLEVBQXVCLFFBQXZCLEVBQWlDO0FBQy9CQyxlQUFPLENBQ0wsRUFBQ0MsSUFBSSxjQUFMLEVBQXFCQyxPQUFPLEtBQTVCLEVBREssRUFFTCxFQUFDRCxJQUFJLGdCQUFMLEVBQXVCQyxPQUFPLEtBQTlCLEVBRks7QUFEd0IsT0FBakM7QUFNRDs7O3dDQUNtQjtBQUNsQixXQUFLSCxPQUFMLENBQWEsS0FBS2pCLFNBQUwsQ0FBZSxLQUFLTyxPQUFwQixFQUE2Qk4sSUFBMUMsRUFBZ0QsaUJBQWhEO0FBQ0Q7Ozs7RUF0RDhCLGVBQUtvQixJOztrQkFBakI3QixHIiwiZmlsZSI6InRvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgVG9wYmFyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdG9wYmFyJ1xuICBpbXBvcnQgVG9CZU5vdGlmaWVkRnJhZ21lbnQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy90b3BfZnJhZ21lbnRzL1RvQmVOb3RpZmllZEZyYWdtZW50J1xuICBpbXBvcnQgVG9CZU1haW50YWluZWRGcmFnbWVudCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RvcF9mcmFnbWVudHMvVG9CZU1haW50YWluZWRGcmFnbWVudCdcblxuICAvLyBUT0RPIOWGjeiAg+iZkeaYr+WQpuWwhuaVsOaNruaOp+WItueLrOeri+aKveemuyDkv53nlZnln7rmnKznmoTop4blm77lkoznu4Tku7blvJXlhaVcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyB0b3AgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHRvcGJhcjogVG9wYmFyLFxuICAgICAgdG9iZW5vdGlmaWVkOiBUb0JlTm90aWZpZWRGcmFnbWVudCxcbiAgICAgIHRvYmVtYWludGFpbmVkOiBUb0JlTWFpbnRhaW5lZEZyYWdtZW50XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBmcmFnbWVudHM6IFt7XG4gICAgICAgIG5hbWU6ICd0b2Jlbm90aWZpZWQnLFxuICAgICAgICBpbml0OiBmYWxzZVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiAndG9iZW1haW50YWluZWQnLFxuICAgICAgICBpbml0OiBmYWxzZVxuICAgICAgfV0sXG4gICAgICBpbmRpY2F0b3JEb3RzOiBmYWxzZSxcbiAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgIGludGVydmFsOiA4MDAwLFxuICAgICAgZHVyYXRpb246IDQwMCxcbiAgICAgIGN1cnJlbnQ6IC0xXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgYmluZFN3aXBlckNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudCA9PT0gZS5kZXRhaWwuY3VycmVudCkgeyByZXR1cm4gfVxuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5jdXJyZW50ID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgICB0aGlzLiRicm9hZGNhc3QoJ29uVGFiQ2hhbmdlJywgY3VycmVudClcbiAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHtcbiAgICAgIG9uVGFiQ2hhbmdlOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmZyYWdtZW50c1tpbmRleF1cbiAgICAgICAgaWYgKCFpdGVtLmluaXQpIHtcbiAgICAgICAgICB0aGlzLiRpbnZva2UoaXRlbS5uYW1lLCAnaW5pdCcpXG4gICAgICAgICAgdGhpcy5mcmFnbWVudHNbaW5kZXhdWydpbml0J10gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudCAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLiRpbnZva2UodGhpcy5mcmFnbWVudHNbdGhpcy5jdXJyZW50XS5uYW1lLCAnaGlkZScpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgICAgdGhpcy4kaW52b2tlKGl0ZW0ubmFtZSwgJ3Nob3cnKVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICB0aGlzLiRpbnZva2UoJ3RvcGJhcicsICdjb25maWcnLCB7XG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge2lkOiAndG9iZW5vdGlmaWVkJywgdGl0bGU6ICflvoXpgJrnn6UnfSxcbiAgICAgICAgICB7aWQ6ICd0b2JlbWFpbnRhaW5lZCcsIHRpdGxlOiAn5b6F5L+d5YW7J31cbiAgICAgICAgXVxuICAgICAgfSlcbiAgICB9XG4gICAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgICB0aGlzLiRpbnZva2UodGhpcy5mcmFnbWVudHNbdGhpcy5jdXJyZW50XS5uYW1lLCAncHVsbERvd25SZWZyZXNoJylcbiAgICB9XG4gIH1cbiJdfQ==