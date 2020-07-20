import indentationParser from "./indentation.js";
import * as commands from "./commands/index.js";

const REPLACEMENT_REGEX = /%[\w\d-_]+%/g;

function makeLine(line, lineNum) {
  const [cmd, ...args] = line.trim().split(/\s+/);
  let singleArg = args.join(" ");
  if (!commands[cmd]) {
    throw new Error(`command ${cmd} is not supported`);
  }
  if (cmd !== "extract") {
    // unescape the strings
    singleArg = JSON.parse(`"${singleArg}"`);
  }
  return commands[cmd](singleArg);
}

function makeBlock(lines, { map } = {}) {
  const realLines = lines.filter((line) =>
    typeof line !== "string" || !line.match(/^\s*#/)
  );
  const fns = realLines.map((line) => {
    return typeof line === "string"
      ? makeLine(line)
      : makeBlock(line, { map: true });
  });
  if (map) {
    return commands.map(commands.pipe(...fns));
  } else {
    return commands.pipe(...fns);
  }
}

export async function run(fn, input) {
  return fn(input);
}

export function compile(scriptSrc, variables = {}) {
  // TODO handle setKmdEnv
  const source = scriptSrc
    .trim()
    .replace(REPLACEMENT_REGEX, (match) => {
      const key = match.substring(1, match.length - 1);
      return variables.hasOwnProperty(key) ? variables[key] : match;
    })
    .split("\n")
    .filter((line) => line.trim().length > 0);

  const lines = indentationParser(source);
  const pipeline = makeBlock(lines);
  // console.timeEnd('compile')
  return pipeline;
}

export async function runScript(scriptSrc) {
  return run(compile(scriptSrc));
}
