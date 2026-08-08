export default function CTA() {
  return (
    <section className="py-20 px-6 bg-rbc-blue relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-rbc-gold"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to build your financial future?</h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">Join thousands of investors and global leaders who trust RBC to secure and grow their assets across borders.</p>
        <button className="bg-white text-rbc-blue px-12 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">Get Started Today</button>
      </div>
    </section>
  );
}
