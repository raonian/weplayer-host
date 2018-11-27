# WebRTC--Web Real-Time Communication (Web 实时通信)
## html5 video live server
---
## 相关API
- MediaStream：音频和视频流
- RTCPeerConnection: 音频和视频数据通信对象
- RTCDataChannel: 任意类型数据通信

## 协议分层
![blockchain](https://segmentfault.com/img/bVV0Kl?w=922&h=432 "webrtc")
- ICE、STUN和TURN是通过UDP建立并维护端到端连接
- SDP是一种数据格式，用于端到端连接时协商参数
- DTLS用于保障传输数据的安全
- SCTP和SRTP属于应用层协议，用于在UDP之上提供不同流的多路复用、拥塞和流量控制，以及部分可靠的交付和其他服务
- ICE（Interactive Connectivity Establishment，交互连接建立）：由于端与端之间存在多层防火墙和NAT设备阻隔，因此我们需要一种机制来收集两端之间公共线路的IP
>- ICE代理向操作系统查询本地IP地址
>- 如果配置了STUN服务器，ICE代理会查询外部STUN服务器，以取得本地端的公共IP和端口
>- 如果配置了TURN服务器，ICE则会将TURN服务器作为一个候选项，当端到端的连接失败，数据将通过指定的中间设备转发

## 工作流程
![blockchain](https://segmentfault.com/img/bVV0KG?w=962&h=826 "RTCPeerConnection")


## 参考资料
*《Web性能权威指南》-- Ilya Grigorik*

---
### 查看demo
```
npm install
npm run start
```