import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { pinia } from './stores'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

const authStore = useAuthStore()
authStore.initialize()

app.mount('#app')
