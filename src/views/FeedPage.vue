<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
    <div class="w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl space-y-4">
      <h2 class="text-3xl font-extrabold text-blue-500 mb-6 text-center drop-shadow-lg">
        Feed
      </h2>

      <div class="flex justify-between mb-4">
        <button
          @click="navigateToCreatePost"
          class="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          Create Post
        </button>
        <button
          @click="navigateToProfile"
          class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Profile
        </button>
      </div>

      <div v-if="posts.length === 0" class="text-center text-gray-600">
        No posts yet.
      </div>

      <div v-else class="space-y-4">
        <PostItem
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
          class="bg-gray-100 p-4 rounded-lg shadow"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PostItem from '../components/PostItem.vue';

const posts = ref([]);
const router = useRouter();

onMounted(() => {
  const storedPosts = localStorage.getItem('posts');
  if (storedPosts) {
    posts.value = JSON.parse(storedPosts);
  }
});

const navigateToCreatePost = () => {
  router.push('/create-post');
};

const navigateToProfile = () => {
  router.push('/profile');
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
