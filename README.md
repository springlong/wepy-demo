# wepy demo

微信小程序 wepy demo

## wepy小程序开发基本规范

### src目录结构



### 文件命名规则

图片命名：统一采用驼峰式命名方式，`error.png`、`errorLarge.png`等，并且同一类文件要求使用文件夹分类存放。

页面命名：统一采用驼峰式命名方式，`home.wpy`、`list.wpy`、`detail.wpy`。

组件命名：统一采用首字母大写的形式命名，`Panel.wpy`、`SearchResult.wpy`、`LoadingMore.wpy`。

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

### events组件通信事件函数统一使用 `on` 前缀

```js
events = {
  // 关闭优惠券弹层
  onCloseCashCoupon(info, evt) {

  }
}
```

### methods事件处理函数统一使用 `handle` 前缀

```js
methods = {
  // 下载处理
  handleDownLoad() {

  }
}
```
