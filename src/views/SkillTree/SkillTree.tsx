import React from 'react'
import './SkillTree.scss'
import { generateSkillTreePageRoutes } from '@/router/Routes'

const SkillTree: React.FC = () => {
    return (
        <section className="gaode-page">
            {generateSkillTreePageRoutes()}
        </section>
    )
}

export default SkillTree
