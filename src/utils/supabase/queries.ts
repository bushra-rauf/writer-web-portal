import { createClient } from "./browser-client";
import { type QueryData } from "@supabase/supabase-js";

/**
 * Get all books for the home page
 */
export const getHomeBooks = async () => {
  const supabase = createClient();
  return await supabase
    .from('books')
    .select('id, title, description, price, category, cover_image, writer_name, rating, slug')
    .order("created_at", { ascending: false })
}

/**
 * Get a single book by slug
 */
export const getSingleBook = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from('books')
    .select('*')
    .eq('slug', slug)
    .single()
}

/**
 * Get featured books (latest 6)
 */
export const getFeaturedBooks = async () => {
  const supabase = createClient();
  return await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)
}

/**
 * Search books by title
 */
export const searchBooks = async (search: string) => {
  const supabase = createClient();
  return await supabase
    .from('books')
    .select('id, title, writer_name, price, category, slug')
    .ilike('title', `%${search}%`)
}

/**
 * Get books by writer
 */
export const getBooksByWriter = async (writerId: string) => {
  const supabase = createClient();
  return await supabase
    .from('books')
    .select('*')
    .eq('writer_id', writerId)
    .order("created_at", { ascending: false })
}

/**
 * Get books by category
 */
export const getBooksByCategory = async (category: string) => {
  const supabase = createClient();
  return await supabase
    .from('books')
    .select('*')
    .eq('category', category)
    .order("created_at", { ascending: false })
}

/**
 * Get ratings for a book
 */
export const getRatings = async (bookId: string) => {
  const supabase = createClient();
  return await supabase
    .from('ratings')
    .select('*')
    .eq('book_id', bookId)
    .order('created_at', { ascending: false })
}

// Type exports
export type HomeBooksType = QueryData<ReturnType<typeof getHomeBooks>>
export type SingleBookType = QueryData<ReturnType<typeof getSingleBook>>
