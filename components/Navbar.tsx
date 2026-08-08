import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-rbc-blue fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="relative w-36 h-12">
          <Image src="/logo.png" alt="RBC" fill className="object-contain" priority />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-white text-sm tracking-wide">
          <a href="#" className="hover:text-rbc-gold transition-colors font-medium">Personal</a>
          <a href="#" className="hover:text-rbc-gold transition-colors font-medium">Business</a>
          <a href="#" className="hover:text-rbc-gold transition-colors font-medium">Wealth</a>
          <a href="#" className="bg-rbc-gold text-rbc-blue px-6 py-2.5 rounded-full font-bold hover:bg-rbc-goldlight transition-colors shadow-lg">Open Account</a>
        </nav>
      </div>
    </header>
  );
}
