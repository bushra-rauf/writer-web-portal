import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createClient } from '@/utils/supabase/server-client'
import { redirect } from 'next/navigation'
import { LogOut } from '../logout'

vi.mock('@/utils/supabase/server-client')
vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    redirect: vi.fn(() => {
      throw new Error('NEXT_REDIRECT')
    })
  }
})

describe('LogOut server action', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('calls signOut and redirects on success', async () => {
    const mockSignOut = vi.fn().mockResolvedValue({ error: null })
    ;(createClient as any).mockResolvedValue({
      auth: {
        signOut: mockSignOut
      }
    })

    await expect(LogOut()).rejects.toThrow('NEXT_REDIRECT')
    expect(mockSignOut).toHaveBeenCalled()
    expect(redirect).toHaveBeenCalledWith('/')
  })

  it('throws error when signOut fails', async () => {
    const fakeError = new Error('sign out failed')
    ;(createClient as any).mockResolvedValue({
      auth: {
        signOut: vi.fn().mockResolvedValue({ error: fakeError })
      }
    })

    await expect(LogOut()).rejects.toThrow('sign out failed')
  })
})
