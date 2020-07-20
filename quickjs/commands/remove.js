export const remove = (key) =>
  function () {
    delete this[key];
  };
