import { useState } from 'react'

export default function Questionnaire({ onSubmit }) {
  const [form, setForm] = useState({
    age: '',
    income: '',
    location: '',
    disability: false,
    veteran: false,
    dependents: 0,
    tags: []
  })

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({
      ...form,
      age: form.age ? Number(form.age) : undefined,
      income: form.income ? Number(form.income) : undefined,
      dependents: form.dependents ? Number(form.dependents) : undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-200 mb-1">Age</label>
          <input type="number" min="0" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" value={form.age} onChange={e=>update('age', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">Annual household income (USD)</label>
          <input type="number" min="0" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" value={form.income} onChange={e=>update('income', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">State/Region</label>
          <input type="text" placeholder="e.g., CA" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" value={form.location} onChange={e=>update('location', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-slate-200 mb-1">Dependents</label>
          <input type="number" min="0" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-white/10 text-white" value={form.dependents} onChange={e=>update('dependents', e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <label className="inline-flex items-center gap-2 text-slate-200">
          <input type="checkbox" checked={form.disability} onChange={e=>update('disability', e.target.checked)} />
          Disability
        </label>
        <label className="inline-flex items-center gap-2 text-slate-200">
          <input type="checkbox" checked={form.veteran} onChange={e=>update('veteran', e.target.checked)} />
          Veteran
        </label>
      </div>
      <button type="submit" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">See my matches</button>
    </form>
  )
}
