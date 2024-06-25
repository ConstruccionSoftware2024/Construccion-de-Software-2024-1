import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
import { createPinia } from 'pinia';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { createStore } from 'vuex';


import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAqkZ-hjjxrtiF7lmqaNCT51RH6kcRFfF8",
    authDomain: "cheatdetector-86268.firebaseapp.com",
    projectId: "cheatdetector-86268",
    storageBucket: "cheatdetector-86268.appspot.com",
    messagingSenderId: "705559872665",
    appId: "1:705559872665:web:9143cf55fec62e8d4d6408"
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const store = createStore({
    state() {
        return {
            sesionId: '',
            usuario: '',
        };
    },
});

library.add(fas, far);

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);
app.provide('storage', storage);

app.mount('#app');
