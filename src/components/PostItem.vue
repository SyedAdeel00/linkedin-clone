<template>
  <div class="post-item">
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>
    <div class="actions">
      <button @click="likePost">Like ({{ post.likes }})</button>
      <button @click="toggleComments">Comments ({{ post.comments.length }})</button>
    </div>
    <div v-if="showComments">
      <CommentItem
        v-for="(comment, index) in post.comments"
        :key="index"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import CommentItem from './CommentItem.vue';

const props = defineProps({
  post: Object,
});

const showComments = ref(false);

const toggleComments = () => {
  showComments.value = !showComments.value;
};

const likePost = () => {
  props.post.likes += 1;

  // Update the post in local storage
  const storedPosts = localStorage.getItem('posts');
  if (storedPosts) {
    const posts = JSON.parse(storedPosts);
    const postIndex = posts.findIndex(p => p.id === props.post.id);
    if (postIndex !== -1) {
      posts[postIndex].likes = props.post.likes;
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }
};
</script>

<style scoped>
/* Add some styles as necessary */
</style>
