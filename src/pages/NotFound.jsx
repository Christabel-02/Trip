import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCompass } from 'react-icons/fa'

const NotFound = () => {
  return (
    <motion.div 
      className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FaCompass className="text-primary-500 text-8xl mb-8" />
      
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 text-center">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6 text-center">
        Oops! You've ventured off the map
      </h2>
      
      <p className="text-lg text-gray-600 max-w-lg text-center mb-10">
        The page you're looking for seems to be on an uncharted journey. 
        Let's get you back on track to your travel planning.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/"
          className="btn btn-primary px-8 py-3 text-lg"
        >
          Return Home
        </Link>
        
        <Link 
          to="/plan/details"
          className="btn btn-secondary px-8 py-3 text-lg"
        >
          Plan a Trip
        </Link>
      </div>
    </motion.div>
  )
}

export default NotFound