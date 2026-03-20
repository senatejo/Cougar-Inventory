import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', 
  build: {
    outDir: "C:/Users/Sena/Source/Repos/Cougar-Roleplay-Project/Inventory/Client/Inventory/DeMojoInventory/",
    emptyOutDir: true,
  },
  plugins: [react(), tsconfigPaths()],
})