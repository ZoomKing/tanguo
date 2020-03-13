import { generateTestCompRoute } from '@/router/Routes'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import NotFound from './NotFound'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>{generateTestCompRoute(NotFound)}</BrowserRouter>,
        div,
    )
    ReactDOM.unmountComponentAtNode(div)
})
