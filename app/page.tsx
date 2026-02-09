import IdeaExplorer from "@/components/IdeaExplorer";
import PracticePlanner from "@/components/PracticePlanner";
import { ideaSeeds } from "@/data/ideas";

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(137,_241,_195,_0.15),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(107,_154,_254,_0.25),_transparent_60%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <header className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/50 p-10 shadow-2xl ring-1 ring-white/10 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.5em] text-garden-leaf">
            idea garden
          </p>
          <h1 className="font-display text-4xl text-slate-50 sm:text-5xl lg:text-6xl">
            Cultivate curiosity, one micro-experiment at a time.
          </h1>
          <p className="max-w-2xl text-base text-slate-300">
            Wander through a constellation of concepts that remix art, science,
            technology, and community practice. Filter by mood, anchor actions,
            and let your creative muscles grow wild.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-garden-leaf/60 bg-garden-leaf/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-garden-leaf">
              ✣ 7 seeds today
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-garden-sun/60 bg-garden-sun/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-garden-sun">
              ☼ refresh every dawn
            </span>
          </div>
        </header>
        <IdeaExplorer seeds={ideaSeeds} />
        <PracticePlanner />
        <footer className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 text-center text-xs text-slate-500">
          Crafted in the Idea Garden · Tinker boldly, share generously.
        </footer>
      </div>
    </main>
  );
}
