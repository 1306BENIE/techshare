import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Location d'outils informatiques{" "}
            <span className="text-cyan-300 duration-300">
              entre particuliers
            </span>
          </h1>
          <p className="text-xl mb-10 text-blue-100 animate-fade-in-up delay-100">
            Réduisez le gaspillage technologique en louant localement des
            équipements inutilisés.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-up delay-200">
            <Link
              href="/auth/signup"
              className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-50 hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:ring-2 focus:ring-cyan-400"
            >
              Commencer
            </Link>
            <Link
              href="/tools"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 hover:scale-105 hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-cyan-400"
            >
              Voir les outils
            </Link>
          </div>
        </div>
        {/* Animation de fond décorative */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse-slow z-0" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl animate-pulse-slow z-0" />
      </div>
    </div>
  );
};
