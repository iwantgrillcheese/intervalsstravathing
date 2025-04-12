import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    ftp: '',
    swimPace: '',
    runPace: '',
    experience: 'Intermediate',
    timePerWeek: '',
    apiKey: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setStatus(data.success ? 'success' : 'error');
  };

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>TrainGPT</h1>
      <form onSubmit={handleSubmit}>
        <input name="ftp" placeholder="FTP (watts)" value={form.ftp} onChange={handleChange} required /><br />
        <input name="swimPace" placeholder="Swim pace (per 100m)" value={form.swimPace} onChange={handleChange} required /><br />
        <input name="runPace" placeholder="Run pace (min/mile)" value={form.runPace} onChange={handleChange} required /><br />
        <input name="timePerWeek" placeholder="Weekly hours" value={form.timePerWeek} onChange={handleChange} required /><br />
        <select name="experience" value={form.experience} onChange={handleChange}>
          <option>Novice</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select><br />
        <input name="apiKey" placeholder="Intervals.icu API key" value={form.apiKey} onChange={handleChange} required /><br />
        <button type="submit">Generate Plan</button>
      </form>
      {status === 'loading' && <p>Generating...</p>}
      {status === 'success' && <p style={{ color: 'green' }}>✅ Plan uploaded!</p>}
      {status === 'error' && <p style={{ color: 'red' }}>❌ Something went wrong.</p>}
    </main>
  );
}
