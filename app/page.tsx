import EntryForm from "@/components/EntryForm";
import EntryList from "@/components/EntryList";
import { isConfigured } from "@/lib/supabase";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span
              className="grid h-9 w-9 place-items-center rounded-lg text-white"
              style={{ background: "var(--accent)" }}
            >
              ◆
            </span>
            <span className="font-semibold tracking-tight">Gym PR Board</span>
          </div>
          <span className="rounded-full bg-accentSoft px-3 py-1 text-xs font-medium" style={{ color: "var(--accent)" }}>
            Fitness
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>
          Your personal records, in one place
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Your personal records, in one place.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          A working Next.js app with a live Supabase backend. Add a lift below and it
          is stored in Postgres with row-level security, then read straight back.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-2xl">🏋️</div>
          <h3 className="mt-3 font-semibold text-slate-900">Weight times reps</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">The honest measure of a lift.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-2xl">📈</div>
          <h3 className="mt-3 font-semibold text-slate-900">Progress over time</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">Old records stay, new ones stack up.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-2xl">🎯</div>
          <h3 className="mt-3 font-semibold text-slate-900">Working sets vs maxes</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">Keep test days separate from training days.</p>
        </div>
        </div>
      </section>

      {!isConfigured && (
        <div className="mx-auto mb-10 max-w-5xl px-6">
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Supabase not configured.</strong> Copy <code>.env.example</code> to{" "}
            <code>.env.local</code> and add your project URL and anon key. The UI below is
            fully functional once those are set.
          </div>
        </div>
      )}

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <EntryForm />
        </div>
        <div className="lg:col-span-3">
          <EntryList />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-5xl px-6 text-sm text-slate-500">
          Gym PR Board — built with Next.js, Tailwind CSS and Supabase.
        </div>
      </footer>
    </main>
  );
}
