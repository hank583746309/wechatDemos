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
        var callback = function callback(err, data) {
          that.imgList.map(function (item) {
            if (item.url === data.src) {
              item.loaded = true;
            }
          });
          that.$apply();
        };
        this.$invoke('imgloader', 'config', this, callback);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvQmVNYWludGFpbmVkRnJhZ21lbnQuanMiXSwibmFtZXMiOlsiZ2VuSW1nTGlzdERhdGEiLCJpbWFnZXMiLCJjb25jYXQiLCJzbGljZSIsIm1hcCIsInVybCIsIml0ZW0iLCJsb2FkZWQiLCJUb0JlTWFpbnRhaW5lZEZyYWdtZW50IiwiY29uZmlnIiwiZGF0YSIsImltZ0xpc3QiLCJjb21wb25lbnRzIiwiaW1nbG9hZGVyIiwibWV0aG9kcyIsImluaXQiLCJ0aGF0IiwiY2FsbGJhY2siLCJlcnIiLCJzcmMiLCIkYXBwbHkiLCIkaW52b2tlIiwic2hvdyIsImNvbnNvbGUiLCJsb2ciLCJoaWRlIiwicHVsbERvd25SZWZyZXNoIiwidCIsInd4IiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwic2V0VGltZW91dCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJoYW5kbGVyU2Nyb2xsdG9sb3dlciIsImV2ZW50cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEIsTUFBSUMsU0FBUyxDQUNYLHdHQURXLEVBRVgsdUdBRlcsRUFHWCxzR0FIVyxFQUlYLHdHQUpXLEVBS1gsdUdBTFcsRUFNWCx1R0FOVyxFQU9YLHVHQVBXLEVBUVgsd0dBUlcsRUFTWCx3R0FUVyxFQVVYLHNHQVZXLEVBV1gsdUdBWFcsRUFZWCx3R0FaVyxDQUFiO0FBY0FBLFdBQVNBLE9BQU9DLE1BQVAsQ0FBY0QsT0FBT0UsS0FBUCxDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBZCxDQUFUO0FBQ0EsU0FBT0YsT0FBT0csR0FBUCxDQUFXLGdCQUFRO0FBQ3hCLFdBQU87QUFDTEMsV0FBS0MsSUFEQTtBQUVMQyxjQUFRO0FBRkgsS0FBUDtBQUlELEdBTE0sQ0FBUDtBQU1EOztJQUVvQkMsc0I7Ozs7Ozs7Ozs7Ozs7O3NOQUNuQkMsTSxHQUFTLEUsUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVNYO0FBREosSyxRQUdQWSxVLEdBQWE7QUFDWEM7QUFEVyxLLFFBR2JDLE8sR0FBVTtBQUNSQyxZQUFNLGdCQUFZO0FBQ2hCLFlBQUlDLE9BQU8sSUFBWDtBQUNBLFlBQUlDLFdBQVcsU0FBWEEsUUFBVyxDQUFTQyxHQUFULEVBQWNSLElBQWQsRUFBb0I7QUFDakNNLGVBQUtMLE9BQUwsQ0FBYVAsR0FBYixDQUFpQixnQkFBUTtBQUN2QixnQkFBSUUsS0FBS0QsR0FBTCxLQUFhSyxLQUFLUyxHQUF0QixFQUEyQjtBQUN6QmIsbUJBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUFDRixXQUpEO0FBS0FTLGVBQUtJLE1BQUw7QUFDRCxTQVBEO0FBUUEsYUFBS0MsT0FBTCxDQUFhLFdBQWIsRUFBMEIsUUFBMUIsRUFBb0MsSUFBcEMsRUFBMENKLFFBQTFDO0FBQ0FELGFBQUtLLE9BQUwsQ0FBYSxXQUFiLEVBQTBCLE1BQTFCLEVBQWtDLEtBQUtWLE9BQXZDO0FBQ0QsT0FiTztBQWNSVyxZQUFNLGdCQUFZO0FBQ2hCQyxnQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRCxPQWhCTztBQWlCUkMsWUFBTSxnQkFBWTtBQUNoQkYsZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0QsT0FuQk87QUFvQlJFLHVCQUFpQiwyQkFBWTtBQUMzQixZQUFJQyxJQUFJQyxFQUFSO0FBQ0FELFVBQUVFLHdCQUFGO0FBQ0FGLFVBQUVHLHdCQUFGO0FBQ0FDLG1CQUFXLFlBQVk7QUFDckJKLFlBQUVFLHdCQUFGO0FBQ0FGLFlBQUVLLG1CQUFGO0FBQ0QsU0FIRCxFQUdHLElBSEg7QUFJRCxPQTVCTztBQTZCUkMsNEJBQXNCLGdDQUFZLENBQ2pDO0FBOUJPLEssUUFnQ1ZDLE0sR0FBUyxFOzs7O0VBMUN5QyxlQUFLQyxJOztrQkFBcEMzQixzQiIsImZpbGUiOiJUb0JlTWFpbnRhaW5lZEZyYWdtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBJbWdMb2FkZXIgZnJvbSAnLi4vaW1nbG9hZGVyJ1xuXG4gIC8vIOeUn+aIkOS4gOS6m+a1i+ivleaVsOaNrlxuICBmdW5jdGlvbiBnZW5JbWdMaXN0RGF0YSgpIHtcbiAgICBsZXQgaW1hZ2VzID0gW1xuICAgICAgJ2h0dHA6Ly9pbWcxMC4zNjBidXlpbWcuY29tL2ltZy9zNjAweDYwMF9qZnMvdDM1ODYvMjE1LzIwODY5MzM3MDIvMTQ0NjA2L2M1ODg1YzhiLzU4M2UyZjA4TjEzYWE3NzYyLnBuZycsXG4gICAgICAnaHR0cDovL2ltZzEwLjM2MGJ1eWltZy5jb20vaW1nL3M2MDB4NjAwX2pmcy90MzY0My8xMTEvMzk0MDc4Njc2LzE1OTIwMi9hNTlmNmI3Mi81ODA5YjNjY040MWU1ZTAxZi5qcGcnLFxuICAgICAgJ2h0dHA6Ly9pbWcxMC4zNjBidXlpbWcuY29tL2ltZy9zNjAweDYwMF9qZnMvdDMzODgvMTY3LzE5NDk4Mjc4MDUvMTE1Nzk2LzZhZDgxMy81ODM2NjBmYk5lNWMzNGVhZS5qcGcnLFxuICAgICAgJ2h0dHA6Ly9pbWcxMC4zNjBidXlpbWcuY29tL2ltZy9zNjAweDYwMF9qZnMvdDMxNjMvMjgxLzUyMDM2MDI0MjMvMTkyNDI3L2RiMDliZTU4LzU4NjVjYjdlTjgwOGNjNmY0LnBuZycsXG4gICAgICAnaHR0cDovL2ltZzEwLjM2MGJ1eWltZy5jb20vaW1nL3M2MDB4NjAwX2pmcy90MzYzNC8yMjUvNDEwNTQyMjI2LzE4NTY3Ny9jMTdmMGVjZi81ODA5YjA3M04zNjRmZTc3ZS5qcGcnLFxuICAgICAgJ2h0dHA6Ly9pbWcxMC4zNjBidXlpbWcuY29tL2ltZy9zNjAweDYwMF9qZnMvdDM4MDgvMjA2LzMyOTQyNzM3Ny8xMTk1OTMvYThjZjc0NzAvNTgwZGYzMjNOYjY0MWFiOTYuanBnJyxcbiAgICAgICdodHRwOi8vaW1nMTAuMzYwYnV5aW1nLmNvbS9pbWcvczYwMHg2MDBfamZzL3QzODA1LzEzMy8zMjU5NDU2MTcvMTE2MDAyL2U5MGUwYmRmLzU4MGRmMmI1TmNiMDRjNWFjLmpwZycsXG4gICAgICAnaHR0cDovL2ltZzEwLjM2MGJ1eWltZy5jb20vaW1nL3M2MDB4NjAwX2pmcy90MzA0Ni8zMTYvMzAzNzA0ODQ0Ny8xODQwMDQvNzA2Yzc3OWUvNTdlYjU4NGZONGY4YjY1MDIuanBnJyxcbiAgICAgICdodHRwOi8vaW1nMTAuMzYwYnV5aW1nLmNvbS9pbWcvczYwMHg2MDBfamZzL3QzNTgwLzIxMi8xODQxOTY0ODQzLzM2OTQxNC9lNzg3MzlmYi81ODM1MTU4Nk5lMjBhYzgyYS5qcGcnLFxuICAgICAgJ2h0dHA6Ly9pbWcxMC4zNjBidXlpbWcuY29tL2ltZy9zNjAweDYwMF9qZnMvdDMyNzQvNzAvNDkyNTc3MzA1MS8xMzMyNjYvZmFlNmU4NC81ODVjOTg5ME5hMTkwMDFjOC5wbmcnLFxuICAgICAgJ2h0dHA6Ly9pbWcxMC4zNjBidXlpbWcuY29tL2ltZy9zNjAweDYwMF9qZnMvdDMxNTcvMjcvNTIwNDUxNTMyOC8xMjMwMjAvNWYwNjFkODEvNTg2NWNiY2FOZmRmMDU1N2YucG5nJyxcbiAgICAgICdodHRwOi8vaW1nMTAuMzYwYnV5aW1nLmNvbS9pbWcvczYwMHg2MDBfamZzL3QzMjY1LzM0MS81MTUyNTU2OTMxLzE0MzkyOC9iZGYyNzlhNC81ODY1Y2I5Nk5mZjI2ZmM1ZC5wbmcnXG4gICAgXVxuICAgIGltYWdlcyA9IGltYWdlcy5jb25jYXQoaW1hZ2VzLnNsaWNlKDAsIDQpKVxuICAgIHJldHVybiBpbWFnZXMubWFwKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXJsOiBpdGVtLFxuICAgICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvQmVNYWludGFpbmVkRnJhZ21lbnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcblxuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIGltZ0xpc3Q6IGdlbkltZ0xpc3REYXRhKClcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBpbWdsb2FkZXI6IEltZ0xvYWRlclxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICAgICAgdGhhdC5pbWdMaXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnVybCA9PT0gZGF0YS5zcmMpIHtcbiAgICAgICAgICAgICAgaXRlbS5sb2FkZWQgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kaW52b2tlKCdpbWdsb2FkZXInLCAnY29uZmlnJywgdGhpcywgY2FsbGJhY2spXG4gICAgICAgIHRoYXQuJGludm9rZSgnaW1nbG9hZGVyJywgJ2xvYWQnLCB0aGlzLmltZ0xpc3QpXG4gICAgICB9LFxuICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25TaG93JylcbiAgICAgIH0sXG4gICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbkhpZGUnKVxuICAgICAgfSxcbiAgICAgIHB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdCA9IHd4XG4gICAgICAgIHQuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgdC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgICAgICAgdC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAgICAgfSwgMjAwMClcbiAgICAgIH0sXG4gICAgICBoYW5kbGVyU2Nyb2xsdG9sb3dlcjogZnVuY3Rpb24gKCkge1xuICAgICAgfVxuICAgIH07XG4gICAgZXZlbnRzID0ge1xuICAgIH1cbiAgfVxuIl19