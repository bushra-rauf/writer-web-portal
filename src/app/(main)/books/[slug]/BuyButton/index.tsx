'use client'

import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

interface BuyButtonProps {
  bookId: string
  title: string
  price: number
  cover_image: string | null
  slug: string
}

const BuyButton = ({ bookId, title, price, cover_image, slug }: BuyButtonProps) => {
  const { addToCart, cart } = useCart()

  const isInCart = cart.some((item) => item.id === bookId)

  const handleAddToCart = () => {
    if (isInCart) {
      toast.info('This book is already in your cart')
      return
    }

    addToCart({
      id: bookId,
      title,
      price,
      cover_image,
      slug,
    })

    toast.success('Added to cart!')
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-3 font-bold text-lg transition ${
        isInCart
          ? 'bg-gray-400 cursor-not-allowed'
          : 'btn-primary'
      }`}
      disabled={isInCart}
    >
      {isInCart ? 'In Cart' : 'Add to Cart'}
    </button>
  )
}

export default BuyButton
