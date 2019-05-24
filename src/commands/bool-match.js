const boolMatch = (opts) => {
  if (typeof opts === 'string') opts = { regex: new RegExp(opts) }
  else if (opts.constructor.name === 'RegExp') opts = { regex: opts }
  let { regex, match } = opts
  if (typeof match === 'undefined') {
    if (regex.source.includes('(')) match = 1
    else match = 0
  }

  return (str) => {
    if (!str) return false
    const m = str.match(regex)
    if (m && m[match]) return true
  }
}

module.exports = boolMatch
