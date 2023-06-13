import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { generatedIconType } from './plugins/generatedIconType';
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isBuild = command === 'build';

  return {
    plugins: [
      generatedIconType(isBuild),
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: ['vue', 'vue-router'],
        dts: './types/auto-imports.d.ts',
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),

      // svg
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        svgoOptions: isBuild,
        // default
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      host: true,
    },
    define: {
      __DEV__: `${command !== 'build'}`,
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
      __APP_API_URL__: JSON.stringify(env.VITE_APP_API_URL),
      __APP_STATIC_URL__: JSON.stringify(env.VITE_APP_STATIC_URL),
    },
  };
});
