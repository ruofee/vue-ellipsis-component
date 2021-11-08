// a throttle function using window.requestAnimationFrame
export function frameThrottle(fn: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown {
  let lock = false;
  return (...args: unknown[]) => {
    if (lock) {
      return;
    }
    lock = true;
    // @ts-ignore
    const context = this;
    window.requestAnimationFrame(() => {
      fn.apply(context, args);
      lock = false;
    });
  };
}

// normal throttle function
export function throttle(fn: (...args: unknown[]) => unknown, threshold = 60): (...args: unknown[]) => unknown {
  let last: number;
  let timer: number;

  return (...args: unknown[]) => {
    // @ts-ignore
    const context = this;
    const now = +new Date();
    if (last && now < last + threshold) {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
