import { describe, it, expect, vi, afterEach } from 'vitest'

vi.mock('@/utils/supabase/server-client', () => ({
  createClient: vi.fn()
}))

vi.mock('next/navigation', async () => ({
  ...(await vi.importActual('next/navigation')),
  redirect: vi.fn()
}))

import { createClient } from '@/utils/supabase/server-client'
import { loginAction } from '../log-in'
import { redirect } from 'next/navigation'

describe('loginAction server action', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('calls redirect on successful sign in', async () => {
    ;(createClient as any).mockResolvedValue({
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({ data: { user: { id: '123' } }, error: null })
      }
    })

    await loginAction({ email: 'test@example.com', password: 'hunter2' })

    expect(redirect).toHaveBeenCalledWith('/')
  })

  it('returns an error object when sign in fails', async () => {
    const fakeError = { message: 'invalid credentials' }
    ;(createClient as any).mockResolvedValue({
      auth: {
        signInWithPassword: vi.fn().mockResolvedValue({ data: { user: null }, error: fakeError })
      }
    })

    const res = await loginAction({ email: 'bad@example.com', password: 'wrongpw' })
    expect(res).toEqual({ error: fakeError.message })
  })
})
