import assert from 'node:assert/strict';
import { test } from 'node:test';

import { GET } from '../app/api/health/route.ts';

test('/api/health answers 200 with a JSON body', async () => {
  const response = GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});
