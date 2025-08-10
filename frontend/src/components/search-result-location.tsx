import { Location } from '@/types/location';

interface SearchResultProps {
  location: Location;
  onSelect?: (location: Location) => void;
}

export function SearchResultLocation({
  location,
  onSelect,
}: SearchResultProps) {
  const handleSelect = () => {
    onSelect?.(location);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <p className="truncate text-lg">{location.fullName}</p>
      <button
        className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
        onClick={handleSelect}
      >
        Add
      </button>
    </div>
  );
}
