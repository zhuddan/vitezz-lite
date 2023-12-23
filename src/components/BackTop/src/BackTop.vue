<script setup lang="ts">
import { useEventListener, useThrottleFn } from '@vueuse/core';

const visibilityHeight = 300;
const cubic = (value: number): number => {
  return value ** 3;
};
const visible = ref(false);
const easeInOutCubic = (value: number): number =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;

const el = document.documentElement;

const scrollToTop = () => {
  const beginTime = Date.now();
  const beginValue = el.scrollTop;
  const frameFunc = () => {
    if (!el) return;
    const progress = (Date.now() - beginTime) / 500;
    if (progress < 1) {
      el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
      requestAnimationFrame(frameFunc);
    }
    else {
      el.scrollTop = 0;
    }
  };
  requestAnimationFrame(frameFunc);
};
const handleScroll = () => {
  visible.value = el.scrollTop >= visibilityHeight;
};
const handleScrollThrottled = useThrottleFn(handleScroll, 300);
useEventListener(document, 'scroll', handleScrollThrottled);
</script>

<template>
  <Transition name="bounce">
    <button v-if="visible" @click="scrollToTop">
      <Icon name="back-top" size="18" />
    </button>
  </Transition>
</template>

<style scoped lang="scss">
  button {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    position: fixed;
    right: 100px;
    bottom: 100px;
    color: #fff;
    background-color: var(--color-primary);
    border: 0;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

  .bounce-enter-active {
    animation: zoomIn 0.1s;
  }

  .bounce-leave-active {
    animation: zoomIn 0.1s reverse;
  }
</style>
