<script setup lang="ts">
defineOptions({
  name: 'LayoutFooter',
});
</script>

<template>
  <footer>copyright © vitezz-lite</footer>
</template>

<style scoped>
  footer {
    background: #f2f2f2;
    color: #000;
    text-align: center;
    font-size: 12px;
    height: var(--app-footer-hight);
    line-height: var(--app-footer-hight);
    left: 0;
    width: 100%;
    bottom: 0;
  }
</style>
