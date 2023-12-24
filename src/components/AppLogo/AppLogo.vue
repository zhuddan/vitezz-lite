<script setup lang="ts">
const title = __APP_TITLE__;
</script>

<template>
  <router-link class="app-logo" to="/">
    <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M15.583 23.497c.067.192-.043.348-.247.348H9.074c-.408 0-.85-.311-.988-.695L.043.784C-.105.392.149.115.528.16L6.92.776c.405.039.844.383.978.767l7.684 21.953zM23.473.16l-6.392.616c-.406.039-.844.383-.978.768l-3.827 10.99l3.678 10.509L23.959.783c.137-.383-.08-.662-.485-.623z"
      />
    </svg>
    <span>{{ title.toUpperCase() }}</span>
  </router-link>
</template>

<style scoped lang="scss">
.app-logo {
  display: flex;
  align-items: center;
  text-decoration: none;

  .logo-svg{
    height: 40px;
    width: 40px;
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
