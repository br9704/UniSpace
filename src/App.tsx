import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TabBar from '@/components/TabBar'
import HomePage from '@/pages/HomePage'
import MapPage from '@/pages/MapPage'
import AlertsPage from '@/pages/AlertsPage'
import InstallBanner from '@/components/InstallBanner'
import OfflineBanner from '@/components/OfflineBanner'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-full flex flex-col">
        <OfflineBanner />
        <div className="flex-1 overflow-hidden">
          <AnimatedRoutes />
        </div>
        <TabBar />
        <InstallBanner />
      </div>
    </BrowserRouter>
  )
}
