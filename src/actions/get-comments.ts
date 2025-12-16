'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  book_id: string;
}

interface GetCommentsResponse {
  success: boolean;
  message: string;
  comments?: Comment[];
}

/**
 * Get Comments Action
 * Fetches comments for a specific book
 */
export async function getCommentsAction(bookId: string): Promise<GetCommentsResponse> {
  try {
    if (!bookId) {
      return {
        success: false,
        message: 'Book ID is required',
      };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('book_id', bookId)
      .order('created_at', { ascending: false });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: 'Comments fetched successfully',
      comments: data || [],
    };
  } catch (error) {
    console.error('Get comments action error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
