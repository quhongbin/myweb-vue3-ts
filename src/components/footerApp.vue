<script lang="ts" setup>
import { ref,reactive,onMounted } from 'vue';
import APlayer from "aplayer";
import 'aplayer/dist/APlayer.min.css';
import { type Audio } from '@/types'

const audio = reactive<Audio[]>([
  {
    name: '第三人称',
    artist: 'WF_Li第三人称ang',
    url: 'http://music.163.com/song/media/outer/url?id=1957883626.mp3',
    cover: 'http://p2.music.126.net/7o8ZVb5OlN32S6WdEztiJw==/109951167390493466.jpg?param=130y130',
  },
  {
    name: '迷途羔羊',
    artist: '曾小朴',
    url: 'http://music.163.com/song/media/outer/url?id=1485090394.mp3',
    cover: 'http://p2.music.126.net/NpOyonteBHlH97tCZHlXpA==/109951165371157421.jpg?param=130y130',
  },
  {
    name: '理想三旬',
    artist: '陈鸿宇',
    url: 'http://music.163.com/song/media/outer/url?id=31445772.mp3',
    cover: 'http://p2.music.126.net/NpOyonteBHlH97tCZHlXpA==/109951165371157421.jpg?param=130y130',
  },
]);

function initAplayer():void {
  new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300',
    audio: audio,
  });
}

const today = new Date();
const showYear = ref('');
onMounted(() => {
  initAplayer();
  showYear.value = today.getFullYear().toString();
});
</script>

<template>
  <div class="footer">
    <p>备案号:蜀ICP备2024111078号-1</p>
    <p>版权所有 &copy; 2023-{{showYear}} quhongbin</p>
    <div id="aplayer"></div>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  padding: 20px;
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

@media screen and (max-width: 481px) {
  .footer {
    display: none;
  }
}
</style>
