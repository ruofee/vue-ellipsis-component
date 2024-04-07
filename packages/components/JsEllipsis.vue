<template>
  <div ref="ref" class="vue-ellipsis-js">
    <span ref="textRef" class="vue-ellipsis-js-content"></span>
    <span
      ref="ellipsisRef"
      class="vue-ellipsis-js-ellipsis"
      @click="handleEllipsisClick">
      <slot name="ellipsisNode"></slot>
    </span>
    <span
      v-if="!ellipsis && $slots.unellipsisNode"
      class="vue-ellipsis-js-unellipsis"
      @click="handleUnellipsisClick">
      <slot name="unellipsisNode"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator';
import { getLineHeight, registerWordBreak, setWordBreak, binarySearch } from '../utils/compute';
import { wrapTextChildNodesWithSpan, getElementHeight } from '../utils/dom';
import { isFunction, isString, isRegExp, isSupportResizeObserver } from '../utils/is';

@Component({
  name: 'js-ellipsis',
})
export default class JsEllipsis extends Vue {
  @Prop({ type: String, required: true })
  private readonly text!: string;

  @Prop({ type: Number })
  private readonly visibleLine!: number;

  @Prop({ type: Number })
  private readonly visibleHeight!: number;

  @Prop({ type: Number })
  private readonly maxLine!: number;

  @Prop({ type: Number })
  private readonly maxHeight!: number;

  @Prop({ type: Boolean })
  private readonly ellipsis!: boolean;

  @Prop({ type: Array })
  private readonly endExcludes!: (string | RegExp)[];

  @Prop({ type: Boolean })
  private readonly useInnerHtml!: boolean;

  @Prop({ type: Boolean })
  private readonly reflowOnResize!: boolean;

  @Prop({ type: Function })
  private readonly onReflow!: (ellipsis: boolean, text: string) => void;

  @Prop({ type: Function })
  private readonly onEllipsisClick!: () => void;

  @Prop({ type: Function })
  private readonly onUnellipsisClick!: () => void;

  @Ref('ref')
  private ref!: HTMLElement;

  @Ref('textRef')
  private textRef!: HTMLElement;

  @Ref('ellipsisRef')
  private ellipsisRef!: HTMLElement;

  private truncating!: boolean;
  private observer!: ResizeObserver;

  @Watch('text')
  @Watch('ellipsis')
  @Watch('useInnerHtml')
  @Watch('maxLine')
  @Watch('visibleLine')
  @Watch('maxHeight')
  @Watch('visibleHeight')
  @Watch('ellipsisNode')
  @Watch('endExcludes')
  private onWatch(): void {
    this.reflow();
  }

  private handleOnReflow(ellipsis: boolean, result: string): void {
    if (this.onReflow && isFunction(this.onReflow)) {
      this.onReflow(ellipsis, result);
    }
  }

  // callback of ellipsis click event
  private handleEllipsisClick() {
    if (this.onEllipsisClick && isFunction(this.onEllipsisClick)) {
      this.onEllipsisClick();
    }
  }

  // callback of unellipsis click event
  private handleUnellipsisClick() {
    this.onUnellipsisClick?.();
  }

  private reflow(): void {
    if (!this.ref || !this.textRef || !this.ellipsisRef || this.truncating) {
      return;
    }

    this.ellipsisRef.style.display = 'none';

    if (this.useInnerHtml) {
      this.textRef.innerHTML = this.text;
    } else {
      this.textRef.innerText = this.text;
    }

    if (!this.ellipsis) {
      return;
    }

    const lineHeight = getLineHeight(this.ref);
    const wordBreak = registerWordBreak(this.textRef);

    const visibleMaxHeight = typeof this.visibleHeight === 'undefined'
      ? lineHeight * this.visibleLine
      : this.visibleHeight;

    const maxHeight = typeof this.maxHeight === 'undefined'
      ? typeof this.maxLine === 'undefined'
        ? visibleMaxHeight
        : lineHeight * this.maxLine
      : this.maxHeight;

    const height = getElementHeight(this.ref);
    // content will be truncated if the content's height bigger than Math.max(maxHeight, visibleMaxHeight).
    if (height <= Math.max(maxHeight, visibleMaxHeight)) {
      this.handleOnReflow(false, this.text);

      if (isString(wordBreak)) {
        setWordBreak(this.textRef, wordBreak);
      }

      return;
    }

    this.truncating = true;
    this.ellipsisRef.style.display = 'inline';

    if (this.useInnerHtml) {
      // wrap the text children node with span element.
      wrapTextChildNodesWithSpan(this.textRef);
      this.truncateHTML(this.ref, this.textRef, visibleMaxHeight);
    } else {
      this.truncateText(this.ref, this.textRef, visibleMaxHeight);
    }

    if (isString(wordBreak)) {
      setWordBreak(this.textRef, wordBreak);
    }

    this.truncating = false;
  }

  private truncateText(container: HTMLElement, textContainer: HTMLElement, max: number) {
    const text = textContainer.textContent || '';
    let currentText = '';
    // Binary truncate text until get the max limit fragment of text.
    binarySearch(
      0,
      text.length,
      (l, r, m) => {
        const temp = text.slice(l, m);
        textContainer.innerText = currentText + temp;
        const height = getElementHeight(container);
        const isExceededMaximun = height > max;
        if (!isExceededMaximun) {
          currentText += temp;
        }
        return isExceededMaximun;
      },
      (l, r, m) => l === m,
    );
    // Remove the exclude char at the end of the content.
    currentText = this.handleEndExcludes(currentText);
    textContainer.innerText = currentText;
    // Callback after reflow.
    this.handleOnReflow(true, currentText);
  }

  private truncateHTML(container: HTMLElement, textContainer: HTMLElement, max: number) {
    // only enter this function when container overflow.
    const children = textContainer.childNodes;
    if (children.length === 0) {
      // remove parent node
      return false;
    }
    if (children.length === 1) {
      const node = children[0] as HTMLElement;
      if (node.nodeType === Node.TEXT_NODE) {
        this.truncateText(container, textContainer, max);
      } else {
        const html = node.innerHTML;
        // clear content to determine whether the empty node can be placed.
        node.innerHTML = '';
        const height = getElementHeight(container);
        if (height > max) {
          // return after remove the node, if overflow with empty node.
          textContainer.removeChild(node);
          this.handleOnReflow(true, textContainer.innerHTML);
          return;
        }
        node.innerHTML = html;
        // recursive truncate node
        this.truncateHTML(container, node, max);
      }
    } else {
      const nodes = [].slice.call(children);
      const _nodes: Array<never> = [];
      // find the critical node
      let i = 0;
      binarySearch(
        0,
        nodes.length,
        (l, r, m) => {
          textContainer.innerHTML = '';
          const currentNodes = nodes.slice(l, m);
          _nodes.forEach(node => {
            textContainer.appendChild(node);
          });
          currentNodes.forEach(node => {
            textContainer.appendChild(node);
          });
          const height = getElementHeight(container);
          const isExceededMaximun = height > max;
          if (!isExceededMaximun) {
            currentNodes.forEach(node => {
              _nodes.push(node);
            });
          }
          return isExceededMaximun;
        },
        (l, r, m) => {
          if (l === m) {
            const height = getElementHeight(container);
            const isExceededMaximun = height > max;
            i = m;
            if (!isExceededMaximun) {
              textContainer.appendChild(nodes[i]);
            }
            return true;
          }
          return false;
        },
      );
      if (textContainer.childNodes[i]) {
        // truncate the critical node
        const truncateResult = this.truncateHTML(container, textContainer.childNodes[i] as HTMLElement, max);
        // if truncateResult be false, it means that node should be removed
        if (truncateResult === false) {
          textContainer.removeChild(textContainer.childNodes[i]);
        }
      }
    }
  }

  private isTextInEndExcludes(text: string) {
    for (const item of this.endExcludes) {
      if (isRegExp(item)) {
        if (item.test(text)) {
          return true;
        }
      } else if (item === text) {
        return true;
      }
    }
    return false;
  }

  private handleEndExcludes(text: string) {
    while (!!text.length && this.isTextInEndExcludes(text[text.length - 1])) {
      text = text.slice(0, -1);
    }
    return text;
  }

  private mounted(): void {
    this.reflow();

    if (this.ref && this.reflowOnResize) {
      if (isSupportResizeObserver) {
        this.observer = new ResizeObserver(this.reflow);
        this.observer.observe(this.ref);
      } else {
        window.addEventListener('resize', this.reflow);
      }
    }
  }

  private beforeDestroy(): void {
    // Remove observer when component unmounted.
    if (isSupportResizeObserver && this.observer) {
      this.observer.disconnect && this.observer.disconnect();
    } else {
      window.removeEventListener('resize', this.reflow);
    }
  }
}
</script>
