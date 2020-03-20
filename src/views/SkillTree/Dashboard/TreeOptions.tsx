import React, { ReactNode } from 'react'

interface LabelParams {
    id: string
    content: ReactNode
    children?: string[]
    position: number[]
}
export const treeOptions: LabelParams[] = [
    {
        id: '1',
        content: <>前端</>,
        children: ['11', '12', '13', '14', '15'],
        position: [580, 20],
    },
    {
        id: '11',
        content: <>html</>,
        children: ['111'],
        position: [30, 130],
    },
    {
        id: '12',
        content: <>css</>,
        children: ['123', '124'],
        position: [250, 130],
    },
    {
        id: '13',
        content: <>js</>,
        children: ['131', '132', '133', '134'],
        position: [500, 130],
    },
    {
        id: '14',
        content: <>工程化</>,
        children: ['141', '142', '143', '144'],
        position: [900, 130],
    },
    {
        id: '15',
        content: <>前端框架</>,
        children: ['151', '152', '153', '154'],
        position: [1200, 130],
    },
    {
        id: '111',
        content: <>canvas</>,
        position: [0, 280],
    },
    {
        id: '123',
        content: '预编译',
        position: [100, 280],
    },
    {
        id: '124',
        content: 'css3',
        position: [200, 280],
    },
    {
        id: '131',
        content: <>es6</>,
        position: [300, 280],
    },
    {
        id: '132',
        content: <>websocket</>,
        position: [400, 280],
    },
    {
        id: '133',
        content: <>ajax</>,
        position: [500, 280],
    },
    {
        id: '134',
        content: <>原型链</>,
        position: [600, 280],
    },
    {
        id: '141',
        content: <>webpack</>,
        position: [700, 280],
    },
    {
        id: '142',
        content: <>jenkins</>,
        position: [800, 280],
    },
    {
        id: '143',
        content: <>rollup</>,
        position: [900, 280],
    },
    {
        id: '144',
        content: <>cli</>,
        position: [1000, 280],
    },
    {
        id: '151',
        content: <>vue</>,
        position: [1100, 280],
    },
    {
        id: '152',
        content: <>react</>,
        position: [1200, 280],
    },
    {
        id: '153',
        content: <>angular</>,
        position: [1300, 280],
    },
    {
        id: '154',
        content: <>others</>,
        position: [1400, 280],
    },
]
