<script setup lang="ts">
const open = ref(false);
const openDialog = ref(false);
</script>

<template>
  <div>
    <button @click="open = !open">
      open
    </button>
    <button @click="openDialog = !openDialog">
      openDialog
    </button>
    <h1>Welcome to Home</h1>
    <details :open="open">
      <summary>项目1</summary>
      <details :open="open">
        <summary>文件夹0</summary>
      </details>
      <details :open="open">
        <summary>文件夹1-1</summary>
        <details :open="open">
          <summary>文件夹1-1-2</summary>
        </details>
        <details :open="open">
          <summary>文件夹1-1-3</summary>
        </details>
      </details>
    </details>

    <dialog :open="openDialog">
      <p>Greetings, one and all!</p>
      <form method="dialog">
        <button>OK</button>
      </form>
    </dialog>
  </div>
</template>

<style>
details {
  padding-left: 10px;
  margin-top: 10px;

}

summary {
  display: flex;
}

summary::before {
  content: '';
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-right: 8px;
  border: 1px solid #999;
  background: linear-gradient(#999, #999) 50%/1px 10px no-repeat, linear-gradient(#999, #999) 50%/10px 1px no-repeat;
}

details[open]>summary::before{
  background: linear-gradient(#999, #999) 50%/10px 1px no-repeat;
}

summary:only-child{
  margin-left: 15px;
}

summary:only-child::before{
  display: none;

}

details:last-child{
  background-size: 1px 23px;
}
</style>