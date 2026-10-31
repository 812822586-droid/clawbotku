import 'dotenv/config';
import { App } from '@slack/bolt';
import { formatEcho } from './echo.js';
import { assertSupportedNode, isDirectRun, readEnv } from './runtime.js';

export function shouldEchoSlackMessage(message) {
  if (!message || message.subtype) return false;
  if (message.bot_id) return false;
  if (typeof message.text !== 'string' || !message.text.trim()) return false;
  return true;
}

export function slackEchoPayload(message, text) {
  if (message?.thread_ts) {
    return { text, thread_ts: message.thread_ts };
  }
  return text;
}

export function explainSlackSendError(error) {
  const code = error?.data?.error;
  if (code === 'not_in_channel') {
    return 'The bot is not in that channel. Invite it with /invite @YourBot.';
  }
  if (code === 'missing_scope') {
    return 'The bot token is missing chat:write (or a history scope). Add the scope, reinstall the app, and restart.';
  }
  if (code === 'channel_not_found') {
    return 'Slack could not find that channel. Confirm the bot is installed in this workspace and invited to the conversation.';
  }
  return error?.message || String(error);
}

export function registerSlackEcho(app) {
  app.message(async ({ message, say }) => {
    if (!shouldEchoSlackMessage(message)) return;

    const echoed = formatEcho(message.text, { platform: 'slack' });
    if (!echoed) return;

    try {
      await say(slackEchoPayload(message, echoed));
    } catch (error) {
      console.error('[slack] failed to echo message:', explainSlackSendError(error));
    }
  });
}

export function createSlackApp({ token, appToken } = {}) {
  const botToken = token ?? readEnv('SLACK_BOT_TOKEN');
  const socketToken = appToken ?? readEnv('SLACK_APP_TOKEN');

  if (!botToken || !socketToken) {
    throw new Error(
      'Set SLACK_BOT_TOKEN (xoxb-) and SLACK_APP_TOKEN (xapp-, connections:write scope) in .env. This Socket Mode bot does not use SLACK_SIGNING_SECRET.',
    );
  }

  if (!botToken.startsWith('xoxb-')) {
    console.warn('[slack] SLACK_BOT_TOKEN usually starts with xoxb-. Check that you copied the Bot User OAuth Token.');
  }
  if (!socketToken.startsWith('xapp-')) {
    console.warn('[slack] SLACK_APP_TOKEN usually starts with xapp-. Check that you copied the app-level token.');
  }

  const app = new App({
    token: botToken,
    appToken: socketToken,
    socketMode: true,
    ignoreSelf: true,
  });

  registerSlackEcho(app);
  return app;
}

export async function startSlack() {
  assertSupportedNode();
  const app = createSlackApp();
  await app.start();
  console.log('[slack] connected with Socket Mode');
  console.log('[slack] echoing text messages in conversations this bot has joined');
  return app;
}

if (isDirectRun(import.meta.url)) {
  startSlack().catch((error) => {
    console.error('[slack] failed to start:', error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
