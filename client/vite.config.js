import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'os';

function getLocalIPv4() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interfaceInfo = interfaces[interfaceName];
    for (const info of interfaceInfo) {
      if (!info.internal && info.family === 'IPv4') {
        return info.address;
      }
    }
  }
  return 'localhost'; 
}

const localIPv4 = getLocalIPv4();


export default defineConfig({
  plugins: [react()],
  server: {
    host: localIPv4, 
    port: 5176,
  },
  resolve: {
    alias: {
      'csv-parse/lib/sync': 'csv-parse/lib/sync',
    },
  },
});
