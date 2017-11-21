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

var top = function (_wepy$page) {
  _inherits(top, _wepy$page);

  function top() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, top);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = top.__proto__ || Object.getPrototypeOf(top)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {
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
  }]);

  return top;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(top , 'pages/nav/top'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcC5qcyJdLCJuYW1lcyI6WyJ0b3AiLCJjb25maWciLCJjb21wb25lbnRzIiwidG9wYmFyIiwidG9iZW5vdGlmaWVkIiwidG9iZW1haW50YWluZWQiLCJkYXRhIiwiZnJhZ21lbnRzIiwibmFtZSIsImluaXQiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudCIsIm1ldGhvZHMiLCJiaW5kU3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsIiRicm9hZGNhc3QiLCJldmVudHMiLCJvblRhYkNoYW5nZSIsImluZGV4IiwiaXRlbSIsIiRpbnZva2UiLCJpdGVtcyIsImlkIiwidGl0bGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFDbkJDLE0sR0FBUyxFLFFBRVRDLFUsR0FBYTtBQUNYQyw4QkFEVztBQUVYQyxrREFGVztBQUdYQztBQUhXLEssUUFLYkMsSSxHQUFPO0FBQ0xDLGlCQUFXLENBQUM7QUFDVkMsY0FBTSxjQURJO0FBRVZDLGNBQU07QUFGSSxPQUFELEVBR1I7QUFDREQsY0FBTSxnQkFETDtBQUVEQyxjQUFNO0FBRkwsT0FIUSxDQUROO0FBUUxDLHFCQUFlLEtBUlY7QUFTTEMsZ0JBQVUsS0FUTDtBQVVMQyxnQkFBVSxJQVZMO0FBV0xDLGdCQUFVLEdBWEw7QUFZTEMsZUFBUyxDQUFDO0FBWkwsSyxRQWNQQyxPLEdBQVU7QUFDUkMsd0JBQWtCLDBCQUFVQyxDQUFWLEVBQWE7QUFDN0IsWUFBSSxLQUFLSCxPQUFMLEtBQWlCRyxFQUFFQyxNQUFGLENBQVNKLE9BQTlCLEVBQXVDO0FBQUU7QUFBUTtBQUNqRCxZQUFNQSxVQUFVLEtBQUtBLE9BQUwsR0FBZUcsRUFBRUMsTUFBRixDQUFTSixPQUF4QztBQUNBLGFBQUtLLFVBQUwsQ0FBZ0IsYUFBaEIsRUFBK0JMLE9BQS9CO0FBQ0Q7QUFMTyxLLFFBT1ZNLE0sR0FBUztBQUNQQyxtQkFBYSxxQkFBVUMsS0FBVixFQUFpQjtBQUM1QixZQUFJQyxPQUFPLEtBQUtoQixTQUFMLENBQWVlLEtBQWYsQ0FBWDtBQUNBLFlBQUksQ0FBQ0MsS0FBS2QsSUFBVixFQUFnQjtBQUNkLGVBQUtlLE9BQUwsQ0FBYUQsS0FBS2YsSUFBbEIsRUFBd0IsTUFBeEI7QUFDQSxlQUFLRCxTQUFMLENBQWVlLEtBQWYsRUFBc0IsTUFBdEIsSUFBZ0MsSUFBaEM7QUFDRDtBQUNELFlBQUksS0FBS1IsT0FBTCxLQUFpQixDQUFDLENBQXRCLEVBQXlCO0FBQ3ZCLGVBQUtVLE9BQUwsQ0FBYSxLQUFLakIsU0FBTCxDQUFlLEtBQUtPLE9BQXBCLEVBQTZCTixJQUExQyxFQUFnRCxNQUFoRDtBQUNEO0FBQ0QsYUFBS00sT0FBTCxHQUFlUSxLQUFmO0FBQ0EsYUFBS0UsT0FBTCxDQUFhRCxLQUFLZixJQUFsQixFQUF3QixNQUF4QjtBQUNEO0FBWk0sSzs7Ozs7NkJBY0E7QUFDUCxXQUFLZ0IsT0FBTCxDQUFhLFFBQWIsRUFBdUIsUUFBdkIsRUFBaUM7QUFDL0JDLGVBQU8sQ0FDTCxFQUFDQyxJQUFJLGNBQUwsRUFBcUJDLE9BQU8sS0FBNUIsRUFESyxFQUVMLEVBQUNELElBQUksZ0JBQUwsRUFBdUJDLE9BQU8sS0FBOUIsRUFGSztBQUR3QixPQUFqQztBQU1EOzs7O0VBbEQ4QixlQUFLQyxJOztrQkFBakI1QixHIiwiZmlsZSI6InRvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgVG9wYmFyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdG9wYmFyJ1xuICBpbXBvcnQgVG9CZU5vdGlmaWVkRnJhZ21lbnQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy90b3BfZnJhZ21lbnRzL1RvQmVOb3RpZmllZEZyYWdtZW50J1xuICBpbXBvcnQgVG9CZU1haW50YWluZWRGcmFnbWVudCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RvcF9mcmFnbWVudHMvVG9CZU1haW50YWluZWRGcmFnbWVudCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyB0b3AgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICB0b3BiYXI6IFRvcGJhcixcbiAgICAgIHRvYmVub3RpZmllZDogVG9CZU5vdGlmaWVkRnJhZ21lbnQsXG4gICAgICB0b2JlbWFpbnRhaW5lZDogVG9CZU1haW50YWluZWRGcmFnbWVudFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZnJhZ21lbnRzOiBbe1xuICAgICAgICBuYW1lOiAndG9iZW5vdGlmaWVkJyxcbiAgICAgICAgaW5pdDogZmFsc2VcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ3RvYmVtYWludGFpbmVkJyxcbiAgICAgICAgaW5pdDogZmFsc2VcbiAgICAgIH1dLFxuICAgICAgaW5kaWNhdG9yRG90czogZmFsc2UsXG4gICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICBpbnRlcnZhbDogODAwMCxcbiAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICBjdXJyZW50OiAtMVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGJpbmRTd2lwZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnQgPT09IGUuZGV0YWlsLmN1cnJlbnQpIHsgcmV0dXJuIH1cbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuY3VycmVudCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgICAgdGhpcy4kYnJvYWRjYXN0KCdvblRhYkNoYW5nZScsIGN1cnJlbnQpXG4gICAgICB9XG4gICAgfTtcbiAgICBldmVudHMgPSB7XG4gICAgICBvblRhYkNoYW5nZTogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5mcmFnbWVudHNbaW5kZXhdXG4gICAgICAgIGlmICghaXRlbS5pbml0KSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKGl0ZW0ubmFtZSwgJ2luaXQnKVxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzW2luZGV4XVsnaW5pdCddID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnQgIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKHRoaXMuZnJhZ21lbnRzW3RoaXMuY3VycmVudF0ubmFtZSwgJ2hpZGUnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMuJGludm9rZShpdGVtLm5hbWUsICdzaG93JylcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkKCkge1xuICAgICAgdGhpcy4kaW52b2tlKCd0b3BiYXInLCAnY29uZmlnJywge1xuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtpZDogJ3RvYmVub3RpZmllZCcsIHRpdGxlOiAn5b6F6YCa55+lJ30sXG4gICAgICAgICAge2lkOiAndG9iZW1haW50YWluZWQnLCB0aXRsZTogJ+W+heS/neWFuyd9XG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=