"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const ParallaxScroll = ({ images, className, cards }) => {
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Reduce translate offsets to avoid overflow
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const translateFourth = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className={cn("relative overflow-visible w-full", className)} ref={gridRef}>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start mx-auto gap-5 sm:gap-4 md:gap-10 py-20 md:py-20 px-5 sm:px-8 md:px-10">
        {/* First Column */}
        <div className="grid gap-8 sm:gap-12 md:gap-16">
          {cards.map(
            (card, idx) =>
              idx % 4 === 0 && (
                <motion.div
                   style={{
                    y: window.innerWidth >= 640 ? translateFirst : 0,
                  }}
                  key={"card-1-" + idx}
                  className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
                >
                  {card}
                </motion.div>
              )
          )}
        </div>

        {/* Second Column */}
        <div className="grid gap-8 sm:gap-12 md:gap-16">
          {cards.map(
            (card, idx) =>
              idx % 4 === 1 && (
                <motion.div
                style={{
                  y: window.innerWidth >= 640 ? translateSecond : 0,
                }}
                  key={"card-2-" + idx}
                  className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
                >
                  {card}
                </motion.div>
              )
          )}
        </div>

        {/* Third Column */}
        <div className="grid gap-8 sm:gap-12 md:gap-16">
          {cards.map(
            (card, idx) =>
              idx % 4 === 2 && (
                <motion.div
                style={{
                  y: window.innerWidth >= 640 ? translateThird : 0,
                }}
                  key={"card-3-" + idx}
                  className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
                >
                  {card}
                </motion.div>
              )
          )}
        </div>

        {/* Fourth Column */}
        <div className="grid gap-8 sm:gap-12 md:gap-16">
          {cards.map(
            (card, idx) =>
              idx % 4 === 3 && (
                <motion.div
                style={{
                  y: window.innerWidth >= 640 ? translateFourth : 0,
                }}
                  key={"card-4-" + idx}
                  className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]"
                >
                  {card}
                </motion.div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
