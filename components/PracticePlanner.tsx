"use client";

import { FormEvent, useMemo, useState } from "react";
import { ideaSeeds } from "@/data/ideas";
import { usePlanner } from "@/lib/usePlanner";

const timeframes = [
  { value: "today", label: "Today" },
  { value: "this-week", label: "This Week" },
  { value: "someday", label: "Someday" }
] as const;

type Timeframe = (typeof timeframes)[number]["value"];

export default function PracticePlanner() {
  const { addEntry, groupedEntries, updateEntry, removeEntry, clearCompleted } =
    usePlanner();
  const [draftTitle, setDraftTitle] = useState("");
  const [draftTimeframe, setDraftTimeframe] = useState<Timeframe>("today");
  const [draftIdeaId, setDraftIdeaId] = useState<string>("aurora-atelier");
  const [draftNote, setDraftNote] = useState("");

  const selectedIdea = useMemo(
    () => ideaSeeds.find((seed) => seed.id === draftIdeaId),
    [draftIdeaId]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draftTitle.trim()) return;
    addEntry({
      title: draftTitle.trim(),
      timeframe: draftTimeframe,
      ideaId: draftIdeaId,
      mood: selectedIdea?.mood,
      note: draftNote.trim() || undefined
    });
    setDraftTitle("");
    setDraftNote("");
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/30 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-garden-leaf">
            Practice planner
          </p>
          <h2 className="font-display text-3xl text-slate-100">
            Anchor an experiment
          </h2>
          <p className="text-sm text-slate-300">
            Capture the next micro-step you can take. Keep it honest, scope it
            to your bandwidth, and celebrate often.
          </p>
        </header>
        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-4 md:grid-cols-[1.2fr,1fr]"
        >
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400">
              Spark
              <input
                value={draftTitle}
                onChange={(event) => setDraftTitle(event.target.value)}
                placeholder="Prototype Play/Ground module, record stargazing ritual..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-garden-leaf/70 focus:ring-2 focus:ring-garden-leaf/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400">
              Companion resource
              <select
                value={draftIdeaId}
                onChange={(event) => setDraftIdeaId(event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-garden-leaf/70 focus:ring-2 focus:ring-garden-leaf/40"
              >
                {ideaSeeds.map((seed) => (
                  <option key={seed.id} value={seed.id}>
                    {seed.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              cadence
            </p>
            <div className="flex gap-2">
              {timeframes.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDraftTimeframe(option.value)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm transition ${
                    draftTimeframe === option.value
                      ? "border-garden-sun bg-garden-sun/10 text-garden-sun"
                      : "border-white/15 text-slate-300 hover:border-garden-sun/60 hover:text-garden-sun"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400">
              Note to future you
              <textarea
                value={draftNote}
                onChange={(event) => setDraftNote(event.target.value)}
                rows={4}
                placeholder="What's your desired feeling when you finish?"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-garden-sun/70 focus:ring-2 focus:ring-garden-sun/30"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-garden-leaf px-4 py-3 text-sm font-semibold text-garden-night transition hover:bg-garden-leaf/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-garden-leaf"
            >
              Plant the intention
            </button>
          </div>
        </form>
        {selectedIdea && (
          <p className="mt-4 text-xs text-slate-400">
            Grounded in {selectedIdea.title} &mdash; {selectedIdea.description}
          </p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {timeframes.map((column) => {
          const entries = groupedEntries[column.value];
          return (
            <div
              key={column.value}
              className="flex flex-col gap-3 rounded-3xl border border-white/5 bg-slate-900/40 p-4"
            >
              <header className="flex items-center justify-between">
                <h3 className="font-display text-lg text-slate-100">
                  {column.label}
                </h3>
                <span className="text-xs text-slate-400">
                  {entries.length} seed{entries.length === 1 ? "" : "s"}
                </span>
              </header>
              <ul className="flex flex-col gap-3">
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    className={`rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm transition ${
                      entry.completed
                        ? "opacity-60 ring-1 ring-white/10"
                        : "hover:border-garden-leaf/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={entry.completed}
                            onChange={(event) =>
                              updateEntry(entry.id, {
                                completed: event.target.checked
                              })
                            }
                            className="h-4 w-4 rounded border border-white/20 bg-slate-950/80 accent-garden-leaf"
                          />
                          <p className="font-medium text-slate-100">
                            {entry.title}
                          </p>
                        </div>
                        {entry.note && (
                          <p className="text-xs text-slate-300">{entry.note}</p>
                        )}
                        {entry.ideaId && (
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                            tethered to{" "}
                            {ideaSeeds.find((seed) => seed.id === entry.ideaId)?.title ??
                              "Unknown seed"}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEntry(entry.id)}
                        className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-400 transition hover:border-red-500/40 hover:text-red-300"
                      >
                        Clear
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {entries.length === 0 && (
                <p className="rounded-2xl border border-dashed border-white/10 bg-slate-950/20 p-4 text-xs text-slate-400">
                  Nothing planted yet. Pair a spark with a timeframe to cultivate
                  momentum.
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={clearCompleted}
          className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300 transition hover:border-garden-leaf/50 hover:text-garden-leaf"
        >
          Compost completed
        </button>
      </div>
    </section>
  );
}
