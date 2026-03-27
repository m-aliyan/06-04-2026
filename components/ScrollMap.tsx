// components/ScrollMap.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { config } from "@/lib/birthdayConfig";

interface Props { onNext: () => void; }

export default function ScrollMap({ onNext }: Props) {
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let p = 0;
      const interval = setInterval(() => {
        p += 0.015;
        setLineProgress(Math.min(1, p));
        if (p >= 1) clearInterval(interval);
      }, 16);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  // Simple SVG map — Pakistan outline approximation
  // Cities: Karachi (bottom-left) and Kunjah/Gujrat (top-right)
  const karachiSVG = { x: 95, y: 310 };
  const kunjahSVG = { x: 310, y: 95 };
  const controlPoint = { x: 290, y: 300 }; // curve control

  const totalLength = 380; // approximate path length for stroke-dashoffset

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "linear-gradient(160deg, #fef3e2 0%, #fde8c8 50%, #fdd5a0 100%)" }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,220,120,0.2) 0%, transparent 70%)" }} />

      {/* Scroll label */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[#c9802a] text-xs tracking-[0.4em] uppercase mb-3"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Scroll I · Where we are
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[#7a3d0a] text-2xl md:text-4xl font-light text-center mb-10"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
      >
        Two cities. One heart.
      </motion.h2>

      {/* SVG Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative w-full max-w-sm"
      >
        <svg viewBox="0 0 400 400" className="w-full" xmlns="http://www.w3.org/2000/svg">
          {/* Pakistan rough outline */}
          <path
            d="M80,380 L60,320 L70,280 L90,260 L80,220 L100,180 L120,160 L110,130 L130,100 L160,80 L200,70 L240,75 L270,65 L300,80 L330,100 L340,130 L320,160 L330,190 L310,210 L290,230 L300,260 L280,290 L260,310 L240,340 L200,360 L160,370 L120,380 Z"
            fill="rgba(210, 180, 140, 0.3)"
            stroke="rgba(160, 120, 80, 0.4)"
            strokeWidth="1.5"
          />

          {/* Animated heart path line */}
          <motion.path
            d={`M ${karachiSVG.x} ${karachiSVG.y} Q ${controlPoint.x} ${controlPoint.y} ${kunjahSVG.x} ${kunjahSVG.y}`}
            fill="none"
            stroke="#e85d75"
            strokeWidth="2"
            strokeDasharray={totalLength}
            strokeDashoffset={totalLength * (1 - lineProgress)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />

          {/* Pulse along the line */}
          {lineProgress > 0.5 && (
            <motion.circle
              cx={(karachiSVG.x + kunjahSVG.x) / 2 + 80}
              cy={(karachiSVG.y + kunjahSVG.y) / 2 + 80}
              r="5"
              fill="#e85d75"
              animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}

          {/* Karachi dot */}
          <circle cx={karachiSVG.x} cy={karachiSVG.y} r="7" fill="#c9802a" />
          <circle cx={karachiSVG.x} cy={karachiSVG.y} r="12" fill="rgba(201,128,42,0.2)"
            style={{ animation: "ping 2s ease-in-out infinite" }} />
          <text x={karachiSVG.x - 10} y={karachiSVG.y + 22}
            fill="#7a3d0a" fontSize="11" fontFamily="Georgia, serif" textAnchor="middle">
            Karachi
          </text>
          <text x={karachiSVG.x - 10} y={karachiSVG.y + 34}
            fill="#c9802a" fontSize="9" fontFamily="Georgia, serif" textAnchor="middle" fontStyle="italic">
            (me)
          </text>

          {/* Kunjah dot */}
          <circle cx={kunjahSVG.x} cy={kunjahSVG.y} r="7" fill="#e85d75" />
          <circle cx={kunjahSVG.x} cy={kunjahSVG.y} r="12" fill="rgba(232,93,117,0.2)"
            style={{ animation: "ping 2s ease-in-out infinite 0.5s" }} />
          <text x={kunjahSVG.x + 10} y={kunjahSVG.y - 14}
            fill="#7a3d0a" fontSize="11" fontFamily="Georgia, serif" textAnchor="middle">
            Kunjah
          </text>
          <text x={kunjahSVG.x + 10} y={kunjahSVG.y - 2}
            fill="#e85d75" fontSize="9" fontFamily="Georgia, serif" textAnchor="middle" fontStyle="italic">
            (you)
          </text>

          {/* Heart in middle of line */}
          {lineProgress > 0.85 && (
            <motion.text
              x={(karachiSVG.x + kunjahSVG.x) / 2 + 60}
              y={(karachiSVG.y + kunjahSVG.y) / 2 + 60}
              fontSize="18"
              textAnchor="middle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              🩷
            </motion.text>
          )}
        </svg>
      </motion.div>

      {/* Distance */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: lineProgress > 0.9 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="text-[#a06020] text-sm text-center mt-4 mb-2"
        style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
      >
        ~490 km apart.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: lineProgress > 0.9 ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-[#7a3d0a] text-base md:text-lg text-center mb-10 max-w-xs"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
      >
        "Every kilometer of this distance has only made me more certain."
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: lineProgress > 0.9 ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="px-8 py-3 border border-[#c9802a] text-[#c9802a] text-xs tracking-[0.3em] uppercase cursor-pointer hover:bg-[#c9802a] hover:text-white transition-all"
        style={{ fontFamily: "Georgia, serif", background: "transparent" }}
      >
        Unroll the next scroll →
      </motion.button>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}