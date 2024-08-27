import { setup, createPage } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('app renders', async () => {
  await setup({
    host: 'http://localhost:3000',
  })

  it('displays heading', async () => {
    const page = await createPage('/')
    expect(await page.getByRole('heading').isVisible()).toBe(true)
  })
})
