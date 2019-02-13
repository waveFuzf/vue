import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AgoraRTC from 'agora-rtc-sdk'
Vue.config.productionTip = true;

/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.use(AgoraRTC);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
