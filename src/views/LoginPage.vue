<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="absolute top-4 left-4 flex items-center">
      <span class="text-blue-700 font-bold text-2xl">LinkedIn</span>
      <i class="pi pi-linkedin ml-1" style="font-size: 1.7rem; color: blue;"></i>
</div>


    <div class="w-full max-w-md bg-white p-7 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-black-700 mb-2 text-left">Sign in</h1>
      <p class="text-gray-600 text-left mb-6">Stay updated on your professional world.</p>

      <form @submit.prevent="handleSubmit">
        <!-- Email or Phone Input -->
        <div class="mb-4">
          <label for="emailOrPhone" class="block text-gray-700 font-semibold mb-2">Email or phone</label>
          <input
            type="text"
            v-model="form.emailOrPhone"
            id="emailOrPhone"
            placeholder="Enter your email or phone"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': errors.emailOrPhone }"
            @input="validatePhone"
          />
          <p v-if="errors.emailOrPhone" class="text-red-500 text-sm mt-1">{{ errors.emailOrPhone }}</p>
        </div>

        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              id="password"
              placeholder="Enter your password"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.password }"
            />
            <span class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" @click="togglePasswordVisibility">
              <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
            </span>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Forgot Password Link -->
        <div class="flex justify-start mb-4">
          <a href="#" class="text-blue-600 font-semibold text-sm">Forgot password?</a>
        </div>

        <!-- Sign In Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Sign in
        </button>
      </form>

      <div class="flex items-center justify-center my-4">
        <hr class="w-full border-gray-300" />
        <span class="px-2 text-gray-500">or</span>
        <hr class="w-full border-gray-300" />
      </div>

      <div class="mt-8 text-sm text-center text-gray-600 mb-3">
        By clicking Sign in, you agree to LinkedIn’s <a href="#" class="text-blue-600">User Agreement</a>, <a href="#" class="text-blue-600">Privacy Policy</a>, and <a href="#" class="text-blue-600">Cookie Policy</a>.
      </div>


      <!-- Sign In with Google Button -->
       <button class="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg mb-4 hover:border-black flex items-center justify-center">
        <i class="pi pi-google mr-3" style="font-size: 1.5rem; color:green;"></i>
        Continue with Google
       </button>

      <!-- Sign In with Apple Button -->
       <button class="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg mb-6 hover:border-black flex items-center justify-center">
        <i class="pi pi-apple mr-3" style="font-size: 1.7rem; color: black;"></i>
        Sign in with Apple
       </button>

    </div>

     <!-- Join Now Link -->
     <p class="text-center text-gray-600 mt-6">
        New to LinkedIn? <a href="#" class="text-blue-600 font-semibold">Join now</a>
      </p>

    <!-- Footer Section -->
    <div class="mt-8 text-center text-sm text-gray-600">
      <div class="flex justify-center space-x-4 mt-4">
        <a href="#" class="text-gray-600">  LinkedIn      <i class="pi pi-linkedin" style="font-size: 1rem; color: black;"></i>
          ©2024</a>
        <a href="#" class="text-gray-600">User Agreement</a>
        <a href="#" class="text-gray-600">Privacy Policy</a>
        <a href="#" class="text-gray-600">Community Guidelines</a>
        <a href="#" class="text-gray-600">Cookie Policy</a>
        <a href="#" class="text-gray-600">Copyright Policy</a>
        <a href="#" class="text-gray-600">Send Feedback</a>
        <a href="#" class="text-gray-600">Language</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const router = useRouter();
const store = useStore();

const form = ref({
  emailOrPhone: '',
  password: ''
});

const errors = ref({
  emailOrPhone: '',
  password: ''
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const validatePhone = () => {
  if (!/^\d*$/.test(form.value.emailOrPhone)) {
    form.value.emailOrPhone = form.value.emailOrPhone.replace(/\D/g, ''); // Only allow numbers
  }
};

const validateForm = () => {
  errors.value.emailOrPhone = '';
  errors.value.password = '';

  if (!form.value.emailOrPhone) {
    errors.value.emailOrPhone = 'Email or phone is required.';
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required.';
  } else if (form.value.password !== '1234') { // Password validation
    errors.value.password = 'Incorrect password.';
  }
};

const handleSubmit = async () => {
  validateForm();

  if (!errors.value.emailOrPhone && !errors.value.password) {
    // Simulate successful login
    store.login(form.value.emailOrPhone); // Update store with logged in user
    try {
      await router.push('/feed');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
};
</script>
