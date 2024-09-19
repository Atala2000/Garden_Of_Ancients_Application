import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Convert `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Vite configuration with HTTPS setup
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.join(__dirname, './cert/localhost-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, './cert/localhost.pem')),
    },
    host: '0.0.0.0', // If you need other devices to access it
    port: 5173, // Customize the port if necessary
    cors: true // Enable CORS
  }
})