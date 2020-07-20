export const pipe = (...fns) => {
  return async (input) => {
    let data = {};
    let lastResult = input;
    for (const fn of fns) {
      lastResult = await fn.call(data, lastResult);
    }
    return Object.keys(data).length === 0 ? lastResult : data;
  };
};
