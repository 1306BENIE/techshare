import { FEATURES } from "@/constants/ui/features";

export const FeaturesSection = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">
          Pourquoi choisir TechShare ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.name}
              className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl border border-blue-100 hover:border-blue-300 transition-all duration-300 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200 shadow group-hover:scale-110 transition-transform">
                <span className="text-blue-600 text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-blue-700 mb-2 group-hover:text-cyan-600 transition-colors">
                {feature.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
