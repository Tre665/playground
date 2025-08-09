import { SearchInput } from '@/components/search-input';
import { SimpleWeatherWidget } from '@/components/simple-weather-widget';
import http from '@/utils/axios-config';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import debounce from 'lodash.debounce';

interface WeatherWidgetData {
  location: string;
  temperature?: number;
}

interface Location {
  name: string;
  fullName: string;
  lat: number;
  lon: number;
}

const widgetFetcher = async (url: string) => {
  const res = await http.get<WeatherWidgetData[]>(url);
  return res.data;
};

const locationsFetcher = async (url: string) => {
  const res = await http.get<Location[]>(url);
  return res.data;
};

const MINIMUM_QUERY_LENGTH = 3;

export default function Page() {
  const [query, setQuery] = useState('');

  const { data = [], error, isLoading } = useSWR('/widgets', widgetFetcher);
  const { data: locationData = [] } = useSWR(
    query?.length >= MINIMUM_QUERY_LENGTH ? `/locations?query=${query}` : null,
    locationsFetcher,
  );

  const debouncedQueryChange = useRef(
    debounce((value: string) => {
      const trimmed = value.trim();
      setQuery(trimmed);
      console.log('query changed', trimmed);
    }, 300),
  );

  const onQueryChange = (value: string) => {
    debouncedQueryChange.current(value);
  };

  // clean up on destroy / unmount
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      debouncedQueryChange.current.cancel();
    };
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <header className="mb-3 flex flex-wrap items-center justify-between border-b border-gray-300 bg-sky-700 px-4 py-3 text-white">
        <h1 className="hidden text-xl font-semibold sm:mr-4 sm:block">
          Weather App
        </h1>

        <div className="w-full sm:max-w-md sm:flex-1">
          <SearchInput queryChanged={onQueryChange} results={locationData}>
            {(location) => <p>{location.fullName}</p>}
          </SearchInput>
        </div>
      </header>

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
