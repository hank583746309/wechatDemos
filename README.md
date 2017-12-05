# 小程序样例大全

#### 项目介绍
* 本项目基于[wepy框架](https://wepyjs.github.io/wepy/) + [Hoo桥接框架](https://github.com/hank583746309/hoo-bridge-framework)开源项目；
* 分工：wepy主要负责项目基础架构部分，利用其模块化和可生成web和支付宝小程序的优点，结合hoo-bridge-framewok的桥接特点，构建的一款跨平台的小程序应用（不限于）
    目标实现一套代码经过少许修改即可完成“一套代码多端(平台&端)运行”。

#### 内部组件化组件
* topbar 即顶部导航栏，目前已完成。
* imgloader 即图片预加载组件 参照[wxapp-img-loader](https://github.com/o2team/wxapp-img-loader) 项目针对wepy方式改造完成。

#### 目前进度
* 主界面

![Alt text](https://raw.githubusercontent.com/hank583746309/wechatDemos/master/statics/image/1512468578776.png)

* 仿微信界面（不同于小程序原生app.json里配置实现）实现的navbar方式，其中navbar请自行参照topbar方式可组件化，其中注意的是图片src需要为base64或网络图片否则真机不显示。

![Alt text](https://raw.githubusercontent.com/hank583746309/wechatDemos/master/statics/image/1512468527359.png)

* topbar 可动态添加界面[其中使用wepy组件化后的imageloader案例]

![Alt text](https://raw.githubusercontent.com/hank583746309/wechatDemos/master/statics/image/1512468578776.png) 

* 新增emptyview组件，可用于list列表界面，独立page,支持icon和提示文字、按钮文字自定义，支持自定义事件监听处理

![Alt text](https://raw.githubusercontent.com/hank583746309/wechatDemos/master/statics/image/1512468728747.png)

* 新增loadmore组件，可用于list列表界面，支持文字、样式自定义

![Alt text](https://raw.githubusercontent.com/hank583746309/wechatDemos/master/statics/image/1512468787372.png)

* 新增actionsheet组件，依托于官方action-sheet，支持title自定义、item组件传递对象和其他类型混合、支持item自定义样式、支持自定义事件监听处理

![Alt text](https://raw.githubusercontent.com/hank583746309/wechatDemos/master/statics/image/1512468818137.png)

* 陆续更新中...

#### 快速上手
* 下载 - 微信开发工具 - 管理小程序 - 添加小程序 - 选择dist目录即可

