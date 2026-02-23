"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <h2 className="text-2xl font-light">
        Something went wrong
      </h2>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-black text-white rounded-lg text-sm"
      >
        Try Again
      </button>
    </div>
  );
}
