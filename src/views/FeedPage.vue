<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
    <div class="w-full max-w-2xl bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        <span class="pi pi-linkedin mr-2" style="font-size:1.7rem;"></span>Feed
      </h2>

      <div class="flex justify-between mb-6">
        <button
          @click="navigateToCreatePost"
          class="bg-blue-600 text-white font-medium py-2 px-6 rounded focus:outline-none hover:bg-blue-700"
        >
          <span class="pi pi-pencil mr-2"></span>Create Post
        </button>
        <button
          @click="navigateToProfile"
          class="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded focus:outline-none hover:bg-gray-100"
        >
          <span class="pi pi-user mr-2"></span>Profile
        </button>
      </div>

      <div v-if="posts.length === 0" class="text-center text-gray-500">
        No posts yet.
      </div>

      <div v-else class="space-y-4">
        <div v-for="(post, index) in posts.slice().reverse()" :key="index" class="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ post.title }}</h3>

          <div v-if="post.type === 'image'" class="mb-2">
            <img :src="post.mediaUrl" alt="Post media" class="w-full h-auto rounded-lg">
          </div>
          <div v-if="post.type === 'video'" class="mb-2">
            <template v-if="post.mediaUrl.includes('youtu.be')">
              <iframe
                :src="getYouTubeEmbedUrl(post.mediaUrl)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-auto rounded-lg"
              ></iframe>
            </template>
            <template v-else>
              <video controls class="w-full h-auto rounded-lg">
                <source :src="post.mediaUrl" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </template>
          </div>

          <p class="text-gray-700">{{ post.content }}</p>

          <hr class="my-4 border-gray-200" />

          <div class="flex justify-between items-center text-gray-500">
            <div class="flex items-center space-x-2">
              <i
                :class="post.liked ? 'pi pi-thumbs-up-fill text-blue-500' : 'pi pi-thumbs-up'"
                @click="toggleLike(post)"
                class="cursor-pointer"
              ></i>
              <span>{{ post.likes }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-comment cursor-pointer" @click="openCommentDialog(post)"></i>
              <span>{{ post.comments.length }}</span>
            </div>
          </div>

          <div v-if="post.comments.length > 0" class="mt-4 border-t border-gray-200 pt-4">
            <div v-for="(comment, idx) in post.comments" :key="idx" class="p-2 bg-gray-100 rounded mb-2">
              <p class="text-gray-600">{{ comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isCommentDialogVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-4 shadow-lg w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Add Comment</h3>
        <textarea v-model="newComment" rows="4" class="w-full p-2 border rounded mb-4" placeholder="Type your comment here..."></textarea>
        <div class="flex justify-end">
          <button @click="addComment" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Add Comment
          </button>
          <button @click="closeCommentDialog" class="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const store = useStore();
const newComment = ref('');
const isCommentDialogVisible = ref(false);
const selectedPostId = ref<number | null>(null);
const router = useRouter();

const posts = ref([
  {
    id: 1,
    title: 'Amazing Landscape',
    content: 'Check out this beautiful landscape!',
    mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBpIKuCzK9AxZZkrdE5Fr_m4dKr1aPavnK6w&s',
    type: 'image',
    liked: false,
    likes: 10,
    comments: ['Stunning view!']
  },
  {
    id: 2,
    title: 'Incredible Video',
    content: 'Watch this amazing video!',
    mediaUrl: 'https://youtu.be/tt2k8PGm-TI',
    type: 'video',
    liked: false,
    likes: 25,
    comments: ['Wow, impressive!']
  },
  {
    id: 3,
    title: 'Another Beautiful Image',
    content: 'Another image to admire!',
    mediaUrl: 'https://miro.medium.com/v2/resize:fit:1200/1*udvSMrSVGOgD4fxjMJHbOw.jpeg',
    type: 'image',
    liked: false,
    likes: 5,
    comments: []
  }
]);

const getYouTubeEmbedUrl = (url: string) => {
  return url.replace('youtu.be/', 'https://www.youtube.com/embed/');
};

const openCommentDialog = (post: { id: number }) => {
  selectedPostId.value = post.id;
  isCommentDialogVisible.value = true;
};

const closeCommentDialog = () => {
  isCommentDialogVisible.value = false;
  newComment.value = '';
  selectedPostId.value = null;
};

const addComment = () => {
  if (selectedPostId.value !== null && newComment.value.trim() !== '') {
    const post = posts.value.find(p => p.id === selectedPostId.value);
    if (post) {
      post.comments.push(newComment.value);
    }
    closeCommentDialog();
  }
};

const toggleLike = (post: { liked: boolean; likes: number }) => {
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
};

const navigateToCreatePost = () => {
  router.push('/create-post');
};

const navigateToProfile = () => {
  router.push('/profile');
};

onMounted(async () => {
  const fetchedPosts = await store.fetchPosts();
  if (fetchedPosts) {
    posts.value = [...posts.value, ...fetchedPosts];
  }
});
</script>

<style scoped>
/* Updated styling for a more LinkedIn-like appearance */
</style>
