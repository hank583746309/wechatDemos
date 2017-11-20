'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (typeof window == 'undefined') {
  window = getApp();
}
var Hoo = window.Hoo || {};

Hoo.define('Hoo.util.String', {
  statics: {
    /**
     * 用于格式化 mobile
     * @params {String} mobile 手机号(国内)
     * @example 
     * fmtMobile('15286819321') --> 152****9321
     */
    fmtMobile: function fmtMobile(mobile) {
      if (typeof mobile == 'undefined' || null == mobile) {
        return '';
      }
      mobile = '' + mobile;
      if (mobile.length == 11) {
        //简单校验
        return mobile.substring(0, 3) + '****' + mobile.substring(7);
      }
      return mobile;
    },
    /**
     * 用于格式化身份证
     * @params {String} id 国内18位身份证(也支持16位)
     * @example
     * fmtIDCard('34122519990121291X') --> 341225********291X
     */
    fmtIDCard: function fmtIDCard(id) {
      if (typeof id == 'undefined' || null == id) {
        return '';
      }
      id = '' + id;
      if (id.length == 18 || id.length == 16) {
        //简单校验
        return id.substring(0, 10) + '****' + id.substring(14);
      }
      return id;
    },
    /**
     * 用于格式化email
     * @params {String} email
     * @example
     * fmtEmail('10000111@qq.com') --> 1000****@qq.com
     */
    fmtEmail: function fmtEmail(email) {
      if (typeof email == 'undefined' || null == email) {
        return '';
      }
      var index = email.indexOf('@');
      if (index > 0) {
        //简单校验
        return email.substring(0, (index > 4 ? index : 4) - 4) + '****' + email.substring(index);
      }
      return email;
    },
    /**
     * 用于格式化
     * @params {String} qq
     * @example
     * fmtQQ('10000') --> 100****0
     */
    fmtQQ: function fmtQQ(qq) {
      if (typeof qq == 'undefined' || null == qq) {
        return '';
      }
      qq = '' + qq;
      if (qq.length >= 5) {
        return qq.substring(0, 3) + '****' + qq.substring(qq.length - 3);
      }
      return qq;
    },
    format: function format() {
      if (arguments.length > 1) {
        //如果有值  1、object类型,使用{{key}}方式,否则使用{{index}}
        var result = arguments[0],
            args = arguments[1];
        if (arguments.length == 2 && (typeof args === 'undefined' ? 'undefined' : _typeof(args)) == "object") {
          for (var key in args) {
            if (args[key] != undefined) {
              var reg = new RegExp("({" + key + "})", "g");
              result = result.replace(reg, args[key]);
            }
          }
        } else {
          for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] != undefined) {
              var reg = new RegExp("({[" + (i - 1) + "]})", "g");
              result = result.replace(reg, arguments[i]);
            }
          }
        }
        return result;
      }
      return typeof arguments[0] == 'undefined' ? null : arguments[0];
    }
  }
});

Hoo.string = Hoo.util.String;

module.exports = Hoo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvby51dGlsLnN0cmluZy5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJnZXRBcHAiLCJIb28iLCJkZWZpbmUiLCJzdGF0aWNzIiwiZm10TW9iaWxlIiwibW9iaWxlIiwibGVuZ3RoIiwic3Vic3RyaW5nIiwiZm10SURDYXJkIiwiaWQiLCJmbXRFbWFpbCIsImVtYWlsIiwiaW5kZXgiLCJpbmRleE9mIiwiZm10UVEiLCJxcSIsImZvcm1hdCIsImFyZ3VtZW50cyIsInJlc3VsdCIsImFyZ3MiLCJrZXkiLCJ1bmRlZmluZWQiLCJyZWciLCJSZWdFeHAiLCJyZXBsYWNlIiwiaSIsInN0cmluZyIsInV0aWwiLCJTdHJpbmciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBSSxPQUFPQSxNQUFQLElBQWlCLFdBQXJCLEVBQWtDO0FBQUVBLFdBQVNDLFFBQVQ7QUFBb0I7QUFDeEQsSUFBSUMsTUFBTUYsT0FBT0UsR0FBUCxJQUFjLEVBQXhCOztBQUVBQSxJQUFJQyxNQUFKLENBQVcsaUJBQVgsRUFBOEI7QUFDMUJDLFdBQVU7QUFDUjs7Ozs7O0FBTUFDLGVBQVcsbUJBQVVDLE1BQVYsRUFBa0I7QUFDM0IsVUFBSSxPQUFPQSxNQUFQLElBQWlCLFdBQWpCLElBQWdDLFFBQVFBLE1BQTVDLEVBQW9EO0FBQUUsZUFBTyxFQUFQO0FBQVk7QUFDbEVBLGVBQVMsS0FBS0EsTUFBZDtBQUNBLFVBQUlBLE9BQU9DLE1BQVAsSUFBaUIsRUFBckIsRUFBeUI7QUFBRTtBQUN6QixlQUFPRCxPQUFPRSxTQUFQLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLElBQXlCLE1BQXpCLEdBQWtDRixPQUFPRSxTQUFQLENBQWlCLENBQWpCLENBQXpDO0FBQ0Q7QUFDRCxhQUFPRixNQUFQO0FBQ0QsS0FkTztBQWVSOzs7Ozs7QUFNQUcsZUFBVyxtQkFBVUMsRUFBVixFQUFjO0FBQ3ZCLFVBQUksT0FBT0EsRUFBUCxJQUFhLFdBQWIsSUFBNEIsUUFBUUEsRUFBeEMs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QWF6QixJQUFJMEIsSUFBSixDQUFTQyxNQUF0Qjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQjdCLEdBQWpCIiwiZmlsZSI6Imhvby51dGlsLnN0cmluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmICh0eXBlb2Ygd2luZG93ID09ICd1bmRlZmluZWQnKSB7IHdpbmRvdyA9IGdldEFwcCgpOyB9XHJcbnZhciBIb28gPSB3aW5kb3cuSG9vIHx8IHt9O1xyXG5cclxuSG9vLmRlZmluZSgnSG9vLnV0aWwuU3RyaW5nJywge1xyXG4gICAgc3RhdGljcyA6IHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIOeUqOS6juagvOW8j+WMliBtb2JpbGVcclxuICAgICAgICogQHBhcmFtcyB7U3RyaW5nfSBtb2JpbGUg5omL5py65Y+3KOWbveWGhSlcclxuICAgICAgICogQGV4YW1wbGUgXHJcbiAgICAgICAqIGZtdE1vYmlsZSgnMTUyODY4MTkzMjEnKSAtLT4gMTUyKioqKjkzMjFcclxuICAgICAgICovXHJcbiAgICAgIGZtdE1vYmlsZTogZnVuY3Rpb24gKG1vYmlsZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbW9iaWxlID09ICd1bmRlZmluZWQnIHx8IG51bGwgPT0gbW9iaWxlKSB7IHJldHVybiAnJzsgfVxyXG4gICAgICAgIG1vYmlsZSA9ICcnICsgbW9iaWxlO1xyXG4gICAgICAgIGlmIChtb2JpbGUubGVuZ3RoID09IDExKSB7IC8v566A5Y2V5qCh6aqMXHJcbiAgICAgICAgICByZXR1cm4gbW9iaWxlLnN1YnN0cmluZygwLCAzKSArICcqKioqJyArIG1vYmlsZS5zdWJzdHJpbmcoNyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtb2JpbGU7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiDnlKjkuo7moLzlvI/ljJbouqvku73or4FcclxuICAgICAgICogQHBhcmFtcyB7U3RyaW5nfSBpZCDlm73lhoUxOOS9jei6q+S7veivgSjkuZ/mlK/mjIExNuS9jSlcclxuICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICogZm10SURDYXJkKCczNDEyMjUxOTk5MDEyMTI5MVgnKSAtLT4gMzQxMjI1KioqKioqKioyOTFYXHJcbiAgICAgICAqL1xyXG4gICAgICBmbXRJRENhcmQ6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaWQgPT0gJ3VuZGVmaW5lZCcgfHwgbnVsbCA9PSBpZCkgeyByZXR1cm4gJyc7IH1cclxuICAgICAgICBpZCA9ICcnICsgaWQ7XHJcbiAgICAgICAgaWYgKGlkLmxlbmd0aCA9PSAxOCB8fCBpZC5sZW5ndGggPT0gMTYpIHsgIC8v566A5Y2V5qCh6aqMXHJcbiAgICAgICAgICByZXR1cm4gaWQuc3Vic3RyaW5nKDAsIDEwKSArICcqKioqJyArIGlkLnN1YnN0cmluZygxNCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgICAgfSxcclxuICAgICAgLyoqXHJcbiAgICAgICAqIOeUqOS6juagvOW8j+WMlmVtYWlsXHJcbiAgICAgICAqIEBwYXJhbXMge1N0cmluZ30gZW1haWxcclxuICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICogZm10RW1haWwoJzEwMDAwMTExQHFxLmNvbScpIC0tPiAxMDAwKioqKkBxcS5jb21cclxuICAgICAgICovXHJcbiAgICAgIGZtdEVtYWlsOiBmdW5jdGlvbiAoZW1haWwpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGVtYWlsID09ICd1bmRlZmluZWQnIHx8IG51bGwgPT0gZW1haWwpIHsgcmV0dXJuICcnOyB9XHJcbiAgICAgICAgdmFyIGluZGV4ID0gZW1haWwuaW5kZXhPZignQCcpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IDApIHsgLy/nroDljZXmoKHpqoxcclxuICAgICAgICAgIHJldHVybiBlbWFpbC5zdWJzdHJpbmcoMCwgKGluZGV4ID4gNCA/IGluZGV4IDogNCkgLSA0KSArICcqKioqJyArIGVtYWlsLnN1YnN0cmluZyhpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbWFpbDtcclxuICAgICAgfSxcclxuICAgICAgLyoqXHJcbiAgICAgICAqIOeUqOS6juagvOW8j+WMllxyXG4gICAgICAgKiBAcGFyYW1zIHtTdHJpbmd9IHFxXHJcbiAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAqIGZtdFFRKCcxMDAwMCcpIC0tPiAxMDAqKioqMFxyXG4gICAgICAgKi9cclxuICAgICAgZm10UVEgOiBmdW5jdGlvbihxcSl7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBxcSA9PSAndW5kZWZpbmVkJyB8fCBudWxsID09IHFxKSB7IHJldHVybiAnJzsgfVxyXG4gICAgICAgIHFxID0gJycgKyBxcTtcclxuICAgICAgICBpZihxcS5sZW5ndGggPj0gNSl7XHJcbiAgICAgICAgICByZXR1cm4gcXEuc3Vic3RyaW5nKDAsIDMpICsgJyoqKionICsgcXEuc3Vic3RyaW5nKHFxLmxlbmd0aCAtIDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXE7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZvcm1hdCA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpeyAvL+WmguaenOacieWAvCAgMeOAgW9iamVjdOexu+Weiyzkvb/nlKh7e2tleX195pa55byPLOWQpuWImeS9v+eUqHt7aW5kZXh9fVxyXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IGFyZ3VtZW50c1swXSwgYXJncyA9IGFyZ3VtZW50c1sxXTtcclxuICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIgJiYgdHlwZW9mIChhcmdzKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBhcmdzKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGFyZ3Nba2V5XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKHtcIiArIGtleSArIFwifSlcIiwgXCJnXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UocmVnLCBhcmdzW2tleV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIih7W1wiICsgKGkgLSAxKSArIFwiXX0pXCIsIFwiZ1wiKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHJlZywgYXJndW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgYXJndW1lbnRzWzBdID09ICd1bmRlZmluZWQnID8gbnVsbCA6IGFyZ3VtZW50c1swXTtcclxuICAgICAgfSxcclxuICAgIH1cclxufSk7XHJcblxyXG5Ib28uc3RyaW5nID0gSG9vLnV0aWwuU3RyaW5nO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIb287Il19