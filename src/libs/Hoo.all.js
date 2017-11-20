if (typeof window == 'undefined') { window = getApp(); }

var Hoo = window.Hoo || (window.Hoo = {});

var __nameSpaceMap = {},

  objectPrototype = Object.prototype,

  toString = objectPrototype.toString,

  callOverrideParent = function () {//暂保留   继承里的东西 还需要 添加/更改  些东西

    var method = callOverrideParent.caller.caller;

    return method.$owner.prototype[method.$name].apply(this, arguments);

  },

  m = __nameSpaceMap = { "Hoo": true };


Hoo.Core = function () { };

//基类定义

Hoo.Core.prototype = {

  $isClass: true,			//标识是类-函数对象

  $className: "Hoo.Core",	//标记类名

  $superClass: null,			//标记父类(方法变更:不通过prototype也可获取)

  alias: null,         //别名

  callParent: function () {

    var method = null; //TODO 微信默认开启严格模式,导致该方法不可用

    try { method = this.callParent.caller; } catch (e) { }

    if (method && method.$class && method.$name) {

      var superClsPrototype = method.$class.$superClass, methodName = method.$name;

      if (superClsPrototype[methodName]) {

        superClsPrototype[methodName].apply(this, arguments || []);

      }

    }

  },

  //当前由于微信使用JS 严格模式，故而扩展此方法，用于调用父类方法[BUG 多层嵌套继承都是坑]
  call: function (name) {
    var args = arguments[1] || [], cls;
    if (typeof this.$$className == 'undefined') {
      this.$$className = this.$className;
    }

    cls = this.__proto__.__proto__.constructor.$superClass;
    if (typeof cls === 'undefined') {
      cls = this.__proto__;
    }



    if (cls.$className == this.$$className) {
      cls = this.__proto__.__proto__.__proto__.constructor.$superClass
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

  callSuper: function (name) {

    var _args = [], args = arguments, i = 1, len = args.length;

    for (; i < len; i++) { _args.push(args[i]); }

    var method = null; //TODO 微信默认开启严格模式,导致该方法不可用

    try { method = this.callSuper.caller; } catch (e) { }

    if (method && method.$class && method.$name) {

      var superClsPrototype = method.$class.$superClass, methodName = name;

      if (superClsPrototype[methodName]) {

        superClsPrototype[methodName].apply(this, _args);//这里的参数存疑

      } else {

        throw new Error(methodName + "不存在于类" + superClsPrototype.$className + "中.");

      }

    }

  }

}


Hoo.apply = function (obj, cfg, defaults) {

  if (defaults) {

    Hoo.apply(obj, defaults);

  }

  if (obj) {

    if (typeof (cfg) === 'object') {

      for (var key in cfg) { obj[key] = cfg[key]; }

    } else

    if ((typeof (cfg) === "function")) {

      obj = cfg; //如果是函数,则直接赋值

    }

  }

  return obj;

}


Hoo.apply(Hoo, {

  idSeed: 1000,

  debugModel: false,

  setPath: function () {

    //设置路径 与 命名空间的 映射

  },

  getNameSpaces: function () {

    var arr = [], key;

    for (key in m) { arr.push(key); }

    return arr;

  },

  isHaveNameSpace: function (name) {

    return m[name] === true;

  },

  /**

   * 命名空间定义

   * @example

   * 		Hoo.nameSpace("Ux","Hq");//命名空间: Ux Hq

   */

  nameSpace: function () {

    var args = arguments;

    for (var i = 0, len = args.length; i < len; i++) {

      if (typeof (args[i]) != 'string') { continue; }

      if (!m[args[i]]) {

        m[args[i]] = true;

        eval && eval("window." + args[i] + "={}");//定义命名空间为全局对象

      }

    }

  }

});

Hoo.ns = Hoo.nameSpace;



Hoo.apply(Hoo, {

  name: 'Hoo',

  emptyFn: function () { },

  /**

   * String to Class

   * 所有都是类

   */

  s2c: function (clsUrl) {

    var cls = clsUrl.split(".");

    if (!window[cls[0]]) { this.nameSpace(cls[0]); }

    var clazz = window[cls[0]];

    for (var i = 1, len = cls.length; i < len; i++) {

      if (clazz[cls[i]]) { clazz = clazz[cls[i]]; } else {

        throw new Error(clsUrl + "不存在" + cls[i] + "属性!");

      }

    }

    return clazz;

  },

  /**

   * cfg覆盖obj不重复的部分【多层暂不支持-->>可以通过jQuery支持 备注于 2016-04-15】

   */

  applyIf: function (obj, cfg) {

    if (obj) {

      for (var pro in cfg) { if (typeof (obj[pro]) == 'undefined') { obj[pro] = cfg[pro]; } }

    }

    return obj;

  },

  /**
   * 浅层克隆 暂支持 orign({}对象) copy 给 to({})
   * @param {Object} orign
   * @param {Object} to
   */
  copyTo: function (orign, to) {
    if (typeof to != 'object' || typeof orign != 'object') {
      throw 'copy对象需为Object类型';
    }
    for (var key in orign) { to[key] = orign[key]; }

  }

});


Hoo.apply(Hoo, {

  define: function (clsNameUrl, cfg) {

    cfg = cfg || {};

    var names = clsNameUrl.split("."), obj;

    if (!Hoo.isHaveNameSpace([names[0]])) { Hoo.nameSpace(names[0]); }

    obj = window[names[0]];

    var statics = cfg['statics'], extendClsUrl = cfg['extend'];

    for (var i = 1, len = names.length; i < len; i++) {

      if (i == len - 1) {

        //如果是静态类,执行静态方式

        if (statics) {

          if (!obj[names[i]]) obj[names[i]] = {};

          for (var key in statics) { obj[names[i]][key] = statics[key]; }

          return obj[names[i]];

        }

        //如果是通过继承,则执行继承方式

        if (extendClsUrl) {

          var extendCls = Hoo.s2c(extendClsUrl),

            F = function () { },

            cls = obj[names[i]];

          if (!cls) {

            F.prototype = extendCls.prototype;

            cls = obj[names[i]] = function () { if (this.init) this.init.apply(this, arguments || []); };

            cls.prototype = new F();

          } else {

            throw new Error("定义的类:" + clsNameUrl + ",命名空间路径冲突!");

          }

          for (var key in cfg) {

            var v = cfg[key];

            if (typeof (v) === 'function') {

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

          var F = function () { }, cls = obj[names[i]];

          F.prototype = Hoo.Core.prototype;

          if (!cls) {

            cls = obj[names[i]] = function () { if (this.init) this.init.apply(this, arguments || []); };

            cls.prototype = new F();

          } else {

            throw new Error("定义的类:" + clsNameUrl + ",命名空间路径冲突!");

          }

          for (var key in cfg) {

            var v = cfg[key];

            if (typeof (v) === 'function') {

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

      if (!obj[names[i]]) { obj[names[i]] = {}; }

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

  create: function (clsNameUrl, cfg, data) {

    var Cls = Hoo.s2c(clsNameUrl);

    var F = function () { },

      tempFn = function () {

        if (this.init) this.init.apply(this, arguments || []);

        //作为所有create的入口

        if (this.onCreate) { this.onCreate.apply(this, arguments || {}); }

      };

    F.prototype = Cls.prototype;

    tempFn.prototype = new F();

    for (var key in cfg) { tempFn.prototype[key] = cfg[key]; }

    tempFn.prototype.constructor = tempFn;

    return new tempFn(data || {});

  }

});



Hoo.apply(Hoo, {

  /**

   * 得到全局唯一ID

   */

  getId: (function () {

    var id = Hoo.idSeed, getId = function (nodeType) {

      id += 1;
      return (nodeType ? nodeType : "component_") + id;
    };
    return getId;
  })(),
  //数据深度克隆
  clone: function (obj) {
    var o;
    if (typeof obj == "object") {
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
    if (typeof (o) != 'undefined' && o.node && o.tag === 'img') { }
    return o;
  },
  /**
   * 判断object是否为空(null、''、' '、[],{}以及undefined 均判断属于空)
   *
   */
  isEmpty: function (obj) {
    if (typeof obj == 'undefined') { return true; }

    if (obj == null) { return true; }
    if (obj instanceof Array) { return obj.length == 0; }
    if (typeof obj == 'string') { return obj.trim().length == 0; }
    if (typeof obj == 'object') {
      var flag = true; for (var key in obj) { flag = false; break; } return flag;
    }
    return false;
  },
  isEquals : function(x,y){
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
        if (typeof (x[p]) !== "object") {
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
  filter : function(obj,filterValue){
    for(var key in (obj || {})){
      if(obj[key] == filterValue){ delete obj[key]; }
    }
  }

});


Hoo.define("Hoo.Base", {

  listeners: {},

  init: function () {

    this.initListeners();

    this.initEvents();



    this.inited();

  },

  inited: function () {

    //构建监听

    var scope = this.listeners.scope || this, callback;

    for (var eventName in this.listeners) {

      if (eventName === 'scope') { continue; }

      callback = this.listeners[eventName];

      if ((typeof (callback) === "function")) {

        this.addListeners(eventName, callback, scope);

      }

    }

  },

  initListeners: function () {

    this.listenerStack = {};

  },

  initEvents: function () {

    this.events = {};

  },

  /*** 添加事件 */

  addEvents: function () {

    var param = arguments[0];

    if ((typeof (param) === "string")) {

      for (var i = 0; i < arguments.length; i++) {

        this.events[arguments[i].toLowerCase()] = true;

      }

    }/* else if (Hoo.util.Object.isObject(param)) {

      for (var key in param) {

        this.events[key].toLowerCase() = true;

      }

    }*/

  },

  //暂不启用

  addEvent: function (eventName) {

    eventName = eventName.toLowerCase();

    this.events[eventName] = true;

  },

  //暂不启用

  removeEvent: function (eventName) {

    eventName = eventName.toLowerCase();

    delete this.events[eventName];

  },

  /**

   * 移除事件(未做测试--应该是错误的.)

   */

  removeEvents: function () {

    var param = arguments[0];

    if (typeof param === 'string') {

      for (var i = 0; i < arguments.length; i++) {

        this.removeEvent(arguments[i].toLowerCase());

      }

    } else if (this.isObject(param)) {

      for (var key in param) { this.removeEvent(key.toLowerCase()); }

    }

  },

  /**

   * 触发监听事件 当事件返回true时,事件链停止执行
   * 即:若在某些场景下 不想继续往下执行,则回调中返回true即可.

   */

  fireEvent: function (eventName) {

    eventName = eventName.toLowerCase();

    if (this.listenerStack[eventName]) {

      var args = [], stackArr = this.listenerStack[eventName], stack;

      for (var i = 1, len = arguments.length; i < len; i++) { args.push(arguments[i]); }

      var res = false;

      for (var i = 0, len = stackArr.length; i < len; i++) {

        //这里执行同一个监听的多次回调.........................

        stack = stackArr[i];

        res = stack.callback.apply(stack.scope, args);

        if (res) { break; }

      }

      return res;

    } else {

      //throw new Error('名称为:' + eventName + '的事件不存在或不被允许！');

    }

  },

  on: function () {

    this.addListeners.apply(this, arguments);

  },

  /**

   * @param {String/Object} eventName 事件名称,同时支持{}形式

   */

  addListeners: function (eventName, callback, scope) {

    var stack = this.listenerStack;

    if (Hoo.util.Object.isString(eventName) && Hoo.util.Object.isFunction(callback)) {

      eventName = eventName.toLowerCase();

      if (this.events[eventName]) {

        if (!stack[eventName]) { stack[eventName] = []; }

        stack[eventName].push({ callback: callback || function () { }, scope: scope || this });

      }

    } else {

      if (callback) { throw new Error('该形式不支持回调!'); return; }

      var me = this, obj = eventName, scope = obj['scope'] || this;

      delete obj['scope'];

      for (var _eventName in obj) {

        var eventName = _eventName.toLowerCase();

        if (this.events[eventName]) {

          if (!stack[eventName]) { stack[eventName] = []; }

          stack[eventName].push({ callback: obj[_eventName] || function () { }, scope: scope });

        }

        //监听不被允许

      }

    }

  }

});

Hoo.define('Hoo.util.String', {
  statics : {
    /**
     * 用于格式化 mobile
     * @params {String} mobile 手机号(国内)
     * @example
     * fmtMobile('15286819321') --> 152****9321
     */
    fmtMobile: function (mobile) {
      if (typeof mobile == 'undefined' || null == mobile) { return ''; }
      mobile = '' + mobile;
      if (mobile.length == 11) { //简单校验
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
    fmtIDCard: function (id) {
      if (typeof id == 'undefined' || null == id) { return ''; }
      id = '' + id;
      if (id.length == 18 || id.length == 16) {  //简单校验
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
    fmtEmail: function (email) {
      if (typeof email == 'undefined' || null == email) { return ''; }
      var index = email.indexOf('@');
      if (index > 0) { //简单校验
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
    fmtQQ : function(qq){
      if (typeof qq == 'undefined' || null == qq) { return ''; }
      qq = '' + qq;
      if(qq.length >= 5){
        return qq.substring(0, 3) + '****' + qq.substring(qq.length - 3);
      }
      return qq;
    },
    format : function(){
      if(arguments.length > 1){ //如果有值  1、object类型,使用{{key}}方式,否则使用{{index}}
        var result = arguments[0], args = arguments[1];
        if (arguments.length == 2 && typeof (args) == "object") {
          for (var key in args) {
            if (args[key] != undefined) {
              var reg = new RegExp("({" + key + "})", "g");
              result = result.replace(reg, args[key]);
            }
          }
        }else {
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
    },
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
    format: function (num, decimals, point, thousands_sep){
      num = (num + '').replace(/[^0-9+-Ee.]/g, '');
      var  n= !isFinite(+num) ? 0 : +num,
        prec= !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof point         === 'undefined') ? '.' : point,
        s = '',
        toFixedFix = function (n, prec) {
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
    random : function(min,max){
      return Math.floor(Math.random() * (max - min) + min);
    }
  }
});
Hoo.define('Hoo.util.Array', {
  statics: {
    /**
     * 删除数组对应index位置的元素并返回新的数组
     */
    remove : function(array,index){
      array.splice(index, 1);
    },
    removeObject : function(array,obj){

    },
    each : function(array,callback,scope){
      for(var i=0,len = array.length;i<len;i++){
        var res =  callback.call(scope||this,i,array[i]);
        if (typeof res != 'undefined' && res){ break; }
      }
    }
  }
});
(function () {
  let REG_MOBILE = '';
  let Arr = [],Brr = [];
  Arr['A'] = 1;Arr['B'] = 2;Arr['C'] = 3;Arr['D'] = 4;Arr['E'] = 5;Arr['F'] = 6;Arr['G'] = 7;Arr['H'] = 8;Arr['J'] = 1;Arr['K'] = 2;Arr['L'] = 3;Arr['M'] = 4;Arr['N'] = 5;Arr['P'] = 7;Arr['R'] = 9;Arr['S'] = 2;Arr['T'] = 3;Arr['U'] = 4;Arr['V'] = 5;Arr['W'] = 6;Arr['X'] = 7;Arr['Y'] = 8;Arr['Z'] = 9;Arr['1'] = 1;Arr['2'] = 2;Arr['3'] = 3;Arr['4'] = 4;Arr['5'] = 5;Arr['6'] = 6;Arr['7'] = 7;Arr['8'] = 8;Arr['9'] = 9;Arr['0'] = 0;Brr[1] = 8;Brr[2] = 7;Brr[3] = 6;Brr[4] = 5;Brr[5] = 4;Brr[6] = 3;Brr[7] = 2;Brr[8] = 10;Brr[9] = 0;Brr[10] = 9;Brr[11] = 8;Brr[12] = 7;Brr[13] = 6;Brr[14] = 5;Brr[15] = 4;Brr[16] = 3;Brr[17] = 2;


  Hoo.define('Hoo.util.Reg', {
    statics : {
      /*** 执行正则校验 */
      exec: function (reg, value) {
        if (typeof reg == 'undefined' || null == reg || typeof value == 'undefined') { return false; }
        reg = new RegExp(reg);
        return reg.test(value);
      },
      /*** 银行卡校验 */
      bankCard : function(cardNum){
        if (cardNum.length < 16 || cardNum.length > 19) {
          return false;
        }
        var num = /^\d*$/;  //全数字
        if (!num.exec(cardNum)) {
          return false;
        }
        //开头6位
        var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if (strBin.indexOf(cardNum.substring(0, 2)) == -1) {
          return false;
        }
        var lastNum = cardNum.substr(cardNum.length - 1, 1);//取出最后一位（与luhm进行比较）

        var first15Num = cardNum.substr(0, cardNum.length - 1);//前15或18位
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
          newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array();  //奇数位*2的积 <9
        var arrJiShu2 = new Array(); //奇数位*2的积 >9

        var arrOuShu = new Array();  //偶数位数组
        for (var j = 0; j < newArr.length; j++) {
          if ((j + 1) % 2 == 1) {//奇数位
            if (parseInt(newArr[j]) * 2 < 9)
              arrJiShu.push(parseInt(newArr[j]) * 2);
            else
              arrJiShu2.push(parseInt(newArr[j]) * 2);
          }
          else //偶数位
            arrOuShu.push(newArr[j]);
        }

        var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
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
      isNumber : function(){
        if(arguments.length == 0){ return false; }
        var flag = true, reg = /^[0-9]+.?[0-9]*$/, num;
        for(var i=0,len = arguments.length;i<len;i++){
          num = arguments[i];
          if (typeof num == 'undefined' || null == num || isNaN(Number(num))){ flag = false; break;}
          //if (typeof num == 'undefined' || null == num || !reg.test(num)) { flag = false; break; }
        }
        return flag;
      },
      /*** 统一社会信用代码 */
      creditCode : function(code){
        if(typeof code == 'undefined' || Hoo.isEmpty(code) || code.length != 18){ return false; }
        var baseCode = "0123456789ABCDEFGHJKLMNPQRTUWXY", baseCodeArray = baseCode.split(""),codes = {};
        for (var i = 0; i < baseCode.length; i++) {
          codes[baseCodeArray[i]] = i;
        }
        var codeArray = code.split(""),check = codeArray[17];
        if (baseCode.indexOf(check) < 0) { return false; }
        var wi = [ 1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28 ],sum = 0;
        for (var i = 0; i < 17; i++) {
          var key = codeArray[i];
          if (baseCode.indexOf(key) == -1) { return false; }
          sum += (codes[key] * wi[i]);
        }
        var value = 31 - sum % 31;
        return value == codes[check];
      },
      /*** 邮箱校验 */
      email : function(email){
        if (typeof email == 'undefined' || null == email) { return false; }
        var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        return reg.test(email);
      },
      /*** 手机号校验 */
      mobile: function (mobile) {
        if (typeof mobile == 'undefined' || null == mobile) { return false; }
        var reg = /^1[3|4|5|7|8][0-9]{9}$/; // /^1[0-9]{10}$/
        return reg.test(mobile);
      },
      /*** web URL 校验 */
      url: function (str) {
        if (typeof str == 'undefined' || null == str) { return false; }
        return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
      },
      /*** 是否全为中文 */
      chinese : function(str){
        //var reg = /^[u4E00-u9FA5]+$/; 【是否包含中文】
        //return typeof str !== 'undefined' && null != str && !reg.test(str);
        if (typeof str == 'undefined' || null == str || '' == str) { return false; }
        var flag = true;
        for (var i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) <= 255) { flag = false; break; }
        }
        return flag;
      },
      /*** vin 检测 例： WP0AA2978BL012976 */
      vin: function (vin) {
        var sKYZF = "ABCDEFGHJKLMNPRSTUVWXYZ1234567890";
        var sJYW = '';
        var bl = false;
        var blKYZF = false;
        if (vin.length == 17) {
          var iJQS = 0, intTemp = 0, ht = Arr, htZM = Brr;
          try {
            vin = vin.toUpperCase();
            for (var i = 0; i < vin.length; i++) {
              if (sKYZF.indexOf(vin.substr(i, 1)) != -1) {
                blKYZF = true;
                iJQS = iJQS + parseInt(ht[vin.substr(i, 1)]) * parseInt(htZM[(i + 1)]);
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
              if (sJYW == vin.substr(8, 1)) bl = true;
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
})()

Hoo.define('Hoo.bridge.db', {
  statics: {

  }
});


(function(){

  //强制拷贝,非 fromSource 属性, 均不支持 copy
  function copyTo(fromSource,toSource){
    if(typeof fromSource != 'object' || typeof toSource != 'object'){ return;}
    for(var key in fromSource){
      if(typeof toSource[key] != 'undefined'){
        toSource[key] = fromSource[key];
      }
    }
    return toSource;
  }

  function isEmpty(obj){
    var flag = true;
    for(var key in (obj || {})){ flag = false; break;}
    return flag;
  }

  function WxStorageCache(options){

    this.dfOptions = {
      defaultTimeout : 60 * 60    //最长保存时间 1 hour
      ,prefix        : '__cache_'

    };

    copyTo(options || {}, this.dfOptions);

    this._init();

    // interval 当定时器 监听到 内部无对象,则此时可以停止,直到重新put
    this._activeInterval();
  }

  WxStorageCache.prototype._init = function(){
    //内存缓存对象
    var      that = this;
    this._map      = window.AppCache || (window.AppCache = {}); //这里考虑到全局缓存对象,节省重复初始化开支
    this._interval = null;

    //TODO 初始化内存对象
    try {
      if (isEmpty(this._map)){
        var res = wx.getStorageInfoSync(), keys = res.keys;
        for (var i = 0, len = keys.length; i < len; i++) {
          //TODO 判断属于缓存的
          if (key.indexOf(this.dfOptions.prefix) == 0){
            var values = wx.getStorageSync(key);
            this._map[key] = values;
          }
        }
      }

    } catch (e) {}


  }

  //获取激活定时器[如果定时器处于销毁状态的话]
  WxStorageCache.prototype._activeInterval = function(){
    if (this._interval == null){
      var      that = this;
      this    ._map = window.AppCache;
      this._interval = setInterval(function(){
        //处理Map中过期的key,之后 给 remove 处理
        var delKeys = [],now = new Date().getTime();
        for(var key in that._map){
          //获取值,根据expires 判断是否真实删除
          var values = that._map[key],
            expires = values.expires;
          if (expires != -1 && expires < now){
            delKeys.push(key.substring(that.dfOptions.prefix.length));
          }
        }
        //执行异步删除操作【会不会引发同步问题】 -- 先同步
        if(delKeys.length > 0){
          that.remove(delKeys);
        }
      },1000);
    }
  }

  //销毁定时器
  WxStorageCache.prototype._destoryInterval = function(){
    clearInterval(this._interval);
    this._interval = null;
  }

  /**
   * 设置缓存
   * @param {String} key   缓存KEY
   * @param {Object} value 缓存值
   * @param {Object} options 扩展配置属性
   *
   */
  WxStorageCache.prototype.put = function(key,value,options){
    if(typeof value == 'undefined'){ return; }
    this._activeInterval();

    var dfOpts = {
      scope   : this,
      duration: this.dfOptions.defaultTimeout, //缓存时长 单位 : s
      success : function(){},
      fail    : function(){}
    },now = new Date().getTime();
    copyTo(options || {} , dfOpts);

    if(value == null){
      this.remove(key, dfOpts.success, dfOpts.fail);
    }

    var newVal = {
      expires : dfOpts.duration < 0 ? -1 : (now + dfOpts.duration * 1000) , // -1 不限制时间
      value   : value
    };

    key = this.dfOptions.prefix + key;
    this._map = window.AppCache;
    try{
      this._map[key] = newVal;
      wx.setStorageSync(key, newVal);
      dfOpts.success.call(dfOpts.scope);
    }catch(e){
      dfOpts.fail.call(dfOpts.scope, e.message || '发送错误');
    }

  };

  /**
   * 是否包含未过期的值
   * @param {String} key 缓存KEY
   */
  WxStorageCache.prototype.contains = function(key){
    this._map = window.AppCache;
    key = this.dfOptions.prefix + key;
    var values = this._map[key];
    if (typeof values !== 'undefined') {
      var expires = values.expires, now = new Date().getTime(), value = values.value;
      if (expires != -1 && expires < now) { value = null; }
      return value != null;
    }
    return false;
  }

  /**
   * 获取缓存值
   */
  WxStorageCache.prototype.get = function(key,options){
    this._map = window.AppCache;
    var  _key = this.dfOptions.prefix + key;
    var values= this._map[_key],dfOpts = {
      remove  : false,        //获取值后,立即移除
      success : function(){},
      fail    : function(){},
      scope   : this
    };
    copyTo(options || {}, dfOpts);

    if (typeof values !== 'undefined'){
      var expires = values.expires,now = new Date().getTime(),value = values.value;
      if (expires != -1 && expires < now){
        value = null;
      }
      if(value == null){
        dfOpts.fail.call(dfOpts.scope,'缓存不存在');
      }else{
        if (dfOpts.remove){ this.remove({ key: key});  } //自动删除前置
        dfOpts.success.call(dfOpts.scope, value);
      }
    }
    // wx.getStorage(key);

  };

  /**
   * 移除 key 对应的缓存值
   */
  WxStorageCache.prototype.remove = function(options){
    var dfOpts = {
      key     : '',
      success : function(){},
      fail    : function(){},
      scope   : this
    },that = this;
    if(typeof options == 'string' || options instanceof Array){
      dfOpts.key = options;
    }else{
      copyTo(options || {} , dfOpts);
    }

    var key  = dfOpts.key;
    this._map = window.AppCache;
    if (typeof key === 'string'){
      key = this.dfOptions.prefix + key;
      delete this._map[key];
      try{
        wx.removeStorageSync(key);
        dfOpts.success.call(dfOpts.scope, key);//回调
      }catch(e){
        console.log(e);
        dfOpts.fail.call(dfOpts.scope, e.message || '发送错误');
      }
    }else if(key instanceof Array){
      try{
        for (var i = 0, len = key.length; i < len; i++) {
          var k = key[i];
          k = this.dfOptions.prefix + k;
          delete this._map[k];                   //循环执行删除
          wx.removeStorageSync(k);
        }
        dfOpts.success.call(dfOpts.scope, key);
      } catch (e){
        dfOpts.fail.call(dfOpts.scope, e.message || '发送错误');
      }
    }else{
      throw 'key传参类型有误';
    }
  };

  /**
   * 清除所有缓存
   */
  WxStorageCache.prototype.clear = function(success,fail){

    try{
      var clearKeys = [];
      for (var key in this._map) {
        if (key.indexOf(this.dfOptions.prefix) == 0) {
          clearKeys.push(key.substring(this.dfOptions.prefix.length));
        }
      }

      this._map = window.AppCache = {};
      this._destoryInterval();

      if (clearKeys.length > 0) {
        this.remove(clearKeys, success || function () { }, fail || function () { });
      } else {
        typeof success == 'function' && success();
      }
    }catch(e){
      typeof fail == 'function' && fail();
    }

  };

  /**
   * 删除所有过期的值
   */
  WxStorageCache.prototype.deleteAllExpires = function(success,fail){
    this._map = window.AppCache;
    //处理Map中过期的key,之后 给 remove 处理
    var delKeys = [], now = new Date().getTime();
    for (var key in this._map) {
      var values = this._map[key],
        expires = values.expires;
      if (expires != -1 && expires < now) {//获取值,根据expires 判断是否真实删除
        delKeys.push(key.substring(this.dfOptions.prefix.length));
      }
    }

    if (delKeys.length > 0) {
      this.remove(delKeys,success || function(){} , fail || function(){});
    }else{
      typeof success == 'function' && success();
    }

  };

  Hoo.define('Hoo.util.Cache', {
    statics: new WxStorageCache()
  });
})();


var timeago = require("timeago.js");
var ta = timeago();
Hoo.define('Hoo.util.Date', {
  statics: {
    format: function (date, pattern){
      var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "H+": date.getHours(),
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12 ,                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
      }, fmt = pattern || 'yyyy-MM-dd HH:mm:ss';
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    },
    timeago : function(date){
      return ta.format(date,'zh_CN');
    }
  }
});

Hoo.date = Hoo.util.Date;

Hoo.define('Hoo.bridge.storage', {
  statics: {
    putItem: function (key, value, callback, scope) {

    },
    getItem: function (key, callback, scope) {

    },
    removeItem: function (key) {

    },
    clear: function () {

    }
  }
});


Hoo.define('Hoo.bridge.doc', {
  statics: {
    setTitle: function (cfg) {

    }
  }
});

Hoo.define('Hoo.bridge.widget',{
  statics : {
    toast: function (cfg){},
    tip: {
      error  : function (cfg) {},
      warning: function (cfg) {},
      success: function (cfg) {}
    },
    alert   : function(cfg){},
    confirm : function(cfg){},
    actionSheet : function(cfg){}
  }
});

Hoo.define('Hoo.bridge.location', {
  statics: {
    href: function (cfg) {

    },
    replace: function () { },
    redirect: function () { },
    back   : function(){
      // 支持  undefined --> 1
      //      index          int
      //      route          String

    },
    replace: function (cfg) {

    }
  }
});

Hoo.define('Hoo.bridge.net', {
  statics: {
    basePath: null,
    setBasePath : function(){},
    upload  : function (cfg) { },
    post    : function (cfg) { },
    'get'   : function(cfg){},
    download: function (cfg) { }
  }
});

Hoo.define('Hoo.bridge.media', {
  statics: {
    chooseImage: function (cfg) {


    }
  }
});

Hoo.define('Hoo.bridge.device', {
  statics: {
    scanCode: function (cfg) {

    }
  }
});

Hoo.apply(Hoo.bridge.db, {});

Hoo.apply(Hoo.bridge.storage, {
  putItem: function (key, value, callback, scope) {
    try {
      wx.setStorageSync(key, value);
      if (callback) { callback.call(scope || this); }
    } catch (e) { }

  },
  getItem: function (key, callback, scope) {
    let value = null;
    try {
      value = wx.getStorageSync(key);
      if (typeof value == 'undefined') { value = null; }
    } catch (e) { value = null; }

    if (callback) { callback.call(scope || this, value); }
  },
  removeItem: function (key) {
    try {
      wx.removeStorageSync(key);
    } catch (e) { }

  },
  clear: function () {
    try {
      wx.clearStorageSync();
    } catch (e) { }

  }
});


Hoo.apply(Hoo.bridge.doc, {
  setTitle: function (cfg) {
    if (typeof cfg == 'string') { cfg = { title: cfg }; }
    wx.setNavigationBarTitle(cfg);
  }
});


Hoo.apply(Hoo.bridge.widget,{
  toast   : function(){

  },
  tip     : {
    error   : function (cfg){
      if (typeof cfg === 'undefined') { return; }
      if (typeof cfg === 'string') { cfg = { title: cfg }; }
      var url = getApp().getCurrentUrl(), prefix = '',
        dfCfg = { image: 'res/image/icons/error.png' };
      for(var i=0,len = url.split('/').length - 1; i<len;i++){  prefix += '../'; }
      dfCfg.image = prefix + dfCfg.image;
      Hoo.copyTo(cfg, dfCfg);

      wx.showToast(dfCfg);
    },
    warning : function(cfg){},
    success : function (cfg){
      if(typeof cfg === 'undefined'){ return; }
      if(typeof cfg === 'string'){ cfg = { title : cfg };}
      if(typeof cfg.msg == 'string') { cfg.title = cfg.msg; }

      var dfCfg = { icon: 'success', duration: 1500, afterShow : function(){} , scope : this};
      Hoo.copyTo(cfg,dfCfg);

      wx.showToast(dfCfg);
      if(dfCfg.duration > 0){
        setTimeout(function(){ dfCfg.afterShow.call(dfCfg.scope); },dfCfg.duration);
      }
    }
  },
  alert   : function(cfg){
    if(typeof cfg == 'undefined'){ return; }
    if(typeof cfg == 'string'){ cfg = { content : cfg};}
    if (typeof cfg.msg == 'string') { cfg.content = cfg.msg; }
    var dfCfg = {
      title      : '提示',
      content    : '',
      showCancel : false,
      success    : function(){},
      fail       : function(){}
    };
    Hoo.copyTo(cfg || {} , dfCfg);

    wx.showModal(dfCfg);
  },
  confirm : function(cfg){
    if (typeof cfg == 'undefined') { return; }
    if (typeof cfg == 'string') { cfg = { content: cfg }; }
    var dfCfg = {
      title     : '请选择',
      content   : '',
      showCancel: true,
      success   : function () { },
      fail      : function () { },
      scope     : this
    };
    Hoo.copyTo(cfg || {}, dfCfg);
    const success = dfCfg.success,scope = dfCfg.scope;
    dfCfg.success = function(res){
      if (res.confirm) { success.call(scope); } else { dfCfg.fail.call(scope);}
    }
    delete dfCfg.scope;
    wx.showModal(dfCfg);
  },
  actionSheet: function (cfg) {
    if (typeof cfg !== 'object') { return; }
    var dfCfg = {
      items : [], // 默认属性格式  { label : '', ex : ''}
      success : function(index,item){},
      fail    : function(){},
      scope   : this
    };
    Hoo.copyTo(cfg || {}, dfCfg);
    var items = dfCfg.items,item = items.length > 0 ? items[0] : null,labels = [];
    if(item == null){ return; }
    if(typeof item == 'object'){
      items.map(function (item) { labels.push(item.label || ''); });
    }else{
      labels = [].concat(items);
    }

    wx.showActionSheet({
      itemList: labels,
      success : function (res) {
        if (res.cancel) { dfCfg.fail.call(dfCfg.scope); }else{
          dfCfg.success.call(dfCfg.scope, res.tapIndex, dfCfg.items[res.tapIndex]);
        }
      }
    });

  }
});

Hoo.apply(Hoo.bridge.location, {
  href: function (cfg) {
    if (typeof cfg == 'string') { cfg = { url: cfg }; }
    var dfCfg = { url: '', params: {} };
    Hoo.copyTo(cfg, dfCfg);
    if (!Hoo.isEmpty(dfCfg.params)) {
      var url = dfCfg.url + '?', params = [];
      for (var key in dfCfg.params){
        var value = dfCfg.params[key];
        if (value == null) { continue; }else
        if(typeof value === 'object'){ value = JSON.stringify(value); }
        params.push(key + '=' + value );
      }
      url += params.join('&');
      delete dfCfg.params;
      dfCfg.url = url;
    }
    wx.navigateTo(dfCfg);
  },
  replace : function(){},
  //支持页面跳转
  redirect: function(cfg){
    if (typeof cfg == 'string') { cfg = { url: cfg }; }
    var dfCfg = { url: '', params: {} };
    Hoo.copyTo(cfg, dfCfg);
    if (!Hoo.isEmpty(dfCfg.params)) {
      var url = dfCfg.url + '?', params = [];
      for (var key in dfCfg.params) {
        var value = dfCfg.params[key];
        if (typeof value === 'object') { value = JSON.stringify(value); }
        params.push(key + '=' + value);
      }
      url += params.join('&');
      delete dfCfg.params;
      dfCfg.url = url;
    }
    wx.redirectTo(dfCfg);
  },
  //支持根据路由「app.json配置文件」 返回到 指定路由界面
  back   : function(){ //关于back值回传解决思路： 返回前 获取上一级 page, 通过调用 通用自定义通用函数[建议] 或 setData方式操作[默认支持]
    var delta = typeof arguments[0] == 'undefined' ? 1 : arguments[0];
    if (typeof delta == 'number'){
      wx.navigateBack({ delta: delta });
    }else if(typeof delta == 'string'){ // route 支持
      var pages = getCurrentPages(), total = pages.length,copy = pages.concat().reverse(),index = -1;
      for(var i=0 ;i < total ; i++){
        var page = copy[i];
        if (page.route == delta) { index = i; break; }
      }
      wx.navigateBack({
        delta : index == -1 ? total + 1 : index
      });
    }
    /* 暂不支持，另外小程序限制,返回 tabBar页面,需要强制 length 大于当前栈即可
    else if (typeof delta == 'object'){}*/
  },
  replace: function (cfg) {

  }
});

Hoo.apply(Hoo.bridge.net, {
  //basePath: 'http://192.168.1.149:8080/IMS/', //TODO 原则上，不允许直接更改该值
  setBasePath : function(basePath){
    Hoo.bridge.net.basePath = basePath;
  },
  upload  : function (cfg) {
    let dfCfg = {
      url        : '',
      basePath   : Hoo.bridge.net.basePath,
      data       : {},
      name       : 'file',
      path       : '',
      onProgress : function(res){},
      success    : function (data, response) { },
      fail       : function (code, msg) { },
      complete   : function () { },
      scope      : this
    }, header = { 'content-type': 'multipart/form-data' }, pages = getCurrentPages(),page = pages[pages.length - 1];
    Hoo.copyTo(cfg || {}, dfCfg);

    var token = wx.getStorageSync('login_token');
    if(token != null && '' != token){ header['MINI-TOKEN'] = token; }

    //TODO 汉字 encodeURL 或 encodeURIComponent 的问题
    const uploadTask = wx.uploadFile({
      url     : (dfCfg.basePath || '') + dfCfg.url,
      filePath: dfCfg.path,
      name    : dfCfg.name || 'file',
      formData: dfCfg.data || {},
      header  : header,
      success : function (res) {
        if (res.statusCode = 200) {
          var data = res.data; //响应原数据
          if(typeof data === 'string'){ try{ data = JSON.parse(data); }catch(e){} }
          if (data.code == 0 || data.code == '0' || data.code == '200') { // 200为了兼容nodejs api
            dfCfg.success.call(dfCfg.scope, data.data, data);
          } else {
            dfCfg.fail.call(dfCfg.scope, '' + data.code, data.msg);
          }
        } else {
          dfCfg.fail.call(dfCfg.scope, '' + res.statusCode, res.errMsg);
        }
      },
      fail    : function(res){
        dfCfg.fail.call(dfCfg.scope, '500', res.errMsg);
      },
      complete: function(){
        dfCfg.complete.apply(dfCfg.scope, arguments);
      }
    })
    uploadTask.onProgressUpdate((res) => {
      dfCfg.onProgress.call(dfCfg.scope,{
        progress  : res.progress,
        sendBytes : res.totalBytesSent,
        totalBytes: res.totalBytesExpectedToSend
      });
    })
    if (page.addListener) {
      page.addListener('beforeUnload',function(){
        try { uploadTask.abort() } catch (e) {}
      });
    }
    return {
      cancel: function () {
        try { uploadTask.abort() }catch(e){} // 取消上传任务
      }
    }
  },
  post  : function (cfg) {
    // TODO 由于微信小程序C/S特点,故而在这里需检测 用户登录状态、获取用户open_id 发送服务器获取3rdsession,供服务器判别当前用户
    //开启缓存 chache : true / cache : { enable : true , timeout : '缓存时长' , forceRefresh : false }
    let dfCache = {
      enable : false,       //是否开启缓存
      forceRefresh : false, //是否强制新的请求
      timeout: 60 * 30      //缓存 30 分钟
    },dfCfg = {
      url     : '',
      basePath: Hoo.bridge.net.basePath,
      data    : {},
      success : function(data,response){},
      fail    : function(code,msg){},
      complete: function(){},
      scope   : this,
      cache   : false,
      showToast: true,
      loading  : false,
      // image    : '../../res/image/icons/error.png',
      header   : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, pages = getCurrentPages(), page = pages[pages.length - 1];
    // header = { 'Content-Type':  'application/json' };
    Hoo.copyTo(cfg || {},dfCfg);
    if (dfCfg.showToast) { wx.hideLoading(); }
    var header = dfCfg.header;

    var token = wx.getStorageSync('login_token');
    if (token != null && '' != token) { header['MINI-TOKEN'] = token; }

    if (dfCfg.loading) {
      wx.hideLoading(); wx.showLoading({ title: '加载中' });
    }

    //TODO 缓存处理
    var cache = dfCfg.cache;
    if(typeof cache == 'boolean'){ dfCache.enable = cache; }else if(typeof cache == 'object'){ Hoo.copyTo(cache,dfCache); }
    dfCfg.cache = dfCache;

    const enacleCache = dfCfg.cache.enable,key = (dfCfg.basePath || '') + dfCfg.url + (typeof dfCfg.data == 'object' ? JSON.stringify(dfCfg.data) : dfCfg.data);
    if (!dfCfg.cache.forceRefresh && enacleCache && Hoo.util.Cache.contains(key)){
      Hoo.util.Cache.get(key, {
        success : function (data) {
          dfCfg.success.call(dfCfg.scope, data.data, data);
          if (dfCfg.loading) { wx.hideLoading(); }
        }
      });
      return;
    }


    const requestTask = wx.request({
      url    : (dfCfg.basePath || '') + dfCfg.url,
      data   : dfCfg.data || {},
      header : header,
      method : 'POST',
      success: function (res) {
        if(res.statusCode = 200){
          var data = res.data; //响应原数据
          //TODO 根据数据格式进行数据分发,如果业务逻辑正常 & 如果业务逻辑失败
          //if (dfCfg.showToast) { wx.showToast({ title: '请求成功', icon: 'success', duration: 1500 }); }

          if (data.code == 0 || data.code == '0' || data.code == '200'){ // 200为了兼容nodejs api
            dfCfg.success.call(dfCfg.scope, data.data, data);
            if (enacleCache && data.data != null) { Hoo.util.Cache.put(key, data); }//TODO 设置缓存数据为  成功时实际响应值
          }else{
            if (dfCfg.showToast) {
              if(typeof data.code == 'undefined'){
                Hoo.bridge.widget.alert('登录失效,请退出并重新进入'); return;
              }
              Hoo.bridge.widget.tip.error(data.msg || ('请求异常(错误码:' + data.code + ')'));
            }
            dfCfg.fail.call(dfCfg.scope, '' + data.code, data.msg);
          }
        }else{
          if (dfCfg.showToast) { Hoo.bridge.widget.tip.error(res.msg || '请求异常'); }
          dfCfg.fail.call(dfCfg.scope, '' + res.statusCode, res.msg);
        }

      },
      fail  : function(res){
        if (dfCfg.showToast) { Hoo.bridge.widget.tip.error(res.msg || '请求异常'); }
        dfCfg.fail.call(dfCfg.scope, '500', res.msg);
      },
      complete : function(){
        if (dfCfg.loading){ wx.hideLoading(); }
        dfCfg.complete.apply(dfCfg.scope,arguments);
      }
    })
    if (page.addListener) {
      page.addListener('beforeUnload', function () {
        try { uploadTask.abort() } catch (e) { }
      });
    }
    return {
      cancel : function(){
        try { requestTask.abort() } catch (e) { }  // 取消请求任务
      }
    };
  },
  'get'   : function(cfg){
    /*data  : {},
      method: 'GET',
      header: { 'Accept': 'application/json' }*/
  },
  download: function (cfg) { }
});

Hoo.apply(Hoo.bridge.media, {
  chooseImage: function (cfg) {
    var dfCfg = {
      count  : 0,
      success: function (res) { },
      fail   : function (code,msg) { },
      scope  : this
    };
    Hoo.copyTo(cfg, dfCfg);

    wx.chooseImage({
      count  : dfCfg.count,
      success: function (res) {
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
      fail   : function () {
        var code = 999, msg = '操作发生异常';
        dfCfg.fail.call(dfCfg.scope, code, msg);
      }
    })

  }
});

Hoo.apply(Hoo.bridge.device, {
  scanCode: function (cfg) {
    var dfCfg = {
      success: function () { },
      fail: function () { },
      scope: this
    };
    Hoo.copyTo(cfg, dfCfg);

    wx.scanCode({
      success: function (res) {
        dfCfg.success.call(dfCfg.scope, {
          content: res.result,    //扫码内容
          scanType: res.scanType   //扫码类型, CODE_128 、 QR_CODE
        });
      },
      fail: function () {
        var code = 999, msg = '操作发生异常';
        dfCfg.fail.call(dfCfg.scope, code, msg);
      }
    })
  }
});

Hoo.hybrid = Hoo.bridge; //TODO 兼容系统原有代码

var wx = {
  setStorage: Hoo.bridge.storage.putItem
}

Hoo.copyTo(wx, window.Hoo)

// Hoo.setStorage();

module.exports = window.Hoo
