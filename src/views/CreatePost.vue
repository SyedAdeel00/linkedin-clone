<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
    <div class="w-full max-w-md bg-white p-6 rounded-xl shadow-2xl space-y-6">
      <h3 class="text-2xl font-bold text-blue-500 text-center">
        Create Post
      </h3>
      <input
        v-model="title"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Title"
        type="text"
      />
      <textarea
        v-model="content"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Content"
        rows="6"
      ></textarea>
      <div class="flex justify-between">
        <button
          @click="createPost"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Post
        </button>
        <button
          @click="cancel"
          class="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const title = ref('');
const content = ref('');
const router = useRouter();
const store = useStore(); // Initialize the store

const createPost = async () => {
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

  // Use the store's createPost method
  await store.createPost(newPost);

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
/* Add any additional styling here */
</style>
