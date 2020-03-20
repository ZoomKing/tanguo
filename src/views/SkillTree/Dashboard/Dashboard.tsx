import React from 'react'
import './Dashboard.scss'
import ArrowCanvas, { ArrowCanvasParams } from './ArrowCanvas/ArrowCanvas'
import { treeOptions } from './TreeOptions'

var getRandomColor = function() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

const Dashboard: React.FC = () => {
    const arrowCanvasOptions = treeOptions.reduce((pre, item) => {
        let wip: ArrowCanvasParams[] = []
        if (item.children) {
            wip = item.children.reduce((p, i) => {
                const endPoint = [
                    ...treeOptions.filter(t => t.id === i)[0].position,
                ]
                const startPoint = [...item.position]
                startPoint[0] = startPoint[0] + 35
                endPoint[0] = endPoint[0] + 35
                p.push({
                    startPoint,
                    endPoint,
                    strokeStyle: getRandomColor(),
                    lineWidth: 10,
                })
                return p
            }, [] as ArrowCanvasParams[])
        }
        return pre.concat(wip)
    }, [] as ArrowCanvasParams[])

    return (
        <div className="skill-tree-dashbord">
            <div className="skill-tree-box">
                {treeOptions.map(item => {
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
