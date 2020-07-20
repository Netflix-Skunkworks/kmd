import { get } from "./props.js";

export default (template, data) => {
  return template.replace(
    /\{([^}]*)\}/g, // or /{(\w*)}/g for "{this} instead of %this%"
    function (m, key) {
      const val = get(data, key);
      return val || "";
    },
  );
};
