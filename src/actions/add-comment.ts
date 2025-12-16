'use server';

import { commentSchema } from './schemas';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface AddCommentResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  comment?: {
    id: string;
    content: string;
  };
}

/**
 * Add Comment Action
 * Creates a new comment on a book
 */
export async function addCommentAction(formData: FormData): Promise<AddCommentResponse> {
  try {
    const rawData = {
      content: formData.get('content') as string,
      bookId: formData.get('bookId') as string,
    };

    // Validate with Zod
    const validatedFields = commentSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Validation failed. Please check your inputs.',
      };
    }

    const { content, bookId } = validatedFields.data;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: 'You must be logged in to comment',
      };
    }

    // Insert comment
    const { data, error } = await supabase
      .from('comments')
      .insert({
        content,
        book_id: bookId,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: 'Comment added successfully',
      comment: {
        id: data.id,
        content: data.content,
      },
    };
  } catch (error) {
    console.error('Add comment action error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
