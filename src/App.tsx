import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TabBar from '@/components/TabBar'
import HomePage from '@/pages/HomePage'
import MapPage from '@/pages/MapPage'
import FindPage from '@/pages/FindPage'
import AlertsPage from '@/pages/AlertsPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/find" element={<FindPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
          </Routes>
        </div>
        <TabBar />
      </div>
    </BrowserRouter>
  )
}
