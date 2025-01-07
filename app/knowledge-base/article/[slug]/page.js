"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function ArticlePage({ params: initialParams }) {
  const [params, setParams] = useState(null);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Resolve the `params` Promise using React.use()
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await initialParams;
      setParams(resolvedParams);
    };
    resolveParams();
  }, [initialParams]);

  // Fetch the article once `params` is resolved
  useEffect(() => {
    const fetchArticle = async () => {
      if (params && params.slug) {
        try {
          const response = await fetch(`/api/article/${params.slug}`);
          if (!response.ok) throw new Error("Failed to fetch article");
          const data = await response.json();
          setArticle(data);
        } catch (error) {
          console.error("Error:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArticle();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: Article not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r border-b from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href={`/knowledge-base/${article.category_id}`}
              className="inline-flex items-center text-blue-100 hover:text-white transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to {article.category_title}
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white">{article.title}</h1>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 mt-6 border rounded-lg py-8">
        <div className="prose prose-gray max-w-none">
          <div className="text-gray-600 leading-relaxed">
          <h2 className="text-xl font-semibold text-gray-900 ml-4 mt-8 mb-4">
              Here are Some Common Causes:
            </h2>
            {/* Why File Upload Issues Occur Section */}
           
            <div
            className="prose prose-blue max-w-none px-4"
            dangerouslySetInnerHTML={{ __html: article.content}}
          ></div> 
            {/* Common Causes Section */}
          
            <ul className="space-y-3 list-disc pl-5 text-gray-600">
              {article.causes?.map((cause, index) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>

         
          </div>
        </div>
      </div>
    </div>
  );
}
