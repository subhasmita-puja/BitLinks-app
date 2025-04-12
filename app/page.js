'use client';

import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Home() {
  return (
    <main className="bg-purple-100 min-h-screen flex items-center justify-center px-4">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto py-10">
        
        {/* Text + Buttons */}
        <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          <p className={`text-3xl md:text-4xl font-bold text-purple-800 ${poppins.className}`}>
            The Best URL Shortener on the Internet
          </p>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed">
          We are the most straightfoward URL Shortener in the world. Most of the url shorteners will track you or ask you to give your details for login. We understand your needs and hence we have created this URL shortener
          </p>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <Link href="/shorten">
              <button className="bg-purple-600 hover:bg-purple-500 transition text-white rounded-lg px-6 py-2 font-semibold shadow-md">
                Try Now
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full h-64 md:h-[400px]">
          <Image
            className="object-contain mix-blend-darken"
            alt="Vector illustration"
            src="/vector.jpg"
            fill
            priority
          />
        </div>

      </section>
    </main>
  );
}
