'use client'

import { loginAction } from "@/actions/log-in"
import { loginSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      toast.success('Login successful!')
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Invalid email or password')
    }
  })

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col space-y-4">
      <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-gray-800">
        Log in to your account
      </h2>

      <fieldset>
        <label className="block font-semibold text-sm mb-2" htmlFor="email">
          Email
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="you@example.com"
          name="email"
          autoComplete="username"
          className="input-field"
          disabled={isPending}
        />
        {errors.email && 
          <ErrorMessage message={errors.email.message}/>
        }
      </fieldset>

      <fieldset>
        <label className="block font-semibold text-sm mb-2" htmlFor="password">
          Password
        </label>
        <input
          {...register('password')}
          id="password"
          type="password"
          placeholder="••••••••"
          name="password"
          autoComplete="current-password"
          className="input-field"
          disabled={isPending}
        />
        {errors.password && (
          <ErrorMessage message={errors.password.message}/>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full py-3 font-bold text-lg"
      >
        {isPending ? 'Logging you in...' : 'Log In'}
      </button>

      {data?.error && 
        <ErrorMessage message ={data?.error}/>
      }
    </form>
  )
}

export default LoginForm
