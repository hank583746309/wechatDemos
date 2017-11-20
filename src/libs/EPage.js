var EPage = function(options){
  var dfOptions = {
    __p_listener_: {},
    __l_prefix_  : 'p.e.on',
    addListener  : function(eventName,callback){
      eventName = this.__l_prefix_ + eventName;
      var callbacks = this.__p_listener_[eventName] || [];
      callbacks.push(callback);
      this.__p_listener_[eventName] = callbacks;
    },
    addListeners : function(cfg){
      if (arguments.length == 2 && (arguments[0] instanceof Array || typeof arguments[0] == 'string') && typeof arguments[1] == 'function'){
        if (typeof cfg == 'string') { this.addListener(cfg,arguments[1]);}else{
          for(var i=0,len = cfg.length; i<len;i++){
            this.addListener(cfg[i],arguments[1]);
          }
        }
      }else if(typeof cfg == 'object'){
        for(var key in cfg){
          if (typeof cfg[key] == 'function') { this.addListener(key,cfg[key]); }
        }
      }
    },
    removeListener: function (eventNames){
      if (!(eventNames instanceof Array)) { eventNames = [eventNames];}
      var that = this;
      eventNames.map(function(eventName){
        that.__p_listener_[that.__l_prefix_ + eventName] = [];
      });
    },
    fireListener : function(eventName){
      var args = [],that = this;
      for (var i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
      }
      var callbacks = this.__p_listener_[this.__l_prefix_ + eventName] || [];
      callbacks.map(function (callback) { callback.apply(that, args); });
    },
    /********以下为Page默认属性的默认值,做无侵入处理**********/
    onShow: function () {
      this.fireListener('show');
    },
    onHide: function () {
      this.fireListener('hide');
    },
    onUnload: function () {
      this.fireListener('unload');
    }
  };
  if (typeof options != 'object') { options = {}; }
  var onLoad = options.onLoad || function () { }, fns = ['onShow', 'onHide', 'onUnload'];
  for(var key in dfOptions){
    if (fns.indexOf(key) < 0) { options[key] = dfOptions[key]; }
  }
  options.onLoad = function(opts){
    var scope = this;
    fns.map(function (key) {
      var callback = scope[key]; // 程序Page自定义事件方法（考虑监听回调直接放到Page方法中）
      scope[key] = function () {
        scope.fireListener('before' + key.substring(2));
        dfOptions[key].apply(scope, arguments);
        callback.apply(scope, arguments);
        scope.fireListener('after' + key.substring(2));
      }
    });
    onLoad.call(scope, opts);
  }
  Page(options);
}
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