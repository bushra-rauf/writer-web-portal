import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '..'
import { loginAction } from '@/actions/log-in'
import { QueryClientProvider } from '@/providers/query-client-provider'
import { LanguageProvider } from '@/contexts/LanguageContext'

vi.mock('@/actions/log-in')

// Test wrapper with all required providers
const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider>
    <LanguageProvider>
      {children}
    </LanguageProvider>
  </QueryClientProvider>
)

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form and submits with valid data', async () => {
    ;(loginAction as any).mockResolvedValue({})

    render(<LoginForm />, { wrapper: AllProviders })

    // Wait for form to appear (language loads)
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })

    const user = userEvent.setup()
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButtons = screen.getAllByRole('button', { name: /log in/i })
    const submitButton = submitButtons[0] // Use first button in case of duplicates

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      // Check that loginAction was called with the correct data as first argument
      expect(loginAction).toHaveBeenCalled()
      const callArgs = (loginAction as any).mock.calls[0]
      expect(callArgs[0]).toEqual({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })

})
