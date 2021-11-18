<template>
  <div class="wrapper">
    <vue-ellipsis
      :visible-line="2"
      use-inner-html
      text="<b>这是一段</b><u>非常非常非常非常非常非常非常非常非常非常非常长</u>的话">
    </vue-ellipsis>
  </div>
</template>

<style scoped>
.wrapper {
  width: 200px;
}
</style>
