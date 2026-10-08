import { createMarketingApp } from './create-app.js'
import { resolveRoute } from './routes.js'
import './style.css'

const route = resolveRoute(window.location.pathname)
createMarketingApp({ initialLanguage: document.documentElement.lang, initialPage: route.id }).mount('#app')
