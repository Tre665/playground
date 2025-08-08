import { SimpleWeatherWidget } from '@/components/simple-weather-widget';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface WeatherWidgetData {
  location: string;
  temperature?: number;
}

export default function Page() {
  const [data, setData] = useState<WeatherWidgetData[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('http://localhost:5000/widgets');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <Link href="/">Home</Link>
      <ul className="container grid list-none gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((item) => (
          <li key={item.location}>
            <SimpleWeatherWidget {...item} />
          </li>
        ))}
      </ul>
    </>
  );
}
