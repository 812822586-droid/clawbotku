import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import {
  DEFAULT_ECHO_PREFIX,
  DISCORD_MESSAGE_LIMIT,
  SLACK_MESSAGE_LIMIT,
  echoPrefix,
  formatEcho,
} from './echo.js';

describe('formatEcho', () => {
  const originalPrefix = process.env.ECHO_PREFIX;

  afterEach(() => {
    if (originalPrefix === undefined) delete process.env.ECHO_PREFIX;
    else process.env.ECHO_PREFIX = originalPrefix;
  });

  it('prefixes user text with the default echo label', () => {
    delete process.env.ECHO_PREFIX;
    assert.equal(formatEcho('hello'), `${DEFAULT_ECHO_PREFIX}hello`);
  });

  it('trims surrounding whitespace', () => {
    assert.equal(formatEcho('  hello  ', { prefix: 'echo: ' }), 'echo: hello');
  });

  it('returns null when there is no text', () => {
    assert.equal(formatEcho('   ', { prefix: 'echo: ' }), null);
    assert.equal(formatEcho('', { prefix: 'echo: ' }), null);
    assert.equal(formatEcho(undefined, { prefix: 'echo: ' }), null);
  });

  it('uses ECHO_PREFIX from the environment, including an empty prefix', () => {
    process.env.ECHO_PREFIX = '';
    assert.equal(echoPrefix(), '');
    assert.equal(formatEcho('hello'), 'hello');

    process.env.ECHO_PREFIX = 'bot> ';
    assert.equal(formatEcho('hello'), 'bot> hello');
  });

  it('keeps an explicit prefix ahead of the environment', () => {
    process.env.ECHO_PREFIX = 'bot> ';
    assert.equal(formatEcho('hello', { prefix: 'echo: ' }), 'echo: hello');
  });

  it('truncates to the Discord limit without exceeding it', () => {
    const echoed = formatEcho('a'.repeat(DISCORD_MESSAGE_LIMIT), {
      prefix: 'echo: ',
      platform: 'discord',
    });
    assert.ok(echoed);
    assert.equal(echoed.length, DISCORD_MESSAGE_LIMIT);
    assert.equal(echoed.startsWith('echo: '), true);
    assert.equal(echoed.endsWith('…'), true);
  });

  it('leaves a normal message intact under the Slack limit', () => {
    const text = 'a'.repeat(1000);
    assert.equal(formatEcho(text, { prefix: 'echo: ', platform: 'slack' }), `echo: ${text}`);
    assert.ok(SLACK_MESSAGE_LIMIT > DISCORD_MESSAGE_LIMIT);
  });
});
