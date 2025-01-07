"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function KnowledgeBase() {
  const [categories, setCategories] = useState([]); // Original categories
  const [filteredCategories, setFilteredCategories] = useState([]); // Filtered categories
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
        setFilteredCategories(data); // Initialize filtered categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter categories based on the search query
  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        const filtered = categories.filter((category) =>
          category.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCategories(filtered);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setFilteredCategories(categories); // Reset filtered categories
    }
  }, [searchQuery, categories]);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#1a73e8] text-white text-center py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Knowledge Base Hub</h1>
          <p className="text-lg mb-8">
            Browse through our helpful how-to guides to get the fastest solutions to your technical issues.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="search"
              className="w-full rounded-full px-6 py-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
              placeholder="Type a keyword to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-800">No results found</h2>
            <p className="text-gray-500 mt-2">Try searching for a different keyword.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {searchQuery ? "Search Results" : "All Categories"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => router.push(`/knowledge-base/${category.slug}`)}
                  className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all cursor-pointer group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4 px-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {category.title}
                      </h3>
                      {category.icon && (
                        <img
                        
                          src={category.icon}
                          alt="category images"
                          className="w-12 h-12 p-1 object-cover"
                    
                        />
                      )}
                    </div>
                    <p className="text-gray-600 text-base mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <p className="text-blue-600 font-medium text-sm">
                      {category.articleCount || "5"} Articles
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
