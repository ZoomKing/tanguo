import React, { useRef } from 'react'
import './Dashboard.scss'
import SaToast from '@/common/components/SaToast/SaToast'
import SaButton from '@/common/components/SaButton/SaButton'

const Dashboard: React.FC = () => {
    const saToastSuccess = () => {
        SaToast.success('saToastSuccess')
    }
    const saToastWarn = () => {
        SaToast.warn('saToastWarn')
    }
    const saToastInfo = () => {
        SaToast.info('saToastInfo')
    }
    const saToastError = () => {
        SaToast.error('saToastError')
    }
    const ref = useRef<any>()

    const onInput = () => {
        console.log('ref', ref.current.files)
        const files = ref.current.files
        const reader = new FileReader()
        // 读取文件
        reader.readAsText(files[0])
        // reader.readAsText(files[0], 'UTF-8')
        // reader.readAsText(files[0], 'gb2312')
        // reader.readAsArrayBuffer(files[0])
        // reader.readAsText(files[0], 'gb2312')
        // reader.readAsText(files[0], 'gb2312')
        // 读取完文件之后会回来这里
        reader.onload = function(e: any) {
            // console.log('e', e)
            // 读取文件内容
            const fileString = e.target.result
            // 接下来可对文件内容进行处理
            console.log(fileString)
            const relArr = fileString.split('\r\n')
            console.log('relArr', relArr)
        }
    }

    return (
        <div>
            <SaButton onClick={saToastSuccess}>Toast-Success</SaButton>
            <SaButton onClick={saToastWarn}>Toast-Success</SaButton>
            <SaButton onClick={saToastInfo}>Toast-Success</SaButton>
            <SaButton onClick={saToastError}>Toast-Success</SaButton>
            <input type="file" ref={ref} onChange={onInput} />
        </div>
    )
}

export default Dashboard
