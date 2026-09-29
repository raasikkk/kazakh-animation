import { useRef } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { GoldenOrnament } from './components/GoldenOrnament'
import { Horn, Ornament, OrnamentBand } from './components/Ornament'
import { Shanyraq } from './components/Shanyraq'
import { Dombra } from './components/Dombra'
import { chapters } from './data/ornament'
import { useJourney } from './lib/useJourney'

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  useJourney(root)

  return <div ref={root} className="site">
    <a className="skip-link" href="#main">Мазмұнға өту</a>
    <div className="page-progress" aria-hidden="true" />
    <header className="header">
      <a className="brand" href="#bastau" aria-label="Тамыр — бастау"><Horn /><span>ТАМЫР<span className="brand-dot">®</span></span></a>
      <nav aria-label="Негізгі бөлімдер"><a href="#dala">Дала<span>01</span></a><a href="#oyu">Өрнек<span>02</span></a><a href="#mura">Мұра<span>03</span></a></nav>
      <span className="header-edition micro"><i />МӘДЕНИЕТТІҢ ТІРІ МҰРАСЫ</span>
    </header>
    <aside className="journey-rail" aria-label="Саяхат барысы">{chapters.map((chapter) => <div key={chapter.id} className="rail-step" data-section={chapter.id}><span>{chapter.name}</span><i /></div>)}</aside>
    <main id="main">
      <section id="bastau" className="hero" aria-labelledby="hero-title">
        <div className="hero-stage">
          <div className="hero-eyebrow micro"><span>ҚАЗАҚ МӘДЕНИЕТІНЕ САЯХАТ</span><span>ДАЛАДАН ДАРЫҒАН / ҰРПАҚҚА ЖАЛҒАСҚАН</span></div>
          <h1 id="hero-title" className="hero-title" aria-label="Тамыр">{'ТАМЫР'.split('').map((letter, index) => <span className="hero-letter" key={index} aria-hidden="true">{letter}</span>)}</h1>
          <div className="hero-object"><GoldenOrnament /></div>
          <div className="hero-annotation micro"><span className="annotation-cross">+</span><span>БІР ӨРНЕК.<br />ШЕКСІЗ ӘЛЕМ.</span></div>
          <div className="hero-bottom"><div className="hero-statement"><p>Кешеден жеткен.<br /><em>Ертеңге кеткен.</em></p><span>Тамыр — өткеннің ізі ғана емес.<br />Бүгінгі болмысымыз. Ертеңгі бағытымыз.</span></div><div className="hero-art-caption micro"><span>№ 001 / ҚОШҚАРМҮЙІЗ</span><span>ДӘСТҮРДІҢ ЗАМАНАУИ БЕЙНЕСІ</span></div></div>
          <div className="hero-baseline"><span className="scroll-invitation micro"><ArrowDown size={19} /><span>ТӨМЕН АЙНАЛДЫРЫҢЫЗ<br /><b>ХИКАЯ БАСТАЛАДЫ</b></span></span><span className="micro hero-count">БЕС БӨЛІМ. БІР ТАМЫР.</span><span className="micro">01 — 05</span></div>
          <OrnamentBand className="hero-band" />
        </div>
      </section>

      <section id="dala" className="landscape" aria-labelledby="landscape-title">
        <div className="landscape-stage">
          <div className="landscape-window"><img src="/images/dala.webp" alt="Алтын түсті кең дала, жайылып жүрген жылқылар, ақ киіз үй және көкжиектегі асқар таулар" width="1664" height="936" loading="lazy" decoding="async" /><div className="landscape-shade" /></div>
          <div className="section-label micro"><span>01 / ДАЛА ДЕМІ</span><span>КӨКЖИЕККЕ КӨЗ ЖІБЕР</span></div>
          <h2 id="landscape-title" className="landscape-title"><span>КЕҢДІК —</span><span>БІЗДІҢ</span><em>болмыс.</em></h2>
          <div className="landscape-bottom"><p>Көкжиекке сыймаған кеңдік.<br />Көңілге ұялаған еркіндік.<br />Біздің хикаямыз осы жерден басталады.</p><span className="micro">ЖЕЛДІҢ ҮНІ.<br />ЖЕРДІҢ ЖАДЫ.</span></div>
          <span className="landscape-coordinate micro">ҰЛЫ ДАЛА / ШЕКСІЗ КӨКЖИЕК</span>
        </div>
      </section>

      <section id="oyu" className="pattern-lab" aria-labelledby="pattern-title">
        <div className="lab-stage">
          <div className="section-label micro"><span>02 / ӨРНЕК ТІЛІ</span><span>ӘР СЫЗЫҚТЫҢ ӨЗ ӘҢГІМЕСІ БАР</span></div>
          <div className="lab-layout"><div className="lab-copy"><span className="micro gold-text">КӨЗБЕН КӨР. КӨҢІЛМЕН ОҚЫ.</span><h2 id="pattern-title">ӨРНЕКТЕ —<br /><em>өмір.</em></h2><div className="lab-steps">
            <div className="lab-step"><span className="micro">01 / БАСТАУ</span><h3>Бір сызық.</h3><p>Ойдан туған иірім.<br />Қолдан шыққан алғашқы із.</p></div>
            <div className="lab-step"><span className="micro">02 / ҮЙЛЕСІМ</span><h3>Қос мүйіз.</h3><p>Екі иірім бір-бірін толықтырады.<br />Қошқармүйіздің таныс сұлбасы туады.</p></div>
            <div className="lab-step"><span className="micro">03 / ЖАЛҒАСТЫҚ</span><h3>Тұтас өрнек.</h3><p>Бір оюдан мың өрнек тарайды.<br />Бір ұрпақтан келесісіне жалғасады.</p></div>
          </div></div><div className="lab-blueprint"><div className="blueprint-cross horizontal" /><div className="blueprint-cross vertical" /><div className="blueprint-orbit" /><div className="lab-symbol"><Ornament className="lab-outline" outlined /><Ornament className="lab-fill" /></div><span className="blueprint-label micro top">ҚОШҚАРМҮЙІЗ</span><span className="blueprint-label micro bottom">СИММЕТРИЯ / ЫРҒАҚ / ҮЙЛЕСІМ</span><i className="corner top-left" /><i className="corner top-right" /><i className="corner bottom-left" /><i className="corner bottom-right" /></div></div>
          <div className="lab-bottom micro"><span>ҰЛТТЫҚ ОЮДЫҢ ЗАМАНАУИ ТҮСІНДІРМЕСІ</span><div className="lab-meter"><i /></div><span className="lab-percent">000</span></div>
        </div>
      </section>

      <section id="mura" className="crafts" aria-labelledby="craft-title">
        <div className="craft-pin">
          <div className="craft-heading"><div><span className="micro">03 / ҚОЛДАН ҚАЛҒАН ҚАЗЫНА</span><h2 id="craft-title">БІР ДАЛА.<br /><em>Мың өнер.</em></h2></div><p>Заттың да жаны бар.<br />Оған адам қолының жылуы сіңген.</p><span className="craft-direction micro">ӘРІ ҚАРАЙ АЙНАЛДЫРЫҢЫЗ<ArrowDownRight size={23} /></span></div>
          <div className="craft-window"><div className="craft-track">
            <article className="craft-card textile-card"><div className="craft-visual"><div className="visual-label micro"><span>01 / КИІЗ ӨНЕРІ</span><span>ЖЫЛЫЛЫҚ</span></div><div className="textile-art"><div className="textile-stitches" /><div className="textile-grid">{Array.from({ length: 6 }, (_, i) => <Ornament key={i} />)}</div><div className="textile-edge" /></div><div className="visual-bottom"><h3>СЫРМАҚ</h3><span className="micro">ЖҮННЕН ӨРІЛГЕН<br />ЖЫЛЫЛЫҚ</span></div></div><div className="craft-description"><span className="micro">ІСМЕРДІҢ ҚОЛТАҢБАСЫ</span><p>Жұмсақ киіз. Жарасқан түс.<br />Үйге жылу, көңілге жайлылық.</p></div></article>
            <article className="craft-card dombra-card"><div className="craft-visual"><div className="visual-label micro"><span>02 / КҮЙ ӨНЕРІ</span><span>ҮН</span></div><div className="sound-rings" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ width: `${28 + i * 12}%`, height: `${28 + i * 12}%` }} />)}</div><Dombra /><div className="visual-bottom"><h3>ДОМБЫРА</h3><span className="micro">ҚОС ІШЕККЕ<br />СЫЙҒАН ДАЛА</span></div></div><div className="craft-description"><span className="micro">КӨҢІЛДІҢ КҮМБІРІ</span><p>Сөз жетпеген жерден күй басталады.<br />Қос ішек талай хикаяны жеткізеді.</p></div></article>
            <article className="craft-card roof-card"><div className="craft-visual"><div className="visual-label micro"><span>03 / КИІЗ ҮЙ ӨНЕРІ</span><span>БІРЛІК</span></div><Shanyraq simple /><div className="visual-bottom"><h3>ШАҢЫРАҚ</h3><span className="micro">ОРТАҚ ҮЙ.<br />ОРТАҚ АСПАН.</span></div></div><div className="craft-description"><span className="micro">ҮЙДІҢ ЖҮРЕГІ</span><p>Уықтар тоғысқан ортақ шеңбер.<br />Бас қосқан жандардың жылуы.</p></div></article>
          </div></div>
          <div className="craft-footer micro"><span>МҰРА — КҮНДЕЛІКТІ ӨМІРДІҢ БІР БӨЛІГІ.</span><div className="craft-progress"><i /></div><span>01 / 03</span></div>
        </div>
      </section>

      <section className="woven" aria-label="Өткеннен өрілген, ертеңге жалғасқан"><OrnamentBand className="woven-top" /><div className="woven-line" aria-hidden="true"><span>ӨТКЕННЕН ӨРІЛГЕН</span><Horn /><span>ӨТКЕННЕН ӨРІЛГЕН</span><Horn /></div><div className="woven-line secondary" aria-hidden="true"><span>ЕРТЕҢГЕ ЖАЛҒАСҚАН</span><Horn /><span>ЕРТЕҢГЕ ЖАЛҒАСҚАН</span></div><div className="woven-footer micro"><span>ДӘСТҮР — ТОҚТАП ҚАЛҒАН УАҚЫТ ЕМЕС.</span><span>ОЛ БІЗБЕН БІРГЕ ӨМІР СҮРЕДІ.</span></div><OrnamentBand className="woven-bottom" /></section>

      <section id="shanyraq" className="roof-scene" aria-labelledby="roof-title">
        <div className="roof-stage"><div className="section-label micro"><span>04 / ОРТАҚ АСПАН</span><span>ӘР УЫҚ — БІР ТАҒДЫР</span></div><div className="roof-intro"><span className="micro">БІР НҮКТЕГЕ ТОҒЫСҚАН</span><h2 id="roof-title">БІРЛІКТІҢ<br /><em>бейнесі.</em></h2></div><div className="roof-assembly"><Shanyraq /></div><div className="roof-quote"><p>Шаңырақ биік.<br /><em>Тамыр терең.</em></p><span>Әрқайсымыз — осы өрнектің бір бөлшегіміз.</span></div><div className="roof-bottom micro"><span>КЕШЕГІ МҰРА. БҮГІНГІ БІРЛІК.</span><span className="roof-count">00 / 64</span><span>ЕРТЕҢГІ ЖАЛҒАСТЫҚ.</span></div></div>
      </section>

      <footer className="footer"><div className="footer-top micro"><span>05 / ЖАЛҒАСЫ ӨЗІҢНЕН</span><span>ХИКАЯ ОСЫ ЖЕРДЕ АЯҚТАЛМАЙДЫ</span></div><div className="footer-message"><span>Мұраға қарап қана қойма.</span><h2>ӨЗ ТАМЫРЫҢДЫ<br /><em>өзің жалға.</em></h2><Ornament className="footer-ornament" /></div><div className="footer-word" aria-hidden="true">ТАМЫР</div><OrnamentBand className="footer-band" /><div className="footer-bottom micro"><span>© 2026 ТАМЫР</span><span>ҚАЗАҚ МӘДЕНИЕТІНЕ АРНАЛҒАН КӨРНЕКІ ХИКАЯ</span><a href="#bastau">БАСТАУҒА ОРАЛУ<ArrowUpRight size={16} /></a></div></footer>
    </main>
  </div>
}
