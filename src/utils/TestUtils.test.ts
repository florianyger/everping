import { describe, expect, it } from 'vitest';

import { test } from './TestUtils';

describe('ArrayUtils', (): void => {
  describe('test', (): void => {
    it('Simple case', (): void => {
      expect(test('test')).toEqual('test');
    });
  });
});
