<script lang="ts" setup>
import { onMounted, ref } from "vue";
// import markdownIt from "markdown-it";
import popupApp from "./popupApp.vue";
import headApp from "./headApp.vue";
import axios from "axios";
import EventBus from "./eventBus";
// import EventBus from "./eventBus";

interface TempText {
  name: string;
  age: number;
  jianjie: string;
}

interface Document {
  id: number;
  title: string;
  file_path: string;
  html_path: string;
  tags: string[];
  file_size: number;
}

// 响应式状态
const isVisibleClass = ref<boolean>(false);
const tempText = ref<TempText>({
  name: "瞿红斌",
  age: 18,
  jianjie: "这是一个简介",
});
const documents = ref<Document[]>([]);
console.log(documents.value?.length);
// const markdowncontent = ref<string>("test");

async function handleFileUploaded(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  const formData = new FormData();
  formData.append("file", target.files[0]);
  formData.append("title", target.files[0].name);
  await axios
    .post("http://localhost:3000/api/documents", formData, {
      headers: {},
    })
    .then((response) => {
      console.log(response.data);
      documents.value.push(response.data);
    })

    .catch((error) => console.log("Error:" + error));
}

function getFromServer(): void {
  axios
    .get("http://localhost:3000/api/documents", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Documents has received");
      // 处理后端传递的数据,将数据转换为存入documentsu数组中,类型为Document
      for (let i = 0; i < response.data.length; i++) {
        documents.value.push(response.data[i]);
      }
      console.log(documents.value);
    })
    .catch((error) => console.log("From bodyApp.vue getToServer function Error:" + error));
}

function openDocument(path: string): void {
  window.open(path, "_blank");
}
function delDocument(id: number): void {
  const comfiromDel: boolean = window.confirm("确认删除?");
  if (comfiromDel) {
    axios.delete(`http://localhost:3000/api/documents/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          documents.value = documents.value.filter((item) => item.id !== id);
          // window.location.reload()
        }
      })
      .catch((error) => console.log("From bodyApp.vue delDocument function Error:" + error));
  }
}
onMounted(() => {
  EventBus.on("switch-class", toggleClass);
  getFromServer();
});
function toggleClass(): void {
  isVisibleClass.value = !isVisibleClass.value;
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
    </div>

    <div class="bg-center">
      <div class="bg-center-content">
        <div
          v-for="item in documents.values()"
          :key="item.id"
          @click="openDocument(item.html_path)"
        >
          <div :href="item.html_path">{{ item.title }}</div>
          <button class="delDocument" @click="delDocument(item.id)">删除</button>
        </div>
        <div>
          <input type="file" @change="handleFileUploaded" accept=".md" />
        </div>
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
  /* overflow:hidden; */
  text-overflow: clip;
  transition-duration: 1s;
}
.bg-center-content > div:hover {
  transform: scale(1.05);
  transition: transform 0.5s;
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
