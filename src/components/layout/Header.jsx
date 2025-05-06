import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <motion.header 
      className={`sticky top-0 z-50 w-full ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <FaMapMarkerAlt className="text-primary-500 text-2xl mr-2" />
          <span className="font-bold text-xl text-gray-900">Trip<span className="text-primary-500">Nest</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary-500 transition-colors">
            Home
          </Link>
          <Link to="/plan/details" className="text-gray-700 hover:text-primary-500 transition-colors">
            Plan a Trip
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary-500 transition-colors">
            About
          </Link>
          <button className="btn btn-primary">
            Sign In
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-primary-500 py-2 transition-colors">
              Home
            </Link>
            <Link to="/plan/details" className="text-gray-700 hover:text-primary-500 py-2 transition-colors">
              Plan a Trip
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-500 py-2 transition-colors">
              About
            </Link>
            <button className="btn btn-primary w-full">
              Sign In
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

export default Header