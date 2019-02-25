const mockRouter = {
  // 首页接口
  '/get/home/data': (params) => {
    return {
      errorCode: 0,
      message: '',
      data: {
        name: 'Mock Server',
        text: 'Welcome to Mock ~!'
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
        content: '技术是解决问题的方法及方法原理,是指人们利用现有事物形成新事物，或是改变现有事物功能、性能的方法。技术应具备明确的使用范围和被其它人认知的形式和载体，如原材料(输入)、产成品(输出)、工艺、工具、设备、设施、标准、规范、指标、计量方法等。'
      }
    }
  }
}

module.exports = mockRouter
