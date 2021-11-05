import { VueConstructor } from 'vue';
import VueEllipsis from './index.vue';

export default {
  install(Vue: VueConstructor): void {
    Vue.component('vue-ellipsis', VueEllipsis);
  },
};

export {
  VueEllipsis,
};
