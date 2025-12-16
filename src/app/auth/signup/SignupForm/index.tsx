'use client'

import { signupAction } from "@/actions/sign-up"
import { signupSchema } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Link from "next/link"

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data: any) => {
    try {
      await signupAction(data)
      toast.success('Account created successfully!')
      // Redirect is handled by the server action
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-gray-800">
        Create your account
      </h2>

      <fieldset>
        <label className="block font-semibold text-sm mb-2" htmlFor="fullName">
          Full Name
        </label>
        <input
          {...register('fullName')}
          id="fullName"
          type="text"
          placeholder="John Doe"
          className="input-field"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message as string}</p>
        )}
      </fieldset>

      <fieldset>
        <label className="block font-semibold text-sm mb-2" htmlFor="email">
          Email
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="you@example.com"
          className="input-field"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
        )}
      </fieldset>

      <fieldset>
        <label className="block font-semibold text-sm mb-2">I am a</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              {...register('userType')}
              type="radio"
              value="reader"
              className="mr-2"
            />
            Reader
          </label>
          <label className="flex items-center">
            <input
              {...register('userType')}
              type="radio"
              value="writer"
              className="mr-2"
            />
            Writer
          </label>
        </div>
        {errors.userType && (
          <p className="mt-1 text-sm text-red-600">{errors.userType.message as string}</p>
        )}
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
          className="input-field"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>
        )}
      </fieldset>

      <fieldset>
        <label className="block font-semibold text-sm mb-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          className="input-field"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message as string}</p>
        )}
      </fieldset>

      <button
        type="submit"
        className="btn-primary w-full py-3 font-bold text-lg"
      >
        Sign Up
      </button>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-primary hover:underline font-semibold">
          Login here
        </Link>
      </p>
    </form>
  )
}

export default SignupForm
