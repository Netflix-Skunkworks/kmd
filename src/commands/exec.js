const debug = require('../debug')('exec')
const execa = require('execa')
const parse = require('shell-quote').parse
const shell = require('shelljs')

// allow node binary path to be injected
if (process.env.NODE_PATH) {
  shell.config.execPath = process.env.NODE_PATH
}

const exec = (defaultShellStr) => async function(shellStr) {
  const execStr = shellStr || defaultShellStr
  debug("executing", execStr)
  const shellCmd = parse(execStr).map(arg => typeof arg === 'object' && arg.op === 'glob' ? arg.pattern : arg)
  debug("parsed as:", shellCmd)
  const [cmd, ...args] = shellCmd
  // prefer shelljs if the command is supported
  if (shell[cmd]) {
    debug(`running ${cmd} with shelljs. args:`, args)
    const result = shell[cmd](...args)
    debug('result', result.stdout, typeof result.stdout)
    return result.stdout
  } else {
    const {stdout} = await execa(cmd, args)
    return stdout
  }
}

module.exports = exec
