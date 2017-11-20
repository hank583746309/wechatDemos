//Fragment管理类(FragmentManager)

var Hoo = require("../../Hoo.all.js");
if (typeof window == 'undefined') { window = getApp(); }

Hoo.define('Yzb.fragment.FragmentManager',{
    dfCfg : {
        page: null,   //page 必须注入
        options: {},
        models   : [],      //与class对象对应的视图结果集  
        fragments: [],      //class 对象 必须注入
    },
    init : function(cfg){
      var allowProperty = ['page', 'options', 'fragments','models'];

      this.lastFragment = null;
      this.fs = [];

      for (var key in (cfg || {})) {
        if (allowProperty.indexOf(key) >= 0) this.dfCfg[key] = cfg[key];
      }

      if (this.dfCfg.page == null) { throw '请按要求填入page参数.'; }
      if (this.dfCfg.fragments.length == 0) { throw '请按要求填入fragments参数'; }

      for (var i = 0, len = this.dfCfg.fragments.length; i < len; i++) {
        this.fs.push({
          model: this.dfCfg.models[i] || ('tab_model' + i),
          clazz: this.dfCfg.fragments[i],
          instance: null
        });
      }

    },
    switchTab : function (index) {
      if (index < 0 || index > this.dfCfg.fragments) {
        throw 'index取值范围需在 0 ~ ' + this.dfCfg.fragments.length;
      }

      var fragment = this.fs[index].instance;
      if (fragment == null) {
        //执行初始化
        fragment = this.fs[index].instance = Hoo.create(this.fs[index].clazz,{},{
          page    : this.dfCfg.page,
          options : this.dfCfg.options,
          model   : this.fs[index].model,
          tagName : this.fs[index].clazz
        });

        fragment.onLoad(this.dfCfg.options);
      }
      fragment.onShow();
      if (this.lastFragment != null) { this.lastFragment.onHide(); }
      this.lastFragment = fragment;

    },
    findFragment : function (index) {
      if (index < 0 || index > this.dfCfg.fragments) { return null; }
      var fragment = this.fs[index].instance;
      return fragment;
    },
    findFragmentByTagName : function (tagName) {

      if (typeof tagName == 'undefined' || tagName == null || '' == tagName) { return null; }

      if (this.dfCfg.tagMap[tagName]) {
        return this.dfCfg.tagMap[tagName];
      }

      for (var i = 0, len = this.dfCfg.fragments.length; i < len; i++) {
        var fragment = this.fs[i].instance;
        if (fragment == null) { continue; }

        var tag = (typeof fragment.getTagName == 'undefined') ? '' : fragment.getTagName();
        if (tag == tagName) {
          this.dfCfg.tagMap[tag] = fragment;
          return fragment;
        }
      }

      return null;
    },
    getCurrentFragment : function(){
      return this.lastFragment;
    },
    destory: function () { 
      this.dfCfg = {
        page: null, options: {}, models: [], fragments: []
      };
    }
});


module.exports = window.Yzb;