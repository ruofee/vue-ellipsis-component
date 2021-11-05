export function isUndefined(variable: unknown): boolean {
  return typeof variable === 'undefined';
}

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

export function isEffective(variable: unknown): boolean {
  return !isUndefined(variable) && !isNull(variable);
}

export const isBrowser = !isUndefined(window) && !isUndefined(document);

/** Whether the environment support -webkit-line-clamp. */
export const isSupportNativeEllipsis = isBrowser && !isUndefined(document?.body?.style?.webkitLineClamp);

/** Whether the environment support window.requestAnimationFrame. */
export const isSupportRequestAnimationFrame = isBrowser && !isUndefined(window.requestAnimationFrame);

/** Whether the environment support ResizeObserver. */
export const isSupportResizeObserver = isBrowser && !isUndefined(ResizeObserver);
