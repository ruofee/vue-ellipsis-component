<template>
  <div class="wrapper">
    <vue-ellipsis
      :visible-line="2"
      :max-line="4"
      text="这是一段非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的话"
      reflowOnResize>
    </vue-ellipsis>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 10px 12px;
  width: 150px;
  resize: horizontal;
  border-radius: 4px;
  background-color: #eee;
  overflow: hidden;
}
</style>
