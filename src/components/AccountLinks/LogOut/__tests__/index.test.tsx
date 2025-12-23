import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LogOutButton from '../index'

// Mock Supabase client
const mockSignOut = vi.fn()
vi.mock('@/utils/supabase/browser-client', () => ({
  createClient: () => ({
    auth: {
      signOut: mockSignOut
    }
  })
}))

// Mock CartContext
const mockClearCart = vi.fn()
vi.mock('@/contexts/CartContext', () => ({
  useCart: () => ({
    clearCart: mockClearCart
  })
}))

// Mock window.location.href
delete (window as any).location
window.location = { href: '' } as any

describe('LogOutButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSignOut.mockResolvedValue({ error: null })
  })

  it('clears cart, signs out and redirects on click', async () => {
    render(<LogOutButton />)

    const btn = screen.getByRole('button', { name: /log out/i })
    const user = userEvent.setup()
    await user.click(btn)

    await waitFor(() => {
      expect(mockClearCart).toHaveBeenCalled()
      expect(mockSignOut).toHaveBeenCalled()
      expect(window.location.href).toBe('/')
    })
  })
})
