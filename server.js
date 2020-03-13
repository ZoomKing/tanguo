// 引入http标准模块,CommonJS模块
const http = require('http')
const fs = require('fs')
const ws = require('socket.io')
// 当前在线人数
let count = 0
// 总访客人数
let totalCount = 0

// 创建一个web服务器
const server = http.createServer(function(request, response) {})

// 基于当前web服务器开启socket实例
const io = ws(server)

// 检测连接事件
io.on('connection', function(socket) {
    // console.log("当前有用户连接");
    count++
    totalCount++
    // console.log("count:" + count);

    let name = ''

    // 给公众发送上线信息
    //	socket.broadcast.emit("connection", {
    //		count: count,
    //		id: count
    //	});

    // 给自己发送上线信息
    //	socket.emit("connection", {
    //		count: count,
    //		id: totalCount
    //	});

    // 加入群聊
    socket.on('join', function(message) {
        console.log(message)
        name = message.name
        // console.log(name + "加入了群聊");
        socket.broadcast.emit('joinNoticeOther', {
            name: name,
            action: '加入了群聊',
            count: count,
        })
        // socket.emit('joinNoticeSelf', {
        //   count,
        //   id: totalCount,
        // })
    })

    // 接收客户端所发送的信息
    socket.on('message', function(message) {
        console.log(message)
        // 向所有客户端广播发布的消息
        io.emit('message', message)
    })

    //	 监听到连接断开
    socket.on('disconnect', function() {
        count--
        console.log(name + '离开了群聊')
        io.emit('disconnection', {
            count,
            name,
            action: '退出了聊天',
        })
    })
})

// 服务器监听端口
server.listen(3002)
console.log('Server has started.\n')
