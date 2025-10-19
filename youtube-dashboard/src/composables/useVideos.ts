import { ref, computed, onMounted } from 'vue';
import type Video from '@/models/video';
import videoService from '@/services/videoService';

export function useVideos() {
  const videos = ref<Video[]>([]);
  const searchQuery = ref('');
  const loading = ref(true); 

  onMounted(async () => {
    videos.value = await videoService.getVideos();
    loading.value = false;
  });

  const filteredVideos = computed(() => {
    if (!searchQuery.value) {
      return videos.value;
    }
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return videos.value.filter(video =>
      video.title.toLowerCase().includes(lowerCaseQuery) ||
      video.channel.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return {
    searchQuery,
    loading,
    filteredVideos,
  };
}