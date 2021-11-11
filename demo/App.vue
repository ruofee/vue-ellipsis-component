<template>
  <div id="app">
    <div class="ellipsis-wrapper">
      <vue-ellipsis
        :visible-line="1"
        :text="text"
        ellipsis-node="...."
        reflowOnResize>
      </vue-ellipsis>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
})
export default class App extends Vue {
  private text = '这是一段非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的话';
}
</script>

<style scoped>
.ellipsis-wrapper {
  width: 400px;
  resize: horizontal;
  overflow: hidden;
  padding: 10px 12px;
  border-radius: 4px;
  background-color: #eee;
}
#app {
  width: 200px;
  line-height: 16px;
}
</style>
