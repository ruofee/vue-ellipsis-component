<template>
  <div class="wrapper">
    <vue-ellipsis
      :visible-line="2"
      text="这是一段非常非常非常非常非常非常非常非常非常非常非常长的话">
      <template v-slot:ellipsisNode>
        <a>-。-</a>
      </template>
    </vue-ellipsis>
  </div>
</template>

<style scoped>
.wrapper {
  width: 200px;
}
</style>
