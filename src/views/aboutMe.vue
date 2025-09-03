<template>
  <div class="about-container">
    <div class="profile-section">
      <div class="profile-image-container">
        <img src="/images/qqheadImage.jpg" alt="个人头像" class="profile-image animated" />
      </div>
      <h1 class="profile-name animated">张三</h1>
      <p class="profile-title animated">前端开发工程师</p>
      <div class="social-links animated">
        <a href="https://github.com/quhongbin" target="_blank" class="social-link">
          <i class="fa-brands fa-github"></i>
        </a>
        <a href="https://space.bilibili.com/521816677" target="_blank" class="social-link">
          <i class="fa-brands fa-bilibili"></i>
        </a>
        <a href="mailto:2818777520@qq.com" class="social-link">
          <i class="fa-solid fa-envelope"></i>
        </a>
      </div>
    </div>

    <div class="life-section">
      <h2 class="section-title animated">生活点滴</h2>
      <div class="life-gallery">
        <div class="gallery-item animated" v-for="(item, index) in lifeImages" :key="index">
          <img :src="item.src" :alt="item.caption" class="gallery-image" />
          <div class="gallery-caption">{{ item.caption }}</div>
        </div>
      </div>
    </div>

    <div class="moments-section">
      <h2 class="section-title animated">精彩瞬间</h2>
      <div class="moments-timeline">
        <div class="moment-item animated" v-for="(moment, index) in moments" :key="index">
          <div class="moment-date">{{ moment.date }}</div>
          <div class="moment-content">{{ moment.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// 生活图片数据
const lifeImages = ref([
  { src: '/images/life1.jpg', caption: '春游踏青' },
  { src: '/images/life2.jpg', caption: '海边度假' },
  { src: '/images/life3.jpg', caption: '登山远足' },
  { src: '/images/life4.jpg', caption: '朋友聚会' }
])

// 精彩瞬间数据
const moments = ref([
  { date: '2023-05-20', content: '成功完成第一个Vue3项目，收获满满！' },
  { date: '2023-08-15', content: '参加技术大会，与行业专家交流学习。' },
  { date: '2023-12-25', content: '圣诞节与家人共度美好时光。' },
  { date: '2024-03-10', content: '开始学习TypeScript，提升开发技能。' }
])

// 动画效果
onMounted(() => {
  const animatedElements = document.querySelectorAll('.animated')
  animatedElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('fadeIn')
    }, index * 200)
  })
})
</script>

<style scoped>
@import url('../assets/css/animate.css');

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 个人信息部分 */
.profile-section {
  text-align: center;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.profile-image-container {
  margin-bottom: 20px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.profile-name {
  font-size: 2.5rem;
  margin: 15px 0;
  color: #333;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.profile-title {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 25px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.social-link {
  font-size: 1.8rem;
  color: #333;
  transition: all 0.3s ease;
}

.social-link:hover {
  color: #409eff;
  transform: translateY(-5px);
}

/* 生活点滴部分 */
.life-section {
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.life-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.gallery-item {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.gallery-caption {
  padding: 10px;
  text-align: center;
  background: #f5f5f5;
  font-weight: 500;
}

/* 精彩瞬间部分 */
.moments-section {
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.moments-timeline {
  max-width: 800px;
  margin: 0 auto;
}

.moment-item {
  position: relative;
  padding: 20px 20px 20px 60px;
  margin-bottom: 30px;
  border-left: 3px solid #409eff;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.5s ease;
}

.moment-item:last-child {
  margin-bottom: 0;
}

.moment-item::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 25px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #409eff;
}

.moment-date {
  font-weight: bold;
  color: #409eff;
  margin-bottom: 10px;
}

.moment-content {
  color: #666;
  line-height: 1.6;
}

/* 动画类 */
.fadeIn {
  opacity: 1;
  transform: translateY(0) translateX(0);
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .profile-name {
    font-size: 2rem;
  }

  .life-gallery {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .section-title {
    font-size: 1.8rem;
  }
}

@media screen and (max-width: 480px) {
  .profile-image {
    width: 120px;
    height: 120px;
  }

  .profile-name {
    font-size: 1.8rem;
  }

  .life-gallery {
    grid-template-columns: 1fr;
  }
}
</style>
