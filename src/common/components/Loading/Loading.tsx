import ReactLoading from '@auraxy/react-loading'
import React from 'react'
import './Loading.scss'

const Loading: React.FC = () => {
    return (
        <div className="loading">
            <ReactLoading />
        </div>
    )
}

export default Loading
