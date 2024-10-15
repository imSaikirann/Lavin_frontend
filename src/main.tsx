
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreProvider from './components/StoreProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StoreProvider>
  <App />
  </StoreProvider>
 
  </BrowserRouter>
  

)
