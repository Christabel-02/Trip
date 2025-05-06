import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import { useTrip } from '../../context/TripContext'
import { getBetterTravelTimes } from '../../services/weatherService'

const TravelTimeRecommender = () => {
  const { state, dispatch } = useTrip()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState([])
  const [showStickyWithCurrentDates, setShowStickyWithCurrentDates] = useState(false)
  
  useEffect(() => {
    // Redirect to first step if no destination is set
    if (!state.destination) {
      navigate('/plan/details')
      return
    }
    
    // Redirect if activities haven't been selected
    if (!state.activities || state.activities.length === 0) {
      navigate('/plan/activities')
      return
    }
    
    // Get travel time recommendations
    const getRecommendations = async () => {
      try {
        setLoading(true)
        
        // Get better travel times
        const travelTimes = await getBetterTravelTimes(state.destination)
        setRecommendations(travelTimes)
        
        // Store in context
        dispatch({ type: 'SET_BETTER_TRAVEL_TIMES', payload: travelTimes })
        
        setLoading(false)
      } catch (error) {
        console.error('Error getting travel time recommendations:', error)
        setLoading(false)
      }
    }
    
    getRecommendations()
  }, [state.destination, state.activities, dispatch, navigate])
  
  const handleContinue = () => {
    // Mark this step as completed
    dispatch({ type: 'COMPLETE_STEP', payload: 3 })
    
    // Navigate to next step
    navigate('/plan/flights')
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-2">Travel Time Recommendations</h2>
      
      <div className="mb-6">
        <p className="text-lg">
          Based on weather patterns and local events, here are our recommendations for the best times to visit {state.destination}.
        </p>
      </div>
      
      {/* Current Trip Dates */}
      <div className="mb-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <FaCalendarAlt className="mr-2 text-primary-500" /> Your Current Travel Dates
        </h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="p-3 bg-gray-50 rounded-lg text-center mr-4">
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium text-lg">
                {new Date(state.startDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            
            <FaArrowRight className="text-gray-400 mr-4" />
            
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-500">To</p>
              <p className="font-medium text-lg">
                {new Date(state.endDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <FaCheckCircle className="text-success-500 mr-2" />
            <span>{state.numDays} {state.numDays === 1 ? 'day' : 'days'} trip</span>
          </div>
        </div>
      </div>
      
      {/* Recommended Travel Times */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recommended Travel Times</h3>
        
        {recommendations.length === 0 ? (
          <p className="text-gray-600">No specific recommendations available for {state.destination}.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                className="card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4 className="font-medium text-lg mb-3 flex items-center">
                  <FaCalendarAlt className="mr-2 text-primary-500" /> {recommendation.month}
                </h4>
                <p className="text-gray-700">{recommendation.reason}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                    onClick={() => {
                      setShowStickyWithCurrentDates(true)
                      // In a real app, this would show a date picker to change dates
                    }}
                  >
                    <span>Consider these dates</span>
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Note about keeping current dates */}
      {showStickyWithCurrentDates && (
        <motion.div
          className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start">
            <FaCheckCircle className="text-success-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-success-500 mb-1">Sticking with your dates</h4>
              <p className="text-gray-700">
                You've chosen to continue with your original travel dates. 
                You can always come back and modify your travel plans later.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Weather Pattern Information */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-lg font-medium mb-3">General Weather Information for {state.destination.split(',')[0]}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-3 bg-white rounded-md">
            <h4 className="font-medium mb-1">Spring</h4>
            <p className="text-sm text-gray-600">
              {recommendations.length > 0 
                ? 'Mild temperatures, possible rain showers.' 
                : 'Weather data not available.'}
            </p>
          </div>
          <div className="p-3 bg-white rounded-md">
            <h4 className="font-medium mb-1">Summer</h4>
            <p className="text-sm text-gray-600">
              {recommendations.length > 0 
                ? 'Warmer temperatures, longer daylight hours.' 
                : 'Weather data not available.'}
            </p>
          </div>
          <div className="p-3 bg-white rounded-md">
            <h4 className="font-medium mb-1">Fall</h4>
            <p className="text-sm text-gray-600">
              {recommendations.length > 0 
                ? 'Cooling temperatures, less crowds.' 
                : 'Weather data not available.'}
            </p>
          </div>
          <div className="p-3 bg-white rounded-md">
            <h4 className="font-medium mb-1">Winter</h4>
            <p className="text-sm text-gray-600">
              {recommendations.length > 0 
                ? 'Cooler temperatures, possible seasonal events.' 
                : 'Weather data not available.'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/plan/activities')}
          className="btn btn-secondary"
        >
          Back
        </button>
        
        <button
          onClick={handleContinue}
          className="btn btn-primary"
        >
          Continue to Flights
        </button>
      </div>
    </motion.div>
  )
}

export default TravelTimeRecommender