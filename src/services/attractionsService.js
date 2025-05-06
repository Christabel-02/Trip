// This is a mock service for attractions
// Replace with actual API calls to OpenTripMap or similar service

// In a real app, you would use your API key
// const API_KEY = 'YOUR_OPENTRIPMAP_API_KEY';

export async function getAttractions(city, ageGroup) {
  try {
    // For the demo, we're using mock data
    // In a real app, you would make API calls like:
    // const geoResponse = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${API_KEY}`);
    // const geoData = await geoResponse.json();
    // const { lat, lon } = geoData;
    // 
    // const radius = 20000; // 20km radius
    // const limit = 15; // number of results
    // const attractionsResponse = await fetch(
    //   `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&limit=${limit}&apikey=${API_KEY}`
    // );
    // const attractionsData = await attractionsResponse.json();
    
    // Mock data for demonstration
    return getMockAttractions(city, ageGroup);
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
}

function getMockAttractions(city, ageGroup) {
  // Mock attractions data based on city and age group
  const cityAttractions = {
    'Tokyo': {
      kids: [
        { id: 1, name: 'Tokyo Disneyland', type: 'amusement_park', rating: 4.8 },
        { id: 2, name: 'Ueno Zoo', type: 'zoo', rating: 4.5 },
        { id: 3, name: 'Ghibli Museum', type: 'museum', rating: 4.9 },
        { id: 4, name: 'KidZania Tokyo', type: 'amusement_park', rating: 4.6 },
        { id: 5, name: 'Tokyo Sea Life Park', type: 'aquarium', rating: 4.4 },
      ],
      adultsUnder50: [
        { id: 6, name: 'Mount Fuji Day Trip', type: 'hiking', rating: 4.9 },
        { id: 7, name: 'Shibuya Crossing', type: 'landmark', rating: 4.7 },
        { id: 8, name: 'Shinjuku Nightlife', type: 'entertainment', rating: 4.8 },
        { id: 9, name: 'Tsukiji Fish Market', type: 'market', rating: 4.6 },
        { id: 10, name: 'Akihabara Electric Town', type: 'shopping', rating: 4.5 },
      ],
      adultsOver50: [
        { id: 11, name: 'Senso-ji Temple', type: 'temple', rating: 4.7 },
        { id: 12, name: 'Tokyo National Museum', type: 'museum', rating: 4.8 },
        { id: 13, name: 'Imperial Palace Gardens', type: 'garden', rating: 4.6 },
        { id: 14, name: 'Meiji Shrine', type: 'shrine', rating: 4.7 },
        { id: 15, name: 'Hamarikyu Gardens', type: 'garden', rating: 4.5 },
      ],
    },
    'Paris': {
      kids: [
        { id: 1, name: 'Disneyland Paris', type: 'amusement_park', rating: 4.7 },
        { id: 2, name: 'Jardin d\'Acclimatation', type: 'amusement_park', rating: 4.5 },
        { id: 3, name: 'Cité des Sciences et de l\'Industrie', type: 'museum', rating: 4.6 },
        { id: 4, name: 'Aquarium de Paris', type: 'aquarium', rating: 4.4 },
        { id: 5, name: 'Parc Astérix', type: 'amusement_park', rating: 4.6 },
      ],
      adultsUnder50: [
        { id: 6, name: 'Eiffel Tower', type: 'landmark', rating: 4.8 },
        { id: 7, name: 'Louvre Museum', type: 'museum', rating: 4.9 },
        { id: 8, name: 'Seine River Cruise', type: 'tour', rating: 4.7 },
        { id: 9, name: 'Montmartre', type: 'neighborhood', rating: 4.7 },
        { id: 10, name: 'Catacombs of Paris', type: 'historical_site', rating: 4.6 },
      ],
      adultsOver50: [
        { id: 11, name: 'Notre-Dame Cathedral', type: 'cathedral', rating: 4.8 },
        { id: 12, name: 'Musée d\'Orsay', type: 'museum', rating: 4.9 },
        { id: 13, name: 'Luxembourg Gardens', type: 'garden', rating: 4.7 },
        { id: 14, name: 'Sainte-Chapelle', type: 'cathedral', rating: 4.8 },
        { id: 15, name: 'Panthéon', type: 'historical_site', rating: 4.6 },
      ],
    },
    // Add more cities as needed
  };

  // Default attractions if city not found
  const defaultAttractions = {
    kids: [
      { id: 1, name: 'Local Zoo', type: 'zoo', rating: 4.5 },
      { id: 2, name: 'Children\'s Museum', type: 'museum', rating: 4.6 },
      { id: 3, name: 'Water Park', type: 'amusement_park', rating: 4.7 },
      { id: 4, name: 'Science Center', type: 'museum', rating: 4.5 },
      { id: 5, name: 'Aquarium', type: 'aquarium', rating: 4.4 },
    ],
    adultsUnder50: [
      { id: 6, name: 'Hiking Trail', type: 'hiking', rating: 4.6 },
      { id: 7, name: 'Local Markets', type: 'market', rating: 4.5 },
      { id: 8, name: 'Adventure Sports', type: 'adventure', rating: 4.7 },
      { id: 9, name: 'Nightlife District', type: 'entertainment', rating: 4.6 },
      { id: 10, name: 'Shopping Center', type: 'shopping', rating: 4.4 },
    ],
    adultsOver50: [
      { id: 11, name: 'Historical Museum', type: 'museum', rating: 4.7 },
      { id: 12, name: 'Botanical Garden', type: 'garden', rating: 4.6 },
      { id: 13, name: 'Cultural Center', type: 'cultural', rating: 4.5 },
      { id: 14, name: 'Art Gallery', type: 'museum', rating: 4.6 },
      { id: 15, name: 'Historical Site', type: 'historical_site', rating: 4.7 },
    ],
  };

  // Get city name without country for lookup
  const cityName = city.split(',')[0].trim();
  
  // Get attractions for the specified city or use default if not found
  const attractions = cityAttractions[cityName] || defaultAttractions;
  
  // Return attractions for the specified age group
  return attractions[ageGroup] || [];
}

export function getActivityIconByType(type) {
  const iconMap = {
    'amusement_park': '🎠',
    'zoo': '🦁',
    'aquarium': '🐠',
    'museum': '🏛️',
    'landmark': '🗿',
    'hiking': '🥾',
    'tour': '🚶',
    'entertainment': '🎭',
    'market': '🛒',
    'shopping': '🛍️',
    'temple': '🛕',
    'shrine': '⛩️',
    'garden': '🌳',
    'historical_site': '🏰',
    'cathedral': '⛪',
    'neighborhood': '🏘️',
    'adventure': '🧗',
    'cultural': '🎭'
  };
  
  return iconMap[type] || '📍';
}