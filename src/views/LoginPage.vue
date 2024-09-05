<template>
  <section class="bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <!-- Heading -->
      <h1 class="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-6 text-center">
        Sign in to your account
      </h1>
      <!-- Login Form -->
      <form @submit.prevent="requestOtp" class="space-y-6">
        <!-- Phone Number Field -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Phone Number</label>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            placeholder="Enter your phone number"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 transition-all duration-300 ease-in-out"
          />
        </div>
        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 transition-all duration-300 ease-in-out"
        >
          Request OTP
        </button>
      </form>

      <!-- OTP Verification -->
      <div v-if="otpRequested" class="mt-6">
        <form @submit.prevent="verifyOtp" class="space-y-6">
          <!-- OTP Field -->
          <div>
            <label for="otp" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Enter OTP</label>
            <input
              id="otp"
              v-model="otp"
              type="text"
              placeholder="Enter OTP"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 transition-all duration-300 ease-in-out"
            />
          </div>
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 transition-all duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';

const phone = ref('');
const otp = ref('');
const otpRequested = ref(false);

const store = useStore();
const router = useRouter();

const requestOtp = () => {
  alert('OTP has been sent to your phone');
  otpRequested.value = true;
};

const verifyOtp = async () => {
  if (otp.value === '1234') { // Simulated OTP check
    store.login(phone.value);
    await nextTick(); // Ensure the login state is updated before navigating
    router.push('/feed');
  } else {
    alert('Invalid OTP');
  }
};
</script>

<style scoped>
/* Optional: Add any additional scoped styling here */
</style>
