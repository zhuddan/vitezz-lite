import '@/style/index.scss';

import router, { setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/setupRouterGuard';
import { setupStore } from '@/store';

import App from './App.vue';
import { registerGlobComp } from './components';
import { registerPlugins } from './plugins';
import { initStore } from './store/initStore';
import 'virtual:svg-icons-register';

function __init__() {
  const app = createApp(App);
  // 注册 store
  setupStore(app);
  // 初始化 store
  initStore();
  // 注册路由
  setupRouter(app);
  // 路由拦截
  setupRouterGuard(router);
  // 插件
  registerPlugins(app);
  // 全局组件
  registerGlobComp(app);

  app.mount('#app');
}

__init__();

