import { createMarketingApp } from './create-app.js'
import { resolveRoute } from './routes.js'
import './style.css'

const route = resolveRoute(window.location.pathname)
createMarketingApp({ initialLanguage: route.id === 'notFound' ? document.documentElement.lang : route.lang, initialPage: route.id }).mount('#app')
