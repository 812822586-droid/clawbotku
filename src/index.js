import 'dotenv/config';
import { startDiscord } from './discord.js';
import { startSlack } from './slack.js';
import { assertSupportedNode, isDirectRun } from './runtime.js';

const STARTERS = {
  discord: startDiscord,
  slack: startSlack,
};

export function platformsForArg(arg = 'all') {
  const normalized = String(arg ?? 'all').trim().toLowerCase();
  if (normalized === '' || normalized === 'all') return ['discord', 'slack'];
  if (normalized === 'discord' || normalized === 'slack') return [normalized];
  return null;
}

export async function startPlatforms(names, starters = STARTERS) {
  assertSupportedNode();

  const results = await Promise.allSettled(names.map((name) => starters[name]()));
  let running = 0;

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      running += 1;
      return;
    }
    const reason = result.reason;
    const message = reason instanceof Error ? reason.message : String(reason);
    console.error(`[${names[index]}] failed to start: ${message}`);
  });

  return running;
}

async function main() {
  const names = platformsForArg(process.argv[2]);
  if (!names) {
    console.error('Usage: node src/index.js [all|discord|slack]');
    process.exit(1);
  }

  console.log(`[echo] starting ${names.join(' + ')}`);
  const running = await startPlatforms(names);
  if (running === 0) {
    process.exit(1);
  }
  console.log(`[echo] ${running} platform${running === 1 ? '' : 's'} running. Press Ctrl+C to stop.`);
}

if (isDirectRun(import.meta.url)) {
  main().catch((error) => {
    console.error('[echo] failed to start:', error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
