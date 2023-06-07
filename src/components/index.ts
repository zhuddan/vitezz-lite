import type { App } from 'vue';

import { Icon } from '@/components/Icon';

const globComponents = [
  Icon,
];

export function registerGlobComp(app: App) {
  globComponents.forEach((comp) => {
    if (!comp.name)
      console.warn('Global component should has a name');
    else
      app.component(comp.name, comp);
  });
}