import React from 'react'
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

    return (
        <div>
            <SaButton onClick={saToastSuccess}>Toast-Success</SaButton>
            <SaButton onClick={saToastWarn}>Toast-Success</SaButton>
            <SaButton onClick={saToastInfo}>Toast-Success</SaButton>
            <SaButton onClick={saToastError}>Toast-Success</SaButton>
            <div>
                <p>PlanA</p>
                <p>
                    邓州站 18:30 => 西安站 1:31(+1) <span>72元</span>
                </p>
                <p>
                    西安站 => 西安北站 (17KM ) 地铁首班车 （06:33 ）time: 47分钟
                </p>
                <p>
                    西安北站7：30 => 杭州东站 14:41 <span>653.5元</span>
                </p>
                <p>Time: 18:30 => 14:41(+1) Price: 725.5</p>
            </div>
            <div>
                <p>PlanB</p>
            </div>
        </div>
    )
}

export default Dashboard
