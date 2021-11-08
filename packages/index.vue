<template>
  <div :class="['vue-ellipsis', className]">
    <native-ellipsis
      v-if="useNativeEllipsis"
      :text="text"
      :max-line="maxLine"
      :ellipsis="ellipsis"
      :use-inner-html="useInnerHtml" />
    <js-ellipsis
      v-else
      :text="text"
      :use-inner-html="useInnerHtml"
      :max-line="maxLine"
      :visible-line="visibleLine"
      :max-height="maxHeight"
      :visible-height="visibleHeight"
      :ellipsis="ellipsis"
      :ellipsis-node="ellipsisNode"
      :end-excludes="endExcludes"
      :reflow-on-resize="reflowOnResize"
      :reflow-threshold-on-resize="reflowThresholdOnResize"
      :on-reflow="onReflow"
      :on-ellipsis-click="onEllipsisClick">
      <template v-slot:ellipsisNode>
        <template v-if="!$slots.ellipsisNode">{{ ellipsisNode }}</template>
        <slot name="ellipsisNode"></slot>
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

function getDefaultEndExcludes(): string[] {
  return [];
}

@Component({
  name: 'vue-ellipsis',
  components: {
    NativeEllipsis,
    JsEllipsis,
  },
})
export default class extends Vue {
  @Prop({ type: String, required: true })
  private readonly text!: string;

  @Prop({ type: Number, default: 1 })
  private readonly maxLine!: number;

  @Prop({ type: Number })
  private readonly visibleLine!: number;

  @Prop({ type: Number })
  private readonly maxHeight!: number;

  @Prop({ type: Number })
  private readonly visibleHeight!: number;

  @Prop({ type: String })
  private readonly className!: string;

  @Prop({ type: Boolean, default: true })
  private readonly ellipsis!: boolean;

  @Prop({ type: String, default: ELLIPSIS_NODE })
  private readonly ellipsisNode!: string;

  @Prop({ type: Array, default: getDefaultEndExcludes })
  private readonly endExcludes!: string[];

  @Prop({ type: Boolean, default: false })
  private readonly useInnerHtml!: boolean;

  @Prop({ type: Boolean, default: false })
  private readonly reflowOnResize!: boolean;

  @Prop({ type: Number })
  private readonly reflowThresholdOnResize!: number;

  @Prop({ type: Function })
  private readonly onReflow!: (ellipsis: boolean, text: string) => void;

  @Prop({ type: Function })
  private readonly onEllipsisClick!: () => void;

  private get useNativeEllipsis(): boolean {
    const useNativeEllipsis =
      isSupportNativeEllipsis &&
      this.endExcludes.length === 0 &&
      this.ellipsisNode === ELLIPSIS_NODE &&
      typeof this.$slots.ellipsisNode === 'undefined' &&
      typeof this.visibleLine === 'undefined' &&
      typeof this.maxHeight === 'undefined' &&
      typeof this.visibleHeight === 'undefined' &&
      typeof this.onReflow === 'undefined' &&
      typeof this.onEllipsisClick === 'undefined';

    return useNativeEllipsis;
  }
}
</script>
