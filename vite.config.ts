import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import { createVitePlugins } from './build/vite';
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: createVitePlugins(isBuild),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'types'),
      },
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      host: true,
    },
    // optimizeDeps: {
    //   // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
    //   include: ['@iconify/iconify', '@purge-icons/generated'],
    // },
  };
});
