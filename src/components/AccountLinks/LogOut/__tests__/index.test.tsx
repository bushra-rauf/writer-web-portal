import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@/actions/logout', () => ({
  LogOut: vi.fn()
}))

// Mock reload so we can assert it was called
const reload = vi.fn()
Object.defineProperty(global, 'location', {
  value: { reload },
  writable: true
})

const push = vi.fn()
vi.mock('next/navigation', async () => ({
  ...(await vi.importActual('next/navigation')),
  useRouter: () => ({ push })
}))

import LogOutButton from '../index'
import { LogOut } from '@/actions/logout'

describe('LogOutButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls LogOut and reloads the page on success', async () => {
    ;(LogOut as any).mockResolvedValue({ ok: true })

    render(<LogOutButton />)

    const btn = screen.getAllByRole('button', { name: /log out/i })[0]
    const user = userEvent.setup()
    await user.click(btn)

    await waitFor(() => expect(LogOut).toHaveBeenCalled())
    await waitFor(() => expect(reload).toHaveBeenCalled())
  })

  it('still reloads the page on failure', async () => {
    const fakeError = { message: 'fail' }
    ;(LogOut as any).mockResolvedValue({ ok: false, error: fakeError })

    render(<LogOutButton />)

    const btn = screen.getAllByRole('button', { name: /log out/i })[0]
    const user = userEvent.setup()
    await user.click(btn)

    await waitFor(() => expect(LogOut).toHaveBeenCalled())
    await waitFor(() => expect(reload).toHaveBeenCalled())
  })
})
