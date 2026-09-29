export function Shanyraq({ className = '', simple = false }: { className?: string; simple?: boolean }) {
  return <svg className={`shanyraq-drawing ${className}`} viewBox="0 0 600 600" fill="none" aria-hidden="true">
    <g className="uyq" stroke="currentColor" strokeWidth={simple ? 2 : 1.3}>
      {Array.from({ length: simple ? 32 : 64 }, (_, i) => {
        const angle = i / (simple ? 32 : 64) * Math.PI * 2
        return <path key={i} pathLength="1" d={`M ${300 + Math.cos(angle) * 159} ${300 + Math.sin(angle) * 159} L ${300 + Math.cos(angle) * 283} ${300 + Math.sin(angle) * 283}`} />
      })}
    </g>
    <g className="shanyraq-rings" stroke="currentColor">
      {[145, 153, 160].map((radius) => <circle key={radius} pathLength="1" cx="300" cy="300" r={radius} strokeWidth={radius === 153 ? 5 : 2} />)}
    </g>
    <g className="kuldireuish" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
      {[-32, 0, 32].map((offset) => <g key={offset}>
        <path pathLength="1" d={`M ${300 + offset} 159 Q ${263 + offset} 300 ${300 + offset} 441`} />
        <path pathLength="1" d={`M 159 ${300 + offset} Q 300 ${263 + offset} 441 ${300 + offset}`} />
      </g>)}
    </g>
    <circle className="outer-ring" cx="300" cy="300" r="285" stroke="currentColor" strokeWidth="1" strokeDasharray="2 9" />
  </svg>
}
