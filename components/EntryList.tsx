"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase, TABLE, isConfigured, type Row } from "@/lib/supabase";

export default function EntryList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase()
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) setErr(error.message);
    else {
      setErr(null);
      setRows((data ?? []) as Row[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const h = () => load();
    window.addEventListener("entry:created", h);
    return () => window.removeEventListener("entry:created", h);
  }, [load]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent lifts
        </h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {rows.length}
        </span>
      </div>

      {err && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{err}</p>
      )}

      {loading && <p className="mt-4 text-sm text-slate-500">Loading…</p>}

      {!loading && rows.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">
          Nothing yet. Add your first lift on the left.
        </p>
      )}

      <ul className="mt-4 divide-y divide-slate-100">
        {rows.map((row) => (
          <li key={row.id} className="grid gap-3 py-4 sm:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400">Exercise</div>
                <div className="text-slate-800">{String(row.exercise ?? '—')}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400">Weight (kg)</div>
                <div className="text-slate-800">{String(row.weight_kg ?? '—')}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400">Reps</div>
                <div className="text-slate-800">{String(row.reps ?? '—')}</div>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
