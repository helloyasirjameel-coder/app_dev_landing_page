import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Reveal the actual next section from the bottom edge of a pinned viewport. */
export default function CircularReveal({ children }: { children: ReactNode }) {
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
      const sectionRadius = () => Math.hypot(
        scene.clientWidth / 2,
        Math.max(viewportHeight(), layer.offsetHeight - viewportHeight()),
      ) + 4

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
        duration: 0.85,
        ease: 'power1.inOut',
      })
      // Once the viewport is covered, open the rest of the section below it.
      // This preserves normal scrolling without a clip-path jump at release.
      reveal.to(layer, {
        clipPath: () => circle(sectionRadius()),
        duration: 0.15,
        ease: 'none',
      })
      reveal.fromTo(layer.querySelectorAll('.latest-work-heading, .latest-work-intro'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
        0.55,
      )
    }, scene)

    return () => media.revert()
  }, [])

  return <div className="portfolio-reveal" ref={sceneRef}>
    <div className="portfolio-reveal-layer" ref={layerRef}>{children}</div>
  </div>
}
