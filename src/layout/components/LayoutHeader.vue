<script setup lang="ts">
import AppLogo from '@/components/AppLogo/AppLogo.vue';
// import { useAppStore } from '@/store/modules/app';
// import { useUserStore } from '@/store/modules/user';

defineOptions({
  name: 'LayoutHeader',
});
const userStore = useUserStore();

// const appStore = useAppStore();
// const userStore = useUserStore();
// const isLogin = computed(() => !!userStore.user);
// const userName = computed(() => userStore.user?.userName);

const router = useRouter();

async function handleLogout() {
  if (!confirm('确定退出登录？')) return;
  await userStore.logout();
  router.replace('/redirect/');
}
</script>

<template>
  <header class="layout-header">
    <div class="layout-header_inner container flex items-center">
      <AppLogo />
      <div class="flex-1"></div>
      <nav class="">
        <router-link to="/">
          home
        </router-link>
        <router-link to="/about">
          about
        </router-link>
        <router-link v-if="!userStore.user" to="/login">
          login
        </router-link>
      </nav>
      <div v-if="userStore.user" class="user-info flex items-center" style="margin-left: 20px;">
        <span>{{ userStore.user?.userName?.toLocaleUpperCase() }}</span>
        <button class="btn-primary" @click="handleLogout">
          退出登录
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
  @import '@/style/var.scss';

  .layout-header {
    background: white;
    position: sticky;
    box-sizing: border-box;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    animation-duration: 0.1s;
  }

  .layout-header_inner {
    height: var(--app-header-hight);
    border-bottom: 1px solid #ebebeb;
  }

  .user-info {
    color: var(--color-primary);

    button {
      margin-left: 10px;
    }
  }

  .breadcrumbs-container {
    background-color: #f9f9fb;
    border-bottom: 1px solid #cdcdcd;
    height: var(--app-breadcrumbs-hight);
    display: flex;
    align-items: center;

    .sidebar-button {
      background: none;
      border: 0;
      padding: 0;
      margin-right: 10px;

      &:hover {
        cursor: pointer;
      }

      .app-iconify {
        transition: 150ms ease all;
      }

      &.collapse {
        .app-iconify {
          transform: scaleX(-1);
        }
      }
    }
  }

  nav{
    a{
      padding: 6px 0;
      text-decoration: none;

      &+a{
        margin-left: 10px;
      }

      &.router-link-exact-active{
        border-bottom: 4px solid;
        color: var(--color-primary);
        font-weight: 600;
      }
    }
  }
</style>
