'use client';

import Link from 'next/link';
import { TwitterLogo, FacebookLogo, LinkedinLogo } from '@phosphor-icons/react';
import Image from "next/image" 
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="md:justify-self-start">
            <div className="mb-3">
              <Image src="/logo2.png" alt="logo" width={40} height={40} className="block" />
            </div>
            <h1 className="ml-0 font-bold text-2xl text-white md:text-center hover:bg-linear-to-r from-pink-400 via-yellow-300 to-green-400 bg-clip-text">
              Writer<span className="text-amber-600 ">Hub</span>
            </h1>
        </div>
          {/* Quick Links */}
          <nav aria-label="Quick Links" className="md:justify-self-center">
            <h4 className="text-white font-bold mb-4 md:text-center">Quick Links</h4>
            <ul className="space-y-2 text-sm md:text-left">
              <li><Link href="/books" className="hover:text-white transition">Browse Books</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            </ul>
          </nav>

          {/* Social */}
          <div className="md:justify-self-end">
            <h4 className="text-white font-bold mb-4 md:text-center">Connect</h4>
            <div className="flex space-x-6 md:justify-end">
              <Link href="https://x.com/FuturegamesEDU/status/1041957370388209665" aria-label="Twitter" className="hover:text-white transition">
                <TwitterLogo size={20} />
              </Link>
              <Link href="https://www.facebook.com/FuturegamesEDU" aria-label="Facebook" className="hover:text-white transition">
                <FacebookLogo size={20} />
              </Link>
              <Link href="https://www.linkedin.com/school/futuregames/posts/?feedView=all" aria-label="LinkedIn" className="hover:text-white transition">
                <LinkedinLogo size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-center sm:text-left">
            &copy; {currentYear} WriterHub. All rights reserved.
          </p>
          <p className="text-sm mt-4 sm:mt-0 hover:text-white transition">
            Built with using Next.js & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}