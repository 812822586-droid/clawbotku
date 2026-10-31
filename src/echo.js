export const DEFAULT_ECHO_PREFIX = 'echo: ';

/** Discord message content limit, in UTF-16 code units (JavaScript string length). */
export const DISCORD_MESSAGE_LIMIT = 2000;

/** Slack chat.postMessage text limit. */
export const SLACK_MESSAGE_LIMIT = 40000;

export const PLATFORM_LIMITS = {
  discord: DISCORD_MESSAGE_LIMIT,
  slack: SLACK_MESSAGE_LIMIT,
};

export function echoPrefix() {
  if (process.env.ECHO_PREFIX === undefined) return DEFAULT_ECHO_PREFIX;
  return process.env.ECHO_PREFIX;
}

/**
 * Build the reply body for an echo.
 * Returns null when there is no user text to repeat.
 * Truncates to maxLength so a long message does not fail the platform API call.
 */
export function formatEcho(text, options = {}) {
  if (typeof text !== 'string') return null;

  const trimmed = text.trim();
  if (!trimmed) return null;

  const prefix = Object.prototype.hasOwnProperty.call(options, 'prefix') ? options.prefix : echoPrefix();
  const platformLimit = options.platform ? PLATFORM_LIMITS[options.platform] : undefined;
  const maxLength = options.maxLength ?? platformLimit;
  const full = `${prefix ?? ''}${trimmed}`;

  if (maxLength == null || full.length <= maxLength) return full;
  if (maxLength < 1) return null;
  if (maxLength === 1) return '…';
  return `${full.slice(0, maxLength - 1)}…`;
}
