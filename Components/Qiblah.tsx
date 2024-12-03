import { useState } from 'react';
import axios from 'axios';

const Qiblah = () => {
  const [direction, setDirection] = useState<number | null>(null);

  const fetchQiblah = async () => {
    const response = await axios.get('https://api.aladhan.com/v1/qibla', {
      params: { latitude: 21.3891, longitude: 39.8579 },
    });
    setDirection(response.data.data.direction);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-2">Qiblah Direction</h1>
      <button
        onClick={fetchQiblah}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Get Qiblah Direction
      </button>
      {direction && <p className="mt-4">Direction: {direction}°</p>}
    </div>
  );
};

export default Qiblah;
