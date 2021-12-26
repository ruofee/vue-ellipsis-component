import { computeStyle, getLineHeight, registerWordBreak, binarySearch } from '../../../packages/utils/compute';
import { createDiv } from '../../utils';

describe('computed.ts', () => {
  it('computeStyle', () => {
    const div = createDiv();
    const height = '500px';
    div.style.height = height;
    expect(computeStyle(div, 'height')).toBe(height);
  });

  it('computeStyle: ie', () => {
    const getComputedStyle = window.getComputedStyle;
    (window as any).getComputedStyle = undefined;
    const div = createDiv();
    (div as any).currentStyle = {
      height: '500px',
    };
    expect(computeStyle(div, 'height')).toBe('500px');
    window.getComputedStyle = getComputedStyle;
  });

  it('getLineHeight', () => {
    const div = createDiv();
    div.style.lineHeight = '16px';
    expect(getLineHeight(div)).toBe(16);
  });

  it('getLineHeight: line-height is normal', () => {
    const div = createDiv();
    div.style.lineHeight = 'normal';
    expect(getLineHeight(div)).not.toBe(16);
  });

  it('registerWordBreak', () => {
    const div = createDiv();
    registerWordBreak(div);
    expect(div.style.wordBreak).toBe('break-word');
  });

  it('binarySearch', () => {
    const target = 67;
    const sortedArr = [1, 20, 32, 41, 55, target, 70];
    let i = 0;
    binarySearch(
      0,
      sortedArr.length,
      (l, r, m) => m < target,
      (l, r, m) => {
        i += 1;
        return m === target;
      },
    );
    expect(i < 5).toBeTruthy();
  });
});
