//Fragment 碎片基类
var Hoo = require("../../Hoo.all.js");
if(typeof window == 'undefined'){ window = getApp(); }

Hoo.define('Yzb.fragment.Fragment',{
    extend: 'Hoo.Base',
    dfCfg : {
      tagName: '',
      model  : '',
      page: null,
      options: {}
    },
    data   : {},
    scroll : 0,
    init: function (cfg) {
      this.call('init',arguments);

      var allowProperty = ['page', 'options', 'fragments','model'];

      for (var key in (cfg || {})) {
        if (allowProperty.indexOf(key) >= 0) this.dfCfg[key] = cfg[key];
      }

      if (this.dfCfg.page == null) { throw '请按要求填入page参数.'; }
    },
    
    onLoad: function (options) {
      //console.log('我曲线救国，可以调用父类方法了');
    },
    onShow : function(){
        try{
          if (wx.pageScrollTo) wx.pageScrollTo({ scrollTop: this.scroll });
        }catch(e){}
    },
    onHide : function(){},
    
    onReload   : function(){},
    onLoadMore : function(){},
    onRefresh  : function(){},
    onPageScroll: function (params){
      this.scroll = params.scrollTop;
    },
    //当前setData供对应Page使用
    setData: function (data) {
      this.dfCfg.page.setData(data);
    },
    setTagName : function (tagName) {
      this.dfCfg.tagName = tagName;
    },
    getTagName : function () {
      return this.dfCfg.tagName;
    }

});

module.exports = window.Yzb;
