'use client';

import { useState } from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function ResumePage() {
  const [active, setActive] = useState<'resume' | 'portfolio'>('resume');

  const src =
    active === 'resume'
      ? `${BASE}/Manan_Sawrangpate_Resume.pdf`
      : `${BASE}/Manan_Sawrangpate_Portfolio.pdf`;

  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--bg)' }}>
      {/* Top bar */}
      <header
        className="flex items-center justify-between gap-4 px-6 py-3"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <a
          href={`${BASE}/`}
          className="font-display text-sm font-semibold transition-colors"
          style={{ color: 'var(--text)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
        >
          ← Manan Sawrangpate
        </a>

        {/* Tab switcher */}
        <div className="flex gap-2">
          {(['resume', 'portfolio'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="rounded-badge px-4 py-1.5 text-sm font-medium capitalize transition-colors"
              style={
                active === tab
                  ? { background: 'var(--green)', color: '#1e1e1e' }
                  : { border: '1px solid var(--border)', color: 'var(--muted)' }
              }
            >
              {tab === 'resume' ? 'Resume' : 'Portfolio'}
            </button>
          ))}
        </div>

        <a
          href={src}
          download
          className="text-sm transition-colors"
          style={{ color: 'var(--muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
        >
          Download ↓
        </a>
      </header>

      {/* Notice */}
      <p className="py-2 text-center font-mono text-xs" style={{ color: 'var(--muted)' }}>
        Large file — please wait ·{' '}
        <a
          href={src}
          download
          style={{ color: 'var(--green)' }}
          className="hover:underline"
        >
          Download link
        </a>
      </p>

      {/* PDF embed */}
      <iframe
        key={src}
        src={src}
        title={active === 'resume' ? 'Resume' : 'Portfolio'}
        className="w-full flex-1"
        style={{ minHeight: 'calc(100vh - 72px)', border: 'none' }}
      />
    </div>
  );
}
