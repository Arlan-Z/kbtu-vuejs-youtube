<script setup lang="ts">
import VideoItem from '@/components/VideoItem.vue';
import YoutubeLogo from '@/assets/youtube.png';
import { useVideos } from '@/composables/useVideos';

const { searchQuery, loading, filteredVideos } = useVideos();
</script>

<template>
  <div id="dashboard">
    <header class="header">
      <div class="logo-section">
        <img
          :src="YoutubeLogo"
          alt="YouTube logo"
          class="logo"
        />
        <h1>Dashboard</h1>
      </div>

      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search"
          class="search-input"
        />
      </div>
    </header>

    <main class="content">
      <div v-if="loading" class="message">
        Loading videos...
      </div>

      <div v-else>
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

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 10px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo {
  height: 32px;
}

.logo-section h1 {
  font-size: 18px;
  font-weight: 500;
  color: #0f0f0f;
  margin: 0;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 40%;
  max-width: 600px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d3d3d3;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
}

.search-btn {
  background-color: #f8f8f8;
  border: 1px solid #d3d3d3;
  border-left: none;
  border-radius: 0 20px 20px 0;
  padding: 7px 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-btn:hover {
  background-color: #e6e6e6;
}

.profile-section {
  display: flex;
  align-items: center;
}

.profile-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.content {
  flex: 1;
  padding: 24px 36px;
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
