import { useState } from 'react';

interface Service {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  bestFor: string;
}

export default function ServicesPanel({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <div className="w-full">
      {/* Mobile: horizontal pill tabs */}
      <div className="flex md:hidden overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide">
        {services.map((svc, i) => (
          <button
            key={svc.id}
            onClick={() => setActive(i)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors border ${
              active === i
                ? 'bg-[#f97316] border-[#f97316] text-white'
                : 'border-[#1e1e30] text-[#64748b] hover:text-white hover:border-[#334155]'
            }`}
          >
            {svc.title}
          </button>
        ))}
      </div>

      {/* Desktop: split panel */}
      <div className="hidden md:grid grid-cols-[280px_1fr] gap-0 min-h-[560px] bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl overflow-hidden">

        {/* Left: tab list */}
        <div className="border-r border-[#1e1e30] py-2">
          {services.map((svc, i) => (
            <button
              key={svc.id}
              onClick={() => setActive(i)}
              className={`w-full text-left px-6 py-5 flex items-start gap-4 transition-all group relative ${
                active === i
                  ? 'bg-[#0a0a12]'
                  : 'hover:bg-[#0a0a12]/50'
              }`}
            >
              {/* Active indicator */}
              <span
                className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-r transition-all duration-200 ${
                  active === i ? 'bg-[#f97316]' : 'bg-transparent'
                }`}
              />
              <span className={`text-xs font-mono mt-0.5 shrink-0 transition-colors ${
                active === i ? 'text-[#f97316]' : 'text-[#334155] group-hover:text-[#475569]'
              }`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className={`text-sm font-semibold leading-tight transition-colors ${
                  active === i ? 'text-white' : 'text-[#64748b] group-hover:text-[#94a3b8]'
                }`}>
                  {svc.title}
                </p>
                {active === i && (
                  <p className="text-xs text-[#475569] mt-1 leading-snug">{svc.tagline}</p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Right: detail panel */}
        <div
          key={s.id}
          className="p-10 flex flex-col"
          style={{ animation: 'fadeIn 0.2s ease' }}
        >
          <div className="flex items-start gap-4 mb-6">
            <span className="text-2xl font-mono text-[#f97316]/40 mt-1">{s.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{s.title}</h2>
              <p className="text-[#f97316] text-sm font-medium">{s.tagline}</p>
            </div>
          </div>

          <p className="text-[#64748b] text-sm leading-relaxed mb-8">{s.description}</p>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-8 flex-1">

            {/* Deliverables */}
            <div>
              <p className="text-xs font-semibold text-[#334155] uppercase tracking-wider mb-4">
                What's included
              </p>
              <ul className="grid grid-cols-1 gap-2.5">
                {s.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-[#f97316]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#f97316] text-[9px]">✓</span>
                    </span>
                    <span className="text-[#94a3b8] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best for + CTA */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#0a0a12] border border-[#1e1e30] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#334155] uppercase tracking-wider mb-2">
                  Best for
                </p>
                <p className="text-[#64748b] text-xs leading-relaxed">{s.bestFor}</p>
              </div>

              <a
                href={`/contact?service=${encodeURIComponent(s.title)}`}
                className="inline-flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors mt-auto"
              >
                Inquire about this
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: detail card */}
      <div
        key={`mobile-${s.id}`}
        className="md:hidden bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl p-6"
        style={{ animation: 'fadeIn 0.2s ease' }}
      >
        <div className="mb-5">
          <h2 className="text-xl font-bold text-white mb-1">{s.title}</h2>
          <p className="text-[#f97316] text-sm font-medium">{s.tagline}</p>
        </div>
        <p className="text-[#64748b] text-sm leading-relaxed mb-6">{s.description}</p>

        <div className="bg-[#0a0a12] border border-[#1e1e30] rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-[#334155] uppercase tracking-wider mb-2">Best for</p>
          <p className="text-[#64748b] text-xs leading-relaxed">{s.bestFor}</p>
        </div>

        <p className="text-xs font-semibold text-[#334155] uppercase tracking-wider mb-4">What's included</p>
        <ul className="space-y-2.5 mb-6">
          {s.deliverables.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-[#f97316]/10 flex items-center justify-center shrink-0">
                <span className="text-[#f97316] text-[9px]">✓</span>
              </span>
              <span className="text-[#94a3b8] text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <a
          href={`/contact?service=${encodeURIComponent(s.title)}`}
          className="flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
        >
          Inquire about {s.title}
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </a>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
