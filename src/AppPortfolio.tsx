import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CircularReveal from './CircularReveal'
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

export default function AppPortfolio({ action }: { action: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      sectionRef.current!.querySelectorAll<HTMLElement>('.latest-project-media').forEach((frame) => {
        const reveal = gsap.timeline({
          defaults: { duration: 1, ease: 'power1.out' },
          scrollTrigger: { trigger: frame, pinnedContainer: '.portfolio-reveal', start: 'top 95%', end: 'bottom top', toggleActions: 'play reverse play reverse' },
        })
        reveal.fromTo(frame, { scale: 0.9 }, { scale: 1 }, 0)
        reveal.fromTo(frame.querySelector('img'), { scale: 1.3 }, { scale: 1 }, 0)
      })
    }, sectionRef)
    return () => media.revert()
  }, [])

  return <CircularReveal>
    <section ref={sectionRef} className="latest-work" id="work" aria-labelledby="latest-work-heading">
      <div className="portfolio-inner">
        <div className="latest-work-heading">
          <p className="portfolio-label">// Selected app concepts</p>
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
  </CircularReveal>
}
