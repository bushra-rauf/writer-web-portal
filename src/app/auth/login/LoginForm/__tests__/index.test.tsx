import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


vi.mock('@/actions/log-in', () => ({
  loginAction: vi.fn()
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

import LoginForm from '..'
import { loginAction } from '@/actions/log-in'
import { toast } from 'sonner'
import { QueryClientProvider } from '@/providers/query-client-provider'

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submits the form and shows success toast on success', async () => {
    ;(loginAction as any).mockResolvedValue({})

    render(
      <QueryClientProvider>
        <LoginForm />
      </QueryClientProvider>
    )

    const user = userEvent.setup()
    const buttons = screen.getAllByRole('button', { name: /log in/i })
    const idx = buttons.length - 1
    const emails = screen.getAllByLabelText(/email/i)
    const passwords = screen.getAllByLabelText(/password/i)

    await user.type(emails[idx], 'test@example.com')
    await user.type(passwords[idx], 'password1')
    const btn = buttons[idx]
    await user.click(btn)

    await waitFor(() => expect(loginAction).toHaveBeenCalled())
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Login successful!'))
  })

  it('shows error toast on failure', async () => {
    ;(loginAction as any).mockRejectedValue(new Error('Invalid credentials'))

    const { container } = render(
      <QueryClientProvider>
        <LoginForm />
      </QueryClientProvider>
    )

    const forms = container.querySelectorAll('form')
    const form = forms[forms.length - 1]
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement
    const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement

    // Use fireEvent to change inputs and submit the specific form instance
    const user = userEvent.setup()
    await user.type(emailInput, 'bad@example.com')
    await user.type(passwordInput, 'password1')
    await user.click(screen.getByRole('button', { name: /log in/i }))


    await waitFor(() => expect(loginAction).toHaveBeenCalled())
    await waitFor(() => expect(toast.error).toHaveBeenCalled())
  })
})
