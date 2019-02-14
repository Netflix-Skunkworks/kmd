const path = require('path')
const IS_DEV = process.env.NODE_ENV === 'development'
const appPath = process.resourcesPath

module.exports = userPath => () => {
  return path.resolve((IS_DEV ? '' : appPath + path.sep) + userPath)
}
