<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-8">
    <div class="w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl space-y-4">
      <h2 class="text-3xl font-extrabold text-blue-600 mb-6 text-center drop-shadow-lg">
        <span class="pi pi-linkedin mr-2" style="font-size:1.7rem;"></span>Feed
      </h2>

      <div class="flex justify-between mb-4">
        <button
          @click="navigateToCreatePost"
          class="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          <span class="pi pi-tag mr-2"></span>Create Post
        </button>
        <button
          @click="navigateToProfile"
          class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <span class="pi pi-user mr-2"></span>Profile
        </button>
      </div>

      <div v-if="posts.length === 0" class="text-center text-gray-600">
        No posts yet.
      </div>

      <div v-else class="space-y-4">
        <div v-for="(post, index) in posts.slice().reverse()" :key="index" class="bg-gray-100 border border-gray-300 p-4 rounded-lg shadow">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ post.title }}</h3>
          <div v-if="post.type === 'image'" class="mb-2">
            <img :src="post.mediaUrl" alt="Post media" class="w-full h-auto rounded-lg">
          </div>
          <div v-if="post.type === 'video'" class="mb-2">
            <!-- Check if mediaUrl contains 'youtube.com' -->
            <template v-if="post.mediaUrl.includes('youtu.be')">
              <iframe
                :src="post.mediaUrl.replace('youtu.be/', 'https://www.youtube.com/embed/')"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-auto rounded-lg"
              ></iframe>
            </template>
            <!-- Else use direct video URL -->
            <template v-else>
              <video controls class="w-full h-auto rounded-lg">
                <source :src="post.mediaUrl" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </template>
          </div>

          <p class="text-gray-600">{{ post.content }}</p>

          <hr class="my-4 border-gray-300" />

          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <i
                :class="post.liked ? 'pi pi-thumbs-up-fill text-blue-500' : 'pi pi-thumbs-up text-gray-500'"
                @click="toggleLike(post)"
                class="cursor-pointer"
              ></i>
              <span class="ml-2">{{ post.likes }}</span>
            </div>
            <div class="flex items-center">
              <i class="pi pi-comment text-gray-500 cursor-pointer" @click="openCommentDialog(post)"></i>
              <span class="ml-2">{{ post.comments.length }}</span>
            </div>
          </div>

          <div v-if="post.comments.length > 0" class="mt-4 border-t border-gray-300 pt-4">
            <div v-for="(comment, idx) in post.comments" :key="idx" class="p-2 bg-gray-200 rounded mb-2">
              <p class="text-gray-700">{{ comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <dialog id="commentDialog" class="rounded-lg p-4 shadow-lg">
      <h3 class="text-xl font-semibold mb-4">Add Comment</h3>
      <textarea v-model="newComment" rows="4" class="w-full p-2 border rounded mb-4" placeholder="Type your comment here..."></textarea>
      <button @click="addComment" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Add Comment
      </button>
      <button @click="closeCommentDialog" class="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400">
        Cancel
      </button>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const store = useStore();
const newComment = ref('');
const router = useRouter();

const posts = ref([
  {
    id: 1, // Add unique ID for default posts
    title: 'Amazing Landscape',
    content: 'Check out this beautiful landscape!',
    mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBpIKuCzK9AxZZkrdE5Fr_m4dKr1aPavnK6w&s',
    type: 'image',
    liked: false,
    likes: 10,
    comments: ['Stunning view!']
  },
  {
    id: 2, // Add unique ID for default posts
    title: 'Incredible Video',
    content: 'Watch this amazing video!',
    mediaUrl: 'https://youtu.be/tt2k8PGm-TI', // Updated URL
    type: 'video',
    liked: false,
    likes: 25,
    comments: ['Wow, impressive!']
  },
  {
    id: 3, // Add unique ID for default posts
    title: 'Another Beautiful Image',
    content: 'Another image to admire!',
    mediaUrl: 'https://miro.medium.com/v2/resize:fit:1200/1*udvSMrSVGOgD4fxjMJHbOw.jpeg',
    type: 'image',
    liked: false,
    likes: 5,
    comments: []
  }
]);

const openCommentDialog = (post: { id: number; }) => {
  const dialog = document.getElementById('commentDialog');
  if (dialog) {
    dialog.showModal();
    dialog.dataset.postId = post.id.toString();
  }
};

const closeCommentDialog = () => {
  const dialog = document.getElementById('commentDialog');
  if (dialog) {
    dialog.close();
    newComment.value = '';
  }
};

const addComment = () => {
  const dialog = document.getElementById('commentDialog');
  const postId = dialog ? dialog.dataset.postId : null;
  if (postId && newComment.value) {
    const post = posts.value.find(p => p.id === parseInt(postId));
    if (post) {
      post.comments.push(newComment.value);
    }
    closeCommentDialog();
  }
};

const toggleLike = (post: { liked: boolean; likes: number; id: number; }) => {
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
};

const navigateToCreatePost = () => {
  router.push('/create-post');
};

const navigateToProfile = () => {
  router.push('/profile');
};

onMounted(async () => {
  const fetchedPosts = await store.fetchPosts();
  if (fetchedPosts) {
    posts.value = [...posts.value, ...fetchedPosts];
  }
});
</script>

<style scoped>
/* Additional styling */
</style>
