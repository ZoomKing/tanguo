import React, { useEffect, useState } from 'react'
import './WebSocket.scss'
import SaButton from '@/common/components/SaButton/SaButton'
import io from 'socket.io-client'
import SaInput from '@/common/components/SaInput/SaInput'

interface UserName {
    value: string
    status: boolean
}

interface Msg {
    type: 'msg' | 'notice'
    name: string
    id: string
    msg?: string
    action?: string
}

// 建立连接
const socket = io.connect('http://192.168.0.58:3002/')

const WebSocketComp: React.FC = () => {
    const [userName, setUserName] = useState<UserName>({
        value: '',
        status: false,
    })
    const [msg, setMsg] = useState<string>('')
    const [list, setList] = useState<Msg[]>([])

    useEffect(() => {
        socket.on('message', function(message: Msg) {
            setList(_list => [..._list, message])
        })

        // 接收到系统通知
        socket.on('joinNoticeOther', function(message: Msg) {
            setList(_list => [..._list, message])
        })

        // 断开连接回调事件
        socket.on('disconnection', function(message: Msg) {
            setList(_list => [..._list, message])
        })
    }, [])

    const sendMsg = () => {
        const id = new Date().getTime()
        socket.send({
            id,
            name: userName.value,
            msg,
        })
        setMsg('')
    }

    return (
        <div className="websocket-chat">
            {userName.status ? (
                <>
                    <div className="chat">
                        <p>聊天框</p>
                        {list.map((item, key) => {
                            return item.type === 'msg' ? (
                                <div key={key} className="line">
                                    <p className="line-name">{item.name}：</p>
                                    <p className="line-content">{item.msg}</p>
                                </div>
                            ) : (
                                <div key={key} className="line-notice">
                                    {item.name} {item.action}
                                </div>
                            )
                        })}
                    </div>
                    <div className="send-msg">
                        <SaInput
                            onChange={(e: any) => {
                                setMsg(e.target.value)
                            }}
                            placeholder="输入发送内容"
                        />
                        <SaButton onClick={sendMsg}>send msg</SaButton>
                    </div>
                </>
            ) : (
                <div className="set-name">
                    <SaInput
                        placeholder="请输入姓名"
                        onChange={(e: any) => {
                            setUserName({
                                value: e.target.value,
                                status: false,
                            })
                        }}
                    />
                    <SaButton
                        onClick={() => {
                            if (!userName) return
                            setUserName({
                                value: userName.value,
                                status: true,
                            })
                            socket.emit('join', {
                                name: userName.value,
                            })
                        }}
                    >
                        确定
                    </SaButton>
                </div>
            )}
        </div>
    )
}

export default WebSocketComp
