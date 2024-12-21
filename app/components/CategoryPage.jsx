"use client"
import { useState, useEffect } from 'react'
import { RiArrowLeftLine } from "react-icons/ri"
import { useRouter } from 'next/navigation'

export default function CategoryPage({ slug }) {
  const [category, setCategory] = useState(null)
  const [articles, setArticles] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchCategory()
    fetchArticles()
  }, [slug])

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/api/categories/${slug}`
      )
      const data = await response.json()
      setCategory(data)
    } catch (error) {
      console.error('Error fetching category:', error)
    }
  }

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/api/categories/${slug}/articles`
      )
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  }

  if (!category) return null

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <RiArrowLeftLine className="mr-2" />
          Back to Search Results
        </button>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          {category.title}
        </h2>
        <p className="mt-2 text-gray-600">{category.description}</p>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {article.title}
            </h3>
            <div 
              className="prose text-gray-600"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            <div className="mt-4 text-sm text-gray-500">
              Last updated: {new Date(article.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 