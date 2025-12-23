'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function BookCard({ book }) {
  const [isHovered, setIsHovered] = useState(false);
  const isUrdu = book.language === 'urdu';

  return (
    <div
      className="card h-full flex flex-col cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      {/* Book Cover */}
      <div className="w-full h-56 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4 flex items-center justify-center text-white text-4xl overflow-hidden">
        {book.cover_image ? (
          <img src={book.cover_image} alt={book.title} className="w-full h-full object-contain bg-white" />
        ) : (
          <span>📖</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h3 className="font-bold text-lg line-clamp-2 mb-2" style={{ textAlign: isUrdu ? 'right' : 'left' }}>
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2" style={{ textAlign: isUrdu ? 'right' : 'left' }}>
          {isUrdu ? `بذریعہ ${book.writer_name}` : `by ${book.writer_name}`}
        </p>

        {/* Category and Language Badges */}
        <div className="mb-3 flex gap-2 flex-wrap" style={{ justifyContent: isUrdu ? 'flex-end' : 'flex-start' }}>
          <span className="inline-block bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-medium">
            {book.category}
          </span>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            isUrdu
              ? 'bg-green-100 text-green-800'
              : 'bg-purple-100 text-purple-800'
          }`}>
            {isUrdu ? 'اردو' : 'English'}
          </span>
        </div>

        {/* Rating */}
        <div className={`flex items-center mb-3 ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-yellow-500 text-sm">★</span>
          <span className={`${isUrdu ? 'mr-1' : 'ml-1'} text-sm text-gray-600`}>
            {book.rating ? book.rating.toFixed(1) : (isUrdu ? 'کوئی درجہ بندی نہیں' : 'No ratings')}
          </span>
        </div>

        {/* Preview Text */}
        <p className="text-gray-600 text-sm line-clamp-3 min-h-[60px]" style={{ textAlign: isUrdu ? 'right' : 'left' }}>
          {book.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
        <span className={`font-bold text-lg text-accent ${isUrdu ? 'order-2' : 'order-1'}`} dir="ltr">{book.price.toFixed(2)} kr</span>
        <Link
          href={`/books/${book.slug}`}
          className={`btn-primary px-3 py-2 text-sm ${isUrdu ? 'order-1' : 'order-2'}`}
        >
          View
        </Link>
      </div>
    </div>
  );
}
