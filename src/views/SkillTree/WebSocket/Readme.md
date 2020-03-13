# Q: 服务端使用 socket.io这个包, H5直接 new WebSocket('ws://xxx') 会报  Connection closed before receiving a handshake response

# A: 你服务端用了socket.io这个包。你客户端也得配套的使用socket.io-client这个包。


# Q: WebSocket依赖于HTTP连接，那么它如何从连接的HTTP协议转化为WebSocket协议？

# A: 每个WebSocket连接都始于一个HTTP请求。具体来说，WebSocket协议在第一次握手连接时，通过HTTP协议在传送WebSocket支持的版本号，协议的字版本号，原始地址，主机地址等等一些列字段给服务器端：

``` 
    GET /chat HTTP/1.1
    Host: server.example.com
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key:dGhlIHNhbXBsZSBub25jZQ==
    Origin: http://example.com
    Sec-WebSocket-Version: 13
```

# 注意，关键的地方是，这里面有个Upgrade首部，用来把当前的HTTP请求升级到WebSocket协议，这是HTTP协议本身的内容，是为了扩展支持其他的通讯协议。如果服务器支持新的协议，则必须返回101：

```
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept:s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```
# 至此，HTTP请求物尽其用，如果成功出发onopen事件，否则触发onerror事件，后面的传输则不再依赖HTTP协议!


# Q: WebSocket为什么要依赖于HTTP协议的连接？

# A: 第一，WebSocket设计上就是天生为HTTP增强通信（全双工通信等），所以在HTTP协议连接的基础上是很自然的一件事，并因此而能获得HTTP的诸多便利。第二，这诸多便利中有一条很重要，基于HTTP连接将获得最大的一个兼容支持，比如即使服务器不支持WebSocket也能建立HTTP通信，只不过返回的是onerror而已，这显然比服务器无响应要好的多。

# Q: 每次sendMessage 客户端都会触发很多次回调

# A：？？？？


