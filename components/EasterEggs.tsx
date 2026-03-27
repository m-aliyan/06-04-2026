// components/EasterEggs.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const eggs = [
  { id: 1, emoji: "🦀", message: "You thought I forgot the crab incident. I didn't.", x: "8%", y: "20%" },
  { id: 2, emoji: "⭐", message: "I looked at this same star and thought of you.", x: "88%", y: "12%" },
  { id: 3, emoji: "🌊", message: "Every wave tonight is carrying something from me to you.", x: "5%", y: "75%" },
  { id: 4, emoji: "🕯️", message: "I'd light a thousand of these just to be in the same room as you.", x: "90%", y: "60%" },
  { id: 5, emoji: "📮", message: "I almost sent you a real letter. Then I made a whole website instead.", x: "45%", y: "90%" },
];

export default function EasterEggs() {
  const [found, setFound] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setFound((f) => [...new Set([...f, id])]);
    setActive(id);
    setTimeout(() => setActive(null), 3000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {eggs.map((egg) => (
        <div
          key={egg.id}
          className="absolute pointer-events-auto"
          style={{ left: egg.x, top: egg.y }}
        >
          <motion.button
            onClick={() => handleClick(egg.id)}
            animate={{
              scale: [1, 1.1, 1],
              opacity: found.includes(egg.id) ? 0.3 : [0.4, 0.7, 0.4],
            }}
            transition={{ repeat: Infinity, duration: 3, delay: egg.id * 0.5 }}
            className="text-xl cursor-pointer bg-transparent border-none p-1"
            title="👀"
          >
            {egg.emoji}
          </motion.button>

          <AnimatePresence>
            {active === egg.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute z-50 w-52 p-3 text-xs leading-relaxed"
                style={{
                  left: "110%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(20, 20, 40, 0.92)",
                  border: "1px solid rgba(245, 230, 200, 0.2)",
                  color: "#f5e6c8",
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  backdropFilter: "blur(8px)",
                }}
              >
                "{egg.message}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Found counter */}
      {found.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 text-xs tracking-widest uppercase pointer-events-none"
          style={{ fontFamily: "Georgia, serif", color: "rgba(245,230,200,0.4)" }}
        >
          {found.length}/{eggs.length} secrets found
        </motion.div>
      )}
    </div>
  );
}