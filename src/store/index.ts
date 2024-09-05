// src/store/index.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
  const user = ref<any>(null); // User data
  const showCreatePostModal = ref(false);
  const posts = ref<Array<{ id: number; title: string; content: string }>>([]); // Local posts state

  const login = (phone: string) => {
    // Simulate successful login and set user data
    user.value = { phone, token: 'fake-jwt-token' };
  };

  const fetchPosts = async () => {
    // Simulate fetching posts by returning the local posts array
    return posts.value;
  };

  const createPost = async (post: { title: string; content: string }) => {
    // Simulate post creation by adding the new post to the local posts array
    const newPost = { ...post, id: Date.now() }; // Use timestamp as a unique ID
    posts.value.push(newPost); // Add the new post to the local state
    return newPost;
  };

  return { user, showCreatePostModal, login, fetchPosts, createPost, posts };
});
