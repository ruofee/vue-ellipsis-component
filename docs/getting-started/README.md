# 快速开始

## 安装

### NPM

推荐使用 npm 或是 yarn 进行组件安装：

```bash
# npm
npm i vue-ellipsis-component
# or yarn
yarn add vue-ellipsis-component
```

## 注册组件

### 全局注册

```javascript
import Vue from 'vue';
import VueEllipsis from 'vue-ellipsis-component';

Vue.use(VueEllipsis);
```

### 在组件中注册

```vue
<script>
import { VueEllipsis } from 'vue-ellipsis-component';

export default {
  components: {
    VueEllipsis,
  },
}
</script>
```
