import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BadgeProvider } from './context/BadgeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BadgeProvider>
      <App />
    </BadgeProvider>
  </StrictMode>,
)
