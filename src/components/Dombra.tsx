import { useId } from 'react'

export function Dombra() {
  const id = useId().replace(/:/g, '')
  return <svg className="dombra-drawing" viewBox="0 0 300 700" fill="none" aria-hidden="true">
    <defs><linearGradient id={`${id}-wood`} x1="65" y1="350" x2="260" y2="600" gradientUnits="userSpaceOnUse"><stop stopColor="#ecd298" /><stop offset=".35" stopColor="#c89951" /><stop offset=".7" stopColor="#dfba72" /><stop offset="1" stopColor="#9e682e" /></linearGradient><linearGradient id={`${id}-neck`}><stop stopColor="#563019" /><stop offset=".5" stopColor="#b98543" /><stop offset="1" stopColor="#6d401c" /></linearGradient></defs>
    <g className="dombra-body">
      <path d="M136 346C128 390 64 421 52 492C34 586 75 657 150 664C225 657 266 586 248 492C236 421 172 390 164 346Z" fill="#7d4a27" transform="translate(7 7)" />
      <path d="M136 346C128 390 64 421 52 492C34 586 75 657 150 664C225 657 266 586 248 492C236 421 172 390 164 346Z" fill={`url(#${id}-wood)`} stroke="#613a22" strokeWidth="3" />
      <path d="M141 361C132 400 77 434 66 495C48 577 84 641 150 648C216 641 252 577 234 495C223 434 168 400 159 361" stroke="#f2dc9e" strokeWidth="2" />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${111 + i * 10} 421 Q ${60 + i * 22} 540 ${124 + i * 6} 638`} stroke="#835522" strokeWidth=".6" opacity=".23" />)}
      <ellipse cx="150" cy="470" rx="12" ry="15" fill="#492b1a" />
      <path d="M137 618H163L160 628H140Z" fill="#492b1a" />
    </g>
    <g className="dombra-neck"><path d="M141 90H159L164 414H136Z" fill={`url(#${id}-neck)`} stroke="#563019" strokeWidth="2" /><path d="M139 35Q150 23 161 35L157 92H143Z" fill="#754525" stroke="#412819" strokeWidth="2" />{[50, 72].map((y, i) => <path key={y} d={`M${i ? 157 : 127} ${y}h16v8h-16z`} fill="#39281f" />)}{Array.from({ length: 17 }, (_, i) => <path key={i} d={`M139 ${120 + i * 16}h22`} stroke="#e1c17f" strokeWidth="1.2" />)}</g>
    <g className="dombra-strings" stroke="#f6e6ba" strokeWidth="1"><path d="M147 53L147 623" /><path d="M153 73L153 623" /></g>
    <path d="M132 558h36v7h-36z" fill="#4f311d" />
  </svg>
}
