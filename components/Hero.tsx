const content = {
  title: "Global Wealth, Reimagined.",
  subtitle: "Connecting you to over 190 countries. Secure, innovative, and built for the future of global finance.",
  ctaPrimary: "Start Your Journey",
  ctaSecondary: "Explore Solutions"
};

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#003f7a] via-[#0055A4] to-[#002a52] text-white overflow-hidden min-h-[85vh] flex items-center">
      {/* Premium abstract grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(212,175,55,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full animate-fade-in">
        <div className="max-w-3xl">
          <p className="text-rbc-gold font-medium tracking-[0.2em] uppercase mb-4 text-sm">Private Banking & Wealth</p>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100/80 max-w-2xl mb-10 font-light leading-relaxed">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-rbc-gold hover:bg-rbc-goldlight text-rbc-blue font-bold px-10 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              {content.ctaPrimary}
            </button>
            <button className="border border-white/30 backdrop-blur-sm hover:bg-white/10 text-white px-10 py-4 rounded-full font-semibold transition-all">
              {content.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
