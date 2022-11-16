<template>
  <h1>User</h1>
  <router-view></router-view>
  <button @click="logoutHandle">退出</button>
</template>
<script lang="ts" setup>
const logoutHandle = () => {
  window.location.href = '/';
};
</script>
