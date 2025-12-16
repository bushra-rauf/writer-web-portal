"use client"
import { ShoppingCartSimple } from "@phosphor-icons/react"
import { useCart } from "@/contexts/CartContext"
import { useState } from "react"
import Link from "next/link"

const Cart = () => {
    const { cart, getItemCount, getTotalPrice, removeFromCart, clearCart } = useCart()
    const [isOpen, setIsOpen] = useState(false)

    const itemCount = getItemCount()
    const totalPrice = getTotalPrice()

    return (
        <div className="relative">
            {/* Cart Icon with Badge */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative text-white hover:text-gray-200 transition"
            >
                <ShoppingCartSimple size={32} />
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
            </button>

            {/* Cart Dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                    <div className="p-4">
                        <h3 className="font-bold text-lg mb-3 text-gray-900">Shopping Cart</h3>

                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                        ) : (
                            <>
                                {/* Cart Items */}
                                <div className="max-h-96 overflow-y-auto mb-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-3 mb-3 pb-3 border-b border-gray-200">
                                            {/* Book Cover */}
                                            <div className="w-16 h-20 bg-gray-200 rounded flex-shrink-0">
                                                {item.cover_image ? (
                                                    <img
                                                        src={item.cover_image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-2xl">
                                                        📖
                                                    </div>
                                                )}
                                            </div>

                                            {/* Book Info */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-sm text-gray-900 truncate">
                                                    {item.title}
                                                </h4>
                                                <p className="text-accent font-bold text-sm">
                                                    {item.price.toFixed(2)} kr
                                                </p>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-xs text-red-600 hover:text-red-800 mt-1"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Actions & Total */}
                                <div className="border-t border-gray-300 pt-3 mb-3">
                                    <div className="flex gap-2 mb-3">
                                        <button
                                            onClick={() => {
                                                const ok = window.confirm('Are you sure you want to empty your cart?')
                                                if (ok) {
                                                    clearCart()
                                                    setIsOpen(false)
                                                }
                                            }}
                                            className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 text-sm py-2 rounded-lg font-semibold transition"
                                        >
                                            Empty cart
                                        </button>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="flex-1 bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm py-2 rounded-lg font-semibold transition"
                                        >
                                            Close
                                        </button>
                                    </div>

                                    {/* Total */}
                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-bold text-gray-900">Total:</span>
                                            <span className="font-bold text-xl text-accent">
                                                {totalPrice.toFixed(2)} kr
                                            </span>
                                        </div>

                                        {/* Checkout Button */}
                                        <Link
                                            href="/checkout"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full bg-primary hover:bg-opacity-90 text-white text-center py-2 rounded-lg font-semibold transition"
                                        >
                                            Proceed to Checkout
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Overlay to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}

export default Cart