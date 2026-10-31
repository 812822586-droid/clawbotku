# clawbotku

A small Node.js echo bot that repeats messages it can see on **Discord** and **Slack**. One codebase, separate entry points, so you can run either platform or both.

When someone sends `hello there`, the bot replies:

```text
echo: hello there
```

The `echo: ` prefix is optional. Set `ECHO_PREFIX=` in `.env` to repeat the text exactly.

## What gets echoed

The bot replies to ordinary text from people:

- Discord server messages in channels the bot can read, and direct messages sent to the bot.
- Slack messages in public channels, private channels, group DMs, and direct messages where the bot is a member. A reply inside a thread is echoed inside that thread.

It skips:

- Its own messages, so an echo cannot loop.
- Other bots, Discord system messages, and Slack message subtypes (edits, joins, file shares, `bot_message`).
- Messages with no text. Attachments, embeds, and stickers alone are ignored. If a message has text and an attachment, only the text is echoed.
- Edits. Only newly posted messages are echoed.

Discord replies do not re-notify `@everyone`, roles, or users (`allowedMentions` is empty). Slack sends the same text back, so an `@mention` or `<!channel>` in the original can notify people again.

Messages longer than the platform limit are truncated (Discord 2000 characters, Slack 40000) and end with `…`.

This is a starter. It answers every text message it can see. Invite it only to channels where that is welcome.

## Requirements

- Node.js 20 or newer (`node -v`). `@slack/bolt` 5 requires it.
- A Discord application with the Message Content intent enabled.
- A Slack app with Socket Mode enabled, installed in a workspace you can use for development.

## Quick start

```bash
npm install
cp .env.example .env
# fill in the tokens, then:
npm start
```

`npm start` and `npm run start:all` connect to every platform that has its tokens set. If one platform is missing tokens, that platform logs an error and the other keeps running. If both fail, the process exits with code 1.

Stop the bot with Ctrl+C.

## Scripts

| Script | Command | What it does |
| --- | --- | --- |
| `start` | `npm start` | Start Discord and Slack in one process |
| `start:all` | `npm run start:all` | Same as `npm start` |
| `start:discord` | `npm run start:discord` | Discord only |
| `start:slack` | `npm run start:slack` | Slack only |
| `test` | `npm test` | Run the local unit tests (no network, no tokens) |

You can also pass a target to the combined entry point:

```bash
node src/index.js discord
node src/index.js slack
node src/index.js all
```

## Environment variables

Copy `.env.example` to `.env`. Real tokens stay in `.env`, which is gitignored.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DISCORD_BOT_TOKEN` | For Discord | Bot token from the Discord Developer Portal |
| `SLACK_BOT_TOKEN` | For Slack | Bot User OAuth Token, starts with `xoxb-` |
| `SLACK_APP_TOKEN` | For Slack | App-level token for Socket Mode, starts with `xapp-`, scope `connections:write` |
| `ECHO_PREFIX` | No | Text placed before each echo. Default `echo: `. Empty means an exact copy |
| `SLACK_SIGNING_SECRET` | No | Not read by this bot. Listed in `.env.example` so it is obvious where it would go |

Socket Mode receives events over a WebSocket authenticated by `SLACK_APP_TOKEN`. Slack's HTTP signing secret is used to verify webhook requests sent to a public Request URL. This scaffold does not open an HTTP endpoint, so leave `SLACK_SIGNING_SECRET` unset.

## Discord setup

1. Open the [Discord Developer Portal](https://discord.com/developers/applications) and create a **New Application**. The application name is what people see while authorizing the bot.
2. Open **Bot** and add a bot if the portal asks you to. Click **Reset Token**, copy the token, and put it in `.env` as `DISCORD_BOT_TOKEN`. Treat the token like a password. If it leaks, reset it.
3. On the same **Bot** page, under **Privileged Gateway Intents**, turn on **Message Content Intent**. Leave Presence Intent and Server Members Intent off. This bot does not use them.

   Message Content is privileged. With it off, Discord delivers guild messages without their text, `message.content` is empty, and the bot stays quiet in servers. Direct messages can still include text, but server echoing needs this intent.

4. Open **OAuth2 → URL Generator**.
   - Scopes: `bot`
   - Bot permissions: **View Channels**, **Send Messages**, **Send Messages in Threads**, **Read Message History**
5. Copy the generated URL, open it, choose your server, and authorize. You need the **Manage Server** permission on that server.
6. For a private channel, allow the bot's role to view the channel. Otherwise the bot never receives those messages.
7. Optional: on the **Bot** page, turn **Public Bot** off if only you should be able to invite it.

The client requests these gateway intents:

| Intent | Why |
| --- | --- |
| `Guilds` | Know which servers the bot joined |
| `GuildMessages` | Receive messages created in servers |
| `MessageContent` | Read the text of those server messages. Must also be enabled in the portal |
| `DirectMessages` | Receive DMs. The `Channel` partial is enabled so uncached DM channels still arrive |

A ready-made invite URL, if you prefer not to use the checkboxes. Replace `YOUR_APPLICATION_ID` with the **Application ID** from **General Information**. The permission value is the four permissions above (`274877975552`):

```text
https://discord.com/oauth2/authorize?client_id=YOUR_APPLICATION_ID&scope=bot&permissions=274877975552
```

### Try Discord

```bash
npm run start:discord
```

You should see `[discord] logged in as YourBot`. Send a message in a channel the bot can see, or DM the bot. It replies `echo: ` plus your text, as a reply to your message. Its own reply does not trigger another echo.

## Slack setup

Create the app by hand at [api.slack.com/apps](https://api.slack.com/apps). Socket Mode is the local/dev path: Slack connects out to your process, so you do not need a public URL or ngrok.

1. **Create New App → From scratch.** Name it and pick the workspace you will test in.
2. **Settings → Socket Mode → Enable Socket Mode.**
   When asked for an app-level token, name it (for example `socket`) and add the scope **`connections:write`**. Copy the token (`xapp-...`) into `SLACK_APP_TOKEN`.
   You can create another later under **Basic Information → App-Level Tokens**.
3. **OAuth & Permissions → Scopes → Bot Token Scopes.** Add:

   | Scope | Why |
   | --- | --- |
   | `chat:write` | Post the echo |
   | `channels:history` | Read messages in public channels the bot is in |
   | `channels:read` | See those public channels |
   | `groups:history` | Read messages in private channels the bot is in |
   | `groups:read` | See those private channels |
   | `im:history` | Read direct messages |
   | `im:read` | See DM conversations |
   | `mpim:history` | Read group DMs |
   | `mpim:read` | See group DMs |

4. **Event Subscriptions → Enable Events.** With Socket Mode on, Slack does not ask for a Request URL.
   Under **Subscribe to bot events**, add:

   - `message.channels` (public channels)
   - `message.groups` (private channels)
   - `message.im` (direct messages)
   - `message.mpim` (group direct messages)

   Save changes.

5. **Install App** (OAuth & Permissions, or the Install App page). Allow the scopes. Copy the **Bot User OAuth Token** (`xoxb-...`) into `SLACK_BOT_TOKEN`.
   Changing scopes or events later requires you to **reinstall** the app so the token picks up the new permissions.
6. In Slack, invite the bot to a channel: `/invite @YourBotName`. A bot only receives channel messages for conversations it has joined. Anyone can also open a DM with the bot.

The signing secret on **Basic Information → App Credentials** is unused here. Keep it out of the repo. You would need it only if you replaced Socket Mode with an HTTP Request URL.

Bolt is constructed with `socketMode: true`, `token`, and `appToken`. `ignoreSelf: true` (the Bolt default, set explicitly here) drops events this app sent. The listener also skips any message with a `subtype` or `bot_id`, so another bot's `bot_message` cannot start a ping-pong even if `ignoreSelf` has not resolved this app's bot id yet.

### Try Slack

```bash
npm run start:slack
```

You should see `[slack] connected with Socket Mode`. In a channel that includes the bot, send `ping`. The bot posts `echo: ping`. It does not reply to that post.

## Run both

Put all three tokens in `.env` and run:

```bash
npm start
```

Discord and Slack stay connected in the same process. Logs are prefixed with `[discord]`, `[slack]`, or `[echo]`.

## Project layout

```text
src/index.js      Start both platforms, or one via an argument
src/discord.js    discord.js client and MessageCreate echo
src/slack.js      @slack/bolt Socket Mode app and message echo
src/echo.js       Shared prefix and length limit
src/runtime.js    Node version check, env reads, direct-run detection
.env.example      Committed template. Copy to .env
```

`npm run start:discord` runs `src/discord.js` directly. `npm run start:slack` runs `src/slack.js` directly. Importing a module does not connect. The connection starts only when that file is the process entry point, or when `src/index.js` calls `startDiscord()` / `startSlack()`.

## Troubleshooting

**Discord: `Used disallowed intents` or the bot exits mentioning Message Content Intent**

Turn on **Message Content Intent** under **Bot → Privileged Gateway Intents**, save, and start again.

**Discord: the bot is online and silent**

The message was from a bot, had no text, or the bot cannot see the channel. For server messages, Message Content Intent has to be on in the portal and in the client (it is, in `src/discord.js`). Private channels need the bot role allowed.

**Discord: `Missing Permissions` (50013) or `Missing Access` (50001)**

Re-invite with View Channels, Send Messages, Read Message History, and Send Messages in Threads, or fix the channel's permission overwrites.

**Slack: `invalid_auth` while connecting**

`SLACK_BOT_TOKEN` should be the `xoxb-` bot token. `SLACK_APP_TOKEN` should be the `xapp-` app-level token with `connections:write`. A signing secret in either variable will not work.

**Slack: connected, but no echo**

Confirm Socket Mode is on, the four `message.*` bot events are saved, the app was reinstalled after scope changes, and the bot was `/invite`d to the channel. Edits and file-only shares are ignored on purpose.

**Slack: `not_in_channel`**

Invite the bot to that channel.

**Slack: `missing_scope`**

Add the scope from the table above, reinstall the app, update `SLACK_BOT_TOKEN` if Slack shows a new one, and restart.

**The bot is echoing forever**

Stop it with Ctrl+C. That loop means a message sent by the bot is being treated as a person. The filters in `shouldEchoDiscordMessage` and `shouldEchoSlackMessage` are what prevent it. Do not reply to `message.author.bot`, your own user id, Slack `bot_id`, or Slack subtypes.

## Tests

```bash
npm test
```

The tests cover echo formatting, which messages are ignored, Discord intents, Slack thread replies, and starting one platform when the other fails. They do not log in to Discord or Slack.
