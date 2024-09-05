import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router configuration
import { createPinia } from 'pinia'; // Import Pinia for state management

const app = createApp(App);

app.use(router); // Use the router
app.use(createPinia()); // Use Pinia

app.mount('#app');
