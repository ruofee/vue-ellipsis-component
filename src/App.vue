<template>
  <div id="app">
    <div class="ellipsis-wrapper">
      <vue-ellipsis
        :max-height="40"
        reflowOnResize
        text="这是一段非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的话">
      </vue-ellipsis>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
})
export default class App extends Vue {}
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
</style>
