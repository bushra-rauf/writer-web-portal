'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedBooks } from '@/utils/supabase/queries';
import BookCard from '@/components/BookCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

export default function Home() {
  const { language } = useLanguage();
  const { data: booksData, isLoading: loading } = useQuery({
    queryKey: ['featured-books'],
    queryFn: getFeaturedBooks,
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
  });

  const featuredBooks = booksData?.data || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-6">
            {t('home.hero.title', language)}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            {t('home.hero.subtitle', language)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/books" className="btn-accent px-8 py-3 text-lg font-semibold rounded-lg hover:scale-105 transition-transform">
              {t('home.hero.browseBooks', language)}
            </Link>
            <Link href="/auth/signup" className="btn border-2 border-white text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-white hover:text-primary transition-all">
              {t('home.hero.startWriting', language)}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('home.featuredBooks', language)}</h2>
          <p className="text-gray-600 text-lg">{t('home.latestBooks', language)}</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {featuredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-6">{t('home.noBooks', language)}</p>
              </div>
            )}

            {featuredBooks.length > 0 && (
              <div className="text-center">
                <Link href="/books" className="btn-outline px-8 py-3 text-lg font-semibold">
                  {t('home.viewAll', language)}
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{t('home.features.title', language)}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📝',
                titleKey: 'home.features.easyPublishing.title',
                descriptionKey: 'home.features.easyPublishing.description'
              },
              {
                icon: '🌍',
                titleKey: 'home.features.globalReach.title',
                descriptionKey: 'home.features.globalReach.description'
              },
              {
                icon: '💰',
                titleKey: 'home.features.earnRoyalties.title',
                descriptionKey: 'home.features.earnRoyalties.description'
              },
              {
                icon: '⭐',
                titleKey: 'home.features.communitySupport.title',
                descriptionKey: 'home.features.communitySupport.description'
              },
              {
                icon: '📊',
                titleKey: 'home.features.analytics.title',
                descriptionKey: 'home.features.analytics.description'
              },
              {
                icon: '🔒',
                titleKey: 'home.features.securePlatform.title',
                descriptionKey: 'home.features.securePlatform.description'
              }
            ].map((feature, idx) => (
              <div key={idx} className="card text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{t(feature.titleKey, language)}</h3>
                <p className="text-gray-600">{t(feature.descriptionKey, language)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('home.readyToShare.title', language)}</h2>
          <p className="text-xl mb-8 text-gray-100">
            {t('home.readyToShare.subtitle', language)}
          </p>
          <Link href="/auth/signup" className="btn-accent px-8 py-3 text-lg font-semibold rounded-lg inline-block hover:scale-105 transition-transform">
            {t('home.readyToShare.button', language)}
          </Link>
        </div>
      </section>
    </div>
  );
}
