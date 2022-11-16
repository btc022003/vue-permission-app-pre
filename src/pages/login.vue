<template>
  <h1>登录</h1>
  <button @click="loginHandle('admin')">登录-admin</button>
  <button @click="loginHandle('user')">登录-user</button>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { loopRoutes } from '../router';

const router = useRouter();
const showRoutes = inject<any>('showRoutes');
const loginHandle = (role: string) => {
  showRoutes.value = loopRoutes(router, role);
};
</script>
