# wepy 开发说明

微信小程序 wepy 框架

官方文档：[https://tencent.github.io/wepy/document.html#/](https://tencent.github.io/wepy/document.html#/)

## wepy小程序开发基本规范

### 目录结构

|-- dist
|-- mock                      # mock数据
|-- node_modules
|-- src
|   |-- actions               # 接口目录
|   |   |-- actions.js        # 接口请求的汇总文件
|   |   |-- request.js        # request请求方法的封装处理
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
|   |-- app.wpy               # 小程序配置项（等同于原生的app.js、app.json和app.wxss）
|-- package.json              # 项目的package配置
|-- project.config.json       # wepy项目配置
|-- wepy.config.js            # wepy打包配置


### 文件命名规则

**图片命名：**

统一采用小写，多个单词用下划线连接，`error.png`、`error_large.png`等，并且同一类文件要求使用文件夹分类存放。

**页面命名：**

统一采用驼峰式命名方式，`home.wpy`、`list.wpy`、`detail.wpy`、`searchResult.wpy`。

**组件命名：**

统一采用首字母大写的形式命名，`Panel.wpy`、`SearchResult.wpy`、`LoadingMore.wpy`。

### 组件的引用声明统一采用首字母大写，提高辨识度

```js
import LoadMore from '../components/LoadMore'

components = {
  LoadMore: LoadMore
}
```

### 组件的自定义事件统一使用 `on` 前缀

```html
<LoadMore
  message="加载中，请稍等..."
  :show.sync="isShowMore"
  @onComplete.user="handleMoreComplete"
/>
```

### events中用于组件通信的事件函数统一使用 `on` 前缀

```js
events = {
  // 关闭优惠券弹层
  onCloseCashCoupon(info, evt) {

  }
}
```

### methods中的事件处理函数统一使用 `handle` 前缀

```js
methods = {
  // 下载处理
  handleDownLoad() {

  }
}
```

## 开发注意事项

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
