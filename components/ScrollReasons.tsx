// components/ScrollReasons.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  reasons: string[];
  onNext: () => void;
}

export default function ScrollReasons({ reasons, onNext }: Props) {
  const [index, setIndex] = useState(0);
  const done = index >= reasons.length;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-8"
      style={{ background: "linear-gradient(160deg, #fef3e2 0%, #fde8c8 50%, #fdd5a0 100%)" }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,220,120,0.2) 0%, transparent 70%)" }} />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[#c9802a] text-xs tracking-[0.4em] uppercase mb-3 opacity-60"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Scroll III · Why you
      </motion.p>

      {/* Progress dots */}
      <div className="flex gap-2 mb-12">
        {reasons.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i <= index ? "#c9802a" : "rgba(201,128,42,0.2)" }} />
        ))}
      </div>

      <div className="relative w-full max-w-md min-h-[160px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="text-[#a06020] text-xs tracking-widest uppercase mb-4"
                style={{ fontFamily: "Georgia, serif" }}>
                {String(index + 1).padStart(2, "0")} / {String(reasons.length).padStart(2, "0")}
              </p>
              <p className="text-[#7a3d0a] text-xl md:text-2xl leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}>
                "{reasons[index]}"
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="text-[#7a3d0a] text-2xl md:text-3xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}>
                And so many more.
              </p>
              <p className="text-[#a06020] text-sm opacity-70"
                style={{ fontFamily: "Georgia, serif" }}>
                I just ran out of scrolls.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-14 flex gap-4">
        {!done ? (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => setIndex((i) => i + 1)}
            className="px-8 py-3 bg-[#c9802a] text-white text-xs tracking-[0.3em] uppercase cursor-pointer"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Next reason →
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="px-8 py-3 border border-[#c9802a] text-[#c9802a] text-xs tracking-[0.3em] uppercase cursor-pointer hover:bg-[#c9802a] hover:text-white transition-all"
            style={{ fontFamily: "Georgia, serif", background: "transparent" }}
          >
            Unroll the next scroll →
          </motion.button>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>
    </div>
  );
}