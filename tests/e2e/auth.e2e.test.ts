import { fileURLToPath } from 'node:url'
import { createPage, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({
  rootDir: fileURLToPath(new URL('../', import.meta.url)),
  browser: true,
})

describe('login page renders correctly', () => {
  it('icon presented', async () => {
    const page = await createPage('/auth')

    expect(await page.locator('img').isVisible()).toBe(true)

    await page.close()
  }, 10000)

  it('login heading presented', async () => {
    const page = await createPage('/auth')

    expect(await page.locator('h1').isVisible()).toBe(true)
    expect(await page.locator('h1').textContent()).toBe('Вход')

    await page.close()
  }, 10000)

  it('login form presented', async () => {
    const page = await createPage('/auth')

    expect(await page.locator('form').isVisible()).toBe(true)

    await page.close()
  }, 10000)

  it('login inputs presented', async () => {
    const page = await createPage('/auth')

    expect(await page.locator('input').count()).toBe(2)

    await page.close()
  }, 10000)

  it('login labels presented', async () => {
    const page = await createPage('/auth')

    expect(await page.locator('label').count()).toBe(2)

    await page.close()
  }, 10000)

  it('login buttons presented', async () => {
    const page = await createPage('/auth')

    expect(await page.locator('button').count()).toBe(2)

    await page.close()
  }, 10000)

  it('switch to register is working', async () => {
    const page = await createPage('/auth')

    await page.locator('button.btn.btn-outline.btn-secondary').click()
    await page.waitForTimeout(1500)

    expect(await page.locator('h1').textContent()).toBe('Регистрация')

    await page.close()
  }, 10000)
})

describe('register page renders correctly', () => {
  it('login heading presented', async () => {
    const page = await createPage('/auth')

    await page.locator('button.btn.btn-outline.btn-secondary').click()
    await page.waitForTimeout(1500)

    expect(await page.locator('h1').isVisible()).toBe(true)
    expect(await page.locator('h1').textContent()).toBe('Регистрация')

    await page.close()
  }, 10000)

  it('login form presented', async () => {
    const page = await createPage('/auth')

    await page.locator('button.btn.btn-outline.btn-secondary').click()
    await page.waitForTimeout(1500)
    expect(await page.locator('form').isVisible()).toBe(true)

    await page.close()
  }, 10000)

  it('login inputs presented', async () => {
    const page = await createPage('/auth')

    await page.locator('button.btn.btn-outline.btn-secondary').click()
    await page.waitForTimeout(1500)
    expect(await page.locator('input').count()).toBe(3)

    await page.close()
  }, 10000)

  it('login labels presented', async () => {
    const page = await createPage('/auth')

    await page.locator('button.btn.btn-outline.btn-secondary').click()
    await page.waitForTimeout(1500)
    expect(await page.locator('label').count()).toBe(3)

    await page.close()
  }, 10000)

  it('login buttons presented', async () => {
    const page = await createPage('/auth')

    await page.locator('button.btn.btn-outline.btn-secondary').click()
    await page.waitForTimeout(1500)

    expect(await page.locator('button').count()).toBe(2)

    await page.close()
  }, 10000)

  it('switch to login is working', async () => {
    const page = await createPage('/auth')

    await page.locator('button.btn.btn-outline.btn-secondary').click()
    await page.waitForTimeout(1500)

    await page.locator('button.btn.btn-outline.btn-secondary').click()
    await page.waitForTimeout(1500)

    expect(await page.locator('h1').textContent()).toBe('Вход')

    await page.close()
  }, 10000)
})

//TODO check inputs - enter symbols, wait till error show, enter other till errors disappear
//TODO check buttons - disabled
