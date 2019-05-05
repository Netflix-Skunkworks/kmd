const defaultExec = require('./exec')

module.exports = defaultShellStr => async shellStr => {
  try {
    const stdout = await defaultExec(defaultShellStr)(shellStr)
    return stdout
  } catch (e) {
    // don't complete hide the error
    console.error(e)
    return ''
  }
}
