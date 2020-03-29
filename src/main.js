import Vue from 'vue'
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';
import '@/main.less'

import App from '@/App.vue'
import router from '@/router'

Vue.use(Antd);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
