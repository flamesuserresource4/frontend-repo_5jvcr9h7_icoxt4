import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Questionnaire from './components/Questionnaire'
import Matches from './components/Matches'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [view, setView] = useState('hero')
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)

  const seedCatalog = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/benefits/seed`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        if (data.inserted >= 0) setSeeded(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    // Seed once on load to ensure catalog exists
    seedCatalog()
  }, [])

  const start = async () => {
    if (!seeded) await seedCatalog()
    setView('form')
  }

  const handleSubmit = async (profile) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })
      if (res.ok) {
        const data = await res.json()
        setMatches(data)
        setView('results')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-emerald-400 to-sky-400 shadow-lg" />
            <div>
              <div className="text-white font-bold">Benefit Guide</div>
              <div className="text-xs text-slate-400">Find what you’re entitled to</div>
            </div>
          </a>
          <a href="/test" className="text-sm text-slate-300 hover:text-white">System check</a>
        </header>

        <main className="mt-10">
          {view === 'hero' && <Hero onStart={start} />}
          {view === 'form' && (
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Tell us a bit about you</h2>
                <p className="text-slate-300 mb-6">We’ll only use this to check general eligibility. No personal identifiers required.</p>
                <Questionnaire onSubmit={handleSubmit} />
              </div>
              <aside className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 text-slate-200">
                <h3 className="font-semibold text-white">What we check</h3>
                <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-slate-300">
                  <li>Income thresholds</li>
                  <li>Age ranges</li>
                  <li>Flags like disability, veteran status, and dependents</li>
                  <li>Program-specific notes</li>
                </ul>
                <p className="mt-4 text-xs text-slate-400">This tool gives guidance, not legal advice. Always verify on the official program website.</p>
              </aside>
            </div>
          )}
          {view === 'results' && (
            <div>
              <h2 className="text-2xl font-semibold text-white">Your potential matches</h2>
              <p className="text-slate-300">Based on your answers, these programs may be worth exploring.</p>
              <Matches items={matches} loading={loading} />
              <div className="mt-6">
                <button onClick={() => setView('form')} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg">Adjust info</button>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-slate-400 text-sm">
          Built to help people discover the support they deserve.
        </footer>
      </div>
    </div>
  )
}

export default App
