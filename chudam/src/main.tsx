// main.tsx

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import router from './router/router'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <React.Fragment>
        <App />
    </React.Fragment>,
)
