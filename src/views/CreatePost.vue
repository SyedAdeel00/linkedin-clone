<template>
  <div>
    <h3>Create Post</h3>
    <input v-model="title" placeholder="Title" />
    <textarea v-model="content" placeholder="Content"></textarea>
    <button @click="createPost">Post</button>
    <button @click="cancel">Cancel</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref('');
const content = ref('');
const router = useRouter();

const createPost = () => {
  if (!title.value || !content.value) {
    alert("Title and content can't be empty");
    return;
  }

  const newPost = {
    id: Date.now(),
    title: title.value,
    content: content.value,
    likes: 0,
    comments: [],
  };

  // Get existing posts from local storage
  const storedPosts = localStorage.getItem('posts');
  const posts = storedPosts ? JSON.parse(storedPosts) : [];

  // Add new post and save to local storage
  posts.push(newPost);
  localStorage.setItem('posts', JSON.stringify(posts));

  // Clear form and navigate to the feed page
  title.value = '';
  content.value = '';
  router.push('/feed');
};

const cancel = () => {
  router.push('/feed');
};
</script>

<style scoped>
/* Add some styles as necessary */
</style>
