import { useLayoutEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { chapters } from '../data/ornament'
import { sculptureState } from './scene'

gsap.registerPlugin(ScrollTrigger)

export function useJourney(root: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    let mounted = true
    media.add({ desktop: '(min-width:701px)', mobile: '(max-width:700px)', reduced: '(prefers-reduced-motion:reduce)' }, (context) => {
      const { desktop, reduced } = context.conditions!
      const element = root.current!
      const select = gsap.utils.selector(element)
      Object.assign(sculptureState, { turn: 0, unfold: 0, scale: 1 })
      gsap.to('.page-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: element, start: 'top top', end: 'bottom bottom', scrub: true } })
      chapters.forEach((chapter) => {
        const marker = element.querySelector(`[data-section="${chapter.id}"]`)!
        ScrollTrigger.create({ trigger: `#${chapter.id}`, start: 'top 45%', end: 'bottom 45%', onToggle: (self) => marker.classList.toggle('is-active', self.isActive) })
      })
      if (reduced) {
        element.querySelector('.lab-percent')!.textContent = '100'
        return
      }

      const lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      lenis.on('scroll', ScrollTrigger.update)
      let active = true
      const navigate = (event: MouseEvent) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
        const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
        const href = anchor?.getAttribute('href')
        const target = href ? document.getElementById(href.slice(1)) : null
        if (!target) return
        event.preventDefault()
        void document.fonts.ready.then(() => {
          if (!active) return
          ScrollTrigger.refresh()
          lenis.resize()
          const pinned = target.id !== 'main' && (target.id !== 'mura' || desktop)
          const offset = pinned ? parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) : 0
          history.pushState(null, '', href)
          lenis.scrollTo(target, { offset, duration: 1.3, easing: (t) => 1 - (1 - t) ** 4, onComplete: () => {
            if (document.activeElement === anchor) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }) }
          } })
        })
      }
      element.addEventListener('click', navigate)

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-letter', { yPercent: 90, opacity: 0, rotation: 4, stagger: 0.075, duration: 1.2 }, 0.05)
        .from('.hero-object', { opacity: 0, y: 80, rotation: 16, duration: 1.65 }, 0.2)
        .from('.hero-eyebrow, .hero-bottom, .hero-annotation, .hero-baseline', { y: 16, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.55)

      const hero = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.7 } })
      hero.to('.hero-letter', { yPercent: (index) => -80 - index * 12, xPercent: (index) => (index - 2) * 15, opacity: 0, rotation: (index) => (index - 2) * 3, stagger: 0.035, duration: 0.6, ease: 'power1.in' }, 0)
        .to('.hero-bottom, .hero-annotation, .hero-eyebrow', { y: -55, opacity: 0, duration: 0.35 }, 0)
        .to('.hero-object', { xPercent: desktop ? -26 : 0, yPercent: -4, duration: 0.8, ease: 'none' }, 0)
        .to(sculptureState, { turn: 1, scale: desktop ? 1.2 : 1.12, duration: 1, ease: 'none' }, 0)
        .to(sculptureState, { unfold: 1, duration: 0.5, ease: 'power1.inOut' }, 0.45)
        .to('.hero-band', { xPercent: -12, duration: 1, ease: 'none' }, 0)
        .to('.hero-baseline', { opacity: 0.15, duration: 0.3 }, 0.65)

      const landscape = gsap.timeline({ scrollTrigger: { trigger: '.landscape', start: 'top top', end: 'bottom bottom', scrub: 0.65 } })
      landscape.fromTo('.landscape-window', { clipPath: desktop ? 'inset(18% 24% 20% 24%)' : 'inset(18% 12% 20% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'power2.inOut' }, 0)
        .fromTo('.landscape-window img', { scale: 1.4, yPercent: 5 }, { scale: 1.03, yPercent: 0, duration: 1.4, ease: 'none' }, 0)
        .from('.landscape-title>span', { yPercent: 100, opacity: 0, stagger: 0.1, duration: 0.4 }, 0.3)
        .from('.landscape-title>em', { y: 60, opacity: 0, duration: 0.45 }, 0.7)
        .from('.landscape-bottom, .landscape-coordinate', { opacity: 0, y: 20, duration: 0.4 }, 0.8)
        .to('.landscape-title', { y: -30, duration: 0.35, ease: 'none' }, 1.05)

      const lab = gsap.timeline({ scrollTrigger: { trigger: '.pattern-lab', start: 'top top', end: 'bottom bottom', scrub: 0.55 } })
      lab.fromTo('.lab-outline .horn-stroke', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, stagger: 0.19, ease: 'none' }, 0)
        .fromTo('.lab-symbol', { rotation: -90, scale: 0.67 }, { rotation: 0, scale: 1, duration: 2.6, ease: 'power1.inOut' }, 0)
        .to('.lab-fill', { opacity: 1, duration: 0.7 }, 2.05)
        .to('.lab-outline', { opacity: 0.35, duration: 0.7 }, 2.05)
        .to('.lab-step:nth-child(1)', { opacity: 0, y: -15, duration: 0.22 }, 0.65)
        .fromTo('.lab-step:nth-child(2)', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.28 }, 0.88)
        .to('.lab-step:nth-child(2)', { opacity: 0, y: -15, duration: 0.22 }, 1.6)
        .fromTo('.lab-step:nth-child(3)', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.28 }, 1.85)
        .to('.lab-meter i', { scaleX: 1, duration: 2.75, ease: 'none' }, 0)
      const percentage = { value: 0 }
      const percentLabel = element.querySelector('.lab-percent')!
      lab.to(percentage, { value: 100, duration: 2.75, ease: 'none', onUpdate: () => { percentLabel.textContent = String(Math.round(percentage.value)).padStart(3, '0') } }, 0)

      if (desktop) {
        const track = element.querySelector<HTMLElement>('.craft-track')!
        const viewport = element.querySelector<HTMLElement>('.craft-window')!
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        const gallery = gsap.timeline({ scrollTrigger: { trigger: '.craft-pin', start: 'top top', end: () => `+=${Math.max(distance() * 1.6, innerHeight * 1.4)}`, pin: true, scrub: 0.7, invalidateOnRefresh: true } })
        gallery.to(track, { x: () => -distance(), duration: 1, ease: 'none' }, 0)
          .to('.craft-progress i', { scaleX: 1, duration: 1, ease: 'none' }, 0)
          .fromTo('.textile-art', { rotation: -15, yPercent: 8 }, { rotation: 4, yPercent: -3, duration: 1, ease: 'none' }, 0)
          .fromTo('.dombra-drawing', { rotation: -16, yPercent: 12 }, { rotation: 18, yPercent: -5, duration: 1, ease: 'none' }, 0)
          .fromTo('.roof-card .shanyraq-drawing', { rotation: -40, scale: 0.8 }, { rotation: 30, scale: 1.08, duration: 1, ease: 'none' }, 0)
          .fromTo('.sound-rings', { scale: 0.7, opacity: 0.3 }, { scale: 1.2, opacity: 1, duration: 1, ease: 'none' }, 0)
        const label = element.querySelector('.craft-footer>span:last-child')!
        gallery.eventCallback('onUpdate', () => { label.textContent = `0${Math.min(3, 1 + Math.floor(gallery.progress() * 3))} / 03` })
      } else {
        select('.craft-card').forEach((card: HTMLElement) => {
          gsap.from(card, { y: 60, opacity: 0.2, rotation: 2, ease: 'none', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 48%', scrub: 0.5 } })
          const art = card.querySelector('.textile-art, .dombra-drawing, .shanyraq-drawing')!
          gsap.fromTo(art, { rotation: -15 }, { rotation: 12, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.5 } })
        })
      }
      gsap.to('.dombra-strings', { x: 1.3, yoyo: true, repeat: 16, duration: 0.05, ease: 'sine.inOut', scrollTrigger: { trigger: '.crafts', start: 'top 70%', end: 'bottom 20%', scrub: true } })
      gsap.fromTo('.woven-line:not(.secondary)', { xPercent: -3 }, { xPercent: -24, ease: 'none', scrollTrigger: { trigger: '.woven', start: 'top bottom', end: 'bottom top', scrub: 0.55 } })
      gsap.fromTo('.woven-line.secondary', { xPercent: -28 }, { xPercent: -3, ease: 'none', scrollTrigger: { trigger: '.woven', start: 'top bottom', end: 'bottom top', scrub: 0.55 } })
      gsap.to('.woven .horn', { rotation: 180, ease: 'none', scrollTrigger: { trigger: '.woven', start: 'top bottom', end: 'bottom top', scrub: 0.55 } })

      const roof = gsap.timeline({ scrollTrigger: { trigger: '.roof-scene', start: 'top top', end: 'bottom bottom', scrub: 0.7 } })
      roof.fromTo('.roof-assembly .shanyraq-rings circle', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.1, duration: 0.7, ease: 'none' }, 0)
        .fromTo('.roof-assembly .uyq path', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, stagger: 0.014, ease: 'none' }, 0.25)
        .fromTo('.roof-assembly .kuldireuish path', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, stagger: 0.08, ease: 'none' }, 0.55)
        .fromTo('.roof-assembly>.shanyraq-drawing', { rotateX: 62, rotation: -65, scale: 0.65 }, { rotateX: 0, rotation: 0, scale: 1, duration: 1.75, ease: 'power1.inOut' }, 0)
        .to('.roof-intro', { opacity: 0, y: -50, duration: 0.45 }, 1.15)
        .to('.roof-assembly', { xPercent: desktop ? -22 : 0, yPercent: desktop ? 0 : -15, scale: 1.22, opacity: 0.22, duration: 0.85 }, 1.4)
        .fromTo('.roof-quote', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.75 }, 1.65)
      const roofValue = { value: 0 }
      const roofLabel = element.querySelector('.roof-count')!
      roof.to(roofValue, { value: 64, duration: 1.55, ease: 'none', onUpdate: () => { roofLabel.textContent = `${String(Math.round(roofValue.value)).padStart(2, '0')} / 64` } }, 0)

      gsap.from('.footer-message h2', { y: 85, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.footer-message', start: 'top 88%', end: 'top 35%', scrub: 0.6 } })
      gsap.fromTo('.footer-ornament', { rotation: -60, scale: 0.7 }, { rotation: 35, scale: 1, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } })
      gsap.from('.footer-word', { yPercent: 45, scaleY: 0.7, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.footer-word', start: 'top 110%', end: 'bottom 92%', scrub: 0.6 } })
      gsap.to('.footer-band', { xPercent: -10, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } })

      return () => { active = false; element.removeEventListener('click', navigate); gsap.ticker.remove(tick); lenis.destroy() }
    }, root)
    void document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh() })
    return () => { mounted = false; media.revert() }
  }, [root])
}
