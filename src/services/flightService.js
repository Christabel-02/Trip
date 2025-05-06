// This is a sample flight search service
// Replace with actual API calls to a flight search API

// The RapidAPI flight search API key provided
const API_KEY = 'c19e4192d3mshb565745ff700304p12fe77jsn7997b0cb64ed';

export async function searchFlights(departureCity, destinationCity, departureDate, returnDate) {
  try {
    // For the demo, we're using mock data
    // In a real application, you would make an API call like:
    /*
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'skyscanner-api.p.rapidapi.com'
      }
    };
    
    const response = await fetch(
      `https://skyscanner-api.p.rapidapi.com/v3e/flights/live/search/create?from=${departureCity}&to=${destinationCity}&departDate=${departureDate}&returnDate=${returnDate}&adults=1&currency=USD`,
      options
    );
    const data = await response.json();
    return processFlightData(data);
    */
    
    // Mock flight data for demonstration
    return getMockFlightData(departureCity, destinationCity, departureDate, returnDate);
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
}

function getMockFlightData(departureCity, destinationCity, departureDate, returnDate) {
  // Generate mock flight data
  const airlines = [
    'Delta Air Lines',
    'American Airlines',
    'United Airlines',
    'Air France',
    'British Airways',
    'Lufthansa',
    'Emirates',
    'Japan Airlines',
    'Singapore Airlines',
    'Qatar Airways'
  ];
  
  const getRandomTime = () => {
    const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const generateFlightNumber = (airline) => {
    const prefix = airline.split(' ')[0].substring(0, 2).toUpperCase();
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}${number}`;
  };
  
  const generateDuration = () => {
    // Generate a duration between 1.5 and 15 hours
    const hours = Math.floor(Math.random() * 13.5) + 1.5;
    const minutes = Math.floor(Math.random() * 60);
    return { hours, minutes };
  };
  
  const generatePrice = () => {
    // Generate a price between $300 and $1500
    return Math.floor(Math.random() * 1200) + 300;
  };
  
  // Generate 5-8 flight options
  const numFlights = Math.floor(Math.random() * 4) + 5;
  const flights = [];
  
  for (let i = 0; i < numFlights; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const duration = generateDuration();
    const departureTime = getRandomTime();
    const price = generatePrice();
    
    // Calculate arrival time (simple implementation)
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    let arrHours = depHours + duration.hours;
    let arrMinutes = depMinutes + duration.minutes;
    
    if (arrMinutes >= 60) {
      arrHours += 1;
      arrMinutes -= 60;
    }
    
    arrHours = arrHours % 24;
    
    const arrivalTime = `${String(arrHours).padStart(2, '0')}:${String(arrMinutes).padStart(2, '0')}`;
    
    // Add possible layovers
    const hasLayover = Math.random() > 0.6; // 40% chance of layover
    const layover = hasLayover ? {
      airport: ['JFK', 'LHR', 'CDG', 'DXB', 'SIN', 'HND'][Math.floor(Math.random() * 6)],
      duration: { hours: Math.floor(Math.random() * 3) + 1, minutes: Math.floor(Math.random() * 60) }
    } : null;
    
    flights.push({
      id: i + 1,
      airline,
      flightNumber: generateFlightNumber(airline),
      departureCity,
      destinationCity,
      departureDate,
      returnDate,
      departureTime,
      arrivalTime,
      duration: {
        hours: duration.hours,
        minutes: duration.minutes
      },
      layover,
      price: price,
      seatsAvailable: Math.floor(Math.random() * 50) + 1,
    });
  }
  
  // Sort by price
  flights.sort((a, b) => a.price - b.price);
  
  return flights;
}

export function formatDuration(duration) {
  if (!duration) return '';
  return `${duration.hours}h ${duration.minutes}m`;
}

export function formatPrice(price) {
  return `$${price}`;
}