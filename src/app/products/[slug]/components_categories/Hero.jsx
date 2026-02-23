export default function Hero({ category }) {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white">

      <img
        src={category.hero_image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-light tracking-wide">
          {category.name}
        </h1>
        <p className="uppercase tracking-widest text-sm">
          Crafted for Timeless Elegance
        </p>
      </div>
    </section>
  );
}
