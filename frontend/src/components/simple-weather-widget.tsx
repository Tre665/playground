interface SimpleWeatherWidgetProps {
  location: string;
  temperature?: number;
}

/**
 * Renders the given temperature for a given location.
 */
export function SimpleWeatherWidget({
  location = '-',
  temperature,
}: SimpleWeatherWidgetProps) {
  return (
    <section className="flex w-full justify-between gap-4 overflow-hidden rounded-lg bg-sky-700 p-4 text-zinc-100 shadow-md">
      <p className="shrink grow-0 truncate text-lg font-semibold">{location}</p>

      <p className="shrink-0 text-3xl font-bold">
        {temperature !== undefined ? temperature.toFixed(1) : '-'}°C
      </p>
    </section>
  );
}
