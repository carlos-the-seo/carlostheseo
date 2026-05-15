import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const services = [
  'SEO Audit',
  'Content Pipeline',
  'Schema & Technical SEO',
  'AI-Powered SEO Ops',
  'Local & Location SEO',
  'Ongoing Monitoring',
  'Not sure yet',
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const preselected = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('service') ?? ''
    : '';
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Something went wrong.');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError('Something went wrong. Email me directly at seo@marketingempiregroup.com');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#0f0f1a] border border-green-500/20 rounded-2xl p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">Got it — I'll be in touch.</h3>
        <p className="text-[#64748b] text-sm">Usually within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-[#64748b] mb-2">Name *</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full bg-[#0a0a12] border border-[#1e1e30] rounded-xl px-4 py-3 text-sm text-[#e2e8f0] placeholder-[#334155] focus:outline-none focus:border-[#f97316]/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#64748b] mb-2">Email *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full bg-[#0a0a12] border border-[#1e1e30] rounded-xl px-4 py-3 text-sm text-[#e2e8f0] placeholder-[#334155] focus:outline-none focus:border-[#f97316]/50 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#64748b] mb-2">Website</label>
        <input
          name="website"
          type="url"
          placeholder="https://yoursite.com"
          className="w-full bg-[#0a0a12] border border-[#1e1e30] rounded-xl px-4 py-3 text-sm text-[#e2e8f0] placeholder-[#334155] focus:outline-none focus:border-[#f97316]/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#64748b] mb-2">What do you need?</label>
        <select
          name="service"
          defaultValue={preselected}
          className="w-full bg-[#0a0a12] border border-[#1e1e30] rounded-xl px-4 py-3 text-sm text-[#e2e8f0] focus:outline-none focus:border-[#f97316]/50 transition-colors appearance-none"
        >
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#64748b] mb-2">Tell me what's going on *</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What's your current SEO situation? What's broken, what have you tried, what do you need to change?"
          className="w-full bg-[#0a0a12] border border-[#1e1e30] rounded-xl px-4 py-3 text-sm text-[#e2e8f0] placeholder-[#334155] focus:outline-none focus:border-[#f97316]/50 transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#f97316] hover:bg-[#ea6c0a] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25"/>
              <path d="M21 12a9 9 0 01-9-9"/>
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      <p className="text-xs text-[#334155] text-center">No pitch. Just a real conversation.</p>
    </form>
  );
}
