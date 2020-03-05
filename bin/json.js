#!/usr/bin/env node

const yargs = require('yargs')
const buzJson = require('../lib/json')

;(async () => {
  try {
    const args = yargs
      .option('indent', {
        type: 'string',
        desc: 'indentation characters or number of spaces',
        alias: 'i'
      })
      .option('no-indent', {
        type: 'boolean',
        desc: 'disable indentation',
        alias: ['I', 'ni']
      })
      .option('no-color', {
        type: 'boolean',
        desc: 'disable colorization',
        alias: ['C', 'nc']
      })
      .parse()

    await handleJson(args)
  } catch (error) {
    console.error('Fatal:', error)
    process.exit(1)
  }
})()

async function handleJson ({
  indent,
  noIndent,
  noColor
}) {
  let text = ''
  indent = Number.parseInt(indent) || indent

  process.stdin.on('data', data => {
    text += data
  })

  process.stdin.on('error', error => {
    console.error('Error while reading input', error)
    process.exit(1)
  })

  process.stdin.once('end', () => {
    try {
      const formatted = buzJson(text, {
        indent: noIndent ? false : indent,
        color: !noColor
      })

      console.info(formatted)
    } catch (error) {
      console.error('Input is not valid JSON.', error)
      process.exit(1)
    }
  })
}
