export default function Matches({ items, loading }) {
  if (loading) {
    return (
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-slate-800/40 border border-white/10 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="mt-6 p-6 rounded-xl bg-slate-800/40 border border-white/10 text-slate-200">
        No matches yet. Try adjusting your info or seeding the catalog.
      </div>
    )
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((b, idx) => (
        <a key={idx} href={b.url || '#'} target="_blank" rel="noreferrer" className="block group rounded-xl bg-slate-800/60 border border-white/10 p-5 hover:bg-slate-800 transition">
          <div className="text-xs uppercase text-emerald-300/80 tracking-wide">{b.category}</div>
          <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-emerald-300 transition">{b.name}</h3>
          <p className="mt-2 text-sm text-slate-300 line-clamp-3">{b.description}</p>
          {b.eligibility_notes && (
            <p className="mt-3 text-xs text-slate-400">Eligibility: {b.eligibility_notes}</p>
          )}
          {b.agency && (
            <p className="mt-3 text-xs text-slate-500">Agency: {b.agency}</p>
          )}
        </a>
      ))}
    </div>
  )
}
