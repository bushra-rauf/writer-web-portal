import { z } from 'zod';


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const signupSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.enum(['reader', 'writer'], { message: 'Please select user type' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})


export const bookSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title is required' })
    .max(200, { message: 'Title must be less than 200 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' })
    .max(5000, { message: 'Description must be less than 5000 characters' }),
  category: z
    .string()
    .min(1, { message: 'Category is required' }),
  price: z
    .number()
    .min(0, { message: 'Price must be 0 or greater' })
    .max(10000, { message: 'Price must be less than 10000' }),
});

/**
 * Comment Schema
 * Validates comment data
 */
export const commentSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Comment cannot be empty' })
    .max(1000, { message: 'Comment must be less than 1000 characters' }),
  bookId: z.string().uuid({ message: 'Invalid book ID' }),
});

/**
 * Edit Comment Schema
 */
export const editCommentSchema = z.object({
  commentId: z.string().uuid({ message: 'Invalid comment ID' }),
  content: z
    .string()
    .min(1, { message: 'Comment cannot be empty' })
    .max(1000, { message: 'Comment must be less than 1000 characters' }),
});

/**
 * Delete Schema
 * Generic delete validation
 */
export const deleteSchema = z.object({
  id: z.string().uuid({ message: 'Invalid ID' }),
});

// Type exports for TypeScript
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type BookInput = z.infer<typeof bookSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
export type EditCommentInput = z.infer<typeof editCommentSchema>;
export type DeleteInput = z.infer<typeof deleteSchema>;
