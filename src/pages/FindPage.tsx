export default function FindPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <span className="text-4xl mb-4">🔍</span>
      <h1 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Find a Spot</h1>
      <p className="text-sm text-center mt-2" style={{ color: 'var(--color-text-secondary)' }}>
        Filter by amenities, walking distance, and availability to find the perfect study space.
      </p>
      <p className="text-xs mt-4 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--color-uom-navy)', color: 'white' }}>
        Coming soon
      </p>
    </div>
  )
}
