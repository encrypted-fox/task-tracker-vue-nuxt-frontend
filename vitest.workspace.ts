import { defineWorkspace } from 'vitest/config'
import path from 'path';

export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      name: 'unit',
      include: ['**/*.unit.test.ts'],
    },
  },
  {
    test: {
      name: 'e2e',
      include: ['**/*.e2e.test.ts'],
    },
  },
])