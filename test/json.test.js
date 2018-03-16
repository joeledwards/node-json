const tap = require('tap')
const json = require('../lib/json')

tap.test('', t => {
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
    ]
  }

  t.ok(typeof json(obj) === 'string')

  t.done()
})
