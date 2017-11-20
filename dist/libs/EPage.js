'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var EPage = function EPage(options) {
  var dfOptions = {
    __p_listener_: {},
    __l_prefix_: 'p.e.on',
    addListener: function addListener(eventName, callback) {
      eventName = this.__l_prefix_ + eventName;
      var callbacks = this.__p_listener_[eventName] || [];
      callbacks.push(callback);
      this.__p_listener_[eventName] = callbacks;
    },
    addListeners: function addListeners(cfg) {
      if (arguments.length == 2 && (arguments[0] instanceof Array || typeof arguments[0] == 'string') && typeof arguments[1] == 'function') {
        if (typeof cfg == 'string') {
          this.addListener(cfg, arguments[1]);
        } else {
          for (var i = 0, len = cfg.length; i < len; i++) {
            this.addListener(cfg[i], arguments[1]);
          }
        }
      } else if ((typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) == 'object') {
        for (var key in cfg) {
          if (typeof cfg[key] == 'function') {
            this.addListener(key, cfg[key]);
          }
        }
      }
    },
    removeListener: function removeListener(eventNames) {
      if (!(eventNames instanceof Array)) {
        eventNames = [eventNames];
      }
      var that = this;
      eventNames.map(function (eventName) {
        that.__p_listener_[that.__l_prefix_ + eventName] = [];
      });
    },
    fireListener: function fireListener(eventName) {
      var args = [],
          that = this;
      for (var i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
      }
      var callbacks = this.__p_listener_[this.__l_prefix_ + eventName] || [];
      callbacks.map(function (callback) {
        callback.apply(that, args);
      });
    },
    /********以下为Page默认属性的默认值,做无侵入处理**********/
    onShow: function onShow() {
      this.fireListener('show');
    },
    onHide: function onHide() {
      this.fireListener('hide');
    },
    onUnload: function onUnload() {
      this.fireListener('unload');
    }
  };
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) != 'object') {
    options = {};
  }
  var onLoad = options.onLoad || function () {},
      fns = ['onShow', 'onHide', 'onUnload'];
  for (var key in dfOptions) {
    if (fns.indexOf(key) < 0) {
      options[key] = dfOptions[key];
    }
  }
  options.onLoad = function (opts) {
    var scope = this;
    fns.map(function (key) {
      var callback = scope[key]; // 程序Page自定义事件方法（考虑监听回调直接放到Page方法中）
      scope[key] = function () {
        scope.fireListener('before' + key.substring(2));
        dfOptions[key].apply(scope, arguments);
        callback.apply(scope, arguments);
        scope.fireListener('after' + key.substring(2));
      };
    });
    onLoad.call(scope, opts);
  };
  Page(options);
};
module.exports = EPage;
/*for(var key in (options || {})){
   if (typeof dfOptions[key] !== 'function') {//要考虑好深层copy
     dfOptions[key] = options[key];
   }
 }
 var onLoad = dfOptions.onLoad || function(){};
 dfOptions.onLoad = function (opts){
   var scope = this;
   ['onShow', 'onHide','onUnload'].map(function(key){
     var callback = dfOptions[key];
     dfOptions[key] = function () {
       callback.apply(scope, arguments);
       options[key].apply(scope, arguments);
     }
   });
   onLoad.call(this, opts);
 }
 Page(dfOptions);*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVQYWdlLmpzIl0sIm5hbWVzIjpbIkVQYWdlIiwib3B0aW9ucyIsImRmT3B0aW9ucyIsIl9fcF9saXN0ZW5lcl8iLCJfX2xfcHJlZml4XyIsImFkZExpc3RlbmVyIiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJjYWxsYmFja3MiLCJwdXNoIiwiYWRkTGlzdGVuZXJzIiwiY2ZnIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiQXJyYXkiLCJpIiwibGVuIiwia2V5IiwicmVtb3ZlTGlzdGVuZXIiLCJldmVudE5hbWVzIiwidGhhdCIsIm1hcCIsImZpcmVMaXN0ZW5lciIsImFyZ3MiLCJhcHBseSIsIm9uU2hvdyIsIm9uSGlkZSIsIm9uVW5sb2FkIiwib25Mb2FkIiwiZm5zIiwiaW5kZXhPZiIsIm9wdHMiLCJzY29wZSIsInN1YnN0cmluZyIsImNhbGwiLCJQYWdlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUlBLFFBQVEsU0FBUkEsS0FBUSxDQUFTQyxPQUFULEVBQWlCO0FBQzNCLE1BQUlDLFlBQVk7QUFDZEMsbUJBQWUsRUFERDtBQUVkQyxpQkFBZSxRQUZEO0FBR2RDLGlCQUFlLHFCQUFTQyxTQUFULEVBQW1CQyxRQUFuQixFQUE0QjtBQUN6Q0Qsa0JBQVksS0FBS0YsV0FBTCxHQUFtQkUsU0FBL0I7QUFDQSxVQUFJRSxZQUFZLEtBQUtMLGFBQUwsQ0FBbUJHLFNBQW5CLEtBQWlDLEVBQWpEO0FBQ0FFLGdCQUFVQyxJQUFWLENBQWVGLFFBQWY7QUFDQSxXQUFLSixhQUFMLENBQW1CRyxTQUFuQixJQUFnQ0UsU0FBaEM7QUFDRCxLQVJhO0FBU2RFLGtCQUFlLHNCQUFTQyxHQUFULEVBQWE7QUFDMUIsVUFBSUMsVUFBVUMsTUFBVixJQUFvQixDQUFwQixLQUEwQkQsVUFBVSxDQUFWLGFBQXdCRSxLQUF4QixJQUFpQyxPQUFPRixVQUFVLENBQVYsQ0FBUCxJQUF1QixRQUFsRixLQUErRixPQUFPQSxVQUFVLENBQVYsQ0FBUCxJ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LEdBQU4sQ0FBZixDQURxQixDQUNNO0FBQzNCZSxZQUFNZixHQUFOLElBQWEsWUFBWTtBQUN2QmUsY0FBTVYsWUFBTixDQUFtQixXQUFXTCxJQUFJZ0IsU0FBSixDQUFjLENBQWQsQ0FBOUI7QUFDQS9CLGtCQUFVZSxHQUFWLEVBQWVPLEtBQWYsQ0FBcUJRLEtBQXJCLEVBQTRCcEIsU0FBNUI7QUFDQUwsaUJBQVNpQixLQUFULENBQWVRLEtBQWYsRUFBc0JwQixTQUF0QjtBQUNBb0IsY0FBTVYsWUFBTixDQUFtQixVQUFVTCxJQUFJZ0IsU0FBSixDQUFjLENBQWQsQ0FBN0I7QUFDRCxPQUxEO0FBTUQsS0FSRDtBQVNBTCxXQUFPTSxJQUFQLENBQVlGLEtBQVosRUFBbUJELElBQW5CO0FBQ0QsR0FaRDtBQWFBSSxPQUFLbEMsT0FBTDtBQUNELENBcEVEO0FBcUVBbUMsT0FBT0MsT0FBUCxHQUFpQnJDLEtBQWpCO0FBQ0MiLCJmaWxlIjoiRVBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgRVBhZ2UgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuICB2YXIgZGZPcHRpb25zID0ge1xyXG4gICAgX19wX2xpc3RlbmVyXzoge30sXHJcbiAgICBfX2xfcHJlZml4XyAgOiAncC5lLm9uJyxcclxuICAgIGFkZExpc3RlbmVyICA6IGZ1bmN0aW9uKGV2ZW50TmFtZSxjYWxsYmFjayl7XHJcbiAgICAgIGV2ZW50TmFtZSA9IHRoaXMuX19sX3ByZWZpeF8gKyBldmVudE5hbWU7XHJcbiAgICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLl9fcF9saXN0ZW5lcl9bZXZlbnROYW1lXSB8fCBbXTtcclxuICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICB0aGlzLl9fcF9saXN0ZW5lcl9bZXZlbnROYW1lXSA9IGNhbGxiYWNrcztcclxuICAgIH0sXHJcbiAgICBhZGRMaXN0ZW5lcnMgOiBmdW5jdGlvbihjZmcpe1xyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyICYmIChhcmd1bWVudHNbMF0gaW5zdGFuY2VvZiBBcnJheSB8fCB0eXBlb2YgYXJndW1lbnRzWzBdID09ICdzdHJpbmcnKSAmJiB0eXBlb2YgYXJndW1lbnRzWzFdID09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2ZnID09ICdzdHJpbmcnKSB7IHRoaXMuYWRkTGlzdGVuZXIoY2ZnLGFyZ3VtZW50c1sxXSk7fWVsc2V7XHJcbiAgICAgICAgICBmb3IodmFyIGk9MCxsZW4gPSBjZmcubGVuZ3RoOyBpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmFkZExpc3RlbmVyKGNmZ1tpXSxhcmd1bWVudHNbMV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfWVsc2UgaWYodHlwZW9mIGNmZyA9PSAnb2JqZWN0Jyl7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gY2ZnKXtcclxuICAgICAgICAgIGlmICh0eXBlb2YgY2ZnW2tleV0gPT0gJ2Z1bmN0aW9uJykgeyB0aGlzLmFkZExpc3RlbmVyKGtleSxjZmdba2V5XSk7IH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVMaXN0ZW5lcjogZnVuY3Rpb24gKGV2ZW50TmFtZXMpe1xyXG4gICAgICBpZiAoIShldmVudE5hbWVzIGluc3RhbmNlb2YgQXJyYXkpKSB7IGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107fVxyXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGV2ZW50TmFtZXMubWFwKGZ1bmN0aW9uKGV2ZW50TmFtZSl7XHJcbiAgICAgICAgdGhhdC5fX3BfbGlzdGVuZXJfW3RoYXQuX19sX3ByZWZpeF8gKyBldmVudE5hbWVdID0gW107XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGZpcmVMaXN0ZW5lciA6IGZ1bmN0aW9uKGV2ZW50TmFtZSl7XHJcbiAgICAgIHZhciBhcmdzID0gW10sdGhhdCA9IHRoaXM7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fX3BfbGlzdGVuZXJfW3RoaXMuX19sX3ByZWZpeF8gKyBldmVudE5hbWVdIHx8IFtdO1xyXG4gICAgICBjYWxsYmFja3MubWFwKGZ1bmN0aW9uIChjYWxsYmFjaykgeyBjYWxsYmFjay5hcHBseSh0aGF0LCBhcmdzKTsgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqKioqKioq5Lul5LiL5Li6UGFnZem7mOiupOWxnuaAp+eahOm7mOiupOWAvCzlgZrml6DkvrXlhaXlpITnkIYqKioqKioqKioqL1xyXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuZmlyZUxpc3RlbmVyKCdzaG93Jyk7XHJcbiAgICB9LFxyXG4gICAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuZmlyZUxpc3RlbmVyKCdoaWRlJyk7XHJcbiAgICB9LFxyXG4gICAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5maXJlTGlzdGVuZXIoJ3VubG9hZCcpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9ICdvYmplY3QnKSB7IG9wdGlvbnMgPSB7fTsgfVxyXG4gIHZhciBvbkxvYWQgPSBvcHRpb25zLm9uTG9hZCB8fCBmdW5jdGlvbiAoKSB7IH0sIGZucyA9IFsnb25TaG93JywgJ29uSGlkZScsICdvblVubG9hZCddO1xyXG4gIGZvcih2YXIga2V5IGluIGRmT3B0aW9ucyl7XHJcbiAgICBpZiAoZm5zLmluZGV4T2Yoa2V5KSA8IDApIHsgb3B0aW9uc1trZXldID0gZGZPcHRpb25zW2tleV07IH1cclxuICB9XHJcbiAgb3B0aW9ucy5vbkxvYWQgPSBmdW5jdGlvbihvcHRzKXtcclxuICAgIHZhciBzY29wZSA9IHRoaXM7XHJcbiAgICBmbnMubWFwKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgdmFyIGNhbGxiYWNrID0gc2NvcGVba2V5XTsgLy8g56iL5bqPUGFnZeiHquWumuS5ieS6i+S7tuaWueazle+8iOiAg+iZkeebkeWQrOWbnuiwg+ebtOaOpeaUvuWIsFBhZ2Xmlrnms5XkuK3vvIlcclxuICAgICAgc2NvcGVba2V5XSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzY29wZS5maXJlTGlzdGVuZXIoJ2JlZm9yZScgKyBrZXkuc3Vic3RyaW5nKDIpKTtcclxuICAgICAgICBkZk9wdGlvbnNba2V5XS5hcHBseShzY29wZSwgYXJndW1lbnRzKTtcclxuICAgICAgICBjYWxsYmFjay5hcHBseShzY29wZSwgYXJndW1lbnRzKTtcclxuICAgICAgICBzY29wZS5maXJlTGlzdGVuZXIoJ2FmdGVyJyArIGtleS5zdWJzdHJpbmcoMikpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIG9uTG9hZC5jYWxsKHNjb3BlLCBvcHRzKTtcclxuICB9XHJcbiAgUGFnZShvcHRpb25zKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IEVQYWdlO1xyXG4gLypmb3IodmFyIGtleSBpbiAob3B0aW9ucyB8fCB7fSkpe1xyXG4gICAgaWYgKHR5cGVvZiBkZk9wdGlvbnNba2V5XSAhPT0gJ2Z1bmN0aW9uJykgey8v6KaB6ICD6JmR5aW95rex5bGCY29weVxyXG4gICAgICBkZk9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcclxuICAgIH1cclxuICB9XHJcbiAgdmFyIG9uTG9hZCA9IGRmT3B0aW9ucy5vbkxvYWQgfHwgZnVuY3Rpb24oKXt9O1xyXG4gIGRmT3B0aW9ucy5vbkxvYWQgPSBmdW5jdGlvbiAob3B0cyl7XHJcbiAgICB2YXIgc2NvcGUgPSB0aGlzO1xyXG4gICAgWydvblNob3cnLCAnb25IaWRlJywnb25VbmxvYWQnXS5tYXAoZnVuY3Rpb24oa2V5KXtcclxuICAgICAgdmFyIGNhbGxiYWNrID0gZGZPcHRpb25zW2tleV07XHJcbiAgICAgIGRmT3B0aW9uc1trZXldID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KHNjb3BlLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIG9wdGlvbnNba2V5XS5hcHBseShzY29wZSwgYXJndW1lbnRzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBvbkxvYWQuY2FsbCh0aGlzLCBvcHRzKTtcclxuICB9XHJcbiAgUGFnZShkZk9wdGlvbnMpOyovIl19