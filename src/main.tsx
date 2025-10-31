import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/special-elite/400.css"; // Imports the default weight
import "@fontsource/geist-mono/400.css"; // Imports a specific weight for Geist Mono
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "@/components/theme-provider"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
