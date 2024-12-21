"use client"
import { usePathname } from 'next/navigation'
import StoryPage from './StoryPage'
import CategoryPage from './CategoryPage'

export default function MainContent() {
  const pathname = usePathname()
  
  // Extract category slug from path if we're on a category page
  const categorySlug = pathname.startsWith('/category/') 
    ? pathname.split('/')[2] 
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      {categorySlug ? (
        <CategoryPage slug={categorySlug} />
      ) : (
        <StoryPage />
      )}
    </div>
  )
} 

