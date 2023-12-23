<script setup lang="ts">
import { useDicts } from '@/hooks/useDicts';

const value = ref('DEFAULT');
const b = ref('');

const { formatDictSync, formatDictComputed } = useDicts(
  ['sys_job_group'],
  {},
  () => {
    b.value = formatDictSync('sys_job_group', 'DEFAULT');
  });
const a = formatDictComputed('sys_job_group', value);

function toggle() {
  value.value = value.value == 'DEFAULT' ? 'SYSTEM' : 'DEFAULT';
}

setInterval(() => {
  toggle();
}, 500);
</script>

<template>
  <div>
    <p>
      value: {{ value }}
    </p>
    <p>
      formatDictComputed: {{ a }}
    </p>
    <b>
      formatDictSync: {{ b }}
    </b>
  </div>
</template>

<style scoped>

</style>