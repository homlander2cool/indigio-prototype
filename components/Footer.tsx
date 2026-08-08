export default function Footer() {
  return (
    <footer className="bg-rbc-dark text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h4 className="text-rbc-gold font-bold text-lg mb-4">RBC</h4>
          <p className="text-gray-300 font-light text-sm leading-relaxed max-w-xs">
            Global banking powered by innovation, secured by a century of trust and heritage.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-md mb-4 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-3 text-sm text-gray-300 font-light">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Investor Relations</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-md mb-4 uppercase tracking-wider text-sm">Products</h4>
          <ul className="space-y-3 text-sm text-gray-300 font-light">
            <li><a href="#" className="hover:text-white transition-colors">Digital Banking</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Wealth Mgmt</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Corporate Lending</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-md mb-4 uppercase tracking-wider text-sm">Support</h4>
          <ul className="space-y-3 text-sm text-gray-300 font-light">
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <span>&copy; 2026 RBC Global Financial. All rights reserved.</span>
        <span className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </span>
      </div>
    </footer>
  );
}
