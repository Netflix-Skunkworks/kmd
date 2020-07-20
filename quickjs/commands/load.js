import { get } from "../props.js";

export const load = (key) =>
  function () {
    return get(this, key);
  };
