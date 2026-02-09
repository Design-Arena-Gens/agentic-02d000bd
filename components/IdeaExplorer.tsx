"use client";

import { useMemo, useState } from "react";
import classNames from "classnames";
import { IdeaSeed } from "@/data/ideas";
import IdeaCard from "./IdeaCard";

type IdeaExplorerProps = {
  seeds: IdeaSeed[];
};

const categories: IdeaSeed["category"][] = [
  "tech",
  "art",
  "community",
  "science",
  "wildcard"
];

const moods: IdeaSeed["mood"][] = [
  "playful",
  "ambitious",
  "reflective",
  "experimental"
];

export default function IdeaExplorer({ seeds }: IdeaExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<
    IdeaSeed["category"][]
  >([]);
  const [activeMoods, setActiveMoods] = useState<IdeaSeed["mood"][]>([]);

  const filteredSeeds = useMemo(() => {
    return seeds.filter((seed) => {
      const matchesQuery =
        query.trim().length === 0 ||
        `${seed.title} ${seed.description}`
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesCategory =
        activeCategories.length === 0 ||
        activeCategories.includes(seed.category);
      const matchesMood =
        activeMoods.length === 0 || activeMoods.includes(seed.mood);
      return matchesQuery && matchesCategory && matchesMood;
    });
  }, [activeCategories, activeMoods, query, seeds]);

  const toggleCategory = (category: IdeaSeed["category"]) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const toggleMood = (mood: IdeaSeed["mood"]) => {
    setActiveMoods((prev) =>
      prev.includes(mood) ? prev.filter((item) => item !== mood) : [...prev, mood]
    );
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-slate-900/60 p-6 shadow-glow ring-1 ring-white/10 backdrop-blur">
        <label htmlFor="idea-search" className="text-sm uppercase tracking-[0.3em]">
          Search the garden
        </label>
        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
          <input
            id="idea-search"
            type="search"
            placeholder="Explore whimsical tech, community rituals, or cosmic experiments..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="flex-1 bg-transparent text-base outline-none placeholder:text-slate-400"
          />
          <span className="text-sm text-slate-400">
            {filteredSeeds.length} sprout{filteredSeeds.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Categories
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={classNames(
                    "rounded-full border px-3 py-1 text-sm capitalize transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    activeCategories.includes(category)
                      ? "border-garden-leaf bg-garden-leaf/20 text-garden-leaf"
                      : "border-white/20 text-slate-300 hover:border-garden-leaf/60 hover:text-garden-leaf"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Moods
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => toggleMood(mood)}
                  className={classNames(
                    "rounded-full border px-3 py-1 text-sm capitalize transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    activeMoods.includes(mood)
                      ? "border-garden-sun bg-garden-sun/20 text-garden-sun"
                      : "border-white/20 text-slate-300 hover:border-garden-sun/60 hover:text-garden-sun"
                  )}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredSeeds.map((seed) => (
          <IdeaCard key={seed.id} seed={seed} />
        ))}
      </div>
      {filteredSeeds.length === 0 && (
        <p className="rounded-2xl border border-dashed border-white/20 bg-slate-900/40 p-8 text-center text-slate-400">
          Nothing matches that combination yet. Try toggling moods or peeking
          into another corner of the garden.
        </p>
      )}
    </section>
  );
}
