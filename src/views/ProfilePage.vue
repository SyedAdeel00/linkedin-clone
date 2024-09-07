<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
    <div class="w-full max-w-md bg-white p-6 rounded-xl shadow-2xl space-y-4">
      <h3 class="text-2xl font-bold text-blue-500 mb-4 text-center">
        Profile
      </h3>
      <div class="space-y-2">
        <p class="text-gray-700">
          <span class="font-semibold">Phone Number:</span> {{ phone }}
        </p>
        <p class="text-gray-700">
          <span class="font-semibold">Password:</span> {{ password }}
        </p>
      </div>
    </div>
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
/* Add any additional styling here */
</style>
