'use client'

import Link from "next/link"
import LoginForm from "./LoginForm"
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/utils/translations'

export default function LoginPage() {
  const { language } = useLanguage()
   if(!language) return null
  return (
    <>
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-2">{t('auth.welcomeBack', language)}</h1>
          <p className="text-center text-gray-600 mb-8">{t('auth.loginTitle', language)}</p>

          <LoginForm/>

          <p className="text-center mt-6 text-gray-600">
            {t('auth.dontHaveAccount', language)}{' '}
            <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
              {t('auth.signupButton', language)}
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
