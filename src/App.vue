<template>
      <div id="app">
        <headApp />
        <router-view />
        <bodyApp v-if="$route.path !== '/me'" />
        <footerApp v-if="$route.path !== '/me'" />
      </div>
</template>
<script lang="ts" setup>
import headApp from './components/headApp.vue';
import bodyApp from './components/bodyApp.vue';
import footerApp from './components/footerApp.vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
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
