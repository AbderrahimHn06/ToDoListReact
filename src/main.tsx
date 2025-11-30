import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { Colors } from './ThemeProvider'

const colors: {[key: string] : string} = {
    primary: '#69093aff',
    secondary:'#b829bbff' ,
    success: '#c6ff00',
    error: '#b71c1c',
    divider:'#d7ccc8',
    text: '#f8f8f8ff',
    white: '#dfdfdfff',
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Colors.Provider value={colors}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Colors.Provider>
  </StrictMode>
)
