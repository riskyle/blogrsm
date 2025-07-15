import Toast, { type PluginOptions, POSITION, useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
    const options: PluginOptions = {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
    }

    nuxtApp.vueApp.use(Toast, options)

    nuxtApp.provide('toast', useToast())
})
