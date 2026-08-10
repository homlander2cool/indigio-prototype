export default function Hero(){
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0" style={{background: 'linear-gradient(90deg, rgba(11,86,166,0.85), rgba(11,86,166,0.65))'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-28 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Global Wealth, Reimagined.</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/85">Connecting you to over 190 countries. Secure, innovative solutions built for the future of global finance.</p>
        <div className="mt-8 flex gap-4">
          <a className="btn-primary" href="#">Start Your Journey</a>
          <a className="btn-ghost text-white/90" href="#">Explore Solutions</a>
        </div>
      </div>

      <style jsx>{`
        .btn-primary{ background: var(--brand-gold); color: var(--brand-dark); padding: 12px 24px; border-radius: 999px; font-weight:600; box-shadow:0 10px 30px rgba(11,86,166,0.12); }
        .btn-ghost{ background: rgba(255,255,255,0.08); padding: 12px 24px; border-radius: 999px; border:1px solid rgba(255,255,255,0.12); }
      `}</style>
    </section>
  )
}
