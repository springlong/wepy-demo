const util = {
  // 展示时间
  showTime() {
    const now = new Date()
    return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日${now.getHours()}时${now.getMinutes()}分${now.getSeconds()}秒`
  }
}

export default util
