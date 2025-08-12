import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'], // Add support for 3D model files
  build: {
    assetsInlineLimit: 0, // This ensures the assets are properly handled
  },
})
