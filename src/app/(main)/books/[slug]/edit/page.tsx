import { getSingleBook } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import EditForm from "./EditForm"
import EditPageWrapper from "./EditPageWrapper"

const EditBookPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const { data, error } = await getSingleBook(slug)

  if (error || !data) {
    redirect('/books')
  }

  // Check if user is the author
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.id !== data.writer_id) {
    redirect('/books')
  }

  return (
    <EditPageWrapper
      bookId={data.id}
      defaultValues={{
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        content: data.content || '',
        language: data.language,
        coverImage: data.cover_image
      }}
    />
  )
}

export default EditBookPage
