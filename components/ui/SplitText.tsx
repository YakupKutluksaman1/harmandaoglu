"use client";

import { motion } from "framer-motion";

export function SplitText({
  text,
  className = "",
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="mr-[0.28em] inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "120%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + wi * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
