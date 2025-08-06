import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1 className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
        Weather App
      </h1>
      <Link href="/dashboard">Dashboard</Link>
    </>
  );
}
