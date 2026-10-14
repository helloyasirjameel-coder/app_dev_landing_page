import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Overlap the services' final viewport, then fill it before the portfolio enters. */
export default function CircularReveal() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const scene = sceneRef.current!
    const layer = layerRef.current!
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const viewportHeight = () => window.innerHeight
      const circle = (radius: number) => `circle(${radius}px at 50% ${viewportHeight()}px)`
      const viewportRadius = () => Math.hypot(scene.clientWidth / 2, viewportHeight()) + 4

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          // Keep the fill to roughly one or two ordinary wheel gestures.
          end: () => `+=${gsap.utils.clamp(160, 240, viewportHeight() * 0.25)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      })

      // Start entirely hidden; no small circle scrolls into view before the pin.
      reveal.fromTo(layer, { clipPath: () => circle(0) }, {
        clipPath: () => circle(viewportRadius()),
        duration: 1,
        ease: 'power1.out',
      })

    }, scene)

    return () => media.revert()
  }, [])

  return <div className="portfolio-reveal" ref={sceneRef} aria-hidden="true">
    <div className="portfolio-reveal-layer" ref={layerRef}/>
  </div>
}
