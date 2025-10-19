<script setup lang="ts">
import Header from '@/components/Header.vue';
import VideoItem from '@/components/VideoItem.vue';
import { useVideos } from '@/composables/useVideos';
import Loading from './partials/Loading.vue';
import { ref, computed } from 'vue';

const { searchQuery, loading, filteredVideos } = useVideos();
const totalLikes = ref(0);
const sortOrder = ref<'asc' | 'desc' | null>(null); 

function handleLike(isLiked: boolean) {
  totalLikes.value += isLiked ? 1 : -1; 
}

function toggleSort() {
  if (sortOrder.value === null) sortOrder.value = 'desc';
  else if (sortOrder.value === 'desc') sortOrder.value = 'asc';
  else sortOrder.value = null;
}

const sortedVideos = computed(() => {
  if (sortOrder.value === null) return filteredVideos.value;
  return [...filteredVideos.value].sort((a, b) => 
    sortOrder.value === 'desc' ? b.views - a.views : a.views - b.views
  );
});
</script>

<template>
  <div id="dashboard">
    <Header v-model:searchQuery="searchQuery" />

    <main class="content">
      <Loading v-if="loading" />

      <div v-else>
        <div class="top-bar">
          <div class="stats-bar">
            <span class="likes-label">❤️ Total Likes:</span>
            <span class="likes-count">{{ totalLikes }}</span>
          </div>

          <button class="sort-btn" @click="toggleSort">
            <template v-if="sortOrder === null">
              🔄 No Sorting
            </template>
            <template v-else-if="sortOrder === 'desc'">
              ⬇️ Sort: High → Low
            </template>
            <template v-else>
              ⬆️ Sort: Low → High
            </template>
          </button>
        </div>

        <div v-if="sortedVideos.length === 0" class="message">
          No videos found.
        </div>

        <div v-else class="video-grid">
          <VideoItem
            v-for="video in sortedVideos"
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
#dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.content {
  flex: 1;
  padding: 24px 36px;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.stats-bar {
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 16px;
  background-color: var(--header-bg);
  box-shadow: 0 2px 6px var(--shadow-color);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.likes-label {
  font-weight: 500;
  color: var(--text-color);
  margin-right: 6px;
}

.likes-count {
  font-weight: bold;
  color: #e60023;
}

.sort-btn {
  background: var(--header-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 5px var(--shadow-color);
}

.sort-btn:hover {
  background: var(--input-bg);
  transform: translateY(-2px);
}

.sort-btn:active {
  transform: scale(0.97);
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
  color: var(--text-color);
  opacity: 0.7;
  margin-top: 50px;
  transition: color 0.3s;
}
</style>
