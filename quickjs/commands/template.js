import simpleTemplate from "../simple-template.js";

export const template = (templateString) => {
  return function (vars) {
    const data = typeof vars === "string" ? { input: vars } : vars;
    return simpleTemplate(templateString, Object.assign({}, this, data));
  };
};
