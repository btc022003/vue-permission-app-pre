<script setup lang="ts">
import { provide, ref } from 'vue';
import { loopRoutes, routes } from './router';

// const routes = loopRoutes();
const showRoutes = ref(routes);

// 使用provide做跨组件传参数
provide('showRoutes', showRoutes);
</script>

<template>
  <router-link
    v-for="item in showRoutes"
    :key="item.name"
    :to="{ name: item.name }"
    >【{{ item.meta.label }}】</router-link
  >
  <hr />
  <router-view></router-view>
</template>

<style scoped></style>
