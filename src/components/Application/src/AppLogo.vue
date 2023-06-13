<script setup lang="ts">
const title = __APP_TITLE__;
</script>

<template>
  <router-link class="app-logo" to="/">
    <img height="50" width="50" src="@/assets/logo.png" alt="">
    <span>{{ title.toUpperCase() }}</span>
  </router-link>
</template>

<style scoped lang="scss">
  .app-logo {
    display: flex;
    align-items: center;
    text-decoration: none;

    img {
      display: inline-block;
      height: 50px;
      width: 50px;
    }

    span {
      line-height: 60px;
      color: var(--color-primary);
      // @media screen and (min-width: 900px) {
      //   display: inline-block;
      // }
    }

    &:hover {
      animation: pulse 0.3s forwards;
    }
  }
</style>
