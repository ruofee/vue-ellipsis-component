<template>
  <div class="vue-ellipsis">
    <native-ellipsis
      v-if="useNativeEllipsis"
      :text="text"
      :visible-line="visibleLine"
      :ellipsis="ellipsis"
      :use-inner-html="useInnerHtml" />
    <js-ellipsis
      v-else
      :text="text"
      :use-inner-html="useInnerHtml"
      :visible-line="visibleLine"
      :visible-height="visibleHeight"
      :max-line="maxLine"
      :max-height="maxHeight"
      :ellipsis="ellipsis"
      :end-excludes="endExcludes"
      :reflow-on-resize="reflowOnResize"
      :on-reflow="onReflow"
      :on-ellipsis-click="onEllipsisClick"
      :on-unellipsis-click="onUnellipsisClick">
      <template v-slot:ellipsisNode>
        <template v-if="!$slots.ellipsisNode">{{ ellipsisNode }}</template>
        <slot name="ellipsisNode"></slot>
      </template>
      <template v-if="unellipsisNode || $slots.unellipsisNode" v-slot:unellipsisNode>
        <slot v-if="$slots.unellipsisNode" name="unellipsisNode"></slot>
        <template v-else>{{ unellipsisNode }}</template>
      </template>
    </js-ellipsis>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import NativeEllipsis from './components/NativeEllipsis.vue';
import JsEllipsis from './components/JsEllipsis.vue';
import { isSupportNativeEllipsis } from './utils/is';
import { ELLIPSIS_NODE } from './const';

function getDefaultEndExcludes(): (string | RegExp)[] {
  return [];
}

@Component({
  name: 'vue-ellipsis',
  components: {
    NativeEllipsis,
    JsEllipsis,
  },
})
export default class VueEllipsisComponent extends Vue {
  @Prop({ type: String, required: true })
  private readonly text!: string;

  @Prop({ type: Number, default: 1 })
  private readonly visibleLine!: number;

  @Prop({ type: Number })
  private readonly visibleHeight!: number;

  @Prop({ type: Number })
  private readonly maxLine!: number;

  @Prop({ type: Number })
  private readonly maxHeight!: number;

  @Prop({ type: Boolean, default: true })
  private readonly ellipsis!: boolean;

  @Prop({ type: String, default: ELLIPSIS_NODE })
  private readonly ellipsisNode!: string;

  @Prop({ type: String })
  private readonly unellipsisNode!: string;

  @Prop({ type: Array, default: getDefaultEndExcludes })
  private readonly endExcludes!: (string | RegExp)[];

  @Prop({ type: Boolean, default: false })
  private readonly useInnerHtml!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly reflowOnResize!: boolean;

  @Prop({ type: Function })
  private readonly onReflow!: (ellipsis: boolean, text: string) => void;

  @Prop({ type: Function })
  private readonly onEllipsisClick!: () => void;

  @Prop({ type: Function })
  private readonly onUnellipsisClick!: () => void;

  private get useNativeEllipsis(): boolean {
    const useNativeEllipsis =
      isSupportNativeEllipsis &&
      (typeof this.maxLine === 'undefined' || this.maxLine === this.visibleLine) &&
      this.endExcludes.length === 0 &&
      this.ellipsisNode === ELLIPSIS_NODE &&
      typeof this.$slots.ellipsisNode === 'undefined' &&
      !this.unellipsisNode &&
      typeof this.$slots.unellipsisNode === 'undefined' &&
      typeof this.maxHeight === 'undefined' &&
      typeof this.visibleHeight === 'undefined' &&
      typeof this.onReflow === 'undefined' &&
      typeof this.onEllipsisClick === 'undefined' &&
      typeof this.onUnellipsisClick === 'undefined';

    return useNativeEllipsis;
  }
}
</script>
