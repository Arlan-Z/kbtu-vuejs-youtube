<script setup lang="ts">
import YoutubeLogo from '@/assets/youtube.png';
import { ref, watch, onMounted } from 'vue';

const searchQuery = defineModel<string>('searchQuery');
const isDark = ref(false);

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDark.value = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});

watch(isDark, (val) => {
  document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light');
});
</script>

<template>
  <header class="header">
    <div class="logo-section">
      <img :src="YoutubeLogo" alt="YouTube logo" class="logo" />
      <h1 class="app-title">Dashboard</h1>
    </div>

    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search videos..."
        class="search-input"
      />
      <button class="search-btn">
        🔍
      </button>
    </div>

    <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Light mode' : 'Dark mode'">
      <span class="icon-wrapper">
        <transition name="fade" mode="out-in">
          <span v-if="!isDark" key="moon" class="icon">🌙</span>
          <span v-else key="sun" class="icon">☀️</span>
        </transition>
      </span>
    </button>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--header-bg);
  padding: 12px 28px;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 8px var(--shadow-color);
  transition: background-color 0.3s, color 0.3s;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  height: 34px;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
}

.app-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: var(--text-color);
  margin: 0;
}

.search-wrapper {
  display: flex;
  align-items: center;
  width: 45%;
  max-width: 520px;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 4px 10px;
  transition: all 0.25s ease;
}

.search-wrapper:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 6px var(--primary-color);
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 8px 10px;
  font-size: 15px;
  color: var(--text-color);
}

.search-btn {
  background: var(--primary-color);
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.search-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 8px rgba(255, 0, 0, 0.25);
}

.theme-toggle {
  position: relative;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  color: var(--text-color);
  cursor: pointer;
  transition: transform 0.25s ease, color 0.25s;
}

.theme-toggle:hover {
  transform: rotate(15deg);
  color: var(--primary-color);
}

.icon-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 22px;
  line-height: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
