import { createContext, useContext, useReducer, useEffect } from 'react'

const TripContext = createContext()

const initialState = {
  destination: '',
  departureCity: '',
  startDate: '',
  endDate: '',
  numDays: 0,
  travelers: {
    kids: 0,
    adultsUnder50: 0,
    adultsOver50: 0,
  },
  needsMedicalAssistance: false,
  activities: [],
  weatherData: null,
  betterTravelTimes: [],
  flights: [],
  currentStep: 1,
  completedSteps: [],
}

function tripReducer(state, action) {
  switch (action.type) {
    case 'SET_TRIP_DETAILS':
      return { ...state, ...action.payload }
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.payload }
    case 'SET_WEATHER_DATA':
      return { ...state, weatherData: action.payload }
    case 'SET_BETTER_TRAVEL_TIMES':
      return { ...state, betterTravelTimes: action.payload }
    case 'SET_FLIGHTS':
      return { ...state, flights: action.payload }
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload }
    case 'COMPLETE_STEP':
      return { 
        ...state, 
        completedSteps: [...state.completedSteps, action.payload].filter((v, i, a) => a.indexOf(v) === i) 
      }
    case 'RESET_TRIP':
      return initialState
    default:
      return state
  }
}

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, initialState)

  // Load from localStorage on initial render
  useEffect(() => {
    const savedTrip = localStorage.getItem('tripnest-trip')
    if (savedTrip) {
      try {
        const parsedTrip = JSON.parse(savedTrip)
        dispatch({ type: 'SET_TRIP_DETAILS', payload: parsedTrip })
      } catch (error) {
        console.error('Failed to parse saved trip data:', error)
      }
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('tripnest-trip', JSON.stringify(state))
  }, [state])

  return (
    <TripContext.Provider value={{ state, dispatch }}>
      {children}
    </TripContext.Provider>
  )
}

export function useTrip() {
  const context = useContext(TripContext)
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider')
  }
  return context
}