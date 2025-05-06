import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPlane, FaSearch, FaExclamationCircle, FaRegClock, FaRegCalendar, FaMapMarkerAlt } from 'react-icons/fa'
import { useTrip } from '../../context/TripContext'
import { searchFlights, formatDuration, formatPrice } from '../../services/flightService'

const FlightSearch = () => {
  const { state, dispatch } = useTrip()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [flights, setFlights] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [sortBy, setSortBy] = useState('price') // 'price', 'duration', 'departureTime'
  
  useEffect(() => {
    // Redirect to first step if no destination is set
    if (!state.destination) {
      navigate('/plan/details')
      return
    }
    
    // Load flights
    const loadFlights = async () => {
      try {
        setLoading(true)
        
        // Search for flights
        const flightResults = await searchFlights(
          state.departureCity,
          state.destination,
          state.startDate,
          state.endDate
        )
        
        setFlights(flightResults)
        
        // If flights were previously selected in the context, select them again
        if (state.flights && state.flights.length > 0) {
          setSelectedFlight(state.flights[0])
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error searching flights:', error)
        setLoading(false)
      }
    }
    
    loadFlights()
  }, [state.departureCity, state.destination, state.startDate, state.endDate, state.flights, navigate])
  
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight)
  }
  
  const handleContinue = () => {
    // Save selected flight to context
    if (selectedFlight) {
      dispatch({ type: 'SET_FLIGHTS', payload: [selectedFlight] })
    }
    
    // Mark this step as completed
    dispatch({ type: 'COMPLETE_STEP', payload: 4 })
    
    // Navigate to next step
    navigate('/plan/itinerary')
  }
  
  const getSortedFlights = () => {
    if (!flights || flights.length === 0) return []
    
    // Create a copy of the flights array
    const sortedFlights = [...flights]
    
    // Sort based on the selected criteria
    switch (sortBy) {
      case 'price':
        return sortedFlights.sort((a, b) => a.price - b.price)
      case 'duration':
        return sortedFlights.sort((a, b) => {
          const aDuration = a.duration.hours * 60 + a.duration.minutes
          const bDuration = b.duration.hours * 60 + b.duration.minutes
          return aDuration - bDuration
        })
      case 'departureTime':
        return sortedFlights.sort((a, b) => {
          const aTime = a.departureTime.replace(':', '')
          const bTime = b.departureTime.replace(':', '')
          return aTime - bTime
        })
      default:
        return sortedFlights
    }
  }
  
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mb-4"></div>
        <p className="text-gray-600">Searching for the best flight deals...</p>
      </div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-2">Find Flights</h2>
      
      <div className="mb-6">
        <p className="text-lg">
          We've found some flight options for your trip to {state.destination.split(',')[0]}.
        </p>
      </div>
      
      {/* Search Summary */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1 flex items-center">
              <FaMapMarkerAlt className="mr-1 text-primary-500" /> Route
            </p>
            <p className="font-medium">
              {state.departureCity.split(',')[0]} to {state.destination.split(',')[0]}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1 flex items-center">
              <FaRegCalendar className="mr-1 text-primary-500" /> Departure
            </p>
            <p className="font-medium">
              {new Date(state.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1 flex items-center">
              <FaRegCalendar className="mr-1 text-primary-500" /> Return
            </p>
            <p className="font-medium">
              {new Date(state.endDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
      
      {/* Flight Sorting */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-gray-700 font-medium">Sort by:</span>
        <button 
          className={`px-3 py-1 rounded-md text-sm ${
            sortBy === 'price' 
              ? 'bg-primary-100 text-primary-700 font-medium' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setSortBy('price')}
        >
          Price
        </button>
        <button 
          className={`px-3 py-1 rounded-md text-sm ${
            sortBy === 'duration' 
              ? 'bg-primary-100 text-primary-700 font-medium' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setSortBy('duration')}
        >
          Duration
        </button>
        <button 
          className={`px-3 py-1 rounded-md text-sm ${
            sortBy === 'departureTime' 
              ? 'bg-primary-100 text-primary-700 font-medium' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setSortBy('departureTime')}
        >
          Departure Time
        </button>
      </div>
      
      {/* Flight Results */}
      <div className="mb-8">
        {flights.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <FaExclamationCircle className="text-4xl text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No Flights Found</h3>
            <p className="text-gray-600">
              We couldn't find any flights matching your criteria. Try adjusting your dates or locations.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {getSortedFlights().map((flight) => (
              <motion.div
                key={flight.id}
                className={`p-4 bg-white rounded-lg border ${
                  selectedFlight && selectedFlight.id === flight.id
                    ? 'border-primary-500 ring-1 ring-primary-200'
                    : 'border-gray-200'
                } shadow-sm transition-all hover:shadow-md cursor-pointer`}
                onClick={() => handleSelectFlight(flight)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <FaPlane className="text-primary-500 mr-2" />
                      <span className="font-medium">{flight.airline}</span>
                      <span className="text-sm text-gray-500 ml-2">{flight.flightNumber}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="text-center">
                        <p className="font-bold text-lg">{flight.departureTime}</p>
                        <p className="text-sm text-gray-500">{state.departureCity.split(',')[0]}</p>
                      </div>
                      
                      <div className="mx-3 flex flex-col items-center">
                        <div className="text-xs text-gray-500 mb-1">
                          {formatDuration(flight.duration)}
                        </div>
                        <div className="w-20 h-px bg-gray-300 relative">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary-500 rounded-full"></div>
                        </div>
                        {flight.layover && (
                          <div className="text-xs text-amber-600 mt-1">
                            {flight.layover.airport} stop
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <p className="font-bold text-lg">{flight.arrivalTime}</p>
                        <p className="text-sm text-gray-500">{state.destination.split(',')[0]}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end">
                    <div className="font-bold text-xl text-primary-700 mb-1">
                      {formatPrice(flight.price)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaRegClock className="mr-1" />
                      <span>{flight.seatsAvailable} seats left</span>
                    </div>
                  </div>
                </div>
                
                {/* Flight Details (expandable in a real application) */}
                {selectedFlight && selectedFlight.id === flight.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Flight Details</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>
                            <span className="inline-block w-32 text-gray-500">Departure:</span>
                            {new Date(flight.departureDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })} at {flight.departureTime}
                          </li>
                          <li>
                            <span className="inline-block w-32 text-gray-500">Arrival:</span>
                            {new Date(flight.departureDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })} at {flight.arrivalTime}
                          </li>
                          <li>
                            <span className="inline-block w-32 text-gray-500">Duration:</span>
                            {formatDuration(flight.duration)}
                          </li>
                        </ul>
                      </div>
                      
                      {flight.layover && (
                        <div>
                          <h4 className="font-medium mb-2">Layover</h4>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li>
                              <span className="inline-block w-32 text-gray-500">Airport:</span>
                              {flight.layover.airport}
                            </li>
                            <li>
                              <span className="inline-block w-32 text-gray-500">Duration:</span>
                              {formatDuration(flight.layover.duration)}
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button className="bg-primary-50 text-primary-600 font-medium px-4 py-2 rounded-md hover:bg-primary-100 transition-colors">
                        Select This Flight
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/plan/travel-time')}
          className="btn btn-secondary"
        >
          Back
        </button>
        
        <button
          onClick={handleContinue}
          className="btn btn-primary"
          disabled={!selectedFlight}
        >
          Continue to Itinerary
        </button>
      </div>
    </motion.div>
  )
}

export default FlightSearch