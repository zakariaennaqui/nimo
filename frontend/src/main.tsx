import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { CarProvider } from './context/CarContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <CarProvider>
        <App />
      </CarProvider>

    </AuthProvider>

  </BrowserRouter>,
)
