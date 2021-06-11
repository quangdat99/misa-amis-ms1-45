import Vue from 'vue'
import App from './App.vue'
import router from './router'

// sử dụng thư viện vue-toast-notification
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';

// sử dụng thư viện vue-tippy
import VueTippy, { TippyComponent } from "vue-tippy";
Vue.use(VueTippy, {
  directive: "tippy",
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      },
      hide: {
        enabled: false
      }
    }
  }
});
Vue.component("tippy", TippyComponent);
import "tippy.js/themes/google.css";


Vue.config.productionTip = false
Vue.use(VueToast);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
