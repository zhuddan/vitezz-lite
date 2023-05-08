<script lang="ts" setup>
const { params, query } = useRoute();
const { path } = params;
const router = useRouter();
router.replace({ path: `/${path}`, query });
</script>

<template>
  <div></div>
</template>
