import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import BasicComponent from '~/components/forms/Login.vue'

describe('BasicComponent', () => {
  it('should render correctly', async () => {
    const component = await mountSuspended(BasicComponent)
    expect(component.exists()).toBe(true)
  })
})
