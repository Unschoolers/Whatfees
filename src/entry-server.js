import { renderToString } from 'vue/server-renderer'
import { createMarketingApp } from './create-app.js'

export const render = (props = {}) => renderToString(createMarketingApp(props))
