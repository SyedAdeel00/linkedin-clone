<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
    <!-- Cover Photo -->
    <div class="w-full max-w-4xl bg-blue-500 h-32 rounded-t-xl relative">
      <img :src="coverPhoto" alt="Cover Photo" class="w-full h-full object-cover rounded-t-xl">
    </div>
    
    <!-- Profile Section -->
    <div class="w-full max-w-4xl bg-white p-6 rounded-xl shadow-2xl -mt-16 relative">
      <!-- Profile Header -->
      <div class="flex items-center space-x-4">
        <img :src="profilePic" alt="Profile Picture" class="w-24 h-24 rounded-full border-4 border-white shadow-lg">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">{{ fullName }}</h1>
          <p class="text-xl text-gray-600">{{ jobTitle }}</p>
          <p class="text-gray-500">{{ location }}</p>
        </div>
      </div>

      <!-- Edit Profile Button -->
      <div class="mt-4 flex justify-end">
        <button class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
          Edit Profile
        </button>
      </div>

      <!-- Contact Info -->
      <div class="mt-6 space-y-4">
        <h3 class="text-2xl font-semibold text-blue-600">Contact Information</h3>
        <p class="text-gray-700">
          <span class="font-semibold">Phone Number:</span> {{ phone }}
        </p>
        <p class="text-gray-700">
          <span class="font-semibold">Email:</span> {{ email }}
        </p>
        <p class="text-gray-700">
          <span class="font-semibold">LinkedIn:</span> <a :href="linkedinProfile" class="text-blue-500 underline" target="_blank">{{ linkedinProfile }}</a>
        </p>
      </div>

      <!-- About Section -->
      <div class="mt-6 space-y-4">
        <h3 class="text-2xl font-semibold text-blue-600">About</h3>
        <p class="text-gray-700">{{ about }}</p>
      </div>

      <!-- Skills -->
      <div class="mt-6 space-y-4">
        <h3 class="text-2xl font-semibold text-blue-600">Skills</h3>
        <ul class="list-disc list-inside text-gray-700">
          <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>

      <!-- Experience -->
      <div class="mt-6 space-y-4">
        <h3 class="text-2xl font-semibold text-blue-600">Experience</h3>
        <ul class="list-disc list-inside text-gray-700">
          <li v-for="(job, index) in experience" :key="index">
            <strong>{{ job.title }}</strong> at {{ job.company }} ({{ job.years }})
            <p>{{ job.description }}</p>
          </li>
        </ul>
      </div>

      <!-- Education -->
      <div class="mt-6 space-y-4">
        <h3 class="text-2xl font-semibold text-blue-600">Education</h3>
        <ul class="list-disc list-inside text-gray-700">
          <li v-for="(edu, index) in education" :key="index">
            <strong>{{ edu.degree }}</strong> from {{ edu.institution }} ({{ edu.years }})
            <p>{{ edu.details }}</p>
          </li>
        </ul>
      </div>

      <!-- Tweets Section -->
      <div class="mt-6 space-y-4">
        <h3 class="text-2xl font-semibold text-blue-600 flex items-center">
          <i class="pi pi-twitter text-blue-500 text-2xl mr-2"></i> Tweets
        </h3>
        <div v-if="tweets.length > 0">
          <div v-for="(tweet, index) in tweets" :key="index" class="border-b pb-4 mb-4">
            <p class="text-gray-700">{{ tweet.content }}</p>
            <p class="text-gray-500 text-sm">{{ tweet.timestamp }}</p>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500">No tweets available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const profilePic = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8j2gmtU0Tti343AXGWaIMy017LUiSUtbh-Q&s');
const coverPhoto = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Fwd6_NxodX9K3bBnZysBoWrYi5BaRpVBlg&s');
const fullName = ref('John Doe');
const jobTitle = ref('Software Engineer');
const location = ref('San Francisco, CA');
const phone = ref('');
const email = ref('');
const linkedinProfile = ref('https://www.linkedin.com/in/johndoe/');
const about = ref('Passionate software engineer with 5 years of experience in building scalable web applications and solving complex problems.');
const skills = ref([
  'JavaScript',
  'Vue.js',
  'TypeScript',
  'Node.js',
  'HTML & CSS'
]);
const experience = ref([
  {
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    years: '2021 - Present',
    description: 'Leading a team of developers to create innovative solutions for client needs and driving technical excellence.'
  },
  {
    title: 'Software Engineer',
    company: 'DevWorks Ltd.',
    years: '2018 - 2021',
    description: 'Developed and maintained web applications using modern frameworks and technologies.'
  }
]);
const education = ref([
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of California, Berkeley',
    years: '2014 - 2018',
    details: 'Focused on software development and data structures.'
  }
]);

const tweets = ref([
  {
    content: 'Just completed a new project! Excited to share more details soon.',
    timestamp: '2024-09-07 10:00 AM'
  },
  {
    content: 'Looking forward to attending the Vue.js conference next week.',
    timestamp: '2024-09-05 02:30 PM'
  }
]);

onMounted(() => {
  phone.value = '123-456-7890';
  email.value = 'john.doe@example.com';
});
</script>

<style scoped>
/* Add additional styling here */
</style>
