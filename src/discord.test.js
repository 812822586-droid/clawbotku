import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { GatewayIntentBits, Partials } from 'discord.js';
import {
  discordClientOptions,
  explainDiscordSendError,
  shouldEchoDiscordMessage,
} from './discord.js';

const user = (id, bot = false) => ({ author: { id, bot }, system: false });

describe('discord echo filter', () => {
  it('requests the gateway intents and DM partial needed to read messages', () => {
    assert.deepEqual(discordClientOptions.intents, [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ]);
    assert.deepEqual(discordClientOptions.partials, [Partials.Channel]);
  });

  it('echoes a human text message and ignores bots, itself, system, and blanks', () => {
    assert.equal(shouldEchoDiscordMessage({ ...user('user'), content: 'hello' }, 'bot'), true);
    assert.equal(shouldEchoDiscordMessage({ ...user('bot'), content: 'echo: hello' }, 'bot'), false);
    assert.equal(shouldEchoDiscordMessage({ ...user('other', true), content: 'hi' }, 'bot'), false);
    assert.equal(
      shouldEchoDiscordMessage({ ...user('user'), content: 'hi', system: true }, 'bot'),
      false,
    );
    assert.equal(shouldEchoDiscordMessage({ ...user('user'), content: '   ' }, 'bot'), false);
    assert.equal(shouldEchoDiscordMessage({ ...user('user'), content: '' }, 'bot'), false);
  });

  it('explains common send failures', () => {
    assert.match(explainDiscordSendError({ code: 50013, message: 'Missing Permissions' }), /Send Messages/);
    assert.match(explainDiscordSendError({ code: 50001 }), /Missing access/);
    assert.equal(explainDiscordSendError(new Error('socket closed')), 'socket closed');
  });
});
