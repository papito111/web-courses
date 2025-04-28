import React from "react";
import Link from "next/link";
import { Clock, BadgeCheck, BarChart3, Cpu, Factory, LayoutGrid, BrainCircuit, Users, LineChart, CameraIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-slate-50 flex flex-col -mt-12 items-center">
      {/* ======================= HERO ======================= */}
      <section className="w-full bg-gray-900 text-white pt-20 pb-0 px-6 md:px-16 lg:px-24 rounded-b-3xl flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Copy */}
        <div className="max-w-xl space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Zdobądź przyszłościowe kompetencje.
            <br />
            Kursy <span className="text-cyan-400">Industry 4.0</span> dla każdego!
          </h1>
          <p className="text-lg md:text-xl text-slate-200">
            Ucz się o automatyce, analizie danych, IoT, AI, robotyce, systemach wizyjnych od najlepszych praktyków z przemysłu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start pb-10">
            <Link href="/sign-in" legacyBehavior>
              <a className="bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold shadow hover:bg-cyan-100 transition">Zacznij teraz</a>
            </Link>
            <Link href="/search" legacyBehavior>
              <a className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-slate-900 transition">Zobacz kursy</a>
            </Link>
          </div>
        </div>
        {/* Illustration */}
        <div className="w-full  max-w-lg">
          <img
            src="/images/HomePage.png"
            alt="Ilustracja Industry 4.0"
            className="w-full rounded-xl z-10 h-auto object-contain drop-shadow-lg"
          />
        </div>
      </section>

      {/* ======================= WHY SECTION ======================= */}
      <section className="w-full mt-16 px-6 md:px-16 lg:px-24 space-y-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center">Dlaczego warto?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Card */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <Clock size={42} />
            <h3 className="font-semibold text-lg">Elastyczne tempo nauki</h3>
            <p className="text-sm text-slate-600">Ucz się w dogodnych dla siebie godzinach.</p>
          </div>
          {/* Card */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <BadgeCheck size={42} />
            <h3 className="font-semibold text-lg">Certyfikaty umiejętności</h3>
            <p className="text-sm text-slate-600">Otrzymuj certyfikaty potwierdzające rozwój kompetencji.</p>
          </div>
          {/* Card */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <BarChart3 size={42} />
            <h3 className="font-semibold text-lg">Trenerzy‑praktycy</h3>
            <p className="text-sm text-slate-600">Ucz się od ekspertów z branży automotive, PLC, systemów informatycznych oraz  produkcji.</p>
          </div>
          {/* Card */}
          <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <Cpu size={42} />
            <h3 className="font-semibold text-lg">Nowoczesna platforma</h3>
            <p className="text-sm text-slate-600"> Wykłady, praktyczne lekcje, projekty oraz wspolny kanał do pytań.</p>
          </div>
        </div>
      </section>

      {/* ======================= POPULAR COURSES ======================= */}
      <section className="w-full text-center mt-20 px-6 md:px-16 lg:px-24 space-y-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center">Dziedziny w których się specjalizujemy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Course */}
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <Factory size={48} />
            <h3 className="font-semibold">Sterowniki PLC i systemy SCADA</h3>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <CameraIcon size={48} />
            <h3 className="font-semibold">Lean Manufacturing 2 AI</h3>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <LayoutGrid size={48} />
            <h3 className="font-semibold">Systemy wizyjne</h3>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <BrainCircuit size={48} />
            <h3 className="font-semibold">Zastosowanie wizji maszynowej</h3>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <LineChart size={48} />
            <h3 className="font-semibold">Data science w przemyśle</h3>
          </div>
        </div>
      </section>

      {/* ======================= TESTIMONIAL & NEWSLETTER ======================= */}
      <h2 className="text-2xl md:text-3xl pt-12 font-extrabold text-slate-900 text-center">Opinie naszych kursantów</h2>

      <section className="w-full mt-16 px-6 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Testimonial */}

        <div className="bg-white rounded-2xl shadow p-8 space-y-6">
          <p className="italic text-lg md:text-xl leading-relaxed">
            „Ten kurs to <span className="font-semibold text-cyan-600">game‑changer!</span> W końcu rozumiem jak działa IoT ”
          </p>
          <p className="font-semibold">Tomasz, inżynier Procesu</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 space-y-6">
          <p className="italic text-lg md:text-xl leading-relaxed">
            „Świetny kurs od <span className="font-semibold text-cyan-600">praktyków</span> dla <span className="font-semibold text-cyan-600">praktyków!</span>”
          </p>
          <p className="font-semibold">Mariusz, Senior inżynier </p>
        </div>
        
        {/* Newsletter */}
        <div className="bg-slate-900 text-white rounded-2xl shadow p-8 space-y-6 flex flex-col">
          <h3 className="text-2xl font-extrabold">Zainwestuj w rozwój swoich pracowników</h3>
          <p className="text-slate-200">Dedykowane ścieżki learningowe <br></br>Kursy u ciebie w firmie</p>

          <form className="mt-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Twój adres e‑mail"
              className="flex-1 px-4 py-3 rounded-xl text-slate-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-cyan-700 hover:bg-cyan-500 text-white font-semibold px-8 py-3 rounded-xl transition"
            >
              Zapisz się
            </button>
          </form>
        </div>
      </section>

      {/* ======================= FOOTER ======================= */}
      <footer className="w-full mt-24 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()}  Wszelkie prawa zastrzeżone.
      </footer>
    </main>
  );
}
