import { v4 as uuid } from 'uuid'
import { createClient } from './server-client'

/*
 * Upload an image to Supabase Storage
 * @param image - The image file to upload
 * @returns Public URL of the uploaded image
 */
export const uploadImage = async (image: File) => {
  const supabase = await createClient()

  // Generate unique filename
  const imageName: string[] = image.name.split(".")
  const path: string = `${imageName[0]}-${uuid()}.${imageName[1]}`

  // Upload to storage
  const { data, error } = await supabase.storage
    .from("books")
    .upload(path, image)

  if (error) throw error

  // Get public URL
  const { data: { publicUrl } } = await supabase.storage
    .from("books")
    .getPublicUrl(data.path)

  return publicUrl;
}

/**
 * Delete an image from Supabase Storage
 * @param path - The path of the image to delete
 */
export const deleteImage = async (path: string) => {
  const supabase = await createClient()

  const { error } = await supabase.storage
    .from("books")
    .remove([path])

  if (error) throw error
}
