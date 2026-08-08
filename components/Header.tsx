import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center gap-4'>
            <Link href='/' className='text-xl font-bold text-indigo-700'>Indigio</Link>
            <nav className='hidden md:flex gap-4 text-sm text-slate-600'>
              <Link href='/deals' className='hover:text-indigo-600'>Deals</Link>
              <a href='#how' className='hover:text-indigo-600'>How it works</a>
            </nav>
          </div>

          <div className='flex items-center gap-3'>
            <Link href='/kyc' className='hidden sm:inline-block bg-yellow-400 text-indigo-900 px-4 py-2 rounded-md font-semibold'>Request Investor Pack</Link>
            <Link href='/login' className='text-sm text-indigo-600'>Sign in</Link>

            <button className='md:hidden ml-2 p-2' onClick={() => setOpen(!open)} aria-label='Toggle menu'>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 6h14M3 10h14M3 14h14' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className='md:hidden border-t'>
          <div className='px-4 py-3 space-y-2'>
            <Link href='/deals' className='block'>Deals</Link>
            <Link href='/kyc' className='block'>Request Investor Pack</Link>
            <Link href='/login' className='block'>Sign in</Link>
          </div>
        </div>
      )}
    </header>
  );
}
