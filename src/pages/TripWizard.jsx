import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTrip } from '../context/TripContext'
import StepIndicator from '../components/ui/StepIndicator'

const steps = [
  { id: 1, name: 'Trip Details', path: '/plan/details' },
  { id: 2, name: 'Activities', path: '/plan/activities' },
  { id: 3, name: 'Travel Time', path: '/plan/travel-time' },
  { id: 4, name: 'Flights', path: '/plan/flights' },
  { id: 5, name: 'Itinerary', path: '/plan/itinerary' },
]

const TripWizard = () => {
  const { state, dispatch } = useTrip()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Set current step based on route
  useEffect(() => {
    const currentPath = location.pathname
    const currentStep = steps.find(step => step.path === currentPath)
    
    if (currentStep) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: currentStep.id })
    } else {
      // If on an invalid path, navigate to the first step
      navigate('/plan/details')
    }
  }, [location.pathname, dispatch, navigate])

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Plan Your Perfect Trip
          </h1>
          
          <StepIndicator steps={steps} currentStep={state.currentStep} completedSteps={state.completedSteps} />
        </motion.div>

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 md:p-8"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  )
}

export default TripWizard