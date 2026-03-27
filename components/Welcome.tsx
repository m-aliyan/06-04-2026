// components/Welcome.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface Props {
  name: string;
  onNext: () => void;
}

export default function Welcome({ name, onNext }: Props) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.6 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      });
    };

    setTimeout(() => {
      fire(0.25, { spread: 26, startVelocity: 55, colors: ["#f5e6c8", "#e8c97a", "#ffffff"] });
      fire(0.2, { spread: 60, colors: ["#ffd700", "#ffb347", "#ff69b4"] });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ["#f5e6c8", "#c9a96e"] });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ["#ffffff", "#f5e6c8"] });
      fire(0.1, { spread: 120, startVelocity: 45, colors: ["#ffd700", "#e8c97a"] });
    }, 600);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fef3e2 0%, #fde8c8 40%, #fdd5a0 100%)" }}>

      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(255,220,120,0.35) 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-10 px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-[#c9802a] text-xs tracking-[0.4em] uppercase mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          April 6th · It's finally here
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#7a3d0a] leading-none mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          Happy Birthday,
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#c9802a] leading-none mb-12"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(4rem, 15vw, 11rem)",
            fontWeight: 300,
          }}
        >
          {name}.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-[#a06020] text-sm md:text-base mb-10 max-w-sm mx-auto leading-relaxed"
          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          Something has been traveling across the sea to reach you.
          <br />It's finally here.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3 border border-[#c9802a] text-[#c9802a] text-xs tracking-[0.3em] uppercase cursor-pointer transition-all hover:bg-[#c9802a] hover:text-white"
          style={{ fontFamily: "Georgia, serif", background: "transparent" }}
        >
          Open your gift →
        </motion.button>
      </motion.div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>
    </div>
  );
}