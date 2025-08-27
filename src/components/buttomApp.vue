<template>
  <div class="footer">
    <p>备案号：蜀ICP备2024111078号-1</p>
    <p>版权所有 &copy; 2023 quhongbin</p>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  background-color: rgba(222, 222, 222, 0.8);
  position: fixed;
  bottom: 0;
  width: 100%;
}
.footer p {
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #333;
}
</style>
