import { generateGaodePageRoutes } from '@/router/Routes'
import customConnect from '@/store/custom-connect'
import React from 'react'
import './GaoDe.scss'

const GaoDe: React.FC = () => {
    return <section className="gaode-page">{generateGaodePageRoutes()}</section>
}

export default customConnect()(GaoDe)
