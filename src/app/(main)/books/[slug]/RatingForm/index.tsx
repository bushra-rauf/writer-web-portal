'use client'

import { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/browser-client'
import { toast } from 'sonner'

const RatingForm = ({ bookId }: { bookId: string }) => {
  const supabase = createClient()
  const queryClient = useQueryClient()
  const [userRating, setUserRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    },
    staleTime: Infinity,
    retry: false
  })

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not logged in')
      if (!userRating) throw new Error('Please select a rating')

      const { error } = await supabase
        .from('ratings')
        .insert({
          book_id: bookId,
          user_id: user.id,
          rating: userRating,
          review: reviewText,
        })

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ratings', bookId] })
      toast.success('Review submitted successfully!')
      setUserRating(0)
      setReviewText('')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit review')
    }
  })

  return (
    <div className="card mb-8">
      <h3 className="text-xl font-bold mb-4">Share Your Review</h3>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Your Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setUserRating(star)}
              className={`text-3xl transition ${
                star <= userRating ? 'text-yellow-500' : 'text-gray-300'
              }`}
              type="button"
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Your Review</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts about this book..."
          className="input-field h-24"
        />
      </div>
      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        className="btn-primary w-full py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </div>
  )
}

export default RatingForm
