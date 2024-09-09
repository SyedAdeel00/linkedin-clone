import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from '../store';
import FeedPage from '../views/FeedPage.vue';
import CreatePost from '../views/CreatePost.vue';
import ProfilePage from '../views/ProfilePage.vue';
import LoginPage from '../views/LoginPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/feed', component: FeedPage, meta: { requiresAuth: true } },
  { path: '/create-post', component: CreatePost, meta: { requiresAuth: true } },
  { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const store = useStore();
  if (to.meta.requiresAuth && !store.user) {
    next('/login');
  } else {
    next();
  }
});

export default router;
