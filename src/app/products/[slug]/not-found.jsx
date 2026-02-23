import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-3xl font-light">Category Not Found</h1>
      <p className="text-gray-500">
        The collection you’re looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-black text-white rounded-lg text-sm"
      >
        Return Home
      </Link>
    </div>
  );
}
