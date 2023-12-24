<script setup lang="ts">
import LayoutContent from './components/LayoutContent.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutHeader from './components/LayoutHeader.vue';

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
