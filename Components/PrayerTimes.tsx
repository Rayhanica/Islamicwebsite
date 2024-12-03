import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the expected structure of the API response
interface PrayerTimesResponse {
  data: {
    timings: {
      [key: string]: string; // The timings will be an object with string keys and string values (like "Fajr": "5:00 AM")
    };
  };
}

const PrayerTimes = () => {
  // Use a more specific type for `timings`
  const [timings, setTimings] = useState<{ [key: string]: string }>({});
  const [location, setLocation] = useState<{ city: string; country: string }>({ city: 'Mecca', country: 'Saudi Arabia' });

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const response = await axios.get<PrayerTimesResponse>('https://api.aladhan.com/v1/timingsByCity', {
          params: { city: location.city, country: location.country, method: 2 },
        });

        // Now TypeScript knows `response.data` is of type `PrayerTimesResponse`
        setTimings(response.data.data.timings);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    fetchTimings();
  }, [location]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-2">Prayer Times</h1>
      {Object.entries(timings).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span>{key}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default PrayerTimes;

