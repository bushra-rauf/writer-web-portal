'use client'
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useState, SetStateAction } from 'react';
import { searchBooks } from '@/utils/supabase/queries';
import Link from 'next/link';

interface SearchBooksProps {
  placeholder?: string;
}

const SearchBooks = ({ placeholder = 'Search by book title...' }: SearchBooksProps) => {
    const [userInput, setUserInput] = useState<string>('')

    const {data} = useQuery({
        queryKey: ['search-books', userInput],
        queryFn: async() => {
            const {data, error} = await searchBooks(userInput)
            if (error) throw new Error
            return data
        },
        enabled: userInput && userInput.length > 2 ? true : false
    })

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUserInput(e.target.value)
    }

    return(
        <div className='relative w-full'>
            <div className='relative flex items-center'>
                <Search
                    size={20}
                    className="absolute left-3 text-gray-400 pointer-events-none"
                />
                <input
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
                    name='search'
                    placeholder={placeholder}
                    value={userInput}
                />
            </div>

            {data && data.length > 0 &&
                <div
                    onClick={() => setUserInput('')}
                    className='absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50'
                >
                    <div className="max-h-80 overflow-y-auto">
                        {data.map(({id, title, slug, writer_name, price, category}) => (
                            <Link
                                className='block px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0'
                                key={id}
                                href={`/books/${slug}`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <Search size={16} className="text-gray-400" />
                                            <span className="text-gray-900 font-medium">{title}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 ml-6">
                                            {writer_name} • {category}
                                        </div>
                                    </div>
                                    <span className="text-primary font-semibold">${price}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchBooks
