import wepy from 'wepy'

// 拦截request请求
// wepy 官方提供了在 app.wpy 中通过 this.intercept 进行request拦截
// 个人觉得将request请求相关的内容放在同一处将更方便代码的阅读和维护
const requestIntercept = {
  // 发出请求时的回调函数
  config (params) {
    // 对所有request请求中的参数对象统一附加时间戳属性
    params.timestamp = +new Date()

    // 必须返回参数对象，否则无法发送请求到服务端
    return params
  },

  // 请求成功后的回调函数
  success (res) {
    // 可以在这里对收到的响应数据对象进行加工处理
    console.log('requestIntercept success: ', res)

    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    return res
  },

  // 请求失败后的回调函数
  fail (res) {
    console.log('requestIntercept fail: ', res)

    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
    return res
  },

  // 请求完成时的回调函数(请求成功或失败都会被执行)
  complete (res) {
    console.log('requestIntercept complete: ', res)
  }
}

/**
 * 统一request的请求封装
 * @param {Object} options 选项配置
 */
export default async function request(options) {
  let params = options.params
  if (requestIntercept.config) {
    params = requestIntercept.config(options.params)
  }

  let res = await wepy.request({
    url: options.url,
    method: options.method || 'GET',
    data: params,
    dataType: options.dataType || 'json',
    header: {
      'Content-Type': options.contentType || 'application/x-www-form-urlencoded'
    }
  })

  if (res.statusCode === 200) {
    res = requestIntercept.success && requestIntercept.success(res)
  } else {
    res = requestIntercept.fail && requestIntercept.fail(res)
  }
  requestIntercept.complete && requestIntercept.complete(res)

  return res
}

/**
 * 接口地址的基础url前缀
 */
export const apiBaseUrl = 'http://localhost:8000'
