'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"

export const DeleteBook = async (bookId: string) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authorized")

  // Verify ownership
  const { data: book } = await supabase
    .from('books')
    .select('writer_id')
    .eq('id', bookId)
    .single()

  if (!book || book.writer_id !== user.id) {
    throw new Error("Not authorized to delete this book")
  }

  // Delete book
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', bookId)

  if (error) throw new Error(error.message)

  redirect('/dashboard')
}
