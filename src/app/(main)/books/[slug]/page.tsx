import { createClient } from '@/utils/supabase/server-client'
import Link from 'next/link'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import BuyButton from './BuyButton'
import RatingForm from './RatingForm'
import ReviewsList from './ReviewsList'
import { redirect } from 'next/navigation'

export default async function BookDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const supabase = await createClient()

  // Get book
  const { data: book, error } = await supabase
    .from('books')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !book) {
    redirect('/books')
  }

  // Check if current user is the author
  const { data: { user } } = await supabase.auth.getUser()
  const isAuthor = user?.id === book.writer_id

  // Get ratings
  const { data: ratingsData } = await supabase
    .from('ratings')
    .select('*')
    .eq('book_id', book.id)
    .order('created_at', { ascending: false })
  const ratings = ratingsData || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link href="/books" className="text-primary hover:underline mb-6 inline-block">
        ← Back to Books
      </Link>

      {/* Author Actions */}
      {isAuthor && (
        <div className="flex gap-4 mb-6">
          <EditButton slug={book.slug} />
          <DeleteButton bookId={book.id} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left - Book Cover & Purchase */}
        <div className="md:col-span-1">
          <div className="card sticky top-24">
            {/* Cover */}
            <div className="w-full h-90 bg-gradient-to-br from-primary to-secondary rounded-lg mb-6 flex items-center justify-center text-white text-6xl overflow-hidden">
              {book.cover_image ? (
                <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <span>📖</span>
              )}
            </div>

            {/* Price and Buy Button */}
            {!isAuthor && (
              <div className="mb-6">
                <p className="text-3xl font-bold text-accent mb-4" dir="ltr">{book.price.toFixed(2)} kr</p>
                <BuyButton
                  bookId={book.id}
                  title={book.title}
                  price={book.price}
                  cover_image={book.cover_image}
                  slug={book.slug}
                />
              </div>
            )}

            {/* Book Info */}
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-600">Category</p>
                <p className="font-semibold">{book.category}</p>
              </div>
              <div>
                <p className="text-gray-600">Rating</p>
                <p className="font-semibold">{book.rating ? book.rating.toFixed(1) : 'No ratings'} ⭐</p>
              </div>
              <div>
                <p className="text-gray-600">Published</p>
                <p className="font-semibold">{new Date(book.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Book Details & Reviews */}
        <div className="md:col-span-2">
          <div>
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-6">by {book.writer_name}</p>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Book</h2>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>

            {/* Add Rating Section */}
            {user && !isAuthor && (
              <RatingForm bookId={book.id} />
            )}

            {/* Reviews Section */}
            <ReviewsList initialRatings={ratings} bookId={book.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
