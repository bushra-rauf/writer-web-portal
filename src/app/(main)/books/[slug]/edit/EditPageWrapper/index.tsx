'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/utils/translations'
import EditForm from '../EditForm'

interface EditPageWrapperProps {
  bookId: string
  defaultValues: {
    title: string
    description: string
    category: string
    price: number
    content: string
    language: 'english' | 'urdu'
    coverImage: string | null
  }
}

const EditPageWrapper = ({ bookId, defaultValues }: EditPageWrapperProps) => {
  const { language } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir={language === 'urdu' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-8">{t('dashboard.editBook', language)}</h1>
      <EditForm bookId={bookId} defaultValues={defaultValues} />
    </div>
  )
}

export default EditPageWrapper
