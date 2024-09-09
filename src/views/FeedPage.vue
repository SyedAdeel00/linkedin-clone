<template>
  <div class="flex flex-col lg:flex-row items-start justify-center min-h-screen bg-gray-100 p-8">
    <!-- Left Sidebar -->
    <div class="lg:w-1/6 w-full lg:max-w-xs bg-white p-4 rounded-lg shadow-sm lg:mr-4 mb-4 lg:mb-0">
      <div class="mb-4">
        <img src="https://via.placeholder.com/100" alt="Profile Photo" class="w-24 h-24 rounded-full mb-2 mx-auto">
        <h2 class="text-xl font-semibold text-gray-800 text-center">Syed Adeel Ashraf</h2>
        <p class="text-center text-gray-600">React Native || React.js || Javascript || Typescript || Node.js || Express.js || mongoDB || SQL || MERN Stack || API || Redux || Developer</p>
      </div>
      <div class="mb-4">
        <p class="font-semibold text-gray-800">Profile viewers</p>
        <p class="text-gray-600">43</p>
        <p class="font-semibold text-gray-800">Post impressions</p>
        <p class="text-gray-600">9</p>
      </div>
      <button class="bg-blue-600 text-white font-medium py-2 px-4 rounded w-full mb-4 hover:bg-blue-700">Access exclusive tools & insights</button>
      <button class="bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded w-full hover:bg-gray-400">Saved items</button>
    </div>

    <!-- Main Feed -->
    <div class="lg:w-2/6 w-full bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        <span class="pi pi-linkedin mr-2" style="font-size:1.7rem;"></span>Feed
      </h2>

      <div class="flex justify-between mb-6">
        <button
          @click="navigateToCreatePost"
          class="bg-blue-600 text-white font-medium py-2 px-6 rounded focus:outline-none hover:bg-blue-700"
        >
          <span class="pi pi-pencil mr-2"></span>Create Post
        </button>
        <button
          @click="navigateToProfile"
          class="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded focus:outline-none hover:bg-gray-100"
        >
          <span class="pi pi-user mr-2"></span>Profile
        </button>
      </div>

      <div v-if="posts.length === 0" class="text-center text-gray-500">
        No posts yet.
      </div>

      <div v-else class="space-y-4">
        <div v-for="(post, index) in posts.slice().reverse()" :key="index" class="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ post.title }}</h3>

          <div v-if="post.type === 'image'" class="mb-2">
            <img :src="post.mediaUrl" alt="Post media" class="w-full h-auto rounded-lg">
          </div>
          <div v-if="post.type === 'video'" class="mb-2">
            <template v-if="post.mediaUrl.includes('youtu.be')">
              <iframe
                :src="getYouTubeEmbedUrl(post.mediaUrl)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-auto rounded-lg"
              ></iframe>
            </template>
            <template v-else>
              <video controls class="w-full h-auto rounded-lg">
                <source :src="post.mediaUrl" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </template>
          </div>

          <p class="text-gray-700">{{ post.content }}</p>

          <hr class="my-4 border-gray-200" />

          <div class="flex justify-between items-center text-gray-500">
            <div class="flex items-center space-x-2">
              <i
                :class="post.liked ? 'pi pi-thumbs-up-fill text-blue-500' : 'pi pi-thumbs-up'"
                @click="toggleLike(post)"
                class="cursor-pointer"
              ></i>
              <span>{{ post.likes }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-comment cursor-pointer" @click="toggleCommentSection(post)"></i>
              <span>{{ post.comments.length }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <!-- Share Button -->
              <i class="pi pi-share-alt cursor-pointer" @click="sharePost(post)"></i>
              <span>Share</span>
            </div>
            <div class="flex items-center space-x-2">
              <!-- Repost Button -->
              <i class="pi pi-repost cursor-pointer" @click="repost(post)"></i>
              <span>Repost</span>
            </div>
          </div>

          <!-- Comment Section -->
          <div v-if="post.isCommentSectionVisible" class="mt-4 border-t border-gray-200 pt-4">
            <textarea v-model="post.newComment" rows="2" class="w-full p-2 border rounded mb-4" placeholder="Type your comment here..."></textarea>
            <button @click="addComment(post)" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Add Comment
            </button>
            <div v-if="post.comments.length > 0" class="mt-4">
              <div v-for="(comment, idx) in post.comments" :key="idx" class="p-2 bg-gray-100 rounded mb-2">
                <p class="text-gray-600">{{ comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="lg:w-1/6 w-full lg:max-w-xs bg-white p-4 rounded-lg shadow-sm lg:ml-4">
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Recent</h3>
        <ul class="list-disc pl-5">
          <li><a href="#" class="text-blue-600 hover:underline">Groups</a></li>
          <li><a href="#" class="text-blue-600 hover:underline">Events</a></li>
          <li><a href="#" class="text-blue-600 hover:underline">Followed Hashtags</a></li>
        </ul>
      </div>
      <div>
        <a href="#" class="text-blue-600 hover:underline">See all Followed Hashtags</a>
        <p class="text-gray-600">Discover more</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const store = useStore();
const router = useRouter();

interface Post {
  id: number;
  title: string;
  content: string;
  mediaUrl: string;
  type: string;
  liked: boolean;
  likes: number;
  comments: string[];
  newComment: string;
  isCommentSectionVisible: boolean;
}

const posts = ref<Post[]>([
  {
    id: 1,
    title: 'Amazing Landscape',
    content: 'Check out this beautiful landscape!',
    mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBpIKuCzK9AxZZkrdE5Fr_m4dKr1aPavnK6w&s',
    type: 'image',
    liked: false,
    likes: 10,
    comments: ['Stunning view!'],
    newComment: '',
    isCommentSectionVisible: false
  },
  {
    id: 2,
    title: 'Incredible Video',
    content: 'Watch this amazing video!',
    mediaUrl: 'https://youtu.be/tt2k8PGm-TI',
    type: 'video',
    liked: false,
    likes: 25,
    comments: ['Wow, impressive!'],
    newComment: '',
    isCommentSectionVisible: false
  },
  {
    id: 3,
    title: 'Another Beautiful Image',
    content: 'Another image to admire!',
    mediaUrl: 'https://miro.medium.com/v2/resize:fit:1200/1*udvSMrSVGOgD4fxjMJHbOw.jpeg',
    type: 'image',
    liked: false,
    likes: 5,
    comments: [],
    newComment: '',
    isCommentSectionVisible: false
  }
]);

const toggleLike = (post: Post) => {
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
};

const toggleCommentSection = (post: Post) => {
  post.isCommentSectionVisible = !post.isCommentSectionVisible;
};

const addComment = (post: Post) => {
  if (post.newComment.trim() !== '') {
    post.comments.push(post.newComment);
    post.newComment = '';
  }
};

const sharePost = (post: Post) => {
  alert(`Shared post ${post.id}`);
};

const repost = (post: Post) => {
  alert(`Reposted post ${post.id}`);
};

const navigateToCreatePost = () => {
  router.push('/create-post');
};

const navigateToProfile = () => {
  router.push('/profile');
};

onMounted(async () => {
  try {
    const fetchedPosts = await store.fetchPosts();
    if (fetchedPosts) {
      posts.value = [...posts.value, ...fetchedPosts];
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
});



function getYouTubeEmbedUrl(url: string): string {
  return url.replace('youtu.be', 'youtube.com/embed');
}
</script>


<style scoped>
/* Add custom styles here */
</style>
