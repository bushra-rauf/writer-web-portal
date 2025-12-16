import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/utils/translations"

const EditButton = ({ slug }: { slug: string }) => {
    return (
        <Link
            href={`/books/${slug}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 inline-block"
        >
            Edit Book
        </Link>
    )
}

export default EditButton
