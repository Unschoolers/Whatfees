import { createMarketingApp } from './create-app.js'
import './style.css'

createMarketingApp({ initialLanguage: document.documentElement.lang }).mount('#app')
