'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import { z } from "zod"

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  content: z.string().optional(),
  language: z.enum(['english', 'urdu']),
  image: z.instanceof(FormData).optional()
})

export const CreateBook = async (userdata: z.infer<typeof bookSchema>) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authorized")

  // Ensure writer record exists
  const { data: writerExists } = await supabase
    .from('writers')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!writerExists) {
    const { error: writerError } = await supabase
      .from('writers')
      .insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || null,
        bio: null,
      })

    if (writerError) throw new Error("Failed to create writer profile")
  }

  // Handle image upload
  let coverImageUrl = null
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

  // Generate slug
  const slug = userdata.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 100)

  // Insert book
  const { error } = await supabase
    .from('books')
    .insert({
      writer_id: user.id,
      writer_name: user.email,
      title: userdata.title,
      description: userdata.description,
      category: userdata.category,
      price: userdata.price,
      content: userdata.content || '',
      cover_image: coverImageUrl,
      language: userdata.language,
      published: true,
      slug: slug,
    })

  if (error) throw new Error(error.message)

  return { success: true }
}
