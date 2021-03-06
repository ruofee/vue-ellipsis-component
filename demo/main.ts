import Vue from 'vue';
import App from './App.vue';
import VueEllipsis from '../packages/main';

Vue.config.productionTip = false;

Vue.use(VueEllipsis);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
