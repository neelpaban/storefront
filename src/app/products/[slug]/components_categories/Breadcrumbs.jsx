import Link from "next/link";

export default function Breadcrumbs({ category }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500">
      <Link href="/">Home</Link> /{" "}
      <Link href="/categories">Categories</Link> /{" "}
      <span className="text-black">{category.name}</span>
    </div>
  );
}
