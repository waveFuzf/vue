import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AgoraRTC from 'agora-rtc-sdk';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})
Vue.config.productionTip = true;

/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.use(AgoraRTC);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
