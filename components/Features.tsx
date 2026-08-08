const features = [
  {
    title: "Global Reach",
    desc: "Unparalleled international presence with networks across 190 countries, ensuring you're always connected to wealth opportunities.",
    svg: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  },
  {
    title: "Secure Legacy",
    desc: "Built on a heritage of trust. Our gold-standard encryption keeps your assets safe and your future secure.",
    svg: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 1zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
  },
  {
    title: "Digital Innovation",
    desc: "Future-forward financial tools that streamline your asset management with unmatched speed, clarity, and intelligence.",
    svg: <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white px-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-rbc-blue mb-2">Our Core Pillars</h2>
          <div className="w-16 h-1 bg-rbc-gold mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 max-w-lg mx-auto">Driving the future of global finance through stability, security, and technology.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div key={i} className="group bg-white p-10 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-rbc-blue/20 flex flex-col items-start text-left">
              <div className="bg-rbc-blue/5 rounded-xl p-4 text-rbc-blue mb-6 group-hover:bg-rbc-blue group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  {item.svg}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-rbc-blue mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
