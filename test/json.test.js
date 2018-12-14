const tap = require('tap')
const json = require('../lib/json')

tap.test('Should format an object', async assert => {
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

  assert.ok(typeof json(obj) === 'string')
})

tap.test('Should parse a string then format', async assert => {
  assert.ok(typeof json('{}') === 'string')
})
