import Vue, { VueConstructor } from 'vue';

declare class VueEllipsis extends Vue {
  text: string;
  visibleLine: number;
  visibleHeight: number | string;
  maxLine: number;
  maxHeight: number | string;
  ellipsis: boolean;
  ellipsisNode: string;
  endExcludes: Array<string>;
  useInnerHtml: boolean;
  reflowOnResize: boolean;
  onReflow: (ellipsis: boolean, text: string) => void;
  onEllipsisClick: () => void;
}
export { VueEllipsis };

declare const _default: {
  install(Vue: VueConstructor): void;
};
export default _default;
