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
        items: [{ id: 'tobenotified', title: '待通知' }, { id: 'tobemaintained', title: '待保养', badgeCount: 2 }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcC5qcyJdLCJuYW1lcyI6WyJ0b3AiLCJjb25maWciLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJjb21wb25lbnRzIiwidG9wYmFyIiwidG9iZW5vdGlmaWVkIiwidG9iZW1haW50YWluZWQiLCJkYXRhIiwiZnJhZ21lbnRzIiwibmFtZSIsImluaXQiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudCIsIm1ldGhvZHMiLCJiaW5kU3dpcGVyQ2hhbmdlIiwiZSIsImRldGFpbCIsIiRicm9hZGNhc3QiLCJldmVudHMiLCJvblRhYkNoYW5nZSIsImluZGV4IiwiaXRlbSIsIiRpbnZva2UiLCJpdGVtcyIsImlkIiwidGl0bGUiLCJiYWRnZUNvdW50IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOztJQUVxQkEsRzs7Ozs7Ozs7Ozs7Ozs7Z0xBQ25CQyxNLEdBQVM7QUFDUEMsNkJBQXVCO0FBRGhCLEssUUFHVEMsVSxHQUFhO0FBQ1hDLDhCQURXO0FBRVhDLGtEQUZXO0FBR1hDO0FBSFcsSyxRQUtiQyxJLEdBQU87QUFDTEMsaUJBQVcsQ0FBQztBQUNWQyxjQUFNLGNBREk7QUFFVkMsY0FBTTtBQUZJLE9BQUQsRUFHUjtBQUNERCxjQUFNLGdCQURMO0FBRURDLGNBQU07QUFGTCxPQUhRLENBRE47QUFRTEMscUJBQWUsS0FSVjtBQVNMQyxnQkFBVSxLQVRMO0FBVUxDLGdCQUFVLElBVkw7QUFXTEMsZ0JBQVUsR0FYTDtBQVlMQyxlQUFTLENBQUM7QUFaTCxLLFFBY1BDLE8sR0FBVTtBQUNSQyx3QkFBa0IsMEJBQVVDLENBQVYsRUFBYTtBQUM3QixZQUFJLEtBQUtILE9BQUwsS0FBaUJHLEVBQUVDLE1BQUYsQ0FBU0osT0FBOUIsRUFBdUM7QUFBRTtBQUFRO0FBQ2pELFlBQU1BLFVBQVUsS0FBS0EsT0FBTCxHQUFlRyxFQUFFQyxNQUFGLENBQVNKLE9BQXhDO0FBQ0EsYUFBS0ssVUFBTCxDQUFnQixhQUFoQixFQUErQkwsT0FBL0I7QUFDRDtBQUxPLEssUUFPVk0sTSxHQUFTO0FBQ1BDLG1CQUFhLHFCQUFVQyxLQUFWLEVBQWlCO0FBQzVCLFlBQUlDLE9BQU8sS0FBS2hCLFNBQUwsQ0FBZWUsS0FBZixDQUFYO0FBQ0EsWUFBSSxDQUFDQyxLQUFLZCxJQUFWLEVBQWdCO0FBQ2QsZUFBS2UsT0FBTCxDQUFhRCxLQUFLZixJQUFsQixFQUF3QixNQUF4QjtBQUNBLGVBQUtELFNBQUwsQ0FBZWUsS0FBZixFQUFzQixNQUF0QixJQUFnQyxJQUFoQztBQUNEO0FBQ0QsWUFBSSxLQUFLUixPQUFMLEtBQWlCLENBQUMsQ0FBdEIsRUFBeUI7QUFDdkIsZUFBS1UsT0FBTCxDQUFhLEtBQUtqQixTQUFMLENBQWUsS0FBS08sT0FBcEIsRUFBNkJOLElBQTFDLEVBQWdELE1BQWhEO0FBQ0Q7QUFDRCxhQUFLTSxPQUFMLEdBQWVRLEtBQWY7QUFDQSxhQUFLRSxPQUFMLENBQWFELEtBQUtmLElBQWxCLEVBQXdCLE1BQXhCO0FBQ0Q7QUFaTSxLOzs7Ozs2QkFjQTtBQUNQLFdBQUtnQixPQUFMLENBQWEsUUFBYixFQUF1QixRQUF2QixFQUFpQztBQUMvQkMsZUFBTyxDQUNMLEVBQUNDLElBQUksY0FBTCxFQUFxQkMsT0FBTyxLQUE1QixFQURLLEVBRUwsRUFBQ0QsSUFBSSxnQkFBTCxFQUF1QkMsT0FBTyxLQUE5QixFQUFxQ0MsWUFBWSxDQUFqRCxFQUZLO0FBRHdCLE9BQWpDO0FBTUQ7Ozt3Q0FDbUI7QUFDbEIsV0FBS0osT0FBTCxDQUFhLEtBQUtqQixTQUFMLENBQWUsS0FBS08sT0FBcEIsRUFBNkJOLElBQTFDLEVBQWdELGlCQUFoRDtBQUNEOzs7O0VBdEQ4QixlQUFLcUIsSTs7a0JBQWpCOUIsRyIsImZpbGUiOiJ0b3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFRvcGJhciBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RvcGJhcidcbiAgaW1wb3J0IFRvQmVOb3RpZmllZEZyYWdtZW50IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdG9wX2ZyYWdtZW50cy9Ub0JlTm90aWZpZWRGcmFnbWVudCdcbiAgaW1wb3J0IFRvQmVNYWludGFpbmVkRnJhZ21lbnQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy90b3BfZnJhZ21lbnRzL1RvQmVNYWludGFpbmVkRnJhZ21lbnQnXG5cbiAgLy8gVE9ETyDlho3ogIPomZHmmK/lkKblsIbmlbDmja7mjqfliLbni6znq4vmir3nprsg5L+d55WZ5Z+65pys55qE6KeG5Zu+5ZKM57uE5Lu25byV5YWlXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgdG9wIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICB0b3BiYXI6IFRvcGJhcixcbiAgICAgIHRvYmVub3RpZmllZDogVG9CZU5vdGlmaWVkRnJhZ21lbnQsXG4gICAgICB0b2JlbWFpbnRhaW5lZDogVG9CZU1haW50YWluZWRGcmFnbWVudFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZnJhZ21lbnRzOiBbe1xuICAgICAgICBuYW1lOiAndG9iZW5vdGlmaWVkJyxcbiAgICAgICAgaW5pdDogZmFsc2VcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ3RvYmVtYWludGFpbmVkJyxcbiAgICAgICAgaW5pdDogZmFsc2VcbiAgICAgIH1dLFxuICAgICAgaW5kaWNhdG9yRG90czogZmFsc2UsXG4gICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICBpbnRlcnZhbDogODAwMCxcbiAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICBjdXJyZW50OiAtMVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGJpbmRTd2lwZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnQgPT09IGUuZGV0YWlsLmN1cnJlbnQpIHsgcmV0dXJuIH1cbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuY3VycmVudCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgICAgdGhpcy4kYnJvYWRjYXN0KCdvblRhYkNoYW5nZScsIGN1cnJlbnQpXG4gICAgICB9XG4gICAgfTtcbiAgICBldmVudHMgPSB7XG4gICAgICBvblRhYkNoYW5nZTogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5mcmFnbWVudHNbaW5kZXhdXG4gICAgICAgIGlmICghaXRlbS5pbml0KSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKGl0ZW0ubmFtZSwgJ2luaXQnKVxuICAgICAgICAgIHRoaXMuZnJhZ21lbnRzW2luZGV4XVsnaW5pdCddID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnQgIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKHRoaXMuZnJhZ21lbnRzW3RoaXMuY3VycmVudF0ubmFtZSwgJ2hpZGUnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIHRoaXMuJGludm9rZShpdGVtLm5hbWUsICdzaG93JylcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkKCkge1xuICAgICAgdGhpcy4kaW52b2tlKCd0b3BiYXInLCAnY29uZmlnJywge1xuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtpZDogJ3RvYmVub3RpZmllZCcsIHRpdGxlOiAn5b6F6YCa55+lJ30sXG4gICAgICAgICAge2lkOiAndG9iZW1haW50YWluZWQnLCB0aXRsZTogJ+W+heS/neWFuycsIGJhZGdlQ291bnQ6IDIgfVxuICAgICAgICBdXG4gICAgICB9KVxuICAgIH1cbiAgICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICAgIHRoaXMuJGludm9rZSh0aGlzLmZyYWdtZW50c1t0aGlzLmN1cnJlbnRdLm5hbWUsICdwdWxsRG93blJlZnJlc2gnKVxuICAgIH1cbiAgfVxuIl19