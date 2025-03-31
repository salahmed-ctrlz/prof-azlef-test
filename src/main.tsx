import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // Make sure this line exists

// Get the base URL from the meta tag
const baseUrl = document.querySelector('base')?.getAttribute('href') || '/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
