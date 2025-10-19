import type Video from "@/models/video";

const mockVideoData: Video[] = [
    { id: 1, title: 'Cool Video', channel: 'Cool Channel', views: 150000, thumbnail: 'https://placehold.co/600x400?text=Cool+Video' },
    { id: 2, title: 'Ragebaiting BRO in IRL', channel: 'Some Guy', views: 850000, thumbnail: 'https://placehold.co/600x400?text=Ragebaiting+BRO' },
    { id: 3, title: 'Watch this video to stay ALIVE', channel: 'Clickbait Channel', views: 320000, thumbnail: 'https://placehold.co/600x400?text=WATCH+THIS' },
    { id: 4, title: 'Real news here', channel: 'Wolf News', views: 1200000, thumbnail: 'https://placehold.co/600x400?text=NEWS' },
    { id: 5, title: 'Im sad :(', channel: 'Sad boy', views: 95000, thumbnail: 'https://placehold.co/600x400?text=:(' },
]

const videoService = {
    getVideos: async function() : Promise<Video[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockVideoData);
            }, 500);
        });
    },

    getVideoById: async function(videoId: number) : Promise<Video | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockVideoData.find((video) => video.id === videoId))
            }, 550)
        } )
    }
};

export default videoService;