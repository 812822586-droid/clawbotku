import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { platformsForArg, startPlatforms } from './index.js';

describe('platformsForArg', () => {
  it('starts both platforms by default', () => {
    assert.deepEqual(platformsForArg(), ['discord', 'slack']);
    assert.deepEqual(platformsForArg('all'), ['discord', 'slack']);
    assert.deepEqual(platformsForArg(''), ['discord', 'slack']);
  });

  it('selects one platform', () => {
    assert.deepEqual(platformsForArg('discord'), ['discord']);
    assert.deepEqual(platformsForArg('Slack'), ['slack']);
  });

  it('rejects an unknown target', () => {
    assert.equal(platformsForArg('teams'), null);
  });
});

describe('startPlatforms', () => {
  it('keeps going when one platform fails to start', async () => {
    const errors = [];
    const original = console.error;
    console.error = (...args) => {
      errors.push(args.join(' '));
    };

    try {
      const running = await startPlatforms(['discord', 'slack'], {
        discord: async () => {
          throw new Error('missing token');
        },
        slack: async () => 'slack-client',
      });
      assert.equal(running, 1);
      assert.equal(errors.length, 1);
      assert.match(errors[0], /\[discord\] failed to start: missing token/);
    } finally {
      console.error = original;
    }
  });

  it('reports zero when every platform fails', async () => {
    const original = console.error;
    console.error = () => {};
    try {
      const running = await startPlatforms(['discord'], {
        discord: async () => {
          throw new Error('nope');
        },
        slack: async () => {},
      });
      assert.equal(running, 0);
    } finally {
      console.error = original;
    }
  });
});
