// lib/phases.ts
export type Phase =
  | "countdown"
  | "welcome"
  | "bottle"
  | "map"
  | "photos"
  | "reasons"
  | "letter"
  | "cake";

export const PHASE_ORDER: Phase[] = [
  "countdown",
  "welcome",
  "bottle",
  "map",
  "photos",
  "reasons",
  "letter",
  "cake",
];