<template>
  <div>
    <button @click="navigateToCreatePost">Create Post</button>
    <button @click="navigateToProfile">Profile</button>

    <div v-if="posts.length === 0">No posts yet.</div>
    <PostItem
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PostItem from '../components/PostItem.vue';

const posts = ref([]);
const router = useRouter();

// Load posts from local storage on component mount
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
/* Add some styles as necessary */
</style>
