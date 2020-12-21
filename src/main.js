import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import firebase from "firebase"
import VueChatScrill from 'vue-chat-scroll'

Vue.use(VueChatScrill)
Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyCsUi9EuPGTltymI0RuoBLgylbh6eqX8Oc",
  authDomain: "chats-47ff7.firebaseapp.com",
  projectId: "chats-47ff7",
  storageBucket: "chats-47ff7.appspot.com",
  messagingSenderId: "450740909766",
  appId: "1:450740909766:web:6510cf75b88224e81309c7",
  measurementId: "G-BQ91Y09MW0"
});

export const db = firebase.firestore()
// 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
