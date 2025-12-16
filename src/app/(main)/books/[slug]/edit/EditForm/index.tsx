'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { EditBook } from '@/actions/edit-book'
import { toast } from 'sonner'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/utils/translations'

interface EditFormProps {
  bookId: string
  defaultValues: {
    title: string
    description: string
    category: string
    price: number
    content: string
    language: 'english' | 'urdu'
    coverImage: string | null
  }
}

const EditForm = ({ bookId, defaultValues }: EditFormProps) => {
  const { language } = useLanguage()
  const [formData, setFormData] = useState(defaultValues)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues.coverImage)

  const { mutate, isPending } = useMutation({
    mutationFn: EditBook,
    onSuccess: () => {
      toast.success("Book updated successfully!")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update book")
    }
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let imageForm = new FormData()
    if (imageFile) {
      imageForm.append('image', imageFile)
    }

    mutate({
      bookId,
      userdata: {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        content: formData.content,
        language: formData.language,
        image: imageFile ? imageForm : undefined
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 card">
      {/* Cover Image */}
      <div>
        <label className="block text-sm font-semibold mb-2">{t('bookForm.coverImage', language)}</label>
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-40 object-cover rounded-lg"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="input-field"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold mb-2">{t('bookForm.bookTitle', language)}</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="input-field"
          placeholder={t('bookForm.titlePlaceholder', language)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-2">{t('bookForm.description', language)}</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input-field h-24"
          placeholder={t('bookForm.descriptionPlaceholder', language)}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold mb-2">{t('common.category', language)} *</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="input-field"
          required
        >
          <option value="Fiction">{t('categories.Fiction', language)}</option>
          <option value="Non-Fiction">{t('categories.Non-Fiction', language)}</option>
          <option value="Poetry">{t('categories.Poetry', language)}</option>
          <option value="Mystery">{t('categories.Mystery', language)}</option>
          <option value="Romance">{t('categories.Romance', language)}</option>
          <option value="Science Fiction">{t('categories.Science Fiction', language)}</option>
          <option value="Biography">{t('categories.Biography', language)}</option>
          <option value="Self-Help">{t('categories.Self-Help', language)}</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-semibold mb-2">{t('common.price', language)} (kr) *</label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className="input-field"
          required
        />
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-semibold mb-2">{t('common.language', language)} *</label>
        <select
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value as 'english' | 'urdu' })}
          className="input-field"
          required
        >
          <option value="english">{t('languages.english', language)}</option>
          <option value="urdu">{t('languages.urdu', language)}</option>
        </select>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-semibold mb-2">{t('bookForm.bookContent', language)}</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="input-field h-40"
          placeholder={t('bookForm.contentPlaceholder', language)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary flex-1 py-3 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? t('dashboard.updating', language) : t('common.update', language) + ' Book'}
        </button>
      </div>
    </form>
  )
}

export default EditForm
