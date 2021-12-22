import Vue from 'vue';
import Install, { VueEllipsis } from '../../packages/main';
import VueEllipsisComponent from '../../packages/index.vue';

describe('main.ts', () => {
  it('Global Install', () => {
    Vue.use(Install.install);
    const components = (Vue as any).options.components;
    expect(Object.keys(components).includes('vue-ellipsis')).toBeTruthy();
  });

  it('Single Component Install', () => {
    Vue.component('vue-ellipsis', VueEllipsis);
    const components = (Vue as any).options.components;
    expect(Object.keys(components).includes('vue-ellipsis')).toBeTruthy();
  });
});
