import { loadFile } from "std";

export const cat = () =>
  (filename) => {
    return loadFile(filename);
  };
