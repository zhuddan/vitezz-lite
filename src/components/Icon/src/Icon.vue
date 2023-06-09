<script lang="ts" setup>
import type { CSSProperties, PropType } from 'vue';

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String as PropType<IconType>,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  // icon size
  size: {
    type: [String, Number] as PropType<string | number>,
  },
});

defineOptions({
  name: 'Icon',
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const getWrapStyle = computed((): CSSProperties => {
  const { size, color } = props;
  let fs = size;

  if (size !== undefined)
    fs = typeof size == 'string' ? size : `${size}px`;
  else
    fs = '1em';

  return {
    fontSize: `${fs}px`,
    color,
    display: 'inline-flex',
  };
});
</script>

<template>
  <svg
    :class="[$attrs.class]"
    aria-hidden="true" class="icon"
    :style="getWrapStyle"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentcolor;
}
</style>
