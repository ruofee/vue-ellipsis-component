import { VueConstructor } from 'vue';
import VueEllipsis from '../../packages/index.vue';
import { mount, MountOptions } from '@vue/test-utils';

const getWrapper = (options?: MountOptions<Vue>) => mount(VueEllipsis as VueConstructor, options);
const text = '这是一段非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的文本';
const html = '<b>这是一段</b>非常非常非常非常非常非常非常非常非常非常非常非常非常长的文本';

describe('vue-ellipsis.vue', () => {
  it('[native-ellipsis] 是否使用 native-ellipsis 组件', () => {
    const wrapper = getWrapper({
      propsData: { text },
    });

    expect(wrapper.find('.vue-ellipsis-native').element).not.toBeUndefined();
  });

  it('[native-ellipsis] 文本内容是否正常渲染', () => {
    const wrapper = getWrapper({
      propsData: { text },
    });

    expect(wrapper.text()).toBe(text);
  });

  it('[native-ellipsis] visibleLine 是否生效', () => {
    const visibleLine = 2;
    const wrapper = getWrapper({
      propsData: {
        text,
        visibleLine,
      },
    });

    const el = wrapper.find('.vue-ellipsis-native').element;

    expect(parseInt((el as HTMLElement)?.style?.webkitLineClamp, 10)).toBe(visibleLine);
  });

  it('[native-ellipsis] useInnerHtml 是否生效', () => {
    const wrapper = getWrapper({
      propsData: {
        text: html,
        useInnerHtml: true,
      },
    });

    expect(wrapper.find('.vue-ellipsis-native-html').element).not.toBeUndefined();
  });

  it('[native-ellipsis] ellipsis 是否生效', () => {
    const wrapper = getWrapper({
      propsData: {
        text,
        ellipsis: false,
      },
    });

    expect(wrapper.find('.ellipsis').element).toBeUndefined();
  });

  it('[js-ellipsis] onEllipsisClick 是否生效', () => {
    let haveBeenCalled = false;

    const wrapper = getWrapper({
      propsData: {
        text,
        onEllipsisClick() {
          haveBeenCalled = true;
        },
      },
    });

    wrapper.find('.vue-ellipsis-js-ellipsis').trigger('click');
    expect(haveBeenCalled).toBeTruthy();
  });

  it('[js-ellipsis] onReflow 是否生效', () => {
    let haveBeenCalled = false;

    getWrapper({
      propsData: {
        text,
        onReflow() {
          haveBeenCalled = true;
        },
      },
    });

    expect(haveBeenCalled).toBeTruthy();
  });

  it('[js-ellipsis] useInnerHtml 是否生效', () => {
    const wrapper = getWrapper({
      propsData: {
        text: html,
        useInnerHtml: true,
        onReflow() {},
      },
    });

    expect(wrapper.find('.vue-ellipsis-js-content').text()).toBe('这是一段非常非常非常非常非常非常非常非常非常非常非常非常非常长的文本');
  });

  it('[js-ellipsis] ellipsisNode 是否生效', () => {
    const ellipsisNode = '777777';

    const wrapper = getWrapper({
      propsData: {
        text,
        ellipsisNode,
      },
    });

    expect(wrapper.find('.vue-ellipsis-js-ellipsis').text()).toBe(ellipsisNode);
  });
});
