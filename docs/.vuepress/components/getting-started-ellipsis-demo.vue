<template>
  <div class="wrapper">
    <div class="checkbox">
      <label>
        <input v-model="ellipsis" type="checkbox">
        <span>是否开启缩略</span>
      </label>
    </div>
    <vue-ellipsis
      :visible-line="2"
      :ellipsis="ellipsis"
      text="这是一段非常非常非常非常非常非常非常非常非常非常非常长的话">
    </vue-ellipsis>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ellipsis: false,
    };
  },
};
</script>


<style scoped>
.wrapper {
  width: 200px;
}

.checkbox {
  margin-bottom: 10px;
}
</style>
