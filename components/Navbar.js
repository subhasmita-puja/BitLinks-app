'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-700 text-white px-4 py-3 ">
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
    
      <Link href="/" className="text-2xl font-bold flex items-center gap-2">
  <img src="/link.png" width={38} alt="Logo" />
  <span>BitLinks</span>
</Link>


        <ul className="hidden md:flex items-center gap-6 text-md font-medium">
          <Link href="/"><li className="hover:text-purple-200 cursor-pointer">Home</li></Link>
          <Link href="/about"><li className="hover:text-purple-200 cursor-pointer">About</li></Link>
          <Link href="/shorten"><li className="hover:text-purple-200 cursor-pointer">Shorten</li></Link>
          <li className="flex gap-3">
            <Link href="/shorten">
              <button className="bg-purple-500 hover:bg-purple-600 rounded-lg px-4 py-2 font-bold">
                Try Now
              </button>
            </Link>
            <Link
  href="https://github.com/subhasmita-bit/url-shortener"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-md">GitHub
  </button>
</Link>
          </li>
        </ul>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl focus:outline-none">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
        </div>

      {isOpen && (
        <div className="md:hidden mt-4 bg-purple-600 rounded-lg p-4 space-y-4 text-center font-medium">
          <Link href="/"><div className="hover:text-purple-200">Home</div></Link>
          <Link href="/about"><div className="hover:text-purple-200">About</div></Link>
          <Link href="/shorten"><div className="hover:text-purple-200">Shorten</div></Link>
          <Link href="/shorten">
            <button className="w-full mt-2 bg-purple-500 hover:bg-purple-600 rounded-lg px-4 py-2 font-bold">
              Try Now
            </button>
          </Link>
          <Link href="/github">
            <button className="w-full bg-purple-500 hover:bg-purple-600 rounded-lg px-4 py-2 font-bold">
              GitHub
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
