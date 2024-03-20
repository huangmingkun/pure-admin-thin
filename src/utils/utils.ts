// 自定义防抖函数，支持传入等待时间(wait)、立即执行标识(immediate)等参数。
export const customDebounce = function (
  fn: Function,
  wait = 500,
  immediate: boolean
) {
  let timeID: number | null;
  let flag = false;
  return function (...args: any[]) {
    // 控制每轮第一次进来时，都会执行一次函数，flag=true，并return
    if (!timeID && !flag && immediate) {
      fn.apply(this, args);
      flag = true;
      // 设置一个定时器，在wait毫秒后，将flag设置为false
      // 防止用户每轮都是一次一次触发事件，导致flag一直为true，导致下一轮第一次无法再次触发事件
      setTimeout(() => {
        flag = false;
      }, wait);
      return;
    }
    if (timeID) {
      clearTimeout(timeID);
    }
    timeID = setTimeout(() => {
      fn.apply(this, args);
      timeID = null;
      // 控制每轮第二次执行操作时，设置flag为false
      // 使得下一轮进来时，可以立刻执行一次函数
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
