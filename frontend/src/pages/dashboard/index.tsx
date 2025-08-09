import { SimpleWeatherWidget } from '@/components/simple-weather-widget';
import http from '@/utils/axios-config';
import Link from 'next/link';
import useSWR from 'swr';

interface WeatherWidgetData {
  location: string;
  temperature?: number;
}

const widgetFetcher = async (url: string) => {
  const res = await http.get<WeatherWidgetData[]>(url);
  return res.data;
};

export default function Page() {
  const { data = [], error, isLoading } = useSWR('/widgets', widgetFetcher);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
