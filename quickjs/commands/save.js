function set(object, path, value) {
  const root = object;

  const pathArray = path.split(".");
  for (let i = 0; i < pathArray.length; i++) {
    const p = pathArray[i];
    if (typeof object[p] === 'undefined') {
      object[p] = {};
    }
    if (i === pathArray.length - 1) {
      object[p] = value;
    }
    object = object[p];
  }

  return root;
}

export const save = (key) => {
  // need this function syntax to get the right this binding
  return function (value) {
    if (!value) return;
    set(this, key, value);
    return value;
  };
};
