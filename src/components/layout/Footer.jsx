export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-sm text-gray-600">

        <div>
          <h4 className="text-black mb-4">Trinkets</h4>
          <p className="leading-relaxed">
            Thoughtfully crafted jewellery designed
            to stay with you for years to come.
          </p>
        </div>

        <div>
          <h4 className="text-black mb-4">Explore</h4>
          <ul className="space-y-2">
            <li>Shop</li>
            <li>Collections</li>
            <li>Craft</li>
          </ul>
        </div>

        <div>
          <h4 className="text-black mb-4">Support</h4>
          <ul className="space-y-2">
            <li>Care Guide</li>
            <li>Returns</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-black mb-4">Trust</h4>
          <ul className="space-y-2">
            <li>Certified Materials</li>
            <li>Ethical Sourcing</li>
            <li>Secure Payments</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-xs text-gray-400 pb-6">
        © {new Date().getFullYear()} Trinkets Jewellery
      </div>
    </footer>
  );
}
