import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTrip } from '../../context/TripContext'
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMedkit } from 'react-icons/fa'

const TripDetails = () => {
  const { state, dispatch } = useTrip()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    destination: state.destination || '',
    departureCity: state.departureCity || '',
    startDate: state.startDate || '',
    endDate: state.endDate || '',
    kids: state.travelers?.kids || 0,
    adultsUnder50: state.travelers?.adultsUnder50 || 0,
    adultsOver50: state.travelers?.adultsOver50 || 0,
    needsMedicalAssistance: state.needsMedicalAssistance || false,
  })
  
  const [errors, setErrors] = useState({})

  // Calculate trip days whenever start/end dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      
      setFormData(prev => ({
        ...prev,
        numDays: diffDays
      }))
    }
  }, [formData.startDate, formData.endDate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required'
    }
    
    if (!formData.departureCity.trim()) {
      newErrors.departureCity = 'Departure city is required'
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
    
    if (formData.kids === 0 && formData.adultsUnder50 === 0 && formData.adultsOver50 === 0) {
      newErrors.travelers = 'At least one traveler is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Calculate trip duration
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      
      // Update trip context
      dispatch({
        type: 'SET_TRIP_DETAILS',
        payload: {
          destination: formData.destination,
          departureCity: formData.departureCity,
          startDate: formData.startDate,
          endDate: formData.endDate,
          numDays: diffDays,
          travelers: {
            kids: parseInt(formData.kids) || 0,
            adultsUnder50: parseInt(formData.adultsUnder50) || 0,
            adultsOver50: parseInt(formData.adultsOver50) || 0,
          },
          needsMedicalAssistance: formData.needsMedicalAssistance,
        }
      })
      
      // Mark this step as completed
      dispatch({ type: 'COMPLETE_STEP', payload: 1 })
      
      // Navigate to next step
      navigate('/plan/activities')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Tell us about your trip</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Destination */}
          <div>
            <label htmlFor="destination" className="form-label flex items-center">
              <FaMapMarkerAlt className="mr-2 text-primary-500" /> Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Tokyo, Japan"
              className={`form-input ${errors.destination ? 'border-red-300' : ''}`}
            />
            {errors.destination && (
              <p className="form-error">{errors.destination}</p>
            )}
          </div>
          
          {/* Departure City */}
          <div>
            <label htmlFor="departureCity" className="form-label flex items-center">
              <FaMapMarkerAlt className="mr-2 text-primary-500" /> Departure City
            </label>
            <input
              type="text"
              id="departureCity"
              name="departureCity"
              value={formData.departureCity}
              onChange={handleChange}
              placeholder="e.g., New York, USA"
              className={`form-input ${errors.departureCity ? 'border-red-300' : ''}`}
            />
            {errors.departureCity && (
              <p className="form-error">{errors.departureCity}</p>
            )}
          </div>
          
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="form-label flex items-center">
              <FaCalendarAlt className="mr-2 text-primary-500" /> Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`form-input ${errors.startDate ? 'border-red-300' : ''}`}
            />
            {errors.startDate && (
              <p className="form-error">{errors.startDate}</p>
            )}
          </div>
          
          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="form-label flex items-center">
              <FaCalendarAlt className="mr-2 text-primary-500" /> End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || new Date().toISOString().split('T')[0]}
              className={`form-input ${errors.endDate ? 'border-red-300' : ''}`}
            />
            {errors.endDate && (
              <p className="form-error">{errors.endDate}</p>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <FaUsers className="mr-2 text-primary-500" /> Who's traveling?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="kids" className="form-label">Children (0-17)</label>
              <input
                type="number"
                id="kids"
                name="kids"
                value={formData.kids}
                onChange={handleChange}
                min="0"
                className="form-input"
              />
            </div>
            
            <div>
              <label htmlFor="adultsUnder50" className="form-label">Adults (18-50)</label>
              <input
                type="number"
                id="adultsUnder50"
                name="adultsUnder50"
                value={formData.adultsUnder50}
                onChange={handleChange}
                min="0"
                className="form-input"
              />
            </div>
            
            <div>
              <label htmlFor="adultsOver50" className="form-label">Adults (50+)</label>
              <input
                type="number"
                id="adultsOver50"
                name="adultsOver50"
                value={formData.adultsOver50}
                onChange={handleChange}
                min="0"
                className="form-input"
              />
            </div>
          </div>
          
          {errors.travelers && (
            <p className="form-error mt-2">{errors.travelers}</p>
          )}
        </div>
        
        <div className="mb-8">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="needsMedicalAssistance"
                name="needsMedicalAssistance"
                checked={formData.needsMedicalAssistance}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="needsMedicalAssistance" className="font-medium text-gray-700 flex items-center">
                <FaMedkit className="mr-2 text-primary-500" /> Medical assistance may be needed
              </label>
              <p className="text-gray-500">We'll keep this in mind when suggesting activities</p>
            </div>
          </div>
        </div>
        
        {(formData.startDate && formData.endDate && new Date(formData.startDate) <= new Date(formData.endDate)) && (
          <div className="mb-8 p-4 bg-blue-50 rounded-md border border-blue-100">
            <p className="text-blue-800 font-medium">
              Trip length: {formData.numDays} {formData.numDays === 1 ? 'day' : 'days'}
            </p>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary px-8 py-3"
          >
            Continue to Activities
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default TripDetails