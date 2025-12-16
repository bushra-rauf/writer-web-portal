'use server';

import { deleteSchema } from './schemas';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface DeleteCommentResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Delete Comment Action
 * Deletes a comment
 */
export async function deleteCommentAction(commentId: string): Promise<DeleteCommentResponse> {
  try {
    // Validate with Zod
    const validatedFields = deleteSchema.safeParse({ id: commentId });

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid comment ID',
      };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: 'You must be logged in to delete comments',
      };
    }

    // Delete comment (only if user owns it)
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', user.id);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: 'Comment deleted successfully',
    };
  } catch (error) {
    console.error('Delete comment action error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
