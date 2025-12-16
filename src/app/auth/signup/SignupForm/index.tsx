'use client'

import { signupAction } from "@/actions/sign-up"
import { signupSchema } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Link from "next/link"
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/utils/translations'

const SignupForm = () => {
  const { language } = useLanguage()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data: any) => {
    try {
      await signupAction(data)
      toast.success(t('auth.accountCreated', language))
      // Redirect is handled by the server action
    } catch (error: any) {
      toast.error(error.message || t('auth.accountCreationFailed', language))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-gray-800">
        {t('auth.signupTitle', language)}
      </h2>

      <fieldset>
        <label className="block font-semibold text-sm mb-2" htmlFor="fullName">
          {t('auth.fullName', language)}
        </label>
        <input
          {...register('fullName')}
          id="fullName"
          type="text"
          placeholder={t('auth.fullNamePlaceholder', language)}
          className="input-field"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message as string}</p>
        )}
      </fieldset>

      <fieldset>
        <label className="block font-semibold text-sm mb-2" htmlFor="email">
          {t('auth.email', language)}
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder={t('auth.emailPlaceholder', language)}
          className="input-field"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
        )}
      </fieldset>

      <fieldset>
        <label className="block font-semibold text-sm mb-2">{t('auth.iAmA', language)}</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              {...register('userType')}
              type="radio"
              value="reader"
              className="mr-2"
            />
            {t('auth.reader', language)}
          </label>
          <label className="flex items-center">
            <input
              {...register('userType')}
              type="radio"
              value="writer"
              className="mr-2"
            />
            {t('auth.writer', language)}
          </label>
        </div>
        {errors.userType && (
          <p className="mt-1 text-sm text-red-600">{errors.userType.message as string}</p>
        )}
      </fieldset>

      <fieldset>
        <label className="block font-semibold text-sm mb-2" htmlFor="password">
          {t('auth.password', language)}
        </label>
        <input
          {...register('password')}
          id="password"
          type="password"
          placeholder={t('auth.passwordPlaceholder', language)}
          className="input-field"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>
        )}
      </fieldset>

      <fieldset>
        <label className="block font-semibold text-sm mb-2" htmlFor="confirmPassword">
          {t('auth.confirmPassword', language)}
        </label>
        <input
          {...register('confirmPassword')}
          id="confirmPassword"
          type="password"
          placeholder={t('auth.passwordPlaceholder', language)}
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
        {t('auth.signupButton', language)}
      </button>

      <p className="text-sm text-center text-gray-600">
        {t('auth.alreadyHaveAccount', language)}{' '}
        <Link href="/auth/login" className="text-primary hover:underline font-semibold">
          {t('auth.loginHere', language)}
        </Link>
      </p>
    </form>
  )
}

export default SignupForm
