'use strict';

//Fragment管理类(FragmentManager)

var Hoo = require('./../../Hoo.all.js');
if (typeof window == 'undefined') {
  window = getApp();
}

Hoo.define('Yzb.fragment.FragmentManager', {
  dfCfg: {
    page: null, //page 必须注入
    options: {},
    models: [], //与class对象对应的视图结果集  
    fragments: [] //class 对象 必须注入
  },
  init: function init(cfg) {
    var allowProperty = ['page', 'options', 'fragments', 'models'];

    this.lastFragment = null;
    this.fs = [];

    for (var key in cfg || {}) {
      if (allowProperty.indexOf(key) >= 0) this.dfCfg[key] = cfg[key];
    }

    if (this.dfCfg.page == null) {
      throw '请按要求填入page参数.';
    }
    if (this.dfCfg.fragments.length == 0) {
      throw '请按要求填入fragments参数';
    }

    for (var i = 0, len = this.dfCfg.fragments.length; i < len; i++) {
      this.fs.push({
        model: this.dfCfg.models[i] || 'tab_model' + i,
        clazz: this.dfCfg.fragments[i],
        instance: null
      });
    }
  },
  switchTab: function switchTab(index) {
    if (index < 0 || index > this.dfCfg.fragments) {
      throw 'index取值范围需在 0 ~ ' + this.dfCfg.fragments.length;
    }

    var fragment = this.fs[index].instance;
    if (fragment == null) {
      //执行初始化
      fragment = this.fs[index].instance = Hoo.create(this.fs[index].clazz, {}, {
        page: this.dfCfg.page,
        options: this.dfCfg.options,
        model: this.fs[index].model,
        tagName: this.fs[index].clazz
      });

      fragment.onLoad(this.dfCfg.options);
    }
    fragment.onShow();
    if (this.lastFragment != null) {
      this.lastFragment.onHide();
    }
    this.lastFragment = fragment;
  },
  findFragment: function findFragment(index) {
    if (index < 0 || index > this.dfCfg.fragments) {
      return null;
    }
    var fragment = this.fs[index].instance;
    return fragment;
  },
  findFragmentByTagName: function findFragmentByTagName(tagName) {

    if (typeof tagName == 'undefined' || tagName == null || '' == tagName) {
      return null;
    }

    if (this.dfCfg.tagMap[tagName]) {
      return this.dfCfg.tagMap[tagName];
    }

    for (var i = 0, len = this.dfCfg.fragments.length; i < len; i++) {
      var fragment = this.fs[i].instance;
      if (fragment == null) {
        continue;
      }

      var tag = typeof fragment.getTagName == 'undefined' ? '' : fragment.getTagName();
      if (tag == tagName) {
        this.dfCfg.tagMap[tag] = fragment;
        return fragment;
      }
    }

    return null;
  },
  getCurrentFragment: function getCurrentFragment() {
    return this.lastFragment;
  },
  destory: function destory() {
    this.dfCfg = {
      page: null, options: {}, models: [], fragments: []
    };
  }
});

module.exports = window.Yzb;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZyYWdtZW50TWFuYWdlci5qcyJdLCJuYW1lcyI6WyJIb28iLCJyZXF1aXJlIiwid2luZG93IiwiZ2V0QXBwIiwiZGVmaW5lIiwiZGZDZmciLCJwYWdlIiwib3B0aW9ucyIsIm1vZGVscyIsImZyYWdtZW50cyIsImluaXQiLCJjZmciLCJhbGxvd1Byb3BlcnR5IiwibGFzdEZyYWdtZW50IiwiZnMiLCJrZXkiLCJpbmRleE9mIiwibGVuZ3RoIiwiaSIsImxlbiIsInB1c2giLCJtb2RlbCIsImNsYXp6IiwiaW5zdGFuY2UiLCJzd2l0Y2hUYWIiLCJpbmRleCIsImZyYWdtZW50IiwiY3JlYXRlIiwidGFnTmFtZSIsIm9uTG9hZCIsIm9uU2hvdyIsIm9uSGlkZSIsImZpbmRGcmFnbWVudCIsImZpbmRGcmFnbWVudEJ5VGFnTmFtZSIsInRhZ01hcCIsInRhZyIsImdldFRhZ05hbWUiLCJnZXRDdXJyZW50RnJhZ21lbnQiLCJkZXN0b3J5IiwibW9kdWxlIiwiZXhwb3J0cyIsIll6YiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFJQSxNQUFNQyxRQUFRLGtCQUFSLENBQVY7QUFDQSxJQUFJLE9BQU9DLE1BQVAsSUFBaUIsV0FBckIsRUFBa0M7QUFBRUEsV0FBU0MsUUFBVDtBQUFvQjs7QUFFeERILElBQUlJLE1BQUosQ0FBVyw4QkFBWCxFQUEwQztBQUN0Q0MsU0FBUTtBQUNKQyxVQUFNLElBREYsRUFDVTtBQUNkQyxhQUFTLEVBRkw7QUFHSkMsWUFBVyxFQUhQLEVBR2dCO0FBQ3BCQyxlQUFXLEVBSlAsQ0FJZ0I7QUFKaEIsR0FEOEI7QUFPdENDLFFBQU8sY0FBU0MsR0FBVCxFQUFhO0FBQ2xCLFFBQUlDLGdCQUFnQixDQUFDLE1BQUQsRUFBUyxTQUFULEVBQW9CLFdBQXBCLEVBQWdDLFFBQWhDLENBQXBCOztBQUVBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxTQUFLQyxFQUFMLEdBQVUsRUFBVjs7QUFFQSxTQUFLLElBQUlDLEdBQVQsSUFBaUJK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LENBQVdJLFNBQVgsQ0FBcUJRLE1BQTNDLEVBQW1EQyxJQUFJQyxHQUF2RCxFQUE0REQsR0FBNUQsRUFBaUU7QUFDL0QsVUFBSVEsV0FBVyxLQUFLWixFQUFMLENBQVFJLENBQVIsRUFBV0ssUUFBMUI7QUFDQSxVQUFJRyxZQUFZLElBQWhCLEVBQXNCO0FBQUU7QUFBVzs7QUFFbkMsVUFBSVMsTUFBTyxPQUFPVCxTQUFTVSxVQUFoQixJQUE4QixXQUEvQixHQUE4QyxFQUE5QyxHQUFtRFYsU0FBU1UsVUFBVCxFQUE3RDtBQUNBLFVBQUlELE9BQU9QLE9BQVgsRUFBb0I7QUFDbEIsYUFBS3ZCLEtBQUwsQ0FBVzZCLE1BQVgsQ0FBa0JDLEdBQWxCLElBQXlCVCxRQUF6QjtBQUNBLGVBQU9BLFFBQVA7QUFDRDtBQUNGOztBQUVELFdBQU8sSUFBUDtBQUNELEdBNUVxQztBQTZFdENXLHNCQUFxQiw4QkFBVTtBQUM3QixXQUFPLEtBQUt4QixZQUFaO0FBQ0QsR0EvRXFDO0FBZ0Z0Q3lCLFdBQVMsbUJBQVk7QUFDbkIsU0FBS2pDLEtBQUwsR0FBYTtBQUNYQyxZQUFNLElBREssRUFDQ0MsU0FBUyxFQURWLEVBQ2NDLFFBQVEsRUFEdEIsRUFDMEJDLFdBQVc7QUFEckMsS0FBYjtBQUdEO0FBcEZxQyxDQUExQzs7QUF3RkE4QixPQUFPQyxPQUFQLEdBQWlCdEMsT0FBT3VDLEdBQXhCIiwiZmlsZSI6IkZyYWdtZW50TWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRnJhZ21lbnTnrqHnkIbnsbsoRnJhZ21lbnRNYW5hZ2VyKVxyXG5cclxudmFyIEhvbyA9IHJlcXVpcmUoXCIuLi8uLi9Ib28uYWxsLmpzXCIpO1xyXG5pZiAodHlwZW9mIHdpbmRvdyA9PSAndW5kZWZpbmVkJykgeyB3aW5kb3cgPSBnZXRBcHAoKTsgfVxyXG5cclxuSG9vLmRlZmluZSgnWXpiLmZyYWdtZW50LkZyYWdtZW50TWFuYWdlcicse1xyXG4gICAgZGZDZmcgOiB7XHJcbiAgICAgICAgcGFnZTogbnVsbCwgICAvL3BhZ2Ug5b+F6aG75rOo5YWlXHJcbiAgICAgICAgb3B0aW9uczoge30sXHJcbiAgICAgICAgbW9kZWxzICAgOiBbXSwgICAgICAvL+S4jmNsYXNz5a+56LGh5a+55bqU55qE6KeG5Zu+57uT5p6c6ZuGICBcclxuICAgICAgICBmcmFnbWVudHM6IFtdLCAgICAgIC8vY2xhc3Mg5a+56LGhIOW/hemhu+azqOWFpVxyXG4gICAgfSxcclxuICAgIGluaXQgOiBmdW5jdGlvbihjZmcpe1xyXG4gICAgICB2YXIgYWxsb3dQcm9wZXJ0eSA9IFsncGFnZScsICdvcHRpb25zJywgJ2ZyYWdtZW50cycsJ21vZGVscyddO1xyXG5cclxuICAgICAgdGhpcy5sYXN0RnJhZ21lbnQgPSBudWxsO1xyXG4gICAgICB0aGlzLmZzID0gW107XHJcblxyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gKGNmZyB8fCB7fSkpIHtcclxuICAgICAgICBpZiAoYWxsb3dQcm9wZXJ0eS5pbmRleE9mKGtleSkgPj0gMCkgdGhpcy5kZkNmZ1trZXldID0gY2ZnW2tleV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmRmQ2ZnLnBhZ2UgPT0gbnVsbCkgeyB0aHJvdyAn6K+35oyJ6KaB5rGC5aGr5YWlcGFnZeWPguaVsC4nOyB9XHJcbiAgICAgIGlmICh0aGlzLmRmQ2ZnLmZyYWdtZW50cy5sZW5ndGggPT0gMCkgeyB0aHJvdyAn6K+35oyJ6KaB5rGC5aGr5YWlZnJhZ21lbnRz5Y+C5pWwJzsgfVxyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuZGZDZmcuZnJhZ21lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5mcy5wdXNoKHtcclxuICAgICAgICAgIG1vZGVsOiB0aGlzLmRmQ2ZnLm1vZGVsc1tpXSB8fCAoJ3RhYl9tb2RlbCcgKyBpKSxcclxuICAgICAgICAgIGNsYXp6OiB0aGlzLmRmQ2ZnLmZyYWdtZW50c1tpXSxcclxuICAgICAgICAgIGluc3RhbmNlOiBudWxsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgc3dpdGNoVGFiIDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLmRmQ2ZnLmZyYWdtZW50cykge1xyXG4gICAgICAgIHRocm93ICdpbmRleOWPluWAvOiMg+WbtOmcgOWcqCAwIH4gJyArIHRoaXMuZGZDZmcuZnJhZ21lbnRzLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGZyYWdtZW50ID0gdGhpcy5mc1tpbmRleF0uaW5zdGFuY2U7XHJcbiAgICAgIGlmIChmcmFnbWVudCA9PSBudWxsKSB7XHJcbiAgICAgICAgLy/miafooYzliJ3lp4vljJZcclxuICAgICAgICBmcmFnbWVudCA9IHRoaXMuZnNbaW5kZXhdLmluc3RhbmNlID0gSG9vLmNyZWF0ZSh0aGlzLmZzW2luZGV4XS5jbGF6eix7fSx7XHJcbiAgICAgICAgICBwYWdlICAgIDogdGhpcy5kZkNmZy5wYWdlLFxyXG4gICAgICAgICAgb3B0aW9ucyA6IHRoaXMuZGZDZmcub3B0aW9ucyxcclxuICAgICAgICAgIG1vZGVsICAgOiB0aGlzLmZzW2luZGV4XS5tb2RlbCxcclxuICAgICAgICAgIHRhZ05hbWUgOiB0aGlzLmZzW2luZGV4XS5jbGF6elxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmcmFnbWVudC5vbkxvYWQodGhpcy5kZkNmZy5vcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgICBmcmFnbWVudC5vblNob3coKTtcclxuICAgICAgaWYgKHRoaXMubGFzdEZyYWdtZW50ICE9IG51bGwpIHsgdGhpcy5sYXN0RnJhZ21lbnQub25IaWRlKCk7IH1cclxuICAgICAgdGhpcy5sYXN0RnJhZ21lbnQgPSBmcmFnbWVudDtcclxuXHJcbiAgICB9LFxyXG4gICAgZmluZEZyYWdtZW50IDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLmRmQ2ZnLmZyYWdtZW50cykgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICB2YXIgZnJhZ21lbnQgPSB0aGlzLmZzW2luZGV4XS5pbnN0YW5jZTtcclxuICAgICAgcmV0dXJuIGZyYWdtZW50O1xyXG4gICAgfSxcclxuICAgIGZpbmRGcmFnbWVudEJ5VGFnTmFtZSA6IGZ1bmN0aW9uICh0YWdOYW1lKSB7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHRhZ05hbWUgPT0gJ3VuZGVmaW5lZCcgfHwgdGFnTmFtZSA9PSBudWxsIHx8ICcnID09IHRhZ05hbWUpIHsgcmV0dXJuIG51bGw7IH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmRmQ2ZnLnRhZ01hcFt0YWdOYW1lXSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRmQ2ZnLnRhZ01hcFt0YWdOYW1lXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuZGZDZmcuZnJhZ21lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGZyYWdtZW50ID0gdGhpcy5mc1tpXS5pbnN0YW5jZTtcclxuICAgICAgICBpZiAoZnJhZ21lbnQgPT0gbnVsbCkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICB2YXIgdGFnID0gKHR5cGVvZiBmcmFnbWVudC5nZXRUYWdOYW1lID09ICd1bmRlZmluZWQnKSA/ICcnIDogZnJhZ21lbnQuZ2V0VGFnTmFtZSgpO1xyXG4gICAgICAgIGlmICh0YWcgPT0gdGFnTmFtZSkge1xyXG4gICAgICAgICAgdGhpcy5kZkNmZy50YWdNYXBbdGFnXSA9IGZyYWdtZW50O1xyXG4gICAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgZ2V0Q3VycmVudEZyYWdtZW50IDogZnVuY3Rpb24oKXtcclxuICAgICAgcmV0dXJuIHRoaXMubGFzdEZyYWdtZW50O1xyXG4gICAgfSxcclxuICAgIGRlc3Rvcnk6IGZ1bmN0aW9uICgpIHsgXHJcbiAgICAgIHRoaXMuZGZDZmcgPSB7XHJcbiAgICAgICAgcGFnZTogbnVsbCwgb3B0aW9uczoge30sIG1vZGVsczogW10sIGZyYWdtZW50czogW11cclxuICAgICAgfTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuWXpiOyJdfQ==