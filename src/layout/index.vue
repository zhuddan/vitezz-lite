<script setup lang="ts">
import LayoutContent from './components/LayoutContent.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutHeader from './components/LayoutHeader.vue';

defineOptions({
  name: 'Layout',
});

const router = useRouter();
const layout = ref(false);

router.beforeEach(() => {
  layout.value = false;
});
router.afterEach((a) => {
  layout.value = a.meta.layout === false ? false : true;
});
</script>

<template>
  <div class="layout">
    <LayoutHeader v-if="layout" />
    <LayoutContent />
    <LayoutFooter v-if="layout" />
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
