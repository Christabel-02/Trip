// This is a sample weather data service
// Replace this with actual API calls to OpenWeatherMap

const API_KEY = 'OPENWEATHERMAP_API_KEY'; // Replace with actual API key

export async function getWeatherForecast(city) {
  try {
    // For the demo, we're using mock data
    // In a real application, you would make an API call like:
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    // const data = await response.json();
    
    // Mock weather data for demonstration
    return getMockWeatherData(city);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

function getMockWeatherData(city) {
  // Generate some random weather data for the next 5 days
  const today = new Date();
  const forecast = [];
  
  const weatherTypes = [
    { main: 'Clear', description: 'clear sky', icon: '01d' },
    { main: 'Clouds', description: 'few clouds', icon: '02d' },
    { main: 'Clouds', description: 'scattered clouds', icon: '03d' },
    { main: 'Clouds', description: 'broken clouds', icon: '04d' },
    { main: 'Rain', description: 'light rain', icon: '10d' },
    { main: 'Rain', description: 'moderate rain', icon: '10d' },
    { main: 'Thunderstorm', description: 'thunderstorm', icon: '11d' },
  ];
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    const tempMax = Math.floor(Math.random() * 15) + 15; // 15-30°C
    const tempMin = tempMax - Math.floor(Math.random() * 10); // 5-10°C lower
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      weather: {
        main: weather.main,
        description: weather.description,
        icon: weather.icon,
      },
      temp: {
        max: tempMax,
        min: tempMin,
      },
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      wind: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    });
  }
  
  return {
    city: {
      name: city,
      country: 'Demo',
    },
    forecast,
  };
}

export function getWeatherSuitability(weatherMain) {
  // Determine if weather is suitable for outdoor activities
  const unsuitable = ['Thunderstorm', 'Rain', 'Snow', 'Extreme'];
  return !unsuitable.includes(weatherMain);
}

export function getBetterTravelTimes(city) {
  // Mock function to suggest better travel times based on city
  const cityRecommendations = {
    'Tokyo': [
      { month: 'March-April', reason: 'Cherry Blossom season' },
      { month: 'October-November', reason: 'Autumn colors' },
    ],
    'Paris': [
      { month: 'April-June', reason: 'Mild temperatures and fewer tourists' },
      { month: 'September-October', reason: 'Pleasant weather and cultural events' },
    ],
    'New York': [
      { month: 'April-June', reason: 'Spring blooms and comfortable temperatures' },
      { month: 'September-November', reason: 'Fall colors and pleasant weather' },
    ],
    'Sydney': [
      { month: 'September-November', reason: 'Spring season with mild temperatures' },
      { month: 'March-May', reason: 'Autumn with fewer tourists' },
    ],
    'London': [
      { month: 'May-September', reason: 'Warmer months with longer daylight hours' },
      { month: 'December', reason: 'Christmas decorations and festivities' },
    ],
    'Rome': [
      { month: 'April-May', reason: 'Spring weather before summer crowds' },
      { month: 'September-October', reason: 'Comfortable temperatures and fewer tourists' },
    ],
    'Bangkok': [
      { month: 'November-February', reason: 'Cooler and drier season' },
    ],
    'Dubai': [
      { month: 'November-March', reason: 'Pleasant temperatures' },
    ],
  };
  
  // Default recommendations if city not in our list
  const defaultRecommendations = [
    { month: 'April-May', reason: 'Spring season' },
    { month: 'September-October', reason: 'Fall season' },
  ];
  
  // Get city name without country for lookup
  const cityName = city.split(',')[0].trim();
  
  return cityRecommendations[cityName] || defaultRecommendations;
}