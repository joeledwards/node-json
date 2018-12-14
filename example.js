const json = require('./lib/json')

const obj = {
  A: [
    {
      a: 1,
      b: 2
    },
    {
      c: '3',
      d: '4'
    }
  ],
  B: [
    {
      e: true,
      f: false
    },
    {
      g: null,
      h: undefined
    }
  ],
  C: [],
  D: {},
  '"E"': '"quoted"',
  '\\F\\': '\\escaped\\',
  '\\G\\': '\nnewlines\n',
  '\\H\\': '"',
  '\\I\\': '',
  'some-thing': 'hyphenated'
}

console.log(json(obj))
