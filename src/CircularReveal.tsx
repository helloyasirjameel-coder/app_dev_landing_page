import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Fill the viewport with dark color before the following section scrolls into view. */
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
          end: () => `+=${viewportHeight() * 1.2}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      })

      reveal.fromTo(layer, { clipPath: () => circle(50) }, {
        clipPath: () => circle(viewportRadius()),
        duration: 1,
        ease: 'power1.inOut',
      })

    }, scene)

    return () => media.revert()
  }, [])

  return <div className="portfolio-reveal" ref={sceneRef} aria-hidden="true">
    <div className="portfolio-reveal-layer" ref={layerRef}/>
  </div>
}
