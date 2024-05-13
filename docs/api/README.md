# API

## Props

| 属性名            | 类型                                      | 默认值   | 描述                                                                                                                                                               |
| ----------------- | ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| text              | string                                    | Required | 需要进行缩略的文本                                                                                                                                                 |
| visibleLine       | number                                    | 1        | 文本可见行数；超过该行数时文本会进行裁剪。`visibleLine` 不可大于 `maxLine`                                                                                         |
| visibleHeight     | number                                    |          | 文本可见高度；超过该高度时文本会进行裁剪，优先级高于 `visibleLine`。`visibleHeight` 不可大于 `maxHeight`                                                           |
| ellipsis          | boolean                                   | true     | 是否开启缩略                                                                                                                                                       |
| ellipsisNode      | string                                    | ...      | 自定义缩略符                                                                                                                                                       |
| unellipsisNode    | string                                    |          | 自定义**未缩略符**，仅当 `ellipsis` 为 false 时生效，vue-ellipsis-3 暂未支持                                                                                       |
| endExcludes       | Array<string \| RegExp>                    | []       | 结尾处希望被过滤掉的字符（在缩略符之前），支持传入字符串和正则表达式                                                                                               |
| useInnerHtml      | boolean                                   | false    | 将 `text` 当做 HTML 进行缩略（请确保传递的 text 安全可靠，否则可能导致 XSS 安全问题）                                                                              |
| maxLine           | number                                    |          | 和 `visibleLine` 配合使用，当行数超过 `maxLine` 时缩略成 `visibleLine` 行，具体查看：[超过 n 行时展示 m 行](/usage/#比较少见的功能-超过-n-行时展示-m-行)           |
| maxHeight         | number                                    |          | 和 `visibleHeight` 配合使用，当文本高度超过 `maxHeight` 时缩略成 `visibleHeight`，具体查看：[超过高度 n 时，展示高度 m](/usage/#姐妹需求-超过高度-n-时-展示高度-m) |
| reflowOnResize    | boolean                                   |          | 容器大小改变时是否重新布局，原生缩略支持时默认是 true，否则为 false                                                                                                |
| onReflow          | (ellipsis: boolean, text: string) => void |          | 重排完成回调事件。参数 `ellipsis` 表示文本是否被截断；参数 `text` 为可见文本（不包含缩略符）                                                                       |
| onEllipsisClick   | () => void                                |          | 缩略符点击回调事件                                                                                                                                                 |
| onUnellipsisClick | () => void                                |          | **未缩略符**点击事件，vue-ellipsis-3 暂未支持                                                                                                                      |

## Slots

| 名称           | 描述                                                 |
| -------------- | ---------------------------------------------------- |
| ellipsisNode   | 自定义缩略符，优先级高于 `ellipsisNode` 属性         |
| unellipsisNode | 自定义**未缩略符**，优先级高于 `unellipsisNode` 属性 |

`unellipsisNode`（未缩略符）指的是当 `ellipsis` 为 false 时展示的字符元素，主要使用场景可查看：[#15](https://github.com/ruofee/vue-ellipsis-component/issues/15)。