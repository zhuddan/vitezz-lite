import path from 'path';
import fs from 'fs';

import { defineConfig, loadEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import chokidar from 'chokidar';

function generatedIconType(isBuild: boolean) {
  if (isBuild) return;
  const iconsDir = path.resolve(__dirname, 'src/assets/icons');
  let iconTypes: string[] = [];

  function getIconTypeByPath(_path: string, rootName = '') {
    const array = fs.readdirSync(_path);
    for (let index = 0; index < array.length; index++) {
      const svg = array[index];
      const childPath = path.resolve(_path, svg);
      const stats = fs.statSync(childPath);
      const _icon = [rootName, svg].filter(it => it != '').join('-');
      const icon = _icon.endsWith('.svg') ? _icon.slice(0, _icon.length - 4) : _icon;
      if (stats.isDirectory())
        getIconTypeByPath(childPath, `${_icon}`);
      else
        iconTypes.push(`${icon}`);
    }
  }

  function write() {
    iconTypes = [];
    getIconTypeByPath(iconsDir);
    const str = `// Generated IconType...
// cspell:disable
declare type IconType = ${iconTypes.map(e => `'${e}'`).join(' | ')};`;
    fs.writeFileSync(path.resolve(__dirname, 'types', 'icon-type.d.ts'), str);
  }

  const watcher = chokidar.watch(iconsDir);
  watcher.on('all', write);
  write();
}

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
    },
  };
});
