const tap = require('tap')
const { runScript } = require('../src/index')

tap.test('basic execution', async function(t) {
  const script = `echo hi`
  const output = await runScript(script)
  t.same(output, 'hi')
})

tap.test('variables in execution', async function(t) {
  const script = `echo hi %var%`
  const output = await runScript(script, {
    var: 'friend'
  })
  t.same(output, 'hi friend')
})

tap.test('variables in execution missing', async function(t) {
  const script = `echo hi %fren%`
  const output = await runScript(script, {
    var: 'friend'
  })
  t.same(output, 'hi %fren%')
})
