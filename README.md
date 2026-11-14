<h1 align="center">TeleBunny</h1>

<div align="center">

Lightweight zero-dependency Node.js module for [Telegram Bot API](https://core.telegram.org/bots/api).

[![Bot API Version](https://img.shields.io/badge/Bot%20API-v10.4-00aced.svg?logo=telegram)](https://core.telegram.org/bots/api#recent-changes)
[![Node Version](https://img.shields.io/badge/Node-v24.22.1+-brightgreen.svg)](https://nodejs.org/)
[![NPM Package Version](https://img.shields.io/npm/v/telebunny.svg)](https://www.npmjs.com/package/telebunny)

</div>

## ✨ Features

- No dependencies, only Node.js built-ins
- Idiomatic JavaScript API: camelCase names, positional required parameters and an options object for the rest. Telegram's snake_case is converted under the hood
- TypeScript types for every Bot API method, object and update
- Parallel update handling that keeps each chat's updates in order
- Webhook requests are verified with a secret token, generated automatically if you don't set one
- Requests rejected with 429 are retried after the delay Telegram asks for

## 📥 Installation

```sh
npm i telebunny
```

## 🐇 Usage (Polling)

```typescript
import { TeleBunny, ParseMode, UpdateType } from 'telebunny';

const bot = new TeleBunny('<TOKEN>', {
  // Listener and polling errors end up here (defaults to console.error)
  onError: (error) => console.error(error),
});

// Listeners can use string or typed format
bot.on(UpdateType.Message, async (msg) => {
  // Required parameters are positional, the rest go into the options object
  await bot.sendMessage('<b>Got message update</b>', {
    chatId: msg.chat.id,
    parseMode: ParseMode.HTML,
    replyParameters: { messageId: msg.messageId },
  });
});
bot.on('callback_query', async (query) => {
  // Ephemeral reply, visible only to the user who pressed the button
  await bot.sendMessage('Only you can see this', {
    ephemeralMessageParameters: { callbackQueryId: query.id },
  });
  await bot.answerCallbackQuery(query.id);
});

// Long polling: one request in flight, updates are queued and handled in order
await bot.startPolling({
  timeout: 30,
  allowedUpdates: ['message', 'callback_query'],
});

// Stops polling and waits for running listeners
process.once('SIGINT', () => bot.stopPolling());
```

## 🐇 Usage (Webhook)

```typescript
import { TeleBunny } from 'telebunny';
import { createServer } from 'node:http';

const bot = new TeleBunny('<TOKEN>', {
  // Checked on every webhook request. Without it, setWebhook generates a secret by itself
  webhookSecret: process.env.WEBHOOK_SECRET,
});

bot.on('inline_query', async (query) => {
  await bot.answerInlineQuery(query.id, [], {
    button: {
      text: `Search "${query.query}" in Google`,
      webApp: {
        url:
          'https://www.google.com/search?q=' + encodeURIComponent(query.query),
      },
    },
  });
});

await bot.setWebhook('<WEBHOOK_URL>/webhook');

createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/webhook') {
    return res.writeHead(404).end();
  }

  const chunks: Buffer[] = [];

  for await (const chunk of req) chunks.push(chunk);

  try {
    // Resolves after all listeners ran
    await bot.processUpdate(Buffer.concat(chunks), req.headers);
    res.writeHead(200).end();
  } catch {
    res.writeHead(403).end();
  }
}).listen(process.env.PORT || 3000);
```

## 📎 Files

Strings are sent as `file_id` or URL. Local files or binary data can be uploaded with `InputFile` wrapper:

```typescript
import { InputFile } from 'telebunny';

await bot.sendPhoto(new InputFile('./cat.jpg'), { chatId });
await bot.sendDocument(new InputFile(buffer, 'report.pdf'), { chatId });
await bot.sendMediaGroup(chatId, [
  { type: 'photo', media: new InputFile('./a.jpg') },
  { type: 'photo', media: '<file_id>' },
]);
```

Flood-control errors (429) are handled automatically and resent after `retryAfter` seconds, up to `maxRetries` times (3 by default)

## ⚡ Performance

By default long polling handles one update at a time, so a slow listener holds up every chat. Set `updateKey` to run updates in parallel while keeping order where it matters:

```typescript
const bot = new TeleBunny('<TOKEN>', {
  // Updates from the same chat run one after another, different chats in parallel
  updateKey: (update) =>
    update.message?.chat.id ?? update.callbackQuery?.from.id,
});
```

- Updates with the same key are handled in the order Telegram sent them
- Updates with different keys or no key run at the same time
- `processUpdate` follows the same rules for webhook updates
- `concurrency` in `startPolling` limits how many listeners run at once, for example to protect a database. There is no limit by default with `updateKey`. Webhooks are limited by `maxConnections` in `setWebhook` instead
- `queueCapacity` still pauses polling until listeners catch up

Node's global agent closes connections after 5 seconds without traffic. The first request after a pause then has to open a new TLS connection, which costs a few extra round trips. If your bot often pauses between requests, pass an agent that keeps connections open:

```typescript
import { Agent } from 'node:https';

const bot = new TeleBunny('<TOKEN>', {
  agent: new Agent({ keepAlive: true }),
});
```

## 🌐 Proxy

Requests go through Node's global agent, so the built-in proxy support works as is:

```sh
NODE_USE_ENV_PROXY=1 HTTPS_PROXY=http://proxy.local:8080 node bot.js
```

Any other `http.Agent` can be passed with the `agent` option, for example a SOCKS proxy:

```typescript
import { SocksProxyAgent } from 'socks-proxy-agent';

const bot = new TeleBunny('<TOKEN>', {
  agent: new SocksProxyAgent('socks5://127.0.0.1:1080'),
});
```

## 🔑 License

[MIT](LICENSE.md)
