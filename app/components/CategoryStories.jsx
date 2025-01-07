import  { useEffect, useState } from "react";
import { StoryCard } from "./StoryCard";
import { InfiniteCarousel } from "@/components/ui/apple-cards-carousel";


export  function CategoryStories({ category }) {
    const [categoryStories, setCategoryStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCategoryStories = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/stories?category=${category}`);
          if (!response.ok) throw new Error("Failed to fetch category stories");
          const data = await response.json();
          setCategoryStories(data);
        } catch (err) {
          console.error("Error:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategoryStories();
    }, [category]);
  
    if (loading) {
      return <p>Loading category stories...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
    const cards = categoryStories.map((story) => <StoryCard key={story.id} story={story} />);
  
    return (
       
        <InfiniteCarousel items={cards} />
     
    );
  }



  