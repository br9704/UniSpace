import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TabBar from '@/components/TabBar'
import HomePage from '@/pages/HomePage'
import MapPage from '@/pages/MapPage'
import AlertsPage from '@/pages/AlertsPage'
import InstallBanner from '@/components/InstallBanner'
import OfflineBanner from '@/components/OfflineBanner'
import ConfigError from '@/components/ConfigError'
import { isSupabaseConfigured, supabaseConfigError } from '@/lib/supabase'
import { isFixtureMode } from '@/lib/dataSource'

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
  // Without credentials every screen would render as an unexplained empty
  // state. Say what is wrong once, at the top, instead — unless fixtures are
  // standing in for the backend, in which case there is nothing wrong.
  if (!isSupabaseConfigured && !isFixtureMode) {
    return <ConfigError detail={supabaseConfigError} />
  }

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
