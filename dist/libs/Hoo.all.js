"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        if (arguments.length == 2 && (typeof args === "undefined" ? "undefined" : _typeof(args)) == "object") {
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

Hoo.define('Hoo.util.Number', {
  statics: {
    /**
     * 数字千位符格式化
     * @param {Number} num
     * @param {Number} decimals 保留小数点后几位
     * @param {String} point 小数点符号,默认 '.'
     * @param {String} thousands_sep 千分位符号 默认 ','
     */
    format: function format(num, decimals, point, thousands_sep) {
      num = (num + '').replace(/[^0-9+-Ee.]/g, '');
      var n = !isFinite(+num) ? 0 : +num,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
          dec = typeof point === 'undefined' ? '.' : point,
          s = '',
          toFixedFix = function toFixedFix(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.ceil(n * k) / k;
      };

      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
      }

      if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
      }
      return s.join(dec);
    },
    /**
     * 随机生成[min,max)整数
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     */
    random: function random(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }
});
Hoo.define('Hoo.util.Array', {
  statics: {
    /**
     * 删除数组对应index位置的元素并返回新的数组
     */
    remove: function remove(array, index) {
      array.splice(index, 1);
    },
    removeObject: function removeObject(array, obj) {},
    each: function each(array, callback, scope) {
      for (var i = 0, len = array.length; i < len; i++) {
        var res = callback.call(scope || this, i, array[i]);
        if (typeof res != 'undefined' && res) {
          break;
        }
      }
    }
  }
});
(function () {
  var REG_MOBILE = '';
  var Arr = [],
      Brr = [];
  Arr['A'] = 1;Arr['B'] = 2;Arr['C'] = 3;Arr['D'] = 4;Arr['E'] = 5;Arr['F'] = 6;Arr['G'] = 7;Arr['H'] = 8;Arr['J'] = 1;Arr['K'] = 2;Arr['L'] = 3;Arr['M'] = 4;Arr['N'] = 5;Arr['P'] = 7;Arr['R'] = 9;Arr['S'] = 2;Arr['T'] = 3;Arr['U'] = 4;Arr['V'] = 5;Arr['W'] = 6;Arr['X'] = 7;Arr['Y'] = 8;Arr['Z'] = 9;Arr['1'] = 1;Arr['2'] = 2;Arr['3'] = 3;Arr['4'] = 4;Arr['5'] = 5;Arr['6'] = 6;Arr['7'] = 7;Arr['8'] = 8;Arr['9'] = 9;Arr['0'] = 0;Brr[1] = 8;Brr[2] = 7;Brr[3] = 6;Brr[4] = 5;Brr[5] = 4;Brr[6] = 3;Brr[7] = 2;Brr[8] = 10;Brr[9] = 0;Brr[10] = 9;Brr[11] = 8;Brr[12] = 7;Brr[13] = 6;Brr[14] = 5;Brr[15] = 4;Brr[16] = 3;Brr[17] = 2;

  Hoo.define('Hoo.util.Reg', {
    statics: {
      /*** 执行正则校验 */
      exec: function exec(reg, value) {
        if (typeof reg == 'undefined' || null == reg || typeof value == 'undefined') {
          return false;
        }
        reg = new RegExp(reg);
        return reg.test(value);
      },
      /*** 银行卡校验 */
      bankCard: function bankCard(cardNum) {
        if (cardNum.length < 16 || cardNum.length > 19) {
          return false;
        }
        var num = /^\d*$/; //全数字
        if (!num.exec(cardNum)) {
          return false;
        }
        //开头6位
        var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if (strBin.indexOf(cardNum.substring(0, 2)) == -1) {
          return false;
        }
        var lastNum = cardNum.substr(cardNum.length - 1, 1); //取出最后一位（与luhm进行比较）

        var first15Num = cardNum.substr(0, cardNum.length - 1); //前15或18位
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) {
          //前15或18位倒序存进数组
          newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array(); //奇数位*2的积 <9
        var arrJiShu2 = new Array(); //奇数位*2的积 >9

        var arrOuShu = new Array(); //偶数位数组
        for (var j = 0; j < newArr.length; j++) {
          if ((j + 1) % 2 == 1) {
            //奇数位
            if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);else arrJiShu2.push(parseInt(newArr[j]) * 2);
          } else //偶数位
            arrOuShu.push(newArr[j]);
        }

        var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
        for (var h = 0; h < arrJiShu2.length; h++) {
          jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
          jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }

        var sumJiShu = 0; //奇数位*2 < 9 的数组之和
        var sumOuShu = 0; //偶数位数组之和
        var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
          sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }

        for (var n = 0; n < arrOuShu.length; n++) {
          sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }

        for (var p = 0; p < jishu_child1.length; p++) {
          sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
          sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

        //计算Luhm值
        var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
        var luhm = 10 - k;

        return lastNum == luhm;
      },
      isNumber: function isNumber() {
        if (arguments.length == 0) {
          return false;
        }
        var flag = true,
            reg = /^[0-9]+.?[0-9]*$/,
            num;
        for (var i = 0, len = arguments.length; i < len; i++) {
          num = arguments[i];
          if (typeof num == 'undefined' || null == num || isNaN(Number(num))) {
            flag = false;break;
          }
          //if (typeof num == 'undefined' || null == num || !reg.test(num)) { flag = false; break; }
        }
        return flag;
      },
      /*** 统一社会信用代码 */
      creditCode: function creditCode(code) {
        if (typeof code == 'undefined' || Hoo.isEmpty(code) || code.length != 18) {
          return false;
        }
        var baseCode = "0123456789ABCDEFGHJKLMNPQRTUWXY",
            baseCodeArray = baseCode.split(""),
            codes = {};
        for (var i = 0; i < baseCode.length; i++) {
          codes[baseCodeArray[i]] = i;
        }
        var codeArray = code.split(""),
            check = codeArray[17];
        if (baseCode.indexOf(check) < 0) {
          return false;
        }
        var wi = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28],
            sum = 0;
        for (var i = 0; i < 17; i++) {
          var key = codeArray[i];
          if (baseCode.indexOf(key) == -1) {
            return false;
          }
          sum += codes[key] * wi[i];
        }
        var value = 31 - sum % 31;
        return value == codes[check];
      },
      /*** 邮箱校验 */
      email: function email(_email) {
        if (typeof _email == 'undefined' || null == _email) {
          return false;
        }
        var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        return reg.test(_email);
      },
      /*** 手机号校验 */
      mobile: function mobile(_mobile) {
        if (typeof _mobile == 'undefined' || null == _mobile) {
          return false;
        }
        var reg = /^1[3|4|5|7|8][0-9]{9}$/; // /^1[0-9]{10}$/
        return reg.test(_mobile);
      },
      /*** web URL 校验 */
      url: function url(str) {
        if (typeof str == 'undefined' || null == str) {
          return false;
        }
        return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
      },
      /*** 是否全为中文 */
      chinese: function chinese(str) {
        //var reg = /^[u4E00-u9FA5]+$/; 【是否包含中文】
        //return typeof str !== 'undefined' && null != str && !reg.test(str);
        if (typeof str == 'undefined' || null == str || '' == str) {
          return false;
        }
        var flag = true;
        for (var i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) <= 255) {
            flag = false;break;
          }
        }
        return flag;
      },
      /*** vin 检测 例： WP0AA2978BL012976 */
      vin: function vin(_vin) {
        var sKYZF = "ABCDEFGHJKLMNPRSTUVWXYZ1234567890";
        var sJYW = '';
        var bl = false;
        var blKYZF = false;
        if (_vin.length == 17) {
          var iJQS = 0,
              intTemp = 0,
              ht = Arr,
              htZM = Brr;
          try {
            _vin = _vin.toUpperCase();
            for (var i = 0; i < _vin.length; i++) {
              if (sKYZF.indexOf(_vin.substr(i, 1)) != -1) {
                blKYZF = true;
                iJQS = iJQS + parseInt(ht[_vin.substr(i, 1)]) * parseInt(htZM[i + 1]);
              } else {
                blKYZF = false;
                break;
              }
            }
            if (blKYZF) {
              intTemp = iJQS % 11;
              if (intTemp == 10) {
                sJYW = "X";
              } else {
                sJYW = intTemp.toString();
              }
              if (sJYW == _vin.substr(8, 1)) bl = true;
            } else {
              bl = false;
            }
          } catch (err) {
            bl = false;
          }
        }
        return bl;
      }
    }
  });

  Hoo.reg = Hoo.util.Reg;
})();

Hoo.define('Hoo.bridge.db', {
  statics: {}
});

(function () {

  //强制拷贝,非 fromSource 属性, 均不支持 copy
  function copyTo(fromSource, toSource) {
    if ((typeof fromSource === "undefined" ? "undefined" : _typeof(fromSource)) != 'object' || (typeof toSource === "undefined" ? "undefined" : _typeof(toSource)) != 'object') {
      return;
    }
    for (var key in fromSource) {
      if (typeof toSource[key] != 'undefined') {
        toSource[key] = fromSource[key];
      }
    }
    return toSource;
  }

  function isEmpty(obj) {
    var flag = true;
    for (var key in obj || {}) {
      flag = false;break;
    }
    return flag;
  }

  function WxStorageCache(options) {

    this.dfOptions = {
      defaultTimeout: 60 * 60 //最长保存时间 1 hour
      , prefix: '__cache_'

    };

    copyTo(options || {}, this.dfOptions);

    this._init();

    // interval 当定时器 监听到 内部无对象,则此时可以停止,直到重新put
    this._activeInterval();
  }

  WxStorageCache.prototype._init = function () {
    //内存缓存对象
    var that = this;
    this._map = window.AppCache || (window.AppCache = {}); //这里考虑到全局缓存对象,节省重复初始化开支
    this._interval = null;

    //TODO 初始化内存对象
    try {
      if (isEmpty(this._map)) {
        var res = wx.getStorageInfoSync(),
            keys = res.keys;
        for (var i = 0, len = keys.length; i < len; i++) {
          //TODO 判断属于缓存的
          if (key.indexOf(this.dfOptions.prefix) == 0) {
            var values = wx.getStorageSync(key);
            this._map[key] = values;
          }
        }
      }
    } catch (e) {}
  };

  //获取激活定时器[如果定时器处于销毁状态的话]
  WxStorageCache.prototype._activeInterval = function () {
    if (this._interval == null) {
      var that = this;
      this._map = window.AppCache;
      this._interval = setInterval(function () {
        //处理Map中过期的key,之后 给 remove 处理
        var delKeys = [],
            now = new Date().getTime();
        for (var key in that._map) {
          //获取值,根据expires 判断是否真实删除
          var values = that._map[key],
              expires = values.expires;
          if (expires != -1 && expires < now) {
            delKeys.push(key.substring(that.dfOptions.prefix.length));
          }
        }
        //执行异步删除操作【会不会引发同步问题】 -- 先同步
        if (delKeys.length > 0) {
          that.remove(delKeys);
        }
      }, 1000);
    }
  };

  //销毁定时器
  WxStorageCache.prototype._destoryInterval = function () {
    clearInterval(this._interval);
    this._interval = null;
  };

  /**
   * 设置缓存
   * @param {String} key   缓存KEY
   * @param {Object} value 缓存值
   * @param {Object} options 扩展配置属性
   *
   */
  WxStorageCache.prototype.put = function (key, value, options) {
    if (typeof value == 'undefined') {
      return;
    }
    this._activeInterval();

    var dfOpts = {
      scope: this,
      duration: this.dfOptions.defaultTimeout, //缓存时长 单位 : s
      success: function success() {},
      fail: function fail() {}
    },
        now = new Date().getTime();
    copyTo(options || {}, dfOpts);

    if (value == null) {
      this.remove(key, dfOpts.success, dfOpts.fail);
    }

    var newVal = {
      expires: dfOpts.duration < 0 ? -1 : now + dfOpts.duration * 1000, // -1 不限制时间
      value: value
    };

    key = this.dfOptions.prefix + key;
    this._map = window.AppCache;
    try {
      this._map[key] = newVal;
      wx.setStorageSync(key, newVal);
      dfOpts.success.call(dfOpts.scope);
    } catch (e) {
      dfOpts.fail.call(dfOpts.scope, e.message || '发送错误');
    }
  };

  /**
   * 是否包含未过期的值
   * @param {String} key 缓存KEY
   */
  WxStorageCache.prototype.contains = function (key) {
    this._map = window.AppCache;
    key = this.dfOptions.prefix + key;
    var values = this._map[key];
    if (typeof values !== 'undefined') {
      var expires = values.expires,
          now = new Date().getTime(),
          value = values.value;
      if (expires != -1 && expires < now) {
        value = null;
      }
      return value != null;
    }
    return false;
  };

  /**
   * 获取缓存值
   */
  WxStorageCache.prototype.get = function (key, options) {
    this._map = window.AppCache;
    var _key = this.dfOptions.prefix + key;
    var values = this._map[_key],
        dfOpts = {
      remove: false, //获取值后,立即移除
      success: function success() {},
      fail: function fail() {},
      scope: this
    };
    copyTo(options || {}, dfOpts);

    if (typeof values !== 'undefined') {
      var expires = values.expires,
          now = new Date().getTime(),
          value = values.value;
      if (expires != -1 && expires < now) {
        value = null;
      }
      if (value == null) {
        dfOpts.fail.call(dfOpts.scope, '缓存不存在');
      } else {
        if (dfOpts.remove) {
          this.remove({ key: key });
        } //自动删除前置
        dfOpts.success.call(dfOpts.scope, value);
      }
    }
    // wx.getStorage(key);
  };

  /**
   * 移除 key 对应的缓存值
   */
  WxStorageCache.prototype.remove = function (options) {
    var dfOpts = {
      key: '',
      success: function success() {},
      fail: function fail() {},
      scope: this
    },
        that = this;
    if (typeof options == 'string' || options instanceof Array) {
      dfOpts.key = options;
    } else {
      copyTo(options || {}, dfOpts);
    }

    var key = dfOpts.key;
    this._map = window.AppCache;
    if (typeof key === 'string') {
      key = this.dfOptions.prefix + key;
      delete this._map[key];
      try {
        wx.removeStorageSync(key);
        dfOpts.success.call(dfOpts.scope, key); //回调
      } catch (e) {
        console.log(e);
        dfOpts.fail.call(dfOpts.scope, e.message || '发送错误');
      }
    } else if (key instanceof Array) {
      try {
        for (var i = 0, len = key.length; i < len; i++) {
          var k = key[i];
          k = this.dfOptions.prefix + k;
          delete this._map[k]; //循环执行删除
          wx.removeStorageSync(k);
        }
        dfOpts.success.call(dfOpts.scope, key);
      } catch (e) {
        dfOpts.fail.call(dfOpts.scope, e.message || '发送错误');
      }
    } else {
      throw 'key传参类型有误';
    }
  };

  /**
   * 清除所有缓存
   */
  WxStorageCache.prototype.clear = function (success, fail) {

    try {
      var clearKeys = [];
      for (var key in this._map) {
        if (key.indexOf(this.dfOptions.prefix) == 0) {
          clearKeys.push(key.substring(this.dfOptions.prefix.length));
        }
      }

      this._map = window.AppCache = {};
      this._destoryInterval();

      if (clearKeys.length > 0) {
        this.remove(clearKeys, success || function () {}, fail || function () {});
      } else {
        typeof success == 'function' && success();
      }
    } catch (e) {
      typeof fail == 'function' && fail();
    }
  };

  /**
   * 删除所有过期的值
   */
  WxStorageCache.prototype.deleteAllExpires = function (success, fail) {
    this._map = window.AppCache;
    //处理Map中过期的key,之后 给 remove 处理
    var delKeys = [],
        now = new Date().getTime();
    for (var key in this._map) {
      var values = this._map[key],
          expires = values.expires;
      if (expires != -1 && expires < now) {
        //获取值,根据expires 判断是否真实删除
        delKeys.push(key.substring(this.dfOptions.prefix.length));
      }
    }

    if (delKeys.length > 0) {
      this.remove(delKeys, success || function () {}, fail || function () {});
    } else {
      typeof success == 'function' && success();
    }
  };

  Hoo.define('Hoo.util.Cache', {
    statics: new WxStorageCache()
  });
})();

var timeago = require('./../npm/timeago.js/dist/timeago.min.js');
var ta = timeago();
Hoo.define('Hoo.util.Date', {
  statics: {
    format: function format(date, pattern) {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(),
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      },
          fmt = pattern || 'yyyy-MM-dd HH:mm:ss';
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }return fmt;
    },
    timeago: function timeago(date) {
      return ta.format(date, 'zh_CN');
    }
  }
});

Hoo.date = Hoo.util.Date;

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
  }, "replace", function replace(cfg) {})
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

Hoo.apply(Hoo.bridge.db, {});

Hoo.apply(Hoo.bridge.storage, {
  putItem: function putItem(key, value, callback, scope) {
    try {
      wx.setStorageSync(key, value);
      if (callback) {
        callback.call(scope || this);
      }
    } catch (e) {}
  },
  getItem: function getItem(key, callback, scope) {
    var value = null;
    try {
      value = wx.getStorageSync(key);
      if (typeof value == 'undefined') {
        value = null;
      }
    } catch (e) {
      value = null;
    }

    if (callback) {
      callback.call(scope || this, value);
    }
  },
  removeItem: function removeItem(key) {
    try {
      wx.removeStorageSync(key);
    } catch (e) {}
  },
  clear: function clear() {
    try {
      wx.clearStorageSync();
    } catch (e) {}
  }
});

Hoo.apply(Hoo.bridge.doc, {
  setTitle: function setTitle(cfg) {
    if (typeof cfg == 'string') {
      cfg = { title: cfg };
    }
    wx.setNavigationBarTitle(cfg);
  }
});

Hoo.apply(Hoo.bridge.widget, {
  toast: function toast() {},
  tip: {
    error: function error(cfg) {
      if (typeof cfg === 'undefined') {
        return;
      }
      if (typeof cfg === 'string') {
        cfg = { title: cfg };
      }
      var url = getApp().getCurrentUrl(),
          prefix = '',
          dfCfg = { image: 'res/image/icons/error.png' };
      for (var i = 0, len = url.split('/').length - 1; i < len; i++) {
        prefix += '../';
      }
      dfCfg.image = prefix + dfCfg.image;
      Hoo.copyTo(cfg, dfCfg);

      wx.showToast(dfCfg);
    },
    warning: function warning(cfg) {},
    success: function success(cfg) {
      if (typeof cfg === 'undefined') {
        return;
      }
      if (typeof cfg === 'string') {
        cfg = { title: cfg };
      }
      if (typeof cfg.msg == 'string') {
        cfg.title = cfg.msg;
      }

      var dfCfg = { icon: 'success', duration: 1500, afterShow: function afterShow() {}, scope: this };
      Hoo.copyTo(cfg, dfCfg);

      wx.showToast(dfCfg);
      if (dfCfg.duration > 0) {
        setTimeout(function () {
          dfCfg.afterShow.call(dfCfg.scope);
        }, dfCfg.duration);
      }
    }
  },
  alert: function alert(cfg) {
    if (typeof cfg == 'undefined') {
      return;
    }
    if (typeof cfg == 'string') {
      cfg = { content: cfg };
    }
    if (typeof cfg.msg == 'string') {
      cfg.content = cfg.msg;
    }
    var dfCfg = {
      title: '提示',
      content: '',
      showCancel: false,
      success: function success() {},
      fail: function fail() {}
    };
    Hoo.copyTo(cfg || {}, dfCfg);

    wx.showModal(dfCfg);
  },
  confirm: function confirm(cfg) {
    if (typeof cfg == 'undefined') {
      return;
    }
    if (typeof cfg == 'string') {
      cfg = { content: cfg };
    }
    var dfCfg = {
      title: '请选择',
      content: '',
      showCancel: true,
      success: function success() {},
      fail: function fail() {},
      scope: this
    };
    Hoo.copyTo(cfg || {}, dfCfg);
    var success = dfCfg.success,
        scope = dfCfg.scope;
    dfCfg.success = function (res) {
      if (res.confirm) {
        success.call(scope);
      } else {
        dfCfg.fail.call(scope);
      }
    };
    delete dfCfg.scope;
    wx.showModal(dfCfg);
  },
  actionSheet: function actionSheet(cfg) {
    if ((typeof cfg === "undefined" ? "undefined" : _typeof(cfg)) !== 'object') {
      return;
    }
    var dfCfg = {
      items: [], // 默认属性格式  { label : '', ex : ''}
      success: function success(index, item) {},
      fail: function fail() {},
      scope: this
    };
    Hoo.copyTo(cfg || {}, dfCfg);
    var items = dfCfg.items,
        item = items.length > 0 ? items[0] : null,
        labels = [];
    if (item == null) {
      return;
    }
    if ((typeof item === "undefined" ? "undefined" : _typeof(item)) == 'object') {
      items.map(function (item) {
        labels.push(item.label || '');
      });
    } else {
      labels = [].concat(items);
    }

    wx.showActionSheet({
      itemList: labels,
      success: function success(res) {
        if (res.cancel) {
          dfCfg.fail.call(dfCfg.scope);
        } else {
          dfCfg.success.call(dfCfg.scope, res.tapIndex, dfCfg.items[res.tapIndex]);
        }
      }
    });
  }
});

Hoo.apply(Hoo.bridge.location, _defineProperty({
  href: function href(cfg) {
    if (typeof cfg == 'string') {
      cfg = { url: cfg };
    }
    var dfCfg = { url: '', params: {} };
    Hoo.copyTo(cfg, dfCfg);
    if (!Hoo.isEmpty(dfCfg.params)) {
      var url = dfCfg.url + '?',
          params = [];
      for (var key in dfCfg.params) {
        var value = dfCfg.params[key];
        if (value == null) {
          continue;
        } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
          value = JSON.stringify(value);
        }
        params.push(key + '=' + value);
      }
      url += params.join('&');
      delete dfCfg.params;
      dfCfg.url = url;
    }
    wx.navigateTo(dfCfg);
  },
  replace: function replace() {},
  //支持页面跳转
  redirect: function redirect(cfg) {
    if (typeof cfg == 'string') {
      cfg = { url: cfg };
    }
    var dfCfg = { url: '', params: {} };
    Hoo.copyTo(cfg, dfCfg);
    if (!Hoo.isEmpty(dfCfg.params)) {
      var url = dfCfg.url + '?',
          params = [];
      for (var key in dfCfg.params) {
        var value = dfCfg.params[key];
        if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
          value = JSON.stringify(value);
        }
        params.push(key + '=' + value);
      }
      url += params.join('&');
      delete dfCfg.params;
      dfCfg.url = url;
    }
    wx.redirectTo(dfCfg);
  },
  //支持根据路由「app.json配置文件」 返回到 指定路由界面
  back: function back() {
    //关于back值回传解决思路： 返回前 获取上一级 page, 通过调用 通用自定义通用函数[建议] 或 setData方式操作[默认支持]
    var delta = typeof arguments[0] == 'undefined' ? 1 : arguments[0];
    if (typeof delta == 'number') {
      wx.navigateBack({ delta: delta });
    } else if (typeof delta == 'string') {
      // route 支持
      var pages = getCurrentPages(),
          total = pages.length,
          copy = pages.concat().reverse(),
          index = -1;
      for (var i = 0; i < total; i++) {
        var page = copy[i];
        if (page.route == delta) {
          index = i;break;
        }
      }
      wx.navigateBack({
        delta: index == -1 ? total + 1 : index
      });
    }
    /* 暂不支持，另外小程序限制,返回 tabBar页面,需要强制 length 大于当前栈即可
    else if (typeof delta == 'object'){}*/
  }
}, "replace", function replace(cfg) {}));

Hoo.apply(Hoo.bridge.net, {
  //basePath: 'http://192.168.1.149:8080/IMS/', //TODO 原则上，不允许直接更改该值
  setBasePath: function setBasePath(basePath) {
    Hoo.bridge.net.basePath = basePath;
  },
  upload: function upload(cfg) {
    var dfCfg = {
      url: '',
      basePath: Hoo.bridge.net.basePath,
      data: {},
      name: 'file',
      path: '',
      onProgress: function onProgress(res) {},
      success: function success(data, response) {},
      fail: function fail(code, msg) {},
      complete: function complete() {},
      scope: this
    },
        header = { 'content-type': 'multipart/form-data' },
        pages = getCurrentPages(),
        page = pages[pages.length - 1];
    Hoo.copyTo(cfg || {}, dfCfg);

    var token = wx.getStorageSync('login_token');
    if (token != null && '' != token) {
      header['MINI-TOKEN'] = token;
    }

    //TODO 汉字 encodeURL 或 encodeURIComponent 的问题
    var uploadTask = wx.uploadFile({
      url: (dfCfg.basePath || '') + dfCfg.url,
      filePath: dfCfg.path,
      name: dfCfg.name || 'file',
      formData: dfCfg.data || {},
      header: header,
      success: function success(res) {
        if (res.statusCode = 200) {
          var data = res.data; //响应原数据
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch (e) {}
          }
          if (data.code == 0 || data.code == '0' || data.code == '200') {
            // 200为了兼容nodejs api
            dfCfg.success.call(dfCfg.scope, data.data, data);
          } else {
            dfCfg.fail.call(dfCfg.scope, '' + data.code, data.msg);
          }
        } else {
          dfCfg.fail.call(dfCfg.scope, '' + res.statusCode, res.errMsg);
        }
      },
      fail: function fail(res) {
        dfCfg.fail.call(dfCfg.scope, '500', res.errMsg);
      },
      complete: function complete() {
        dfCfg.complete.apply(dfCfg.scope, arguments);
      }
    });
    uploadTask.onProgressUpdate(function (res) {
      dfCfg.onProgress.call(dfCfg.scope, {
        progress: res.progress,
        sendBytes: res.totalBytesSent,
        totalBytes: res.totalBytesExpectedToSend
      });
    });
    if (page.addListener) {
      page.addListener('beforeUnload', function () {
        try {
          uploadTask.abort();
        } catch (e) {}
      });
    }
    return {
      cancel: function cancel() {
        try {
          uploadTask.abort();
        } catch (e) {} // 取消上传任务
      }
    };
  },
  post: function post(cfg) {
    // TODO 由于微信小程序C/S特点,故而在这里需检测 用户登录状态、获取用户open_id 发送服务器获取3rdsession,供服务器判别当前用户
    //开启缓存 chache : true / cache : { enable : true , timeout : '缓存时长' , forceRefresh : false }
    var dfCache = {
      enable: false, //是否开启缓存
      forceRefresh: false, //是否强制新的请求
      timeout: 60 * 30 //缓存 30 分钟
    },
        dfCfg = {
      url: '',
      basePath: Hoo.bridge.net.basePath,
      data: {},
      success: function success(data, response) {},
      fail: function fail(code, msg) {},
      complete: function complete() {},
      scope: this,
      cache: false,
      showToast: true,
      loading: false,
      // image    : '../../res/image/icons/error.png',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },
        pages = getCurrentPages(),
        page = pages[pages.length - 1];
    // header = { 'Content-Type':  'application/json' };
    Hoo.copyTo(cfg || {}, dfCfg);
    if (dfCfg.showToast) {
      wx.hideLoading();
    }
    var header = dfCfg.header;

    var token = wx.getStorageSync('login_token');
    if (token != null && '' != token) {
      header['MINI-TOKEN'] = token;
    }

    if (dfCfg.loading) {
      wx.hideLoading();wx.showLoading({ title: '加载中' });
    }

    //TODO 缓存处理
    var cache = dfCfg.cache;
    if (typeof cache == 'boolean') {
      dfCache.enable = cache;
    } else if ((typeof cache === "undefined" ? "undefined" : _typeof(cache)) == 'object') {
      Hoo.copyTo(cache, dfCache);
    }
    dfCfg.cache = dfCache;

    var enacleCache = dfCfg.cache.enable,
        key = (dfCfg.basePath || '') + dfCfg.url + (_typeof(dfCfg.data) == 'object' ? JSON.stringify(dfCfg.data) : dfCfg.data);
    if (!dfCfg.cache.forceRefresh && enacleCache && Hoo.util.Cache.contains(key)) {
      Hoo.util.Cache.get(key, {
        success: function success(data) {
          dfCfg.success.call(dfCfg.scope, data.data, data);
          if (dfCfg.loading) {
            wx.hideLoading();
          }
        }
      });
      return;
    }

    var requestTask = wx.request({
      url: (dfCfg.basePath || '') + dfCfg.url,
      data: dfCfg.data || {},
      header: header,
      method: 'POST',
      success: function success(res) {
        if (res.statusCode = 200) {
          var data = res.data; //响应原数据
          //TODO 根据数据格式进行数据分发,如果业务逻辑正常 & 如果业务逻辑失败
          //if (dfCfg.showToast) { wx.showToast({ title: '请求成功', icon: 'success', duration: 1500 }); }
          if (dfCfg.loading) {
            wx.hideLoading();
          }

          if (data.code == 0 || data.code == '0' || data.code == '200') {
            // 200为了兼容nodejs api
            dfCfg.success.call(dfCfg.scope, data.data, data);
            if (enacleCache && data.data != null) {
              Hoo.util.Cache.put(key, data);
            } //TODO 设置缓存数据为  成功时实际响应值
          } else {
            if (dfCfg.showToast) {
              if (typeof data.code == 'undefined') {
                Hoo.bridge.widget.alert('登录失效,请退出并重新进入');return;
              }
              Hoo.bridge.widget.tip.error(data.msg || '请求异常(错误码:' + data.code + ')');
            }
            dfCfg.fail.call(dfCfg.scope, '' + data.code, data.msg);
          }
        } else {
          if (dfCfg.showToast) {
            Hoo.bridge.widget.tip.error(res.msg || '请求异常');
          }
          dfCfg.fail.call(dfCfg.scope, '' + res.statusCode, res.msg);
        }
      },
      fail: function fail(res) {
        if (dfCfg.loading) {
          wx.hideLoading();
        }
        if (dfCfg.showToast) {
          Hoo.bridge.widget.tip.error(res.msg || '请求异常');
        }
        dfCfg.fail.call(dfCfg.scope, '500', res.msg);
      },
      complete: function complete() {
        dfCfg.complete.apply(dfCfg.scope, arguments);
      }
    });
    if (page.addListener) {
      page.addListener('beforeUnload', function () {
        try {
          uploadTask.abort();
        } catch (e) {}
      });
    }
    return {
      cancel: function cancel() {
        try {
          requestTask.abort();
        } catch (e) {} // 取消请求任务
      }
    };
  },
  'get': function get(cfg) {
    /*data  : {},
      method: 'GET',
      header: { 'Accept': 'application/json' }*/
  },
  download: function download(cfg) {}
});

Hoo.apply(Hoo.bridge.media, {
  chooseImage: function chooseImage(cfg) {
    var dfCfg = {
      count: 0,
      success: function success(res) {},
      fail: function fail(code, msg) {},
      scope: this
    };
    Hoo.copyTo(cfg, dfCfg);

    wx.chooseImage({
      count: dfCfg.count,
      success: function success(res) {
        var result = {
          filePaths: res.tempFilePaths,
          files: res.tempFiles
        };
        if (result.filePaths.length == 1) {
          result.filePath = result.filePaths[0];
          result.file = result.files[0];
        }
        dfCfg.success.call(dfCfg.scope, result);
      },
      fail: function fail() {
        var code = 999,
            msg = '操作发生异常';
        dfCfg.fail.call(dfCfg.scope, code, msg);
      }
    });
  }
});

Hoo.apply(Hoo.bridge.device, {
  scanCode: function scanCode(cfg) {
    var dfCfg = {
      success: function success() {},
      fail: function fail() {},
      scope: this
    };
    Hoo.copyTo(cfg, dfCfg);

    wx.scanCode({
      success: function success(res) {
        dfCfg.success.call(dfCfg.scope, {
          content: res.result, //扫码内容
          scanType: res.scanType //扫码类型, CODE_128 、 QR_CODE
        });
      },
      fail: function fail() {
        var code = 999,
            msg = '操作发生异常';
        dfCfg.fail.call(dfCfg.scope, code, msg);
      }
    });
  }
});

Hoo.hybrid = Hoo.bridge; //TODO 兼容系统原有代码

var wx = {
  setStorage: Hoo.bridge.storage.putItem
};

Hoo.copyTo(wx, window.Hoo);

// Hoo.setStorage();

module.exports = window.Hoo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhvby5hbGwuanMiXSwibmFtZXMiOlsid2luZG93IiwiZ2V0QXBwIiwiSG9vIiwiX19uYW1lU3BhY2VNYXAiLCJvYmplY3RQcm90b3R5cGUiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGxPdmVycmlkZVBhcmVudCIsIm1ldGhvZCIsImNhbGxlciIsIiRvd25lciIsIiRuYW1lIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJtIiwiQ29yZSIsIiRpc0NsYXNzIiwiJGNsYXNzTmFtZSIsIiRzdXBlckNsYXNzIiwiYWxpYXMiLCJjYWxsUGFyZW50IiwiZSIsIiRjbGFzcyIsInN1cGVyQ2xzUHJvdG90eXBlIiwibWV0aG9kTmFtZSIsImNhbGwiLCJuYW1lIiwiYXJncyIsImNscyIsIiQkY2xhc3NOYW1lIiwiX19wcm90b19fIiwiY29uc3RydWN0b3IiLCJmbiIsImNhbGxTdXBlciIsIl9hcmdzIiwiaSIsImxlbiIsImxlbmd0aCIsInB1c2giLCJFcnJvciIsIm9iaiIsImNmZyIsImRlZmF1bHRzIiwia2V5IiwiaWRTZWVkIiwiZGVidWdNb2RlbCIsInNldFBhdGgiLCJnZXROYW1lU3BhY2VzIiwiYXJyIiwiaXNIYXZlTmFtZVNwYWNlIiwibmFtZVNwYWNlIiwiZXZhbCIsIm5zIiwiZW1wdHlGbiIsInMyYyIsImNsc1VybCIsInNwbGl0IiwiY2xhenoiLCJhcHBseUlmIiwicHJvIiwiY29weVRvIiwib3JpZ24iLCJ0byIsImRlZmluZSIsImNsc05hbWVVcmwiLCJuYW1lcyIsInN0YXRpY3MiLCJleHRlbmRDbHNVcmwiLCJleHRlbmRDbHMiLCJGIiwiaW5pdCIsInYiLCJjcmVhdGUiLCJkYXRhIiwiQ2xzIiwidGVtcEZuIiwib25DcmVhdGUiLCJnZXRJZCIsImlkIiwibm9kZVR5cGUiLCJjbG9uZSIsIm8iLCJBcnJheSIsImoiLCJub2RlIiwidGFnIiwiaXNFbXB0eSIsInRyaW0iLCJmbGFnIiwiaXNFcXVhbHMiLCJ4IiwieSIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsImVxdWFscyIsImZpbHRlciIsImZpbHRlclZhbHVlIiwibGlzdGVuZXJzIiwiaW5pdExpc3RlbmVycyIsImluaXRFdmVudHMiLCJpbml0ZWQiLCJzY29wZSIsImNhbGxiYWNrIiwiZXZlbnROYW1lIiwiYWRkTGlzdGVuZXJzIiwibGlzdGVuZXJTdGFjayIsImV2ZW50cyIsImFkZEV2ZW50cyIsInBhcmFtIiwidG9Mb3dlckNhc2UiLCJhZGRFdmVudCIsInJlbW92ZUV2ZW50IiwicmVtb3ZlRXZlbnRzIiwiaXNPYmplY3QiLCJmaXJlRXZlbnQiLCJzdGFja0FyciIsInN0YWNrIiwicmVzIiwib24iLCJ1dGlsIiwiaXNTdHJpbmciLCJpc0Z1bmN0aW9uIiwibWUiLCJfZXZlbnROYW1lIiwiZm10TW9iaWxlIiwibW9iaWxlIiwic3Vic3RyaW5nIiwiZm10SURDYXJkIiwiZm10RW1haWwiLCJlbWFpbCIsImluZGV4IiwiaW5kZXhPZiIsImZtdFFRIiwicXEiLCJmb3JtYXQiLCJyZXN1bHQiLCJ1bmRlZmluZWQiLCJyZWciLCJSZWdFeHAiLCJyZXBsYWNlIiwic3RyaW5nIiwiU3RyaW5nIiwibnVtIiwiZGVjaW1hbHMiLCJwb2ludCIsInRob3VzYW5kc19zZXAiLCJuIiwiaXNGaW5pdGUiLCJwcmVjIiwiTWF0aCIsImFicyIsInNlcCIsImRlYyIsInMiLCJ0b0ZpeGVkRml4IiwiayIsInBvdyIsImNlaWwiLCJyb3VuZCIsInJlIiwidGVzdCIsImpvaW4iLCJyYW5kb20iLCJtaW4iLCJtYXgiLCJmbG9vciIsInJlbW92ZSIsImFycmF5Iiwic3BsaWNlIiwicmVtb3ZlT2JqZWN0IiwiZWFjaCIsIlJFR19NT0JJTEUiLCJBcnIiLCJCcnIiLCJleGVjIiwidmFsdWUiLCJiYW5rQ2FyZCIsImNhcmROdW0iLCJzdHJCaW4iLCJsYXN0TnVtIiwic3Vic3RyIiwiZmlyc3QxNU51bSIsIm5ld0FyciIsImFyckppU2h1IiwiYXJySmlTaHUyIiwiYXJyT3VTaHUiLCJwYXJzZUludCIsImppc2h1X2NoaWxkMSIsImppc2h1X2NoaWxkMiIsImgiLCJzdW1KaVNodSIsInN1bU91U2h1Iiwic3VtSmlTaHVDaGlsZDEiLCJzdW1KaVNodUNoaWxkMiIsInN1bVRvdGFsIiwibHVobSIsImlzTnVtYmVyIiwiaXNOYU4iLCJOdW1iZXIiLCJjcmVkaXRDb2RlIiwiY29kZSIsImJhc2VDb2RlIiwiYmFzZUNvZGVBcnJheSIsImNvZGVzIiwiY29kZUFycmF5IiwiY2hlY2siLCJ3aSIsInN1bSIsInVybCIsInN0ciIsIm1hdGNoIiwiY2hpbmVzZSIsImNoYXJDb2RlQXQiLCJ2aW4iLCJzS1laRiIsInNKWVciLCJibCIsImJsS1laRiIsImlKUVMiLCJpbnRUZW1wIiwiaHQiLCJodFpNIiwidG9VcHBlckNhc2UiLCJlcnIiLCJSZWciLCJmcm9tU291cmNlIiwidG9Tb3VyY2UiLCJXeFN0b3JhZ2VDYWNoZSIsIm9wdGlvbnMiLCJkZk9wdGlvbnMiLCJkZWZhdWx0VGltZW91dCIsInByZWZpeCIsIl9pbml0IiwiX2FjdGl2ZUludGVydmFsIiwidGhhdCIsIl9tYXAiLCJBcHBDYWNoZSIsIl9pbnRlcnZhbCIsInd4IiwiZ2V0U3RvcmFnZUluZm9TeW5jIiwia2V5cyIsInZhbHVlcyIsImdldFN0b3JhZ2VTeW5jIiwic2V0SW50ZXJ2YWwiLCJkZWxLZXlzIiwibm93IiwiRGF0ZSIsImdldFRpbWUiLCJleHBpcmVzIiwiX2Rlc3RvcnlJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJwdXQiLCJkZk9wdHMiLCJkdXJhdGlvbiIsInN1Y2Nlc3MiLCJmYWlsIiwibmV3VmFsIiwic2V0U3RvcmFnZVN5bmMiLCJtZXNzYWdlIiwiY29udGFpbnMiLCJnZXQiLCJfa2V5IiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJjb25zb2xlIiwibG9nIiwiY2xlYXIiLCJjbGVhcktleXMiLCJkZWxldGVBbGxFeHBpcmVzIiwidGltZWFnbyIsInJlcXVpcmUiLCJ0YSIsImRhdGUiLCJwYXR0ZXJuIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsImdldE1pbGxpc2Vjb25kcyIsImZtdCIsIiQxIiwiZ2V0RnVsbFllYXIiLCJwdXRJdGVtIiwiZ2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJzZXRUaXRsZSIsInRvYXN0IiwidGlwIiwiZXJyb3IiLCJ3YXJuaW5nIiwiYWxlcnQiLCJjb25maXJtIiwiYWN0aW9uU2hlZXQiLCJocmVmIiwicmVkaXJlY3QiLCJiYWNrIiwiYmFzZVBhdGgiLCJzZXRCYXNlUGF0aCIsInVwbG9hZCIsInBvc3QiLCJkb3dubG9hZCIsImNob29zZUltYWdlIiwic2NhbkNvZGUiLCJicmlkZ2UiLCJkYiIsInN0b3JhZ2UiLCJjbGVhclN0b3JhZ2VTeW5jIiwiZG9jIiwidGl0bGUiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ3aWRnZXQiLCJnZXRDdXJyZW50VXJsIiwiZGZDZmciLCJpbWFnZSIsInNob3dUb2FzdCIsIm1zZyIsImljb24iLCJhZnRlclNob3ciLCJzZXRUaW1lb3V0IiwiY29udGVudCIsInNob3dDYW5jZWwiLCJzaG93TW9kYWwiLCJpdGVtcyIsIml0ZW0iLCJsYWJlbHMiLCJtYXAiLCJsYWJlbCIsImNvbmNhdCIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0IiwiY2FuY2VsIiwidGFwSW5kZXgiLCJsb2NhdGlvbiIsInBhcmFtcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJuYXZpZ2F0ZVRvIiwicmVkaXJlY3RUbyIsImRlbHRhIiwibmF2aWdhdGVCYWNrIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJ0b3RhbCIsImNvcHkiLCJyZXZlcnNlIiwicGFnZSIsInJvdXRlIiwibmV0IiwicGF0aCIsIm9uUHJvZ3Jlc3MiLCJyZXNwb25zZSIsImNvbXBsZXRlIiwiaGVhZGVyIiwidG9rZW4iLCJ1cGxvYWRUYXNrIiwidXBsb2FkRmlsZSIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJzdGF0dXNDb2RlIiwicGFyc2UiLCJlcnJNc2ciLCJvblByb2dyZXNzVXBkYXRlIiwicHJvZ3Jlc3MiLCJzZW5kQnl0ZXMiLCJ0b3RhbEJ5dGVzU2VudCIsInRvdGFsQnl0ZXMiLCJ0b3RhbEJ5dGVzRXhwZWN0ZWRUb1NlbmQiLCJhZGRMaXN0ZW5lciIsImFib3J0IiwiZGZDYWNoZSIsImVuYWJsZSIsImZvcmNlUmVmcmVzaCIsInRpbWVvdXQiLCJjYWNoZSIsImxvYWRpbmciLCJoaWRlTG9hZGluZyIsInNob3dMb2FkaW5nIiwiZW5hY2xlQ2FjaGUiLCJDYWNoZSIsInJlcXVlc3RUYXNrIiwicmVxdWVzdCIsIm1lZGlhIiwiY291bnQiLCJmaWxlUGF0aHMiLCJ0ZW1wRmlsZVBhdGhzIiwiZmlsZXMiLCJ0ZW1wRmlsZXMiLCJmaWxlIiwiZGV2aWNlIiwic2NhblR5cGUiLCJoeWJyaWQiLCJzZXRTdG9yYWdlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBSSxPQUFPQSxNQUFQLElBQWlCLFdBQXJCLEVBQWtDO0FBQUVBLFdBQVNDLFFBQVQ7QUFBb0I7O0FBRXhELElBQUlDLE1BQU1GLE9BQU9FLEdBQVAsS0FBZUYsT0FBT0UsR0FBUCxHQUFhLEVBQTVCLENBQVY7O0FBRUEsSUFBSUMsaUJBQWlCLEVBQXJCO0FBQUEsSUFFRUMsa0JBQWtCQyxPQUFPQyxTQUYzQjtBQUFBLElBSUVDLFdBQVdILGdCQUFnQkcsUUFKN0I7QUFBQSxJQU1FQyxxQkFBcUIsU0FBckJBLGtCQUFxQixHQUFZO0FBQUM7O0FBRWhDLE1BQUlDLFNBQVNELG1CQUFtQkUsTUFBbkIsQ0FBMEJBLE1BQXZDOztBQUVBLFNBQU9ELE9BQU9FLE1BQVAsQ0FBY0wsU0FBZCxDQUF3QkcsT0FBT0csS0FBL0IsRUFBc0NDLEtBQXRDLENBQTRDLElBQTVDLEVBQWtEQyxTQUFsRCxDQUFQO0FBRUQsQ0FaSDtBQUFBLElBY0VDLElBQUlaLGlCQUFpQixFQUFFLE9BQU8sSUFBVCxFQWR2Qjs7QUFpQkFELElBQUljLElBQUosR0FBVyxZQUFZLENBQUcsQ0FBMUI7O0FBRUE7O0FBRUFkLElBQUljLElBQUos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QVgsQ0FBYUEsSUFBSSxHQUFKLElBQVcsQ0FBWCxDQUFhQSxJQUFJLEdBQUosSUFBVyxDQUFYLENBQWFBLElBQUksR0FBSixJQUFXLENBQVgsQ0FBYUEsSUFBSSxHQUFKLElBQVcsQ0FBWCxDQUFhQSxJQUFJLEdBQUosSUFBVyxDQUFYLENBQWFBLElBQUksR0FBSixJQUFXLENBQVgsQ0FBYUEsSUFBSSxHQUFKLElBQVcsQ0FBWCxDQUFhQSxJQUFJLEdBQUosSUFBVyxDQUFYLENBQWFBLElBQUksR0FBSixJQUFXLENBQVgsQ0FBYUEsSUFBSSxHQUFKLElBQVcsQ0FBWCxDQUFhQSxJQUFJLEdBQUosSUFBVyxDQUFYLENBQWFBLElBQUksR0FBSixJQUFXLENBQVgsQ0FBYUEsSUFBSSxHQUFKLElBQVcsQ0FBWCxDQUFhQSxJQUFJLEdBQUosSUFBVyxDQUFYLENBQWFBLElBQUksR0FBSixJQUFXLENBQVgsQ0FBYUEsSUFBSSxHQUFKLElBQVcsQ0FBWCxDQUFhQSxJQUFJLEdBQUosSUFBVyxDQUFYLENBQWFBLElBQUksR0FBSixJQUFXLENBQVgsQ0FBYUEsSUFBSSxHQUFKLElBQVcsQ0FBWCxDQUFhQSxJQUFJLEdBQUosSUFBVyxDQUFYLENBQWFBLElBQUksR0FBSixJQUFXLENBQVgsQ0FBYUEsSUFBSSxHQUFKLElBQVcsQ0FBWCxDQUFhQSxJQUFJLEdBQUosSUFBVyxDQUFYLENBQWFBLElBQUksR0FBSixJQUFXLENBQVgsQ0FBYUEsSUFBSSxHQUFKLElBQVcsQ0FBWCxDQUFhQSxJQUFJLEdBQUosSUFBVyxDQUFYLENBQWFBLElBQUksR0FBSixJQUFXLENBQVgsQ0FBYUMsSUFBSSxDQUFKLElBQVMsQ0FBVCxDQUFXQSxJQUFJLENBQUosSUFBUyxDQUFULENBQVdBLElBQUksQ0FBSixJQUFTLENBQVQsQ0FBV0EsSUFBSSxDQUFKLElBQVMsQ0FBVCxDQUFXQSxJQUFJLENBQUosSUFBUyxDQUFULENBQVdBLElBQUksQ0FBSixJQUFTLENBQVQsQ0FBV0EsSUFBSSxDQUFKLElBQVMsQ0FBVCxDQUFXQSxJQUFJLENB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LElBQUk4UyxNQUFKLENBQVdFLE9BQVgsQ0FBbUJ2QjtBQUR4QixDQUFUOztBQUlBelIsSUFBSTJELE1BQUosQ0FBV2tMLEVBQVgsRUFBZS9PLE9BQU9FLEdBQXRCOztBQUVBOztBQUVBdVksT0FBT0MsT0FBUCxHQUFpQjFZLE9BQU9FLEdBQXhCIiwiZmlsZSI6Ikhvby5hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mIHdpbmRvdyA9PSAndW5kZWZpbmVkJykgeyB3aW5kb3cgPSBnZXRBcHAoKTsgfVxuXG52YXIgSG9vID0gd2luZG93LkhvbyB8fCAod2luZG93LkhvbyA9IHt9KTtcblxudmFyIF9fbmFtZVNwYWNlTWFwID0ge30sXG5cbiAgb2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZSxcblxuICB0b1N0cmluZyA9IG9iamVjdFByb3RvdHlwZS50b1N0cmluZyxcblxuICBjYWxsT3ZlcnJpZGVQYXJlbnQgPSBmdW5jdGlvbiAoKSB7Ly/mmoLkv53nlZkgICDnu6fmib/ph4znmoTkuJzopb8g6L+Y6ZyA6KaBIOa3u+WKoC/mm7TmlLkgIOS6m+S4nOilv1xuXG4gICAgdmFyIG1ldGhvZCA9IGNhbGxPdmVycmlkZVBhcmVudC5jYWxsZXIuY2FsbGVyO1xuXG4gICAgcmV0dXJuIG1ldGhvZC4kb3duZXIucHJvdG90eXBlW21ldGhvZC4kbmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICB9LFxuXG4gIG0gPSBfX25hbWVTcGFjZU1hcCA9IHsgXCJIb29cIjogdHJ1ZSB9O1xuXG5cbkhvby5Db3JlID0gZnVuY3Rpb24gKCkgeyB9O1xuXG4vL+Wfuuexu+WumuS5iVxuXG5Ib28uQ29yZS5wcm90b3R5cGUgPSB7XG5cbiAgJGlzQ2xhc3M6IHRydWUsXHRcdFx0Ly/moIfor4bmmK/nsbst5Ye95pWw5a+56LGhXG5cbiAgJGNsYXNzTmFtZTogXCJIb28uQ29yZVwiLFx0Ly/moIforrDnsbvlkI1cblxuICAkc3VwZXJDbGFzczogbnVsbCxcdFx0XHQvL+agh+iusOeItuexuyjmlrnms5Xlj5jmm7Q65LiN6YCa6L+HcHJvdG90eXBl5Lmf5Y+v6I635Y+WKVxuXG4gIGFsaWFzOiBudWxsLCAgICAgICAgIC8v5Yir5ZCNXG5cbiAgY2FsbFBhcmVudDogZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIG1ldGhvZCA9IG51bGw7IC8vVE9ETyDlvq7kv6Hpu5jorqTlvIDlkK/kuKXmoLzmqKHlvI8s5a+86Ie06K+l5pa55rOV5LiN5Y+v55SoXG5cbiAgICB0cnkgeyBtZXRob2QgPSB0aGlzLmNhbGxQYXJlbnQuY2FsbGVyOyB9IGNhdGNoIChlKSB7IH1cblxuICAgIGlmIChtZXRob2QgJiYgbWV0aG9kLiRjbGFzcyAmJiBtZXRob2QuJG5hbWUpIHtcblxuICAgICAgdmFyIHN1cGVyQ2xzUHJvdG90eXBlID0gbWV0aG9kLiRjbGFzcy4kc3VwZXJDbGFzcywgbWV0aG9kTmFtZSA9IG1ldGhvZC4kbmFtZTtcblxuICAgICAgaWYgKHN1cGVyQ2xzUHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG5cbiAgICAgICAgc3VwZXJDbHNQcm90b3R5cGVbbWV0aG9kTmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzIHx8IFtdKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH0sXG5cbiAgLy/lvZPliY3nlLHkuo7lvq7kv6Hkvb/nlKhKUyDkuKXmoLzmqKHlvI/vvIzmlYXogIzmianlsZXmraTmlrnms5XvvIznlKjkuo7osIPnlKjniLbnsbvmlrnms5VbQlVHIOWkmuWxguW1jOWll+e7p+aJv+mDveaYr+WdkV1cbiAgY2FsbDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50c1sxXSB8fCBbXSwgY2xzO1xuICAgIGlmICh0eXBlb2YgdGhpcy4kJGNsYXNzTmFtZSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy4kJGNsYXNzTmFtZSA9IHRoaXMuJGNsYXNzTmFtZTtcbiAgICB9XG5cbiAgICBjbHMgPSB0aGlzLl9fcHJvdG9fXy5fX3Byb3RvX18uY29uc3RydWN0b3IuJHN1cGVyQ2xhc3M7XG4gICAgaWYgKHR5cGVvZiBjbHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjbHMgPSB0aGlzLl9fcHJvdG9fXztcbiAgICB9XG5cblxuXG4gICAgaWYgKGNscy4kY2xhc3NOYW1lID09IHRoaXMuJCRjbGFzc05hbWUpIHtcbiAgICAgIGNscyA9IHRoaXMuX19wcm90b19fLl9fcHJvdG9fXy5fX3Byb3RvX18uY29uc3RydWN0b3IuJHN1cGVyQ2xhc3NcbiAgICB9XG5cblxuICAgIGlmIChjbHMpIHtcbiAgICAgIHRoaXMuJCRjbGFzc05hbWUgPSB0aGlzLiRjbGFzc05hbWU7XG4gICAgICB2YXIgZm4gPSBjbHNbbmFtZV07XG4gICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZuLmFwcGx5KGNscywgYXJncyk7XG4gICAgICAgIC8vZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgLyoqXG5cbiAgICpcdOWwhui/memHjOeahGNhbGxTdXBlcuaWueazlemHjeWGmeS4ujogbmFtZeS4uuiwg+eUqOeahOaWueazleWQjSxhcmdz5Li65a+55bqU55qE5Y+C5pWwXG5cbiAgICogIOWNs+i/meS4quaWueazleWPr+S7peiwg+eUqOeItuexu+eahOWQjeensOS4um5hbWXnmoTmlrnms5VcblxuICAgKi9cblxuICBjYWxsU3VwZXI6IGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICB2YXIgX2FyZ3MgPSBbXSwgYXJncyA9IGFyZ3VtZW50cywgaSA9IDEsIGxlbiA9IGFyZ3MubGVuZ3RoO1xuXG4gICAgZm9yICg7IGkgPCBsZW47IGkrKykgeyBfYXJncy5wdXNoKGFyZ3NbaV0pOyB9XG5cbiAgICB2YXIgbWV0aG9kID0gbnVsbDsgLy9UT0RPIOW+ruS/oem7mOiupOW8gOWQr+S4peagvOaooeW8jyzlr7zoh7Tor6Xmlrnms5XkuI3lj6/nlKhcblxuICAgIHRyeSB7IG1ldGhvZCA9IHRoaXMuY2FsbFN1cGVyLmNhbGxlcjsgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBpZiAobWV0aG9kICYmIG1ldGhvZC4kY2xhc3MgJiYgbWV0aG9kLiRuYW1lKSB7XG5cbiAgICAgIHZhciBzdXBlckNsc1Byb3RvdHlwZSA9IG1ldGhvZC4kY2xhc3MuJHN1cGVyQ2xhc3MsIG1ldGhvZE5hbWUgPSBuYW1lO1xuXG4gICAgICBpZiAoc3VwZXJDbHNQcm90b3R5cGVbbWV0aG9kTmFtZV0pIHtcblxuICAgICAgICBzdXBlckNsc1Byb3RvdHlwZVttZXRob2ROYW1lXS5hcHBseSh0aGlzLCBfYXJncyk7Ly/ov5nph4znmoTlj4LmlbDlrZjnlpFcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWV0aG9kTmFtZSArIFwi5LiN5a2Y5Zyo5LqO57G7XCIgKyBzdXBlckNsc1Byb3RvdHlwZS4kY2xhc3NOYW1lICsgXCLkuK0uXCIpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG59XG5cblxuSG9vLmFwcGx5ID0gZnVuY3Rpb24gKG9iaiwgY2ZnLCBkZWZhdWx0cykge1xuXG4gIGlmIChkZWZhdWx0cykge1xuXG4gICAgSG9vLmFwcGx5KG9iaiwgZGVmYXVsdHMpO1xuXG4gIH1cblxuICBpZiAob2JqKSB7XG5cbiAgICBpZiAodHlwZW9mIChjZmcpID09PSAnb2JqZWN0Jykge1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gY2ZnKSB7IG9ialtrZXldID0gY2ZnW2tleV07IH1cblxuICAgIH0gZWxzZVxuXG4gICAgaWYgKCh0eXBlb2YgKGNmZykgPT09IFwiZnVuY3Rpb25cIikpIHtcblxuICAgICAgb2JqID0gY2ZnOyAvL+WmguaenOaYr+WHveaVsCzliJnnm7TmjqXotYvlgLxcblxuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIG9iajtcblxufVxuXG5cbkhvby5hcHBseShIb28sIHtcblxuICBpZFNlZWQ6IDEwMDAsXG5cbiAgZGVidWdNb2RlbDogZmFsc2UsXG5cbiAgc2V0UGF0aDogZnVuY3Rpb24gKCkge1xuXG4gICAgLy/orr7nva7ot6/lvoQg5LiOIOWRveWQjeepuumXtOeahCDmmKDlsIRcblxuICB9LFxuXG4gIGdldE5hbWVTcGFjZXM6IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBhcnIgPSBbXSwga2V5O1xuXG4gICAgZm9yIChrZXkgaW4gbSkgeyBhcnIucHVzaChrZXkpOyB9XG5cbiAgICByZXR1cm4gYXJyO1xuXG4gIH0sXG5cbiAgaXNIYXZlTmFtZVNwYWNlOiBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgcmV0dXJuIG1bbmFtZV0gPT09IHRydWU7XG5cbiAgfSxcblxuICAvKipcblxuICAgKiDlkb3lkI3nqbrpl7TlrprkuYlcblxuICAgKiBAZXhhbXBsZVxuXG4gICAqIFx0XHRIb28ubmFtZVNwYWNlKFwiVXhcIixcIkhxXCIpOy8v5ZG95ZCN56m66Ze0OiBVeCBIcVxuXG4gICAqL1xuXG4gIG5hbWVTcGFjZTogZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXG4gICAgICBpZiAodHlwZW9mIChhcmdzW2ldKSAhPSAnc3RyaW5nJykgeyBjb250aW51ZTsgfVxuXG4gICAgICBpZiAoIW1bYXJnc1tpXV0pIHtcblxuICAgICAgICBtW2FyZ3NbaV1dID0gdHJ1ZTtcblxuICAgICAgICBldmFsICYmIGV2YWwoXCJ3aW5kb3cuXCIgKyBhcmdzW2ldICsgXCI9e31cIik7Ly/lrprkuYnlkb3lkI3nqbrpl7TkuLrlhajlsYDlr7nosaFcblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxufSk7XG5cbkhvby5ucyA9IEhvby5uYW1lU3BhY2U7XG5cblxuXG5Ib28uYXBwbHkoSG9vLCB7XG5cbiAgbmFtZTogJ0hvbycsXG5cbiAgZW1wdHlGbjogZnVuY3Rpb24gKCkgeyB9LFxuXG4gIC8qKlxuXG4gICAqIFN0cmluZyB0byBDbGFzc1xuXG4gICAqIOaJgOaciemDveaYr+exu1xuXG4gICAqL1xuXG4gIHMyYzogZnVuY3Rpb24gKGNsc1VybCkge1xuXG4gICAgdmFyIGNscyA9IGNsc1VybC5zcGxpdChcIi5cIik7XG5cbiAgICBpZiAoIXdpbmRvd1tjbHNbMF1dKSB7IHRoaXMubmFtZVNwYWNlKGNsc1swXSk7IH1cblxuICAgIHZhciBjbGF6eiA9IHdpbmRvd1tjbHNbMF1dO1xuXG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IGNscy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXG4gICAgICBpZiAoY2xhenpbY2xzW2ldXSkgeyBjbGF6eiA9IGNsYXp6W2Nsc1tpXV07IH0gZWxzZSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNsc1VybCArIFwi5LiN5a2Y5ZyoXCIgKyBjbHNbaV0gKyBcIuWxnuaApyFcIik7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBjbGF6ejtcblxuICB9LFxuXG4gIC8qKlxuXG4gICAqIGNmZ+imhueblm9iauS4jemHjeWkjeeahOmDqOWIhuOAkOWkmuWxguaaguS4jeaUr+aMgS0tPj7lj6/ku6XpgJrov4dqUXVlcnnmlK/mjIEg5aSH5rOo5LqOIDIwMTYtMDQtMTXjgJFcblxuICAgKi9cblxuICBhcHBseUlmOiBmdW5jdGlvbiAob2JqLCBjZmcpIHtcblxuICAgIGlmIChvYmopIHtcblxuICAgICAgZm9yICh2YXIgcHJvIGluIGNmZykgeyBpZiAodHlwZW9mIChvYmpbcHJvXSkgPT0gJ3VuZGVmaW5lZCcpIHsgb2JqW3Byb10gPSBjZmdbcHJvXTsgfSB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOa1heWxguWFi+mahiDmmoLmlK/mjIEgb3JpZ24oe33lr7nosaEpIGNvcHkg57uZIHRvKHt9KVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3JpZ25cbiAgICogQHBhcmFtIHtPYmplY3R9IHRvXG4gICAqL1xuICBjb3B5VG86IGZ1bmN0aW9uIChvcmlnbiwgdG8pIHtcbiAgICBpZiAodHlwZW9mIHRvICE9ICdvYmplY3QnIHx8IHR5cGVvZiBvcmlnbiAhPSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgJ2NvcHnlr7nosaHpnIDkuLpPYmplY3TnsbvlnosnO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gb3JpZ24pIHsgdG9ba2V5XSA9IG9yaWduW2tleV07IH1cblxuICB9XG5cbn0pO1xuXG5cbkhvby5hcHBseShIb28sIHtcblxuICBkZWZpbmU6IGZ1bmN0aW9uIChjbHNOYW1lVXJsLCBjZmcpIHtcblxuICAgIGNmZyA9IGNmZyB8fCB7fTtcblxuICAgIHZhciBuYW1lcyA9IGNsc05hbWVVcmwuc3BsaXQoXCIuXCIpLCBvYmo7XG5cbiAgICBpZiAoIUhvby5pc0hhdmVOYW1lU3BhY2UoW25hbWVzWzBdXSkpIHsgSG9vLm5hbWVTcGFjZShuYW1lc1swXSk7IH1cblxuICAgIG9iaiA9IHdpbmRvd1tuYW1lc1swXV07XG5cbiAgICB2YXIgc3RhdGljcyA9IGNmZ1snc3RhdGljcyddLCBleHRlbmRDbHNVcmwgPSBjZmdbJ2V4dGVuZCddO1xuXG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IG5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cbiAgICAgIGlmIChpID09IGxlbiAtIDEpIHtcblxuICAgICAgICAvL+WmguaenOaYr+mdmeaAgeexuyzmiafooYzpnZnmgIHmlrnlvI9cblxuICAgICAgICBpZiAoc3RhdGljcykge1xuXG4gICAgICAgICAgaWYgKCFvYmpbbmFtZXNbaV1dKSBvYmpbbmFtZXNbaV1dID0ge307XG5cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc3RhdGljcykgeyBvYmpbbmFtZXNbaV1dW2tleV0gPSBzdGF0aWNzW2tleV07IH1cblxuICAgICAgICAgIHJldHVybiBvYmpbbmFtZXNbaV1dO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvL+WmguaenOaYr+mAmui/h+e7p+aJvyzliJnmiafooYznu6fmib/mlrnlvI9cblxuICAgICAgICBpZiAoZXh0ZW5kQ2xzVXJsKSB7XG5cbiAgICAgICAgICB2YXIgZXh0ZW5kQ2xzID0gSG9vLnMyYyhleHRlbmRDbHNVcmwpLFxuXG4gICAgICAgICAgICBGID0gZnVuY3Rpb24gKCkgeyB9LFxuXG4gICAgICAgICAgICBjbHMgPSBvYmpbbmFtZXNbaV1dO1xuXG4gICAgICAgICAgaWYgKCFjbHMpIHtcblxuICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBleHRlbmRDbHMucHJvdG90eXBlO1xuXG4gICAgICAgICAgICBjbHMgPSBvYmpbbmFtZXNbaV1dID0gZnVuY3Rpb24gKCkgeyBpZiAodGhpcy5pbml0KSB0aGlzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzIHx8IFtdKTsgfTtcblxuICAgICAgICAgICAgY2xzLnByb3RvdHlwZSA9IG5ldyBGKCk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCLlrprkuYnnmoTnsbs6XCIgKyBjbHNOYW1lVXJsICsgXCIs5ZG95ZCN56m66Ze06Lev5b6E5Yay56qBIVwiKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjZmcpIHtcblxuICAgICAgICAgICAgdmFyIHYgPSBjZmdba2V5XTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiAodikgPT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgICAgICAgICB2LiRjbGFzcyA9IGNscztcblxuICAgICAgICAgICAgICB2LiRuYW1lID0ga2V5O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNscy5wcm90b3R5cGVba2V5XSA9IHY7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjbHMucHJvdG90eXBlWyckY2xhc3NOYW1lJ10gPSBjbHNOYW1lVXJsO1xuXG4gICAgICAgICAgY2xzWyckc3VwZXJDbGFzcyddID0gZXh0ZW5kQ2xzLnByb3RvdHlwZTtcblxuICAgICAgICAgIGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cbiAgICAgICAgICByZXR1cm4gY2xzO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvL+WmguaenOS4pOiAheWdh+aXoCzliJnmiafooYzlh73mlbDnmoTliJvlu7pcblxuICAgICAgICBpZiAoIXN0YXRpY3MgJiYgIWV4dGVuZENsc1VybCkge1xuXG4gICAgICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoKSB7IH0sIGNscyA9IG9ialtuYW1lc1tpXV07XG5cbiAgICAgICAgICBGLnByb3RvdHlwZSA9IEhvby5Db3JlLnByb3RvdHlwZTtcblxuICAgICAgICAgIGlmICghY2xzKSB7XG5cbiAgICAgICAgICAgIGNscyA9IG9ialtuYW1lc1tpXV0gPSBmdW5jdGlvbiAoKSB7IGlmICh0aGlzLmluaXQpIHRoaXMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMgfHwgW10pOyB9O1xuXG4gICAgICAgICAgICBjbHMucHJvdG90eXBlID0gbmV3IEYoKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIuWumuS5ieeahOexuzpcIiArIGNsc05hbWVVcmwgKyBcIizlkb3lkI3nqbrpl7Tot6/lvoTlhrLnqoEhXCIpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIGNmZykge1xuXG4gICAgICAgICAgICB2YXIgdiA9IGNmZ1trZXldO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mICh2KSA9PT0gJ2Z1bmN0aW9uJykge1xuXG4gICAgICAgICAgICAgIHYuJGNsYXNzID0gY2xzO1xuXG4gICAgICAgICAgICAgIHYuJG5hbWUgPSBrZXk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xzLnByb3RvdHlwZVtrZXldID0gdjtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNscy5wcm90b3R5cGVbJyRjbGFzc05hbWUnXSA9IGNsc05hbWVVcmw7XG5cbiAgICAgICAgICBjbHNbJyRzdXBlckNsYXNzJ10gPSBIb28uQ29yZS5wcm90b3R5cGU7XG5cbiAgICAgICAgICBjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXG4gICAgICAgICAgcmV0dXJuIGNscztcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgaWYgKCFvYmpbbmFtZXNbaV1dKSB7IG9ialtuYW1lc1tpXV0gPSB7fTsgfVxuXG4gICAgICBvYmogPSBvYmpbbmFtZXNbaV1dO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOi/memHjOS7v+mAoEV4dEpTIOWwhuWFpeWPo+WRveWQjeS4uiBvbkNyZWF0ZSAs5omA5pyJ5pa55rOV5omn6KGMLOWdh+mHjeWGmeivpeaOpeWPo+WNs+WPr1xuICAgKlxuXG4gICAqIEBleGFtcGxlXG5cbiAgICogXHRcdEhvby5jcmVhdGUoJ0hvby5iYXNlLkJhc2UnLHtcblxuICAgKiBcdFx0XHRuYW1lOidzc3NzJywgLy8g6KaG55uW5ZCN56ewXG4gICAqIFx0XHRcdG9uQ3JlYXRlIDogZnVuY3Rpb24oY2ZnKXtcbiAgICogXHRcdFx0XHRjb25zb2xlLmxvZyhjZmcpOyAvLyB7a2V5OifliJ3lp4vmlbDmja4nfVxuICAgKiBcdFx0fX0se1xuXG4gICAqIFx0XHRcdGtleTon5Yid5aeL5pWw5o2uJ1xuXG4gICAqIFx0XHR9KTtcblxuICAgKi9cblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjbHNOYW1lVXJsLCBjZmcsIGRhdGEpIHtcblxuICAgIHZhciBDbHMgPSBIb28uczJjKGNsc05hbWVVcmwpO1xuXG4gICAgdmFyIEYgPSBmdW5jdGlvbiAoKSB7IH0sXG5cbiAgICAgIHRlbXBGbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAodGhpcy5pbml0KSB0aGlzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzIHx8IFtdKTtcblxuICAgICAgICAvL+S9nOS4uuaJgOaciWNyZWF0ZeeahOWFpeWPo1xuXG4gICAgICAgIGlmICh0aGlzLm9uQ3JlYXRlKSB7IHRoaXMub25DcmVhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzIHx8IHt9KTsgfVxuXG4gICAgICB9O1xuXG4gICAgRi5wcm90b3R5cGUgPSBDbHMucHJvdG90eXBlO1xuXG4gICAgdGVtcEZuLnByb3RvdHlwZSA9IG5ldyBGKCk7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gY2ZnKSB7IHRlbXBGbi5wcm90b3R5cGVba2V5XSA9IGNmZ1trZXldOyB9XG5cbiAgICB0ZW1wRm4ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdGVtcEZuO1xuXG4gICAgcmV0dXJuIG5ldyB0ZW1wRm4oZGF0YSB8fCB7fSk7XG5cbiAgfVxuXG59KTtcblxuXG5cbkhvby5hcHBseShIb28sIHtcblxuICAvKipcblxuICAgKiDlvpfliLDlhajlsYDllK/kuIBJRFxuXG4gICAqL1xuXG4gIGdldElkOiAoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGlkID0gSG9vLmlkU2VlZCwgZ2V0SWQgPSBmdW5jdGlvbiAobm9kZVR5cGUpIHtcblxuICAgICAgaWQgKz0gMTtcbiAgICAgIHJldHVybiAobm9kZVR5cGUgPyBub2RlVHlwZSA6IFwiY29tcG9uZW50X1wiKSArIGlkO1xuICAgIH07XG4gICAgcmV0dXJuIGdldElkO1xuICB9KSgpLFxuICAvL+aVsOaNrua3seW6puWFi+mahlxuICBjbG9uZTogZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBvO1xuICAgIGlmICh0eXBlb2Ygb2JqID09IFwib2JqZWN0XCIpIHtcbiAgICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgbyA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBvID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgby5wdXNoKEhvby5jbG9uZShvYmpbaV0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbyA9IHt9O1xuICAgICAgICAgIGZvciAodmFyIGogaW4gb2JqKSB7XG4gICAgICAgICAgICBvW2pdID0gSG9vLmNsb25lKG9ialtqXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG8gPSBvYmo7XG4gICAgfVxuICAgIC8vIOWcqOi/memHjOWPr+S7peWIpOaWrei/m+ihjOWkhOeQhlxuICAgIGlmICh0eXBlb2YgKG8pICE9ICd1bmRlZmluZWQnICYmIG8ubm9kZSAmJiBvLnRhZyA9PT0gJ2ltZycpIHsgfVxuICAgIHJldHVybiBvO1xuICB9LFxuICAvKipcbiAgICog5Yik5patb2JqZWN05piv5ZCm5Li656m6KG51bGzjgIEnJ+OAgScgJ+OAgVtdLHt95Lul5Y+KdW5kZWZpbmVkIOWdh+WIpOaWreWxnuS6juepuilcbiAgICpcbiAgICovXG4gIGlzRW1wdHk6IGZ1bmN0aW9uIChvYmopIHtcbiAgICBpZiAodHlwZW9mIG9iaiA9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgaWYgKG9iaiA9PSBudWxsKSB7IHJldHVybiB0cnVlOyB9XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7IHJldHVybiBvYmoubGVuZ3RoID09IDA7IH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PSAnc3RyaW5nJykgeyByZXR1cm4gb2JqLnRyaW0oKS5sZW5ndGggPT0gMDsgfVxuICAgIGlmICh0eXBlb2Ygb2JqID09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgZmxhZyA9IHRydWU7IGZvciAodmFyIGtleSBpbiBvYmopIHsgZmxhZyA9IGZhbHNlOyBicmVhazsgfSByZXR1cm4gZmxhZztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBpc0VxdWFscyA6IGZ1bmN0aW9uKHgseSl7XG4gICAgLy8gSWYgYm90aCB4IGFuZCB5IGFyZSBudWxsIG9yIHVuZGVmaW5lZCBhbmQgZXhhY3RseSB0aGUgc2FtZVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gSWYgdGhleSBhcmUgbm90IHN0cmljdGx5IGVxdWFsLCB0aGV5IGJvdGggbmVlZCB0byBiZSBPYmplY3RzXG4gICAgaWYgKCEoeCBpbnN0YW5jZW9mIE9iamVjdCkgfHwgISh5IGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvL1RoZXkgbXVzdCBoYXZlIHRoZSBleGFjdCBzYW1lIHByb3RvdHlwZSBjaGFpbix0aGUgY2xvc2VzdCB3ZSBjYW4gZG8gaXNcbiAgICAvL3Rlc3QgdGhlIGNvbnN0cnVjdG9yLlxuICAgIGlmICh4LmNvbnN0cnVjdG9yICE9PSB5LmNvbnN0cnVjdG9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAodmFyIHAgaW4geCkge1xuICAgICAgLy9Jbmhlcml0ZWQgcHJvcGVydGllcyB3ZXJlIHRlc3RlZCB1c2luZyB4LmNvbnN0cnVjdG9yID09PSB5LmNvbnN0cnVjdG9yXG4gICAgICBpZiAoeC5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAvLyBBbGxvd3MgY29tcGFyaW5nIHhbIHAgXSBhbmQgeVsgcCBdIHdoZW4gc2V0IHRvIHVuZGVmaW5lZFxuICAgICAgICBpZiAoIXkuaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGV5IGhhdmUgdGhlIHNhbWUgc3RyaWN0IHZhbHVlIG9yIGlkZW50aXR5IHRoZW4gdGhleSBhcmUgZXF1YWxcbiAgICAgICAgaWYgKHhbcF0gPT09IHlbcF0pIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE51bWJlcnMsIFN0cmluZ3MsIEZ1bmN0aW9ucywgQm9vbGVhbnMgbXVzdCBiZSBzdHJpY3RseSBlcXVhbFxuICAgICAgICBpZiAodHlwZW9mICh4W3BdKSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9iamVjdHMgYW5kIEFycmF5cyBtdXN0IGJlIHRlc3RlZCByZWN1cnNpdmVseVxuICAgICAgICBpZiAoIU9iamVjdC5lcXVhbHMoeFtwXSwgeVtwXSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChwIGluIHkpIHtcbiAgICAgIC8vIGFsbG93cyB4WyBwIF0gdG8gYmUgc2V0IHRvIHVuZGVmaW5lZFxuICAgICAgaWYgKHkuaGFzT3duUHJvcGVydHkocCkgJiYgIXguaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgLyoqXG4gICAqXG4gICAqIOi/h+a7pOaOiSBvYmog5LitIOWAvOS4uiBmaWx0ZXJWYWx1ZSDnmoTlsZ7mgKdcbiAgICovXG4gIGZpbHRlciA6IGZ1bmN0aW9uKG9iaixmaWx0ZXJWYWx1ZSl7XG4gICAgZm9yKHZhciBrZXkgaW4gKG9iaiB8fCB7fSkpe1xuICAgICAgaWYob2JqW2tleV0gPT0gZmlsdGVyVmFsdWUpeyBkZWxldGUgb2JqW2tleV07IH1cbiAgICB9XG4gIH1cblxufSk7XG5cblxuSG9vLmRlZmluZShcIkhvby5CYXNlXCIsIHtcblxuICBsaXN0ZW5lcnM6IHt9LFxuXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuaW5pdExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG5cblxuXG4gICAgdGhpcy5pbml0ZWQoKTtcblxuICB9LFxuXG4gIGluaXRlZDogZnVuY3Rpb24gKCkge1xuXG4gICAgLy/mnoTlu7rnm5HlkKxcblxuICAgIHZhciBzY29wZSA9IHRoaXMubGlzdGVuZXJzLnNjb3BlIHx8IHRoaXMsIGNhbGxiYWNrO1xuXG4gICAgZm9yICh2YXIgZXZlbnROYW1lIGluIHRoaXMubGlzdGVuZXJzKSB7XG5cbiAgICAgIGlmIChldmVudE5hbWUgPT09ICdzY29wZScpIHsgY29udGludWU7IH1cblxuICAgICAgY2FsbGJhY2sgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdO1xuXG4gICAgICBpZiAoKHR5cGVvZiAoY2FsbGJhY2spID09PSBcImZ1bmN0aW9uXCIpKSB7XG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcnMoZXZlbnROYW1lLCBjYWxsYmFjaywgc2NvcGUpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfSxcblxuICBpbml0TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLmxpc3RlbmVyU3RhY2sgPSB7fTtcblxuICB9LFxuXG4gIGluaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuZXZlbnRzID0ge307XG5cbiAgfSxcblxuICAvKioqIOa3u+WKoOS6i+S7tiAqL1xuXG4gIGFkZEV2ZW50czogZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHBhcmFtID0gYXJndW1lbnRzWzBdO1xuXG4gICAgaWYgKCh0eXBlb2YgKHBhcmFtKSA9PT0gXCJzdHJpbmdcIikpIHtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB0aGlzLmV2ZW50c1thcmd1bWVudHNbaV0udG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuXG4gICAgICB9XG5cbiAgICB9LyogZWxzZSBpZiAoSG9vLnV0aWwuT2JqZWN0LmlzT2JqZWN0KHBhcmFtKSkge1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW0pIHtcblxuICAgICAgICB0aGlzLmV2ZW50c1trZXldLnRvTG93ZXJDYXNlKCkgPSB0cnVlO1xuXG4gICAgICB9XG5cbiAgICB9Ki9cblxuICB9LFxuXG4gIC8v5pqC5LiN5ZCv55SoXG5cbiAgYWRkRXZlbnQ6IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcblxuICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRydWU7XG5cbiAgfSxcblxuICAvL+aaguS4jeWQr+eUqFxuXG4gIHJlbW92ZUV2ZW50OiBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG5cbiAgICBldmVudE5hbWUgPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGRlbGV0ZSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuXG4gIH0sXG5cbiAgLyoqXG5cbiAgICog56e76Zmk5LqL5Lu2KOacquWBmua1i+ivlS0t5bqU6K+l5piv6ZSZ6K+v55qELilcblxuICAgKi9cblxuICByZW1vdmVFdmVudHM6IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBwYXJhbSA9IGFyZ3VtZW50c1swXTtcblxuICAgIGlmICh0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudChhcmd1bWVudHNbaV0udG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodGhpcy5pc09iamVjdChwYXJhbSkpIHtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHBhcmFtKSB7IHRoaXMucmVtb3ZlRXZlbnQoa2V5LnRvTG93ZXJDYXNlKCkpOyB9XG5cbiAgICB9XG5cbiAgfSxcblxuICAvKipcblxuICAgKiDop6blj5Hnm5HlkKzkuovku7Yg5b2T5LqL5Lu26L+U5ZuedHJ1ZeaXtizkuovku7bpk77lgZzmraLmiafooYxcbiAgICog5Y2zOuiLpeWcqOafkOS6m+WcuuaZr+S4iyDkuI3mg7Pnu6fnu63lvoDkuIvmiafooYws5YiZ5Zue6LCD5Lit6L+U5ZuedHJ1ZeWNs+WPry5cblxuICAgKi9cblxuICBmaXJlRXZlbnQ6IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcblxuICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKHRoaXMubGlzdGVuZXJTdGFja1tldmVudE5hbWVdKSB7XG5cbiAgICAgIHZhciBhcmdzID0gW10sIHN0YWNrQXJyID0gdGhpcy5saXN0ZW5lclN0YWNrW2V2ZW50TmFtZV0sIHN0YWNrO1xuXG4gICAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7IGFyZ3MucHVzaChhcmd1bWVudHNbaV0pOyB9XG5cbiAgICAgIHZhciByZXMgPSBmYWxzZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0YWNrQXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cbiAgICAgICAgLy/ov5nph4zmiafooYzlkIzkuIDkuKrnm5HlkKznmoTlpJrmrKHlm57osIMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5cbiAgICAgICAgc3RhY2sgPSBzdGFja0FycltpXTtcblxuICAgICAgICByZXMgPSBzdGFjay5jYWxsYmFjay5hcHBseShzdGFjay5zY29wZSwgYXJncyk7XG5cbiAgICAgICAgaWYgKHJlcykgeyBicmVhazsgfVxuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXM7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvL3Rocm93IG5ldyBFcnJvcign5ZCN56ew5Li6OicgKyBldmVudE5hbWUgKyAn55qE5LqL5Lu25LiN5a2Y5Zyo5oiW5LiN6KKr5YWB6K6477yBJyk7XG5cbiAgICB9XG5cbiAgfSxcblxuICBvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICB9LFxuXG4gIC8qKlxuXG4gICAqIEBwYXJhbSB7U3RyaW5nL09iamVjdH0gZXZlbnROYW1lIOS6i+S7tuWQjeensCzlkIzml7bmlK/mjIF7feW9ouW8j1xuXG4gICAqL1xuXG4gIGFkZExpc3RlbmVyczogZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2ssIHNjb3BlKSB7XG5cbiAgICB2YXIgc3RhY2sgPSB0aGlzLmxpc3RlbmVyU3RhY2s7XG5cbiAgICBpZiAoSG9vLnV0aWwuT2JqZWN0LmlzU3RyaW5nKGV2ZW50TmFtZSkgJiYgSG9vLnV0aWwuT2JqZWN0LmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG5cbiAgICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuXG4gICAgICAgIGlmICghc3RhY2tbZXZlbnROYW1lXSkgeyBzdGFja1tldmVudE5hbWVdID0gW107IH1cblxuICAgICAgICBzdGFja1tldmVudE5hbWVdLnB1c2goeyBjYWxsYmFjazogY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkgeyB9LCBzY29wZTogc2NvcGUgfHwgdGhpcyB9KTtcblxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKGNhbGxiYWNrKSB7IHRocm93IG5ldyBFcnJvcign6K+l5b2i5byP5LiN5pSv5oyB5Zue6LCDIScpOyByZXR1cm47IH1cblxuICAgICAgdmFyIG1lID0gdGhpcywgb2JqID0gZXZlbnROYW1lLCBzY29wZSA9IG9ialsnc2NvcGUnXSB8fCB0aGlzO1xuXG4gICAgICBkZWxldGUgb2JqWydzY29wZSddO1xuXG4gICAgICBmb3IgKHZhciBfZXZlbnROYW1lIGluIG9iaikge1xuXG4gICAgICAgIHZhciBldmVudE5hbWUgPSBfZXZlbnROYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcblxuICAgICAgICAgIGlmICghc3RhY2tbZXZlbnROYW1lXSkgeyBzdGFja1tldmVudE5hbWVdID0gW107IH1cblxuICAgICAgICAgIHN0YWNrW2V2ZW50TmFtZV0ucHVzaCh7IGNhbGxiYWNrOiBvYmpbX2V2ZW50TmFtZV0gfHwgZnVuY3Rpb24gKCkgeyB9LCBzY29wZTogc2NvcGUgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8v55uR5ZCs5LiN6KKr5YWB6K64XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbn0pO1xuXG5Ib28uZGVmaW5lKCdIb28udXRpbC5TdHJpbmcnLCB7XG4gIHN0YXRpY3MgOiB7XG4gICAgLyoqXG4gICAgICog55So5LqO5qC85byP5YyWIG1vYmlsZVxuICAgICAqIEBwYXJhbXMge1N0cmluZ30gbW9iaWxlIOaJi+acuuWPtyjlm73lhoUpXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBmbXRNb2JpbGUoJzE1Mjg2ODE5MzIxJykgLS0+IDE1MioqKio5MzIxXG4gICAgICovXG4gICAgZm10TW9iaWxlOiBmdW5jdGlvbiAobW9iaWxlKSB7XG4gICAgICBpZiAodHlwZW9mIG1vYmlsZSA9PSAndW5kZWZpbmVkJyB8fCBudWxsID09IG1vYmlsZSkgeyByZXR1cm4gJyc7IH1cbiAgICAgIG1vYmlsZSA9ICcnICsgbW9iaWxlO1xuICAgICAgaWYgKG1vYmlsZS5sZW5ndGggPT0gMTEpIHsgLy/nroDljZXmoKHpqoxcbiAgICAgICAgcmV0dXJuIG1vYmlsZS5zdWJzdHJpbmcoMCwgMykgKyAnKioqKicgKyBtb2JpbGUuc3Vic3RyaW5nKDcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1vYmlsZTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUqOS6juagvOW8j+WMlui6q+S7veivgVxuICAgICAqIEBwYXJhbXMge1N0cmluZ30gaWQg5Zu95YaFMTjkvY3ouqvku73or4Eo5Lmf5pSv5oyBMTbkvY0pXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBmbXRJRENhcmQoJzM0MTIyNTE5OTkwMTIxMjkxWCcpIC0tPiAzNDEyMjUqKioqKioqKjI5MVhcbiAgICAgKi9cbiAgICBmbXRJRENhcmQ6IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaWYgKHR5cGVvZiBpZCA9PSAndW5kZWZpbmVkJyB8fCBudWxsID09IGlkKSB7IHJldHVybiAnJzsgfVxuICAgICAgaWQgPSAnJyArIGlkO1xuICAgICAgaWYgKGlkLmxlbmd0aCA9PSAxOCB8fCBpZC5sZW5ndGggPT0gMTYpIHsgIC8v566A5Y2V5qCh6aqMXG4gICAgICAgIHJldHVybiBpZC5zdWJzdHJpbmcoMCwgMTApICsgJyoqKionICsgaWQuc3Vic3RyaW5nKDE0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpZDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeUqOS6juagvOW8j+WMlmVtYWlsXG4gICAgICogQHBhcmFtcyB7U3RyaW5nfSBlbWFpbFxuICAgICAqIEBleGFtcGxlXG4gICAgICogZm10RW1haWwoJzEwMDAwMTExQHFxLmNvbScpIC0tPiAxMDAwKioqKkBxcS5jb21cbiAgICAgKi9cbiAgICBmbXRFbWFpbDogZnVuY3Rpb24gKGVtYWlsKSB7XG4gICAgICBpZiAodHlwZW9mIGVtYWlsID09ICd1bmRlZmluZWQnIHx8IG51bGwgPT0gZW1haWwpIHsgcmV0dXJuICcnOyB9XG4gICAgICB2YXIgaW5kZXggPSBlbWFpbC5pbmRleE9mKCdAJyk7XG4gICAgICBpZiAoaW5kZXggPiAwKSB7IC8v566A5Y2V5qCh6aqMXG4gICAgICAgIHJldHVybiBlbWFpbC5zdWJzdHJpbmcoMCwgKGluZGV4ID4gNCA/IGluZGV4IDogNCkgLSA0KSArICcqKioqJyArIGVtYWlsLnN1YnN0cmluZyhpbmRleCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZW1haWw7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDnlKjkuo7moLzlvI/ljJZcbiAgICAgKiBAcGFyYW1zIHtTdHJpbmd9IHFxXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBmbXRRUSgnMTAwMDAnKSAtLT4gMTAwKioqKjBcbiAgICAgKi9cbiAgICBmbXRRUSA6IGZ1bmN0aW9uKHFxKXtcbiAgICAgIGlmICh0eXBlb2YgcXEgPT0gJ3VuZGVmaW5lZCcgfHwgbnVsbCA9PSBxcSkgeyByZXR1cm4gJyc7IH1cbiAgICAgIHFxID0gJycgKyBxcTtcbiAgICAgIGlmKHFxLmxlbmd0aCA+PSA1KXtcbiAgICAgICAgcmV0dXJuIHFxLnN1YnN0cmluZygwLCAzKSArICcqKioqJyArIHFxLnN1YnN0cmluZyhxcS5sZW5ndGggLSAzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBxcTtcbiAgICB9LFxuICAgIGZvcm1hdCA6IGZ1bmN0aW9uKCl7XG4gICAgICBpZihhcmd1bWVudHMubGVuZ3RoID4gMSl7IC8v5aaC5p6c5pyJ5YC8ICAx44CBb2JqZWN057G75Z6LLOS9v+eUqHt7a2V5fX3mlrnlvI8s5ZCm5YiZ5L2/55Soe3tpbmRleH19XG4gICAgICAgIHZhciByZXN1bHQgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIgJiYgdHlwZW9mIChhcmdzKSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2tleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKHtcIiArIGtleSArIFwifSlcIiwgXCJnXCIpO1xuICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShyZWcsIGFyZ3Nba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKHtbXCIgKyAoaSAtIDEpICsgXCJdfSlcIiwgXCJnXCIpO1xuICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShyZWcsIGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50c1swXSA9PSAndW5kZWZpbmVkJyA/IG51bGwgOiBhcmd1bWVudHNbMF07XG4gICAgfSxcbiAgfVxufSk7XG5cbkhvby5zdHJpbmcgPSBIb28udXRpbC5TdHJpbmc7XG5cbkhvby5kZWZpbmUoJ0hvby51dGlsLk51bWJlcicsIHtcbiAgc3RhdGljczoge1xuICAgIC8qKlxuICAgICAqIOaVsOWtl+WNg+S9jeespuagvOW8j+WMllxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGVjaW1hbHMg5L+d55WZ5bCP5pWw54K55ZCO5Yeg5L2NXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBvaW50IOWwj+aVsOeCueespuWPtyzpu5jorqQgJy4nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRob3VzYW5kc19zZXAg5Y2D5YiG5L2N56ym5Y+3IOm7mOiupCAnLCdcbiAgICAgKi9cbiAgICBmb3JtYXQ6IGZ1bmN0aW9uIChudW0sIGRlY2ltYWxzLCBwb2ludCwgdGhvdXNhbmRzX3NlcCl7XG4gICAgICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1teMC05Ky1FZS5dL2csICcnKTtcbiAgICAgIHZhciAgbj0gIWlzRmluaXRlKCtudW0pID8gMCA6ICtudW0sXG4gICAgICAgIHByZWM9ICFpc0Zpbml0ZSgrZGVjaW1hbHMpID8gMCA6IE1hdGguYWJzKGRlY2ltYWxzKSxcbiAgICAgICAgc2VwID0gKHR5cGVvZiB0aG91c2FuZHNfc2VwID09PSAndW5kZWZpbmVkJykgPyAnLCcgOiB0aG91c2FuZHNfc2VwLFxuICAgICAgICBkZWMgPSAodHlwZW9mIHBvaW50ICAgICAgICAgPT09ICd1bmRlZmluZWQnKSA/ICcuJyA6IHBvaW50LFxuICAgICAgICBzID0gJycsXG4gICAgICAgIHRvRml4ZWRGaXggPSBmdW5jdGlvbiAobiwgcHJlYykge1xuICAgICAgICAgIHZhciBrID0gTWF0aC5wb3coMTAsIHByZWMpO1xuICAgICAgICAgIHJldHVybiAnJyArIE1hdGguY2VpbChuICogaykgLyBrO1xuICAgICAgICB9O1xuXG4gICAgICBzID0gKHByZWMgPyB0b0ZpeGVkRml4KG4sIHByZWMpIDogJycgKyBNYXRoLnJvdW5kKG4pKS5zcGxpdCgnLicpO1xuICAgICAgdmFyIHJlID0gLygtP1xcZCspKFxcZHszfSkvO1xuICAgICAgd2hpbGUgKHJlLnRlc3Qoc1swXSkpIHtcbiAgICAgICAgc1swXSA9IHNbMF0ucmVwbGFjZShyZSwgXCIkMVwiICsgc2VwICsgXCIkMlwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChzWzFdIHx8ICcnKS5sZW5ndGggPCBwcmVjKSB7XG4gICAgICAgIHNbMV0gPSBzWzFdIHx8ICcnO1xuICAgICAgICBzWzFdICs9IG5ldyBBcnJheShwcmVjIC0gc1sxXS5sZW5ndGggKyAxKS5qb2luKCcwJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcy5qb2luKGRlYyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDpmo/mnLrnlJ/miJBbbWluLG1heCnmlbTmlbBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWluIOacgOWwj+WAvFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtYXgg5pyA5aSn5YC8XG4gICAgICovXG4gICAgcmFuZG9tIDogZnVuY3Rpb24obWluLG1heCl7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pO1xuICAgIH1cbiAgfVxufSk7XG5Ib28uZGVmaW5lKCdIb28udXRpbC5BcnJheScsIHtcbiAgc3RhdGljczoge1xuICAgIC8qKlxuICAgICAqIOWIoOmZpOaVsOe7hOWvueW6lGluZGV45L2N572u55qE5YWD57Sg5bm26L+U5Zue5paw55qE5pWw57uEXG4gICAgICovXG4gICAgcmVtb3ZlIDogZnVuY3Rpb24oYXJyYXksaW5kZXgpe1xuICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9LFxuICAgIHJlbW92ZU9iamVjdCA6IGZ1bmN0aW9uKGFycmF5LG9iail7XG5cbiAgICB9LFxuICAgIGVhY2ggOiBmdW5jdGlvbihhcnJheSxjYWxsYmFjayxzY29wZSl7XG4gICAgICBmb3IodmFyIGk9MCxsZW4gPSBhcnJheS5sZW5ndGg7aTxsZW47aSsrKXtcbiAgICAgICAgdmFyIHJlcyA9ICBjYWxsYmFjay5jYWxsKHNjb3BlfHx0aGlzLGksYXJyYXlbaV0pO1xuICAgICAgICBpZiAodHlwZW9mIHJlcyAhPSAndW5kZWZpbmVkJyAmJiByZXMpeyBicmVhazsgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG4oZnVuY3Rpb24gKCkge1xuICBsZXQgUkVHX01PQklMRSA9ICcnO1xuICBsZXQgQXJyID0gW10sQnJyID0gW107XG4gIEFyclsnQSddID0gMTtBcnJbJ0InXSA9IDI7QXJyWydDJ10gPSAzO0FyclsnRCddID0gNDtBcnJbJ0UnXSA9IDU7QXJyWydGJ10gPSA2O0FyclsnRyddID0gNztBcnJbJ0gnXSA9IDg7QXJyWydKJ10gPSAxO0FyclsnSyddID0gMjtBcnJbJ0wnXSA9IDM7QXJyWydNJ10gPSA0O0FyclsnTiddID0gNTtBcnJbJ1AnXSA9IDc7QXJyWydSJ10gPSA5O0FyclsnUyddID0gMjtBcnJbJ1QnXSA9IDM7QXJyWydVJ10gPSA0O0FyclsnViddID0gNTtBcnJbJ1cnXSA9IDY7QXJyWydYJ10gPSA3O0FyclsnWSddID0gODtBcnJbJ1onXSA9IDk7QXJyWycxJ10gPSAxO0FyclsnMiddID0gMjtBcnJbJzMnXSA9IDM7QXJyWyc0J10gPSA0O0FyclsnNSddID0gNTtBcnJbJzYnXSA9IDY7QXJyWyc3J10gPSA3O0FyclsnOCddID0gODtBcnJbJzknXSA9IDk7QXJyWycwJ10gPSAwO0JyclsxXSA9IDg7QnJyWzJdID0gNztCcnJbM10gPSA2O0Jycls0XSA9IDU7QnJyWzVdID0gNDtCcnJbNl0gPSAzO0Jycls3XSA9IDI7QnJyWzhdID0gMTA7QnJyWzldID0gMDtCcnJbMTBdID0gOTtCcnJbMTFdID0gODtCcnJbMTJdID0gNztCcnJbMTNdID0gNjtCcnJbMTRdID0gNTtCcnJbMTVdID0gNDtCcnJbMTZdID0gMztCcnJbMTddID0gMjtcblxuXG4gIEhvby5kZWZpbmUoJ0hvby51dGlsLlJlZycsIHtcbiAgICBzdGF0aWNzIDoge1xuICAgICAgLyoqKiDmiafooYzmraPliJnmoKHpqowgKi9cbiAgICAgIGV4ZWM6IGZ1bmN0aW9uIChyZWcsIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVnID09ICd1bmRlZmluZWQnIHx8IG51bGwgPT0gcmVnIHx8IHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgcmVnID0gbmV3IFJlZ0V4cChyZWcpO1xuICAgICAgICByZXR1cm4gcmVnLnRlc3QodmFsdWUpO1xuICAgICAgfSxcbiAgICAgIC8qKiog6ZO26KGM5Y2h5qCh6aqMICovXG4gICAgICBiYW5rQ2FyZCA6IGZ1bmN0aW9uKGNhcmROdW0pe1xuICAgICAgICBpZiAoY2FyZE51bS5sZW5ndGggPCAxNiB8fCBjYXJkTnVtLmxlbmd0aCA+IDE5KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBudW0gPSAvXlxcZCokLzsgIC8v5YWo5pWw5a2XXG4gICAgICAgIGlmICghbnVtLmV4ZWMoY2FyZE51bSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy/lvIDlpLQ25L2NXG4gICAgICAgIHZhciBzdHJCaW4gPSBcIjEwLDE4LDMwLDM1LDM3LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDQ5LDUwLDUxLDUyLDUzLDU0LDU1LDU2LDU4LDYwLDYyLDY1LDY4LDY5LDg0LDg3LDg4LDk0LDk1LDk4LDk5XCI7XG4gICAgICAgIGlmIChzdHJCaW4uaW5kZXhPZihjYXJkTnVtLnN1YnN0cmluZygwLCAyKSkgPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxhc3ROdW0gPSBjYXJkTnVtLnN1YnN0cihjYXJkTnVtLmxlbmd0aCAtIDEsIDEpOy8v5Y+W5Ye65pyA5ZCO5LiA5L2N77yI5LiObHVobei/m+ihjOavlOi+g++8iVxuXG4gICAgICAgIHZhciBmaXJzdDE1TnVtID0gY2FyZE51bS5zdWJzdHIoMCwgY2FyZE51bS5sZW5ndGggLSAxKTsvL+WJjTE15oiWMTjkvY1cbiAgICAgICAgdmFyIG5ld0FyciA9IG5ldyBBcnJheSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gZmlyc3QxNU51bS5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkgeyAgICAvL+WJjTE15oiWMTjkvY3lgJLluo/lrZjov5vmlbDnu4RcbiAgICAgICAgICBuZXdBcnIucHVzaChmaXJzdDE1TnVtLnN1YnN0cihpLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFyckppU2h1ID0gbmV3IEFycmF5KCk7ICAvL+Wlh+aVsOS9jSoy55qE56evIDw5XG4gICAgICAgIHZhciBhcnJKaVNodTIgPSBuZXcgQXJyYXkoKTsgLy/lpYfmlbDkvY0qMueahOenryA+OVxuXG4gICAgICAgIHZhciBhcnJPdVNodSA9IG5ldyBBcnJheSgpOyAgLy/lgbbmlbDkvY3mlbDnu4RcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuZXdBcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoKGogKyAxKSAlIDIgPT0gMSkgey8v5aWH5pWw5L2NXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQobmV3QXJyW2pdKSAqIDIgPCA5KVxuICAgICAgICAgICAgICBhcnJKaVNodS5wdXNoKHBhcnNlSW50KG5ld0FycltqXSkgKiAyKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgYXJySmlTaHUyLnB1c2gocGFyc2VJbnQobmV3QXJyW2pdKSAqIDIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIC8v5YG25pWw5L2NXG4gICAgICAgICAgICBhcnJPdVNodS5wdXNoKG5ld0FycltqXSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgamlzaHVfY2hpbGQxID0gbmV3IEFycmF5KCk7Ly/lpYfmlbDkvY0qMiA+OSDnmoTliIblibLkuYvlkI7nmoTmlbDnu4TkuKrkvY3mlbBcbiAgICAgICAgdmFyIGppc2h1X2NoaWxkMiA9IG5ldyBBcnJheSgpOy8v5aWH5pWw5L2NKjIgPjkg55qE5YiG5Ymy5LmL5ZCO55qE5pWw57uE5Y2B5L2N5pWwXG4gICAgICAgIGZvciAodmFyIGggPSAwOyBoIDwgYXJySmlTaHUyLmxlbmd0aDsgaCsrKSB7XG4gICAgICAgICAgamlzaHVfY2hpbGQxLnB1c2gocGFyc2VJbnQoYXJySmlTaHUyW2hdKSAlIDEwKTtcbiAgICAgICAgICBqaXNodV9jaGlsZDIucHVzaChwYXJzZUludChhcnJKaVNodTJbaF0pIC8gMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN1bUppU2h1ID0gMDsgLy/lpYfmlbDkvY0qMiA8IDkg55qE5pWw57uE5LmL5ZKMXG4gICAgICAgIHZhciBzdW1PdVNodSA9IDA7IC8v5YG25pWw5L2N5pWw57uE5LmL5ZKMXG4gICAgICAgIHZhciBzdW1KaVNodUNoaWxkMSA9IDA7IC8v5aWH5pWw5L2NKjIgPjkg55qE5YiG5Ymy5LmL5ZCO55qE5pWw57uE5Liq5L2N5pWw5LmL5ZKMXG4gICAgICAgIHZhciBzdW1KaVNodUNoaWxkMiA9IDA7IC8v5aWH5pWw5L2NKjIgPjkg55qE5YiG5Ymy5LmL5ZCO55qE5pWw57uE5Y2B5L2N5pWw5LmL5ZKMXG4gICAgICAgIHZhciBzdW1Ub3RhbCA9IDA7XG4gICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgYXJySmlTaHUubGVuZ3RoOyBtKyspIHtcbiAgICAgICAgICBzdW1KaVNodSA9IHN1bUppU2h1ICsgcGFyc2VJbnQoYXJySmlTaHVbbV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBhcnJPdVNodS5sZW5ndGg7IG4rKykge1xuICAgICAgICAgIHN1bU91U2h1ID0gc3VtT3VTaHUgKyBwYXJzZUludChhcnJPdVNodVtuXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBwID0gMDsgcCA8IGppc2h1X2NoaWxkMS5sZW5ndGg7IHArKykge1xuICAgICAgICAgIHN1bUppU2h1Q2hpbGQxID0gc3VtSmlTaHVDaGlsZDEgKyBwYXJzZUludChqaXNodV9jaGlsZDFbcF0pO1xuICAgICAgICAgIHN1bUppU2h1Q2hpbGQyID0gc3VtSmlTaHVDaGlsZDIgKyBwYXJzZUludChqaXNodV9jaGlsZDJbcF0pO1xuICAgICAgICB9XG4gICAgICAgIC8v6K6h566X5oC75ZKMXG4gICAgICAgIHN1bVRvdGFsID0gcGFyc2VJbnQoc3VtSmlTaHUpICsgcGFyc2VJbnQoc3VtT3VTaHUpICsgcGFyc2VJbnQoc3VtSmlTaHVDaGlsZDEpICsgcGFyc2VJbnQoc3VtSmlTaHVDaGlsZDIpO1xuXG4gICAgICAgIC8v6K6h566XTHVobeWAvFxuICAgICAgICB2YXIgayA9IHBhcnNlSW50KHN1bVRvdGFsKSAlIDEwID09IDAgPyAxMCA6IHBhcnNlSW50KHN1bVRvdGFsKSAlIDEwO1xuICAgICAgICB2YXIgbHVobSA9IDEwIC0gaztcblxuICAgICAgICByZXR1cm4gbGFzdE51bSA9PSBsdWhtO1xuICAgICAgfSxcbiAgICAgIGlzTnVtYmVyIDogZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PSAwKXsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIHZhciBmbGFnID0gdHJ1ZSwgcmVnID0gL15bMC05XSsuP1swLTldKiQvLCBudW07XG4gICAgICAgIGZvcih2YXIgaT0wLGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7aTxsZW47aSsrKXtcbiAgICAgICAgICBudW0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgaWYgKHR5cGVvZiBudW0gPT0gJ3VuZGVmaW5lZCcgfHwgbnVsbCA9PSBudW0gfHwgaXNOYU4oTnVtYmVyKG51bSkpKXsgZmxhZyA9IGZhbHNlOyBicmVhazt9XG4gICAgICAgICAgLy9pZiAodHlwZW9mIG51bSA9PSAndW5kZWZpbmVkJyB8fCBudWxsID09IG51bSB8fCAhcmVnLnRlc3QobnVtKSkgeyBmbGFnID0gZmFsc2U7IGJyZWFrOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZsYWc7XG4gICAgICB9LFxuICAgICAgLyoqKiDnu5/kuIDnpL7kvJrkv6HnlKjku6PnoIEgKi9cbiAgICAgIGNyZWRpdENvZGUgOiBmdW5jdGlvbihjb2RlKXtcbiAgICAgICAgaWYodHlwZW9mIGNvZGUgPT0gJ3VuZGVmaW5lZCcgfHwgSG9vLmlzRW1wdHkoY29kZSkgfHwgY29kZS5sZW5ndGggIT0gMTgpeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgdmFyIGJhc2VDb2RlID0gXCIwMTIzNDU2Nzg5QUJDREVGR0hKS0xNTlBRUlRVV1hZXCIsIGJhc2VDb2RlQXJyYXkgPSBiYXNlQ29kZS5zcGxpdChcIlwiKSxjb2RlcyA9IHt9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2VDb2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29kZXNbYmFzZUNvZGVBcnJheVtpXV0gPSBpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb2RlQXJyYXkgPSBjb2RlLnNwbGl0KFwiXCIpLGNoZWNrID0gY29kZUFycmF5WzE3XTtcbiAgICAgICAgaWYgKGJhc2VDb2RlLmluZGV4T2YoY2hlY2spIDwgMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgdmFyIHdpID0gWyAxLCAzLCA5LCAyNywgMTksIDI2LCAxNiwgMTcsIDIwLCAyOSwgMjUsIDEzLCA4LCAyNCwgMTAsIDMwLCAyOCBdLHN1bSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTc7IGkrKykge1xuICAgICAgICAgIHZhciBrZXkgPSBjb2RlQXJyYXlbaV07XG4gICAgICAgICAgaWYgKGJhc2VDb2RlLmluZGV4T2Yoa2V5KSA9PSAtMSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgICBzdW0gKz0gKGNvZGVzW2tleV0gKiB3aVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlID0gMzEgLSBzdW0gJSAzMTtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IGNvZGVzW2NoZWNrXTtcbiAgICAgIH0sXG4gICAgICAvKioqIOmCrueuseagoemqjCAqL1xuICAgICAgZW1haWwgOiBmdW5jdGlvbihlbWFpbCl7XG4gICAgICAgIGlmICh0eXBlb2YgZW1haWwgPT0gJ3VuZGVmaW5lZCcgfHwgbnVsbCA9PSBlbWFpbCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgdmFyIHJlZyA9IC9eW2EtejAtOV0rKFsuX1xcXFwtXSpbYS16MC05XSkqQChbYS16MC05XStbLWEtejAtOV0qW2EtejAtOV0rLil7MSw2M31bYS16MC05XSskLztcbiAgICAgICAgcmV0dXJuIHJlZy50ZXN0KGVtYWlsKTtcbiAgICAgIH0sXG4gICAgICAvKioqIOaJi+acuuWPt+agoemqjCAqL1xuICAgICAgbW9iaWxlOiBmdW5jdGlvbiAobW9iaWxlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbW9iaWxlID09ICd1bmRlZmluZWQnIHx8IG51bGwgPT0gbW9iaWxlKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICB2YXIgcmVnID0gL14xWzN8NHw1fDd8OF1bMC05XXs5fSQvOyAvLyAvXjFbMC05XXsxMH0kL1xuICAgICAgICByZXR1cm4gcmVnLnRlc3QobW9iaWxlKTtcbiAgICAgIH0sXG4gICAgICAvKioqIHdlYiBVUkwg5qCh6aqMICovXG4gICAgICB1cmw6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdHIgPT0gJ3VuZGVmaW5lZCcgfHwgbnVsbCA9PSBzdHIpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIHJldHVybiAhIXN0ci5tYXRjaCgvKCgoXmh0dHBzPzooPzpcXC9cXC8pPykoPzpbLTs6Jj1cXCtcXCQsXFx3XStAKT9bQS1aYS16MC05Li1dK3woPzp3d3cufFstOzomPVxcK1xcJCxcXHddK0ApW0EtWmEtejAtOS4tXSspKCg/OlxcL1tcXCt+JVxcLy5cXHctX10qKT9cXD8/KD86Wy1cXCs9JjslQC5cXHdfXSopIz8oPzpbXFx3XSopKT8pJC9nKTtcbiAgICAgIH0sXG4gICAgICAvKioqIOaYr+WQpuWFqOS4uuS4reaWhyAqL1xuICAgICAgY2hpbmVzZSA6IGZ1bmN0aW9uKHN0cil7XG4gICAgICAgIC8vdmFyIHJlZyA9IC9eW3U0RTAwLXU5RkE1XSskLzsg44CQ5piv5ZCm5YyF5ZCr5Lit5paH44CRXG4gICAgICAgIC8vcmV0dXJuIHR5cGVvZiBzdHIgIT09ICd1bmRlZmluZWQnICYmIG51bGwgIT0gc3RyICYmICFyZWcudGVzdChzdHIpO1xuICAgICAgICBpZiAodHlwZW9mIHN0ciA9PSAndW5kZWZpbmVkJyB8fCBudWxsID09IHN0ciB8fCAnJyA9PSBzdHIpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIHZhciBmbGFnID0gdHJ1ZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoc3RyLmNoYXJDb2RlQXQoaSkgPD0gMjU1KSB7IGZsYWcgPSBmYWxzZTsgYnJlYWs7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmxhZztcbiAgICAgIH0sXG4gICAgICAvKioqIHZpbiDmo4DmtYsg5L6L77yaIFdQMEFBMjk3OEJMMDEyOTc2ICovXG4gICAgICB2aW46IGZ1bmN0aW9uICh2aW4pIHtcbiAgICAgICAgdmFyIHNLWVpGID0gXCJBQkNERUZHSEpLTE1OUFJTVFVWV1hZWjEyMzQ1Njc4OTBcIjtcbiAgICAgICAgdmFyIHNKWVcgPSAnJztcbiAgICAgICAgdmFyIGJsID0gZmFsc2U7XG4gICAgICAgIHZhciBibEtZWkYgPSBmYWxzZTtcbiAgICAgICAgaWYgKHZpbi5sZW5ndGggPT0gMTcpIHtcbiAgICAgICAgICB2YXIgaUpRUyA9IDAsIGludFRlbXAgPSAwLCBodCA9IEFyciwgaHRaTSA9IEJycjtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmluID0gdmluLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBpZiAoc0tZWkYuaW5kZXhPZih2aW4uc3Vic3RyKGksIDEpKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGJsS1laRiA9IHRydWU7XG4gICAgICAgICAgICAgICAgaUpRUyA9IGlKUVMgKyBwYXJzZUludChodFt2aW4uc3Vic3RyKGksIDEpXSkgKiBwYXJzZUludChodFpNWyhpICsgMSldKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBibEtZWkYgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJsS1laRikge1xuICAgICAgICAgICAgICBpbnRUZW1wID0gaUpRUyAlIDExO1xuICAgICAgICAgICAgICBpZiAoaW50VGVtcCA9PSAxMCkge1xuICAgICAgICAgICAgICAgIHNKWVcgPSBcIlhcIjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzSllXID0gaW50VGVtcC50b1N0cmluZygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzSllXID09IHZpbi5zdWJzdHIoOCwgMSkpIGJsID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJsID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBibCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBIb28ucmVnID0gSG9vLnV0aWwuUmVnO1xufSkoKVxuXG5Ib28uZGVmaW5lKCdIb28uYnJpZGdlLmRiJywge1xuICBzdGF0aWNzOiB7XG5cbiAgfVxufSk7XG5cblxuKGZ1bmN0aW9uKCl7XG5cbiAgLy/lvLrliLbmi7fotJ0s6Z2eIGZyb21Tb3VyY2Ug5bGe5oCnLCDlnYfkuI3mlK/mjIEgY29weVxuICBmdW5jdGlvbiBjb3B5VG8oZnJvbVNvdXJjZSx0b1NvdXJjZSl7XG4gICAgaWYodHlwZW9mIGZyb21Tb3VyY2UgIT0gJ29iamVjdCcgfHwgdHlwZW9mIHRvU291cmNlICE9ICdvYmplY3QnKXsgcmV0dXJuO31cbiAgICBmb3IodmFyIGtleSBpbiBmcm9tU291cmNlKXtcbiAgICAgIGlmKHR5cGVvZiB0b1NvdXJjZVtrZXldICE9ICd1bmRlZmluZWQnKXtcbiAgICAgICAgdG9Tb3VyY2Vba2V5XSA9IGZyb21Tb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvU291cmNlO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNFbXB0eShvYmope1xuICAgIHZhciBmbGFnID0gdHJ1ZTtcbiAgICBmb3IodmFyIGtleSBpbiAob2JqIHx8IHt9KSl7IGZsYWcgPSBmYWxzZTsgYnJlYWs7fVxuICAgIHJldHVybiBmbGFnO1xuICB9XG5cbiAgZnVuY3Rpb24gV3hTdG9yYWdlQ2FjaGUob3B0aW9ucyl7XG5cbiAgICB0aGlzLmRmT3B0aW9ucyA9IHtcbiAgICAgIGRlZmF1bHRUaW1lb3V0IDogNjAgKiA2MCAgICAvL+acgOmVv+S/neWtmOaXtumXtCAxIGhvdXJcbiAgICAgICxwcmVmaXggICAgICAgIDogJ19fY2FjaGVfJ1xuXG4gICAgfTtcblxuICAgIGNvcHlUbyhvcHRpb25zIHx8IHt9LCB0aGlzLmRmT3B0aW9ucyk7XG5cbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICAvLyBpbnRlcnZhbCDlvZPlrprml7blmagg55uR5ZCs5YiwIOWGhemDqOaXoOWvueixoSzliJnmraTml7blj6/ku6XlgZzmraIs55u05Yiw6YeN5pawcHV0XG4gICAgdGhpcy5fYWN0aXZlSW50ZXJ2YWwoKTtcbiAgfVxuXG4gIFd4U3RvcmFnZUNhY2hlLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uKCl7XG4gICAgLy/lhoXlrZjnvJPlrZjlr7nosaFcbiAgICB2YXIgICAgICB0aGF0ID0gdGhpcztcbiAgICB0aGlzLl9tYXAgICAgICA9IHdpbmRvdy5BcHBDYWNoZSB8fCAod2luZG93LkFwcENhY2hlID0ge30pOyAvL+i/memHjOiAg+iZkeWIsOWFqOWxgOe8k+WtmOWvueixoSzoioLnnIHph43lpI3liJ3lp4vljJblvIDmlK9cbiAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG5cbiAgICAvL1RPRE8g5Yid5aeL5YyW5YaF5a2Y5a+56LGhXG4gICAgdHJ5IHtcbiAgICAgIGlmIChpc0VtcHR5KHRoaXMuX21hcCkpe1xuICAgICAgICB2YXIgcmVzID0gd3guZ2V0U3RvcmFnZUluZm9TeW5jKCksIGtleXMgPSByZXMua2V5cztcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAvL1RPRE8g5Yik5pat5bGe5LqO57yT5a2Y55qEXG4gICAgICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuZGZPcHRpb25zLnByZWZpeCkgPT0gMCl7XG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gd3guZ2V0U3RvcmFnZVN5bmMoa2V5KTtcbiAgICAgICAgICAgIHRoaXMuX21hcFtrZXldID0gdmFsdWVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSBjYXRjaCAoZSkge31cblxuXG4gIH1cblxuICAvL+iOt+WPlua/gOa0u+WumuaXtuWZqFvlpoLmnpzlrprml7blmajlpITkuo7plIDmr4HnirbmgIHnmoTor51dXG4gIFd4U3RvcmFnZUNhY2hlLnByb3RvdHlwZS5fYWN0aXZlSW50ZXJ2YWwgPSBmdW5jdGlvbigpe1xuICAgIGlmICh0aGlzLl9pbnRlcnZhbCA9PSBudWxsKXtcbiAgICAgIHZhciAgICAgIHRoYXQgPSB0aGlzO1xuICAgICAgdGhpcyAgICAuX21hcCA9IHdpbmRvdy5BcHBDYWNoZTtcbiAgICAgIHRoaXMuX2ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgLy/lpITnkIZNYXDkuK3ov4fmnJ/nmoRrZXks5LmL5ZCOIOe7mSByZW1vdmUg5aSE55CGXG4gICAgICAgIHZhciBkZWxLZXlzID0gW10sbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoYXQuX21hcCl7XG4gICAgICAgICAgLy/ojrflj5blgLws5qC55o2uZXhwaXJlcyDliKTmlq3mmK/lkKbnnJ/lrp7liKDpmaRcbiAgICAgICAgICB2YXIgdmFsdWVzID0gdGhhdC5fbWFwW2tleV0sXG4gICAgICAgICAgICBleHBpcmVzID0gdmFsdWVzLmV4cGlyZXM7XG4gICAgICAgICAgaWYgKGV4cGlyZXMgIT0gLTEgJiYgZXhwaXJlcyA8IG5vdyl7XG4gICAgICAgICAgICBkZWxLZXlzLnB1c2goa2V5LnN1YnN0cmluZyh0aGF0LmRmT3B0aW9ucy5wcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5omn6KGM5byC5q2l5Yig6Zmk5pON5L2c44CQ5Lya5LiN5Lya5byV5Y+R5ZCM5q2l6Zeu6aKY44CRIC0tIOWFiOWQjOatpVxuICAgICAgICBpZihkZWxLZXlzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIHRoYXQucmVtb3ZlKGRlbEtleXMpO1xuICAgICAgICB9XG4gICAgICB9LDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIC8v6ZSA5q+B5a6a5pe25ZmoXG4gIFd4U3RvcmFnZUNhY2hlLnByb3RvdHlwZS5fZGVzdG9yeUludGVydmFsID0gZnVuY3Rpb24oKXtcbiAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcbiAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICog6K6+572u57yT5a2YXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgICDnvJPlrZhLRVlcbiAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIOe8k+WtmOWAvFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyDmianlsZXphY3nva7lsZ7mgKdcbiAgICpcbiAgICovXG4gIFd4U3RvcmFnZUNhY2hlLnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbihrZXksdmFsdWUsb3B0aW9ucyl7XG4gICAgaWYodHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnKXsgcmV0dXJuOyB9XG4gICAgdGhpcy5fYWN0aXZlSW50ZXJ2YWwoKTtcblxuICAgIHZhciBkZk9wdHMgPSB7XG4gICAgICBzY29wZSAgIDogdGhpcyxcbiAgICAgIGR1cmF0aW9uOiB0aGlzLmRmT3B0aW9ucy5kZWZhdWx0VGltZW91dCwgLy/nvJPlrZjml7bplb8g5Y2V5L2NIDogc1xuICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKCl7fSxcbiAgICAgIGZhaWwgICAgOiBmdW5jdGlvbigpe31cbiAgICB9LG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvcHlUbyhvcHRpb25zIHx8IHt9ICwgZGZPcHRzKTtcblxuICAgIGlmKHZhbHVlID09IG51bGwpe1xuICAgICAgdGhpcy5yZW1vdmUoa2V5LCBkZk9wdHMuc3VjY2VzcywgZGZPcHRzLmZhaWwpO1xuICAgIH1cblxuICAgIHZhciBuZXdWYWwgPSB7XG4gICAgICBleHBpcmVzIDogZGZPcHRzLmR1cmF0aW9uIDwgMCA/IC0xIDogKG5vdyArIGRmT3B0cy5kdXJhdGlvbiAqIDEwMDApICwgLy8gLTEg5LiN6ZmQ5Yi25pe26Ze0XG4gICAgICB2YWx1ZSAgIDogdmFsdWVcbiAgICB9O1xuXG4gICAga2V5ID0gdGhpcy5kZk9wdGlvbnMucHJlZml4ICsga2V5O1xuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5BcHBDYWNoZTtcbiAgICB0cnl7XG4gICAgICB0aGlzLl9tYXBba2V5XSA9IG5ld1ZhbDtcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKGtleSwgbmV3VmFsKTtcbiAgICAgIGRmT3B0cy5zdWNjZXNzLmNhbGwoZGZPcHRzLnNjb3BlKTtcbiAgICB9Y2F0Y2goZSl7XG4gICAgICBkZk9wdHMuZmFpbC5jYWxsKGRmT3B0cy5zY29wZSwgZS5tZXNzYWdlIHx8ICflj5HpgIHplJnor68nKTtcbiAgICB9XG5cbiAgfTtcblxuICAvKipcbiAgICog5piv5ZCm5YyF5ZCr5pyq6L+H5pyf55qE5YC8XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkg57yT5a2YS0VZXG4gICAqL1xuICBXeFN0b3JhZ2VDYWNoZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihrZXkpe1xuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5BcHBDYWNoZTtcbiAgICBrZXkgPSB0aGlzLmRmT3B0aW9ucy5wcmVmaXggKyBrZXk7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuX21hcFtrZXldO1xuICAgIGlmICh0eXBlb2YgdmFsdWVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIGV4cGlyZXMgPSB2YWx1ZXMuZXhwaXJlcywgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCksIHZhbHVlID0gdmFsdWVzLnZhbHVlO1xuICAgICAgaWYgKGV4cGlyZXMgIT0gLTEgJiYgZXhwaXJlcyA8IG5vdykgeyB2YWx1ZSA9IG51bGw7IH1cbiAgICAgIHJldHVybiB2YWx1ZSAhPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICog6I635Y+W57yT5a2Y5YC8XG4gICAqL1xuICBXeFN0b3JhZ2VDYWNoZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oa2V5LG9wdGlvbnMpe1xuICAgIHRoaXMuX21hcCA9IHdpbmRvdy5BcHBDYWNoZTtcbiAgICB2YXIgIF9rZXkgPSB0aGlzLmRmT3B0aW9ucy5wcmVmaXggKyBrZXk7XG4gICAgdmFyIHZhbHVlcz0gdGhpcy5fbWFwW19rZXldLGRmT3B0cyA9IHtcbiAgICAgIHJlbW92ZSAgOiBmYWxzZSwgICAgICAgIC8v6I635Y+W5YC85ZCOLOeri+WNs+enu+mZpFxuICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKCl7fSxcbiAgICAgIGZhaWwgICAgOiBmdW5jdGlvbigpe30sXG4gICAgICBzY29wZSAgIDogdGhpc1xuICAgIH07XG4gICAgY29weVRvKG9wdGlvbnMgfHwge30sIGRmT3B0cyk7XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlcyAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgdmFyIGV4cGlyZXMgPSB2YWx1ZXMuZXhwaXJlcyxub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSx2YWx1ZSA9IHZhbHVlcy52YWx1ZTtcbiAgICAgIGlmIChleHBpcmVzICE9IC0xICYmIGV4cGlyZXMgPCBub3cpe1xuICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZih2YWx1ZSA9PSBudWxsKXtcbiAgICAgICAgZGZPcHRzLmZhaWwuY2FsbChkZk9wdHMuc2NvcGUsJ+e8k+WtmOS4jeWtmOWcqCcpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGlmIChkZk9wdHMucmVtb3ZlKXsgdGhpcy5yZW1vdmUoeyBrZXk6IGtleX0pOyAgfSAvL+iHquWKqOWIoOmZpOWJjee9rlxuICAgICAgICBkZk9wdHMuc3VjY2Vzcy5jYWxsKGRmT3B0cy5zY29wZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyB3eC5nZXRTdG9yYWdlKGtleSk7XG5cbiAgfTtcblxuICAvKipcbiAgICog56e76ZmkIGtleSDlr7nlupTnmoTnvJPlrZjlgLxcbiAgICovXG4gIFd4U3RvcmFnZUNhY2hlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICB2YXIgZGZPcHRzID0ge1xuICAgICAga2V5ICAgICA6ICcnLFxuICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKCl7fSxcbiAgICAgIGZhaWwgICAgOiBmdW5jdGlvbigpe30sXG4gICAgICBzY29wZSAgIDogdGhpc1xuICAgIH0sdGhhdCA9IHRoaXM7XG4gICAgaWYodHlwZW9mIG9wdGlvbnMgPT0gJ3N0cmluZycgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgIGRmT3B0cy5rZXkgPSBvcHRpb25zO1xuICAgIH1lbHNle1xuICAgICAgY29weVRvKG9wdGlvbnMgfHwge30gLCBkZk9wdHMpO1xuICAgIH1cblxuICAgIHZhciBrZXkgID0gZGZPcHRzLmtleTtcbiAgICB0aGlzLl9tYXAgPSB3aW5kb3cuQXBwQ2FjaGU7XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKXtcbiAgICAgIGtleSA9IHRoaXMuZGZPcHRpb25zLnByZWZpeCArIGtleTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9tYXBba2V5XTtcbiAgICAgIHRyeXtcbiAgICAgICAgd3gucmVtb3ZlU3RvcmFnZVN5bmMoa2V5KTtcbiAgICAgICAgZGZPcHRzLnN1Y2Nlc3MuY2FsbChkZk9wdHMuc2NvcGUsIGtleSk7Ly/lm57osINcbiAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIGRmT3B0cy5mYWlsLmNhbGwoZGZPcHRzLnNjb3BlLCBlLm1lc3NhZ2UgfHwgJ+WPkemAgemUmeivrycpO1xuICAgICAgfVxuICAgIH1lbHNlIGlmKGtleSBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgIHRyeXtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGtleS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIHZhciBrID0ga2V5W2ldO1xuICAgICAgICAgIGsgPSB0aGlzLmRmT3B0aW9ucy5wcmVmaXggKyBrO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9tYXBba107ICAgICAgICAgICAgICAgICAgIC8v5b6q546v5omn6KGM5Yig6ZmkXG4gICAgICAgICAgd3gucmVtb3ZlU3RvcmFnZVN5bmMoayk7XG4gICAgICAgIH1cbiAgICAgICAgZGZPcHRzLnN1Y2Nlc3MuY2FsbChkZk9wdHMuc2NvcGUsIGtleSk7XG4gICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgZGZPcHRzLmZhaWwuY2FsbChkZk9wdHMuc2NvcGUsIGUubWVzc2FnZSB8fCAn5Y+R6YCB6ZSZ6K+vJyk7XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICB0aHJvdyAna2V55Lyg5Y+C57G75Z6L5pyJ6K+vJztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIOa4hemZpOaJgOaciee8k+WtmFxuICAgKi9cbiAgV3hTdG9yYWdlQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oc3VjY2VzcyxmYWlsKXtcblxuICAgIHRyeXtcbiAgICAgIHZhciBjbGVhcktleXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9tYXApIHtcbiAgICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuZGZPcHRpb25zLnByZWZpeCkgPT0gMCkge1xuICAgICAgICAgIGNsZWFyS2V5cy5wdXNoKGtleS5zdWJzdHJpbmcodGhpcy5kZk9wdGlvbnMucHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX21hcCA9IHdpbmRvdy5BcHBDYWNoZSA9IHt9O1xuICAgICAgdGhpcy5fZGVzdG9yeUludGVydmFsKCk7XG5cbiAgICAgIGlmIChjbGVhcktleXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnJlbW92ZShjbGVhcktleXMsIHN1Y2Nlc3MgfHwgZnVuY3Rpb24gKCkgeyB9LCBmYWlsIHx8IGZ1bmN0aW9uICgpIHsgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlb2Ygc3VjY2VzcyA9PSAnZnVuY3Rpb24nICYmIHN1Y2Nlc3MoKTtcbiAgICAgIH1cbiAgICB9Y2F0Y2goZSl7XG4gICAgICB0eXBlb2YgZmFpbCA9PSAnZnVuY3Rpb24nICYmIGZhaWwoKTtcbiAgICB9XG5cbiAgfTtcblxuICAvKipcbiAgICog5Yig6Zmk5omA5pyJ6L+H5pyf55qE5YC8XG4gICAqL1xuICBXeFN0b3JhZ2VDYWNoZS5wcm90b3R5cGUuZGVsZXRlQWxsRXhwaXJlcyA9IGZ1bmN0aW9uKHN1Y2Nlc3MsZmFpbCl7XG4gICAgdGhpcy5fbWFwID0gd2luZG93LkFwcENhY2hlO1xuICAgIC8v5aSE55CGTWFw5Lit6L+H5pyf55qEa2V5LOS5i+WQjiDnu5kgcmVtb3ZlIOWkhOeQhlxuICAgIHZhciBkZWxLZXlzID0gW10sIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9tYXApIHtcbiAgICAgIHZhciB2YWx1ZXMgPSB0aGlzLl9tYXBba2V5XSxcbiAgICAgICAgZXhwaXJlcyA9IHZhbHVlcy5leHBpcmVzO1xuICAgICAgaWYgKGV4cGlyZXMgIT0gLTEgJiYgZXhwaXJlcyA8IG5vdykgey8v6I635Y+W5YC8LOagueaNrmV4cGlyZXMg5Yik5pat5piv5ZCm55yf5a6e5Yig6ZmkXG4gICAgICAgIGRlbEtleXMucHVzaChrZXkuc3Vic3RyaW5nKHRoaXMuZGZPcHRpb25zLnByZWZpeC5sZW5ndGgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGVsS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnJlbW92ZShkZWxLZXlzLHN1Y2Nlc3MgfHwgZnVuY3Rpb24oKXt9ICwgZmFpbCB8fCBmdW5jdGlvbigpe30pO1xuICAgIH1lbHNle1xuICAgICAgdHlwZW9mIHN1Y2Nlc3MgPT0gJ2Z1bmN0aW9uJyAmJiBzdWNjZXNzKCk7XG4gICAgfVxuXG4gIH07XG5cbiAgSG9vLmRlZmluZSgnSG9vLnV0aWwuQ2FjaGUnLCB7XG4gICAgc3RhdGljczogbmV3IFd4U3RvcmFnZUNhY2hlKClcbiAgfSk7XG59KSgpO1xuXG5cbnZhciB0aW1lYWdvID0gcmVxdWlyZShcInRpbWVhZ28uanNcIik7XG52YXIgdGEgPSB0aW1lYWdvKCk7XG5Ib28uZGVmaW5lKCdIb28udXRpbC5EYXRlJywge1xuICBzdGF0aWNzOiB7XG4gICAgZm9ybWF0OiBmdW5jdGlvbiAoZGF0ZSwgcGF0dGVybil7XG4gICAgICB2YXIgbyA9IHtcbiAgICAgICAgXCJNK1wiOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAgICAgICAgICAgICAgICAgLy/mnIjku71cbiAgICAgICAgXCJkK1wiOiBkYXRlLmdldERhdGUoKSwgICAgICAgICAgICAgICAgICAgIC8v5pelXG4gICAgICAgIFwiSCtcIjogZGF0ZS5nZXRIb3VycygpLFxuICAgICAgICBcImgrXCI6IGRhdGUuZ2V0SG91cnMoKSAlIDEyID09IDAgPyAxMiA6IGRhdGUuZ2V0SG91cnMoKSAlIDEyICwgICAgICAgICAgICAgICAgICAgLy/lsI/ml7ZcbiAgICAgICAgXCJtK1wiOiBkYXRlLmdldE1pbnV0ZXMoKSwgICAgICAgICAgICAgICAgIC8v5YiGXG4gICAgICAgIFwicytcIjogZGF0ZS5nZXRTZWNvbmRzKCksICAgICAgICAgICAgICAgICAvL+enklxuICAgICAgICBcInErXCI6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksIC8v5a2j5bqmXG4gICAgICAgIFwiU1wiOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpICAgICAgICAgICAgIC8v5q+r56eSXG4gICAgICB9LCBmbXQgPSBwYXR0ZXJuIHx8ICd5eXl5LU1NLWRkIEhIOm1tOnNzJztcbiAgICAgIGlmICgvKHkrKS8udGVzdChmbXQpKVxuICAgICAgICBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIChkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIlwiKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTtcbiAgICAgIGZvciAodmFyIGsgaW4gbylcbiAgICAgICAgaWYgKG5ldyBSZWdFeHAoXCIoXCIgKyBrICsgXCIpXCIpLnRlc3QoZm10KSlcbiAgICAgICAgICBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIChSZWdFeHAuJDEubGVuZ3RoID09IDEpID8gKG9ba10pIDogKChcIjAwXCIgKyBvW2tdKS5zdWJzdHIoKFwiXCIgKyBvW2tdKS5sZW5ndGgpKSk7XG4gICAgICByZXR1cm4gZm10O1xuICAgIH0sXG4gICAgdGltZWFnbyA6IGZ1bmN0aW9uKGRhdGUpe1xuICAgICAgcmV0dXJuIHRhLmZvcm1hdChkYXRlLCd6aF9DTicpO1xuICAgIH1cbiAgfVxufSk7XG5cbkhvby5kYXRlID0gSG9vLnV0aWwuRGF0ZTtcblxuSG9vLmRlZmluZSgnSG9vLmJyaWRnZS5zdG9yYWdlJywge1xuICBzdGF0aWNzOiB7XG4gICAgcHV0SXRlbTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIGNhbGxiYWNrLCBzY29wZSkge1xuXG4gICAgfSxcbiAgICBnZXRJdGVtOiBmdW5jdGlvbiAoa2V5LCBjYWxsYmFjaywgc2NvcGUpIHtcblxuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogZnVuY3Rpb24gKGtleSkge1xuXG4gICAgfSxcbiAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuXG4gICAgfVxuICB9XG59KTtcblxuXG5Ib28uZGVmaW5lKCdIb28uYnJpZGdlLmRvYycsIHtcbiAgc3RhdGljczoge1xuICAgIHNldFRpdGxlOiBmdW5jdGlvbiAoY2ZnKSB7XG5cbiAgICB9XG4gIH1cbn0pO1xuXG5Ib28uZGVmaW5lKCdIb28uYnJpZGdlLndpZGdldCcse1xuICBzdGF0aWNzIDoge1xuICAgIHRvYXN0OiBmdW5jdGlvbiAoY2ZnKXt9LFxuICAgIHRpcDoge1xuICAgICAgZXJyb3IgIDogZnVuY3Rpb24gKGNmZykge30sXG4gICAgICB3YXJuaW5nOiBmdW5jdGlvbiAoY2ZnKSB7fSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChjZmcpIHt9XG4gICAgfSxcbiAgICBhbGVydCAgIDogZnVuY3Rpb24oY2ZnKXt9LFxuICAgIGNvbmZpcm0gOiBmdW5jdGlvbihjZmcpe30sXG4gICAgYWN0aW9uU2hlZXQgOiBmdW5jdGlvbihjZmcpe31cbiAgfVxufSk7XG5cbkhvby5kZWZpbmUoJ0hvby5icmlkZ2UubG9jYXRpb24nLCB7XG4gIHN0YXRpY3M6IHtcbiAgICBocmVmOiBmdW5jdGlvbiAoY2ZnKSB7XG5cbiAgICB9LFxuICAgIHJlcGxhY2U6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICByZWRpcmVjdDogZnVuY3Rpb24gKCkgeyB9LFxuICAgIGJhY2sgICA6IGZ1bmN0aW9uKCl7XG4gICAgICAvLyDmlK/mjIEgIHVuZGVmaW5lZCAtLT4gMVxuICAgICAgLy8gICAgICBpbmRleCAgICAgICAgICBpbnRcbiAgICAgIC8vICAgICAgcm91dGUgICAgICAgICAgU3RyaW5nXG5cbiAgICB9LFxuICAgIHJlcGxhY2U6IGZ1bmN0aW9uIChjZmcpIHtcblxuICAgIH1cbiAgfVxufSk7XG5cbkhvby5kZWZpbmUoJ0hvby5icmlkZ2UubmV0Jywge1xuICBzdGF0aWNzOiB7XG4gICAgYmFzZVBhdGg6IG51bGwsXG4gICAgc2V0QmFzZVBhdGggOiBmdW5jdGlvbigpe30sXG4gICAgdXBsb2FkICA6IGZ1bmN0aW9uIChjZmcpIHsgfSxcbiAgICBwb3N0ICAgIDogZnVuY3Rpb24gKGNmZykgeyB9LFxuICAgICdnZXQnICAgOiBmdW5jdGlvbihjZmcpe30sXG4gICAgZG93bmxvYWQ6IGZ1bmN0aW9uIChjZmcpIHsgfVxuICB9XG59KTtcblxuSG9vLmRlZmluZSgnSG9vLmJyaWRnZS5tZWRpYScsIHtcbiAgc3RhdGljczoge1xuICAgIGNob29zZUltYWdlOiBmdW5jdGlvbiAoY2ZnKSB7XG5cblxuICAgIH1cbiAgfVxufSk7XG5cbkhvby5kZWZpbmUoJ0hvby5icmlkZ2UuZGV2aWNlJywge1xuICBzdGF0aWNzOiB7XG4gICAgc2NhbkNvZGU6IGZ1bmN0aW9uIChjZmcpIHtcblxuICAgIH1cbiAgfVxufSk7XG5cbkhvby5hcHBseShIb28uYnJpZGdlLmRiLCB7fSk7XG5cbkhvby5hcHBseShIb28uYnJpZGdlLnN0b3JhZ2UsIHtcbiAgcHV0SXRlbTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgIHRyeSB7XG4gICAgICB3eC5zZXRTdG9yYWdlU3luYyhrZXksIHZhbHVlKTtcbiAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjay5jYWxsKHNjb3BlIHx8IHRoaXMpOyB9XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgfSxcbiAgZ2V0SXRlbTogZnVuY3Rpb24gKGtleSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgdmFsdWUgPSB3eC5nZXRTdG9yYWdlU3luYyhrZXkpO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJykgeyB2YWx1ZSA9IG51bGw7IH1cbiAgICB9IGNhdGNoIChlKSB7IHZhbHVlID0gbnVsbDsgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrLmNhbGwoc2NvcGUgfHwgdGhpcywgdmFsdWUpOyB9XG4gIH0sXG4gIHJlbW92ZUl0ZW06IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB0cnkge1xuICAgICAgd3gucmVtb3ZlU3RvcmFnZVN5bmMoa2V5KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICB9LFxuICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICB3eC5jbGVhclN0b3JhZ2VTeW5jKCk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgfVxufSk7XG5cblxuSG9vLmFwcGx5KEhvby5icmlkZ2UuZG9jLCB7XG4gIHNldFRpdGxlOiBmdW5jdGlvbiAoY2ZnKSB7XG4gICAgaWYgKHR5cGVvZiBjZmcgPT0gJ3N0cmluZycpIHsgY2ZnID0geyB0aXRsZTogY2ZnIH07IH1cbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoY2ZnKTtcbiAgfVxufSk7XG5cblxuSG9vLmFwcGx5KEhvby5icmlkZ2Uud2lkZ2V0LHtcbiAgdG9hc3QgICA6IGZ1bmN0aW9uKCl7XG5cbiAgfSxcbiAgdGlwICAgICA6IHtcbiAgICBlcnJvciAgIDogZnVuY3Rpb24gKGNmZyl7XG4gICAgICBpZiAodHlwZW9mIGNmZyA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG4gICAgICBpZiAodHlwZW9mIGNmZyA9PT0gJ3N0cmluZycpIHsgY2ZnID0geyB0aXRsZTogY2ZnIH07IH1cbiAgICAgIHZhciB1cmwgPSBnZXRBcHAoKS5nZXRDdXJyZW50VXJsKCksIHByZWZpeCA9ICcnLFxuICAgICAgICBkZkNmZyA9IHsgaW1hZ2U6ICdyZXMvaW1hZ2UvaWNvbnMvZXJyb3IucG5nJyB9O1xuICAgICAgZm9yKHZhciBpPTAsbGVuID0gdXJsLnNwbGl0KCcvJykubGVuZ3RoIC0gMTsgaTxsZW47aSsrKXsgIHByZWZpeCArPSAnLi4vJzsgfVxuICAgICAgZGZDZmcuaW1hZ2UgPSBwcmVmaXggKyBkZkNmZy5pbWFnZTtcbiAgICAgIEhvby5jb3B5VG8oY2ZnLCBkZkNmZyk7XG5cbiAgICAgIHd4LnNob3dUb2FzdChkZkNmZyk7XG4gICAgfSxcbiAgICB3YXJuaW5nIDogZnVuY3Rpb24oY2ZnKXt9LFxuICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAoY2ZnKXtcbiAgICAgIGlmKHR5cGVvZiBjZmcgPT09ICd1bmRlZmluZWQnKXsgcmV0dXJuOyB9XG4gICAgICBpZih0eXBlb2YgY2ZnID09PSAnc3RyaW5nJyl7IGNmZyA9IHsgdGl0bGUgOiBjZmcgfTt9XG4gICAgICBpZih0eXBlb2YgY2ZnLm1zZyA9PSAnc3RyaW5nJykgeyBjZmcudGl0bGUgPSBjZmcubXNnOyB9XG5cbiAgICAgIHZhciBkZkNmZyA9IHsgaWNvbjogJ3N1Y2Nlc3MnLCBkdXJhdGlvbjogMTUwMCwgYWZ0ZXJTaG93IDogZnVuY3Rpb24oKXt9ICwgc2NvcGUgOiB0aGlzfTtcbiAgICAgIEhvby5jb3B5VG8oY2ZnLGRmQ2ZnKTtcblxuICAgICAgd3guc2hvd1RvYXN0KGRmQ2ZnKTtcbiAgICAgIGlmKGRmQ2ZnLmR1cmF0aW9uID4gMCl7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgZGZDZmcuYWZ0ZXJTaG93LmNhbGwoZGZDZmcuc2NvcGUpOyB9LGRmQ2ZnLmR1cmF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGFsZXJ0ICAgOiBmdW5jdGlvbihjZmcpe1xuICAgIGlmKHR5cGVvZiBjZmcgPT0gJ3VuZGVmaW5lZCcpeyByZXR1cm47IH1cbiAgICBpZih0eXBlb2YgY2ZnID09ICdzdHJpbmcnKXsgY2ZnID0geyBjb250ZW50IDogY2ZnfTt9XG4gICAgaWYgKHR5cGVvZiBjZmcubXNnID09ICdzdHJpbmcnKSB7IGNmZy5jb250ZW50ID0gY2ZnLm1zZzsgfVxuICAgIHZhciBkZkNmZyA9IHtcbiAgICAgIHRpdGxlICAgICAgOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQgICAgOiAnJyxcbiAgICAgIHNob3dDYW5jZWwgOiBmYWxzZSxcbiAgICAgIHN1Y2Nlc3MgICAgOiBmdW5jdGlvbigpe30sXG4gICAgICBmYWlsICAgICAgIDogZnVuY3Rpb24oKXt9XG4gICAgfTtcbiAgICBIb28uY29weVRvKGNmZyB8fCB7fSAsIGRmQ2ZnKTtcblxuICAgIHd4LnNob3dNb2RhbChkZkNmZyk7XG4gIH0sXG4gIGNvbmZpcm0gOiBmdW5jdGlvbihjZmcpe1xuICAgIGlmICh0eXBlb2YgY2ZnID09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuICAgIGlmICh0eXBlb2YgY2ZnID09ICdzdHJpbmcnKSB7IGNmZyA9IHsgY29udGVudDogY2ZnIH07IH1cbiAgICB2YXIgZGZDZmcgPSB7XG4gICAgICB0aXRsZSAgICAgOiAn6K+36YCJ5oupJyxcbiAgICAgIGNvbnRlbnQgICA6ICcnLFxuICAgICAgc2hvd0NhbmNlbDogdHJ1ZSxcbiAgICAgIHN1Y2Nlc3MgICA6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICAgIGZhaWwgICAgICA6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICAgIHNjb3BlICAgICA6IHRoaXNcbiAgICB9O1xuICAgIEhvby5jb3B5VG8oY2ZnIHx8IHt9LCBkZkNmZyk7XG4gICAgY29uc3Qgc3VjY2VzcyA9IGRmQ2ZnLnN1Y2Nlc3Msc2NvcGUgPSBkZkNmZy5zY29wZTtcbiAgICBkZkNmZy5zdWNjZXNzID0gZnVuY3Rpb24ocmVzKXtcbiAgICAgIGlmIChyZXMuY29uZmlybSkgeyBzdWNjZXNzLmNhbGwoc2NvcGUpOyB9IGVsc2UgeyBkZkNmZy5mYWlsLmNhbGwoc2NvcGUpO31cbiAgICB9XG4gICAgZGVsZXRlIGRmQ2ZnLnNjb3BlO1xuICAgIHd4LnNob3dNb2RhbChkZkNmZyk7XG4gIH0sXG4gIGFjdGlvblNoZWV0OiBmdW5jdGlvbiAoY2ZnKSB7XG4gICAgaWYgKHR5cGVvZiBjZmcgIT09ICdvYmplY3QnKSB7IHJldHVybjsgfVxuICAgIHZhciBkZkNmZyA9IHtcbiAgICAgIGl0ZW1zIDogW10sIC8vIOm7mOiupOWxnuaAp+agvOW8jyAgeyBsYWJlbCA6ICcnLCBleCA6ICcnfVxuICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGluZGV4LGl0ZW0pe30sXG4gICAgICBmYWlsICAgIDogZnVuY3Rpb24oKXt9LFxuICAgICAgc2NvcGUgICA6IHRoaXNcbiAgICB9O1xuICAgIEhvby5jb3B5VG8oY2ZnIHx8IHt9LCBkZkNmZyk7XG4gICAgdmFyIGl0ZW1zID0gZGZDZmcuaXRlbXMsaXRlbSA9IGl0ZW1zLmxlbmd0aCA+IDAgPyBpdGVtc1swXSA6IG51bGwsbGFiZWxzID0gW107XG4gICAgaWYoaXRlbSA9PSBudWxsKXsgcmV0dXJuOyB9XG4gICAgaWYodHlwZW9mIGl0ZW0gPT0gJ29iamVjdCcpe1xuICAgICAgaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7IGxhYmVscy5wdXNoKGl0ZW0ubGFiZWwgfHwgJycpOyB9KTtcbiAgICB9ZWxzZXtcbiAgICAgIGxhYmVscyA9IFtdLmNvbmNhdChpdGVtcyk7XG4gICAgfVxuXG4gICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgIGl0ZW1MaXN0OiBsYWJlbHMsXG4gICAgICBzdWNjZXNzIDogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBpZiAocmVzLmNhbmNlbCkgeyBkZkNmZy5mYWlsLmNhbGwoZGZDZmcuc2NvcGUpOyB9ZWxzZXtcbiAgICAgICAgICBkZkNmZy5zdWNjZXNzLmNhbGwoZGZDZmcuc2NvcGUsIHJlcy50YXBJbmRleCwgZGZDZmcuaXRlbXNbcmVzLnRhcEluZGV4XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG59KTtcblxuSG9vLmFwcGx5KEhvby5icmlkZ2UubG9jYXRpb24sIHtcbiAgaHJlZjogZnVuY3Rpb24gKGNmZykge1xuICAgIGlmICh0eXBlb2YgY2ZnID09ICdzdHJpbmcnKSB7IGNmZyA9IHsgdXJsOiBjZmcgfTsgfVxuICAgIHZhciBkZkNmZyA9IHsgdXJsOiAnJywgcGFyYW1zOiB7fSB9O1xuICAgIEhvby5jb3B5VG8oY2ZnLCBkZkNmZyk7XG4gICAgaWYgKCFIb28uaXNFbXB0eShkZkNmZy5wYXJhbXMpKSB7XG4gICAgICB2YXIgdXJsID0gZGZDZmcudXJsICsgJz8nLCBwYXJhbXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBkZkNmZy5wYXJhbXMpe1xuICAgICAgICB2YXIgdmFsdWUgPSBkZkNmZy5wYXJhbXNba2V5XTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHsgY29udGludWU7IH1lbHNlXG4gICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpeyB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTsgfVxuICAgICAgICBwYXJhbXMucHVzaChrZXkgKyAnPScgKyB2YWx1ZSApO1xuICAgICAgfVxuICAgICAgdXJsICs9IHBhcmFtcy5qb2luKCcmJyk7XG4gICAgICBkZWxldGUgZGZDZmcucGFyYW1zO1xuICAgICAgZGZDZmcudXJsID0gdXJsO1xuICAgIH1cbiAgICB3eC5uYXZpZ2F0ZVRvKGRmQ2ZnKTtcbiAgfSxcbiAgcmVwbGFjZSA6IGZ1bmN0aW9uKCl7fSxcbiAgLy/mlK/mjIHpobXpnaLot7PovaxcbiAgcmVkaXJlY3Q6IGZ1bmN0aW9uKGNmZyl7XG4gICAgaWYgKHR5cGVvZiBjZmcgPT0gJ3N0cmluZycpIHsgY2ZnID0geyB1cmw6IGNmZyB9OyB9XG4gICAgdmFyIGRmQ2ZnID0geyB1cmw6ICcnLCBwYXJhbXM6IHt9IH07XG4gICAgSG9vLmNvcHlUbyhjZmcsIGRmQ2ZnKTtcbiAgICBpZiAoIUhvby5pc0VtcHR5KGRmQ2ZnLnBhcmFtcykpIHtcbiAgICAgIHZhciB1cmwgPSBkZkNmZy51cmwgKyAnPycsIHBhcmFtcyA9IFtdO1xuICAgICAgZm9yICh2YXIga2V5IGluIGRmQ2ZnLnBhcmFtcykge1xuICAgICAgICB2YXIgdmFsdWUgPSBkZkNmZy5wYXJhbXNba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHsgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7IH1cbiAgICAgICAgcGFyYW1zLnB1c2goa2V5ICsgJz0nICsgdmFsdWUpO1xuICAgICAgfVxuICAgICAgdXJsICs9IHBhcmFtcy5qb2luKCcmJyk7XG4gICAgICBkZWxldGUgZGZDZmcucGFyYW1zO1xuICAgICAgZGZDZmcudXJsID0gdXJsO1xuICAgIH1cbiAgICB3eC5yZWRpcmVjdFRvKGRmQ2ZnKTtcbiAgfSxcbiAgLy/mlK/mjIHmoLnmja7ot6/nlLHjgIxhcHAuanNvbumFjee9ruaWh+S7tuOAjSDov5Tlm57liLAg5oyH5a6a6Lev55Sx55WM6Z2iXG4gIGJhY2sgICA6IGZ1bmN0aW9uKCl7IC8v5YWz5LqOYmFja+WAvOWbnuS8oOino+WGs+aAnei3r++8miDov5Tlm57liY0g6I635Y+W5LiK5LiA57qnIHBhZ2UsIOmAmui/h+iwg+eUqCDpgJrnlKjoh6rlrprkuYnpgJrnlKjlh73mlbBb5bu66K6uXSDmiJYgc2V0RGF0YeaWueW8j+aTjeS9nFvpu5jorqTmlK/mjIFdXG4gICAgdmFyIGRlbHRhID0gdHlwZW9mIGFyZ3VtZW50c1swXSA9PSAndW5kZWZpbmVkJyA/IDEgOiBhcmd1bWVudHNbMF07XG4gICAgaWYgKHR5cGVvZiBkZWx0YSA9PSAnbnVtYmVyJyl7XG4gICAgICB3eC5uYXZpZ2F0ZUJhY2soeyBkZWx0YTogZGVsdGEgfSk7XG4gICAgfWVsc2UgaWYodHlwZW9mIGRlbHRhID09ICdzdHJpbmcnKXsgLy8gcm91dGUg5pSv5oyBXG4gICAgICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKSwgdG90YWwgPSBwYWdlcy5sZW5ndGgsY29weSA9IHBhZ2VzLmNvbmNhdCgpLnJldmVyc2UoKSxpbmRleCA9IC0xO1xuICAgICAgZm9yKHZhciBpPTAgO2kgPCB0b3RhbCA7IGkrKyl7XG4gICAgICAgIHZhciBwYWdlID0gY29weVtpXTtcbiAgICAgICAgaWYgKHBhZ2Uucm91dGUgPT0gZGVsdGEpIHsgaW5kZXggPSBpOyBicmVhazsgfVxuICAgICAgfVxuICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgZGVsdGEgOiBpbmRleCA9PSAtMSA/IHRvdGFsICsgMSA6IGluZGV4XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyog5pqC5LiN5pSv5oyB77yM5Y+m5aSW5bCP56iL5bqP6ZmQ5Yi2LOi/lOWbniB0YWJCYXLpobXpnaIs6ZyA6KaB5by65Yi2IGxlbmd0aCDlpKfkuo7lvZPliY3moIjljbPlj69cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVsdGEgPT0gJ29iamVjdCcpe30qL1xuICB9LFxuICByZXBsYWNlOiBmdW5jdGlvbiAoY2ZnKSB7XG5cbiAgfVxufSk7XG5cbkhvby5hcHBseShIb28uYnJpZGdlLm5ldCwge1xuICAvL2Jhc2VQYXRoOiAnaHR0cDovLzE5Mi4xNjguMS4xNDk6ODA4MC9JTVMvJywgLy9UT0RPIOWOn+WImeS4iu+8jOS4jeWFgeiuuOebtOaOpeabtOaUueivpeWAvFxuICBzZXRCYXNlUGF0aCA6IGZ1bmN0aW9uKGJhc2VQYXRoKXtcbiAgICBIb28uYnJpZGdlLm5ldC5iYXNlUGF0aCA9IGJhc2VQYXRoO1xuICB9LFxuICB1cGxvYWQgIDogZnVuY3Rpb24gKGNmZykge1xuICAgIGxldCBkZkNmZyA9IHtcbiAgICAgIHVybCAgICAgICAgOiAnJyxcbiAgICAgIGJhc2VQYXRoICAgOiBIb28uYnJpZGdlLm5ldC5iYXNlUGF0aCxcbiAgICAgIGRhdGEgICAgICAgOiB7fSxcbiAgICAgIG5hbWUgICAgICAgOiAnZmlsZScsXG4gICAgICBwYXRoICAgICAgIDogJycsXG4gICAgICBvblByb2dyZXNzIDogZnVuY3Rpb24ocmVzKXt9LFxuICAgICAgc3VjY2VzcyAgICA6IGZ1bmN0aW9uIChkYXRhLCByZXNwb25zZSkgeyB9LFxuICAgICAgZmFpbCAgICAgICA6IGZ1bmN0aW9uIChjb2RlLCBtc2cpIHsgfSxcbiAgICAgIGNvbXBsZXRlICAgOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgICBzY29wZSAgICAgIDogdGhpc1xuICAgIH0sIGhlYWRlciA9IHsgJ2NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9LCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpLHBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAxXTtcbiAgICBIb28uY29weVRvKGNmZyB8fCB7fSwgZGZDZmcpO1xuXG4gICAgdmFyIHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2xvZ2luX3Rva2VuJyk7XG4gICAgaWYodG9rZW4gIT0gbnVsbCAmJiAnJyAhPSB0b2tlbil7IGhlYWRlclsnTUlOSS1UT0tFTiddID0gdG9rZW47IH1cblxuICAgIC8vVE9ETyDmsYnlrZcgZW5jb2RlVVJMIOaIliBlbmNvZGVVUklDb21wb25lbnQg55qE6Zeu6aKYXG4gICAgY29uc3QgdXBsb2FkVGFzayA9IHd4LnVwbG9hZEZpbGUoe1xuICAgICAgdXJsICAgICA6IChkZkNmZy5iYXNlUGF0aCB8fCAnJykgKyBkZkNmZy51cmwsXG4gICAgICBmaWxlUGF0aDogZGZDZmcucGF0aCxcbiAgICAgIG5hbWUgICAgOiBkZkNmZy5uYW1lIHx8ICdmaWxlJyxcbiAgICAgIGZvcm1EYXRhOiBkZkNmZy5kYXRhIHx8IHt9LFxuICAgICAgaGVhZGVyICA6IGhlYWRlcixcbiAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9IDIwMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7IC8v5ZON5bqU5Y6f5pWw5o2uXG4gICAgICAgICAgaWYodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKXsgdHJ5eyBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTsgfWNhdGNoKGUpe30gfVxuICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT0gMCB8fCBkYXRhLmNvZGUgPT0gJzAnIHx8IGRhdGEuY29kZSA9PSAnMjAwJykgeyAvLyAyMDDkuLrkuoblhbzlrrlub2RlanMgYXBpXG4gICAgICAgICAgICBkZkNmZy5zdWNjZXNzLmNhbGwoZGZDZmcuc2NvcGUsIGRhdGEuZGF0YSwgZGF0YSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRmQ2ZnLmZhaWwuY2FsbChkZkNmZy5zY29wZSwgJycgKyBkYXRhLmNvZGUsIGRhdGEubXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGZDZmcuZmFpbC5jYWxsKGRmQ2ZnLnNjb3BlLCAnJyArIHJlcy5zdGF0dXNDb2RlLCByZXMuZXJyTXNnKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZhaWwgICAgOiBmdW5jdGlvbihyZXMpe1xuICAgICAgICBkZkNmZy5mYWlsLmNhbGwoZGZDZmcuc2NvcGUsICc1MDAnLCByZXMuZXJyTXNnKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgZGZDZmcuY29tcGxldGUuYXBwbHkoZGZDZmcuc2NvcGUsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfSlcbiAgICB1cGxvYWRUYXNrLm9uUHJvZ3Jlc3NVcGRhdGUoKHJlcykgPT4ge1xuICAgICAgZGZDZmcub25Qcm9ncmVzcy5jYWxsKGRmQ2ZnLnNjb3BlLHtcbiAgICAgICAgcHJvZ3Jlc3MgIDogcmVzLnByb2dyZXNzLFxuICAgICAgICBzZW5kQnl0ZXMgOiByZXMudG90YWxCeXRlc1NlbnQsXG4gICAgICAgIHRvdGFsQnl0ZXM6IHJlcy50b3RhbEJ5dGVzRXhwZWN0ZWRUb1NlbmRcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgaWYgKHBhZ2UuYWRkTGlzdGVuZXIpIHtcbiAgICAgIHBhZ2UuYWRkTGlzdGVuZXIoJ2JlZm9yZVVubG9hZCcsZnVuY3Rpb24oKXtcbiAgICAgICAgdHJ5IHsgdXBsb2FkVGFzay5hYm9ydCgpIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbmNlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkgeyB1cGxvYWRUYXNrLmFib3J0KCkgfWNhdGNoKGUpe30gLy8g5Y+W5raI5LiK5Lyg5Lu75YqhXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwb3N0ICA6IGZ1bmN0aW9uIChjZmcpIHtcbiAgICAvLyBUT0RPIOeUseS6juW+ruS/oeWwj+eoi+W6j0MvU+eJueeCuSzmlYXogIzlnKjov5nph4zpnIDmo4DmtYsg55So5oi355m75b2V54q25oCB44CB6I635Y+W55So5oi3b3Blbl9pZCDlj5HpgIHmnI3liqHlmajojrflj5YzcmRzZXNzaW9uLOS+m+acjeWKoeWZqOWIpOWIq+W9k+WJjeeUqOaIt1xuICAgIC8v5byA5ZCv57yT5a2YIGNoYWNoZSA6IHRydWUgLyBjYWNoZSA6IHsgZW5hYmxlIDogdHJ1ZSAsIHRpbWVvdXQgOiAn57yT5a2Y5pe26ZW/JyAsIGZvcmNlUmVmcmVzaCA6IGZhbHNlIH1cbiAgICBsZXQgZGZDYWNoZSA9IHtcbiAgICAgIGVuYWJsZSA6IGZhbHNlLCAgICAgICAvL+aYr+WQpuW8gOWQr+e8k+WtmFxuICAgICAgZm9yY2VSZWZyZXNoIDogZmFsc2UsIC8v5piv5ZCm5by65Yi25paw55qE6K+35rGCXG4gICAgICB0aW1lb3V0OiA2MCAqIDMwICAgICAgLy/nvJPlrZggMzAg5YiG6ZKfXG4gICAgfSxkZkNmZyA9IHtcbiAgICAgIHVybCAgICAgOiAnJyxcbiAgICAgIGJhc2VQYXRoOiBIb28uYnJpZGdlLm5ldC5iYXNlUGF0aCxcbiAgICAgIGRhdGEgICAgOiB7fSxcbiAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhLHJlc3BvbnNlKXt9LFxuICAgICAgZmFpbCAgICA6IGZ1bmN0aW9uKGNvZGUsbXNnKXt9LFxuICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCl7fSxcbiAgICAgIHNjb3BlICAgOiB0aGlzLFxuICAgICAgY2FjaGUgICA6IGZhbHNlLFxuICAgICAgc2hvd1RvYXN0OiB0cnVlLFxuICAgICAgbG9hZGluZyAgOiBmYWxzZSxcbiAgICAgIC8vIGltYWdlICAgIDogJy4uLy4uL3Jlcy9pbWFnZS9pY29ucy9lcnJvci5wbmcnLFxuICAgICAgaGVhZGVyICAgOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9XG4gICAgfSwgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKSwgcGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdO1xuICAgIC8vIGhlYWRlciA9IHsgJ0NvbnRlbnQtVHlwZSc6ICAnYXBwbGljYXRpb24vanNvbicgfTtcbiAgICBIb28uY29weVRvKGNmZyB8fCB7fSxkZkNmZyk7XG4gICAgaWYgKGRmQ2ZnLnNob3dUb2FzdCkgeyB3eC5oaWRlTG9hZGluZygpOyB9XG4gICAgdmFyIGhlYWRlciA9IGRmQ2ZnLmhlYWRlcjtcblxuICAgIHZhciB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dpbl90b2tlbicpO1xuICAgIGlmICh0b2tlbiAhPSBudWxsICYmICcnICE9IHRva2VuKSB7IGhlYWRlclsnTUlOSS1UT0tFTiddID0gdG9rZW47IH1cblxuICAgIGlmIChkZkNmZy5sb2FkaW5nKSB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpOyB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295LitJyB9KTtcbiAgICB9XG5cbiAgICAvL1RPRE8g57yT5a2Y5aSE55CGXG4gICAgdmFyIGNhY2hlID0gZGZDZmcuY2FjaGU7XG4gICAgaWYodHlwZW9mIGNhY2hlID09ICdib29sZWFuJyl7IGRmQ2FjaGUuZW5hYmxlID0gY2FjaGU7IH1lbHNlIGlmKHR5cGVvZiBjYWNoZSA9PSAnb2JqZWN0Jyl7IEhvby5jb3B5VG8oY2FjaGUsZGZDYWNoZSk7IH1cbiAgICBkZkNmZy5jYWNoZSA9IGRmQ2FjaGU7XG5cbiAgICBjb25zdCBlbmFjbGVDYWNoZSA9IGRmQ2ZnLmNhY2hlLmVuYWJsZSxrZXkgPSAoZGZDZmcuYmFzZVBhdGggfHwgJycpICsgZGZDZmcudXJsICsgKHR5cGVvZiBkZkNmZy5kYXRhID09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkoZGZDZmcuZGF0YSkgOiBkZkNmZy5kYXRhKTtcbiAgICBpZiAoIWRmQ2ZnLmNhY2hlLmZvcmNlUmVmcmVzaCAmJiBlbmFjbGVDYWNoZSAmJiBIb28udXRpbC5DYWNoZS5jb250YWlucyhrZXkpKXtcbiAgICAgIEhvby51dGlsLkNhY2hlLmdldChrZXksIHtcbiAgICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgZGZDZmcuc3VjY2Vzcy5jYWxsKGRmQ2ZnLnNjb3BlLCBkYXRhLmRhdGEsIGRhdGEpO1xuICAgICAgICAgIGlmIChkZkNmZy5sb2FkaW5nKSB7IHd4LmhpZGVMb2FkaW5nKCk7IH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICBjb25zdCByZXF1ZXN0VGFzayA9IHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsICAgIDogKGRmQ2ZnLmJhc2VQYXRoIHx8ICcnKSArIGRmQ2ZnLnVybCxcbiAgICAgIGRhdGEgICA6IGRmQ2ZnLmRhdGEgfHwge30sXG4gICAgICBoZWFkZXIgOiBoZWFkZXIsXG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlID0gMjAwKXtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhOyAvL+WTjeW6lOWOn+aVsOaNrlxuICAgICAgICAgIC8vVE9ETyDmoLnmja7mlbDmja7moLzlvI/ov5vooYzmlbDmja7liIblj5Es5aaC5p6c5Lia5Yqh6YC76L6R5q2j5bi4ICYg5aaC5p6c5Lia5Yqh6YC76L6R5aSx6LSlXG4gICAgICAgICAgLy9pZiAoZGZDZmcuc2hvd1RvYXN0KSB7IHd4LnNob3dUb2FzdCh7IHRpdGxlOiAn6K+35rGC5oiQ5YqfJywgaWNvbjogJ3N1Y2Nlc3MnLCBkdXJhdGlvbjogMTUwMCB9KTsgfVxuICAgICAgICAgIGlmIChkZkNmZy5sb2FkaW5nKXsgd3guaGlkZUxvYWRpbmcoKTsgfVxuXG4gICAgICAgICAgaWYgKGRhdGEuY29kZSA9PSAwIHx8IGRhdGEuY29kZSA9PSAnMCcgfHwgZGF0YS5jb2RlID09ICcyMDAnKXsgLy8gMjAw5Li65LqG5YW85a65bm9kZWpzIGFwaVxuICAgICAgICAgICAgZGZDZmcuc3VjY2Vzcy5jYWxsKGRmQ2ZnLnNjb3BlLCBkYXRhLmRhdGEsIGRhdGEpO1xuICAgICAgICAgICAgaWYgKGVuYWNsZUNhY2hlICYmIGRhdGEuZGF0YSAhPSBudWxsKSB7IEhvby51dGlsLkNhY2hlLnB1dChrZXksIGRhdGEpOyB9Ly9UT0RPIOiuvue9rue8k+WtmOaVsOaNruS4uiAg5oiQ5Yqf5pe25a6e6ZmF5ZON5bqU5YC8XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZiAoZGZDZmcuc2hvd1RvYXN0KSB7XG4gICAgICAgICAgICAgIGlmKHR5cGVvZiBkYXRhLmNvZGUgPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgIEhvby5icmlkZ2Uud2lkZ2V0LmFsZXJ0KCfnmbvlvZXlpLHmlYgs6K+36YCA5Ye65bm26YeN5paw6L+b5YWlJyk7IHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBIb28uYnJpZGdlLndpZGdldC50aXAuZXJyb3IoZGF0YS5tc2cgfHwgKCfor7fmsYLlvILluLgo6ZSZ6K+v56CBOicgKyBkYXRhLmNvZGUgKyAnKScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRmQ2ZnLmZhaWwuY2FsbChkZkNmZy5zY29wZSwgJycgKyBkYXRhLmNvZGUsIGRhdGEubXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGlmIChkZkNmZy5zaG93VG9hc3QpIHsgSG9vLmJyaWRnZS53aWRnZXQudGlwLmVycm9yKHJlcy5tc2cgfHwgJ+ivt+axguW8guW4uCcpOyB9XG4gICAgICAgICAgZGZDZmcuZmFpbC5jYWxsKGRmQ2ZnLnNjb3BlLCAnJyArIHJlcy5zdGF0dXNDb2RlLCByZXMubXNnKTtcbiAgICAgICAgfVxuXG4gICAgICB9LFxuICAgICAgZmFpbCAgOiBmdW5jdGlvbihyZXMpe1xuICAgICAgICBpZiAoZGZDZmcubG9hZGluZyl7IHd4LmhpZGVMb2FkaW5nKCk7IH1cbiAgICAgICAgaWYgKGRmQ2ZnLnNob3dUb2FzdCkgeyBIb28uYnJpZGdlLndpZGdldC50aXAuZXJyb3IocmVzLm1zZyB8fCAn6K+35rGC5byC5bi4Jyk7IH1cbiAgICAgICAgZGZDZmcuZmFpbC5jYWxsKGRmQ2ZnLnNjb3BlLCAnNTAwJywgcmVzLm1zZyk7XG4gICAgICB9LFxuICAgICAgY29tcGxldGUgOiBmdW5jdGlvbigpe1xuICAgICAgICBkZkNmZy5jb21wbGV0ZS5hcHBseShkZkNmZy5zY29wZSxhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHBhZ2UuYWRkTGlzdGVuZXIpIHtcbiAgICAgIHBhZ2UuYWRkTGlzdGVuZXIoJ2JlZm9yZVVubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHsgdXBsb2FkVGFzay5hYm9ydCgpIH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjYW5jZWwgOiBmdW5jdGlvbigpe1xuICAgICAgICB0cnkgeyByZXF1ZXN0VGFzay5hYm9ydCgpIH0gY2F0Y2ggKGUpIHsgfSAgLy8g5Y+W5raI6K+35rGC5Lu75YqhXG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgJ2dldCcgICA6IGZ1bmN0aW9uKGNmZyl7XG4gICAgLypkYXRhICA6IHt9LFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcjogeyAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nIH0qL1xuICB9LFxuICBkb3dubG9hZDogZnVuY3Rpb24gKGNmZykgeyB9XG59KTtcblxuSG9vLmFwcGx5KEhvby5icmlkZ2UubWVkaWEsIHtcbiAgY2hvb3NlSW1hZ2U6IGZ1bmN0aW9uIChjZmcpIHtcbiAgICB2YXIgZGZDZmcgPSB7XG4gICAgICBjb3VudCAgOiAwLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykgeyB9LFxuICAgICAgZmFpbCAgIDogZnVuY3Rpb24gKGNvZGUsbXNnKSB7IH0sXG4gICAgICBzY29wZSAgOiB0aGlzXG4gICAgfTtcbiAgICBIb28uY29weVRvKGNmZywgZGZDZmcpO1xuXG4gICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgY291bnQgIDogZGZDZmcuY291bnQsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgZmlsZVBhdGhzOiByZXMudGVtcEZpbGVQYXRocyxcbiAgICAgICAgICBmaWxlczogcmVzLnRlbXBGaWxlc1xuICAgICAgICB9O1xuICAgICAgICBpZiAocmVzdWx0LmZpbGVQYXRocy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIHJlc3VsdC5maWxlUGF0aCA9IHJlc3VsdC5maWxlUGF0aHNbMF07XG4gICAgICAgICAgcmVzdWx0LmZpbGUgPSByZXN1bHQuZmlsZXNbMF07XG4gICAgICAgIH1cbiAgICAgICAgZGZDZmcuc3VjY2Vzcy5jYWxsKGRmQ2ZnLnNjb3BlLCByZXN1bHQpO1xuICAgICAgfSxcbiAgICAgIGZhaWwgICA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvZGUgPSA5OTksIG1zZyA9ICfmk43kvZzlj5HnlJ/lvILluLgnO1xuICAgICAgICBkZkNmZy5mYWlsLmNhbGwoZGZDZmcuc2NvcGUsIGNvZGUsIG1zZyk7XG4gICAgICB9XG4gICAgfSlcblxuICB9XG59KTtcblxuSG9vLmFwcGx5KEhvby5icmlkZ2UuZGV2aWNlLCB7XG4gIHNjYW5Db2RlOiBmdW5jdGlvbiAoY2ZnKSB7XG4gICAgdmFyIGRmQ2ZnID0ge1xuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkgeyB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKCkgeyB9LFxuICAgICAgc2NvcGU6IHRoaXNcbiAgICB9O1xuICAgIEhvby5jb3B5VG8oY2ZnLCBkZkNmZyk7XG5cbiAgICB3eC5zY2FuQ29kZSh7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGRmQ2ZnLnN1Y2Nlc3MuY2FsbChkZkNmZy5zY29wZSwge1xuICAgICAgICAgIGNvbnRlbnQ6IHJlcy5yZXN1bHQsICAgIC8v5omr56CB5YaF5a65XG4gICAgICAgICAgc2NhblR5cGU6IHJlcy5zY2FuVHlwZSAgIC8v5omr56CB57G75Z6LLCBDT0RFXzEyOCDjgIEgUVJfQ09ERVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2RlID0gOTk5LCBtc2cgPSAn5pON5L2c5Y+R55Sf5byC5bi4JztcbiAgICAgICAgZGZDZmcuZmFpbC5jYWxsKGRmQ2ZnLnNjb3BlLCBjb2RlLCBtc2cpO1xuICAgICAgfVxuICAgIH0pXG4gIH1cbn0pO1xuXG5Ib28uaHlicmlkID0gSG9vLmJyaWRnZTsgLy9UT0RPIOWFvOWuueezu+e7n+WOn+acieS7o+eggVxuXG52YXIgd3ggPSB7XG4gIHNldFN0b3JhZ2U6IEhvby5icmlkZ2Uuc3RvcmFnZS5wdXRJdGVtXG59XG5cbkhvby5jb3B5VG8od3gsIHdpbmRvdy5Ib28pXG5cbi8vIEhvby5zZXRTdG9yYWdlKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93Lkhvb1xuIl19