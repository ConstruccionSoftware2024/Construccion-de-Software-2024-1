import './assets/main.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas, far)

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')