import { useRef, useState, useEffect } from 'react'

interface PhotoCarouselProps {
  photos: string[]
  alt: string
}

export default function PhotoCarousel({ photos, alt }: PhotoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index)
            if (!isNaN(idx)) setActiveIndex(idx)
          }
        }
      },
      { root: container, threshold: 0.6 },
    )

    const images = container.querySelectorAll('[data-index]')
    images.forEach((img) => observer.observe(img))

    return () => observer.disconnect()
  }, [photos.length])

  if (photos.length === 0) return null

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-snap-x-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {photos.map((src, i) => (
          <div
            key={src}
            data-index={i}
            className="shrink-0 w-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <img
              src={src}
              alt={`${alt} photo ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-40 object-cover"
              style={{ borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-chip)' }}
            />
          </div>
        ))}
      </div>
      {photos.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {photos.map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{
                backgroundColor: i === activeIndex
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-tertiary)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
