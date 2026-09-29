import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import { hornPath } from '../data/ornament'
import { sculptureState } from '../lib/scene'
import { Ornament } from './Ornament'

export function GoldenOrnament() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = ref.current!
    let renderer: THREE.WebGLRenderer
    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' })
      if (!context) return
      renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true })
    } catch { return }
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5
    host.appendChild(renderer.domElement)
    const world = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100)
    camera.position.z = 10.4
    const room = new RoomEnvironment()
    const generator = new THREE.PMREMGenerator(renderer)
    const environment = generator.fromScene(room, 0.04)
    world.environment = environment.texture
    room.dispose()
    generator.dispose()
    const key = new THREE.DirectionalLight(0xfff0cb, 4)
    key.position.set(-3, 5, 5)
    world.add(key, new THREE.HemisphereLight(0xffe7b7, 0x5a1f26, 2))
    const gold = new THREE.MeshStandardMaterial({ color: 0xb58b3f, metalness: 0.93, roughness: 0.24, envMapIntensity: 1.7 })
    const curves = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${hornPath}" /></svg>`)
    const shape = SVGLoader.createShapes(curves.paths[0])
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 13, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 3, bevelThickness: 4, curveSegments: 28 })
    geometry.scale(0.014, 0.014, 0.014)
    geometry.translate(0, 0, -0.09)
    const object = new THREE.Group()
    const arms: THREE.Group[] = []
    for (let i = 0; i < 4; i++) {
      const pivot = new THREE.Group()
      pivot.rotation.z = i * Math.PI / 2
      const pair = new THREE.Group()
      pair.position.y = -1.08
      const left = new THREE.Mesh(geometry, gold)
      const right = new THREE.Mesh(geometry, gold)
      right.scale.x = -1
      pair.add(left, right)
      pivot.add(pair)
      arms.push(pair)
      object.add(pivot)
    }
    const beadGeometry = new THREE.OctahedronGeometry(0.19, 0)
    const bead = new THREE.Mesh(beadGeometry, gold)
    object.add(bead)
    world.add(object)
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = query.matches
    let visible = true
    let lost = false
    let last = 0
    const draw = (time: number) => {
      if (lost || !visible || document.hidden || time - last < 1 / 40) return
      last = time
      const progress = reduced ? 0 : sculptureState.turn
      object.rotation.set(0.12 + progress * 0.9, -0.24 + progress * Math.PI * 1.4, -0.12 - progress * 0.6)
      object.scale.setScalar(reduced ? 1 : sculptureState.scale)
      arms.forEach((arm, index) => {
        arm.position.y = -1.08 - (reduced ? 0 : sculptureState.unfold) * 1.1
        arm.position.z = (reduced ? 0 : sculptureState.unfold) * (index % 2 ? 0.65 : -0.65)
      })
      renderer.render(world, camera)
      host.dataset.ready = 'true'
    }
    const resize = () => {
      const { width, height } = host.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      last = -1
      draw(gsap.ticker.time)
    }
    const onMotion = () => { reduced = query.matches; gsap.ticker.remove(draw); if (!reduced) gsap.ticker.add(draw); last = -1; draw(gsap.ticker.time) }
    const onLost = (event: Event) => { event.preventDefault(); lost = true; delete host.dataset.ready }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { last = -1; draw(gsap.ticker.time) } }, { rootMargin: '100px' })
    observer.observe(host)
    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(host)
    query.addEventListener('change', onMotion)
    renderer.domElement.addEventListener('webglcontextlost', onLost)
    resize()
    if (!reduced) gsap.ticker.add(draw)
    return () => {
      gsap.ticker.remove(draw)
      observer.disconnect()
      sizeObserver.disconnect()
      query.removeEventListener('change', onMotion)
      renderer.domElement.removeEventListener('webglcontextlost', onLost)
      geometry.dispose()
      beadGeometry.dispose()
      gold.dispose()
      environment.dispose()
      renderer.dispose()
      renderer.domElement.remove()
      delete host.dataset.ready
    }
  }, [])
  return <div className="golden-object" ref={ref} aria-hidden="true"><div className="object-shadow" /><Ornament className="golden-fallback" /></div>
}
