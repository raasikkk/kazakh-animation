import { hornPath } from '../data/ornament'

export function Ornament({ className = '', outlined = false }: { className?: string; outlined?: boolean }) {
  return <svg viewBox="-190 -190 380 380" className={`ornament ${className}`} fill={outlined ? 'none' : 'currentColor'} stroke={outlined ? 'currentColor' : 'none'} strokeWidth="1.4" aria-hidden="true">
    {[0, 90, 180, 270].map((angle) => <g key={angle} transform={`rotate(${angle}) translate(0 -76) scale(.76)`}>
      <path className="horn-stroke" d={hornPath} pathLength="1" />
      <path className="horn-stroke" d={hornPath} transform="scale(-1 1)" pathLength="1" />
    </g>)}
  </svg>
}

export function Horn({ className = '' }: { className?: string }) {
  return <svg viewBox="-104 -90 208 182" className={`horn ${className}`} fill="currentColor" aria-hidden="true"><path d={hornPath} /><path d={hornPath} transform="scale(-1 1)" /></svg>
}

export function OrnamentBand({ className = '' }: { className?: string }) {
  return <div className={`ornament-band ${className}`} aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <Horn key={i} />)}</div>
}
