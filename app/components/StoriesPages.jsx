// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';


// const StoriesPages = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/stories');
//         if (!response.ok) throw new Error('Failed to fetch stories');
//         const data = await response.json();
//         setStories(data);
//       } catch (err) {
//         console.error('Error:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStories();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-red-500 font-semibold">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
//           Web Stories
//         </h1>
       
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {stories.map((story) => (
//               <Link href={`/stories/${story.slug}`} key={story.id} className="block group">
//                 <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg bg-white">
//                   <img
//                     src={story.thumbnail}
//                     alt={story.title}
//                     className="w-full h-full object-cover transition-transform group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:from-gray-700/70 transition-all"></div>
//                   <div className="absolute bottom-4 left-4 right-4 text-white">
//                     <h2 className="text-lg font-bold truncate">{story.title}</h2>
//                     <p className="text-sm opacity-75">
//                       {new Date(story.created_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
      
//       </div>
//     </div>
//   );
// };

// export default StoriesPages;

  // const images = [
  //   "/img1.jpg",
  //   "/img2.jpg",
  //   "/stories/christmas-carol.jpg",
  //   "/stories/polar-express.jpg",
  //   "/img4.jpg",
  //   "/img2.jpg",
  //   // Add more image paths as needed
  // ];


"use client";

import React, { useEffect, useState } from "react";
import { StoryCard } from "./StoryCard";
import { CornerDownRight } from 'lucide-react';
import { InfiniteCarousel } from "@/components/ui/apple-cards-carousel"; // Adjust the import path
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { CategoryStories } from "./CategoryStories";


export function StoriesPages() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/stories");
        if (!response.ok) throw new Error("Failed to fetch stories");
        const data = await response.json();
        setStories(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 font-semibold">Error: {error}</p>
      </div>
    );
  }


  const cards = stories.map((story) => <StoryCard key={story.id} story={story} />);


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      {/* Carousel Section */}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest stories</h1>
        <InfiniteCarousel items={cards} />
      </div>
      {/* <ParallaxScroll  cards={cards} className="bg-gray-100 " /> */}
     {/* Parallax Section */}

     


     <div className=" min-h-screen  ">
      <h1 className="text-center text-3xl font-bold py-10">All Stories</h1>
    
      <ParallaxScroll  cards={cards} />
    </div>
     
    
    <div className="max-w-6xl mx-auto relative my-16  ">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Category Travel</h1>
        <CategoryStories category="Travel" />
        
      <button className="font-semibold text-gray-800 py-6 text-end  flex gap-2">
      <CornerDownRight /> Load More</button>
      </div>

      {/* <div className="max-w-6xl mx-auto relative my-16  ">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Category Food</h1>
        <CategoryStories category="Food" />
        
      <button className="font-semibold text-gray-800 py-6 text-end  flex gap-2">
      <CornerDownRight /> Load More</button>
      </div> */}
    </div>
  );
}









