'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomeBooks } from '@/utils/supabase/queries';
import BookCard from '@/components/BookCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import SearchBooks from '@/components/SearchBooks';

const CATEGORIES = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Biography', 'Self-Help', 'Poetry'];

export default function BooksPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Use React Query instead of useEffect
  const { data: booksData, isLoading: loading } = useQuery({
    queryKey: ['all-books'],
    queryFn: getHomeBooks,
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
  });

  const books = booksData?.data || [];

  // Use useMemo for filtering and sorting - computed from query data
  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    // Filter by language
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(book => (book.language || 'english') === selectedLanguage);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [books, selectedCategory, selectedLanguage, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir={language === 'urdu' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">{t('books.browseBooks', language)}</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBooks placeholder={t('books.searchPlaceholder', language)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Filters */}
        <div className="lg:col-span-1">
          <div className="card h-fit sticky top-20">
            <h3 className="font-bold text-lg mb-4">{t('books.filters', language)}</h3>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-sm">{t('common.category', language)}</h4>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full px-3 py-2 rounded-lg transition ${
                      selectedCategory === cat
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    } ${language === 'urdu' ? 'text-right' : 'text-left'}`}
                  >
                    {cat === 'All' ? t('books.allCategories', language) : t(`categories.${cat}`, language)}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-sm">{t('common.language', language)}</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedLanguage('all')}
                  className={`block w-full px-3 py-2 rounded-lg transition ${
                    selectedLanguage === 'all'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  } ${language === 'urdu' ? 'text-right' : 'text-left'}`}
                >
                  {t('books.allLanguages', language)}
                </button>
                <button
                  onClick={() => setSelectedLanguage('english')}
                  className={`block w-full px-3 py-2 rounded-lg transition ${
                    selectedLanguage === 'english'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  } ${language === 'urdu' ? 'text-right' : 'text-left'}`}
                >
                  {t('languages.english', language)}
                </button>
                <button
                  onClick={() => setSelectedLanguage('urdu')}
                  className={`block w-full px-3 py-2 rounded-lg transition ${
                    selectedLanguage === 'urdu'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  } ${language === 'urdu' ? 'text-right' : 'text-left'}`}
                >
                  {t('languages.urdu', language)}
                </button>
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">{t('books.sortBy', language)}</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-sm"
              >
                <option value="newest">{t('books.newest', language)}</option>
                <option value="oldest">{t('books.oldest', language)}</option>
                <option value="price-low">{t('books.priceLowToHigh', language)}</option>
                <option value="price-high">{t('books.priceHighToLow', language)}</option>
                <option value="rating">{t('books.topRated', language)}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {filteredBooks.length > 0 ? (
                <>
                  <p className="text-gray-600 mb-6">
                    {t('books.showing', language)} {filteredBooks.length} {filteredBooks.length !== 1 ? t('books.books', language) : t('books.book', language)}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 card">
                  <p className="text-gray-600 text-lg">{t('books.noBooksFound', language)}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
