import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import UserContextProvider from './Context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider >
      <UserContextProvider>
        <BrowserRouter>
          <main className=" text-foreground bg-background">
            <App />
          </main>
        </BrowserRouter>
      </UserContextProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
