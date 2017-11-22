'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _imgloader = require('./../imgloader.js');

var _imgloader2 = _interopRequireDefault(_imgloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 生成一些测试数据
function genImgListData() {
  var images = ['http://img10.360buyimg.com/img/s600x600_jfs/t3586/215/2086933702/144606/c5885c8b/583e2f08N13aa7762.png', 'http://img10.360buyimg.com/img/s600x600_jfs/t3643/111/394078676/159202/a59f6b72/5809b3ccN41e5e01f.jpg', 'http://img10.360buyimg.com/img/s600x600_jfs/t3388/167/1949827805/115796/6ad813/583660fbNe5c34eae.jpg', 'http://img10.360buyimg.com/img/s600x600_jfs/t3163/281/5203602423/192427/db09be58/5865cb7eN808cc6f4.png', 'http://img10.360buyimg.com/img/s600x600_jfs/t3634/225/410542226/185677/c17f0ecf/5809b073N364fe77e.jpg', 'http://img10.360buyimg.com/img/s600x600_jfs/t3808/206/329427377/119593/a8cf7470/580df323Nb641ab96.jpg', 'http://img10.360buyimg.com/img/s600x600_jfs/t3805/133/325945617/116002/e90e0bdf/580df2b5Ncb04c5ac.jpg', 'http://img10.360buyimg.com/img/s600x600_jfs/t3046/316/3037048447/184004/706c779e/57eb584fN4f8b6502.jpg', 'http://img10.360buyimg.com/img/s600x600_jfs/t3580/212/1841964843/369414/e78739fb/58351586Ne20ac82a.jpg', 'http://img10.360buyimg.com/img/s600x600_jfs/t3274/70/4925773051/133266/fae6e84/585c9890Na19001c8.png', 'http://img10.360buyimg.com/img/s600x600_jfs/t3157/27/5204515328/123020/5f061d81/5865cbcaNfdf0557f.png', 'http://img10.360buyimg.com/img/s600x600_jfs/t3265/341/5152556931/143928/bdf279a4/5865cb96Nff26fc5d.png'];
  images = images.concat(images.slice(0, 4));
  return images.map(function (item) {
    return {
      url: item,
      loaded: false
    };
  });
}

var ToBeMaintainedFragment = function (_wepy$page) {
  _inherits(ToBeMaintainedFragment, _wepy$page);

  function ToBeMaintainedFragment() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToBeMaintainedFragment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToBeMaintainedFragment.__proto__ || Object.getPrototypeOf(ToBeMaintainedFragment)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.data = {
      imgList: genImgListData()
    }, _this.components = {
      imgloader: _imgloader2.default
    }, _this.methods = {
      init: function init() {
        var that = this;
        this.$invoke('imgloader', 'config', this, function (err, data) {
          that.imgList.map(function (item) {
            if (item.url === data.src) {
              item.loaded = true;
            }
          });
          that.$apply();
        });
        that.$invoke('imgloader', 'load', this.imgList);
      },
      show: function show() {
        console.log('onShow');
      },
      hide: function hide() {
        console.log('onHide');
      },
      pullDownRefresh: function pullDownRefresh() {
        var t = wx;
        t.hideNavigationBarLoading();
        t.showNavigationBarLoading();
        setTimeout(function () {
          t.hideNavigationBarLoading();
          t.stopPullDownRefresh();
        }, 2000);
      },
      handlerScrolltolower: function handlerScrolltolower() {}
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ToBeMaintainedFragment;
}(_wepy2.default.page);

exports.default = ToBeMaintainedFragment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvQmVNYWludGFpbmVkRnJhZ21lbnQuanMiXSwibmFtZXMiOlsiZ2VuSW1nTGlzdERhdGEiLCJpbWFnZXMiLCJjb25jYXQiLCJzbGljZSIsIm1hcCIsInVybCIsIml0ZW0iLCJsb2FkZWQiLCJUb0JlTWFpbnRhaW5lZEZyYWdtZW50IiwiY29uZmlnIiwiZGF0YSIsImltZ0xpc3QiLCJjb21wb25lbnRzIiwiaW1nbG9hZGVyIiwibWV0aG9kcyIsImluaXQiLCJ0aGF0IiwiJGludm9rZSIsImVyciIsInNyYyIsIiRhcHBseSIsInNob3ciLCJjb25zb2xlIiwibG9nIiwiaGlkZSIsInB1bGxEb3duUmVmcmVzaCIsInQiLCJ3eCIsImhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInNldFRpbWVvdXQiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiaGFuZGxlclNjcm9sbHRvbG93ZXIiLCJldmVudHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxTQUFTQSxjQUFULEdBQTBCO0FBQ3hCLE1BQUlDLFNBQVMsQ0FDWCx3R0FEVyxFQUVYLHVHQUZXLEVBR1gsc0dBSFcsRUFJWCx3R0FKVyxFQUtYLHVHQUxXLEVBTVgsdUdBTlcsRUFPWCx1R0FQVyxFQVFYLHdHQVJXLEVBU1gsd0dBVFcsRUFVWCxzR0FWVyxFQVdYLHVHQVhXLEVBWVgsd0dBWlcsQ0FBYjtBQWNBQSxXQUFTQSxPQUFPQyxNQUFQLENBQWNELE9BQU9FLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLENBQWQsQ0FBVDtBQUNBLFNBQU9GLE9BQU9HLEdBQVAsQ0FBVyxnQkFBUTtBQUN4QixXQUFPO0FBQ0xDLFdBQUtDLElBREE7QUFFTEMsY0FBUTtBQUZILEtBQVA7QUFJRCxHQUxNLENBQVA7QUFNRDs7SUFFb0JDLHNCOzs7Ozs7Ozs7Ozs7OztzTkFDbkJDLE0sR0FBUyxFLFFBR1RDLEksR0FBTztBQUNMQyxlQUFTWDtBQURKLEssUUFHUFksVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUdiQyxPLEdBQVU7QUFDUkMsWUFBTSxnQkFBWTtBQUNoQixZQUFJQyxPQUFPLElBQVg7QUFDQSxhQUFLQyxPQUFMLENBQWEsV0FBYixFQUEwQixRQUExQixFQUFvQyxJQUFwQyxFQUEwQyxVQUFVQyxHQUFWLEVBQWVSLElBQWYsRUFBcUI7QUFDN0RNLGVBQUtMLE9BQUwsQ0FBYVAsR0FBYixDQUFpQixnQkFBUTtBQUN2QixnQkFBSUUsS0FBS0QsR0FBTCxLQUFhSyxLQUFLUyxHQUF0QixFQUEyQjtBQUN6QmIsbUJBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUFDRixXQUpEO0FBS0FTLGVBQUtJLE1BQUw7QUFDRCxTQVBEO0FBUUFKLGFBQUtDLE9BQUwsQ0FBYSxXQUFiLEVBQTBCLE1BQTFCLEVBQWtDLEtBQUtOLE9BQXZDO0FBQ0QsT0FaTztBQWFSVSxZQUFNLGdCQUFZO0FBQ2hCQyxnQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRCxPQWZPO0FBZ0JSQyxZQUFNLGdCQUFZO0FBQ2hCRixnQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRCxPQWxCTztBQW1CUkUsdUJBQWlCLDJCQUFZO0FBQzNCLFlBQUlDLElBQUlDLEVBQVI7QUFDQUQsVUFBRUUsd0JBQUY7QUFDQUYsVUFBRUcsd0JBQUY7QUFDQUMsbUJBQVcsWUFBWTtBQUNyQkosWUFBRUUsd0JBQUY7QUFDQUYsWUFBRUssbUJBQUY7QUFDRCxTQUhELEVBR0csSUFISDtBQUlELE9BM0JPO0FBNEJSQyw0QkFBc0IsZ0NBQVksQ0FDakM7QUE3Qk8sSyxRQStCVkMsTSxHQUFTLEU7Ozs7RUF6Q3lDLGVBQUtDLEk7O2tCQUFwQzFCLHNCIiwiZmlsZSI6IlRvQmVNYWludGFpbmVkRnJhZ21lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEltZ0xvYWRlciBmcm9tICcuLi9pbWdsb2FkZXInXG5cbiAgLy8g55Sf5oiQ5LiA5Lqb5rWL6K+V5pWw5o2uXG4gIGZ1bmN0aW9uIGdlbkltZ0xpc3REYXRhKCkge1xuICAgIGxldCBpbWFnZXMgPSBbXG4gICAgICAnaHR0cDovL2ltZzEwLjM2MGJ1eWltZy5jb20vaW1nL3M2MDB4NjAwX2pmcy90MzU4Ni8yMTUvMjA4NjkzMzcwMi8xNDQ2MDYvYzU4ODVjOGIvNTgzZTJmMDhOMTNhYTc3NjIucG5nJyxcbiAgICAgICdodHRwOi8vaW1nMTAuMzYwYnV5aW1nLmNvbS9pbWcvczYwMHg2MDBfamZzL3QzNjQzLzExMS8zOTQwNzg2NzYvMTU5MjAyL2E1OWY2YjcyLzU4MDliM2NjTjQxZTVlMDFmLmpwZycsXG4gICAgICAnaHR0cDovL2ltZzEwLjM2MGJ1eWltZy5jb20vaW1nL3M2MDB4NjAwX2pmcy90MzM4OC8xNjcvMTk0OTgyNzgwNS8xMTU3OTYvNmFkODEzLzU4MzY2MGZiTmU1YzM0ZWFlLmpwZycsXG4gICAgICAnaHR0cDovL2ltZzEwLjM2MGJ1eWltZy5jb20vaW1nL3M2MDB4NjAwX2pmcy90MzE2My8yODEvNTIwMzYwMjQyMy8xOTI0MjcvZGIwOWJlNTgvNTg2NWNiN2VOODA4Y2M2ZjQucG5nJyxcbiAgICAgICdodHRwOi8vaW1nMTAuMzYwYnV5aW1nLmNvbS9pbWcvczYwMHg2MDBfamZzL3QzNjM0LzIyNS80MTA1NDIyMjYvMTg1Njc3L2MxN2YwZWNmLzU4MDliMDczTjM2NGZlNzdlLmpwZycsXG4gICAgICAnaHR0cDovL2ltZzEwLjM2MGJ1eWltZy5jb20vaW1nL3M2MDB4NjAwX2pmcy90MzgwOC8yMDYvMzI5NDI3Mzc3LzExOTU5My9hOGNmNzQ3MC81ODBkZjMyM05iNjQxYWI5Ni5qcGcnLFxuICAgICAgJ2h0dHA6Ly9pbWcxMC4zNjBidXlpbWcuY29tL2ltZy9zNjAweDYwMF9qZnMvdDM4MDUvMTMzLzMyNTk0NTYxNy8xMTYwMDIvZTkwZTBiZGYvNTgwZGYyYjVOY2IwNGM1YWMuanBnJyxcbiAgICAgICdodHRwOi8vaW1nMTAuMzYwYnV5aW1nLmNvbS9pbWcvczYwMHg2MDBfamZzL3QzMDQ2LzMxNi8zMDM3MDQ4NDQ3LzE4NDAwNC83MDZjNzc5ZS81N2ViNTg0Zk40ZjhiNjUwMi5qcGcnLFxuICAgICAgJ2h0dHA6Ly9pbWcxMC4zNjBidXlpbWcuY29tL2ltZy9zNjAweDYwMF9qZnMvdDM1ODAvMjEyLzE4NDE5NjQ4NDMvMzY5NDE0L2U3ODczOWZiLzU4MzUxNTg2TmUyMGFjODJhLmpwZycsXG4gICAgICAnaHR0cDovL2ltZzEwLjM2MGJ1eWltZy5jb20vaW1nL3M2MDB4NjAwX2pmcy90MzI3NC83MC80OTI1NzczMDUxLzEzMzI2Ni9mYWU2ZTg0LzU4NWM5ODkwTmExOTAwMWM4LnBuZycsXG4gICAgICAnaHR0cDovL2ltZzEwLjM2MGJ1eWltZy5jb20vaW1nL3M2MDB4NjAwX2pmcy90MzE1Ny8yNy81MjA0NTE1MzI4LzEyMzAyMC81ZjA2MWQ4MS81ODY1Y2JjYU5mZGYwNTU3Zi5wbmcnLFxuICAgICAgJ2h0dHA6Ly9pbWcxMC4zNjBidXlpbWcuY29tL2ltZy9zNjAweDYwMF9qZnMvdDMyNjUvMzQxLzUxNTI1NTY5MzEvMTQzOTI4L2JkZjI3OWE0LzU4NjVjYjk2TmZmMjZmYzVkLnBuZydcbiAgICBdXG4gICAgaW1hZ2VzID0gaW1hZ2VzLmNvbmNhdChpbWFnZXMuc2xpY2UoMCwgNCkpXG4gICAgcmV0dXJuIGltYWdlcy5tYXAoaXRlbSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cmw6IGl0ZW0sXG4gICAgICAgIGxvYWRlZDogZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9CZU1haW50YWluZWRGcmFnbWVudCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgaW1nTGlzdDogZ2VuSW1nTGlzdERhdGEoKVxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGltZ2xvYWRlcjogSW1nTG9hZGVyXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICB0aGlzLiRpbnZva2UoJ2ltZ2xvYWRlcicsICdjb25maWcnLCB0aGlzLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgdGhhdC5pbWdMaXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnVybCA9PT0gZGF0YS5zcmMpIHtcbiAgICAgICAgICAgICAgaXRlbS5sb2FkZWQgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRoYXQuJGludm9rZSgnaW1nbG9hZGVyJywgJ2xvYWQnLCB0aGlzLmltZ0xpc3QpXG4gICAgICB9LFxuICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25TaG93JylcbiAgICAgIH0sXG4gICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkhpZGUnKVxuICAgICAgfSxcbiAgICAgIHB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdCA9IHd4XG4gICAgICAgIHQuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgdC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgICAgICAgdC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAgICAgfSwgMjAwMClcbiAgICAgIH0sXG4gICAgICBoYW5kbGVyU2Nyb2xsdG9sb3dlcjogZnVuY3Rpb24gKCkge1xuICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgIH1cbiAgfVxuIl19