// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';  // or any other theme you prefer
import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(PrimeVue); // Register PrimeVue
app.mount('#app');
