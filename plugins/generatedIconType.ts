import path from 'path';
import fs from 'fs';

import chokidar from 'chokidar';

export function generatedIconType(isBuild: boolean) {
  if (isBuild) return;
  const iconsDir = path.resolve(__dirname, '../src/assets/icons');
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
    fs.writeFileSync(path.resolve(__dirname, '../types', 'icon-type.d.ts'), str);
  }

  const watcher = chokidar.watch(iconsDir);
  watcher.on('all', write);
  write();
}