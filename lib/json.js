module.exports = json

const { blue, green, orange, purple, yellow, red } = require('@buzuli/color')

function json (obj, { indent = true, color = true } = {}) {
  const colorBoolean = value => color ? blue(value) : value
  const colorNumber = value => color ? orange(value) : value
  const colorString = value => color ? green(value) : value
  const colorNull = value => color ? purple(value) : value
  const colorKey = key => color ? yellow(key) : key
  const colorIndent = indent => color ? red(indent) : indent

  const nullString = colorNull('null')

  const out = []
  const write = text => out.push(text)

  let indenting = true
  let indentation = '  '

  // Compute indentation and determine what the indent should be
  if (indent === false) {
    indenting = false
    indentation = ''
  } else if (typeof indent === 'number') {
    if (indent < 0) {
      indenting = false
      indentation = ''
    } else {
      indentation = ' '.repeat(indent)
    }
  } else if (typeof indent === 'string') {
    indentation = colorIndent(indent)
  }

  if (typeof obj === 'string') {
    obj = JSON.parse(obj)
  }

  _json(obj, null, 0)

  return out.join('')

  function qesc (text) {
    const escaped = JSON.stringify(text)
    return escaped.substr(1, escaped.length - 2)
  }

  function _json (value, key, depth, suffix = '') {
    if (value === undefined) {
      return
    }

    const prefix = (indenting && depth) > 0 ? '\n' : ''
    write(`${prefix}${indentation.repeat(depth)}${key ? '"' + colorKey(qesc(key)) + (indenting ? '": ' : '":') : ''}`)

    if (value === null) {
      write(`${nullString}${suffix}`)
    } else if (value instanceof Array) {
      write('[')
      const entries = value.filter(v => v !== undefined)
      const maxIndex = entries.length - 1
      entries.forEach((v, i) => _json(v, null, depth + 1, i < maxIndex ? ',' : ''))
      write(
        entries.length > 0
          ? `${indenting ? '\n' : ''}${indentation.repeat(depth)}]${suffix}`
          : `]${suffix}`
      )
    } else if (typeof value === 'boolean') {
      write(`${colorBoolean(value)}${suffix}`)
    } else if (typeof value === 'number') {
      write(`${colorNumber(value)}${suffix}`)
    } else if (typeof value === 'string') {
      write(`${colorString(`"${qesc(value)}"`)}${suffix}`)
    } else if (typeof value === 'object') {
      write('{')
      const entries = Object.entries(value).filter(t => t[1] !== undefined)
      const maxIndex = entries.length - 1
      entries.forEach(([key, value], i) => {
        _json(value, key, depth + 1, i < maxIndex ? ',' : '')
      })
      write(entries.length > 0
        ? `${indenting ? '\n' : ''}${indentation.repeat(depth)}}${suffix}`
        : `}${suffix}`
      )
    } else {
      throw Error('Cannot serialize to JSON!')
    }
  }
}
