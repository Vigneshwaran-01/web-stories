// components/StoryCard.jsx
import React from "react";
import Link from "next/link";

export function StoryCard({ story }) {
  return (
    <div
      key={story.id}
      className="relative rounded-3xl overflow-hidden shadow-md h-full"
    >
      <Link href={`/stories/${story.slug}`} className="block group">
        {/* Image as background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${story.thumbnail})`,
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Text */}
        <div className="relative z-10 flex flex-col bottom-0 justify-end h-full p-6">
          <h3 className="text-white font-bold text-2xl">{story.title}</h3>
          <p className="text-white text-base mt-2">
            {new Date(story.created_at).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
}
