import { defineStore } from 'pinia';
import { ref } from 'vue';

  export const useStore = defineStore('main', () => {
    const user = ref<any>(null); // User data
    const showCreatePostModal = ref(false);
    const posts = ref<Array<{
      id: number;
      title: string;
      content: string;
      mediaUrl: string;
      type: string;
      liked: boolean;
      likes: number;
      comments: Array<string>;
      newComment: string;
      isCommentSectionVisible: boolean;
    }>>([]); // Local posts state
  
    const login = (phone: string) => {
      // Simulate successful login and set user data
      user.value = { phone, token: 'fake-jwt-token' };
    };
  
    const fetchPosts = async () => {
      // Return posts from store
      return posts.value;
    };
  
    const createPost = async (post: {
      id: number;
      title: string;
      content: string;
      mediaUrl: string;
      type: string;
      liked: boolean;
      likes: number;
      comments: Array<string>;
      newComment: string;
      isCommentSectionVisible: boolean;
    }) => {
      posts.value.push(post); // Add the new post to the local state
      return post;
    };
  
    const updatePost = (updatedPost: {
      id: number;
      title: string;
      content: string;
      mediaUrl: string;
      type: string;
      liked?: boolean; // Optional
      likes: number;
      comments: Array<string>;
      newComment: string;
      isCommentSectionVisible: boolean;
    }) => {
      const index = posts.value.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        // Provide a default value for liked if undefined
        posts.value[index] = {
          ...posts.value[index],
          ...updatedPost,
          liked: updatedPost.liked ?? false // Default to false if undefined
        };
      }
    };
    
    
  
    return { user, showCreatePostModal, login, fetchPosts, createPost, posts, updatePost };
  });
  