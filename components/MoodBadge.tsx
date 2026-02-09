"use client";

import { IdeaSeed } from "@/data/ideas";
import classNames from "classnames";

const moodStyles: Record<IdeaSeed["mood"], string> = {
  playful:
    "bg-gradient-to-r from-pink-400/60 via-orange-300/60 to-yellow-300/60 text-rose-100",
  ambitious: "bg-garden-sky/20 text-garden-sky",
  reflective: "bg-slate-800/80 text-slate-200",
  experimental: "bg-emerald-400/20 text-emerald-200"
};

export default function MoodBadge({ mood }: { mood: IdeaSeed["mood"] }) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-[0.35em]",
        moodStyles[mood]
      )}
    >
      {mood}
    </span>
  );
}
