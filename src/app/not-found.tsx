import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070D18] text-white flex items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto text-[#D4AF37]">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-6xl font-light text-white">404</h1>
        <h2 className="font-serif text-2xl font-light text-stone-300">
          Uncharted Territory
        </h2>
        <p className="text-xs text-stone-400 font-light leading-relaxed">
          The travel journal or page you are looking for has been moved or does not exist in our atlas archives.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#C5A059] hover:bg-[#b08b46] text-white text-xs uppercase tracking-widest font-semibold rounded-full shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Atlas Home</span>
        </Link>
      </div>
    </div>
  );
}
