import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    // Important pour GitHub Pages : permet au site de fonctionner dans un sous-dossier
    base: './',
    define: {
      // Polyfill pour permettre l'utilisation de process.env.API_KEY dans le code client
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});