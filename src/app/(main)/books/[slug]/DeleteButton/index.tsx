'use client'

import { useMutation } from "@tanstack/react-query"
import { DeleteBook } from "@/actions/delete-book"
import { toast } from "sonner"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/utils/translations"

const DeleteButton = ({ bookId }: { bookId: string }) => {
    const { language } = useLanguage()

    const { mutate, isPending } = useMutation({
        mutationFn: DeleteBook,
        onMutate: () => {
            toast.loading("Deleting book...")
        },
        onSuccess: () => {
            toast.success("Book deleted successfully!")
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete book")
        }
    })

    const handleDelete = () => {
        if (confirm(t('bookDetail.confirmDelete', language) || "Are you sure you want to delete this book?")) {
            mutate(bookId)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isPending ? t('common.deleting', language) || "Deleting..." : t('common.delete', language) || "Delete Book"}
        </button>
    )
}

export default DeleteButton
