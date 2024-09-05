<template>
  <div>
    <h3>Profile</h3>
    <p>Phone Number: {{ phone }}</p>
    <p>Password: {{ password }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const phone = ref('');
const password = ref('');

onMounted(() => {
  // Simulate fetching user data
  phone.value = '1234567890';
  password.value = 'password123';
});
</script>

<style scoped>
/* Add some styles as necessary */
</style>
