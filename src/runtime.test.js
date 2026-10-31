import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { assertSupportedNode, readEnv } from './runtime.js';

describe('runtime helpers', () => {
  const original = process.env.DISCORD_BOT_TOKEN;

  afterEach(() => {
    if (original === undefined) delete process.env.DISCORD_BOT_TOKEN;
    else process.env.DISCORD_BOT_TOKEN = original;
  });

  it('accepts this Node.js version', () => {
    assert.doesNotThrow(() => assertSupportedNode());
  });

  it('trims environment values and treats blanks as unset', () => {
    process.env.DISCORD_BOT_TOKEN = '  abc  ';
    assert.equal(readEnv('DISCORD_BOT_TOKEN'), 'abc');
    process.env.DISCORD_BOT_TOKEN = '   ';
    assert.equal(readEnv('DISCORD_BOT_TOKEN'), '');
    delete process.env.DISCORD_BOT_TOKEN;
    assert.equal(readEnv('DISCORD_BOT_TOKEN'), '');
  });
});
