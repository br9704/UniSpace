import { motion } from 'framer-motion'

interface FavouriteButtonProps {
  isFavourite: boolean
  onToggle: () => void
  size?: number
}

export default function FavouriteButton({ isFavourite, onToggle, size = 20 }: FavouriteButtonProps) {
  return (
    <motion.button
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      whileTap={{ scale: 0.8 }}
      aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minWidth: 44, minHeight: 44,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isFavourite ? '#E05252' : 'none'}
        stroke={isFavourite ? '#E05252' : '#94A3B8'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </motion.button>
  )
}
