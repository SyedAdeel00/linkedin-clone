<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <h3>Create Post</h3>
      <input v-model="title" placeholder="Title" />
      <textarea v-model="content" placeholder="Content"></textarea>
      <button @click="createPost">Post</button>
      <button @click="close">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';
import { useStore } from '../store'; // Assuming you have a store to manage state

const props = defineProps({
  isVisible: Boolean,
});
const emit = defineEmits(['close']);

const store = useStore(); // Using Pinia store to manage posts globally
const title = ref('');
const content = ref('');

const createPost = () => {
  // Add post to the store's posts array
  const newPost = {
    id: Date.now(), // Use timestamp as unique ID
    title: title.value,
    content: content.value,
  };

  store.posts.push(newPost); // Add post to the store

  // Clear the form
  title.value = '';
  content.value = '';

  // Close the modal
  emit('close');
};

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
