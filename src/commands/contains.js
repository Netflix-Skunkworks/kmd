const contains = (opts) => {
  if (typeof opts === 'string') opts = { regex: new RegExp(opts) }
  else if (opts.constructor.name === 'RegExp') opts = { regex: opts }
  let { regex } = opts
  return (str) => {
    if (!str) return null
    return str.match(regex) ? 'true' : 'false'
  }
}

module.exports = contains
