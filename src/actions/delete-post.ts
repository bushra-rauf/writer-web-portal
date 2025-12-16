'use server';

import { deleteSchema } from './schemas';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface DeletePostResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Delete Post (Book) Action
 * Deletes a book
 */
export async function deletePostAction(bookId: string): Promise<DeletePostResponse> {
  try {
    // Validate with Zod
    const validatedFields = deleteSchema.safeParse({ id: bookId });

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid book ID',
      };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: 'You must be logged in to delete books',
      };
    }

    // Delete book (only if user owns it)
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId)
      .eq('writer_id', user.id);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: 'Book deleted successfully',
    };
  } catch (error) {
    console.error('Delete post action error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
