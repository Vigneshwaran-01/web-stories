import React, { useEffect, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

export const InfiniteCarousel = ({ items }) => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef(null);
  const scrollSpeed = 2;
  const direction = useRef(1);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;

    const animate = () => {
      if (!isAutoScrolling || !container) return;
      
      container.scrollLeft += scrollSpeed * direction.current;
      
      // Reset scroll position when reaching the end or start
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft = maxScroll;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAutoScrolling]);

  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  const startScrolling = (dir) => {
    direction.current = dir;
    setIsAutoScrolling(true);
  };

  // Triple the items to ensure smooth looping
  const extendedItems = [...items, ...items, ...items];

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-scroll rounded-lg scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 h-80 rounded-xl overflow-hidden"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Control buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        // onMouseEnter={() => startScrolling(-1)}
        // onMouseLeave={() => startScrolling(1)}
      >
         {/* <ChevronLeft className="w-6 h-6" /> */}
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2  p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        // onMouseEnter={() => startScrolling(2)} // Faster scroll to the right
        // onMouseLeave={() => startScrolling(1)}
      >
        {/* <ChevronRight className="w-6 h-6" /> */}
      </button>
    </div>
  );
};