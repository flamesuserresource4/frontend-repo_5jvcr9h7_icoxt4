import { useState } from 'react'

export default function Hero({ onStart }) {
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    setLoading(true)
    try {
      await onStart?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.15),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.15),transparent_40%)]" />
      <div className="relative z-10 text-center py-16 sm:py-24">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          Find benefits you may qualify for
        </h1>
        <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
          Answer a few quick questions and get a personalized list of programs
          across healthcare, food, housing, education, and more.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button onClick={handleStart} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition">
            {loading ? 'Preparing…' : 'Start eligibility check'}
          </button>
          <a href="#how" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
            How it works
          </a>
        </div>
      </div>
    </section>
  )
}
