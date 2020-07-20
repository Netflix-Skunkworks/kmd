import { exec as qjsExec, remove, pipe, close } from "os";
import { fdopen } from "std";
import { parse } from "../shell-quote.js";

export const exec = (defaultShellStr) =>
  async function (shellStr) {
    const execStr = shellStr || defaultShellStr;
    let shellCmd = parse(execStr).map((arg) => {
      // console.log("arg is", JSON.stringify(arg))
      return typeof arg === "object" && arg.op === "glob" ? arg.pattern : arg;
    });
    shellCmd = ["sh", "-c", execStr];
    const err = {};
    const out = pipe();
    // console.log("running", JSON.stringify(shellCmd));
    const exitCode = qjsExec(shellCmd, {
      stdout: out[1],
    });
    close(out[1]);
    if (exitCode !== 0) {
      throw new Error(`Error running exec, exit code: ${exitCode}`);
    } else {
      const stream = fdopen(out[0], "r");
      const result = stream.readAsString();
      return result;
    }
  };
