// components/ScrollLetter.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  letter: string;
  name: string;
  onNext: () => void;
}

export default function ScrollLetter({ letter, name, onNext }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(letter.slice(0, i));
      if (i >= letter.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [letter]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden px-6 py-16"
      style={{ background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)" }}>

      {/* Candlelight glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,180,50,0.08) 0%, transparent 60%)" }} />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[#f5e6c8] text-xs tracking-[0.4em] uppercase mb-8 opacity-50"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Scroll IV · Everything I wanted to say
      </motion.p>

      {/* Letter paper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg relative"
        style={{
          background: "rgba(245, 230, 200, 0.06)",
          border: "1px solid rgba(245, 230, 200, 0.15)",
          padding: "2.5rem",
        }}
      >
        {/* Corner decorations */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#f5e6c8] opacity-30" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#f5e6c8] opacity-30" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#f5e6c8] opacity-30" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#f5e6c8] opacity-30" />

        <p className="text-[#f5e6c8] text-xs tracking-widest uppercase opacity-40 mb-6"
          style={{ fontFamily: "Georgia, serif" }}>
          Dear {name},
        </p>

        <div className="text-[#f5e6c8] leading-relaxed whitespace-pre-line opacity-80 mb-6"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem", fontStyle: "italic" }}>
          {displayed}
          {/* Cursor */}
          {!done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="inline-block w-0.5 h-4 bg-[#f5e6c8] ml-0.5 align-middle"
            />
          )}
        </div>

        {done && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#f5e6c8] text-xs tracking-widest uppercase opacity-40 mt-4"
            style={{ fontFamily: "Georgia, serif" }}>
            — Yours, always.
          </motion.p>
        )}
      </motion.div>

      {done && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="mt-10 px-8 py-3 border border-[#f5e6c8] text-[#f5e6c8] text-xs tracking-[0.3em] uppercase cursor-pointer hover:bg-white hover:text-[#1a1a2e] transition-all"
          style={{ fontFamily: "Georgia, serif", background: "transparent" }}
        >
          One last scroll →
        </motion.button>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>
    </div>
  );
}