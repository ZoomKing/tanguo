import React, { ReactNode } from 'react'
import './Dashboard.scss'
import ArrowCanvas, { ArrowCanvasParams } from './ArrowCanvas/ArrowCanvas'

interface labelParams {
    id: string
    content: ReactNode
    children?: string[]
    position: number[]
}

const Dashboard: React.FC = () => {
    const options: labelParams[] = [
        {
            id: '1',
            content: <>前端</>,
            children: ['11', '12', '13', '14'],
            position: [600, 20],
        },
        {
            id: '11',
            content: <>css</>,
            children: ['111', '112', '113'],
            position: [30, 170],
        },
        {
            id: '12',
            content: <>js</>,
            children: ['123', '124'],
            position: [350, 170],
        },
        {
            id: '13',
            content: <>html</>,
            position: [800, 170],
        },
        {
            id: '14',
            content: <>html</>,
            position: [1200, 170],
        },
        {
            id: '111',
            content: <>html</>,
            position: [0, 320],
        },
        {
            id: '112',
            content: <>html</>,
            position: [120, 320],
        },
        {
            id: '113',
            content: <>html</>,
            position: [250, 320],
        },
        {
            id: '123',
            content: 'html',
            position: [0, 470],
        },
        {
            id: '124',
            content: 'html',
            position: [0, 570],
        },
    ]

    const arrowCanvasOptions = options.reduce((pre, item) => {
        let wip: ArrowCanvasParams[] = []
        if (item.children) {
            wip = item.children.reduce((p, i) => {
                const endPoint = [
                    ...options.filter(t => t.id === i)[0].position,
                ]
                const startPoint = [...item.position]
                startPoint[0] = startPoint[0] + 35
                endPoint[0] = endPoint[0] + 35
                p.push({
                    startPoint,
                    endPoint,
                    lineWidth: 15,
                })
                return p
            }, [] as ArrowCanvasParams[])
        }
        return pre.concat(wip)
    }, [] as ArrowCanvasParams[])

    return (
        <div className="skill-tree-dashbord">
            <div className="skill-tree-box">
                {options.map(item => {
                    const [left, top] = item.position
                    return (
                        <div
                            className="skill-item"
                            key={item.id}
                            style={{
                                left,
                                top,
                            }}
                        >
                            {item.content}
                        </div>
                    )
                })}
                <ArrowCanvas options={arrowCanvasOptions} />
            </div>
        </div>
    )
}

export default Dashboard
