const path = require('path')
const basePath = process.env.FILE_BASE_PATH || ''

module.exports = userPath => () => path.resolve(basePath + userPath)
