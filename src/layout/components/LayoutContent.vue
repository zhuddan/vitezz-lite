<script setup lang="ts">
import BackTop from '@/components/BackTop/BackTop.vue';

defineOptions({
  name: 'LayoutContent',
});
</script>

<template>
  <div class="content-wrapper">
    <main id="content">
      <router-view />
    </main>
    <BackTop />
  </div>
</template>

<style scoped lang="scss">
  @import '@/style/var.scss';

  @media screen and (max-width: $screen-md) {
    .content-wrapper {
      grid-template-columns: auto !important;
    }
  }

  .content-wrapper {
    flex: 1;
    background: #f6f6f6;
  }

  #content {
    flex: 1;
    padding: var(--app-content-padding);
    overflow-x: hidden;
  }
</style>
