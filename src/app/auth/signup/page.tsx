'use client'

import SignupForm from "./SignupForm"
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/utils/translations'

export default function SignupPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-2">{t('auth.createAccount', language)}</h1>
          <p className="text-center text-gray-600 mb-8">{t('auth.joinWriterHub', language)}</p>

          <SignupForm />
        </div>
      </div>
    </div>
  )
}
