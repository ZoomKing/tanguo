import customConnect from '@/store/custom-connect'
import React from 'react'
import './ClientHeader.scss'

const ClientHeader: React.FC = () => {
    return <header className="client-header">{'client-header'}</header>
}

export default customConnect()(ClientHeader)
