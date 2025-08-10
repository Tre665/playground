import { SearchInput } from '@/components/search-input';
import { SimpleWeatherWidget } from '@/components/simple-weather-widget';
import { Location } from '@/types/location';
import http from '@/utils/axios-config';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import debounce from 'lodash.debounce';
import { SearchResultLocation } from '@/components/search-result-location';
import { WeatherWidgetData } from '@/types/weather-widget';

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

  const {
    data = [],
    error,
    isLoading,
    mutate,
  } = useSWR('/widgets', widgetFetcher);
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

  const onLocationAddSelected = async (location: Location) => {
    try {
      const _response = await http.post<WeatherWidgetData>('/widgets', {
        location,
      });

      await mutate();
    } catch (err) {
      console.error('failed to create widget', err);
    }
  };

  const onWidgetRemove = async (id: string) => {
    try {
      const _response = await http.delete<void>(`/widgets/${id}`);
      await mutate();
    } catch (err) {
      console.error('failed to delete widget', err);
    }
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
    return <p>Error:{JSON.stringify(error)}</p>;
  }

  return (
    <>
      <header className="mb-3 flex flex-wrap items-center justify-between border-b border-gray-300 bg-sky-700 px-4 py-3 text-white">
        <h1 className="hidden text-xl font-semibold sm:mr-4 sm:block">
          Weather App
        </h1>

        <div className="w-full sm:max-w-md sm:flex-1">
          <SearchInput queryChanged={onQueryChange} results={locationData}>
            {(location) => (
              <SearchResultLocation
                location={location}
                onSelect={onLocationAddSelected}
              />
            )}
          </SearchInput>
        </div>
      </header>

      <ul className="container grid list-none gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((item) => (
          <li key={item._id} onClick={() => onWidgetRemove(item._id)}>
            <SimpleWeatherWidget
              location={item.location.name}
              temperature={item.weatherData?.temperature}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
