// components/MainExperience.tsx
"use client";

import { useEffect, useState } from "react";
import { Phase } from "@/lib/phases";
import { config } from "@/lib/birthdayConfig";
import Countdown from "./Countdown";
import Welcome from "./Welcome";
import BottleOpening from "./BottleOpening";
import ScrollMap from "./ScrollMap";
import ScrollPhotos from "./ScrollPhotos";
import ScrollReasons from "./ScrollReasons";
import ScrollLetter from "./ScrollLetter";
import ScrollCake from "./ScrollCake";
import EasterEggs from "./EasterEggs";

export default function MainExperience() {
  const [phase, setPhase] = useState<Phase>("countdown");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      if (now >= config.birthdayUTC) {
        setUnlocked(true);
        if (phase === "countdown") setPhase("welcome");
      }
    };
    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const next = () => {
    setPhase((prev) => {
      const map: Record<Phase, Phase> = {
        countdown: "countdown",
        welcome: "bottle",
        bottle: "map",
        map: "photos",
        photos: "reasons",
        reasons: "letter",
        letter: "cake",
        cake: "cake",
      };
      return map[prev];
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {phase === "countdown" && <Countdown unlocked={unlocked} onUnlock={() => setPhase("welcome")} />}
      {phase === "welcome" && <Welcome name={config.herName} onNext={next} />}
      {phase === "bottle" && <BottleOpening onNext={next} />}
      {phase === "map" && <ScrollMap onNext={next} />}
      {phase === "photos" && <ScrollPhotos onNext={next} />}
      {phase === "reasons" && <ScrollReasons reasons={config.reasons} onNext={next} />}
      {phase === "letter" && <ScrollLetter letter={config.letter} name={config.herName} onNext={next} />}
      {phase === "cake" && <ScrollCake name={config.herName} nextMeetingDate={config.nextMeetingDate} nextMeetingLabel={config.nextMeetingLabel} />}
      {unlocked && <EasterEggs />}
    </main>
  );
}