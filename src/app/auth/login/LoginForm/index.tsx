'use client'

import { loginAction } from "@/actions/log-in"
import { loginSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/utils/translations'

const LoginForm = () => {
  const { language } = useLanguage()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      toast.success(t('auth.loginSuccess', language))
    },
    onError: (err: any) => {
      toast.error(err?.message || t('auth.loginError', language))
    }
  })

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col space-y-4">
      <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-gray-800">
        {t('auth.loginTitle', language)}
      </h2>

      <fieldset>
        <label className="block font-semibold text-sm mb-2" htmlFor="email">
          {t('auth.email', language)}
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder={t('auth.emailPlaceholder', language)}
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
          {t('auth.password', language)}
        </label>
        <input
          {...register('password')}
          id="password"
          type="password"
          placeholder={t('auth.passwordPlaceholder', language)}
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
        {isPending ? t('auth.loggingIn', language) : t('auth.loginButton', language)}
      </button>

      {data?.error &&
        <ErrorMessage message ={data?.error}/>
      }
    </form>
  )
}

export default LoginForm
