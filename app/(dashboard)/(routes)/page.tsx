import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full pt-0 -mt-12  min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white pt-10 pl-10 pb-0 rounded-b-3xl flex flex-col lg:flex-row items-center gap-4 justify-between">
        {/* Left Side - Text */}
        <div className="max-w-lg space-y-6 text-center justify-center mr-10">
          <h1 className="text-4xl font-bold leading-tight">
            Zdobądź przyszłościowe kompetencje.
            <br />
            Kursy Industry 4.0 dla każdego!
          </h1>
          <p className="text-lg">
            Ucz się o automatyce, analizie danych, IoT, AI, robotyce,
            ucyfrowych bliźniakach od najlepszych praktyków z przemysłu.
          </p>
          <div className="flex gap-4 pb-5 items-center justify-center z-10">
            <Link href="/sign-in">
              <div className="bg-white text-[#0c2a45] px-6 py-3 rounded-xl font-semibold hover:bg-blue-100 transition cursor-pointer">
                Zacznij teraz
              </div>
            </Link>
            <Link
              href="/search"
              className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#0c2a45] transition"
            >
              Zobacz kursy
            </Link>
            
          </div>
        </div>

        <div className="w-full max-w-2xl min-w-xl items-center  gap-4">
          <img
            src="/images/HomePage.png"
            alt="Ilustracja Industry 4.0"
            className="w-full h-auto rounded-tl-2xl"
          />
        </div>
      </section>
    </main>
  );
}
