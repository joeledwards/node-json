module.exports = json

const {blue, green, orange, purple, yellow} = require('@buzuli/color')

function json (obj) {
  const out = []
  const write = text => out.push(text)

  _json(obj, null, 0)

  return out.join('')

  function qesc (text) {
    return text.replace(/"/g, '\\"')
  }

  function _json (value, key, depth, suffix = '\n') {
    if (value === undefined) {
      return
    }

    write(`${'  '.repeat(depth)}${key ? '"' + yellow(qesc(key)) + '": ' : ''}`)

    if (value === null) {
      write(`${purple('null')}${suffix}`)
    } else if (value instanceof Array) {
      write('[\n')
      const entries = value.filter(v => v !== undefined)
      const maxIndex = entries.length - 1
      entries.forEach((v, i) => _json(v, null, depth + 1, i < maxIndex ? ',\n' : '\n'))
      write(`${'  '.repeat(depth)}]${suffix}`)
    } else if (typeof value === 'boolean') {
      write(`${blue(value)}${suffix}`)
    } else if (typeof value === 'number') {
      write(`${orange(value)}${suffix}`)
    } else if (typeof value === 'string') {
      write(`${green(`"${qesc(value)}"`)}${suffix}`)
    } else if (typeof value === 'object') {
      write('{\n')
      const entries = Object.entries(value).filter(t => t[1] !== undefined)
      const maxIndex = entries.length - 1
      entries.forEach(([key, value], i) => {
        _json(value, key, depth + 1, i < maxIndex ? ',\n' : '\n')
      })
      write(`${'  '.repeat(depth)}}${suffix}`)
    } else {
      throw Error('Cannot serialize to JSON!')
    }
  }
}
