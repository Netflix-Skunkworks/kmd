# kmd

## Installation

`npm i -g kmd-script`

## Usage

`kmd some-script.sh [another-script.sh]`

## Examples

On a Mac, try `kmd examples/os.sh examples/mac-addresses.sh`

### Setting env vars (e.g. base file path when using `pathResolve` command)

```js
const { run, compile, setKmdEnv } = require('kmd-script')

setKmdEnv({
  BASE_FILE_PATH: '/some/path'
})

compile(...)
run(...)
```
