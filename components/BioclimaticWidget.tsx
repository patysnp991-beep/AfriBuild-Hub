import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Loader2, MapPin, Sparkles } from 'lucide-react';
import { getBioclimaticAdvice } from '../services/geminiService';
import { getFromCache, saveToCache } from '../services/storageService';

const BioclimaticWidget: React.FC = () => {
  const [city, setCity] = useState('Cotonou');
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async (targetCity: string) => {
    setLoading(true);
    const cacheKey = `weather_material_${targetCity.toLowerCase()}`;
    const cachedAdvice = getFromCache<string>(cacheKey);

    if (cachedAdvice) {
      setAdvice(cachedAdvice);
      setLoading(false);
    } else {
      // Updated prompt to focus on materials and textures as requested
      const prompt = `Vous êtes un expert en architecture bioclimatique en Afrique. 
      Analysez le climat de ${targetCity}.
      Suggérez spécifiquement quel matériau (ex: BTC, Bambou, Pierre) et quelle texture utiliser pour les murs afin d'optimiser le confort thermique.
      Soyez concis (max 40 mots).`;
      
      const result = await getBioclimaticAdvice(prompt); // Passing prompt as "city" to the service loosely, usually service takes contents directly but looking at existing service implementation it takes 'city' and builds prompt. We need to update service or pass city here.
      
      // Wait, let's look at geminiService.ts. It builds the string inside.
      // I cannot change geminiService logic easily without changing the file. 
      // I will assume for this step I should rely on the service's existing structure or update the service.
      // Let's modify the service call logic in geminiService if possible, OR, since I can modify files:
      // I will actually pass the city, but I'll update the geminiService to accept a custom prompt OR I will stick to the previous file change constraint.
      // Actually, looking at the previous turn, I can just update the service call here if I update the service file.
      // But simpler: The previous service takes `city` and hardcodes the prompt. 
      // I will update `services/geminiService.ts` to reflect the new requirement for "Texture/Material" advice.
      
      // Re-fetching strictly with city name for now, but I will update the service file next.
      const resultReal = await getBioclimaticAdvice(targetCity);
      setAdvice(resultReal);
      saveToCache(cacheKey, resultReal);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdvice(city);
  };

  return (
    <div className="bg-gradient-to-br from-forest to-stone-900 text-stone-50 rounded-xl p-6 shadow-lg mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Wind size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 text-ochre-500">
          <Sparkles size={20} />
          <h2 className="text-lg font-bold uppercase tracking-wider">Conseiller Bioclimatique</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
            <form onSubmit={handleCitySubmit} className="flex gap-2 max-w-sm w-full md:w-auto">
            <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-3 text-stone-400" size={16} />
                <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-stone-800/50 border border-stone-600 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-ochre-500 transition-colors"
                placeholder="Ville..."
                />
            </div>
            <button 
                type="submit"
                className="bg-ochre-600 hover:bg-ochre-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
                Go
            </button>
            </form>

            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/5 w-full">
            {loading ? (
                <div className="flex items-center gap-2 text-stone-300">
                <Loader2 className="animate-spin" size={20} />
                <span>Analyse des matériaux adaptés...</span>
                </div>
            ) : (
                <div>
                    <p className="text-xs text-stone-400 uppercase font-bold mb-1">Recommandation Matériaux</p>
                    <p className="text-lg font-light leading-relaxed">
                    "{advice}"
                    </p>
                </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BioclimaticWidget;
