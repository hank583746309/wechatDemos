"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (typeof window == 'undefined') {
  window = getApp();
}

var Hoo = window.Hoo || (window.Hoo = {});

var __nameSpaceMap = {},
    objectPrototype = Object.prototype,
    toString = objectPrototype.toString,
    callOverrideParent = function callOverrideParent() {
  //暂保留   继承里的东西 还需要 添加/更改  些东西

  var method = callOverrideParent.caller.caller;

  return method.$owner.prototype[method.$name].apply(this, arguments);
},
    m = __nameSpaceMap = { "Hoo": true };

Hoo.Core = function () {};

//基类定义

Hoo.Core.prototype = {

  $isClass: true, //标识是类-函数对象

  $className: "Hoo.Core", //标记类名

  $superClass: null, //标记父类(方法变更:不通过prototype也可获取)

  alias: null, //别名

  callParent: function callParent() {

    var method = null; //TODO 微信默认开启严格模式,导致该方法不可用

    try {
      method = this.callParent.caller;
    } catch (e) {}

    if (method && method.$class && method.$name) {

      var superClsPrototype = method.$class.$superClass,
          methodName = method.$name;

      if (superClsPrototype[methodName]) {

        superClsPrototype[methodName].apply(this, arguments || []);
      }
    }
  },

  //当前由于微信使用JS 严格模式，故而扩展此方法，用于调用父类方法[BUG 多层嵌套继承都是坑]
  call: function call(name) {
    var args = arguments[1] || [],
        cls;
    if (typeof this.$$className == 'undefined') {
      this.$$className = this.$className;
    }

    cls = this.__proto__.__proto__.constructor.$superClass;
    if (typeof cls === 'undefined') {
      cls = this.__proto__;
    }

    if (cls.$className == this.$$className) {
      cls = this.__proto__.__proto__.__proto__.constructor.$superClass;
    }

    if (cls) {
      this.$$className = this.$className;
      var fn = cls[name];
      if (typeof fn === 'function') {
        fn.apply(cls, args);
        //fn.apply(this, args);
      }
    }
  },

  /**
     *	将这里的callSuper方法重写为: name为调用的方法名,args为对应的参数
     *  即这个方法可以调用父类的名称为name的方法
     */

  callSuper: function callSuper(name) {

    var _args = [],
        args = arguments,
        i = 1,
        len = args.length;

    for (; i < len; i++) {
      _args.push(args[i]);
    }

    var method = null; //TODO 微信默认开启严格模式,导致该方法不可用

    try {
      method = this.callSuper.caller;
    } catch (e) {}

    if (method && method.$class && method.$name) {

      var superClsPrototype = method.$class.$superClass,
          methodName = name;

      if (superClsPrototype[methodName]) {

        superClsPrototype[methodName].apply(this, _args); //这里的参数存疑
      } else {

        throw new Error(methodName + "不存在于类" + superClsPrototype.$className + "中.");
      }
    }
  }

};

Hoo.apply = function (obj, cfg, defaults) {

  if (defaults) {

    Hoo.apply(obj, defaults);
  }

  if (obj) {

    if ((typeof cfg === "undefined" ? "undefined" : _typeof(cfg)) === 'object') {

      for (var key in cfg) {
        obj[key] = cfg[key];
      }
    } else if (typeof cfg === "function") {

      obj = cfg; //如果是函数,则直接赋值
    }
  }

  return obj;
};

Hoo.apply(Hoo, {

  idSeed: 1000,

  debugModel: false,

  setPath: function setPath() {

    //设置路径 与 命名空间的 映射

  },

  getNameSpaces: function getNameSpaces() {

    var arr = [],
        key;

    for (key in m) {
      arr.push(key);
    }

    return arr;
  },

  isHaveNameSpace: function isHaveNameSpace(name) {

    return m[name] === true;
  },

  /**
     * 命名空间定义
     * @example
     * 		Hoo.nameSpace("Ux","Hq");//命名空间: Ux Hq  
     */

  nameSpace: function nameSpace() {

    var args = arguments;

    for (var i = 0, len = args.length; i < len; i++) {

      if (typeof args[i] != 'string') {
        continue;
      }

      if (!m[args[i]]) {

        m[args[i]] = true;

        eval && eval("window." + args[i] + "={}"); //定义命名空间为全局对象
      }
    }
  }

});

Hoo.ns = Hoo.nameSpace;

Hoo.apply(Hoo, {

  name: 'Hoo',

  emptyFn: function emptyFn() {},

  /**
     * String to Class
     * 所有都是类
     */

  s2c: function s2c(clsUrl) {

    var cls = clsUrl.split(".");

    if (!window[cls[0]]) {
      this.nameSpace(cls[0]);
    }

    var clazz = window[cls[0]];

    for (var i = 1, len = cls.length; i < len; i++) {

      if (clazz[cls[i]]) {
        clazz = clazz[cls[i]];
      } else {

        throw new Error(clsUrl + "不存在" + cls[i] + "属性!");
      }
    }

    return clazz;
  },

  /**
     * cfg覆盖obj不重复的部分【多层暂不支持-->>可以通过jQuery支持 备注于 2016-04-15】
     */

  applyIf: function applyIf(obj, cfg) {

    if (obj) {

      for (var pro in cfg) {
        if (typeof obj[pro] == 'undefined') {
          obj[pro] = cfg[pro];
        }
      }
    }

    return obj;
  },

  /**
   * 浅层克隆 暂支持 orign({}对象) copy 给 to({})
   * @param {Object} orign
   * @param {Object} to
   */
  copyTo: function copyTo(orign, to) {
    if ((typeof to === "undefined" ? "undefined" : _typeof(to)) != 'object' || (typeof orign === "undefined" ? "undefined" : _typeof(orign)) != 'object') {
      throw 'copy对象需为Object类型';
    }
    for (var key in orign) {
      to[key] = orign[key];
    }
  }

});

Hoo.apply(Hoo, {

  define: function define(clsNameUrl, cfg) {

    cfg = cfg || {};

    var names = clsNameUrl.split("."),
        obj;

    if (!Hoo.isHaveNameSpace([names[0]])) {
      Hoo.nameSpace(names[0]);
    }

    obj = window[names[0]];

    var statics = cfg['statics'],
        extendClsUrl = cfg['extend'];

    for (var i = 1, len = names.length; i < len; i++) {

      if (i == len - 1) {

        //如果是静态类,执行静态方式

        if (statics) {

          if (!obj[names[i]]) obj[names[i]] = {};

          for (var key in statics) {
            obj[names[i]][key] = statics[key];
          }

          return obj[names[i]];
        }

        //如果是通过继承,则执行继承方式

        if (extendClsUrl) {

          var extendCls = Hoo.s2c(extendClsUrl),
              F = function F() {},
              cls = obj[names[i]];

          if (!cls) {

            F.prototype = extendCls.prototype;

            cls = obj[names[i]] = function () {
              if (this.init) this.init.apply(this, arguments || []);
            };

            cls.prototype = new F();
          } else {

            throw new Error("定义的类:" + clsNameUrl + ",命名空间路径冲突!");
          }

          for (var key in cfg) {

            var v = cfg[key];

            if (typeof v === 'function') {

              v.$class = cls;

              v.$name = key;
            }

            cls.prototype[key] = v;
          }

          cls.prototype['$className'] = clsNameUrl;

          cls['$superClass'] = extendCls.prototype;

          cls.prototype.constructor = cls;

          return cls;
        }

        //如果两者均无,则执行函数的创建

        if (!statics && !extendClsUrl) {

          var F = function F() {},
              cls = obj[names[i]];

          F.prototype = Hoo.Core.prototype;

          if (!cls) {

            cls = obj[names[i]] = function () {
              if (this.init) this.init.apply(this, arguments || []);
            };

            cls.prototype = new F();
          } else {

            throw new Error("定义的类:" + clsNameUrl + ",命名空间路径冲突!");
          }

          for (var key in cfg) {

            var v = cfg[key];

            if (typeof v === 'function') {

              v.$class = cls;

              v.$name = key;
            }

            cls.prototype[key] = v;
          }

          cls.prototype['$className'] = clsNameUrl;

          cls['$superClass'] = Hoo.Core.prototype;

          cls.prototype.constructor = cls;

          return cls;
        }
      }

      if (!obj[names[i]]) {
        obj[names[i]] = {};
      }

      obj = obj[names[i]];
    }
  },

  /**
   * 这里仿造ExtJS 将入口命名为 onCreate ,所有方法执行,均重写该接口即可
   * 
     * @example
     * 		Hoo.create('Hoo.base.Base',{
     * 			name:'ssss', // 覆盖名称
   * 			onCreate : function(cfg){
   * 				console.log(cfg); // {key:'初始数据'}
   * 		}},{
     * 			key:'初始数据'
     * 		});
     */

  create: function create(clsNameUrl, cfg, data) {

    var Cls = Hoo.s2c(clsNameUrl);

    var F = function F() {},
        tempFn = function tempFn() {

      if (this.init) this.init.apply(this, arguments || []);

      //作为所有create的入口

      if (this.onCreate) {
        this.onCreate.apply(this, arguments || {});
      }
    };

    F.prototype = Cls.prototype;

    tempFn.prototype = new F();

    for (var key in cfg) {
      tempFn.prototype[key] = cfg[key];
    }

    tempFn.prototype.constructor = tempFn;

    return new tempFn(data || {});
  }

});

Hoo.apply(Hoo, {

  /**
     * 得到全局唯一ID
     */

  getId: function () {

    var id = Hoo.idSeed,
        getId = function getId(nodeType) {

      id += 1;
      return (nodeType ? nodeType : "component_") + id;
    };
    return getId;
  }(),
  //数据深度克隆
  clone: function clone(obj) {
    var o;
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object") {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (var i = 0, len = obj.length; i < len; i++) {
            o.push(Hoo.clone(obj[i]));
          }
        } else {
          o = {};
          for (var j in obj) {
            o[j] = Hoo.clone(obj[j]);
          }
        }
      }
    } else {
      o = obj;
    }
    // 在这里可以判断进行处理
    if (typeof o != 'undefined' && o.node && o.tag === 'img') {}
    return o;
  },
  /**
   * 判断object是否为空(null、''、' '、[],{}以及undefined 均判断属于空)
   * 
   */
  isEmpty: function isEmpty(obj) {
    if (typeof obj == 'undefined') {
      return true;
    }

    if (obj == null) {
      return true;
    }
    if (obj instanceof Array) {
      return obj.length == 0;
    }
    if (typeof obj == 'string') {
      return obj.trim().length == 0;
    }
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == 'object') {
      var flag = true;for (var key in obj) {
        flag = false;break;
      }return flag;
    }
    return false;
  },
  isEquals: function isEquals(x, y) {
    // If both x and y are null or undefined and exactly the same 
    if (x === y) {
      return true;
    }
    // If they are not strictly equal, they both need to be Objects 
    if (!(x instanceof Object) || !(y instanceof Object)) {
      return false;
    }
    //They must have the exact same prototype chain,the closest we can do is
    //test the constructor. 
    if (x.constructor !== y.constructor) {
      return false;
    }
    for (var p in x) {
      //Inherited properties were tested using x.constructor === y.constructor
      if (x.hasOwnProperty(p)) {
        // Allows comparing x[ p ] and y[ p ] when set to undefined 
        if (!y.hasOwnProperty(p)) {
          return false;
        }

        // If they have the same strict value or identity then they are equal 
        if (x[p] === y[p]) {
          continue;
        }

        // Numbers, Strings, Functions, Booleans must be strictly equal 
        if (_typeof(x[p]) !== "object") {
          return false;
        }

        // Objects and Arrays must be tested recursively 
        if (!Object.equals(x[p], y[p])) {
          return false;
        }
      }
    }
    for (p in y) {
      // allows x[ p ] to be set to undefined 
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        return false;
      }
    }
    return true;
  },
  /**
   * 
   * 过滤掉 obj 中 值为 filterValue 的属性
   */
  filter: function filter(obj, filterValue) {
    for (var key in obj || {}) {
      if (obj[key] == filterValue) {
        delete obj[key];
      }
    }
  }

});

Hoo.define("Hoo.Base", {

  listeners: {},

  init: function init() {

    this.initListeners();

    this.initEvents();

    this.inited();
  },

  inited: function inited() {

    //构建监听

    var scope = this.listeners.scope || this,
        callback;

    for (var eventName in this.listeners) {

      if (eventName === 'scope') {
        continue;
      }

      callback = this.listeners[eventName];

      if (typeof callback === "function") {

        this.addListeners(eventName, callback, scope);
      }
    }
  },

  initListeners: function initListeners() {

    this.listenerStack = {};
  },

  initEvents: function initEvents() {

    this.events = {};
  },

  /*** 添加事件 */

  addEvents: function addEvents() {

    var param = arguments[0];

    if (typeof param === "string") {

      for (var i = 0; i < arguments.length; i++) {

        this.events[arguments[i].toLowerCase()] = true;
      }
    } /* else if (Hoo.util.Object.isObject(param)) {
         for (var key in param) {
           this.events[key].toLowerCase() = true;
         }
       }*/
  },

  //暂不启用

  addEvent: function addEvent(eventName) {

    eventName = eventName.toLowerCase();

    this.events[eventName] = true;
  },

  //暂不启用

  removeEvent: function removeEvent(eventName) {

    eventName = eventName.toLowerCase();

    delete this.events[eventName];
  },

  /**
     * 移除事件(未做测试--应该是错误的.)
     */

  removeEvents: function removeEvents() {

    var param = arguments[0];

    if (typeof param === 'string') {

      for (var i = 0; i < arguments.length; i++) {

        this.removeEvent(arguments[i].toLowerCase());
      }
    } else if (this.isObject(param)) {

      for (var key in param) {
        this.removeEvent(key.toLowerCase());
      }
    }
  },

  /**
     * 触发监听事件 当事件返回true时,事件链停止执行
   * 即:若在某些场景下 不想继续往下执行,则回调中返回true即可.
     */

  fireEvent: function fireEvent(eventName) {

    eventName = eventName.toLowerCase();

    if (this.listenerStack[eventName]) {

      var args = [],
          stackArr = this.listenerStack[eventName],
          stack;

      for (var i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
      }

      var res = false;

      for (var i = 0, len = stackArr.length; i < len; i++) {

        //这里执行同一个监听的多次回调.........................

        stack = stackArr[i];

        res = stack.callback.apply(stack.scope, args);

        if (res) {
          break;
        }
      }

      return res;
    } else {

      //throw new Error('名称为:' + eventName + '的事件不存在或不被允许！');

    }
  },

  on: function on() {

    this.addListeners.apply(this, arguments);
  },

  /**
     * @param {String/Object} eventName 事件名称,同时支持{}形式
     */

  addListeners: function addListeners(eventName, callback, scope) {

    var stack = this.listenerStack;

    if (Hoo.util.Object.isString(eventName) && Hoo.util.Object.isFunction(callback)) {

      eventName = eventName.toLowerCase();

      if (this.events[eventName]) {

        if (!stack[eventName]) {
          stack[eventName] = [];
        }

        stack[eventName].push({ callback: callback || function () {}, scope: scope || this });
      }
    } else {

      if (callback) {
        throw new Error('该形式不支持回调!');return;
      }

      var me = this,
          obj = eventName,
          scope = obj['scope'] || this;

      delete obj['scope'];

      for (var _eventName in obj) {

        var eventName = _eventName.toLowerCase();

        if (this.events[eventName]) {

          if (!stack[eventName]) {
            stack[eventName] = [];
          }

          stack[eventName].push({ callback: obj[_eventName] || function () {}, scope: scope });
        }

        //监听不被允许
      }
    }
  }

});

module.exports = Hoo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvby5jb3JlLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImdldEFwcCIsIkhvbyIsIl9fbmFtZVNwYWNlTWFwIiwib2JqZWN0UHJvdG90eXBlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsT3ZlcnJpZGVQYXJlbnQiLCJtZXRob2QiLCJjYWxsZXIiLCIkb3duZXIiLCIkbmFtZSIsImFwcGx5IiwiYXJndW1lbnRzIiwibSIsIkNvcmUiLCIkaXNDbGFzcyIsIiRjbGFzc05hbWUiLCIkc3VwZXJDbGFzcyIsImFsaWFzIiwiY2FsbFBhcmVudCIsImUiLCIkY2xhc3MiLCJzdXBlckNsc1Byb3RvdHlwZSIsIm1ldGhvZE5hbWUiLCJjYWxsIiwibmFtZSIsImFyZ3MiLCJjbHMiLCIkJGNsYXNzTmFtZSIsIl9fcHJvdG9fXyIsImNvbnN0cnVjdG9yIiwiZm4iLCJjYWxsU3VwZXIiLCJfYXJncyIsImkiLCJsZW4iLCJsZW5ndGgiLCJwdXNoIiwiRXJyb3IiLCJvYmoiLCJjZmciLCJkZWZhdWx0cyIsImtleSIsImlkU2VlZCIsImRlYnVnTW9kZWwiLCJzZXRQYXRoIiwiZ2V0TmFtZVNwYWNlcyIsImFyciIsImlzSGF2ZU5hbWVTcGFjZSIsIm5hbWVTcGFjZSIsImV2YWwiLCJucyIsImVtcHR5Rm4iLCJzMmMiLCJjbHNVcmwiLCJzcGxpdCIsImNsYXp6IiwiYXBwbHlJZiIsInBybyIsImNvcHlUbyIsIm9yaWduIiwidG8iLCJkZWZpbmUiLCJjbHNOYW1lVXJsIiwibmFtZXMiLCJzdGF0aWNzIiwiZXh0ZW5kQ2xzVXJsIiwiZXh0ZW5kQ2xzIiwiRiIsImluaXQiLCJ2IiwiY3JlYXRlIiwiZGF0YSIsIkNscyIsInRlbXBGbiIsIm9uQ3JlYXRlIiwiZ2V0SWQiLCJpZCIsIm5vZGVUeXBlIiwiY2xvbmUiLCJvIiwiQXJyYXkiLCJqIiwibm9kZSIsInRhZyIsImlzRW1wdHkiLCJ0cmltIiwiZmxhZyIsImlzRXF1YWxzIiwieCIsInkiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJlcXVhbHMiLCJmaWx0ZXIiLCJmaWx0ZXJWYWx1ZSIsImxpc3RlbmVycyIsImluaXRMaXN0ZW5lcnMiLCJpbml0RXZlbnRzIiwiaW5pdGVkIiwic2NvcGUiLCJjYWxsYmFjayIsImV2ZW50TmFtZSIsImFkZExpc3RlbmVycyIsImxpc3RlbmVyU3RhY2siLCJldmVudHMiLCJhZGRFdmVudHMiLCJwYXJhbSIsInRvTG93ZXJDYXNlIiwiYWRkRXZlbnQiLCJyZW1vdmVFdmVudCIsInJlbW92ZUV2ZW50cyIsImlzT2JqZWN0IiwiZmlyZUV2ZW50Iiwic3RhY2tBcnIiLCJzdGFjayIsInJlcyIsIm9uIiwidXRpbCIsImlzU3RyaW5nIiwiaXNGdW5jdGlvbiIsIm1lIiwiX2V2ZW50TmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJLE9BQU9BLE1BQVAsSUFBaUIsV0FBckIsRUFBa0M7QUFBRUEsV0FBU0MsUUFBVDtBQUFvQjs7QUFFeEQsSUFBSUMsTUFBTUYsT0FBT0UsR0FBUCxLQUFlRixPQUFPRSxHQUFQLEdBQWEsRUFBNUIsQ0FBVjs7QUFFQSxJQUFJQyxpQkFBaUIsRUFBckI7QUFBQSxJQUVFQyxrQkFBa0JDLE9BQU9DLFNBRjNCO0FBQUEsSUFJRUMsV0FBV0gsZ0JBQWdCRyxRQUo3QjtBQUFBLElBTUVDLHFCQUFxQixTQUFyQkEsa0JBQXFCLEdBQVk7QUFBQzs7QUFFaEMsTUFBSUMsU0FBU0QsbUJBQW1CRSxNQUFuQixDQUEwQkEsTUFBdkM7O0FBRUEsU0FBT0QsT0FBT0UsTUFBUCxDQUFjTCxTQUFkLENBQXdCRyxPQUFPRyxLQUEvQixFQUFzQ0MsS0FBdEMsQ0FBNEMsSUFBNUMsRUFBa0RDLFNBQWxELENBQVA7QUFFRCxDQVpIO0FBQUEsSUFjRUMsSUFBSVosaUJBQWlCLEVBQUUsT0FBTyxJQUFULEVBZHZCOztBQWlCQUQsSUFBSWMsSUFBSixHQUFXLFlBQVksQ0FBRyxDQUExQjs7QUFFQTs7QUFFQWQsSUFBSWMsSUFBSixDQUFTVixTQUFU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K05BdUIsT0FBT0MsT0FBUCxHQUFpQjVILEdBQWpCIiwiZmlsZSI6Imhvby5jb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKHR5cGVvZiB3aW5kb3cgPT0gJ3VuZGVmaW5lZCcpIHsgd2luZG93ID0gZ2V0QXBwKCk7IH1cclxuXHJcbnZhciBIb28gPSB3aW5kb3cuSG9vIHx8ICh3aW5kb3cuSG9vID0ge30pO1xyXG5cclxudmFyIF9fbmFtZVNwYWNlTWFwID0ge30sXHJcblxyXG4gIG9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGUsXHJcblxyXG4gIHRvU3RyaW5nID0gb2JqZWN0UHJvdG90eXBlLnRvU3RyaW5nLFxyXG5cclxuICBjYWxsT3ZlcnJpZGVQYXJlbnQgPSBmdW5jdGlvbiAoKSB7Ly/mmoLkv53nlZkgICDnu6fmib/ph4znmoTkuJzopb8g6L+Y6ZyA6KaBIOa3u+WKoC/mm7TmlLkgIOS6m+S4nOilv1xyXG5cclxuICAgIHZhciBtZXRob2QgPSBjYWxsT3ZlcnJpZGVQYXJlbnQuY2FsbGVyLmNhbGxlcjtcclxuXHJcbiAgICByZXR1cm4gbWV0aG9kLiRvd25lci5wcm90b3R5cGVbbWV0aG9kLiRuYW1lXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICB9LFxyXG5cclxuICBtID0gX19uYW1lU3BhY2VNYXAgPSB7IFwiSG9vXCI6IHRydWUgfTtcclxuXHJcblxyXG5Ib28uQ29yZSA9IGZ1bmN0aW9uICgpIHsgfTtcclxuXHJcbi8v5Z+657G75a6a5LmJXHJcblxyXG5Ib28uQ29yZS5wcm90b3R5cGUgPSB7XHJcblxyXG4gICRpc0NsYXNzOiB0cnVlLFx0XHRcdC8v5qCH6K+G5piv57G7LeWHveaVsOWvueixoVxyXG5cclxuICAkY2xhc3NOYW1lOiBcIkhvby5Db3JlXCIsXHQvL+agh+iusOexu+WQjVxyXG5cclxuICAkc3VwZXJDbGFzczogbnVsbCxcdFx0XHQvL+agh+iusOeItuexuyjmlrnms5Xlj5jmm7Q65LiN6YCa6L+HcHJvdG90eXBl5Lmf5Y+v6I635Y+WKVxyXG5cclxuICBhbGlhczogbnVsbCwgICAgICAgICAvL+WIq+WQjVxyXG5cclxuICBjYWxsUGFyZW50OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIG1ldGhvZCA9IG51bGw7IC8vVE9ETyDlvq7kv6Hpu5jorqTlvIDlkK/kuKXmoLzmqKHlvI8s5a+86Ie06K+l5pa55rOV5LiN5Y+v55SoXHJcblxyXG4gICAgdHJ5IHsgbWV0aG9kID0gdGhpcy5jYWxsUGFyZW50LmNhbGxlcjsgfSBjYXRjaCAoZSkgeyB9XHJcblxyXG4gICAgaWYgKG1ldGhvZCAmJiBtZXRob2QuJGNsYXNzICYmIG1ldGhvZC4kbmFtZSkge1xyXG5cclxuICAgICAgdmFyIHN1cGVyQ2xzUHJvdG90eXBlID0gbWV0aG9kLiRjbGFzcy4kc3VwZXJDbGFzcywgbWV0aG9kTmFtZSA9IG1ldGhvZC4kbmFtZTtcclxuXHJcbiAgICAgIGlmIChzdXBlckNsc1Byb3RvdHlwZVttZXRob2ROYW1lXSkge1xyXG5cclxuICAgICAgICBzdXBlckNsc1Byb3RvdHlwZVttZXRob2ROYW1lXS5hcHBseSh0aGlzLCBhcmd1bWVudHMgfHwgW10pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgLy/lvZPliY3nlLHkuo7lvq7kv6Hkvb/nlKhKUyDkuKXmoLzmqKHlvI/vvIzmlYXogIzmianlsZXmraTmlrnms5XvvIznlKjkuo7osIPnlKjniLbnsbvmlrnms5VbQlVHIOWkmuWxguW1jOWll+e7p+aJv+mDveaYr+WdkV1cclxuICBjYWxsOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHNbMV0gfHwgW10sIGNscztcclxuICAgIGlmICh0eXBlb2YgdGhpcy4kJGNsYXNzTmFtZSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLiQkY2xhc3NOYW1lID0gdGhpcy4kY2xhc3NOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNscyA9IHRoaXMuX19wcm90b19fLl9fcHJvdG9fXy5jb25zdHJ1Y3Rvci4kc3VwZXJDbGFzcztcclxuICAgIGlmICh0eXBlb2YgY2xzID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjbHMgPSB0aGlzLl9fcHJvdG9fXztcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGlmIChjbHMuJGNsYXNzTmFtZSA9PSB0aGlzLiQkY2xhc3NOYW1lKSB7XHJcbiAgICAgIGNscyA9IHRoaXMuX19wcm90b19fLl9fcHJvdG9fXy5fX3Byb3RvX18uY29uc3RydWN0b3IuJHN1cGVyQ2xhc3NcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKGNscykge1xyXG4gICAgICB0aGlzLiQkY2xhc3NOYW1lID0gdGhpcy4kY2xhc3NOYW1lO1xyXG4gICAgICB2YXIgZm4gPSBjbHNbbmFtZV07XHJcbiAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBmbi5hcHBseShjbHMsIGFyZ3MpO1xyXG4gICAgICAgIC8vZm4uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcblxyXG4gICAqXHTlsIbov5nph4znmoRjYWxsU3VwZXLmlrnms5Xph43lhpnkuLo6IG5hbWXkuLrosIPnlKjnmoTmlrnms5XlkI0sYXJnc+S4uuWvueW6lOeahOWPguaVsFxyXG5cclxuICAgKiAg5Y2z6L+Z5Liq5pa55rOV5Y+v5Lul6LCD55So54i257G755qE5ZCN56ew5Li6bmFtZeeahOaWueazlVxyXG5cclxuICAgKi9cclxuXHJcbiAgY2FsbFN1cGVyOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cclxuICAgIHZhciBfYXJncyA9IFtdLCBhcmdzID0gYXJndW1lbnRzLCBpID0gMSwgbGVuID0gYXJncy5sZW5ndGg7XHJcblxyXG4gICAgZm9yICg7IGkgPCBsZW47IGkrKykgeyBfYXJncy5wdXNoKGFyZ3NbaV0pOyB9XHJcblxyXG4gICAgdmFyIG1ldGhvZCA9IG51bGw7IC8vVE9ETyDlvq7kv6Hpu5jorqTlvIDlkK/kuKXmoLzmqKHlvI8s5a+86Ie06K+l5pa55rOV5LiN5Y+v55SoXHJcblxyXG4gICAgdHJ5IHsgbWV0aG9kID0gdGhpcy5jYWxsU3VwZXIuY2FsbGVyOyB9IGNhdGNoIChlKSB7IH1cclxuXHJcbiAgICBpZiAobWV0aG9kICYmIG1ldGhvZC4kY2xhc3MgJiYgbWV0aG9kLiRuYW1lKSB7XHJcblxyXG4gICAgICB2YXIgc3VwZXJDbHNQcm90b3R5cGUgPSBtZXRob2QuJGNsYXNzLiRzdXBlckNsYXNzLCBtZXRob2ROYW1lID0gbmFtZTtcclxuXHJcbiAgICAgIGlmIChzdXBlckNsc1Byb3RvdHlwZVttZXRob2ROYW1lXSkge1xyXG5cclxuICAgICAgICBzdXBlckNsc1Byb3RvdHlwZVttZXRob2ROYW1lXS5hcHBseSh0aGlzLCBfYXJncyk7Ly/ov5nph4znmoTlj4LmlbDlrZjnlpFcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXRob2ROYW1lICsgXCLkuI3lrZjlnKjkuo7nsbtcIiArIHN1cGVyQ2xzUHJvdG90eXBlLiRjbGFzc05hbWUgKyBcIuS4rS5cIik7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuSG9vLmFwcGx5ID0gZnVuY3Rpb24gKG9iaiwgY2ZnLCBkZWZhdWx0cykge1xyXG5cclxuICBpZiAoZGVmYXVsdHMpIHtcclxuXHJcbiAgICBIb28uYXBwbHkob2JqLCBkZWZhdWx0cyk7XHJcblxyXG4gIH1cclxuXHJcbiAgaWYgKG9iaikge1xyXG5cclxuICAgIGlmICh0eXBlb2YgKGNmZykgPT09ICdvYmplY3QnKSB7XHJcblxyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gY2ZnKSB7IG9ialtrZXldID0gY2ZnW2tleV07IH1cclxuXHJcbiAgICB9IGVsc2VcclxuXHJcbiAgICAgIGlmICgodHlwZW9mIChjZmcpID09PSBcImZ1bmN0aW9uXCIpKSB7XHJcblxyXG4gICAgICAgIG9iaiA9IGNmZzsgLy/lpoLmnpzmmK/lh73mlbAs5YiZ55u05o6l6LWL5YC8XHJcblxyXG4gICAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9iajtcclxuXHJcbn1cclxuXHJcblxyXG5Ib28uYXBwbHkoSG9vLCB7XHJcblxyXG4gIGlkU2VlZDogMTAwMCxcclxuXHJcbiAgZGVidWdNb2RlbDogZmFsc2UsXHJcblxyXG4gIHNldFBhdGg6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvL+iuvue9rui3r+W+hCDkuI4g5ZG95ZCN56m66Ze055qEIOaYoOWwhFxyXG5cclxuICB9LFxyXG5cclxuICBnZXROYW1lU3BhY2VzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGFyciA9IFtdLCBrZXk7XHJcblxyXG4gICAgZm9yIChrZXkgaW4gbSkgeyBhcnIucHVzaChrZXkpOyB9XHJcblxyXG4gICAgcmV0dXJuIGFycjtcclxuXHJcbiAgfSxcclxuXHJcbiAgaXNIYXZlTmFtZVNwYWNlOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cclxuICAgIHJldHVybiBtW25hbWVdID09PSB0cnVlO1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuXHJcbiAgICog5ZG95ZCN56m66Ze05a6a5LmJXHJcblxyXG4gICAqIEBleGFtcGxlXHJcblxyXG4gICAqIFx0XHRIb28ubmFtZVNwYWNlKFwiVXhcIixcIkhxXCIpOy8v5ZG95ZCN56m66Ze0OiBVeCBIcSAgXHJcblxyXG4gICAqL1xyXG5cclxuICBuYW1lU3BhY2U6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiAoYXJnc1tpXSkgIT0gJ3N0cmluZycpIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgIGlmICghbVthcmdzW2ldXSkge1xyXG5cclxuICAgICAgICBtW2FyZ3NbaV1dID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZXZhbCAmJiBldmFsKFwid2luZG93LlwiICsgYXJnc1tpXSArIFwiPXt9XCIpOy8v5a6a5LmJ5ZG95ZCN56m66Ze05Li65YWo5bGA5a+56LGhXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59KTtcclxuXHJcbkhvby5ucyA9IEhvby5uYW1lU3BhY2U7XHJcblxyXG5cclxuXHJcbkhvby5hcHBseShIb28sIHtcclxuXHJcbiAgbmFtZTogJ0hvbycsXHJcblxyXG4gIGVtcHR5Rm46IGZ1bmN0aW9uICgpIHsgfSxcclxuXHJcbiAgLyoqXHJcblxyXG4gICAqIFN0cmluZyB0byBDbGFzc1xyXG5cclxuICAgKiDmiYDmnInpg73mmK/nsbtcclxuXHJcbiAgICovXHJcblxyXG4gIHMyYzogZnVuY3Rpb24gKGNsc1VybCkge1xyXG5cclxuICAgIHZhciBjbHMgPSBjbHNVcmwuc3BsaXQoXCIuXCIpO1xyXG5cclxuICAgIGlmICghd2luZG93W2Nsc1swXV0pIHsgdGhpcy5uYW1lU3BhY2UoY2xzWzBdKTsgfVxyXG5cclxuICAgIHZhciBjbGF6eiA9IHdpbmRvd1tjbHNbMF1dO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAxLCBsZW4gPSBjbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHJcbiAgICAgIGlmIChjbGF6eltjbHNbaV1dKSB7IGNsYXp6ID0gY2xhenpbY2xzW2ldXTsgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNsc1VybCArIFwi5LiN5a2Y5ZyoXCIgKyBjbHNbaV0gKyBcIuWxnuaApyFcIik7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjbGF6ejtcclxuXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcblxyXG4gICAqIGNmZ+imhueblm9iauS4jemHjeWkjeeahOmDqOWIhuOAkOWkmuWxguaaguS4jeaUr+aMgS0tPj7lj6/ku6XpgJrov4dqUXVlcnnmlK/mjIEg5aSH5rOo5LqOIDIwMTYtMDQtMTXjgJFcclxuXHJcbiAgICovXHJcblxyXG4gIGFwcGx5SWY6IGZ1bmN0aW9uIChvYmosIGNmZykge1xyXG5cclxuICAgIGlmIChvYmopIHtcclxuXHJcbiAgICAgIGZvciAodmFyIHBybyBpbiBjZmcpIHsgaWYgKHR5cGVvZiAob2JqW3Byb10pID09ICd1bmRlZmluZWQnKSB7IG9ialtwcm9dID0gY2ZnW3Byb107IH0gfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqO1xyXG5cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDmtYXlsYLlhYvpmoYg5pqC5pSv5oyBIG9yaWduKHt95a+56LGhKSBjb3B5IOe7mSB0byh7fSlcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3JpZ25cclxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9cclxuICAgKi9cclxuICBjb3B5VG86IGZ1bmN0aW9uIChvcmlnbiwgdG8pIHtcclxuICAgIGlmICh0eXBlb2YgdG8gIT0gJ29iamVjdCcgfHwgdHlwZW9mIG9yaWduICE9ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93ICdjb3B55a+56LGh6ZyA5Li6T2JqZWN057G75Z6LJztcclxuICAgIH1cclxuICAgIGZvciAodmFyIGtleSBpbiBvcmlnbikgeyB0b1trZXldID0gb3JpZ25ba2V5XTsgfVxyXG5cclxuICB9XHJcblxyXG59KTtcclxuXHJcblxyXG5Ib28uYXBwbHkoSG9vLCB7XHJcblxyXG4gIGRlZmluZTogZnVuY3Rpb24gKGNsc05hbWVVcmwsIGNmZykge1xyXG5cclxuICAgIGNmZyA9IGNmZyB8fCB7fTtcclxuXHJcbiAgICB2YXIgbmFtZXMgPSBjbHNOYW1lVXJsLnNwbGl0KFwiLlwiKSwgb2JqO1xyXG5cclxuICAgIGlmICghSG9vLmlzSGF2ZU5hbWVTcGFjZShbbmFtZXNbMF1dKSkgeyBIb28ubmFtZVNwYWNlKG5hbWVzWzBdKTsgfVxyXG5cclxuICAgIG9iaiA9IHdpbmRvd1tuYW1lc1swXV07XHJcblxyXG4gICAgdmFyIHN0YXRpY3MgPSBjZmdbJ3N0YXRpY3MnXSwgZXh0ZW5kQ2xzVXJsID0gY2ZnWydleHRlbmQnXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gbmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHJcbiAgICAgIGlmIChpID09IGxlbiAtIDEpIHtcclxuXHJcbiAgICAgICAgLy/lpoLmnpzmmK/pnZnmgIHnsbss5omn6KGM6Z2Z5oCB5pa55byPXHJcblxyXG4gICAgICAgIGlmIChzdGF0aWNzKSB7XHJcblxyXG4gICAgICAgICAgaWYgKCFvYmpbbmFtZXNbaV1dKSBvYmpbbmFtZXNbaV1dID0ge307XHJcblxyXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHN0YXRpY3MpIHsgb2JqW25hbWVzW2ldXVtrZXldID0gc3RhdGljc1trZXldOyB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIG9ialtuYW1lc1tpXV07XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lpoLmnpzmmK/pgJrov4fnu6fmib8s5YiZ5omn6KGM57un5om/5pa55byPXHJcblxyXG4gICAgICAgIGlmIChleHRlbmRDbHNVcmwpIHtcclxuXHJcbiAgICAgICAgICB2YXIgZXh0ZW5kQ2xzID0gSG9vLnMyYyhleHRlbmRDbHNVcmwpLFxyXG5cclxuICAgICAgICAgICAgRiA9IGZ1bmN0aW9uICgpIHsgfSxcclxuXHJcbiAgICAgICAgICAgIGNscyA9IG9ialtuYW1lc1tpXV07XHJcblxyXG4gICAgICAgICAgaWYgKCFjbHMpIHtcclxuXHJcbiAgICAgICAgICAgIEYucHJvdG90eXBlID0gZXh0ZW5kQ2xzLnByb3RvdHlwZTtcclxuXHJcbiAgICAgICAgICAgIGNscyA9IG9ialtuYW1lc1tpXV0gPSBmdW5jdGlvbiAoKSB7IGlmICh0aGlzLmluaXQpIHRoaXMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMgfHwgW10pOyB9O1xyXG5cclxuICAgICAgICAgICAgY2xzLnByb3RvdHlwZSA9IG5ldyBGKCk7XHJcblxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIuWumuS5ieeahOexuzpcIiArIGNsc05hbWVVcmwgKyBcIizlkb3lkI3nqbrpl7Tot6/lvoTlhrLnqoEhXCIpO1xyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY2ZnKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdiA9IGNmZ1trZXldO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAodikgPT09ICdmdW5jdGlvbicpIHtcclxuXHJcbiAgICAgICAgICAgICAgdi4kY2xhc3MgPSBjbHM7XHJcblxyXG4gICAgICAgICAgICAgIHYuJG5hbWUgPSBrZXk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjbHMucHJvdG90eXBlW2tleV0gPSB2O1xyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjbHMucHJvdG90eXBlWyckY2xhc3NOYW1lJ10gPSBjbHNOYW1lVXJsO1xyXG5cclxuICAgICAgICAgIGNsc1snJHN1cGVyQ2xhc3MnXSA9IGV4dGVuZENscy5wcm90b3R5cGU7XHJcblxyXG4gICAgICAgICAgY2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcclxuXHJcbiAgICAgICAgICByZXR1cm4gY2xzO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5aaC5p6c5Lik6ICF5Z2H5pegLOWImeaJp+ihjOWHveaVsOeahOWIm+W7ulxyXG5cclxuICAgICAgICBpZiAoIXN0YXRpY3MgJiYgIWV4dGVuZENsc1VybCkge1xyXG5cclxuICAgICAgICAgIHZhciBGID0gZnVuY3Rpb24gKCkgeyB9LCBjbHMgPSBvYmpbbmFtZXNbaV1dO1xyXG5cclxuICAgICAgICAgIEYucHJvdG90eXBlID0gSG9vLkNvcmUucHJvdG90eXBlO1xyXG5cclxuICAgICAgICAgIGlmICghY2xzKSB7XHJcblxyXG4gICAgICAgICAgICBjbHMgPSBvYmpbbmFtZXNbaV1dID0gZnVuY3Rpb24gKCkgeyBpZiAodGhpcy5pbml0KSB0aGlzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzIHx8IFtdKTsgfTtcclxuXHJcbiAgICAgICAgICAgIGNscy5wcm90b3R5cGUgPSBuZXcgRigpO1xyXG5cclxuICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCLlrprkuYnnmoTnsbs6XCIgKyBjbHNOYW1lVXJsICsgXCIs5ZG95ZCN56m66Ze06Lev5b6E5Yay56qBIVwiKTtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIGNmZykge1xyXG5cclxuICAgICAgICAgICAgdmFyIHYgPSBjZmdba2V5XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHYpID09PSAnZnVuY3Rpb24nKSB7XHJcblxyXG4gICAgICAgICAgICAgIHYuJGNsYXNzID0gY2xzO1xyXG5cclxuICAgICAgICAgICAgICB2LiRuYW1lID0ga2V5O1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2xzLnByb3RvdHlwZVtrZXldID0gdjtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY2xzLnByb3RvdHlwZVsnJGNsYXNzTmFtZSddID0gY2xzTmFtZVVybDtcclxuXHJcbiAgICAgICAgICBjbHNbJyRzdXBlckNsYXNzJ10gPSBIb28uQ29yZS5wcm90b3R5cGU7XHJcblxyXG4gICAgICAgICAgY2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcclxuXHJcbiAgICAgICAgICByZXR1cm4gY2xzO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIW9ialtuYW1lc1tpXV0pIHsgb2JqW25hbWVzW2ldXSA9IHt9OyB9XHJcblxyXG4gICAgICBvYmogPSBvYmpbbmFtZXNbaV1dO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6L+Z6YeM5Lu/6YCgRXh0SlMg5bCG5YWl5Y+j5ZG95ZCN5Li6IG9uQ3JlYXRlICzmiYDmnInmlrnms5XmiafooYws5Z2H6YeN5YaZ6K+l5o6l5Y+j5Y2z5Y+vXHJcbiAgICogXHJcblxyXG4gICAqIEBleGFtcGxlXHJcblxyXG4gICAqIFx0XHRIb28uY3JlYXRlKCdIb28uYmFzZS5CYXNlJyx7XHJcblxyXG4gICAqIFx0XHRcdG5hbWU6J3Nzc3MnLCAvLyDopobnm5blkI3np7BcclxuICAgKiBcdFx0XHRvbkNyZWF0ZSA6IGZ1bmN0aW9uKGNmZyl7XHJcbiAgICogXHRcdFx0XHRjb25zb2xlLmxvZyhjZmcpOyAvLyB7a2V5OifliJ3lp4vmlbDmja4nfVxyXG4gICAqIFx0XHR9fSx7XHJcblxyXG4gICAqIFx0XHRcdGtleTon5Yid5aeL5pWw5o2uJ1xyXG5cclxuICAgKiBcdFx0fSk7XHJcblxyXG4gICAqL1xyXG5cclxuICBjcmVhdGU6IGZ1bmN0aW9uIChjbHNOYW1lVXJsLCBjZmcsIGRhdGEpIHtcclxuXHJcbiAgICB2YXIgQ2xzID0gSG9vLnMyYyhjbHNOYW1lVXJsKTtcclxuXHJcbiAgICB2YXIgRiA9IGZ1bmN0aW9uICgpIHsgfSxcclxuXHJcbiAgICAgIHRlbXBGbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdCkgdGhpcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyB8fCBbXSk7XHJcblxyXG4gICAgICAgIC8v5L2c5Li65omA5pyJY3JlYXRl55qE5YWl5Y+jXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9uQ3JlYXRlKSB7IHRoaXMub25DcmVhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzIHx8IHt9KTsgfVxyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICBGLnByb3RvdHlwZSA9IENscy5wcm90b3R5cGU7XHJcblxyXG4gICAgdGVtcEZuLnByb3RvdHlwZSA9IG5ldyBGKCk7XHJcblxyXG4gICAgZm9yICh2YXIga2V5IGluIGNmZykgeyB0ZW1wRm4ucHJvdG90eXBlW2tleV0gPSBjZmdba2V5XTsgfVxyXG5cclxuICAgIHRlbXBGbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0ZW1wRm47XHJcblxyXG4gICAgcmV0dXJuIG5ldyB0ZW1wRm4oZGF0YSB8fCB7fSk7XHJcblxyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5Ib28uYXBwbHkoSG9vLCB7XHJcblxyXG4gIC8qKlxyXG5cclxuICAgKiDlvpfliLDlhajlsYDllK/kuIBJRFxyXG5cclxuICAgKi9cclxuXHJcbiAgZ2V0SWQ6IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGlkID0gSG9vLmlkU2VlZCwgZ2V0SWQgPSBmdW5jdGlvbiAobm9kZVR5cGUpIHtcclxuXHJcbiAgICAgIGlkICs9IDE7XHJcbiAgICAgIHJldHVybiAobm9kZVR5cGUgPyBub2RlVHlwZSA6IFwiY29tcG9uZW50X1wiKSArIGlkO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBnZXRJZDtcclxuICB9KSgpLFxyXG4gIC8v5pWw5o2u5rex5bqm5YWL6ZqGXHJcbiAgY2xvbmU6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIHZhciBvO1xyXG4gICAgaWYgKHR5cGVvZiBvYmogPT0gXCJvYmplY3RcIikge1xyXG4gICAgICBpZiAob2JqID09PSBudWxsKSB7XHJcbiAgICAgICAgbyA9IG51bGw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBvID0gW107XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIG8ucHVzaChIb28uY2xvbmUob2JqW2ldKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG8gPSB7fTtcclxuICAgICAgICAgIGZvciAodmFyIGogaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIG9bal0gPSBIb28uY2xvbmUob2JqW2pdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG8gPSBvYmo7XHJcbiAgICB9XHJcbiAgICAvLyDlnKjov5nph4zlj6/ku6XliKTmlq3ov5vooYzlpITnkIZcclxuICAgIGlmICh0eXBlb2YgKG8pICE9ICd1bmRlZmluZWQnICYmIG8ubm9kZSAmJiBvLnRhZyA9PT0gJ2ltZycpIHsgfVxyXG4gICAgcmV0dXJuIG87XHJcbiAgfSxcclxuICAvKipcclxuICAgKiDliKTmlq1vYmplY3TmmK/lkKbkuLrnqboobnVsbOOAgScn44CBJyAn44CBW10se33ku6Xlj4p1bmRlZmluZWQg5Z2H5Yik5pat5bGe5LqO56m6KVxyXG4gICAqIFxyXG4gICAqL1xyXG4gIGlzRW1wdHk6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGlmICh0eXBlb2Ygb2JqID09ICd1bmRlZmluZWQnKSB7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgaWYgKG9iaiA9PSBudWxsKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHsgcmV0dXJuIG9iai5sZW5ndGggPT0gMDsgfVxyXG4gICAgaWYgKHR5cGVvZiBvYmogPT0gJ3N0cmluZycpIHsgcmV0dXJuIG9iai50cmltKCkubGVuZ3RoID09IDA7IH1cclxuICAgIGlmICh0eXBlb2Ygb2JqID09ICdvYmplY3QnKSB7XHJcbiAgICAgIHZhciBmbGFnID0gdHJ1ZTsgZm9yICh2YXIga2V5IGluIG9iaikgeyBmbGFnID0gZmFsc2U7IGJyZWFrOyB9IHJldHVybiBmbGFnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgaXNFcXVhbHMgOiBmdW5jdGlvbih4LHkpe1xyXG4gICAgLy8gSWYgYm90aCB4IGFuZCB5IGFyZSBudWxsIG9yIHVuZGVmaW5lZCBhbmQgZXhhY3RseSB0aGUgc2FtZSBcclxuICAgIGlmICh4ID09PSB5KSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgdGhleSBhcmUgbm90IHN0cmljdGx5IGVxdWFsLCB0aGV5IGJvdGggbmVlZCB0byBiZSBPYmplY3RzIFxyXG4gICAgaWYgKCEoeCBpbnN0YW5jZW9mIE9iamVjdCkgfHwgISh5IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvL1RoZXkgbXVzdCBoYXZlIHRoZSBleGFjdCBzYW1lIHByb3RvdHlwZSBjaGFpbix0aGUgY2xvc2VzdCB3ZSBjYW4gZG8gaXNcclxuICAgIC8vdGVzdCB0aGUgY29uc3RydWN0b3IuIFxyXG4gICAgaWYgKHguY29uc3RydWN0b3IgIT09IHkuY29uc3RydWN0b3IpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgcCBpbiB4KSB7XHJcbiAgICAgIC8vSW5oZXJpdGVkIHByb3BlcnRpZXMgd2VyZSB0ZXN0ZWQgdXNpbmcgeC5jb25zdHJ1Y3RvciA9PT0geS5jb25zdHJ1Y3RvclxyXG4gICAgICBpZiAoeC5oYXNPd25Qcm9wZXJ0eShwKSkge1xyXG4gICAgICAgIC8vIEFsbG93cyBjb21wYXJpbmcgeFsgcCBdIGFuZCB5WyBwIF0gd2hlbiBzZXQgdG8gdW5kZWZpbmVkIFxyXG4gICAgICAgIGlmICgheS5oYXNPd25Qcm9wZXJ0eShwKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgdGhleSBoYXZlIHRoZSBzYW1lIHN0cmljdCB2YWx1ZSBvciBpZGVudGl0eSB0aGVuIHRoZXkgYXJlIGVxdWFsIFxyXG4gICAgICAgIGlmICh4W3BdID09PSB5W3BdKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE51bWJlcnMsIFN0cmluZ3MsIEZ1bmN0aW9ucywgQm9vbGVhbnMgbXVzdCBiZSBzdHJpY3RseSBlcXVhbCBcclxuICAgICAgICBpZiAodHlwZW9mICh4W3BdKSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT2JqZWN0cyBhbmQgQXJyYXlzIG11c3QgYmUgdGVzdGVkIHJlY3Vyc2l2ZWx5IFxyXG4gICAgICAgIGlmICghT2JqZWN0LmVxdWFscyh4W3BdLCB5W3BdKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChwIGluIHkpIHtcclxuICAgICAgLy8gYWxsb3dzIHhbIHAgXSB0byBiZSBzZXQgdG8gdW5kZWZpbmVkIFxyXG4gICAgICBpZiAoeS5oYXNPd25Qcm9wZXJ0eShwKSAmJiAheC5oYXNPd25Qcm9wZXJ0eShwKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7IFxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICog6L+H5ruk5o6JIG9iaiDkuK0g5YC85Li6IGZpbHRlclZhbHVlIOeahOWxnuaAp1xyXG4gICAqL1xyXG4gIGZpbHRlciA6IGZ1bmN0aW9uKG9iaixmaWx0ZXJWYWx1ZSl7XHJcbiAgICBmb3IodmFyIGtleSBpbiAob2JqIHx8IHt9KSl7XHJcbiAgICAgIGlmKG9ialtrZXldID09IGZpbHRlclZhbHVlKXsgZGVsZXRlIG9ialtrZXldOyB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuSG9vLmRlZmluZShcIkhvby5CYXNlXCIsIHtcclxuXHJcbiAgbGlzdGVuZXJzOiB7fSxcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHRoaXMuaW5pdExpc3RlbmVycygpO1xyXG5cclxuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG5cclxuXHJcblxyXG4gICAgdGhpcy5pbml0ZWQoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgaW5pdGVkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy/mnoTlu7rnm5HlkKxcclxuXHJcbiAgICB2YXIgc2NvcGUgPSB0aGlzLmxpc3RlbmVycy5zY29wZSB8fCB0aGlzLCBjYWxsYmFjaztcclxuXHJcbiAgICBmb3IgKHZhciBldmVudE5hbWUgaW4gdGhpcy5saXN0ZW5lcnMpIHtcclxuXHJcbiAgICAgIGlmIChldmVudE5hbWUgPT09ICdzY29wZScpIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgIGNhbGxiYWNrID0gdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXTtcclxuXHJcbiAgICAgIGlmICgodHlwZW9mIChjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIikpIHtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcnMoZXZlbnROYW1lLCBjYWxsYmFjaywgc2NvcGUpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgaW5pdExpc3RlbmVyczogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJTdGFjayA9IHt9O1xyXG5cclxuICB9LFxyXG5cclxuICBpbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdGhpcy5ldmVudHMgPSB7fTtcclxuXHJcbiAgfSxcclxuXHJcbiAgLyoqKiDmt7vliqDkuovku7YgKi9cclxuXHJcbiAgYWRkRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHBhcmFtID0gYXJndW1lbnRzWzBdO1xyXG5cclxuICAgIGlmICgodHlwZW9mIChwYXJhbSkgPT09IFwic3RyaW5nXCIpKSB7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50c1thcmd1bWVudHNbaV0udG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH0vKiBlbHNlIGlmIChIb28udXRpbC5PYmplY3QuaXNPYmplY3QocGFyYW0pKSB7XHJcblxyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW0pIHtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHNba2V5XS50b0xvd2VyQ2FzZSgpID0gdHJ1ZTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9Ki9cclxuXHJcbiAgfSxcclxuXHJcbiAgLy/mmoLkuI3lkK/nlKhcclxuXHJcbiAgYWRkRXZlbnQ6IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcclxuXHJcbiAgICBldmVudE5hbWUgPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdHJ1ZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgLy/mmoLkuI3lkK/nlKhcclxuXHJcbiAgcmVtb3ZlRXZlbnQ6IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcclxuXHJcbiAgICBldmVudE5hbWUgPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBkZWxldGUgdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcclxuXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcblxyXG4gICAqIOenu+mZpOS6i+S7tijmnKrlgZrmtYvor5UtLeW6lOivpeaYr+mUmeivr+eahC4pXHJcblxyXG4gICAqL1xyXG5cclxuICByZW1vdmVFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgcGFyYW0gPSBhcmd1bWVudHNbMF07XHJcblxyXG4gICAgaWYgKHR5cGVvZiBwYXJhbSA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnQoYXJndW1lbnRzW2ldLnRvTG93ZXJDYXNlKCkpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc09iamVjdChwYXJhbSkpIHtcclxuXHJcbiAgICAgIGZvciAodmFyIGtleSBpbiBwYXJhbSkgeyB0aGlzLnJlbW92ZUV2ZW50KGtleS50b0xvd2VyQ2FzZSgpKTsgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcblxyXG4gICAqIOinpuWPkeebkeWQrOS6i+S7tiDlvZPkuovku7bov5Tlm550cnVl5pe2LOS6i+S7tumTvuWBnOatouaJp+ihjFxyXG4gICAqIOWNszroi6XlnKjmn5DkupvlnLrmma/kuIsg5LiN5oOz57un57ut5b6A5LiL5omn6KGMLOWImeWbnuiwg+S4rei/lOWbnnRydWXljbPlj68uXHJcblxyXG4gICAqL1xyXG5cclxuICBmaXJlRXZlbnQ6IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcclxuXHJcbiAgICBldmVudE5hbWUgPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBpZiAodGhpcy5saXN0ZW5lclN0YWNrW2V2ZW50TmFtZV0pIHtcclxuXHJcbiAgICAgIHZhciBhcmdzID0gW10sIHN0YWNrQXJyID0gdGhpcy5saXN0ZW5lclN0YWNrW2V2ZW50TmFtZV0sIHN0YWNrO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykgeyBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTsgfVxyXG5cclxuICAgICAgdmFyIHJlcyA9IGZhbHNlO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0YWNrQXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblxyXG4gICAgICAgIC8v6L+Z6YeM5omn6KGM5ZCM5LiA5Liq55uR5ZCs55qE5aSa5qyh5Zue6LCDLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5cclxuICAgICAgICBzdGFjayA9IHN0YWNrQXJyW2ldO1xyXG5cclxuICAgICAgICByZXMgPSBzdGFjay5jYWxsYmFjay5hcHBseShzdGFjay5zY29wZSwgYXJncyk7XHJcblxyXG4gICAgICAgIGlmIChyZXMpIHsgYnJlYWs7IH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXM7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vdGhyb3cgbmV3IEVycm9yKCflkI3np7DkuLo6JyArIGV2ZW50TmFtZSArICfnmoTkuovku7bkuI3lrZjlnKjmiJbkuI3ooqvlhYHorrjvvIEnKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIG9uOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcblxyXG4gICAqIEBwYXJhbSB7U3RyaW5nL09iamVjdH0gZXZlbnROYW1lIOS6i+S7tuWQjeensCzlkIzml7bmlK/mjIF7feW9ouW8j1xyXG5cclxuICAgKi9cclxuXHJcbiAgYWRkTGlzdGVuZXJzOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYWxsYmFjaywgc2NvcGUpIHtcclxuXHJcbiAgICB2YXIgc3RhY2sgPSB0aGlzLmxpc3RlbmVyU3RhY2s7XHJcblxyXG4gICAgaWYgKEhvby51dGlsLk9iamVjdC5pc1N0cmluZyhldmVudE5hbWUpICYmIEhvby51dGlsLk9iamVjdC5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xyXG5cclxuICAgICAgZXZlbnROYW1lID0gZXZlbnROYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xyXG5cclxuICAgICAgICBpZiAoIXN0YWNrW2V2ZW50TmFtZV0pIHsgc3RhY2tbZXZlbnROYW1lXSA9IFtdOyB9XHJcblxyXG4gICAgICAgIHN0YWNrW2V2ZW50TmFtZV0ucHVzaCh7IGNhbGxiYWNrOiBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7IH0sIHNjb3BlOiBzY29wZSB8fCB0aGlzIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICBpZiAoY2FsbGJhY2spIHsgdGhyb3cgbmV3IEVycm9yKCfor6XlvaLlvI/kuI3mlK/mjIHlm57osIMhJyk7IHJldHVybjsgfVxyXG5cclxuICAgICAgdmFyIG1lID0gdGhpcywgb2JqID0gZXZlbnROYW1lLCBzY29wZSA9IG9ialsnc2NvcGUnXSB8fCB0aGlzO1xyXG5cclxuICAgICAgZGVsZXRlIG9ialsnc2NvcGUnXTtcclxuXHJcbiAgICAgIGZvciAodmFyIF9ldmVudE5hbWUgaW4gb2JqKSB7XHJcblxyXG4gICAgICAgIHZhciBldmVudE5hbWUgPSBfZXZlbnROYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XHJcblxyXG4gICAgICAgICAgaWYgKCFzdGFja1tldmVudE5hbWVdKSB7IHN0YWNrW2V2ZW50TmFtZV0gPSBbXTsgfVxyXG5cclxuICAgICAgICAgIHN0YWNrW2V2ZW50TmFtZV0ucHVzaCh7IGNhbGxiYWNrOiBvYmpbX2V2ZW50TmFtZV0gfHwgZnVuY3Rpb24gKCkgeyB9LCBzY29wZTogc2NvcGUgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nm5HlkKzkuI3ooqvlhYHorrhcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhvbzsiXX0=