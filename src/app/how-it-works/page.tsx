import {
  UserPlus,
  Search,
  ShoppingCart,
  PackageCheck,
  Smile,
  ArrowLeft,
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-8">
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Accueil
        </a>
      </div>
      {/* Introduction */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          TechShare, la technologie à portée de main
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Louez, partagez, innovez. TechShare est la première plateforme
          collaborative de location d'outils technologiques entre particuliers
          et professionnels au Cameroun. Profitez d'un accès simple, économique
          et sécurisé à tout le matériel dont vous avez besoin, quand vous en
          avez besoin.
        </p>
      </section>

      {/* Notre mission */}
      <section className="bg-blue-50 rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Notre mission</h2>
        <p className="text-gray-700">
          Chez TechShare, nous croyons que l'accès à la technologie ne doit pas
          être un luxe. Nous facilitons le partage et la location d'outils tech
          pour encourager l'innovation, l'économie circulaire et l'entraide
          locale. Ensemble, construisons une communauté où chacun peut créer,
          apprendre et entreprendre sans limite matérielle.
        </p>
      </section>

      {/* Les étapes */}
      <section>
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-5 gap-6 text-center">
          <div className="flex flex-col items-center">
            <UserPlus className="h-10 w-10 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-1">1. Inscription</h3>
            <p className="text-gray-600 text-sm">
              Créez un compte gratuitement en quelques secondes.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Search className="h-10 w-10 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-1">2. Recherche</h3>
            <p className="text-gray-600 text-sm">
              Trouvez l'outil qu'il vous faut parmi des dizaines de références.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ShoppingCart className="h-10 w-10 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-1">3. Réservation</h3>
            <p className="text-gray-600 text-sm">
              Réservez en ligne, choisissez vos dates et contactez le
              propriétaire.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <PackageCheck className="h-10 w-10 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-1">4. Retrait ou livraison</h3>
            <p className="text-gray-600 text-sm">
              Récupérez l'outil ou faites-le livrer à l'adresse de votre choix.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Smile className="h-10 w-10 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-1">5. Utilisation & retour</h3>
            <p className="text-gray-600 text-sm">
              Profitez de l'outil, puis retournez-le simplement à la fin de la
              location.
            </p>
          </div>
        </div>
      </section>

      {/* Valeurs ajoutées */}
      <section className="mt-12 mb-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          Pourquoi choisir TechShare ?
        </h2>
        <ul className="grid md:grid-cols-3 gap-6">
          <li className="bg-white rounded-lg shadow p-5 border border-blue-100">
            <span className="font-bold text-blue-700">Économique</span>
            <p className="text-gray-600 text-sm mt-2">
              Louez à petit prix, évitez les achats coûteux et valorisez vos
              propres outils en les partageant.
            </p>
          </li>
          <li className="bg-white rounded-lg shadow p-5 border border-blue-100">
            <span className="font-bold text-blue-700">Sécurisé</span>
            <p className="text-gray-600 text-sm mt-2">
              Transactions protégées, profils vérifiés et assistance dédiée pour
              une expérience sereine.
            </p>
          </li>
          <li className="bg-white rounded-lg shadow p-5 border border-blue-100">
            <span className="font-bold text-blue-700">Communautaire</span>
            <p className="text-gray-600 text-sm mt-2">
              Rejoignez une communauté d'entraide et d'innovation, développez
              votre réseau local.
            </p>
          </li>
        </ul>
      </section>

      {/* Appel à l'action */}
      <section className="text-center mt-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          Prêt à rejoindre l'aventure ?
        </h2>
        <p className="text-gray-700 mb-6">
          Inscrivez-vous dès maintenant et accédez à un monde d'opportunités
          technologiques !
        </p>
        <a
          href="/auth/signin"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow transition"
        >
          Créer mon compte
        </a>
      </section>
    </main>
  );
}
