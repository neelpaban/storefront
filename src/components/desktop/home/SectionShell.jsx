export default function SectionShell({
  children,
  minHeight = "280px",
}) {
  return (
    <section className="w-full py-12" style={{ minHeight }}>
      {children}
    </section>
  );
}