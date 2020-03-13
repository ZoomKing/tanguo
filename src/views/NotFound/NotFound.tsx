import React from 'react'
import './NotFound.scss'
import { browserHistory } from '@/router/Routes'

const NotFound: React.FC = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>找不到网页了！</p>
            <button
                className="back btn btn-blue"
                onClick={browserHistory.goBack}
            >
                返回
            </button>
        </div>
    )
}

export default NotFound
