import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
  const user = ref<any>(null); // User data
  const showCreatePostModal = ref(false);
  const posts = ref<Array<{ id: number; title: string; content: string; likes: number; comments: Array<string>; liked?: boolean }>>([]); // Local posts state

  const login = (phone: string) => {
    // Simulate successful login and set user data
    user.value = { phone, token: 'fake-jwt-token' };
  };

  const fetchPosts = async () => {
    // Return posts from store
    return posts.value;
  };

  const createPost = async (post: { id: number; title: string; content: string; likes: number; comments: Array<string> }) => {
    posts.value.push(post); // Add the new post to the local state
    return post;
  };

  const updatePost = (updatedPost: { id: number; title: string; content: string; likes: number; comments: Array<string>; liked?: boolean | undefined; }) => {
    const index = posts.value.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      posts.value[index] = updatedPost; // Update the post in the store
    }
  };

  return { user, showCreatePostModal, login, fetchPosts, createPost, posts, updatePost };
});
