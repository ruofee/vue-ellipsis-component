<template>
  <div class="code-wrapper">
    <details class="detail" open>
      <summary class="summary">
        <span class="collapse">点击显示/隐藏示例</span>
      </summary>
      <div class="component-wrapper">
        <component :is="name" />
      </div>
    </details>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
}
</script>

<style scoped>
.code-wrapper {
  margin-top: 10px;
}

.detail {
  border-radius: 4px;
  overflow: hidden;
}

.summary {
  padding: 5px 10px;
  color: #fff;
  background-color: #3eaf7c;
  cursor: pointer;
}

.summary:hover {
  background-color: #4abf8a;
}

.component-wrapper {
  padding: 10px;
  border: 1px solid #eee;
  line-height: 16px;
}
</style>
