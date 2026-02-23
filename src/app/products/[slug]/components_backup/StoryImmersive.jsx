export default function StoryImmersive({ details }) {
  if (!details?.luxury_story) return null;

  return (
    <section className="py-40 text-center max-w-5xl mx-auto">
      <h2 className="text-4xl font-light mb-12">
        A Story Woven in Gold
      </h2>

      <p className="text-lg text-gray-600 leading-loose">
        {details.luxury_story}
      </p>
    </section>
  );
}
