import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './AppRouter.jsx'
import { BrowserRouter } from 'react-router-dom'
import { isUserLogged } from '../src/login/helpers/loginHelpers.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className={isUserLogged() ? 'main-content' : null}></div>
    <AppRouter />
  </BrowserRouter>,
)
