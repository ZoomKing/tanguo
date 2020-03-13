import React, { useReducer, useCallback, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './SaToast.scss'
import SvgTag from '../SvgTag/SvgTag'
import classnames from 'classnames'

interface SaToastElParams {
    holdTime?: number
}

export interface ToastParams {
    msg: ReactNode
    id: string
    icon?: string
    holdTime?: string
}

interface ToastAction {
    type: 'add' | 'del'
    msg: ToastParams
}

enum ToastTypes {
    Success = 'icon-success',
    Info = 'icon-info',
    error = 'icon-error',
    warn = 'icon-warn',
}

let GlobalToast: any

const SaToastEl: React.FC<SaToastElParams> = ({ holdTime = 3000 }) => {
    const [msgs, dispatch] = useReducer(
        (preState: ToastAction['msg'][], { type, msg }: ToastAction) => {
            if (type === 'add') {
                setTimeout(() => {
                    hide(msg)
                }, holdTime)
                return [...preState, msg]
            }
            return preState.filter(item => item.id !== msg.id)
        },
        [],
    )

    const hide = useCallback((msg: ToastAction['msg']) => {
        dispatch({ type: 'del', msg })
    }, [])

    const open = useCallback((msg: ToastAction['msg']) => {
        dispatch({
            type: 'add',
            msg,
        })
    }, [])

    GlobalToast = { open }
    return (
        <>
            {msgs.map((item, index) => (
                <div
                    key={index}
                    className={classnames('sa-toast-el', item.icon)}
                >
                    {item.icon && <SvgTag svgName={item.icon} />}
                    {item.msg}
                </div>
            ))}
        </>
    )
}

export default class SaToast {
    static id = 'sa-toast'

    static success(msg: ReactNode) {
        return SaToast.open(msg, ToastTypes.Success)
    }

    static info(msg: ReactNode) {
        return SaToast.open(msg, ToastTypes.Info)
    }

    static warn(msg: ReactNode) {
        return SaToast.open(msg, ToastTypes.warn)
    }

    static error(msg: ReactNode) {
        return SaToast.open(msg, ToastTypes.error)
    }

    private static render() {
        return new Promise(res => {
            if (document.getElementById(SaToast.id)) res()
            else {
                const dom = document.createElement('div')
                dom.id = SaToast.id
                document.body.appendChild(dom)
                ReactDOM.render(<SaToastEl />, dom, res)
            }
        })
    }

    private static open(msg: ReactNode, icon?: ToastTypes) {
        SaToast.render().then(() => {
            GlobalToast.open({
                msg,
                id: String(Math.random() * 1000),
                icon,
            })
        })
    }
}
