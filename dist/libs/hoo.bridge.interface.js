'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (typeof window == 'undefined') {
  window = getApp();
}
var Hoo = window.Hoo || {};

Hoo.define('Hoo.bridge.db', {
  statics: {}
});

Hoo.define('Hoo.bridge.storage', {
  statics: {
    putItem: function putItem(key, value, callback, scope) {},
    getItem: function getItem(key, callback, scope) {},
    removeItem: function removeItem(key) {},
    clear: function clear() {}
  }
});

Hoo.define('Hoo.bridge.doc', {
  statics: {
    setTitle: function setTitle(cfg) {}
  }
});

Hoo.define('Hoo.bridge.widget', {
  statics: {
    toast: function toast(cfg) {},
    tip: {
      error: function error(cfg) {},
      warning: function warning(cfg) {},
      success: function success(cfg) {}
    },
    alert: function alert(cfg) {},
    confirm: function confirm(cfg) {},
    actionSheet: function actionSheet(cfg) {}
  }
});

Hoo.define('Hoo.bridge.location', {
  statics: _defineProperty({
    href: function href(cfg) {},
    replace: function replace() {},
    redirect: function redirect() {},
    back: function back() {
      // 支持  undefined --> 1
      //      index          int
      //      route          String

    }
  }, 'replace', function replace(cfg) {})
});

Hoo.define('Hoo.bridge.net', {
  statics: {
    basePath: null,
    setBasePath: function setBasePath() {},
    upload: function upload(cfg) {},
    post: function post(cfg) {},
    'get': function get(cfg) {},
    download: function download(cfg) {}
  }
});

Hoo.define('Hoo.bridge.media', {
  statics: {
    chooseImage: function chooseImage(cfg) {}
  }
});

Hoo.define('Hoo.bridge.device', {
  statics: {
    scanCode: function scanCode(cfg) {}
  }
});

module.exports = Hoo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvby5icmlkZ2UuaW50ZXJmYWNlLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImdldEFwcCIsIkhvbyIsImRlZmluZSIsInN0YXRpY3MiLCJwdXRJdGVtIiwia2V5IiwidmFsdWUiLCJjYWxsYmFjayIsInNjb3BlIiwiZ2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJjbGVhciIsInNldFRpdGxlIiwiY2ZnIiwidG9hc3QiLCJ0aXAiLCJlcnJvciIsIndhcm5pbmciLCJzdWNjZXNzIiwiYWxlcnQiLCJjb25maXJtIiwiYWN0aW9uU2hlZXQiLCJocmVmIiwicmVwbGFjZSIsInJlZGlyZWN0IiwiYmFjayIsImJhc2VQYXRoIiwic2V0QmFzZVBhdGgiLCJ1cGxvYWQiLCJwb3N0IiwiZG93bmxvYWQiLCJjaG9vc2VJbWFnZSIsInNjYW5Db2RlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUksT0FBT0EsTUFBUCxJQUFpQixXQUFyQixFQUFrQztBQUFFQSxXQUFTQyxRQUFUO0FBQW9CO0FBQ3hELElBQUlDLE1BQU1GLE9BQU9FLEdBQVAsSUFBYyxFQUF4Qjs7QUFFQUEsSUFBSUMsTUFBSixDQUFXLGVBQVgsRUFBNEI7QUFDMUJDLFdBQVM7QUFEaUIsQ0FBNUI7O0FBT0FGLElBQUlDLE1BQUosQ0FBVyxvQkFBWCxFQUFpQztBQUMvQkMsV0FBUztBQUNQQyxhQUFTLGlCQUFVQyxHQUFWLEVBQWVDLEtBQWYsRUFBc0JDLFFBQXRCLEVBQWdDQyxLQUFoQyxFQUF1QyxDQUUvQyxDQUhNO0FBSVBDLGFBQVMsaUJBQVVKLEdBQVYsRUFBZUUsUUFBZixFQUF5QkMsS0FBekIsRUFBZ0MsQ0FFeEMsQ0FOTTtBQU9QRSxnQkFBWSxvQkFBVUwsR0FBVixFQUFlLENBRTFCLENBVE07QUFVUE0sV0FBTyxpQkFBWSxDQUVsQjtBQVpNO0FBRHNCLENBQWpDOztBQWtCQVYsSUFBSUMsTUFBSixDQUFXLGdCQUFYLEVBQTZCO0FBQzNCQyxXQUFTO0FBQ1BTLGNBQVUsa0JBQVVDLEdBQVYsRUFBZSxDQUV4QjtBQUhNO0FBRGtCLENBQTdCOztBQVFBWixJQUFJQyxNQUFKLENBQVcsbUJBQVgsRUFBK0I7QUFDN0JDLFdBQVU7QUFDUlcsV0FBTyxlQUFVRCxHQUFWLEVBQWMsQ0FBRSxDQURmO0FBRVJFLFNBQUs7QUFDSEMsYUFBUyxlQUFVSCxHQUFWLEVBQWUsQ0FBRSxDQUR2QjtBQUVISSxlQUFTLGlCQUFVSixHQUFWLEVBQWUsQ0FBRSxDQUZ2QjtBQUdISyxlQUFTLGlCQUFVTCxHQUFWLEVBQWUsQ0FBRTtBQUh2QixLQUZHO0FBT1JNLFdBQVUsZUFBU04sR0FBVCxFQUFhLENBQUUsQ0FQakI7QUFRUk8sYUFBVSxpQkFBU1AsR0FBVCxFQUFhLENBQUUsQ0FSakI7QUFTUlEsaUJBQWMscUJBQVNSLEdBQVQsRUFBYSxDQUFFO0FBVHJCO0FBRG1CLENBQS9COztBQWNBWixJQUFJQyxNQUFKLENBQVcscUJBQVgsRUFBa0M7QUFDaENDO0FBQ0VtQixVQUFNLGNBQVVULEdBQVYsRUFBZSxDQUVwQixDQUhIO0FBSUVVLGFBQVMsbUJBQVksQ0FBRyxDQUoxQjtBQUtFQyxjQUFVLG9CQUFZLENBQUcsQ0FMM0I7QUFNRUMsVUFBUyxnQkFBVTtBQUNqQjtBQUNBO0FBQ0E7O0FBRUQ7QUFYSCxnQkFZVyxpQkFBVVosR0FBVixFQUFlLENBRXZCLENBZEg7QUFEZ0MsQ0FBbEM7O0FBbUJBWixJQUFJQyxNQUFKLENBQVcsZ0JBQVgsRUFBNkI7QUFDM0JDLFdBQVM7QUFDUHVCLGNBQVUsSUFESDtBQUVQQyxpQkFBYyx1QkFBVSxDQUFFLENBRm5CO0FBR1BDLFlBQVUsZ0JBQVVmLEdBQVYsRUFBZSxDQUFHLENBSHJCO0FBSVBnQixVQUFVLGNBQVVoQixHQUFWLEVBQWUsQ0FBRyxDQUpyQjtBQUtQLFdBQVUsYUFBU0EsR0FBVCxFQUFhLENBQUUsQ0FMbEI7QUFNUGlCLGNBQVUsa0JBQVVqQixHQUFWLEVBQWUsQ0FBRztBQU5yQjtBQURrQixDQUE3Qjs7QUFXQVosSUFBSUMsTUFBSixDQUFXLGtCQUFYLEVBQStCO0FBQzdCQyxXQUFTO0FBQ1A0QixpQkFBYSxxQkFBVWxCLEdBQVYsRUFBZSxDQUczQjtBQUpNO0FBRG9CLENBQS9COztBQVNBWixJQUFJQyxNQUFKLENBQVcsbUJBQVgsRUFBZ0M7QUFDOUJDLFdBQVM7QUFDUDZCLGNBQVUsa0JBQVVuQixHQUFWLEVBQWUsQ0FFeEI7QUFITTtBQURxQixDQUFoQzs7QUFRQW9CLE9BQU9DLE9BQVAsR0FBaUJqQyxHQUFqQiIsImZpbGUiOiJob28uYnJpZGdlLmludGVyZmFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmICh0eXBlb2Ygd2luZG93ID09ICd1bmRlZmluZWQnKSB7IHdpbmRvdyA9IGdldEFwcCgpOyB9XHJcbnZhciBIb28gPSB3aW5kb3cuSG9vIHx8IHt9O1xyXG5cclxuSG9vLmRlZmluZSgnSG9vLmJyaWRnZS5kYicsIHtcclxuICBzdGF0aWNzOiB7XHJcblxyXG4gIH1cclxufSk7XHJcblxyXG5cclxuSG9vLmRlZmluZSgnSG9vLmJyaWRnZS5zdG9yYWdlJywge1xyXG4gIHN0YXRpY3M6IHtcclxuICAgIHB1dEl0ZW06IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBjYWxsYmFjaywgc2NvcGUpIHtcclxuICAgICBcclxuICAgIH0sXHJcbiAgICBnZXRJdGVtOiBmdW5jdGlvbiAoa2V5LCBjYWxsYmFjaywgc2NvcGUpIHtcclxuICAgICAgXHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlSXRlbTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICBcclxuICAgIH0sXHJcbiAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xyXG4gICAgIFxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG5cclxuSG9vLmRlZmluZSgnSG9vLmJyaWRnZS5kb2MnLCB7XHJcbiAgc3RhdGljczoge1xyXG4gICAgc2V0VGl0bGU6IGZ1bmN0aW9uIChjZmcpIHtcclxuICAgICBcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuSG9vLmRlZmluZSgnSG9vLmJyaWRnZS53aWRnZXQnLHtcclxuICBzdGF0aWNzIDoge1xyXG4gICAgdG9hc3Q6IGZ1bmN0aW9uIChjZmcpe30sXHJcbiAgICB0aXA6IHtcclxuICAgICAgZXJyb3IgIDogZnVuY3Rpb24gKGNmZykge30sXHJcbiAgICAgIHdhcm5pbmc6IGZ1bmN0aW9uIChjZmcpIHt9LFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoY2ZnKSB7fVxyXG4gICAgfSxcclxuICAgIGFsZXJ0ICAgOiBmdW5jdGlvbihjZmcpe30sXHJcbiAgICBjb25maXJtIDogZnVuY3Rpb24oY2ZnKXt9LFxyXG4gICAgYWN0aW9uU2hlZXQgOiBmdW5jdGlvbihjZmcpe31cclxuICB9XHJcbn0pO1xyXG5cclxuSG9vLmRlZmluZSgnSG9vLmJyaWRnZS5sb2NhdGlvbicsIHtcclxuICBzdGF0aWNzOiB7XHJcbiAgICBocmVmOiBmdW5jdGlvbiAoY2ZnKSB7XHJcbiAgICAgIFxyXG4gICAgfSxcclxuICAgIHJlcGxhY2U6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIHJlZGlyZWN0OiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICBiYWNrICAgOiBmdW5jdGlvbigpeyBcclxuICAgICAgLy8g5pSv5oyBICB1bmRlZmluZWQgLS0+IDFcclxuICAgICAgLy8gICAgICBpbmRleCAgICAgICAgICBpbnRcclxuICAgICAgLy8gICAgICByb3V0ZSAgICAgICAgICBTdHJpbmdcclxuICAgICAgXHJcbiAgICB9LFxyXG4gICAgcmVwbGFjZTogZnVuY3Rpb24gKGNmZykge1xyXG5cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuSG9vLmRlZmluZSgnSG9vLmJyaWRnZS5uZXQnLCB7XHJcbiAgc3RhdGljczoge1xyXG4gICAgYmFzZVBhdGg6IG51bGwsXHJcbiAgICBzZXRCYXNlUGF0aCA6IGZ1bmN0aW9uKCl7fSxcclxuICAgIHVwbG9hZCAgOiBmdW5jdGlvbiAoY2ZnKSB7IH0sXHJcbiAgICBwb3N0ICAgIDogZnVuY3Rpb24gKGNmZykgeyB9LFxyXG4gICAgJ2dldCcgICA6IGZ1bmN0aW9uKGNmZyl7fSxcclxuICAgIGRvd25sb2FkOiBmdW5jdGlvbiAoY2ZnKSB7IH1cclxuICB9XHJcbn0pO1xyXG5cclxuSG9vLmRlZmluZSgnSG9vLmJyaWRnZS5tZWRpYScsIHtcclxuICBzdGF0aWNzOiB7XHJcbiAgICBjaG9vc2VJbWFnZTogZnVuY3Rpb24gKGNmZykge1xyXG4gICAgICBcclxuXHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbkhvby5kZWZpbmUoJ0hvby5icmlkZ2UuZGV2aWNlJywge1xyXG4gIHN0YXRpY3M6IHtcclxuICAgIHNjYW5Db2RlOiBmdW5jdGlvbiAoY2ZnKSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhvbzsiXX0=