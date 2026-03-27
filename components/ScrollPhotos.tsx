// components/ScrollPhotos.tsx
"use client";

import { motion } from "framer-motion";

interface Props { onNext: () => void; }

// 🔁 Replace these with your actual image paths in /public/photos/
const photos = [
  { src: "/photos/together1.jpg", caption: "this one still makes me smile", rotation: -3 },
  { src: "/photos/together2.jpg", caption: "I didn't know that day would matter this much", rotation: 2 },
  { src: "/photos/her1.jpg", caption: "this smile 🥺", rotation: -1.5 },
  { src: "/photos/her2.jpg", caption: "you don't even know how you look here", rotation: 3 },
  { src: "/photos/her3.jpg", caption: "I keep coming back to this one", rotation: -2 },
];

export default function ScrollPhotos({ onNext }: Props) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden px-6 py-16"
      style={{ background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)" }}>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[#f5e6c8] text-xs tracking-[0.4em] uppercase mb-3 opacity-60"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Scroll II · What I see when I see you
      </motion.p>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[#f5e6c8] text-2xl md:text-3xl font-light text-center mb-14"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
      >
        A few moments I've held onto.
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-xl mb-12">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotate: photo.rotation }}
            animate={{ opacity: 1, y: 0, rotate: photo.rotation }}
            transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="relative flex flex-col items-center"
            style={{ zIndex: 1 }}
          >
            {/* Polaroid */}
            <div className="bg-white p-2 pb-8 shadow-xl" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
              <div className="w-full aspect-square bg-[#2a2a3e] overflow-hidden">
                {/* Replace img with Next.js Image in production */}
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if photo not found
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Placeholder shown if image missing */}
                <div className="w-full h-full flex items-center justify-center text-[#f5e6c8] opacity-20 text-xs"
                  style={{ fontFamily: "Georgia, serif" }}>
                  📷
                </div>
              </div>
              <p className="text-center text-[10px] text-[#555] mt-2 leading-tight px-1"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: photos.length * 0.15 + 0.4 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="px-8 py-3 border border-[#f5e6c8] text-[#f5e6c8] text-xs tracking-[0.3em] uppercase cursor-pointer hover:bg-white hover:text-[#1a1a2e] transition-all"
        style={{ fontFamily: "Georgia, serif", background: "transparent" }}
      >
        Unroll the next scroll →
      </motion.button>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>
    </div>
  );
}