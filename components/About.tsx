const aboutContent = {
  headline: "A Symbol of Strength",
  subheadline: "and Unwavering Trust",
  paragraph1: "For generations, the lion has represented courage, while the globe symbolizes our boundless global ambition. We combine this rich heritage with cutting-edge financial engineering.",
  quote: "We don't just manage wealth; we empower legacies that transcend borders.",
  paragraph2: "Whether you are an individual seeking sustained growth, or a multinational corporation navigating complex markets, RBC provides the institutional stability of a legacy bank with the agility of a modern digital partner."
};

export default function About() {
  return (
    <section className="py-24 px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-rbc-blue mb-6 leading-tight">
            {aboutContent.headline} <br />
            <span className="text-rbc-gold">{aboutContent.subheadline}</span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6 font-light">
            {aboutContent.paragraph1}
          </p>
          <div className="bg-white border-l-4 border-rbc-gold p-6 rounded-r-lg mb-6 shadow-md">
            <p className="italic text-gray-900 font-semibold text-lg">“{aboutContent.quote}”</p>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            {aboutContent.paragraph2}
          </p>
        </div>
        
        {/* Premium Image Replacement (No more emoji globe!) */}
        <div className="flex-1 relative w-full h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Global Financial Skyline" 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rbc-blue/90 via-rbc-blue/30 to-transparent mix-blend-multiply"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <p className="font-light text-xs tracking-[0.2em] uppercase opacity-80">Global Network</p>
            <p className="font-bold text-2xl text-rbc-gold">RBC Financial</p>
          </div>
        </div>
      </div>
    </section>
  );
}
