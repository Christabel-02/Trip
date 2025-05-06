import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-primary-500 text-2xl mr-2" />
              <span className="font-bold text-xl text-white">Trip<span className="text-primary-500">Nest</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Creating personalized travel experiences with weather-aware, age-suitable activities and optimal travel recommendations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/plan/details" className="text-gray-400 hover:text-white transition-colors">Plan a Trip</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-4">Features</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Personalized Planning</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Weather Forecasts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Age-Appropriate Activities</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Flight Search</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for travel tips and exclusive deals.</p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow px-3 py-2 rounded-l-md text-gray-900 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {currentYear} TripNest. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer