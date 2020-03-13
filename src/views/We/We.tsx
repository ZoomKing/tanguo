import React from 'react'
import './We.scss'
import { generateWePageRoutes } from '@/router/Routes'

const SkillTree: React.FC = () => {
    return <section className="we-page">{generateWePageRoutes()}</section>
}

export default SkillTree
