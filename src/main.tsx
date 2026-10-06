import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initSmoothScroll, lenis } from './lib/motion'

history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

initSmoothScroll()
lenis?.stop() // locked until the intro finishes (the Preloader starts it again)

// No StrictMode: the intro timeline must run exactly once.
createRoot(document.getElementById('root')!).render(<App />)
