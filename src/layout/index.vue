<script setup lang="ts">
import LayoutContent from './components/content/index.vue';
import LayoutFooter from './components/footer/index.vue';
import LayoutHeader from './components/header/index.vue';

defineOptions({
  name: 'Layout',
});
</script>

<template>
  <div class="layout">
    <LayoutHeader />
    <LayoutContent />
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
