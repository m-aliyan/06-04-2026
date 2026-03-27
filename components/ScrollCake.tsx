// components/ScrollCake.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface Props {
  name: string;
  nextMeetingDate: Date | null;
  nextMeetingLabel: string;
}

function getDaysUntil(date: Date | null): number | null {
  if (!date) return null;
  const diff = date.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

export default function ScrollCake({ name, nextMeetingDate, nextMeetingLabel }: Props) {
  const [blown, setBlown] = useState(false);
  const daysUntil = getDaysUntil(nextMeetingDate);

  const blowCandles = () => {
    if (blown) return;
    setBlown(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#f5e6c8", "#e8c97a", "#ff69b4", "#ffffff", "#ffd700"],
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "linear-gradient(160deg, #fef3e2 0%, #fde8c8 50%, #fdd5a0 100%)" }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,220,120,0.25) 0%, transparent 70%)" }} />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[#c9802a] text-xs tracking-[0.4em] uppercase mb-3 opacity-60"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Scroll V · Make a wish
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-[#7a3d0a] text-base md:text-lg text-center max-w-sm mb-10 leading-relaxed"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
      >
        "I can't be there to blow these out with you.
        <br />So I'm asking you to blow them out for both of us."
      </motion.p>

      {/* Cake SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="cursor-pointer select-none mb-4"
        onClick={blowCandles}
        whileHover={{ scale: blown ? 1 : 1.05 }}
        title={blown ? "" : "Click to blow out the candles!"}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Plate */}
          <ellipse cx="100" cy="175" rx="80" ry="10" fill="rgba(180,140,80,0.3)" />

          {/* Cake bottom layer */}
          <rect x="30" y="130" width="140" height="45" rx="8" fill="#e8956d" />
          <rect x="30" y="130" width="140" height="15" rx="4" fill="#f0a882" />

          {/* Cake top layer */}
          <rect x="45" y="95" width="110" height="40" rx="8" fill="#f0a882" />
          <rect x="45" y="95" width="110" height="14" rx="4" fill="#f5bfa0" />

          {/* Frosting drips */}
          {[55, 75, 95, 115, 135].map((x, i) => (
            <ellipse key={i} cx={x} cy="95" rx="7" ry="5" fill="white" opacity="0.85" />
          ))}
          {[60, 85, 110, 130].map((x, i) => (
            <ellipse key={i} cx={x} cy="130" rx="8" ry="5" fill="white" opacity="0.75" />
          ))}

          {/* Candles */}
          {[65, 100, 135].map((x, i) => (
            <g key={i}>
              <rect x={x - 4} y="70" width="8" height="26" rx="3"
                fill={["#ff8fab", "#ffd166", "#a8dadc"][i]} />
              {/* Flame or blown */}
              <AnimatePresence>
                {!blown ? (
                  <motion.g key="flame" exit={{ opacity: 0, scale: 0 }}>
                    <motion.ellipse
                      cx={x} cy="64"
                      rx="5" ry="8"
                      fill="#ffd700"
                      animate={{ scaleY: [1, 1.2, 0.9, 1], scaleX: [1, 0.9, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: i * 0.2 }}
                    />
                    <motion.ellipse
                      cx={x} cy="66"
                      rx="3" ry="5"
                      fill="#ff8c00"
                      animate={{ scaleY: [1, 1.3, 0.8, 1] }}
                      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: i * 0.15 }}
                    />
                  </motion.g>
                ) : (
                  <motion.text
                    key="smoke"
                    x={x} y="60"
                    textAnchor="middle"
                    fontSize="10"
                    initial={{ opacity: 1, y: 60 }}
                    animate={{ opacity: 0, y: 40 }}
                    transition={{ duration: 1.5 }}
                  >
                    〰
                  </motion.text>
                )}
              </AnimatePresence>
            </g>
          ))}

          {/* Decorations */}
          <text x="100" y="122" textAnchor="middle" fontSize="11" fill="white" opacity="0.9"
            fontFamily="Georgia, serif" fontStyle="italic">
            Happy Birthday
          </text>
        </svg>
      </motion.div>

      {!blown && (
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#c9802a] text-xs tracking-[0.3em] uppercase mb-8"
          style={{ fontFamily: "Georgia, serif" }}
        >
          tap the cake
        </motion.p>
      )}

      <AnimatePresence>
        {blown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 max-w-sm"
          >
            <p className="text-[#7a3d0a] text-2xl md:text-3xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}>
              Happy Birthday, {name}. 🎂
            </p>

            {daysUntil !== null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-[#a06020] text-sm leading-relaxed"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                And in <strong>{daysUntil} days</strong>,<br />
                I won't need the ocean anymore.
                <br />
                <span className="opacity-60 text-xs">{nextMeetingLabel}</span>
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>
    </div>
  );
}