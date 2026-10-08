import { createSSRApp } from 'vue'
import App from './App.vue'

export const createMarketingApp = (props = {}) => createSSRApp(App, props)
