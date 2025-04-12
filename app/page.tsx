'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ raceType: 'sprint' });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Training Plan Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <label>
          Race Type:
          <select name="raceType" value={formData.raceType} onChange={handleChange}>
            <option value="sprint">Sprint</option>
            <option value="olympic">Olympic</option>
            <option value="70.3">Half Ironman</option>
            <option value="140.6">Full Ironman</option>
          </select>
        </label>
        <button type="submit" className="bg-black text-white py-2 rounded">Generate Plan</button>
      </form>
    </main>
  );
}
