<template>
  <div class="flex flex-col min-h-screen bg-gray-100 p-8">
    <!-- Main Content Area -->
    <div class="flex flex-grow justify-center">
      <!-- Main Profile Content -->
      <div class="flex-1 max-w-4xl">
        <!-- Cover Photo -->
        <div class="w-full bg-blue-500 h-32 rounded-t-xl relative">
          <img :src="coverPhoto" alt="Cover Photo" class="w-full h-full object-cover rounded-t-xl">
        </div>
        
        <!-- Profile Section -->
        <div class="w-full bg-white p-6 rounded-xl shadow-2xl -mt-16 relative">
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
              <span class="ml-2 text-blue-500 cursor-pointer">
                <i class="pi pi-pencil"></i>
              </span>
            </p>
            <p class="text-gray-700">
              <span class="font-semibold">Email:</span> {{ email }}
              <span class="ml-2 text-blue-500 cursor-pointer">
                <i class="pi pi-pencil"></i>
              </span>
            </p>
            <p class="text-gray-700">
              <span class="font-semibold">LinkedIn:</span> <a :href="linkedinProfile" class="text-blue-500 underline" target="_blank">{{ linkedinProfile }}</a>
              <span class="ml-2 text-blue-500 cursor-pointer">
                <i class="pi pi-pencil"></i>
              </span>
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

      <!-- Right Sidebar -->
      <div class="w-80 bg-white p-4 rounded-xl shadow-lg ml-8">
        <!-- Profile Language -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-blue-600">Profile Language   <i class="pi pi-pencil"></i></h3>
        </div>

        <!-- Public Profile & URL -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-blue-600">Public Profile & URL   <i class="pi pi-pencil"></i></h3>
        
          <p class="text-gray-700">
            <a href="https://www.linkedin.com/in/syed-adeel-ashraf-67a99924a" class="text-blue-500 underline" target="_blank">www.linkedin.com/in/syed-adeel-ashraf-67a99924a</a>
          </p>
           
        </div>

        <!-- More Profiles for You -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-blue-600">More Profiles for You</h3>
          <div class="flex items-center space-x-4 mb-4">
            <img src="https://via.placeholder.com/50" alt="Profile Picture" class="w-12 h-12 rounded-full">
            <div>
              <p class="font-semibold">Md Amanatullah</p>
              <p class="text-sm text-gray-500">Sr. Consultant AI/ML @ GeoTechnosoft</p>
              <button class="bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg hover:bg-blue-700">
                Follow
              </button>
            </div>
          </div>
          <div class="flex items-center space-x-4 mb-4">
            <img src="https://via.placeholder.com/50" alt="Profile Picture" class="w-12 h-12 rounded-full">
            <div>
              <p class="font-semibold">Aleem khan </p>
              <p class="text-sm text-gray-500">Associate Software Engineer</p>
              <button class="bg-green-600 text-white font-semibold py-1 px-2 rounded-lg hover:bg-green-700">
                Message
              </button>
            </div>
          </div>
          <div class="flex items-center space-x-4 mb-4">
            <img src="https://via.placeholder.com/50" alt="Profile Picture" class="w-12 h-12 rounded-full">
            <div>
              <p class="font-semibold">ANMOL DIXIT</p>
              <p class="text-sm text-gray-500">Web Developer</p>
              <button class="bg-gray-600 text-white font-semibold py-1 px-2 rounded-lg hover:bg-gray-700">
                Connect
              </button>
            </div>
          </div>
        </div>

        <!-- You Might Like -->
        <div>
          <h3 class="text-xl font-semibold text-blue-600">You Might Like</h3>
          <div class="mt-4 mb-6">
            <h4 class="font-semibold">Newsletters for You</h4>
            <div class="mt-2">
              <img src="https://via.placeholder.com/100" alt="Newsletter" class="w-full h-auto rounded-lg">
              <p class="text-gray-700">IT Job Openings - PAN India Job Openings</p>
              <p class="text-sm text-gray-500">Published weekly</p>
              <button class="bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
            <div class="mt-4">
              <img src="https://via.placeholder.com/100" alt="Newsletter" class="w-full h-auto rounded-lg">
              <p class="text-gray-700">The Monthly Tech-In</p>
              <p class="text-sm text-gray-500">Monthly newsletter</p>
              <button class="bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      coverPhoto: 'https://via.placeholder.com/1200x400',
      profilePic: 'https://via.placeholder.com/150',
      fullName: 'Syed Adeel Ashraf',
      jobTitle: 'Full Stack Developer',
      location: 'Hyderabad, India',
      phone: '+91 1234567890',
      email: 'syed.adeel@example.com',
      linkedinProfile: 'https://www.linkedin.com/in/syed-adeel-ashraf-67a99924a',
      about: 'A passionate Full Stack Developer with experience in building scalable web applications.',
      skills: ['JavaScript', 'Vue.js', 'Tailwind CSS', 'Node.js'],
      experience: [
        { title: 'Software Engineer', company: 'Tech Solutions', years: '2019-2021', description: 'Worked on various projects involving web development.' },
        { title: 'Senior Developer', company: 'DevCorp', years: '2021-Present', description: 'Leading a team of developers to build enterprise applications.' }
      ],
      education: [
        { degree: 'B.Tech in Computer Science', institution: 'XYZ University', years: '2015-2019', details: 'Graduated with First Class honors.' }
      ],
      tweets: [
        { content: 'Excited to start my new project!', timestamp: '2024-09-09 10:00 AM' },
        { content: 'Learning Vue.js and Tailwind CSS.', timestamp: '2024-09-08 2:00 PM' }
      ]
    };
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
