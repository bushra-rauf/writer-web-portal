import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('@/utils/supabase/server-client', () => ({
  createClient: vi.fn()
}))

import { createClient } from '@/utils/supabase/server-client'
import { LogOut } from '../logout'

describe('LogOut server action', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns ok: true when signOut succeeds', async () => {
    ;(createClient as any).mockResolvedValue({
      auth: {
        signOut: vi.fn().mockResolvedValue({ error: null })
      }
    })

    const res = await LogOut()
    expect(res).toEqual({ ok: true })
  })

  it('returns ok: false when signOut returns an error', async () => {
    const fakeError = { message: 'sign out failed' }
    ;(createClient as any).mockResolvedValue({
      auth: {
        signOut: vi.fn().mockResolvedValue({ error: fakeError })
      }
    })

    const res = await LogOut()
    expect(res).toEqual({ ok: false, error: fakeError })
  })
})
