import { createApp, reactive } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import GlobalStore from './GlobalStore';

const app = createApp(App);

app.provide('GlobalStore', GlobalStore);

app.use(createPinia());
app.use(router);

app.mount('#app');
