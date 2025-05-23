"use client";
import { motion } from "framer-motion";
import {
  UserPlus,
  Search,
  ShoppingCart,
  PackageCheck,
  Smile,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

function SectionSeparator({ flip = false }: { flip?: boolean }) {
  return (
    <div className="w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-16 ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0 0C360 80 1080 0 1440 80V80H0V0Z"
          fill="#e0e7ff"
          fillOpacity="0.5"
        />
      </svg>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="w-full bg-gray-50">
      {/* Retour Accueil */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Accueil
          </Link>
        </motion.div>
      </div>

      {/* Hero / Introduction */}
      <section className="bg-gradient-to-br from-blue-100 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-lg">
              TechShare, la technologie à portée de main
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Louez, partagez, innovez. TechShare est la première plateforme
              collaborative de location d'outils technologiques entre
              particuliers et professionnels en Côte d'Ivoire. Profitez d'un
              accès simple, économique et sécurisé à tout le matériel dont vous
              avez besoin, quand vous en avez besoin.
            </p>
          </motion.div>
        </div>
      </section>
      <SectionSeparator />

      {/* Notre mission */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-10 mb-0 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              Notre mission
            </h2>
            <p className="text-gray-700 text-lg">
              Chez TechShare, nous croyons que l'accès à la technologie ne doit
              pas être un luxe. Nous facilitons le partage et la location
              d'outils tech pour encourager l'innovation, l'économie circulaire
              et l'entraide locale. Ensemble, construisons une communauté où
              chacun peut créer, apprendre et entreprendre sans limite
              matérielle.
            </p>
          </motion.div>
        </div>
      </section>
      <SectionSeparator flip />

      {/* Les étapes */}
      <section className="bg-blue-50 py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-blue-800 mb-16 text-center drop-shadow-lg">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-12">
            {[
              {
                icon: (
                  <UserPlus className="h-12 w-12 text-blue-600 mb-3 drop-shadow-xl" />
                ),
                title: "1. Inscription",
                desc: "Créez un compte gratuitement en quelques secondes.",
              },
              {
                icon: (
                  <Search className="h-12 w-12 text-green-600 mb-3 drop-shadow-xl" />
                ),
                title: "2. Recherche",
                desc: "Trouvez l'outil qu'il vous faut parmi des dizaines de références.",
              },
              {
                icon: (
                  <ShoppingCart className="h-12 w-12 text-purple-600 mb-3 drop-shadow-xl" />
                ),
                title: "3. Réservation",
                desc: "Réservez en ligne, choisissez vos dates et contactez le propriétaire.",
              },
              {
                icon: (
                  <PackageCheck className="h-12 w-12 text-yellow-500 mb-3 drop-shadow-xl" />
                ),
                title: "4. Retrait ou livraison",
                desc: "Récupérez l'outil ou faites-le livrer à l'adresse de votre choix.",
              },
              {
                icon: (
                  <Smile className="h-12 w-12 text-pink-500 mb-3 drop-shadow-xl" />
                ),
                title: "5. Utilisation & retour",
                desc: "Profitez de l'outil, puis retournez-le simplement à la fin de la location.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center bg-white rounded-xl shadow-2xl p-6 min-h-[220px] hover:scale-105 hover:shadow-[0_8px_40px_rgba(59,130,246,0.15)] hover:border-blue-400 border-2 border-transparent transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-300" />
                {step.icon}
                <h3 className="font-bold mb-2 text-md text-blue-900 tracking-tight drop-shadow-sm">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed text-center">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionSeparator />

      {/* Valeurs ajoutées */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-10 text-center">
              Pourquoi choisir TechShare ?
            </h2>
            <ul className="grid md:grid-cols-3 gap-12">
              <motion.li
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                }}
                className="bg-blue-50 rounded-2xl shadow p-10 border-2 border-blue-100"
              >
                <span className="font-bold text-blue-700 text-xl">
                  Économique
                </span>
                <p className="text-gray-600 text-lg mt-3">
                  Louez à petit prix, évitez les achats coûteux et valorisez vos
                  propres outils en les partageant.
                </p>
              </motion.li>
              <motion.li
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                }}
                className="bg-blue-50 rounded-2xl shadow p-10 border-2 border-blue-100"
              >
                <span className="font-bold text-blue-700 text-xl">
                  Sécurisé
                </span>
                <p className="text-gray-600 text-lg mt-3">
                  Transactions protégées, profils vérifiés et assistance dédiée
                  pour une expérience sereine.
                </p>
              </motion.li>
              <motion.li
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                }}
                className="bg-blue-50 rounded-2xl shadow p-10 border-2 border-blue-100"
              >
                <span className="font-bold text-blue-700 text-xl">
                  Communautaire
                </span>
                <p className="text-gray-600 text-lg mt-3">
                  Rejoignez une communauté d'entraide et d'innovation,
                  développez votre réseau local.
                </p>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </section>
      <SectionSeparator flip />

      {/* Témoignages */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl shadow-lg p-14 mb-16"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
              Ils en parlent mieux que nous
            </h2>
            <div className="flex flex-col md:flex-row gap-12 justify-center">
              <div className="flex-1 text-center">
                <img
                  src="/avatar1.png"
                  alt="Utilisateur 1"
                  className="mx-auto w-20 h-20 rounded-full mb-4 shadow"
                />
                <p className="italic text-gray-700 text-lg">
                  "J'ai pu louer un MacBook en 2h, super simple et sécurisé !"
                </p>
                <span className="block mt-4 font-semibold text-blue-700">
                  Koffi Koffi, Abidjan
                </span>
              </div>
              <div className="flex-1 text-center">
                <img
                  src="/avatar2.png"
                  alt="Utilisateur 2"
                  className="mx-auto w-20 h-20 rounded-full mb-4 shadow"
                />
                <p className="italic text-gray-700 text-lg">
                  "J'ai rentabilisé mon imprimante 3D en la louant le week-end."
                </p>
                <span className="block mt-4 font-semibold text-blue-700">
                  Alex Koffi, Abidjan
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <SectionSeparator />

      {/* Appel à l'action */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              Prêt à rejoindre l'aventure ?
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              Inscrivez-vous dès maintenant et accédez à un monde d'opportunités
              technologiques !
            </p>
            <Link
              href="/auth/signin"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold px-10 py-4 rounded-lg shadow-lg text-xl transition-all duration-300 hover:scale-105"
            >
              Créer mon compte
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
