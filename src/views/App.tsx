import { generateRoutes } from '@/router/Routes'
// import ClientHeader from '@components/ClientHeader/ClientHeader'
import React from 'react'
import './App.scss'
import { BrowserRouter } from 'react-router-dom'
import { Store } from 'redux'

interface AppProps {
    store: Store
}

const App: React.FC<AppProps> = props => {
    return (
        <BrowserRouter>
            {/* <ClientHeader /> */}
            {generateRoutes(props.store)}
        </BrowserRouter>
    )
}

export default App
