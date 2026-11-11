import { createApp } from 'vue'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './style.css'
import App from './App.vue'
import { vReveal } from './directives/reveal'

createApp(App).directive('reveal', vReveal).mount('#app')
