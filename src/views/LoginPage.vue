<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="requestOtp">
      <input
        v-model="phone"
        type="tel"
        placeholder="Phone Number"
        required
      />
      <button type="submit">Request OTP</button>
    </form>
    <div v-if="otpRequested">
      <form @submit.prevent="verifyOtp">
        <input
          v-model="otp"
          type="text"
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
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
  // Simulate OTP request
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
.login-page {
  padding: 20px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
