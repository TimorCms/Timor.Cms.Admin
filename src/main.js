import Vue from 'vue'
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';
import '@/main.less'

import App from '@/App.vue'
import router from '@/router'
import httpClient from './core/services/httpclient'

Vue.use(Antd);
Vue.use(httpClient);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
