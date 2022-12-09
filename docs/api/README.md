# API

## Props

| 属性名          | 类型                                      | 默认值   | 描述                                                         |
| --------------- | ----------------------------------------- | -------- | ------------------------------------------------------------ |
| text            | string                                    | Required | 需要进行缩略的文本                                           |
| visibleLine     | number                                    | 1        | 文本可见行数；超过该行数时文本会进行裁剪。`visibleLine` 不可大于 `maxLine` |
| visibleHeight   | number                                    |          | 文本可见高度；超过该高度时文本会进行裁剪，优先级高于 `visibleLine`。`visibleHeight` 不可大于 `maxHeight` |
| ellipsis        | boolean                                   | true     | 是否开启缩略                                                 |
| ellipsisNode    | string                                    | ...      | 自定义缩略符                                                 |
| endExcludes     | Array<string \| RegExp>                   | []       | 结尾处希望被过滤掉的字符（在缩略符之前），支持传入字符串和正则表达式    |
| useInnerHtml    | boolean                                   | false    | 将 `text` 当做 HTML 进行缩略（请确保传递的 text 安全可靠，否则可能导致 XSS 安全问题） |
| reflowOnResize  | boolean                                   |          | 容器大小改变时是否重新布局，原生缩略支持时默认是 true，否则为 false |
| onReflow        | (ellipsis: boolean, text: string) => void |          | 重排完成回调事件。参数 `ellipsis` 表示文本是否被截断；参数 `text` 为可见文本（不包含缩略符） |
| onEllipsisClick | () => void                                |          | 缩略符点击回调事件                                           |

## Slots

| 名称         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| ellipsisNode | 自定义缩略符，优先级高于 `ellipsisNode` 属性，若是同时设置，则以 `slot` 为准 |

