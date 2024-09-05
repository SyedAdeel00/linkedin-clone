<template>
  <div class="comment-item">
    <p>{{ comment.text }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  comment: Object,
});
</script>

<style scoped>
.comment-item {
  border-top: 1px solid #eee;
  padding: 5px;
  margin-top: 5px;
}
</style>
