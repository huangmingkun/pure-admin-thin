// 自定义防抖函数，支持传入参数和立即执行。
export const customDebounce = function (
  fn: Function,
  wait = 500,
  immediate = false
) {
  let timeID: number | null;
  let flag = false;
  return function (...args: any[]) {
    if (!timeID && !flag && immediate) {
      fn.apply(this, args);
      flag = true;
      return;
    }
    if (timeID) {
      clearTimeout(timeID);
    }
    timeID = setTimeout(() => {
      fn.apply(this, args);
      timeID = null;
      flag = false;
    }, wait) as unknown as number;
  };
};

// 自定义节流函数，支持传入参数和立即执行。
export const customThrottle = function (fn: Function, wait = 500) {
  let timeID: number | null;
  return function (...args: any[]) {
    if (timeID) {
      return;
    }
    timeID = setTimeout(() => {
      fn.apply(this, args);
      timeID = null;
    }, wait) as unknown as number;
  };
};
