'use client'

import { useQuery } from '@tanstack/react-query'
import { getRatings } from '@/utils/supabase/queries'

interface ReviewsListProps {
  initialRatings: any[]
  bookId: string
}

const ReviewsList = ({ initialRatings, bookId }: ReviewsListProps) => {
  const { data: ratingsData } = useQuery({
    queryKey: ['ratings', bookId],
    queryFn: () => getRatings(bookId),
    // initialData should match PostgrestSingleResponse shape; casting to any to satisfy types
    initialData: { data: initialRatings } as any,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000
  })

  const ratings = ratingsData?.data || []

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reader Reviews</h2>
      {ratings.length > 0 ? (
        <div className="space-y-4">
          {ratings.map((rating: any) => (
            <div key={rating.id} className="card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">Anonymous Reader</p>
                  <p className="text-sm text-gray-600">
                    {'★'.repeat(rating.rating)}{'☆'.repeat(5 - rating.rating)}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(rating.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-700">{rating.review}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No reviews yet. Be the first to review this book!</p>
      )}
    </div>
  )
}

export default ReviewsList
