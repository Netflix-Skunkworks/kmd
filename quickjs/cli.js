import * as std from "std";
import { runScript } from "./index.js";

async function process(scripts) {
  let results = {};
  for (const s of scripts) {
    const result = await runScript(s);
    results = Object.assign(results, result);
  }
  console.log(JSON.stringify(results));
}

const scripts = scriptArgs.slice(1)
  .map((s) => std.loadFile(s));

process(scripts).catch((err) => {
  console.log(err);
  console.log(err.stack);
  std.exit(1);
});
