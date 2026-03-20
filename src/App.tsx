import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TabBar from '@/components/TabBar'
import HomePage from '@/pages/HomePage'
import MapPage from '@/pages/MapPage'
// FindPage removed — functionality merged into HomePage
import AlertsPage from '@/pages/AlertsPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            {/* Find page removed — search/sort in HomePage */}
            <Route path="/alerts" element={<AlertsPage />} />
          </Routes>
        </div>
        <TabBar />
      </div>
    </BrowserRouter>
  )
}
