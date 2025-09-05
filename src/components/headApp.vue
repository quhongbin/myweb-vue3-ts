<template>
  <div class="nav_container">
    <div class="nav_logo">
          <img src="/images/qqheadImage.jpg" alt="logo" width="50px" height="50px" @click="goToAboutMe()"/>
    </div>
    <div class="nav_font" v-for="icon in icons" :key="icon.name">
      <div>
        <i :class="icon.icon"></i>
        <a :href="icon.url" target="_blank">{{ icon.name }}</a>
      </div>
    </div>
      <!-- <input type="file" class="file-input" @change="handleFileUploaded" accept=".md" /> -->
    <div class="nav_menu">
      <div class="navSelections">
        <i
          @click="toggleClass"
          :class="[isVisibleClass ? 'fa-solid fa-bars-staggered' : 'fa-solid fa-bars']"
        ></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import EventBus from './eventBus';
import { type Icon} from '@/types'
import { useRouter } from 'vue-router'
import useDocuments from '@/hooks/useDocuments.ts'
// const { handleFileUploaded } = useDocuments()
const router = useRouter()

const isVisibleClass = ref<boolean>(false);
const icons: Icon[] = [
  {
    name: 'Github',
    icon: 'fa-brands fa-github',
    url: 'https://github.com/quhongbin/myweb-vue3-ts',
  },
  {
    name: 'Bilibili',
    icon: 'fa-brands fa-bilibili',
    url: 'https://space.bilibili.com/521816677',
  },
  {
    name: 'Email',
    icon: 'fa-solid fa-envelope',
    url: 'mailto:2818777520@qq.com',
  },
];

function toggleClass() {
  isVisibleClass.value = !isVisibleClass.value;
  EventBus.emit('switch-class');
}
function goToAboutMe() {
  router.push('/me')
}
</script>

<style scoped>
@import url(../assets/css/animate.css);
/* .file-input {

      width: 70px;
      overflow: hidden;
    } */
 /* 可选：自定义按钮样式（若需要更美观的按钮） */
/* .file-input::-webkit-file-upload-button {
  border-radius: 5px;
  cursor: pointer;
} */
.nav_container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(245, 245, 245, 0.7);
}
.nav_logo > img:nth-child(1) {
  border-radius: 20%;
  border: 3px solid gray;
}
.nav_logo {
  display: inline;
  transition-duration: 1s;
}
.nav_logo:hover {
  transform: scale(1.3);
  transition: transform 0.5s;
}
.nav_font {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.nav_font > div:nth-child(1) > a {
  color: black;
  text-decoration: none;
}
.nav_menu {
  display: inline-block;
  width: 50px;
}
.nav_font div {
  margin: 0px 5px 0px 5px;
  font-size: 16px;
  transition-property: font-size transform;
  transition-duration: 1s;
}
.nav_font div:hover {
  margin: 0px 10px 0px 10px;
  font-size: 36px;
  transform: translate(0px, -10px);
  transition: transform 0.5s;
  text-decoration-line: underline;
  cursor: pointer;
}
i {
  font-size: 20px;
  margin: 0px 5px 0px 5px;
}
.fa-solid.fa-bars {
  display: none;
}
.navSelections {
  display: none;
}

@media screen and (max-width: 481px) {
  .nav_font {
    display: none;
  }
  .nav_logo {
    display: inline;
  }
  .nav_logo:hover {
    transform: none;
    transition: transform 0.5s;
  }
  .navSelections {
    display: inline;
  }
  .fa-solid.fa-bars {
    font-size: 50px;
    display: inline;
  }
  .fa-solid.fa-bars-staggered {
    display: inline;
    font-size: 50px;
  }
}
</style>
