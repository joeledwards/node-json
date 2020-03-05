const tap = require('tap')
const json = require('../lib/json')

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
      g: null
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

tap.test('Should format an object', async assert => {
  assert.ok(typeof json(obj) === 'string')
  assert.same(json({}), '{}')
  assert.same(json({ id: 'jason' }, { indent: false, color: false }), '{"id":"jason"}')
})

tap.test('Should parse a json string then format', async assert => {
  assert.ok(typeof json('{}') === 'string')
  assert.same(json('{}'), '{}')
  assert.same(obj, JSON.parse(json(JSON.stringify(obj), { color: false })))
})

tap.test('Should generate valid JSON in non-colorized mode', async assert => {
  assert.same(obj, JSON.parse(json(obj, { color: false })))
  assert.same(obj, JSON.parse(json(obj, { color: false, indent: false })))
  assert.same(obj, JSON.parse(json(obj, { color: false, indent: 4 })))
})
