'use server';

import { editCommentSchema } from './schemas';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface EditCommentResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Edit Comment Action
 * Updates an existing comment
 */
export async function editCommentAction(formData: FormData): Promise<EditCommentResponse> {
  try {
    const rawData = {
      commentId: formData.get('commentId') as string,
      content: formData.get('content') as string,
    };

    // Validate with Zod
    const validatedFields = editCommentSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Validation failed. Please check your inputs.',
      };
    }

    const { commentId, content } = validatedFields.data;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: 'You must be logged in to edit comments',
      };
    }

    // Update comment (only if user owns it)
    const { error } = await supabase
      .from('comments')
      .update({ content, updated_at: new Date().toISOString() })
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
      message: 'Comment updated successfully',
    };
  } catch (error) {
    console.error('Edit comment action error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
