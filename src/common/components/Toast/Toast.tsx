import SvgTag from '@components/SvgTag/SvgTag'
import { singletonObj } from '@livelybone/singleton'
import React, {
    CSSProperties,
    useCallback,
    useLayoutEffect,
    useReducer,
} from 'react'
import ReactDOM from 'react-dom'
import './Toast.scss'

enum ToastMode {
    Coexist,
    ReplacePre,
}

interface ToastProps {
    holdTime?: number
    mode?: ToastMode
}

export type ToastMsg = {
    msg: React.ReactNode
    icon?: string
    holdTime?: number
    style?: CSSProperties

    [key: string]: any
}

export type ToastMsgMix = ToastMsg | React.ReactNode

export function isToastMsg(msg: ToastMsgMix): msg is ToastMsg {
    return !!(
        msg &&
        ((msg as any).msg !== undefined || (msg as any).message !== undefined)
    )
}

function packMsg(msg: ToastMsg) {
    const ids = singletonObj('ToastIds', () => Object.create(null))
    let id
    do {
        id = Math.floor(Math.random() * 10000)
    } while (ids[id])
    ids[id] = true
    return { ...msg, id }
}

type HideFn = () => void

interface ToastRefProps {
    open(msg: ToastMsgMix): Promise<HideFn>
}

let GlobalToast: ToastRefProps

type ToastAction = { type: 'add' | 'del'; msg: ReturnType<typeof packMsg> }

const ToastEl: React.FC<ToastProps> = ({
    holdTime = 2000,
    mode = ToastMode.Coexist,
}) => {
    const [msgs, dispatch] = useReducer(
        (preState: ToastAction['msg'][], { type, msg }: ToastAction) => {
            if (type === 'add') {
                setTimeout(() => {
                    dispatch({ type: 'del', msg: msg })
                }, msg.holdTime || holdTime)
                return mode === ToastMode.Coexist ? [...preState, msg] : [msg]
            }

            return preState.filter($msg => {
                return msg.id !== $msg.id
            })
        },
        [],
    )

    const hide = useCallback((msg: ToastAction['msg']) => {
        dispatch({ type: 'del', msg })
    }, [])

    const open = useCallback(
        async (msg: ToastMsgMix) => {
            const $msg = packMsg(!isToastMsg(msg) ? { msg: msg } : msg)
            dispatch({ type: 'add', msg: $msg })
            return () => hide($msg)
        },
        [hide],
    )

    useLayoutEffect(() => {
        GlobalToast = { open }
    }, [open])

    return (
        <>
            {msgs.map(msg => (
                <div className="toast-item" style={msg.style} key={msg.id}>
                    {msg.icon && <SvgTag svgName={msg.icon} />}
                    {msg.msg}
                </div>
            ))}
        </>
    )
}

const style = (background: string, border: string, color: string) => ({
    background,
    border: `1px solid ${border}`,
    color,
})

const ToastTypeInfo = {
    Warn: { icon: 'icon-warn', style: style('#fdf6ec', '#faecd8', '#e6a23c') },
    Success: {
        icon: 'icon-success',
        style: style('#f0f9eb', '#e1f3d8', '#67c23a'),
    },
    Error: {
        icon: 'icon-error',
        style: style('#fef0f0', '#fde2e2', '#f56c6c'),
    },
    Info: { icon: 'icon-info', style: style('#edf2fc', '#ebeef5', '#909399') },
}

export default class Toast {
    static id: string = 'toast'

    static custom(msg: ToastMsgMix) {
        return Toast.open(msg)
    }

    static info(msg: ToastMsgMix) {
        const info = ToastTypeInfo.Info
        return Toast.open(msg, info)
    }

    static success(msg: ToastMsgMix) {
        const info = ToastTypeInfo.Success
        return Toast.open(msg, info)
    }

    static warn(msg: ToastMsgMix) {
        const info = ToastTypeInfo.Warn
        return Toast.open(msg, info)
    }

    static error(msg: ToastMsgMix) {
        const info = ToastTypeInfo.Error
        return Toast.open(msg instanceof Error ? msg.message : msg, info)
    }

    private static render() {
        return new Promise(res => {
            if (document.getElementById(Toast.id)) res()
            else {
                const dom = document.createElement('div')
                dom.id = Toast.id
                document.body.appendChild(dom)
                ReactDOM.render(<ToastEl />, dom, res)
            }
        })
    }

    private static open(
        msg: ToastMsgMix,
        info?: { icon?: string; style?: CSSProperties },
    ) {
        return Toast.render().then(() =>
            GlobalToast!.open(
                isToastMsg(msg)
                    ? { ...msg, msg: msg.msg || msg.message, ...info }
                    : { ...info, msg: msg },
            ),
        )
    }
}
