'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { CreateBook } from '@/actions/create-book'
import { toast } from 'sonner'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/utils/translations'

interface BookFormProps {
  user: any
  onSuccess: () => void
}

const BookForm = ({ user, onSuccess }: BookFormProps) => {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Fiction',
    price: '',
    content: '',
    language: 'english' as 'english' | 'urdu',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: CreateBook,
    onSuccess: () => {
      toast.success('Book published successfully!')
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'Fiction',
        price: '',
        content: '',
        language: 'english',
      })
      setImageFile(null)
      setImagePreview(null)
      onSuccess()
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to publish book')
    }
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }

      setImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.price) {
      toast.error('Please fill in all required fields')
      return
    }

    let imageForm = new FormData()
    if (imageFile) {
      imageForm.append('image', imageFile)
    }

    mutation.mutate({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: Number(formData.price),
      content: formData.content,
      language: formData.language,
      image: imageFile ? imageForm : undefined
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Cover Image Upload */}
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
        <p className="text-sm text-gray-500 mt-1">{t('bookForm.imageHint', language)}</p>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold mb-2">{t('bookForm.title', language)} *</label>
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
        <label className="block text-sm font-semibold mb-2">{t('bookForm.description', language)} *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input-field h-24"
          placeholder={t('bookForm.descriptionPlaceholder', language)}
          required
        />
      </div>

      {/* Category and Price Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">{t('bookForm.category', language)} *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="input-field"
            required
          >
            <option value="Fiction">{t('categories.fiction', language)}</option>
            <option value="Non-Fiction">{t('categories.nonFiction', language)}</option>
            <option value="Poetry">{t('categories.poetry', language)}</option>
            <option value="Mystery">{t('categories.mystery', language)}</option>
            <option value="Romance">{t('categories.romance', language)}</option>
            <option value="Science Fiction">{t('categories.scienceFiction', language)}</option>
            <option value="Biography">{t('categories.biography', language)}</option>
            <option value="History">{t('categories.history', language)}</option>
            <option value="Self-Help">{t('categories.selfHelp', language)}</option>
            <option value="Other">{t('categories.other', language)}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">{t('bookForm.price', language)}</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="input-field"
            placeholder="99.00"
            required
          />
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-semibold mb-2">{t('bookForm.language', language)} *</label>
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
        <label className="block text-sm font-semibold mb-2">{t('bookForm.content', language)} ({t('common.optional', language)})</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="input-field h-40"
          placeholder={t('bookForm.contentPlaceholder', language)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="btn-primary w-full py-3 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? t('common.publishing', language) || 'Publishing...' : t('bookForm.publishBook', language)}
      </button>
    </form>
  )
}

export default BookForm
