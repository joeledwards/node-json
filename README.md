# json

Serialize JSON in color.

## Installation

```shell
npm install --save @buzuli/json
```

## Usage

```javascript
const json = require('@buzuli/json')
const jsonOptions = { indent: 4 }

console.log(json(require('./package.json'), jsonOptions))
```

## Customization

### color

You can disable color via the `color` option (enabled by default). Set to a falsey value to disable.

### indent

You can configure indentation via the `indent` option. Accepts a boolean, number, or string.

To disable, set to `false` or a negative number.

To customize then indentation:
- You can specify a number which is translated as the number of spaces to indent.
- You can supply a string to replace the default indentation text (two space).
