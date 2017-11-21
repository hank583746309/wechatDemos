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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcC5qcyJdLCJuYW1lcyI6WyJ0b3AiLCJjb25maWciLCJjb21wb25lbnRzIiwidG9wYmFyIiwidG9iZW5vdGlmaWVkIiwidG9iZW1haW50YWluZWQiLCJkYXRhIiwiZnJhZ21lbnRzIiwibmFtZSIsImluaXQiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudCIsIm1ldGhvZHMiLCJiaW5kU3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsIiRicm9hZGNhc3QiLCJldmVudHMiLCJvblRhYkNoYW5nZSIsImluZGV4IiwiaXRlbSIsIiRpbnZva2UiLCJpdGVtcyIsImlkIiwidGl0bGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0E7SUFDcUJBLEc7Ozs7Ozs7Ozs7Ozs7O2dMQUNuQkMsTSxHQUFTLEUsUUFFVEMsVSxHQUFhO0FBQ1hDLDhCQURXO0FBRVhDLGtEQUZXO0FBR1hDO0FBSFcsSyxRQUtiQyxJLEdBQU87QUFDTEMsaUJBQVcsQ0FBQztBQUNWQyxjQUFNLGNBREk7QUFFVkMsY0FBTTtBQUZJLE9BQUQsRUFHUjtBQUNERCxjQUFNLGdCQURMO0FBRURDLGNBQU07QUFGTCxPQUhRLENBRE47QUFRTEMscUJBQWUsS0FSVjtBQVNMQyxnQkFBVSxLQVRMO0FBVUxDLGdCQUFVLElBVkw7QUFXTEMsZ0JBQVUsR0FYTDtBQVlMQyxlQUFTLENBQUM7QUFaTCxLLFFBY1BDLE8sR0FBVTtBQUNSQyx3QkFBa0IsMEJBQVVDLENBQVYsRUFBYTtBQUM3QixZQUFJLEtBQUtILE9BQUwsS0FBaUJHLEVBQUVDLE1BQUYsQ0FBU0osT0FBOUIsRUFBdUM7QUFBRTtBQUFRO0FBQ2pELFlBQU1BLFVBQVUsS0FBS0EsT0FBTCxHQUFlRyxFQUFFQyxNQUFGLENBQVNKLE9BQXhDO0FBQ0EsYUFBS0ssVUFBTCxDQUFnQixhQUFoQixFQUErQkwsT0FBL0I7QUFDRDtBQUxPLEssUUFPVk0sTSxHQUFTO0FBQ1BDLG1CQUFhLHFCQUFVQyxLQUFWLEVBQWlCO0FBQzVCLFlBQUlDLE9BQU8sS0FBS2hCLFNBQUwsQ0FBZWUsS0FBZixDQUFYO0FBQ0EsWUFBSSxDQUFDQyxLQUFLZCxJQUFWLEVBQWdCO0FBQ2QsZUFBS2UsT0FBTCxDQUFhRCxLQUFLZixJQUFsQixFQUF3QixNQUF4QjtBQUNBLGVBQUtELFNBQUwsQ0FBZWUsS0FBZixFQUFzQixNQUF0QixJQUFnQyxJQUFoQztBQUNEO0FBQ0QsWUFBSSxLQUFLUixPQUFMLEtBQWlCLENBQUMsQ0FBdEIsRUFBeUI7QUFDdkIsZUFBS1UsT0FBTCxDQUFhLEtBQUtqQixTQUFMLENBQWUsS0FBS08sT0FBcEIsRUFBNkJOLElBQTFDLEVBQWdELE1BQWhEO0FBQ0Q7QUFDRCxhQUFLTSxPQUFMLEdBQWVRLEtBQWY7QUFDQSxhQUFLRSxPQUFMLENBQWFELEtBQUtmLElBQWxCLEVBQXdCLE1BQXhCO0FBQ0Q7QUFaTSxLOzs7Ozs2QkFjQTtBQUNQLFdBQUtnQixPQUFMLENBQWEsUUFBYixFQUF1QixRQUF2QixFQUFpQztBQUMvQkMsZUFBTyxDQUNMLEVBQUNDLElBQUksY0FBTCxFQUFxQkMsT0FBTyxLQUE1QixFQURLLEVBRUwsRUFBQ0QsSUFBSSxnQkFBTCxFQUF1QkMsT0FBTyxLQUE5QixFQUZLO0FBRHdCLE9BQWpDO0FBTUQ7Ozs7RUFsRDhCLGVBQUtDLEk7O2tCQUFqQjVCLEciLCJmaWxlIjoidG9wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBUb3BiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy90b3BiYXInXG4gIGltcG9ydCBUb0JlTm90aWZpZWRGcmFnbWVudCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RvcF9mcmFnbWVudHMvVG9CZU5vdGlmaWVkRnJhZ21lbnQnXG4gIGltcG9ydCBUb0JlTWFpbnRhaW5lZEZyYWdtZW50IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdG9wX2ZyYWdtZW50cy9Ub0JlTWFpbnRhaW5lZEZyYWdtZW50J1xuICAvLyBUT0RPIOWGjeiAg+iZkeaYr+WQpuWwhuaVsOaNruaOp+WItueLrOeri+aKveemuyDkv53nlZnln7rmnKznmoTop4blm77lkoznu4Tku7blvJXlhaVcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgdG9wIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgdG9wYmFyOiBUb3BiYXIsXG4gICAgICB0b2Jlbm90aWZpZWQ6IFRvQmVOb3RpZmllZEZyYWdtZW50LFxuICAgICAgdG9iZW1haW50YWluZWQ6IFRvQmVNYWludGFpbmVkRnJhZ21lbnRcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGZyYWdtZW50czogW3tcbiAgICAgICAgbmFtZTogJ3RvYmVub3RpZmllZCcsXG4gICAgICAgIGluaXQ6IGZhbHNlXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6ICd0b2JlbWFpbnRhaW5lZCcsXG4gICAgICAgIGluaXQ6IGZhbHNlXG4gICAgICB9XSxcbiAgICAgIGluZGljYXRvckRvdHM6IGZhbHNlLFxuICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgaW50ZXJ2YWw6IDgwMDAsXG4gICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgY3VycmVudDogLTFcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBiaW5kU3dpcGVyQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50ID09PSBlLmRldGFpbC5jdXJyZW50KSB7IHJldHVybiB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICAgIHRoaXMuJGJyb2FkY2FzdCgnb25UYWJDaGFuZ2UnLCBjdXJyZW50KVxuICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgICAgb25UYWJDaGFuZ2U6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZnJhZ21lbnRzW2luZGV4XVxuICAgICAgICBpZiAoIWl0ZW0uaW5pdCkge1xuICAgICAgICAgIHRoaXMuJGludm9rZShpdGVtLm5hbWUsICdpbml0JylcbiAgICAgICAgICB0aGlzLmZyYWdtZW50c1tpbmRleF1bJ2luaXQnXSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdXJyZW50ICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMuJGludm9rZSh0aGlzLmZyYWdtZW50c1t0aGlzLmN1cnJlbnRdLm5hbWUsICdoaWRlJylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgICB0aGlzLiRpbnZva2UoaXRlbS5uYW1lLCAnc2hvdycpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgIHRoaXMuJGludm9rZSgndG9wYmFyJywgJ2NvbmZpZycsIHtcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7aWQ6ICd0b2Jlbm90aWZpZWQnLCB0aXRsZTogJ+W+hemAmuefpSd9LFxuICAgICAgICAgIHtpZDogJ3RvYmVtYWludGFpbmVkJywgdGl0bGU6ICflvoXkv53lhbsnfVxuICAgICAgICBdXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19