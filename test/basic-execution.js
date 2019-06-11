const tap = require('tap');
const { runScript } = require('../src/index');

tap.test('basic execution', async function(t) {
  const script = `echo hi`;
  const output = await runScript(script);
  t.same(output, 'hi');
});

tap.test('variables in execution', async function(t) {
  const script = `echo hi %adj% %noun%`;
  const output = await runScript(script, {
    noun: 'friend',
    adj: 'fabulous',
  });
  t.same(output, 'hi fabulous friend');
});

tap.test('variables in execution missing', async function(t) {
  const script = `echo hi %adj% %noun%`;
  const output = await runScript(script, {
    var: 'friend',
    adj: 'missing',
  });
  t.same(output, 'hi missing %noun%');
});
