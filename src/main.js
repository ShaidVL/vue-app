import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import BuyModalComponent from './components/Shared/BuyModal'
import * as fb from 'firebase'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyDez8Exo7SFzJfr-VVQwlsp-3Rq4zNZMoY',
      authDomain: 'itc-ads-4cea9.firebaseapp.com',
      databaseURL: 'https://itc-ads-4cea9.firebaseio.com',
      projectId: 'itc-ads-4cea9',
      storageBucket: 'itc-ads-4cea9.appspot.com',
      messagingSenderId: '189295193873',
      appId: '1:189295193873:web:e1495177590e831e4426b0',
      measurementId: 'G-MZFWCKL31H'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
