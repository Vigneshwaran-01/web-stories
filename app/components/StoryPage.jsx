"use client"
import { useState, useEffect } from 'react'
import { RiSearchLine } from "react-icons/ri"
import NotFound from './NotFound'
import Link from 'next/link'

export default function StoryPage() {
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotFound, setShowNotFound] = useState(false)

  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        fetchCategories()
      }, 300)
      return () => clearTimeout(timeoutId)
    } else {
      setCategories([])
      setShowNotFound(false)
    }
  }, [searchQuery])

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/api/categories${
          searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''
        }`
      )
      const data = await response.json()
      setCategories(data)
      setShowNotFound(data.length === 0)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setShowNotFound(true)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-blue-600 px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold text-white">
            Knowledge Base Hub
          </h1>
          <p className="text-lg text-blue-100">
            Browse through our helpful how-to guides to get the fastest solutions to your technical issues.
          </p>
          <div className="relative mx-auto max-w-2xl">
            <input
              type="search"
              placeholder="Type a keyword to search..."
              className="w-full rounded-full bg-white px-6 py-3 pr-12 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <RiSearchLine className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Dynamic Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {showNotFound ? (
          <NotFound />
        ) : searchQuery && categories.length > 0 ? (
          <div>
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Search Results
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category.title}
                    </h3>
                    {category.icon && (
                      <img
                        src={category.icon}
                        alt={`${category.title} icon`}
                        className="h-6 w-6 object-contain"
                      />
                    )}
                  </div>
                  <p className="mb-4 text-gray-600">
                    {category.description}
                  </p>
                  <div className="text-sm text-blue-600">
                    {category.articleCount} Articles
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

