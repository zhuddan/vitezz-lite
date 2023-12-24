import type { App } from 'vue';

import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

const globComponents = [
  SvgIcon,
];

export function registerGlobComp(app: App) {
  globComponents.forEach((comp) => {
    if (!comp.name)
      console.warn('Global component should has a name');
    else
      app.component(comp.name, comp);
  });
}