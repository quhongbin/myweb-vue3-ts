///////////////////////////////////////
// Autor:Qu Hongbin
// CreatedDate:2025-08-29
// File: bodyAppLeft.vue
///////////////////////////////////////
<script lang="ts" setup>
import {  defineEmits } from 'vue'
import { type TempText } from '@/types'

// 定义Props
const props = defineProps<{
  tempText: TempText
  allTags: string[]
  selectedTag: string | null
}>()

// 定义Emits
const emit = defineEmits<{
  'select-tag': [tag: string]
  'clear-filter': []
}>()

// 标签选择功能
function selectTag(tag: string): void {
  emit('select-tag', tag)
}

// 清除标签筛选
function clearFilter(): void {
  emit('clear-filter')
}
</script>

<template>
  <div class="bg-left">
    <div class="bg-left-content">
      <div>
        <img src="/images/qqheadImage.jpg" width="50px" height="50px" />
      </div>
      <div>
        <span>姓名:</span>
        <span>{{ tempText.name }}</span>
      </div>
      <div>
        <span>简介：</span>
        <span>{{ tempText.jianjie }}</span>
      </div>
    </div>

    <!-- 标签页区域 -->
    <div class="tags-section">
      <h3>标签分类</h3>
      <div class="tags-container">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="selectTag(tag)"
          :class="['tag-button', { active: selectedTag === tag }]"
        >
          {{ tag }}
        </button>
      </div>
      <button
        v-if="selectedTag"
        @click="clearFilter"
        class="clear-filter-btn"
      >
        清除筛选
      </button>
    </div>
  </div>
</template>

<style scoped>
.bg-left {
  display: inline-block;
  width: 20%;
  margin: 30px 0px 0 20px;
}

.bg-left-content {
  background-color: rgb(230, 230, 230);
  display: inline-flex;
  border: 2px solid rgb(115, 115, 115);
  border-radius: 20px;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.bg极-left-content > div {
  margin: 10px 0px 10px 0px;
}

.bg-left-content img {
  border-radius: 20%;
}

.bg-left-content > div:nth-child(3) {
  height: 200px;
  width: 90%;
  word-wrap: break-word;
}

/* 标签页样式 */
.tags-section {
  width: 90%;
  text-align: center;
}

.tags-section h3 {
  margin-bottom: 10px;
  color: #f5f5f5;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;
}

.tag-button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
}

.tag-button:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.tag-button.active {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}

.clear-filter-btn {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: #ff4d4f;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.clear-filter-btn:hover {
  background-color: #d9363e;
}

@media screen and (max-width: 481px) {
  .bg-left {
    display: none;
  }
}
</style>
