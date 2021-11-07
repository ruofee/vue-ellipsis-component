import { computeStyle, getLineHeight, registerWordBreak } from '@/packages/VueEllipsis/utils/compute';
import { createDiv } from '../../utils';

describe('computed.ts', () => {
  it('computeStyle', () => {
    const div = createDiv();
    const height = '500px';
    div.style.height = height;
    expect(computeStyle(div, 'height')).toBe(height);
  });

  it('getLineHeight', () => {
    const div = createDiv();
    div.style.lineHeight = '16px';
    expect(getLineHeight(div)).toBe(16);
  });

  it('registerWordBreak', () => {
    const div = createDiv();
    registerWordBreak(div);
    expect(div.style.wordBreak).toBe('break-word');
  });
});
