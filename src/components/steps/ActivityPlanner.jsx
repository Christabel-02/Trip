import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSun, FaCloudRain, FaExclamationTriangle, FaStar, FaChild, FaUser, FaUserTie } from 'react-icons/fa'
import { useTrip } from '../../context/TripContext'
import { getWeatherForecast, getWeatherSuitability } from '../../services/weatherService'
import { getAttractions, getActivityIconByType } from '../../services/attractionsService'

const ActivityPlanner = () => {
  const { state, dispatch } = useTrip()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [weatherData, setWeatherData] = useState(null)
  const [activities, setActivities] = useState({
    kids: [],
    adultsUnder50: [],
    adultsOver50: [],
  })
  const [selectedActivities, setSelectedActivities] = useState([])
  
  useEffect(() => {
    // Redirect to first step if no destination is set
    if (!state.destination) {
      navigate('/plan/details')
      return
    }
    
    // Load data
    const loadData = async () => {
      try {
        setLoading(true)
        
        // Fetch weather data
        const weather = await getWeatherForecast(state.destination)
        setWeatherData(weather)
        
        // Store weather data in context
        dispatch({ type: 'SET_WEATHER_DATA', payload: weather })
        
        // Fetch activities for each age group
        const promises = []
        
        if (state.travelers.kids > 0) {
          promises.push(
            getAttractions(state.destination, 'kids')
              .then(data => setActivities(prev => ({ ...prev, kids: data })))
          )
        }
        
        if (state.travelers.adultsUnder50 > 0) {
          promises.push(
            getAttractions(state.destination, 'adultsUnder50')
              .then(data => setActivities(prev => ({ ...prev, adultsUnder50: data })))
          )
        }
        
        if (state.travelers.adultsOver50 > 0) {
          promises.push(
            getAttractions(state.destination, 'adultsOver50')
              .then(data => setActivities(prev => ({ ...prev, adultsOver50: data })))
          )
        }
        
        await Promise.all(promises)
        
        // Set initial selected activities from context if available
        if (state.activities && state.activities.length > 0) {
          setSelectedActivities(state.activities)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error loading activity data:', error)
        setLoading(false)
      }
    }
    
    loadData()
  }, [state.destination, state.travelers, dispatch, navigate])
  
  const handleActivityToggle = (activity) => {
    setSelectedActivities(prev => {
      const isSelected = prev.some(item => item.id === activity.id)
      
      if (isSelected) {
        return prev.filter(item => item.id !== activity.id)
      } else {
        return [...prev, { ...activity, weather: getCurrentWeather() }]
      }
    })
  }
  
  const getCurrentWeather = () => {
    if (!weatherData || !weatherData.forecast || weatherData.forecast.length === 0) {
      return null
    }
    
    // Just use the first day's weather for simplicity
    return weatherData.forecast[0].weather
  }
  
  const isActivityWeatherSuitable = (activity) => {
    if (!weatherData || !weatherData.forecast || weatherData.forecast.length === 0) {
      return true
    }
    
    const currentWeather = weatherData.forecast[0].weather.main
    return getWeatherSuitability(currentWeather)
  }
  
  const isActivitySelected = (activityId) => {
    return selectedActivities.some(item => item.id === activityId)
  }
  
  const handleContinue = () => {
    // Save selected activities to context
    dispatch({ type: 'SET_ACTIVITIES', payload: selectedActivities })
    
    // Mark this step as completed
    dispatch({ type: 'COMPLETE_STEP', payload: 2 })
    
    // Navigate to next step
    navigate('/plan/travel-time')
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
      <h2 className="text-2xl font-bold mb-2">Activities in {state.destination}</h2>
      
      {weatherData && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <FaSun className="mr-2 text-amber-500" /> Current Weather
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weatherData.forecast.slice(0, 5).map((day, index) => (
              <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                <p className="font-medium text-center mb-2">
                  {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <div className="flex flex-col items-center">
                  <img 
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                    alt={day.weather.description}
                    className="w-12 h-12"
                  />
                  <p className="capitalize text-sm text-center">{day.weather.description}</p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">{day.temp.max}°C</span> / {day.temp.min}°C
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <p className="text-lg">
          Select activities for your trip. We've suggested options based on your travel group and current weather conditions.
        </p>
      </div>
      
      {/* Activities by Age Group */}
      <div className="space-y-8 mb-8">
        {/* Kids Activities */}
        {state.travelers.kids > 0 && activities.kids.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaChild className="mr-2 text-primary-500" /> Kid-Friendly Activities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.kids.map(activity => (
                <motion.div
                  key={activity.id}
                  className={`card p-4 cursor-pointer transition-all ${
                    isActivitySelected(activity.id) 
                      ? 'border-primary-500 ring-2 ring-primary-200' 
                      : ''
                  }`}
                  onClick={() => handleActivityToggle(activity)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-lg mb-1 flex items-center">
                        <span className="mr-2">{getActivityIconByType(activity.type)}</span> 
                        {activity.name}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize mb-2">{activity.type.replace('_', ' ')}</p>
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(activity.rating) 
                                  ? 'text-amber-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{activity.rating}</span>
                      </div>
                    </div>
                    
                    {!isActivityWeatherSuitable(activity) && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="p-2 bg-amber-100 text-amber-800 rounded-md flex items-center">
                          <FaCloudRain className="mr-1" />
                          <span className="text-xs">Weather alert</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!isActivityWeatherSuitable(activity) && (
                    <div className="mt-3 text-sm text-amber-800 bg-amber-50 p-2 rounded-md">
                      <FaExclamationTriangle className="inline-block mr-1" />
                      Not recommended due to current weather conditions
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Adults Under 50 Activities */}
        {state.travelers.adultsUnder50 > 0 && activities.adultsUnder50.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaUser className="mr-2 text-primary-500" /> Activities for Adults
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.adultsUnder50.map(activity => (
                <motion.div
                  key={activity.id}
                  className={`card p-4 cursor-pointer transition-all ${
                    isActivitySelected(activity.id) 
                      ? 'border-primary-500 ring-2 ring-primary-200' 
                      : ''
                  }`}
                  onClick={() => handleActivityToggle(activity)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-lg mb-1 flex items-center">
                        <span className="mr-2">{getActivityIconByType(activity.type)}</span> 
                        {activity.name}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize mb-2">{activity.type.replace('_', ' ')}</p>
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(activity.rating) 
                                  ? 'text-amber-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{activity.rating}</span>
                      </div>
                    </div>
                    
                    {!isActivityWeatherSuitable(activity) && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="p-2 bg-amber-100 text-amber-800 rounded-md flex items-center">
                          <FaCloudRain className="mr-1" />
                          <span className="text-xs">Weather alert</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!isActivityWeatherSuitable(activity) && (
                    <div className="mt-3 text-sm text-amber-800 bg-amber-50 p-2 rounded-md">
                      <FaExclamationTriangle className="inline-block mr-1" />
                      Not recommended due to current weather conditions
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Adults Over 50 Activities */}
        {state.travelers.adultsOver50 > 0 && activities.adultsOver50.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaUserTie className="mr-2 text-primary-500" /> Senior-Friendly Activities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.adultsOver50.map(activity => (
                <motion.div
                  key={activity.id}
                  className={`card p-4 cursor-pointer transition-all ${
                    isActivitySelected(activity.id) 
                      ? 'border-primary-500 ring-2 ring-primary-200' 
                      : ''
                  }`}
                  onClick={() => handleActivityToggle(activity)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-lg mb-1 flex items-center">
                        <span className="mr-2">{getActivityIconByType(activity.type)}</span> 
                        {activity.name}
                      </h4>
                      <p className="text-sm text-gray-600 capitalize mb-2">{activity.type.replace('_', ' ')}</p>
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(activity.rating) 
                                  ? 'text-amber-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{activity.rating}</span>
                      </div>
                    </div>
                    
                    {!isActivityWeatherSuitable(activity) && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="p-2 bg-amber-100 text-amber-800 rounded-md flex items-center">
                          <FaCloudRain className="mr-1" />
                          <span className="text-xs">Weather alert</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!isActivityWeatherSuitable(activity) && (
                    <div className="mt-3 text-sm text-amber-800 bg-amber-50 p-2 rounded-md">
                      <FaExclamationTriangle className="inline-block mr-1" />
                      Not recommended due to current weather conditions
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Selected Activities Summary */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-3">Selected Activities: {selectedActivities.length}</h3>
        
        {selectedActivities.length === 0 ? (
          <p className="text-gray-600">No activities selected yet. Click on activities above to add them to your itinerary.</p>
        ) : (
          <ul className="space-y-2">
            {selectedActivities.map(activity => (
              <li key={activity.id} className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm">
                <div className="flex items-center">
                  <span className="mr-2">{getActivityIconByType(activity.type)}</span>
                  <span>{activity.name}</span>
                </div>
                <button 
                  onClick={() => handleActivityToggle(activity)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/plan/details')}
          className="btn btn-secondary"
        >
          Back
        </button>
        
        <button
          onClick={handleContinue}
          className="btn btn-primary"
          disabled={selectedActivities.length === 0}
        >
          Continue
        </button>
      </div>
    </motion.div>
  )
}

export default ActivityPlanner