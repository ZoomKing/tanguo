import { ReactAsyncButton, ButtonProps } from '@auraxy/react-async-button'
import ReactLoading from '@auraxy/react-loading'
import Toast from '@components/Toast/Toast'
import React from 'react'
import classNames from 'classnames'
import './SaButton.scss'

// @ts-ignore
interface SaButtonProps extends ButtonProps {
    className?: string
    fill?: boolean
    disableToast?: boolean
    type?: 'normal' | 'text'
    onClick?(ev?: React.MouseEvent): any
}

const SaButton: React.FC<SaButtonProps> = ({
    children,
    onClick,
    className,
    fill,
    type = 'normal',
    disableToast,
    loadingContent,
    ...rest
}) => {
    const buttonClick = async (ev: React.MouseEvent) => {
        return (
            onClick &&
            onClick(ev).catch((e: Error) => {
                if (!disableToast) Toast.error(e)
                return Promise.reject(e)
            })
        )
    }
    return (
        <ReactAsyncButton
            {...rest}
            className={classNames(
                'sa-button',
                type === 'normal' ? 'sa-button-normal' : 'sa-button-text',
                fill ? 'sa-fill' : '',
                className,
            )}
            onClick={buttonClick}
            loadingContent={loadingContent || <ReactLoading />}
        >
            {children}
        </ReactAsyncButton>
    )
}

export default SaButton
