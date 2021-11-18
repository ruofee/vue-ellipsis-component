<template>
  <div class="wrapper">
    <vue-ellipsis
      :end-excludes="['.', ',']"
      text="除了文本内容全是标点符号.,.,.,">
    </vue-ellipsis>
  </div>
</template>

<style scoped>
.wrapper {
  width: 210px;
}
</style>
