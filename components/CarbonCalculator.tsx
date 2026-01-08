import React, { useState } from 'react';
import { Leaf, Truck, Calculator, ArrowRight } from 'lucide-react';
import { CarbonCalculation } from '../types';

const CarbonCalculator: React.FC = () => {
  const [materialName, setMaterialName] = useState('Brique de Terre (BTC)');
  const [importedDistance, setImportedDistance] = useState(5000); // km (ex: from Europe/China)
  const [localDistance, setLocalDistance] = useState(50); // km
  const [weight, setWeight] = useState(1000); // kg
  const [result, setResult] = useState<CarbonCalculation | null>(null);

  // Simplified emission factors (kg CO2e per tkm for truck vs ship approx)
  // These are illustrative values.
  const TRANSPORT_EMISSION_FACTOR = 0.0001; // kg CO2 per kg per km (Road)
  
  const calculateImpact = () => {
    // Basic logic: Impact = Weight * Distance * Factor
    // Real logic would include production emissions, but request focuses on "Local vs Imported" context often implies transport savings.
    
    const importedEmissions = weight * importedDistance * TRANSPORT_EMISSION_FACTOR;
    const localEmissions = weight * localDistance * TRANSPORT_EMISSION_FACTOR;
    
    const saved = importedEmissions - localEmissions;

    setResult({
      materialName,
      importedDistance,
      localDistance,
      weightKg: weight,
      savedCo2: parseFloat(saved.toFixed(2))
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
      <div className="flex items-center gap-2 mb-6 border-b border-stone-100 pb-4">
        <Leaf className="text-forest" size={24} />
        <h2 className="text-xl font-bold text-stone-800">Calculateur Carbone</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-500 mb-1">Matériau</label>
            <input 
              type="text" 
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              className="w-full p-2 border border-stone-300 rounded-md focus:ring-1 focus:ring-forest outline-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-500 mb-1">Distance Import (km)</label>
              <input 
                type="number" 
                value={importedDistance}
                onChange={(e) => setImportedDistance(Number(e.target.value))}
                className="w-full p-2 border border-stone-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-500 mb-1">Distance Local (km)</label>
              <input 
                type="number" 
                value={localDistance}
                onChange={(e) => setLocalDistance(Number(e.target.value))}
                className="w-full p-2 border border-stone-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-500 mb-1">Poids Total (kg)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full p-2 border border-stone-300 rounded-md"
            />
          </div>

          <button 
            onClick={calculateImpact}
            className="w-full bg-stone-800 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-stone-700 transition-all"
          >
            <Calculator size={18} />
            Calculer l'économie
          </button>
        </div>

        <div className="flex flex-col justify-center">
          {result ? (
            <div className="bg-stone-50 rounded-lg p-6 border-l-4 border-forest">
              <h3 className="text-stone-500 text-sm font-medium uppercase tracking-wide mb-2">Résultat estimé</h3>
              <div className="text-4xl font-bold text-forest mb-2">
                {result.savedCo2} kg <span className="text-lg text-stone-600 font-normal">de CO₂</span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                En choisissant le <strong>{result.materialName}</strong> localement (à {result.localDistance}km) plutôt que l'import (à {result.importedDistance}km), vous économisez l'équivalent d'un trajet de <span className="font-semibold text-stone-900">{Math.floor(result.savedCo2 / 0.12)} km</span> en voiture standard.
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 border-2 border-dashed border-stone-200 rounded-lg p-6">
              <Truck size={48} className="mb-2 opacity-20" />
              <p className="text-center text-sm">Entrez les données pour voir l'impact écologique du transport.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
