import Link from "next/link";
import { IdeaSeed } from "@/data/ideas";
import MoodBadge from "./MoodBadge";

type IdeaCardProps = {
  seed: IdeaSeed;
};

const categoryPalette: Record<IdeaSeed["category"], { border: string; text: string }> =
  {
    tech: { border: "border-garden-sky/60", text: "text-garden-sky" },
    art: { border: "border-garden-sun/60", text: "text-garden-sun" },
    community: { border: "border-garden-leaf/60", text: "text-garden-leaf" },
    science: { border: "border-slate-200/60", text: "text-slate-200" },
    wildcard: { border: "border-fuchsia-300/60", text: "text-fuchsia-300" }
  };

export default function IdeaCard({ seed }: IdeaCardProps) {
  const palette = categoryPalette[seed.category];

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-lg ring-1 ring-white/5 transition hover:-translate-y-1 hover:border-garden-leaf/50 hover:shadow-glow">
      <div
        className={`absolute inset-0 translate-y-16 bg-gradient-to-b from-transparent to-garden-sky/10 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100`}
        aria-hidden
      />
      <div className="relative space-y-4">
        <MoodBadge mood={seed.mood} />
        <header>
          <p
            className={`text-xs uppercase tracking-[0.4em] ${palette.text} ${palette.border}`}
          >
            {seed.category}
          </p>
          <h3 className="mt-2 font-display text-2xl text-slate-100">
            {seed.title}
          </h3>
        </header>
        <p className="text-sm leading-relaxed text-slate-300">
          {seed.description}
        </p>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            trailheads
          </p>
          <ul className="space-y-2">
            {seed.resources.map((resource) => (
              <li key={resource.url}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-100 hover:text-garden-leaf"
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-garden-leaf shadow-glow" />
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
