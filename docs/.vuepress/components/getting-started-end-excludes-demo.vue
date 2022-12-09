<template>
  <div class="wrapper">
    <vue-ellipsis
      :end-excludes="['.', ',', /[1-5]/]"
      text="保留下来的文本内容612345.,.,">
    </vue-ellipsis>
  </div>
</template>

<style scoped>
.wrapper {
  width: 210px;
}
</style>
