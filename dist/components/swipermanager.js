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

var SwiperManager = function (_wepy$page) {
  _inherits(SwiperManager, _wepy$page);

  function SwiperManager() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SwiperManager);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SwiperManager.__proto__ || Object.getPrototypeOf(SwiperManager)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      imgUrls: ['http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 'http://oa5504rxk.bkt.clouddn.com/week23_wepy/9.png', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511005838502&di=4a7e9d0b0d794dfc8015b8ea278a905e&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F19%2F67%2F48%2F58PIC3258PICVg6_1024.jpg'],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 500,
      current: -1
    }, _this.methods = {
      bindSwiperChange: function bindSwiperChange(e) {
        console.log(e.detail.current);
        if (this.current === e.detail.current) {
          return;
        }
        var current = this.current = e.detail.current;
        this.$broadcast('onTabChange', current);
      },
      switchTo: function switchTo(index) {
        this.current = index;
        // 判断当前页面是否初始化,如果没有则执行初始化数据操作
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  } // TODO 考虑继承自 FragmentManager


  return SwiperManager;
}(_wepy2.default.page);

exports.default = SwiperManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlcm1hbmFnZXIuanMiXSwibmFtZXMiOlsiU3dpcGVyTWFuYWdlciIsImNvbmZpZyIsImRhdGEiLCJpbWdVcmxzIiwiaW5kaWNhdG9yRG90cyIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImN1cnJlbnQiLCJtZXRob2RzIiwiYmluZFN3aXBlckNoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiJGJyb2FkY2FzdCIsInN3aXRjaFRvIiwiaW5kZXgiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7b01BQ25CQyxNLEdBQVMsRSxRQUdUQyxJLEdBQU87QUFDTEMsZUFBUyxDQUNQLHNFQURPLEVBRVAsb0RBRk8sRUFHUCxzTkFITyxDQURKO0FBTUxDLHFCQUFlLEtBTlY7QUFPTEMsZ0JBQVUsS0FQTDtBQVFMQyxnQkFBVSxJQVJMO0FBU0xDLGdCQUFVLEdBVEw7QUFVTEMsZUFBUyxDQUFDO0FBVkwsSyxRQVlQQyxPLEdBQVU7QUFDUkMsd0JBQWtCLDBCQUFVQyxDQUFWLEVBQWE7QUFDN0JDLGdCQUFRQyxHQUFSLENBQVlGLEVBQUVHLE1BQUYsQ0FBU04sT0FBckI7QUFDQSxZQUFJLEtBQUtBLE9BQUwsS0FBaUJHLEVBQUVHLE1BQUYsQ0FBU04sT0FBOUIsRUFBdUM7QUFBRTtBQUFRO0FBQ2pELFlBQU1BLFVBQVUsS0FBS0EsT0FBTCxHQUFlRyxFQUFFRyxNQUFGLENBQVNOLE9BQXhDO0FBQ0EsYUFBS08sVUFBTCxDQUFnQixhQUFoQixFQUErQlAsT0FBL0I7QUFDRCxPQU5PO0FBT1JRLGdCQUFVLGtCQUFVQyxLQUFWLEVBQWlCO0FBQ3pCLGFBQUtULE9BQUwsR0FBZVMsS0FBZjtBQUNBO0FBQ0Q7QUFWTyxLO0lBaEIyQzs7OztFQUFaLGVBQUtDLEk7O2tCQUEzQmxCLGEiLCJmaWxlIjoic3dpcGVybWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFN3aXBlck1hbmFnZXIgZXh0ZW5kcyB3ZXB5LnBhZ2UgeyAvLyBUT0RPIOiAg+iZkee7p+aJv+iHqiBGcmFnbWVudE1hbmFnZXJcbiAgICBjb25maWcgPSB7XG5cbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICBpbWdVcmxzOiBbXG4gICAgICAgICdodHRwOi8vaW1nMDYudG9vb3Blbi5jb20vaW1hZ2VzLzIwMTYwODE4L3Rvb29wZW5fc3lfMTc1ODMzMDQ3NzE1LmpwZycsXG4gICAgICAgICdodHRwOi8vb2E1NTA0cnhrLmJrdC5jbG91ZGRuLmNvbS93ZWVrMjNfd2VweS85LnBuZycsXG4gICAgICAgICdodHRwczovL3RpbWdzYS5iYWlkdS5jb20vdGltZz9pbWFnZSZxdWFsaXR5PTgwJnNpemU9Yjk5OTlfMTAwMDAmc2VjPTE1MTEwMDU4Mzg1MDImZGk9NGE3ZTlkMGIwZDc5NGRmYzgwMTViOGVhMjc4YTkwNWUmaW1ndHlwZT0wJnNyYz1odHRwJTNBJTJGJTJGcGljLnFpYW50dWNkbi5jb20lMkY1OHBpYyUyRjE5JTJGNjclMkY0OCUyRjU4UElDMzI1OFBJQ1ZnNl8xMDI0LmpwZydcbiAgICAgIF0sXG4gICAgICBpbmRpY2F0b3JEb3RzOiBmYWxzZSxcbiAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgIGludGVydmFsOiA1MDAwLFxuICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgIGN1cnJlbnQ6IC0xXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgYmluZFN3aXBlckNoYW5nZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuY3VycmVudClcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudCA9PT0gZS5kZXRhaWwuY3VycmVudCkgeyByZXR1cm4gfVxuICAgICAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5jdXJyZW50ID0gZS5kZXRhaWwuY3VycmVudFxuICAgICAgICB0aGlzLiRicm9hZGNhc3QoJ29uVGFiQ2hhbmdlJywgY3VycmVudClcbiAgICAgIH0sXG4gICAgICBzd2l0Y2hUbzogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICAgIC8vIOWIpOaWreW9k+WJjemhtemdouaYr+WQpuWIneWni+WMlizlpoLmnpzmsqHmnInliJnmiafooYzliJ3lp4vljJbmlbDmja7mk43kvZxcbiAgICAgIH1cbiAgICB9O1xuICB9XG4iXX0=