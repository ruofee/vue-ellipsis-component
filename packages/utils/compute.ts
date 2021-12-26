/**
 * Return the current style of an element.
 * @param {HTMLElement} element The element to compute.
 * @param {string} prop The style property.
 * @returns {number}
 */
export function computeStyle(element: HTMLElement, prop: string): string {
  if (!window.getComputedStyle) {
    // IE
    (window as any).getComputedStyle = function(el: any) {
      this.getPropertyValue = function(key: string) {
        const regex = /(-([a-z]){1})/g;

        if (key === 'float') {
          key = 'styleFloat';
        }

        if (regex.test(key)) {
          key = key.replace(regex, function() {
            return arguments[2].toUpperCase();
          });
        }

        return el.currentStyle && el.currentStyle[key] ? el.currentStyle[key] : null;
      };
      return this;
    };
  }

  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

/**
 * Return the line-height of an element.
 * @param {HTMLElement} element The element to get line-height.
 * @returns {number}
 */
export function getLineHeight(element: HTMLElement): number {
  const lineHeight = computeStyle(element, 'line-height');

  if (lineHeight === 'normal') {
    // Create a temp element to get line-height
    const dom = document.createElement('span');
    dom.style.width = '300px';
    dom.style.position = 'absolute';
    dom.style.visibility = 'hidden';
    dom.innerText = 'ruofee';
    element.appendChild(dom);
    const height = dom.clientHeight;
    element.removeChild(dom);
    // Compatible some browser
    return height * 1.1;
  }

  return parseInt(lineHeight, 10);
}

export function registerWordBreak(element: HTMLElement): string | void {
  const wordBreak = computeStyle(element, 'word-break');
  const overflowWrap = computeStyle(element, 'overflow-wrap');

  if (wordBreak !== 'word-break' && wordBreak !== 'break-all' && overflowWrap !== 'break-word') {
    const styleWordBreak = element.style.wordBreak;
    element.style.wordBreak = 'break-word';
    return styleWordBreak;
  }
}

export function setWordBreak(element: HTMLElement, value: string): void {
  element.style.wordBreak = value;
}

/**
 * Return the middle value
 * @param {number} l
 * @param {number} r
 * @returns {number}
 */
function getMiddle(l: number, r: number): number {
  return Math.floor((l + r) / 2);
}

export function binarySearch(
  l: number,
  r: number,
  handle: (l: number, r: number, m: number) => boolean,
  handleResult: (l: number, r: number, m: number) => boolean): void {
  while (l < r) {
    const m = getMiddle(l, r);
    if (handleResult(l, r, m)) {
      break;
    }
    if (handle(l, r, m)) {
      r = m;
    } else {
      l = m;
    }
  }
}
