'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { z } from "zod"

const editBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  content: z.string().optional(),
  language: z.enum(['english', 'urdu']),
  image: z.instanceof(FormData).optional()
})

export const EditBook = async ({
  bookId,
  userdata
}: {
  bookId: string
  userdata: z.infer<typeof editBookSchema>
}) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authorized")

  // Verify ownership
  const { data: book } = await supabase
    .from('books')
    .select('writer_id, cover_image')
    .eq('id', bookId)
    .single()

  if (!book || book.writer_id !== user.id) {
    throw new Error("Not authorized to edit this book")
  }

  // Handle image upload
  let coverImageUrl = book.cover_image
  if (userdata.image) {
    const image = userdata.image.get('image') as File
    if (image && image.size > 0) {
      const fileExt = image.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('books')
        .upload(filePath, image, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw new Error("Failed to upload image")

      const { data: { publicUrl } } = supabase.storage
        .from('books')
        .getPublicUrl(filePath)

      coverImageUrl = publicUrl
    }
  }

  // Generate slug from title
  const slug = userdata.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 100)

  // Update book
  const { error } = await supabase
    .from('books')
    .update({
      title: userdata.title,
      description: userdata.description,
      category: userdata.category,
      price: userdata.price,
      content: userdata.content || '',
      cover_image: coverImageUrl,
      language: userdata.language,
      slug: slug,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookId)

  if (error) throw new Error(error.message)

  redirect(`/books/${slug}`)
}
