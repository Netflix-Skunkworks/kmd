export const map = (fn) =>
  async (items) => await Promise.all(items.map(await fn));
