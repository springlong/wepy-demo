import wepy from 'wepy'

/*
  默认式混合
  对于组件data数据，components组件，events事件以及其它自定义方法采用默认式混合，
  即如果组件未声明该数据，组件，事件，自定义方法等，
  那么将混合对象中的选项将注入组件之中。对于组件已声明的选项将不受影响。

  兼容式混合
  对于组件methods响应事件，以及小程序页面事件将采用兼容式混合，
  即先响应组件本身响应事件，然后再响应混合对象中响应事件。
  注意，这里事件的执行顺序跟Vue中相反，Vue中是先执行mixin中的函数，再执行组件本身的函数。
*/
export default class testMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }

  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
      console.log('mixin method tap')
    }
  }

  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}
