import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AppPortfolio.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { image: 'wellness', title: 'A little more balance.', category: 'Wellness · App concept', alt: 'Wellness app with a daily habit dashboard and guided breathing experience' },
  { image: 'finance', title: 'Everyday money, simplified.', category: 'Fintech · App concept', alt: 'Personal finance app showing balance, spending insights and account activity' },
  { image: 'travel', title: 'Discover somewhere new.', category: 'Travel · App concept', alt: 'Travel discovery app with destinations, itineraries and interactive maps' },
  { image: 'productivity', title: 'Make room for good work.', category: 'Productivity · App concept', alt: 'Project management experience across a tablet and mobile app' },
  { image: 'food', title: 'Good food. One tap away.', category: 'On-demand delivery · App concept', alt: 'Food ordering app with restaurant discovery and live delivery tracking' },
  { image: 'commerce', title: 'A better way to browse.', category: 'E-commerce · App concept', alt: 'Fashion shopping app featuring product details, collections and a wishlist' },
]

function AppToDarkTransition() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const scene = sceneRef.current!
    const tile = scene.querySelector<HTMLElement>('.app-transition-tile')!
    const symbol = scene.querySelector<SVGElement>('.app-transition-symbol')!
    const hint = scene.querySelector<HTMLElement>('.app-transition-hint')!
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const expansion = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: () => `+=${scene.clientHeight * 1.15}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      expansion.fromTo(tile, { rotation: -12 }, { rotation: 0, duration: 0.25 }, 0)
      expansion.to(hint, { opacity: 0, y: 12, duration: 0.16 }, 0)
      expansion.to(symbol, { opacity: 0, scale: 0.7, duration: 0.16 }, 0.18)
      expansion.fromTo(tile, { width: 132, height: 132, borderRadius: 32 }, {
        width: () => scene.clientWidth + 4,
        height: () => scene.clientHeight + 4,
        borderRadius: 0,
        duration: 0.75,
        ease: 'power2.inOut',
      }, 0.2)

      return () => { expansion.scrollTrigger?.kill(); expansion.kill() }
    }, scene)

    return () => media.revert()
  }, [])

  return <div className="app-transition-stage" ref={sceneRef} aria-hidden="true">
    <div className="app-transition-tile">
      <svg className="app-transition-symbol" viewBox="0 0 64 64" fill="none">
        <rect x="19" y="10" width="26" height="44" rx="7" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M28 16h8M29 48h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="25" y="24" width="6" height="6" rx="1.5" fill="currentColor"/>
        <rect x="34" y="24" width="6" height="6" rx="1.5" fill="currentColor" opacity=".45"/>
        <rect x="25" y="33" width="6" height="6" rx="1.5" fill="currentColor" opacity=".45"/>
        <rect x="34" y="33" width="6" height="6" rx="1.5" fill="currentColor"/>
      </svg>
    </div>
    <p className="app-transition-hint">Small screens. Endless possibilities.<span>Keep scrolling <span>↓</span></span></p>
  </div>
}

export default function AppPortfolio({ action }: { action: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.latest-work-title-line > span', {
        yPercent: 105,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.latest-work-heading', start: 'top 95%', end: 'bottom 65%', scrub: 0.5 },
      })
      sectionRef.current!.querySelectorAll<HTMLElement>('.latest-project-media').forEach((frame) => {
        const reveal = gsap.timeline({
          defaults: { duration: 1, ease: 'power1.out' },
          scrollTrigger: { trigger: frame, start: 'top 95%', end: 'bottom top', toggleActions: 'play reverse play reverse' },
        })
        reveal.fromTo(frame, { scale: 0.9 }, { scale: 1 }, 0)
        reveal.fromTo(frame.querySelector('img'), { scale: 1.3 }, { scale: 1 }, 0)
      })
    }, sectionRef)
    return () => media.revert()
  }, [])

  return <>
    <AppToDarkTransition/>
    <section ref={sectionRef} className="latest-work" id="work" aria-labelledby="latest-work-heading">
      <div className="portfolio-inner">
        <div className="latest-work-heading">
          <p className="portfolio-label">// App concepts</p>
          <h2 className="latest-work-title" id="latest-work-heading">
            <span className="latest-work-title-line"><span>Take a look at</span></span>{' '}
            <span className="latest-work-title-line"><span>our app concepts</span></span>
          </h2>
        </div>
        <div className="latest-work-intro">
          <p>From everyday essentials to ambitious platforms. Explore a collection of app concepts that show what your next digital experience could look like.</p>
          {action}
        </div>
        <div className="latest-work-grid">
          {projects.map(({ image, title, category, alt }, index) => <article className="latest-project" key={image}>
            <div className="latest-project-media"><img src={`/showcase/${image}.jpg`} alt={alt} width="900" height="630" loading="lazy" decoding="async"/></div>
            <div className="latest-project-caption">
              <div><h3>{title}</h3><p>{category}</p></div>
              <span className="latest-project-number" aria-hidden="true">({String(index + 1).padStart(2, '0')})</span>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  </>
}
