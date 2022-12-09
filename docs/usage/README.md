# 使用

::: tip 提示
以下的 demo 统一设置 `line-height: 16px`，主动设置 `line-height` 也是推荐的做法，具体查看：[为什么推荐主动设置 line-height](/q-a/#为什么推荐主动设置-line-height)
:::

## 最简单的使用

`text` 是需要进行缩略的文本内容，默认超过一行时进行缩略。

<code-wrapper name="getting-started-basic-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-basic-demo.vue

## 超过某行时进行缩略

通过 `visibleLine` 设置可见行数，当文本内容超过可见行数时进行缩略。

<code-wrapper name="getting-started-visible-line-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-visible-line-demo.vue

## 超过某个高度时进行缩略

通过 `visibleHeight` 设置可见高度，当文本高度超过可见高度时进行缩略。`visibleHeight` 的优先级比 `visibleLine` 高，同时设置 `visibleHeight` 和 `visibleLine` 时将会以 `visibleHeight` 为准。

<code-wrapper name="getting-started-visible-height-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-visible-height-demo.vue

## 自定义缩略符

通过设置 `ellipsisNode` 自定义缩略符。

<code-wrapper name="getting-started-ellipsis-node-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-ellipsis-node-demo.vue

也可以通过 `slot` 将自定义缩略符设置为一段 HTML：

<code-wrapper name="getting-started-ellipsis-node-slot-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-ellipsis-node-slot-demo.vue

::: tip 注意
该 `slot` 将会覆盖 `ellipsisNode` 属性。
:::

## 控制组件是否进行缩略

`ellipsis` 为 `false` 的时候组件不进行文本缩略。

<code-wrapper name="getting-started-ellipsis-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-ellipsis-demo.vue

## 富文本缩略

设置 `useInnerHtml` 时，会把 `text` 作为 HTML 进行缩略处理。

<code-wrapper name="getting-started-use-inner-html-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-use-inner-html-demo.vue

## 尾文本过滤

通过设置 `endExcludes` 过滤尾文本，支持使用字符串和正则表达式。

<code-wrapper name="getting-started-end-excludes-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-end-excludes-demo.vue

## 自适应缩略

设置 `reflowOnResize` 时，将会开启自适应缩略。在不同情况下将会采用不同的策略进行自适应缩略，具体规则查看：[组件的缩略策略是怎么样的](/q-a/#组件的缩略策略是怎么样的)

<code-wrapper name="getting-started-reflow-on-resize-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-reflow-on-resize-demo.vue

## 比较少见的功能：超过 n 行时展示 m 行

在设置了 `visibleLine` 的基础上，通过设置 `maxLine`，可以实现超过 n 行时只展示 m 行的功能，`visibleLine` 必须小于 `maxLine` 才会生效。

<code-wrapper name="getting-started-max-line-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-max-line-demo.vue

这种场景可能会比较少见，但实现其他组件库不支持的功能，我辈义不容辞 (○｀ 3′○) 🎉 恭喜 EDG！

## 姐妹需求：超过高度 n 时，展示高度 m

这是 “超过 n 行时展示 m 行” 的姐妹需求，因此对应的 api 使用方式也非常相似：

在设置了 `visibleHeight` 的基础上，通过设置 `maxHeight`，可以实现超过高度 n 时，展示高度 m 的功能，`visibleHeight` 必须小于 `maxHeight` 才会生效。

`maxHeight` 的优先级高于 `maxLine`，当同时设置两者时，将会以 `maxHeight` 为准。

<code-wrapper name="getting-started-max-height-demo"></code-wrapper>

<<< @/docs/.vuepress/components/getting-started-max-height-demo.vue

`visibleLine`、`visibleHeight` 和 `maxLine`、`maxHeight` 之间可以相互配合，达到超过 n 行时展示高度 m 的效果，也可以达到超过高度 n 时展示 m 行的效果，这取决于你怎么使用。
