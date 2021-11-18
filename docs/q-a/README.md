# Q&A

## 组件的缩略策略是怎么样的？

`vue-ellipsis-component` 根据传入参数的复杂度采用不同的缩略方案：

1. 常规缩略：利用 css `-webkit-line-clamp` 属性进行缩略；
2. 动态计算缩略：利用 JavaScript 动态计算得出缩略点，再进行文本内容的裁剪；

当满足以下条件时，将会采用常规缩略，最大程度利用原生能力：

1. 浏览器支持 `-webkit-line-clamp` 属性；
2. 未设置 `visibleHeight`、`maxLine`、`maxHeight`、`endExcludes`、`onReflow`、`onEllipsisClick` 属性；
3. `ellipsisNode` 未设置成 `...` 以外的字符；

若是不满足以上条件，则采用动态计算缩略。

## 为什么推荐主动设置 `line-height`？

在满足常规策略的情况下，是否主动设置 `line-height` 其实对缩略结果并没有影响，而在进行动态计算缩略时 `line-height` 则有可能会导致缩略结果不如预期；

动态计算的缩略策略，是根据 `line-height` 与传入的 `visibleLine` 进行计算得出一个可见高度，再利用可见高度和当前容器的高度做比较，从而判断是否需要进行文本裁剪。可以看出，这一过程很大程度地依赖 `line-height`；当 `line-height` 为默认值 `normal` 时，实际的行高取决于浏览器，但各个浏览器的取值可能不太一致。`vue-ellipsis-component` 会兼容 `line-height: normal` 的情况，但为了保证在不同浏览器的缩略效果一致，最好还是主动设置一个 `line-height`！
