export default function Button({children, variant='primary'}){
  return (
    <button className={`px-6 py-2 rounded-full font-semibold ${variant==='primary' ? 'bg-[var(--brand-gold)] text-[var(--brand-dark)]' : 'bg-transparent border border-[var(--brand-blue)] text-[var(--brand-dark)]'}`}>
      {children}
    </button>
  )
}
