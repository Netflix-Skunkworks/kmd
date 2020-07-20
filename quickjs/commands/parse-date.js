import fecha from "../fecha.js";
export const parseDate = (format) => (str) => str && fecha.parse(str, format);
