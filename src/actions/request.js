import wepy from 'wepy'

/**
 * 统一request的请求封装
 * @param {Object} options 选项配置
 */
export default async function request(options) {
  const res = await wepy.request({
    url: options.url,
    method: options.method || 'GET',
    data: options.params,
    dataType: options.dataType || 'json',
    header: {
      'Content-Type': options.contentType || 'application/x-www-form-urlencoded'
    }
  })
  return res
}

/**
 * 接口地址的基础url前缀
 */
export const apiBaseUrl = 'https://www.baidu.com/base/api/20190101/'
