// a throttle function using window.requestAnimationFrame
export function frameThrottle(fn: (...args: any[]) => any): (...args: any[]) => any {
  let lock = false;
  return (...args: any[]) => {
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
export function throttle(fn: (...args: any[]) => any, threshold = 60): (...args: any[]) => any {
  let last: number;
  let timer: number;

  return (...args: any[]) => {
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
