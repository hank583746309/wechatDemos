'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hoo = require('./../../libs/Hoo.all.js');

var bottom = function (_wepy$page) {
  _inherits(bottom, _wepy$page);

  function bottom() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, bottom);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = bottom.__proto__ || Object.getPrototypeOf(bottom)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      // navigationBarTitleText: '微信'
    }, _this.data = {
      items: [{ name: 'wechat', value: '微信', checked: 'true' }, { name: 'contacts', value: '通讯录' }, { name: 'discover', value: '发现' }, { name: 'user', value: '我' }],
      imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511005838502&di=4a7e9d0b0d794dfc8015b8ea278a905e&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F19%2F67%2F48%2F58PIC3258PICVg6_1024.jpg'],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      current: 0
    }, _this.methods = {
      selectChange: function selectChange(index) {
        this.data.items.map(function (row, i) {
          row.checked = i === index;
          if (i === index) {
            wx.setNavigationBarTitle({ title: row.value });
          }
        });
        this.current = index;
      },
      bindSwiperChange: function bindSwiperChange(e) {
        if (this.current === e.detail.current) {
          return;
        }
        var current = this.current = e.detail.current;
        this.methods.selectChange.call(this, current);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(bottom, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log(Hoo);
      this.methods.selectChange.call(this, 0);
    }
  }]);

  return bottom;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(bottom , 'pages/nav/bottom'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvdHRvbS5qcyJdLCJuYW1lcyI6WyJIb28iLCJyZXF1aXJlIiwiYm90dG9tIiwiY29uZmlnIiwiZGF0YSIsIml0ZW1zIiwibmFtZSIsInZhbHVlIiwiY2hlY2tlZCIsImltZ1VybHMiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiY3VycmVudCIsIm1ldGhvZHMiLCJzZWxlY3RDaGFuZ2UiLCJpbmRleCIsIm1hcCIsInJvdyIsImkiLCJ3eCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwiYmluZFN3aXBlckNoYW5nZSIsImUiLCJkZXRhaWwiLCJjYWxsIiwiY29uc29sZSIsImxvZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxNQUFNQyxRQUFRLHVCQUFSLENBQVY7O0lBRXFCQyxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLE0sR0FBUztBQUNQO0FBRE8sSyxRQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxDQUNMLEVBQUNDLE1BQU0sUUFBUCxFQUFpQkMsT0FBTyxJQUF4QixFQUE4QkMsU0FBUyxNQUF2QyxFQURLLEVBRUwsRUFBQ0YsTUFBTSxVQUFQLEVBQW1CQyxPQUFPLEtBQTFCLEVBRkssRUFHTCxFQUFDRCxNQUFNLFVBQVAsRUFBbUJDLE9BQU8sSUFBMUIsRUFISyxFQUlMLEVBQUNELE1BQU0sTUFBUCxFQUFlQyxPQUFPLEdBQXRCLEVBSkssQ0FERjtBQU9MRSxlQUFTLENBQ1Asc0VBRE8sRUFFUCxzRUFGTyxFQUdQLHNFQUhPLEVBSVAsc05BSk8sQ0FQSjtBQWFMQyxxQkFBZSxLQWJWO0FBY0xDLGdCQUFVLEtBZEw7QUFlTEMsZ0JBQVUsSUFmTDtBQWdCTEMsZ0JBQVUsSUFoQkw7QUFpQkxDLGVBQVM7QUFqQkosSyxRQW1CUEMsTyxHQUFVO0FBQ1JDLG9CQUFjLHNCQUFVQyxLQUFWLEVBQWlCO0FBQzdCLGFBQUtiLElBQUwsQ0FBVUMsS0FBVixDQUFnQmEsR0FBaEIsQ0FBb0IsVUFBQ0MsR0FBRCxFQUFNQyxDQUFOLEVBQVk7QUFDOUJELGNBQUlYLE9BQUosR0FBY1ksTUFBTUgsS0FBcEI7QUFDQSxjQUFJRyxNQUFNSCxLQUFWLEVBQWlCO0FBQUVJLGVBQUdDLHFCQUFILENBQXlCLEVBQUVDLE9BQU9KLElBQUlaLEtBQWIsRUFBekI7QUFBZ0Q7QUFDcEUsU0FIRDtBQUlBLGFBQUtPLE9BQUwsR0FBZUcsS0FBZjtBQUNELE9BUE87QUFRUk8sd0JBQWtCLDBCQUFVQyxDQUFWLEVBQWE7QUFDN0IsWUFBSSxLQUFLWCxPQUFMLEtBQWlCVyxFQUFFQyxNQUFGLENBQVNaLE9BQTlCLEVBQXVDO0FBQUU7QUFBUTtBQUNqRCxZQUFNQSxVQUFVLEtBQUtBLE9BQUwsR0FBZVcsRUFBRUMsTUFBRixDQUFTWixPQUF4QztBQUNBLGFBQUtDLE9BQUwsQ0FBYUMsWUFBYixDQUEwQlcsSUFBMUIsQ0FBK0IsSUFBL0IsRUFBcUNiLE9BQXJDO0FBQ0Q7QUFaTyxLOzs7Ozs2QkFjRDtBQUNQYyxjQUFRQyxHQUFSLENBQVk3QixHQUFaO0FBQ0EsV0FBS2UsT0FBTCxDQUFhQyxZQUFiLENBQTBCVyxJQUExQixDQUErQixJQUEvQixFQUFxQyxDQUFyQztBQUNEOzs7O0VBeENpQyxlQUFLRyxJOztrQkFBcEI1QixNIiwiZmlsZSI6ImJvdHRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICB2YXIgSG9vID0gcmVxdWlyZSgnLi4vLi4vbGlicy9Ib28uYWxsLmpzJylcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBib3R0b20gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIC8vIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflvq7kv6EnXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgaXRlbXM6IFtcbiAgICAgICAge25hbWU6ICd3ZWNoYXQnLCB2YWx1ZTogJ+W+ruS/oScsIGNoZWNrZWQ6ICd0cnVlJ30sXG4gICAgICAgIHtuYW1lOiAnY29udGFjdHMnLCB2YWx1ZTogJ+mAmuiur+W9lSd9LFxuICAgICAgICB7bmFtZTogJ2Rpc2NvdmVyJywgdmFsdWU6ICflj5HnjrAnfSxcbiAgICAgICAge25hbWU6ICd1c2VyJywgdmFsdWU6ICfmiJEnfVxuICAgICAgXSxcbiAgICAgIGltZ1VybHM6IFtcbiAgICAgICAgJ2h0dHA6Ly9pbWcwMi50b29vcGVuLmNvbS9pbWFnZXMvMjAxNTA5MjgvdG9vb3Blbl9zeV8xNDM5MTI3NTU3MjYuanBnJyxcbiAgICAgICAgJ2h0dHA6Ly9pbWcwNi50b29vcGVuLmNvbS9pbWFnZXMvMjAxNjA4MTgvdG9vb3Blbl9zeV8xNzU4NjY0MzQyOTYuanBnJyxcbiAgICAgICAgJ2h0dHA6Ly9pbWcwNi50b29vcGVuLmNvbS9pbWFnZXMvMjAxNjA4MTgvdG9vb3Blbl9zeV8xNzU4MzMwNDc3MTUuanBnJyxcbiAgICAgICAgJ2h0dHBzOi8vdGltZ3NhLmJhaWR1LmNvbS90aW1nP2ltYWdlJnF1YWxpdHk9ODAmc2l6ZT1iOTk5OV8xMDAwMCZzZWM9MTUxMTAwNTgzODUwMiZkaT00YTdlOWQwYjBkNzk0ZGZjODAxNWI4ZWEyNzhhOTA1ZSZpbWd0eXBlPTAmc3JjPWh0dHAlM0ElMkYlMkZwaWMucWlhbnR1Y2RuLmNvbSUyRjU4cGljJTJGMTklMkY2NyUyRjQ4JTJGNThQSUMzMjU4UElDVmc2XzEwMjQuanBnJ1xuICAgICAgXSxcbiAgICAgIGluZGljYXRvckRvdHM6IGZhbHNlLFxuICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgaW50ZXJ2YWw6IDUwMDAsXG4gICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgIGN1cnJlbnQ6IDBcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBzZWxlY3RDaGFuZ2U6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLmRhdGEuaXRlbXMubWFwKChyb3csIGkpID0+IHtcbiAgICAgICAgICByb3cuY2hlY2tlZCA9IGkgPT09IGluZGV4XG4gICAgICAgICAgaWYgKGkgPT09IGluZGV4KSB7IHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiByb3cudmFsdWUgfSkgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgfSxcbiAgICAgIGJpbmRTd2lwZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnQgPT09IGUuZGV0YWlsLmN1cnJlbnQpIHsgcmV0dXJuIH1cbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuY3VycmVudCA9IGUuZGV0YWlsLmN1cnJlbnRcbiAgICAgICAgdGhpcy5tZXRob2RzLnNlbGVjdENoYW5nZS5jYWxsKHRoaXMsIGN1cnJlbnQpXG4gICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICBjb25zb2xlLmxvZyhIb28pXG4gICAgICB0aGlzLm1ldGhvZHMuc2VsZWN0Q2hhbmdlLmNhbGwodGhpcywgMClcbiAgICB9XG4gIH1cbiJdfQ==