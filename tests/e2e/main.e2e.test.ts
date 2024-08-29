import { fileURLToPath } from 'node:url'
import { createPage, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({
  rootDir: fileURLToPath(new URL('../', import.meta.url)),
  browser: true,
})

describe('app renders correctly', () => {
  it('heading is presented', async () => {
    const page = await createPage('/auth')
    expect(await page.locator('h1').isVisible()).toBe(true)
    await page.close()
  }, 10000)
})