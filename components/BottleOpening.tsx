// components/BottleOpening.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props { onNext: () => void; }

export default function BottleOpening({ onNext }: Props) {
  const [stage, setStage] = useState<"shore" | "tap" | "open" | "scrolls">("shore");

  const handleBottleTap = () => {
    if (stage === "shore") setStage("tap");
    else if (stage === "tap") setStage("open");
    else if (stage === "open") setStage("scrolls");
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d1f3c 0%, #1a4a7a 50%, #c9a96e 85%, #b8935a 100%)" }}
    >
      {/* Stars */}
      <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: "2px", height: "2px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.6 + 0.2,
            }} />
        ))}
      </div>

      {/* Animated wave at shore */}
      <div className="absolute bottom-[14%] left-0 right-0 h-12 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="h-full w-[200%]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {(stage === "shore" || stage === "tap") && (
          <motion.div
            key="bottle"
            className="flex flex-col items-center cursor-pointer select-none"
            onClick={handleBottleTap}
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1, y: [0, -8, 0] }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{
              x: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 1 },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            }}
          >
            {/* Bottle SVG */}
            <svg width="80" height="160" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cork */}
              <rect x="28" y="10" width="24" height="18" rx="4" fill="#c9a96e" />
              {/* Neck */}
              <rect x="30" y="26" width="20" height="24" rx="3" fill="rgba(150,210,180,0.75)" stroke="rgba(200,240,220,0.9)" strokeWidth="1.5" />
              {/* Body */}
              <ellipse cx="40" cy="104" rx="28" ry="42" fill="rgba(150,210,180,0.65)" stroke="rgba(200,240,220,0.9)" strokeWidth="1.5" />
              {/* Glow inside */}
              <ellipse cx="40" cy="104" rx="16" ry="26" fill="rgba(255,200,80,0.25)" />
              {/* Scroll hint inside */}
              <rect x="32" y="88" width="16" height="22" rx="3" fill="rgba(245,230,200,0.6)" />
            </svg>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-6 text-[#f5e6c8] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {stage === "shore" ? "tap to open" : "pull the cork..."}
            </motion.p>
          </motion.div>
        )}

        {stage === "open" && (
          <motion.div
            key="opening"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={handleBottleTap}
          >
            <motion.div
              animate={{ rotate: [0, -15, 15, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Open bottle */}
              <svg width="80" height="160" viewBox="0 0 80 160" fill="none">
                <rect x="30" y="26" width="20" height="24" rx="3" fill="rgba(150,210,180,0.75)" stroke="rgba(200,240,220,0.9)" strokeWidth="1.5" />
                <ellipse cx="40" cy="104" rx="28" ry="42" fill="rgba(150,210,180,0.65)" stroke="rgba(200,240,220,0.9)" strokeWidth="1.5" />
                {/* Scroll coming out */}
                <motion.rect
                  initial={{ y: 80 }} animate={{ y: -10 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  x="32" width="16" height="30" rx="3" fill="#f5e6c8" />
              </svg>
            </motion.div>
            <p className="mt-6 text-[#f5e6c8] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "Georgia, serif" }}>
              there's something inside...
            </p>
          </motion.div>
        )}

        {stage === "scrolls" && (
          <motion.div
            key="scrolls"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center px-8 max-w-md"
          >
            <p className="text-[#f5e6c8] text-sm tracking-[0.25em] uppercase mb-4 opacity-60" style={{ fontFamily: "Georgia, serif" }}>
              inside the bottle
            </p>
            <h2 className="text-[#f5e6c8] text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}>
              Five scrolls. Five things<br />I need you to know.
            </h2>
            <p className="text-[#f5e6c8] opacity-60 text-sm mb-10" style={{ fontFamily: "Georgia, serif" }}>
              Unroll them one by one.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="px-8 py-3 border border-[#f5e6c8] text-[#f5e6c8] text-xs tracking-[0.3em] uppercase cursor-pointer hover:bg-white hover:text-[#0d1f3c] transition-all"
              style={{ fontFamily: "Georgia, serif", background: "transparent" }}
            >
              Unroll the first scroll →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}