import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MINIMUM_NODE_MAJOR = 20;

export function assertSupportedNode() {
  const major = Number.parseInt(process.versions.node, 10);
  if (major < MINIMUM_NODE_MAJOR) {
    throw new Error(
      `Node.js ${MINIMUM_NODE_MAJOR} or newer is required (running ${process.versions.node}). ` +
        '@slack/bolt 5 and this project need a current Node.js LTS release.',
    );
  }
}

export function readEnv(name) {
  const value = process.env[name];
  if (typeof value !== 'string') return '';
  return value.trim();
}

export function isDirectRun(metaUrl) {
  const entry = process.argv[1];
  if (!entry) return false;
  return path.resolve(entry) === path.resolve(fileURLToPath(metaUrl));
}
