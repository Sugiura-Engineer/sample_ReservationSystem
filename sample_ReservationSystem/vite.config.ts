import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/sample_ReservationSystem/', // GitHub Pagesのリポジトリ名.
  plugins: [react()],
})
