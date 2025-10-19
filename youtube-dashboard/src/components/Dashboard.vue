<script setup lang="ts">
import Header from '@/components/Header.vue';
import VideoItem from '@/components/VideoItem.vue';
import { useVideos } from '@/composables/useVideos';
import Loading from './partials/Loading.vue';
import { ref } from 'vue';

const { searchQuery, loading, filteredVideos } = useVideos();
const totalLikes = ref(0);

function handleLike(isLiked: boolean) {
  totalLikes.value += isLiked ? 1 : -1; 
}
</script>

<template>
  <div id="dashboard">
    <Header v-model:searchQuery="searchQuery" />

    <main class="content">
      <Loading v-if="loading" />

      <div v-else>
        <div class="stats-bar">
          <span class="likes-label">❤️ Total Likes:</span>
          <span class="likes-count">{{ totalLikes }}</span>
        </div>

        <div v-if="filteredVideos.length === 0" class="message">
          No videos found.
        </div>

        <div v-else class="video-grid">
          <VideoItem
            v-for="video in filteredVideos"
            :key="video.id"
            :title="video.title"
            :channel="video.channel"
            :views="video.views"
            :thumbnail="video.thumbnail"
            @liked="handleLike"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
body {
  font-family: 'Roboto', Arial, sans-serif;
  background-color: #f9f9f9;
  margin: 0;
  color: #0f0f0f;
}

#dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 24px 36px;
}

.stats-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 12px;
  padding: 10px 18px;
  margin-bottom: 18px;
  font-size: 16px;
}

.likes-label {
  font-weight: 500;
  color: #333;
  margin-right: 6px;
}

.likes-count {
  font-weight: bold;
  color: #e60023;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 8px;
  justify-items: center;
}

.message {
  text-align: center;
  font-size: 1.2em;
  color: #777;
  margin-top: 50px;
}
</style>
