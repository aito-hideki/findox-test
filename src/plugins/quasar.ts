import { App } from 'vue'
import { Quasar, Notify, Dark } from 'quasar'
import iconSet from 'quasar/icon-set/mdi-v6'

import 'quasar/dist/quasar.css'
import '@mdi/font/css/materialdesignicons.min.css'

export default {
  install: (app: App<Element>) => {
    Dark.set(true)

    app.use(Quasar, {
      iconSet,
      plugins: {
        Notify
      },
      config: {
        brand: {
          primary: '#5CAFD5',
          secondary: '#E7ECF0',
          accent: '#734BE2',
          dark: '#151A2F',
          positive: '#21BA45',
          negative: '#C10015',
          info: '#31CCEC',
          warning: '#F0AD4E'
        }
      }
    })
  }
}
