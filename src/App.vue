<template>
  <div id="app">
    <headApp />
    <router-view />
    <bodyApp v-if="!isSpecialRoute" />
    <footerApp v-if="!isSpecialRoute" />
  </div>
</template>

<script lang="ts" setup>
import headApp from './components/headApp.vue';
import bodyApp from './components/bodyApp.vue';
import footerApp from './components/footerApp.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const $route = useRoute();

// 计算属性，判断当前是否为特殊路由
const isSpecialRoute = computed(() => {
  return $route.path === '/me' || $route.path === '/login';
});
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
