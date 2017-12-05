'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _loadmore = require('./../../components/loadmore.js');

var _loadmore2 = _interopRequireDefault(_loadmore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var listloadmore = function (_wepy$page) {
  _inherits(listloadmore, _wepy$page);

  function listloadmore() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, listloadmore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = listloadmore.__proto__ || Object.getPrototypeOf(listloadmore)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {
      'loadmore': _loadmore2.default
    }, _this.data = {
      scrollY: true,
      timeout: null,
      list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }, _this.methods = {
      loadMoreMessageRecords: function loadMoreMessageRecords() {
        if (this.list.length > 20) {
          return;
        }
        if (this.timeout != null) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.$invoke('loadmore', 'loadMore');
        var that = this;
        this.timeout = setTimeout(function () {
          that.list = that.list.concat([{}, {}, {}, {}]);
          that.$apply();
          that.$invoke('loadmore', 'finish');
          if (that.list.length > 20) {
            that.$invoke('loadmore', 'setNoMore');
          }
        }, 2000);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(listloadmore, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$invoke('loadmore', 'show');
    }
  }]);

  return listloadmore;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(listloadmore , 'pages/ui/listloadmore'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3Rsb2FkbW9yZS5qcyJdLCJuYW1lcyI6WyJsaXN0bG9hZG1vcmUiLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsInNjcm9sbFkiLCJ0aW1lb3V0IiwibGlzdCIsIm1ldGhvZHMiLCJsb2FkTW9yZU1lc3NhZ2VSZWNvcmRzIiwibGVuZ3RoIiwiY2xlYXJUaW1lb3V0IiwiJGludm9rZSIsInRoYXQiLCJzZXRUaW1lb3V0IiwiY29uY2F0IiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLE0sR0FBUyxFLFFBR1RDLFUsR0FBYTtBQUNYO0FBRFcsSyxRQUdiQyxJLEdBQU87QUFDTEMsZUFBUyxJQURKO0FBRUxDLGVBQVMsSUFGSjtBQUdMQyxZQUFNLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxFQUFqQyxFQUFxQyxFQUFyQyxFQUF5QyxFQUF6QztBQUhELEssUUFLUEMsTyxHQUFVO0FBQ1JDLDhCQUF3QixrQ0FBWTtBQUNsQyxZQUFJLEtBQUtGLElBQUwsQ0FBVUcsTUFBVixHQUFtQixFQUF2QixFQUEyQjtBQUFFO0FBQVE7QUFDckMsWUFBSSxLQUFLSixPQUFMLElBQWdCLElBQXBCLEVBQTBCO0FBQ3hCSyx1QkFBYSxLQUFLTCxPQUFsQjtBQUNBLGVBQUtBLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7QUFDRCxhQUFLTSxPQUFMLENBQWEsVUFBYixFQUF5QixVQUF6QjtBQUNBLFlBQUlDLE9BQU8sSUFBWDtBQUNBLGFBQUtQLE9BQUwsR0FBZVEsV0FBVyxZQUFXO0FBQ25DRCxlQUFLTixJQUFMLEdBQVlNLEtBQUtOLElBQUwsQ0FBVVEsTUFBVixDQUFpQixDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsQ0FBakIsQ0FBWjtBQUNBRixlQUFLRyxNQUFMO0FBQ0FILGVBQUtELE9BQUwsQ0FBYSxVQUFiLEVBQXlCLFFBQXpCO0FBQ0EsY0FBSUMsS0FBS04sSUFBTCxDQUFVRyxNQUFWLEdBQW1CLEVBQXZCLEVBQTJCO0FBQ3pCRyxpQkFBS0QsT0FBTCxDQUFhLFVBQWIsRUFBeUIsV0FBekI7QUFDRDtBQUNGLFNBUGMsRUFPWixJQVBZLENBQWY7QUFRRDtBQWpCTyxLOzs7Ozs2QkFtQkQ7QUFDUCxXQUFLQSxPQUFMLENBQWEsVUFBYixFQUF5QixNQUF6QjtBQUNEOzs7O0VBakN1QyxlQUFLSyxJOztrQkFBMUJoQixZIiwiZmlsZSI6Imxpc3Rsb2FkbW9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTG9hZG1vcmUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9sb2FkbW9yZSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBsaXN0bG9hZG1vcmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcblxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgICdsb2FkbW9yZSc6IExvYWRtb3JlXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgc2Nyb2xsWTogdHJ1ZSxcbiAgICAgIHRpbWVvdXQ6IG51bGwsXG4gICAgICBsaXN0OiBbe30sIHt9LCB7fSwge30sIHt9LCB7fSwge30sIHt9LCB7fSwge30sIHt9XVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGxvYWRNb3JlTWVzc2FnZVJlY29yZHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5sZW5ndGggPiAyMCkgeyByZXR1cm4gfVxuICAgICAgICBpZiAodGhpcy50aW1lb3V0ICE9IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KVxuICAgICAgICAgIHRoaXMudGltZW91dCA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRpbnZva2UoJ2xvYWRtb3JlJywgJ2xvYWRNb3JlJylcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5saXN0ID0gdGhhdC5saXN0LmNvbmNhdChbe30sIHt9LCB7fSwge31dKVxuICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICB0aGF0LiRpbnZva2UoJ2xvYWRtb3JlJywgJ2ZpbmlzaCcpXG4gICAgICAgICAgaWYgKHRoYXQubGlzdC5sZW5ndGggPiAyMCkge1xuICAgICAgICAgICAgdGhhdC4kaW52b2tlKCdsb2FkbW9yZScsICdzZXROb01vcmUnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwMClcbiAgICAgIH1cbiAgICB9O1xuICAgIG9uTG9hZCgpIHtcbiAgICAgIHRoaXMuJGludm9rZSgnbG9hZG1vcmUnLCAnc2hvdycpXG4gICAgfVxuICB9XG4iXX0=