// components/Countdown.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "@/lib/birthdayConfig";

interface Props {
  unlocked: boolean;
  onUnlock: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, config.birthdayUTC.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

// How far the bottle has traveled (0 = far ocean, 1 = shore)
function getBottleProgress(): number {
  const total = config.birthdayUTC.getTime() - new Date("2025-03-28T00:00:00.000Z").getTime();
  const elapsed = Date.now() - new Date("2025-03-28T00:00:00.000Z").getTime();
  return Math.min(1, Math.max(0, elapsed / total));
}

export default function Countdown({ unlocked, onUnlock }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [progress, setProgress] = useState(getBottleProgress());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
      setProgress(getBottleProgress());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate ocean waves on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, height * 0.55);
      sky.addColorStop(0, "#0a0e1a");
      sky.addColorStop(1, "#0d1f3c");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height * 0.55);

      // Stars
      if (t === 0 || t % 3 === 0) {
        // draw static stars only on first frame for perf, handled by CSS instead
      }

      // Multiple wave layers
      const waves = [
        { amp: 18, freq: 0.012, speed: 0.5, yBase: 0.55, color: "#0d2a4a", alpha: 1 },
        { amp: 14, freq: 0.018, speed: 0.7, yBase: 0.6, color: "#0e3460", alpha: 0.9 },
        { amp: 10, freq: 0.025, speed: 1.0, yBase: 0.68, color: "#1a4a7a", alpha: 0.8 },
        { amp: 8, freq: 0.03, speed: 1.3, yBase: 0.74, color: "#1e5588", alpha: 0.7 },
        { amp: 6, freq: 0.04, speed: 1.6, yBase: 0.80, color: "#f5e6c8", alpha: 0.15 }, // foam
      ];

      waves.forEach(({ amp, freq, speed, yBase, color, alpha }) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 2) {
          const y = height * yBase + Math.sin(x * freq + t * speed) * amp + Math.cos(x * freq * 0.7 + t * speed * 0.8) * amp * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Shore (sand)
      const sand = ctx.createLinearGradient(0, height * 0.85, 0, height);
      sand.addColorStop(0, "#c9a96e");
      sand.addColorStop(1, "#b8935a");
      ctx.fillStyle = sand;
      ctx.fillRect(0, height * 0.88, width, height);

      // Bottle position — moves from right-ocean to shore
      const bottleX = width * (0.75 - progress * 0.45); // 75% → 30% of screen width
      const bottleY = height * 0.58 + Math.sin(t * 0.8) * 6;
      const bottleRotation = Math.sin(t * 0.5) * 0.15;

      ctx.save();
      ctx.translate(bottleX, bottleY);
      ctx.rotate(bottleRotation);

      // Bottle glow
      const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, 40);
      glow.addColorStop(0, "rgba(255, 220, 100, 0.3)");
      glow.addColorStop(1, "rgba(255, 220, 100, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-40, -40, 80, 80);

      // Draw bottle (simple SVG-like path)
      ctx.fillStyle = "rgba(150, 210, 180, 0.7)";
      ctx.strokeStyle = "rgba(200, 240, 220, 0.9)";
      ctx.lineWidth = 1.5;

      // Bottle body
      ctx.beginPath();
      ctx.ellipse(0, 8, 10, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Bottle neck
      ctx.beginPath();
      ctx.rect(-4, -16, 8, 12);
      ctx.fill();
      ctx.stroke();

      // Cork
      ctx.fillStyle = "#c9a96e";
      ctx.beginPath();
      ctx.rect(-3, -20, 6, 5);
      ctx.fill();

      // Glow dot inside bottle
      ctx.fillStyle = "rgba(255, 200, 80, 0.6)";
      ctx.beginPath();
      ctx.arc(0, 5, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      t += 0.02;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [progress]);

  if (unlocked) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0e1a]">
      {/* Stars */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 55 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + "s",
            }}
          />
        ))}
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full" />

      {/* Text overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        {/* Top message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center mb-8"
          style={{ marginTop: "-10vh" }}
        >
          <p
            className="text-[#f5e6c8] text-sm tracking-[0.3em] uppercase mb-3 opacity-70"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            something is drifting toward you
          </p>
          <h1
            className="text-[#f5e6c8] text-4xl md:text-6xl font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {config.herName}
          </h1>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="flex gap-6 md:gap-10 mt-4"
          style={{ marginTop: "38vh" }}
        >
          {[
            { val: timeLeft.days, label: "days" },
            { val: timeLeft.hours, label: "hours" },
            { val: timeLeft.minutes, label: "min" },
            { val: timeLeft.seconds, label: "sec" },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span
                className="text-3xl md:text-5xl text-[#f5e6c8] tabular-nums"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
              >
                {pad(val)}
              </span>
              <span
                className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#f5e6c8] opacity-40 mt-1"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="text-[#f5e6c8] text-xs tracking-widest uppercase opacity-30 mt-6"
          style={{ marginTop: "calc(38vh + 80px)", fontFamily: "Georgia, serif" }}
        >
          the tide brings it ashore at midnight
        </motion.p>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}