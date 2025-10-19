<script setup lang="ts">
import YoutubeLogo from '@/assets/youtube.png';
const searchQuery = defineModel<string>('searchQuery'); 
</script>

<template>
  <header class="header">
    <div class="logo-section">
      <img :src="YoutubeLogo" alt="YouTube logo" class="logo" />
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
</template>

<style scoped>
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
  font-size: 22px;
  font-weight: 900;
  color: #0f0f0f;
  margin: 0;
  letter-spacing: 0.2px;
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
</style>
