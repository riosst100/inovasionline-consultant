export default function Logo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-io-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <g transform="translate(6,6)">
        <rect x="0" y="0" width="60" height="60" rx="14" fill="none" stroke="url(#logo-io-gradient)" strokeWidth="3" />
        <rect x="14" y="10" width="8" height="40" rx="4" fill="#22d3ee" />
        <path d="M32 10 a15 15 0 1 0 0.1 0" fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
        <line x1="0" y1="30" x2="-8" y2="30" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="30" x2="68" y2="30" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <line x1="30" y1="0" x2="30" y2="-8" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <line x1="30" y1="60" x2="30" y2="68" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
