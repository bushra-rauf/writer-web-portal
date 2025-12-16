'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { getBooksByWriter } from '@/utils/supabase/queries'
import { CreateBook } from '@/actions/create-book'
import { DeleteBook } from '@/actions/delete-book'
import { createClient } from '@/utils/supabase/browser-client'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/utils/translations'
import { toast } from 'sonner'
import Link from 'next/link'
import BookForm from './BookForm'

export default function DashboardPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const queryClient = useQueryClient()
  const [showNewBook, setShowNewBook] = useState(false)
  const supabase = createClient()

  // Use React Query for user
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    },
    staleTime: Infinity,
    retry: false
  })

  // Redirect if not authenticated
  if (!userLoading && !user) {
    router.push('/auth/login')
    return null
  }

  // Use React Query for fetching user books
  const { data: booksData, isLoading: booksLoading } = useQuery({
    queryKey: ['user-books', user?.id],
    queryFn: () => getBooksByWriter(user!.id),
    enabled: !!user,
    refetchOnWindowFocus: false,
  })

  const userBooks = booksData?.data || []

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: DeleteBook,
    onMutate: () => {
      toast.loading('Deleting book...')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-books', user?.id] })
      toast.success('Book deleted successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete book')
    }
  })

  const handleDeleteBook = (bookId: string) => {
    if (confirm(t('dashboard.confirmDelete', language) || 'Are you sure you want to delete this book?')) {
      deleteMutation.mutate(bookId)
    }
  }

  if (userLoading || booksLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir={language === 'urdu' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t('dashboard.title', language)}</h1>
          <p className="text-gray-600">{t('dashboard.welcome', language)}, {user?.email}</p>
        </div>
        <button
          onClick={() => setShowNewBook(!showNewBook)}
          className="btn-primary mt-4 sm:mt-0"
        >
          {showNewBook ? t('common.cancel', language) : t('dashboard.addNewBook', language)}
        </button>
      </div>

      {/* New Book Form */}
      {showNewBook && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">{t('dashboard.publishNewBook', language)}</h2>
          <BookForm
            user={user!}
            onSuccess={() => {
              setShowNewBook(false)
              queryClient.invalidateQueries({ queryKey: ['user-books', user?.id] })
            }}
          />
        </div>
      )}

      {/* Books Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">{t('dashboard.myBooks', language)}</h2>
        {userBooks.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">{t('dashboard.noBooks', language)}</p>
            <button
              onClick={() => setShowNewBook(true)}
              className="btn-primary"
            >
              {t('dashboard.publishFirstBook', language)}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBooks.map((book: any) => (
              <div key={book.id} className="card">
                {/* Cover Image */}
                <div className="w-full h-48 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4 flex items-center justify-center text-white text-4xl overflow-hidden">
                  {book.cover_image ? (
                    <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <span>📖</span>
                  )}
                </div>

                {/* Book Details */}
                <h3 className={`font-bold text-lg mb-2 ${book.language === 'urdu' ? 'text-right' : 'text-left'}`}>
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {book.category} • {book.language === 'urdu' ? 'اردو' : 'English'}
                </p>
                <p className={`text-gray-700 text-sm mb-4 line-clamp-2 ${book.language === 'urdu' ? 'text-right' : 'text-left'}`}>
                  {book.description}
                </p>

                <div className="flex gap-3">
                  <Link
                    href={`/books/${book.slug}`}
                    className="btn-outline flex-1 text-center text-sm py-2"
                  >
                    {t('common.view', language)}
                  </Link>
                  <Link
                    href={`/books/${book.slug}/edit`}
                    className="btn border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white flex-1 text-sm py-2 text-center"
                  >
                    {t('common.edit', language)}
                  </Link>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="btn border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex-1 text-sm py-2"
                    disabled={deleteMutation.isPending}
                  >
                    {t('common.delete', language)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
