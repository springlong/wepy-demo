import request, {apiBaseUrl} from './request'

const Actions = {
  // 获取首页数据
  getHomeData: (params) => {
    return request({url: `${apiBaseUrl}/get/home/data`, method: 'GET', params})
  },

  // 获取详情数据
  getDetailData: (params) => {
    return request({url: `${apiBaseUrl}/get/detail/data`, method: 'GET', params})
  }
}

export default Actions
