# wepy 开发说明

微信小程序 wepy 框架

官方文档：[https://tencent.github.io/wepy/document.html#/](https://tencent.github.io/wepy/document.html#/)

## 导航

- [wepy demo测试的功能点](#wepy-demo测试的功能点)
- [wepy小程序开发基本规范](#wepy小程序开发基本规范)
  * [目录结构](#目录结构)
  * [文件命名规则](#文件命名规则)
  * [代码书写规范](#代码书写规范)
- [wepy小程序开发注意事项](#wepy小程序开发注意事项)

## wepy demo测试的功能点

- 获取微信用户信息
- 微信常用API调用
- 页面数据的绑定和更新
- 条件语句&循环语句
- 路由跳转
- 事件绑定（传值问题）
- 自定义组件的使用（组件循环、Slot多层嵌套等问题）
- 组件通信
  * 父组件派发事件给子组件
  * 子组件传递事件给父组件
  * 父组件访问子组件的方法
  * 子组件访问父组件的方法
  * 兄弟组件之间的通信
- 接口调用&Mock服务
- Redux状态管理（待完成）
- 表单的校验和提交（待完成）
- 自定义UI组件的使用（待完成）
- 第三方UI组件的使用（待完成）
- 登录流程的代码实现（待完成）
- 下拉滚动加载列表的统一封装（待完成）
- 好友分享、朋友圈分享统一封装（待完成）
- ESLint编码规范整合（待完成）
- 开发环境和生产环境差异化处理（待完成）
- 微信小程序集成Jenkins（待完成）

## wepy小程序开发基本规范

### 目录结构

```html
|-- dist
|-- mock                      # mock数据
|-- node_modules
|-- src
|   |-- actions               # 接口目录
|   |   |-- actions.js        # 接口请求的汇总文件
|   |   |-- request.js        # request请求方法的封装处理
|   |-- assets                # 静态资源
|   |   |-- fonts             # 字体文件目录
|   |   |-- images            # 图片目录
|   |   |   |-- banner        # 广告图
|   |   |   |-- icons         # icon图标
|   |   |-- styles            # 样式目录
|   |   |   |-- _base.scss    # 基础的变量、mixins、placeholder、functions声明
|   |   |   |-- reset.scss    # 重置样式
|   |   |   |-- font.scss     # 字体样式
|   |   |   |-- common.scss   # 公共样式
|   |   |-- vant              # 第三方组件库(暂时不确定放哪里合适)
|   |-- components            # 公共组件目录
|   |   |-- ComA              # 组件按目录分类存放
|   |   |   |-- index.wpy     # 组件的入口文件
|   |   |   |-- README.md     # 组件的说明文档
|   |   |-- ComB
|   |   |   |-- index.wpy
|   |   |   |-- README.md
|   |-- mixins                # 混合脚本目录
|   |   |-- public.js         # 全局公共的混合配置
|   |   |-- listScrollLoad.js # 列表滚动加载公共处理
|   |-- pages                 # 页面目录
|   |   |-- home              # 为每个页面分配一个目录
|   |   |   |-- modules       # 页面下的子模块目录
|   |   |   |   |-- CompA.wpy # 页面下的子模块文件
|   |   |   |-- index.wpy     # 页面的入口文件
|   |-- store                 # redux状态管理器
|   |-- utils                 # 工具函数目录
|   |   |-- util.js           # 工具函数文件
|   |   |-- dict.js           # 字典文件
|   |-- app.wpy               # 小程序配置项（等同于原生的app.js、app.json和app.wxss）
|-- package.json              # 项目的package配置
|-- project.config.json       # wepy项目配置
|-- wepy.config.js            # wepy打包配置
```

### 文件命名规则

- **图片命名：**

统一采用小写，多个单词用下划线连接，`error.png`、`error_large.png`等，并且同一类文件要求使用文件夹分类存放。

- **页面命名：**

统一采用驼峰式命名方式，`home.wpy`、`list.wpy`、`detail.wpy`、`searchResult.wpy`。

- **组件命名：**

统一采用首字母大写的形式命名，`Panel.wpy`、`SearchResult.wpy`、`LoadingMore.wpy`。

### 代码书写规范

- **组件的引用声明统一采用首字母大写，提高辨识度**

```js
import LoadMore from '../components/LoadMore'

components = {
  LoadMore: LoadMore
}
```

- **组件的自定义事件统一使用 on 前缀**

```html
<LoadMore
  message="加载中，请稍等..."
  :show.sync="isShowMore"
  @onComplete.user="handleMoreComplete"
/>
```

- **events中用于组件通信的事件函数统一使用 on 前缀**

```js
events = {
  // 关闭优惠券弹层
  onCloseCashCoupon(info, evt) {

  }
}
```

- **methods中的事件处理函数统一使用 handle 前缀**

```js
methods = {
  // 下载处理
  handleDownLoad() {

  }
}
```

## wepy小程序开发注意事项

### wepy封装的api可能与官方原生有差异

除了 wepy 中优化了的一些API，例如 `wepy.request`等，其它小程序的API最好还是使用wx调出，因为wepy中的一些API可能与小程序官方的呈现有所差异。

例如：

`wepy.showActionSheet()` 的success回调不会被执行。

### 异步函数中的数据更新必须调用 this.$apply() 方法

在异步函数中更新数据的时候，必须手动调用$apply方法，才会触发脏数据检查流程的运行。

```js
setTimeout(() => {
  this.title = 'this is title';
  this.$apply();
}, 3000);
```

### wepy 中的组件实现方式是在构建时静态编译进wxml文件，而非小程序原生组件

WePY 1.x 版本中，组件的实现采用的的是静态编译组件，即组件是在编译阶段编译进页面的，每个组件都是唯一的一个实例，目前只提供简单的 repeat 支持。

不支持在 repeat 的组件中去使用 computed, watch 等特性，但可以使用 props 特性。


### 初始data的定义采用的是对象字面量

微信小程序、以及在wepy中，页面的初始data的定义用的都是对象字面量，当小程序被加载时，所有页面的js文件都会被执行。

自此之后，每次进入一个页面，其data的初始内容都是小程序加载时被执行好的（不考虑分包加载）。

所以我们在使用过程中，切勿在data={}声明中放置一些预期会动态更新的值，以避免对页面逻辑造成影响。
