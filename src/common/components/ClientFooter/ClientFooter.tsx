import React from 'react'
import './ClientFooter.scss'
import beiAnUrl from '@/common/imgs/beian.png'

const ClientFooter: React.FC = () => {
    return (
        <div className="client-footer">
            <img src={beiAnUrl} alt="" />
            浙ICP备19047853号 ©2019tangguo
        </div>
    )
}

export default ClientFooter
