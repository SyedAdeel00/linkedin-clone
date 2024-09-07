<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
    <div class="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-transform">
      <h2 class="text-3xl font-extrabold text-blue-500 mb-6 text-center drop-shadow-lg">
        Login
      </h2>
      <form @submit.prevent="requestOtp" class="space-y-6">
        <input
          v-model="phone"
          @input="handlePhoneInputChange"
          type="tel"
          placeholder="Phone Number"
          required
          class="w-full px-4 py-3 border border-red-300 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
        />
        <button
          type="submit"
          :disabled="otpRequested && !phoneChanged"
          class="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Request OTP
        </button>
      </form>
      <div v-if="otpRequested" class="mt-8">
        <form @submit.prevent="verifyOtp" class="space-y-6">
          <div class="relative">
            <input
              v-model="otp"
              :type="otpInputType"
              placeholder="Enter OTP"
              required
              class="w-full px-4 py-3 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
            />
            <span @click="toggleOtpVisibility" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer">
              <i :class="otpVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'; 
import { useStore } from '../store';
import { useRouter } from 'vue-router';

const phone = ref('');
const otp = ref('');
const otpRequested = ref(false);
const otpVisible = ref(false);
const phoneChanged = ref(false);

const store = useStore();
const router = useRouter();

// Toggle OTP visibility
const toggleOtpVisibility = () => {
  otpVisible.value = !otpVisible.value;
};

const otpInputType = computed(() => otpVisible.value ? 'text' : 'password');

// Handle phone input change
const handlePhoneInputChange = () => {
  phoneChanged.value = true;
  otpRequested.value = false; // Reset OTP requested state when phone number changes
};

const requestOtp = () => {
  alert('OTP has been sent to your phone');
  otpRequested.value = true;
  phoneChanged.value = false; // Once OTP is requested, disable unless phone changes
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
/* Optional: Add any additional styling here */
</style>
