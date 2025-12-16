'use server';

import { bookSchema } from './schemas';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface EditPostResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  book?: {
    id: string;
    title: string;
  };
}

/**
 * Edit Post (Book) Action
 * Updates an existing book
 */
export async function editPostAction(bookId: string, formData: FormData): Promise<EditPostResponse> {
  try {
    const rawData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
    };

    // Validate with Zod
    const validatedFields = bookSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Validation failed. Please check your inputs.',
      };
    }

    const { title, description, category, price } = validatedFields.data;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: 'You must be logged in to edit books',
      };
    }

    // Update book (only if user owns it)
    const { data, error } = await supabase
      .from('books')
      .update({
        title,
        description,
        category,
        price,
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookId)
      .eq('writer_id', user.id)
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
      message: 'Book updated successfully',
      book: {
        id: data.id,
        title: data.title,
      },
    };
  } catch (error) {
    console.error('Edit post action error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
