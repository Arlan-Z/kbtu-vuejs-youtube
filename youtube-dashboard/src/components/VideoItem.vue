<script setup lang="ts">
import ProfileIcon from '@/assets/profile.png';
import LikeFilled from '@/assets/like-filled.png';
import LikeEmpty from '@/assets/like-empty.png';
import { ref } from 'vue';

defineProps<{
  title: string;
  channel: string;
  views: number;
  thumbnail: string;
}>();

const emit = defineEmits<{
  (e: 'liked', value: boolean): void;
}>();

const liked = ref(false);

function formatViews(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

function toggleLike(): void {
  liked.value = !liked.value;
  emit('liked', liked.value);
}
</script>

<template>
  <div class="video-card">
    <div class="thumbnail-container">
      <img :src="thumbnail" alt="Video thumbnail" class="thumbnail" />
    </div>

    <div class="video-info">
      <img :src="ProfileIcon" alt="Channel avatar" class="channel-avatar" />
      <div class="video-text">
        <h3 class="video-title">{{ title }}</h3>
        <p class="channel-name">{{ channel }}</p>
        <span class="views">{{ formatViews(views) }} views</span>
      </div>
    </div>

    <button class="like-btn" :class="{ active: liked }" @click.stop="toggleLike">
      <img
        :src="liked ? LikeFilled : LikeEmpty"
        alt="Like icon"
        class="like-icon"
      />
    </button>
  </div>
</template>

<style scoped>
.video-card {
  display: flex;
  flex-direction: column;
  width: 340px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  font-family: 'Roboto', Arial, sans-serif;
  position: relative;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.thumbnail-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.video-card:hover .thumbnail {
  transform: scale(1.05);
}

.video-info {
  display: flex;
  margin-top: 12px;
  padding: 0 6px 0 0;
  gap: 12px;
}

.channel-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 2px;
}

.video-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.video-title {
  font-size: 15px;
  font-weight: 500;
  color: #0f0f0f;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0; 
}

.video-title:hover {
  color: #030303;
}

.channel-name {
  font-size: 14px;
  color: #606060;
  transition: color 0.2s;
  margin: 0; 
}

.channel-name:hover {
  color: #000;
}

.views {
  font-size: 13px;
  color: #606060;
  margin: 0 0 10px 0; 
}

.like-btn {
  position: absolute;
  right: 8px;
  top: 8px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s ease, transform 0.2s ease;
  cursor: pointer;
}

.like-btn:hover {
  background: #ffefef;
  transform: scale(1.05);
}

.like-btn.active {
  background: #ffe5e5;
  border-color: #ff0000;
}

.like-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.like-btn.active .like-icon {
  transform: scale(1.1);
}
</style>
