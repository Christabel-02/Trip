import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Page components
import Home from './pages/Home'
import TripWizard from './pages/TripWizard'
import TripDetails from './components/steps/TripDetails'
import ActivityPlanner from './components/steps/ActivityPlanner'
import TravelTimeRecommender from './components/steps/TravelTimeRecommender'
import FlightSearch from './components/steps/FlightSearch'
import Itinerary from './components/steps/Itinerary'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<TripWizard />}>
              <Route path="details" element={<TripDetails />} />
              <Route path="activities" element={<ActivityPlanner />} />
              <Route path="travel-time" element={<TravelTimeRecommender />} />
              <Route path="flights" element={<FlightSearch />} />
              <Route path="itinerary" element={<Itinerary />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App