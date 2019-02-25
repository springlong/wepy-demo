'use strict'

// 引入http模块
const http = require('http')

// 打开浏览器页面
// const open = require('open')

// 引入url模块
const url = require('url')

// 引入URL查询参数处理模块
const queryString = require('query-string')

// 引入文件监控模块
// const chokidar = require('chokidar')

// 引入mock处理模块
let mockData = require('./index')

// 监控目录文件重新载入mock数据
// chokidar.watch('./').on('change', (path) => {
//   'use strict'
//   console.log(`File ${path} has been changed!`)
// })

/**
 * 发送数据至客户端
 * @param {Object} request
 * @param {Object} response
 * @param {Object} params 接口传递的参数对象
 */
const requestCallback = (request, response, params) => {
  // request.url表示请求url的剔除协议、域名、端口后的剩余部分
  const parseResult = url.parse(request.url)
  const routeMath = mockData[parseResult.pathname]
  let matchData = false

  // 获取Mock数据
  if (routeMath) {
    matchData = routeMath(params)
  }

  if (matchData) {
    const code = 200
    const returnContent = JSON.stringify(matchData)

    // 写入头信息
    response.writeHead(code, {
      'Content-Type': 'application/json;charset=UTF-8'
    })

    // 写入返回内容
    response.write(returnContent)

    // 发送响应数据
    response.end()
  } else {
    // 写入头信息
    response.writeHead(404, {
      'Content-Type': 'text/html;charset=UTF-8'
    })

    // 写入返回内容
    response.write('您访问的url不存在，请配置Mock Server路由！')

    // 发送响应数据
    response.end()
  }
}

// 创建服务器
// 每次http请求都将执行回调函数
const server = http.createServer((request, response) => {
  switch (request.method) {
    case 'GET':
      // GET请求的参数内容直接从url中获取
      const parseResult = url.parse(request.url)
      const params = queryString.parse(parseResult.query)
      requestCallback(request, response, params)
      break
    case 'POST':
      // POST请求的参数内容需要从body中获取
      // 定义了一个post变量，用于暂存请求体的信息
      let post = ''

      // 通过request的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
      request.on('data', (chunk) => {
        post += chunk
      })

      // 在end事件触发后，通过queryString.parse将post解析为真正的POST请求格式
      request.on('end', () => {
        post = queryString.parse(post)
        requestCallback(request, response, post)
      })
      break
  }
})

// 监听端口
server.listen(8000)

// 控制台输出提示
console.log('mock server running at http://localhost:8000/')

// 浏览器打开页面
// open('http://localhost:8000/')
