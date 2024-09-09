<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-8">
    <div class="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
      <!-- Profile Header -->
      <div class="flex items-center space-x-4 mb-4">
        <img :src="profilePic" alt="Profile Picture" class="w-12 h-12 rounded-full border-2 border-gray-300">
        <div>
          <h2 class="text-xl font-semibold">{{ userName }}</h2>
          <p class="text-gray-500 text-sm">{{ userTitle }}</p>
        </div>
      </div>

      <!-- Post Input -->
      <input
        v-model="title"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        placeholder="Title"
        type="text"
      />
      <textarea
        v-model="content"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        placeholder="What’s on your mind?"
        rows="6"
      ></textarea>

      <!-- Add Media and Visibility Options -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex space-x-4">
          <button class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10h10M7 14h10M7 18h10M4 4h16v16H4V4z" />
            </svg>
            Add Photo
          </button>
          <button class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12l5 5L20 7" />
            </svg>
            Add Video
          </button>
          <button class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
            </svg>
            Add Document
          </button>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-gray-500 text-sm">Who can see this?</span>
          <select v-model="visibility" class="p-2 border border-gray-300 rounded-md bg-white text-gray-700">
            <option value="public">Public</option>
            <option value="connections">Connections</option>
            <option value="only_me">Only Me</option>
          </select>
        </div>
      </div>

      <!-- Post Actions -->
      <div class="flex justify-end space-x-2">
        <button
          @click="createPost"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Post
        </button>
        <button
          @click="cancel"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
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
const visibility = ref('public');
const router = useRouter();
const store = useStore(); // Initialize the store

const profilePic = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8j2gmtU0Tti343AXGWaIMy017LUiSUtbh-Q&s');
const userName = ref('John Doe');
const userTitle = ref('Software Engineer');

const createPost = async () => {
  if (!title.value || !content.value) {
    alert("Title and content can't be empty");
    return;
  }

  const newPost = {
    id: Date.now(),
    title: title.value,
    content: content.value,
    mediaUrl: '', // Provide a default or empty value
    type: '', // Provide a default or empty value
    liked: false, // Provide a default value
    likes: 0,
    comments: [],
    newComment: '', // Provide a default or empty value
    isCommentSectionVisible: false // Provide a default value
  };

  // Use the store's createPost method
  await store.createPost(newPost);

  // Clear form and navigate to the feed page
  title.value = '';
  content.value = '';
  visibility.value = 'public';
  router.push('/feed');
};


const cancel = () => {
  router.push('/feed');
};
</script>

<style scoped>
/* Additional styling here */
</style>
