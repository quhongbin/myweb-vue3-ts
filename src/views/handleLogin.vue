<script setup lang="ts">
import { ref } from 'vue'

// 使用响应式状态
const showModal = ref(false)
const username = ref('')
const password = ref('')

// 显示登录弹窗
const showLoginModal = () => {
  showModal.value = true
}

// 关闭登录弹窗
const closeLoginModal = () => {
  showModal.value = false
}

// 处理登录表单提交
const handleLogin = (event: Event) => {
  event.preventDefault()

  // 这里只是简单示例，实际应发送请求到后端验证
  if (username.value === 'admin' && password.value === '123456') {
    alert('登录成功！')
    showModal.value = false
  } else {
    alert('用户名或密码错误！')
  }
}
</script>

<template>
  <div class="login-container">
    <button @click="showLoginModal" class="login-btn">点击登录</button>
    <!-- 登录弹窗 -->
    <div v-if="showModal" class="modal" @click.self="closeLoginModal">
      <div class="modal-content">
        <span class="close" @click="closeLoginModal">&times;</span>
        <h2>用户登录</h2>
        <form @submit="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">用户名:</label>
            <input
              v-model="username"
              type="text"
              id="username"
              required
              placeholder="请输入用户名"
            >
          </div>
          <div class="form-group">
            <label for="password">密码:</label>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              placeholder="请输入密码"
            >
          </div>
          <button type="submit" class="submit-btn">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  padding: 20px;
}

.login-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-btn:hover {
  background-color: #0056b3;
}

/* 弹窗样式 */
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  position: relative;
}

.close {
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
}

.login-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #218838;
}
</style>
