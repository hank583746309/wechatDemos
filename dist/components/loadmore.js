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

var Loadmore = function (_wepy$page) {
  _inherits(Loadmore, _wepy$page);

  function Loadmore() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Loadmore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Loadmore.__proto__ || Object.getPrototypeOf(Loadmore)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      noMoreText: '—— 别拉了,我是有底线的 ——',
      loadingText: '加载更多',
      loading: false,
      hasMore: true,
      hidden: true
    }, _this.methods = {
      show: function show() {
        this.hidden = false;
      },
      config: function config(cfg) {
        if (typeof cfg === 'undefined') {
          cfg = {};
        }
        console.log(cfg);
      },
      hasMore: function hasMore() {
        return this.hasMore;
      },
      /**
       * 设置没有更多数据
       */
      setNoMore: function setNoMore() {
        this.hasMore = false;
      },
      /**
       * 执行加载更多视图
       */
      loadMore: function loadMore() {
        if (!this.hasMore) {
          return;
        }
        this.loading = true;
        this.hidden = false;
        this.loadingText = '加载中,请稍后...';
      },
      finish: function finish() {
        this.loading = false;
        this.loadingText = '加载更多';
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Loadmore;
}(_wepy2.default.page);

exports.default = Loadmore;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRtb3JlLmpzIl0sIm5hbWVzIjpbIkxvYWRtb3JlIiwiY29uZmlnIiwiZGF0YSIsIm5vTW9yZVRleHQiLCJsb2FkaW5nVGV4dCIsImxvYWRpbmciLCJoYXNNb3JlIiwiaGlkZGVuIiwibWV0aG9kcyIsInNob3ciLCJjZmciLCJjb25zb2xlIiwibG9nIiwic2V0Tm9Nb3JlIiwibG9hZE1vcmUiLCJmaW5pc2giLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsa0JBQVksa0JBRFA7QUFFTEMsbUJBQWEsTUFGUjtBQUdMQyxlQUFTLEtBSEo7QUFJTEMsZUFBUyxJQUpKO0FBS0xDLGNBQVE7QUFMSCxLLFFBT1BDLE8sR0FBVTtBQUNSQyxZQUFNLGdCQUFZO0FBQ2hCLGFBQUtGLE1BQUwsR0FBYyxLQUFkO0FBQ0QsT0FITztBQUlSTixjQUFRLGdCQUFVUyxHQUFWLEVBQWU7QUFDckIsWUFBSSxPQUFPQSxHQUFQLEtBQWUsV0FBbkIsRUFBZ0M7QUFDOUJBLGdCQUFNLEVBQU47QUFDRDtBQUNEQyxnQkFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0QsT0FUTztBQVVSSixlQUFTLG1CQUFZO0FBQ25CLGVBQU8sS0FBS0EsT0FBWjtBQUNELE9BWk87QUFhUjs7O0FBR0FPLGlCQUFXLHFCQUFZO0FBQ3JCLGFBQUtQLE9BQUwsR0FBZSxLQUFmO0FBQ0QsT0FsQk87QUFtQlI7OztBQUdBUSxnQkFBVSxvQkFBWTtBQUNwQixZQUFJLENBQUMsS0FBS1IsT0FBVixFQUFtQjtBQUFFO0FBQVE7QUFDN0IsYUFBS0QsT0FBTCxHQUFlLElBQWY7QUFDQSxhQUFLRSxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUtILFdBQUwsR0FBbUIsWUFBbkI7QUFDRCxPQTNCTztBQTRCUlcsY0FBUSxrQkFBWTtBQUNsQixhQUFLVixPQUFMLEdBQWUsS0FBZjtBQUNBLGFBQUtELFdBQUwsR0FBbUIsTUFBbkI7QUFDRDtBQS9CTyxLOzs7O0VBVjBCLGVBQUtZLEk7O2tCQUF0QmhCLFEiLCJmaWxlIjoibG9hZG1vcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkbW9yZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIG5vTW9yZVRleHQ6ICfigJTigJQg5Yir5ouJ5LqGLOaIkeaYr+acieW6lee6v+eahCDigJTigJQnLFxuICAgICAgbG9hZGluZ1RleHQ6ICfliqDovb3mm7TlpJonLFxuICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICBoYXNNb3JlOiB0cnVlLFxuICAgICAgaGlkZGVuOiB0cnVlXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgY29uZmlnOiBmdW5jdGlvbiAoY2ZnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2ZnID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNmZyA9IHt9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coY2ZnKVxuICAgICAgfSxcbiAgICAgIGhhc01vcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzTW9yZVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6K6+572u5rKh5pyJ5pu05aSa5pWw5o2uXG4gICAgICAgKi9cbiAgICAgIHNldE5vTW9yZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhhc01vcmUgPSBmYWxzZVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog5omn6KGM5Yqg6L295pu05aSa6KeG5Zu+XG4gICAgICAgKi9cbiAgICAgIGxvYWRNb3JlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNNb3JlKSB7IHJldHVybiB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWVcbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZVxuICAgICAgICB0aGlzLmxvYWRpbmdUZXh0ID0gJ+WKoOi9veS4rSzor7fnqI3lkI4uLi4nXG4gICAgICB9LFxuICAgICAgZmluaXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgIHRoaXMubG9hZGluZ1RleHQgPSAn5Yqg6L295pu05aSaJ1xuICAgICAgfVxuICAgIH07XG4gIH1cbiJdfQ==