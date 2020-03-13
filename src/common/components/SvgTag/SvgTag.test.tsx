import SvgTag from '@components/SvgTag/SvgTag'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import SvgModules from './SvgModules'

const id = Object.keys(SvgModules)[0]

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <SvgTag svgName={id} />
        </BrowserRouter>,
        div,
    )
    ReactDOM.unmountComponentAtNode(div)
})
