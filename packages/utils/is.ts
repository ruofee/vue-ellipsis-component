export function isNull(variable: unknown): boolean {
  return variable === null;
}

export function isString(variable: unknown): boolean {
  return typeof variable === 'string';
}

export function isFunction(variable: unknown): boolean {
  return typeof variable === 'function';
}

export const isArray = Array.isArray;

export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/** Whether the environment support -webkit-line-clamp. */
export const isSupportNativeEllipsis = isBrowser && typeof document.body.style.webkitLineClamp !== 'undefined';

/** Whether the environment support ResizeObserver. */
export const isSupportResizeObserver = isBrowser && typeof ResizeObserver !== 'undefined';
