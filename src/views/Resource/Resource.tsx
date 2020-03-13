import { generateUserPageRoutes } from '@/router/Routes'
import customConnect from '@/store/custom-connect'
import React from 'react'
import './Resource.scss'

const Resource: React.FC = () => {
    return <section className="user-page">{generateUserPageRoutes()}</section>
}

export default customConnect()(Resource)
