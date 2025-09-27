///////////////////////////////////////
// Autor:Qu Hongbin
// CreatedDate:2025-08-29
// File: bodyApp.vue
///////////////////////////////////////
<script lang="ts" setup>
import { onBeforeMount, onMounted, ref,watch} from "vue";
import popupApp from "./popupApp.vue";
import EventBus from "./eventBus";
import useDocuments from "@/hooks/useDocuments.ts";
import useTags from "@/hooks/useTags";
import bodyAppLeft from "./bodyAppLeft.vue";
import BodyAppRight from "./BodyAppRight.vue";
import { useBodyAppStore } from "@/store/bodyApp";

const { handleFileUploaded,getFromServer,openDocument,delDocument } = useDocuments();
const {allTags,selectedTag,selectTag,clearFilter,currentPage,currentPageData,totalPages,filteredDocuments,nextPage,prevPage,goToPage} = useTags();

const bodyAppStore = useBodyAppStore()
const tempText = bodyAppStore.tempText

// 响应式状态
const isVisibleClass = ref<boolean>(false);
// console.log(tempText);

onBeforeMount(()=>{
  getFromServer();
})
onMounted(() => {
  EventBus.on("switch-class", toggleClass);
});

function toggleClass(): void {
  isVisibleClass.value = !isVisibleClass.value;
}


</script>

<template>
  <div class="bg-main">
    <!-- 左侧组件 -->
    <bodyAppLeft
      :tempText="tempText"
      :allTags="allTags"
      :selectedTag="selectedTag"
      @select-tag="selectTag"
      @clear-filter="clearFilter"
    />

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
          <div class="document-item-proportion-content">
            <span>{{ item.proportional_content }}</span>

          </div>

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
          <span class="page-info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页极</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
      </div>

      </div>
    <BodyAppRight></BodyAppRight>

    <div :class="[isVisibleClass ? 'floatMenu' : 'floatMenuDisvisible']">
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


.floatMenuDisvisible {
  display: none;
}

.popupMenuDisvisible {
  display: none;
}

@media screen and (max-width: 481px) {
  .bg-center {
    display: inline-block;
    width: 100%;
    height: 200px;
    margin: 10px 0px 0 0px;
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
    margin: 0极px 0px 0px 50%;
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
