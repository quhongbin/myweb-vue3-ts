///////////////////////////////////////
// Autor:Qu Hongbin
// CreatedDate:2025-08-29
// File: bodyApp.vue
///////////////////////////////////////
<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { type TempText } from '@/types'
import popupApp from "./popupApp.vue";
import headApp from "./headApp.vue";
import EventBus from "./eventBus";
import useDocuments from "@/hooks/useDocuments.ts";

const { documents,handleFileUploaded,getFromServer,openDocument,delDocument } = useDocuments();
// 响应式状态
const isVisibleClass = ref<boolean>(false);
const tempText = ref<TempText>({
  name: "瞿红斌",
  age: 18,
  jianjie: "这是一个简介",
});

// 分页相关状态
const currentPage = ref(1);
const itemsPerPage = ref(3);
const selectedTag = ref<string | null>(null);

// 计算所有标签
const allTags = computed(() => {
  if (!documents.value) return [];
  const tagsSet = new Set<string>();
  documents.value.forEach(doc => {
    if (doc.tags && Array.isArray(doc.tags)) {
      doc.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet);
});

// 过滤后的文档数据
const filteredDocuments = computed(() => {
  if (!documents.value) return [];
  if (!selectedTag.value) return documents.value;
  return documents.value.filter(doc =>
    doc.tags && Array.isArray(doc.tags) && doc.tags.includes(selectedTag.value!)
  );
});

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredDocuments.value.length / itemsPerPage.value);
});

// 获取当前页的数据
const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredDocuments.value.slice(startIndex, endIndex);
});

console.log(documents.value?.length);

onMounted(() => {
  EventBus.on("switch-class", toggleClass);
  getFromServer();
});

function toggleClass(): void {
  isVisibleClass.value = !isVisibleClass.value;
}

// 分页功能
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

// 标签选择功能
function selectTag(tag: string) {
  selectedTag.value = tag;
  currentPage.value = 1; // 重置到第一页
}

// 清除标签筛选
function clearFilter() {
  selectedTag.value = null;
  currentPage.value = 1;
}
</script>

<template>
  <div class="bg-main">
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

    <div class="bg-center">
      <div class="bg-center-content">
        <!-- 显示当前筛选状态 -->
        <div v-if="selectedTag" class="filter-info">
          当前筛选: <strong>{{ selectedTag }}</strong> (共 {{ filteredDocuments.length }} 篇文章)
        </div>

        <!-- 显示当前页的数据 -->
        <div
          v-for="item in currentPageData"
          :key="item.id"
          @click="openDocument(item.html_path)"
          class="document-item"
        >
          <div :href="item.html_path">{{ item.title }}</div>
          <div class="document-tags">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="tag-badge"
            >
              {{ tag }}
            </span>
          </div>
          <button class="delDocument" @click="delDocument(item.id)">删除</button>
        </div>



      </div>
        <input type="file" @change="handleFileUploaded" accept=".md" />
        <!-- 分页控件 -->
      <div class ="pagination" v-if="totalPages ">
          <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <span class="page-info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
      </div>

      </div>

    <div class="bg-right">
      <div class="bg-right-content">
        <div>test</div>
      </div>
    </div>

    <div :class="[isVisibleClass ? 'floatMenu' : 'floatMenuDisvisible']">
      <headApp style="display: none" />
      <popupApp :class="[isVisibleClass ? 'popupMenu' : 'popupMenuDisvisible']"></popupApp>
    </div>
  </div>
</template>

<style scoped>
@import url(../assets/css/animate.css);

.delDocument {
  position: relative;
  float: right;
  top: 140px;
}

.bg-center-content::-webkit-scrollbar {
  width: 2px;
  height: 10px;
  background-color: #f5f5f5;
  display: none;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #888, #fff);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
}

.bg-main {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-image: ("../assets/images/heart-shape-rock-3840x2160-19910.jpg");
}

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

.bg-left-content > div {
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
  color: #333;
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

/* 筛选信息样式 */
.filter-info {
  margin: 10px 0;
  padding: 10px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  text-align: center;
}

/* 文档项样式 */
.document-item {
  height: 200px;
  background-color: beige;
  margin: 5px 0px 10px 10px;
  padding: 0px 10px 0px 10px;
  border-radius: 20px;
  text-overflow: clip;
  transition-duration: 1s;
  position: relative;
}

.document-item:hover {
  transform: scale(1.05);
  transition: transform 0.5s;
}

.document-tags {
  position: absolute;
  bottom: 40px;
  left: 10px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.tag-badge {
  padding: 2px 6px;
  background-color: #409eff;
  color: white;
  border-radius: 10px;
  font-size: 10px;
}

















.bg-center {
  display: inline-block;
  width: 65%;
  height: 200px;
  margin: 30px 0px 0 0px;
}

.bg-center-content > div {
  height: 200px;
  background-color: beige;
  margin: 5px 0px 10px 10px;
  padding: 0px 10px 0px 10px;
  border-radius: 20px;
  text-overflow: clip;
  transition-duration: 1s;
}

.bg-center-content > div:hover {
  transform: scale(1.05);
  transition: transform 0.5s;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}

.pagination button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-info {
  font-size: 14px;
  color: #666;
}

.bg-right {
  display: inline-block;
  width: 15%;
  margin: 30px 20px 0 0px;
}

.floatMenuDisvisible {
  display: none;
}

.popupMenuDisvisible {
  display: none;
}

@media screen and (max-width: 481px) {
  .bg-left {
    display: none;
  }

  .bg-center {
    display: inline-block;
    width: 100%;
    height: 200px;
    margin: 10px 0px 0 0px;
  }

  .bg-right {
    display: none;
  }

  .bg-center-content > div {
    height: 200px;
    background-color: beige;
    margin: 5px 10px 10px 10px;
    padding: 0px 10px 0px 10px;
    border-radius: 20px;
    overflow: scroll;
    text-overflow: clip;
  }

  .bg-center-content > div:hover {
    transform: none;
    transition: transform 0.5s;
  }

  .pagination {
    flex-direction: column;
    gap: 5px;
  }

  .floatMenuDisvisible {
    position: fixed;
    display: inline-block;
    margin: 0px 0px 0px 50%;
    width: 80%;
    height: 100%;
    animation: LeftToRight 1s;
  }

  .popupMenuDisvisible {
    position: fixed;
    display: inline-block;
    margin: 0px 0px 0px 50%;
    width: 80%;
    height: 100%;
    animation: LeftToRight 1s;
  }

  .floatMenu {
    position: fixed;
    display: inline-block;
    margin: 0px 0px 0px 50%;
    width: 80%;
    height: 100%;
    animation: RightToLeft 0.5s;
  }

  .popupMenu {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    animation: RightToLeft 1s;
  }
}
</style>
