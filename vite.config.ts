import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    rolldownOptions: {
      output: {
        // Libraries change far less often than the site, so they get their own long-cached files
        // and download in parallel with the app code.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'gsap', test: /node_modules[\\/](gsap|lenis)[\\/]/ },
            { name: 'shaders', test: /node_modules[\\/]@paper-design[\\/]/ },
          ],
        },
      },
    },
  },
})
