"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import React from 'react';

export default function CategoryArticles({ params }) {
  console.log(" params",params);
  
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (slug) {
          const response = await fetch(`/api/category/${slug}`);
          if (!response.ok) {
            throw new Error('Failed to fetch article');
          }
          const data = await response.json();
          setArticles(data);
          console.log('Article data:', articles);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="mr-2" />
            Back to Categories
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            {articles?.title || 'In-depth Walkthroughs'}
          </h1>
        </div>
      </div>

      {/* Articles List */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No articles found for this category.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/knowledge-base/article/${article.slug}`}
                className="block p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <h2 className="text-base text-blue-600 hover:text-blue-700 font-medium">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="mt-1 text-sm text-gray-600">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}