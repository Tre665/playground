import { JSX } from 'react';

interface SearchInputProps<T> {
  results?: T[];
  queryChanged: (query: string) => void;
  children: (result: T) => JSX.Element;
}

export function SearchInput<T>({
  results = [],
  queryChanged,
  children,
}: SearchInputProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    queryChanged(event.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for a city"
        onChange={handleChange}
        className="w-full rounded border border-gray-300 px-3 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
      />
      {results?.length > 0 && (
        <ul className="absolute right-0 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded border border-gray-300 bg-white shadow-lg">
          {results?.map((result, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100"
            >
              {children(result)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
