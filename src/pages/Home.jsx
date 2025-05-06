import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaPlane, FaRoute } from 'react-icons/fa'

const featureItems = [
  {
    icon: <FaMapMarkerAlt className="text-4xl text-primary-500 mb-4" />,
    title: 'Destination Discovery',
    description: 'Find perfect destinations based on your preferences and travel style.'
  },
  {
    icon: <FaCalendarAlt className="text-4xl text-primary-500 mb-4" />,
    title: 'Weather-Aware Planning',
    description: 'Get recommendations that account for seasonal weather patterns at your destination.'
  },
  {
    icon: <FaUserFriends className="text-4xl text-primary-500 mb-4" />,
    title: 'Age-Appropriate Activities',
    description: 'Discover activities perfectly suited for everyone in your travel group.'
  },
  {
    icon: <FaPlane className="text-4xl text-primary-500 mb-4" />,
    title: 'Flight Search',
    description: 'Find the best flight deals to your dream destination with ease.'
  },
  {
    icon: <FaRoute className="text-4xl text-primary-500 mb-4" />,
    title: 'Complete Itineraries',
    description: 'Generate day-by-day plans that maximize your travel experience.'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-primary-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
                Your Dream Trip, <br />
                <span className="text-accent-200">Perfectly Planned</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
                Discover personalized travel experiences with weather-aware, age-suitable activities and optimal travel recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/plan/details" 
                  className="btn bg-white text-primary-600 hover:bg-blue-50 px-8 py-3 rounded-md font-medium text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Start Planning
                </Link>
                <a 
                  href="#how-it-works" 
                  className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium text-lg transition-all"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/7412069/pexels-photo-7412069.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Travel planning" 
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How TripNest Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our intelligent 5-step process creates your perfect travel plan in minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                number: '1',
                title: 'Trip Details',
                description: 'Tell us where you want to go, when, and who\'s traveling with you.',
                icon: '📝',
              },
              {
                number: '2',
                title: 'Activity Planner',
                description: 'Get age-appropriate activity suggestions based on real-time weather.',
                icon: '🌦️',
              },
              {
                number: '3',
                title: 'Travel Time',
                description: 'Discover the best times to visit based on weather and cultural events.',
                icon: '📅',
              },
              {
                number: '4',
                title: 'Flight Search',
                description: 'Find the best flight deals to your destination.',
                icon: '✈️',
              },
              {
                number: '5',
                title: 'Itinerary',
                description: 'Get your complete day-by-day travel plan ready to download.',
                icon: '📲',
              },
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 flex items-center justify-center bg-primary-100 text-primary-600 text-xl font-bold rounded-full mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="text-4xl mt-4">{step.icon}</div>
                
                {/* Connector line */}
                {index < 4 && (
                  <div className="hidden md:block h-0.5 bg-primary-200 w-full absolute left-1/2 top-1/2 -z-10"></div>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/plan/details" 
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to plan the perfect trip for everyone in your group.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featureItems.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                variants={itemVariants}
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Travelers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from travelers who have used TripNest to plan their perfect vacation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "TripNest saved our family vacation! The age-specific activities kept everyone happy, and the weather warnings helped us avoid rain on our beach day.",
                author: "Sarah J.",
                location: "Family trip to Hawaii",
                avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
              },
              {
                quote: "As seniors, we were concerned about finding suitable activities. TripNest recommended perfect options for us, including accessibility information.",
                author: "Robert & Mary T.",
                location: "Anniversary trip to London",
                avatar: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=150"
              },
              {
                quote: "The flight search saved me over $300! And the flexible date recommendation helped me book during a festival I didn't know about.",
                author: "James L.",
                location: "Solo trip to Tokyo",
                avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
              },
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6 flex-grow">
                    <svg className="h-8 w-8 text-primary-400 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-600 italic mb-3">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Dream Trip?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Start your journey today with TripNest and create memories that will last a lifetime.
          </p>
          <Link 
            to="/plan/details" 
            className="btn bg-white text-primary-600 hover:bg-blue-50 px-8 py-3 rounded-md font-medium text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Begin Your Adventure
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home