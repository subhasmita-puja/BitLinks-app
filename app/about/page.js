import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-6">
          Welcome to <span className="text-purple-900">BitLinks</span> 🚀
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Say goodbye to long, messy URLs! <strong className="text-purple-800">BitLinks</strong> is your sleek and smart
          URL shortener.
        </p>

        {/* Fixed image container */}
        <div className="relative w-full h-64 mb-8 flex items-center justify-center">
          <Image
            src="/url.shortner.png"
            alt="URL Shortener Illustration"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            style={{ objectFit: "contain" }}
            className="rounded-xl"
            priority
          />
        </div>

        <h2 className="text-3xl font-bold text-purple-800 mb-4">✨ Why Use BitLinks?</h2>
        <ul className="text-left text-gray-800 text-lg space-y-3 mb-8">
          <li>🔗 Instantly shorten long URLs</li>
          <li>🎯 Track clicks and performance (coming soon)</li>
          <li>🛡️ Secure & Reliable</li>
          <li>💡 Easy to use — just paste and shorten!</li>
        </ul>

        <h2 className="text-3xl font-bold text-purple-800 mb-4">🌟 Built for You</h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Whether you{"'"}re a student, creator, marketer, or just someone who loves neat links —{" "}
          <strong>BitLinks</strong> helps you share better. Compact links, maximum impact.
        </p>

        {/* Fixed image container */}
        <div className="relative w-full h-64 mb-8 flex items-center justify-center">
          <Image
            src="/link-sharing.png"
            alt="Link Sharing"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            style={{ objectFit: "contain" }}
            className="rounded-xl"
            priority
          />
        </div>

        <p className="text-sm text-gray-500">
          Made with 💜 by <strong>Subhasmita Sahoo</strong>
        </p>
      </div>
    </div>
  )
}
