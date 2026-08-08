import Link from 'next/link';

export default function DealCard({ deal }: { deal: any }) {
  return (
    <article className='bg-white rounded-md p-4 shadow hover:shadow-md transition'>
      <div className='w-full h-40 bg-slate-100 rounded overflow-hidden flex items-center justify-center'>
        <img src={deal.image || '/images/prop1.jpg'} alt={deal.title} className='w-full h-full object-cover' />
      </div>
      <h3 className='mt-3 font-semibold text-lg'>{deal.title}</h3>
      <p className='mt-1 text-sm text-slate-500'>{deal.location}</p>

      <div className='mt-3 flex items-center justify-between'>
        <div>
          <div className='text-xs text-slate-500'>Target IRR</div>
          <div className='font-medium'>{deal.targetIrr}</div>
        </div>
        <Link href={/deals/} className='text-indigo-600 text-sm'>View deal</Link>
      </div>

      <div className='mt-3'>
        <div className='w-full bg-slate-100 rounded-full h-2'>
          <div className='bg-indigo-600 h-2 rounded-full' style={{ width: '30%' }}></div>
        </div>
        <div className='mt-1 text-xs text-slate-500'>Raised: {deal.raised} / {deal.target}</div>
      </div>
    </article>
  );
}
