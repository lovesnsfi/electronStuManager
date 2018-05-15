<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vue-electron'
  }
</script>

<style>
  /* CSS */
  *{
    /* 禁止用户选择 */
    -webkit-user-select: none;
  }
</style>
