# kmd

## QuickJS variant

This branch has experimental support for running kmd with [quickjs](https://bellard.org/quickjs/). It does not yet support all commands.

After installing qjs, you can run kmd queries like this:

    qjs quickjs/cli.js examples/mac-addresses.sh

...or all of them with

    qjs quickjs/cli.js examples/*

### Compiling

You can compile the js file into an executable with:

    qjsc -o kmd quickjs/cli.js

Warning: this is _not_ a static binary. It will run locally, but it's dynamically linked to your local quickjs libs. You can compile with those, but it's a bit more involved. There's an example in the qjs [Makefile](https://github.com/horhof/quickjs/blob/master/Makefile#L309-L326).

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
