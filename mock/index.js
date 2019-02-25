const mockRouter = {
  // 首页接口
  '/get/home/data': (params) => {
    return {
      errorCode: 0,
      message: '',
      data: {
        name: 'WePY',
        desc: '让小程序支持组件化开发的框架'
      }
    }
  },

  // 详情页接口
  '/get/detail/data': (params) => {
    return {
      errorCode: 0,
      message: '',
      data: {
        title: `详情展示页 ${params.id}`,
        content: 'WePY (发音: /wepi/)是一款让小程序支持组件化开发的框架，通过预编译的手段让开发者可以选择自己喜欢的开发风格去开发小程序。框架的细节优化，Promise，Async Functions的引入都是为了能让开发小程序项目变得更加简单，高效。'
      }
    }
  }
}

module.exports = mockRouter
