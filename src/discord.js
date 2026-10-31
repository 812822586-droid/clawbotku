import 'dotenv/config';
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import { formatEcho } from './echo.js';
import { assertSupportedNode, isDirectRun, readEnv } from './runtime.js';

// GuildMessages plus the privileged Message Content intent are required to read
// text in servers. DirectMessages and the Channel partial cover uncached DMs.
export const discordClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
};

export function shouldEchoDiscordMessage(message, botUserId) {
  if (!message || message.system) return false;
  if (!message.author || message.author.bot) return false;
  if (botUserId && message.author.id === botUserId) return false;
  if (typeof message.content !== 'string' || !message.content.trim()) return false;
  return true;
}

export function explainDiscordSendError(error) {
  if (error?.code === 50013) {
    return 'Missing permissions in that channel. Grant View Channel, Send Messages, Read Message History, and Send Messages in Threads.';
  }
  if (error?.code === 50001) {
    return 'Missing access to that channel. Invite the bot or allow its role to view the channel.';
  }
  return error?.message || String(error);
}

export function registerDiscordEcho(client) {
  client.on(Events.MessageCreate, async (message) => {
    if (!shouldEchoDiscordMessage(message, client.user?.id)) return;

    const echoed = formatEcho(message.content, { platform: 'discord' });
    if (!echoed) return;

    try {
      await message.reply({
        content: echoed,
        allowedMentions: { parse: [], repliedUser: false },
      });
    } catch (error) {
      console.error('[discord] failed to echo message:', explainDiscordSendError(error));
    }
  });
}

export function createDiscordClient() {
  const client = new Client(discordClientOptions);
  registerDiscordEcho(client);
  client.on(Events.Error, (error) => {
    console.error('[discord]', error);
  });
  return client;
}

export async function startDiscord() {
  assertSupportedNode();

  const token = readEnv('DISCORD_BOT_TOKEN');
  if (!token) {
    throw new Error('Set DISCORD_BOT_TOKEN in .env (Developer Portal → Bot → Token).');
  }

  const client = createDiscordClient();
  client.once(Events.ClientReady, (readyClient) => {
    console.log(`[discord] logged in as ${readyClient.user.tag}`);
    console.log('[discord] echoing text messages this bot can see');
  });

  try {
    await client.login(token);
  } catch (error) {
    if (/disallowed intents/i.test(error?.message ?? '')) {
      throw new Error(
        'Discord rejected the gateway intents. In the Developer Portal, open Bot → Privileged Gateway Intents and turn on Message Content Intent, then start the bot again.',
        { cause: error },
      );
    }
    throw error;
  }

  return client;
}

if (isDirectRun(import.meta.url)) {
  startDiscord().catch((error) => {
    console.error('[discord] failed to start:', error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
