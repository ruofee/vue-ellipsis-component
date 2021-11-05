<template>
  <div
    :class="['vue-ellipsis-native', { ellipsis }]"
    :style="{ WebkitLineClamp: maxLine }">
    <span v-if="useInnerHtml" v-html="text" />
    <span v-else>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'native-ellipsis',
})
export default class extends Vue {
  @Prop({ type: String })
  private readonly text!: string;

  @Prop({ type: Number })
  private readonly maxLine!: number;

  @Prop({ type: Boolean })
  private readonly ellipsis!: boolean;

  @Prop({ type: Boolean })
  private readonly useInnerHtml!: boolean;
}
</script>

<style scoped>
.vue-ellipsis-native.ellipsis {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  -webkit-box-orient: vertical;
}
</style>
