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
* 仿微信界面（不同于小程序原生app.json里配置实现）实现的navbar方式，其中navbar请自行参照topbar方式可组件化，其中注意的是图片src需要为base64或网络图片否则真机不显示。
* topbar 可动态添加界面
* 陆续更新中...

#### 快速上手
* 下载 - 微信开发工具 - 管理小程序 - 添加小程序 - 选择src目录即可