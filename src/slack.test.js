import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { explainSlackSendError, shouldEchoSlackMessage, slackEchoPayload } from './slack.js';

describe('slack echo filter', () => {
  it('echoes a plain user message', () => {
    assert.equal(shouldEchoSlackMessage({ text: 'hello', user: 'U1' }), true);
  });

  it('ignores the bot, other bots, subtypes, and blank text', () => {
    assert.equal(shouldEchoSlackMessage({ text: 'echo: hello', subtype: 'bot_message', bot_id: 'B1' }), false);
    assert.equal(shouldEchoSlackMessage({ text: 'hi', bot_id: 'B2' }), false);
    assert.equal(shouldEchoSlackMessage({ text: 'edited', subtype: 'message_changed' }), false);
    assert.equal(shouldEchoSlackMessage({ text: '   ', user: 'U1' }), false);
    assert.equal(shouldEchoSlackMessage({ user: 'U1' }), false);
    assert.equal(shouldEchoSlackMessage(null), false);
  });

  it('keeps thread replies in the thread and channel messages in the channel', () => {
    assert.equal(slackEchoPayload({ text: 'hi' }, 'echo: hi'), 'echo: hi');
    assert.deepEqual(slackEchoPayload({ text: 'hi', thread_ts: '123.456' }, 'echo: hi'), {
      text: 'echo: hi',
      thread_ts: '123.456',
    });
  });

  it('explains common Slack API errors', () => {
    assert.match(explainSlackSendError({ data: { error: 'not_in_channel' } }), /invite/i);
    assert.match(explainSlackSendError({ data: { error: 'missing_scope' } }), /chat:write/);
    assert.match(explainSlackSendError({ data: { error: 'channel_not_found' } }), /channel/);
    assert.equal(explainSlackSendError(new Error('socket closed')), 'socket closed');
  });
});
