import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Loading from './Loading'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <Loading />
        </BrowserRouter>,
        div,
    )
    ReactDOM.unmountComponentAtNode(div)
})
