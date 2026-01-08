import React, { useState } from 'react';
import { Filter, Map, Info, X, ChevronRight, Thermometer } from 'lucide-react';
import { Material } from '../types';

// Données mockées avec des textures haute fidélité correspondant aux noms
const MOCK_MATERIALS: Material[] = [
  {
    id: '6',
    name: 'Terre de Barre (Allada)',
    category: 'Mur Porteur',
    country: 'Bénin',
    description: "Terre argileuse rouge typique du plateau d'Allada. Sa teinte ocre profond apporte une chaleur naturelle. Compactée en blocs (BTC), elle offre une régulation hygrométrique exceptionnelle.",
    thermalProperties: 'Déphasage thermique : 10-12 heures. Excellent pour le confort nocturne.',
    carbonFootprint: 0.09,
    // Texture: Mur en pisé / Rammed earth texture - Rouge/Ocre
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Bambou Oxytenanthera',
    category: 'Structure / Brise-soleil',
    country: 'Éthiopie',
    description: "Bambou solide des hautes terres. Utilisé ici en version tressée ou en cannes entières. Sa couleur paille naturelle réfléchit le rayonnement.",
    thermalProperties: 'Faible conductivité. Crée des zones tampons ventilées.',
    carbonFootprint: -0.5,
    // Texture: Tiges de bambou naturel
    imageUrl: 'https://images.unsplash.com/photo-1631557351631-4e785532c57a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Pierre de Cotonou',
    category: 'Sol / Soubassement',
    country: 'Bénin',
    description: "Pierre sédimentaire locale aux teintes grises et beiges. Sa surface rugueuse une fois taillée accroche la lumière rasante.",
    thermalProperties: 'Forte inertie. Garde la fraîcheur au sol.',
    carbonFootprint: 0.3,
    // Texture: Mur de pierre naturelle claire
    imageUrl: 'https://images.unsplash.com/photo-1596245089223-288219463b2f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Typha (Roseau)',
    category: 'Toiture / Isolation',
    country: 'Sénégal',
    description: "Fibre végétale transformée en panneaux ou chaume. Aspect organique, doux au toucher, idéal pour l'acoustique et l'ambiance feutrée.",
    thermalProperties: 'R = 2.5 m²K/W pour 10cm. Isolant biosourcé performant.',
    carbonFootprint: 0.05,
    // Texture: Toit de chaume / Roseaux séchés
    imageUrl: 'https://images.unsplash.com/photo-1588720197779-114d2e535213?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'Latérite Compactée',
    category: 'Sol',
    country: 'Mali',
    description: "Terre rouge riche en fer. Aspect granuleux et brut, couleur vibrante typique des sols ouest-africains.",
    thermalProperties: 'Inertie moyenne. Sensation de fraîcheur pied-nu.',
    carbonFootprint: 0.08,
    // Texture: Sol rouge granuleux / Laterite soil texture
    imageUrl: 'https://images.unsplash.com/photo-1518331397227-2c99a0f44384?auto=format&fit=crop&q=80&w=800'
  }
];

const MaterialLibrary: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Tous');
  const [activeMaterial, setActiveMaterial] = useState<Material | null>(null);
  
  const countries = ['Tous', ...Array.from(new Set(MOCK_MATERIALS.map(m => m.country)))];

  const filteredMaterials = selectedCountry === 'Tous' 
    ? MOCK_MATERIALS 
    : MOCK_MATERIALS.filter(m => m.country === selectedCountry);

  return (
    <div className="relative min-h-[80vh]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Texture-Thèque</h2>
          <p className="text-stone-500 text-sm">Catalogue de matières locales haute définition.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-stone-200 shadow-sm">
          <Filter size={16} className="text-stone-400" />
          <span className="text-sm font-medium text-stone-600">Origine :</span>
          <select 
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-semibold text-stone-900 cursor-pointer"
          >
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div 
            key={material.id} 
            onClick={() => setActiveMaterial(material)}
            className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-lg hover:border-ochre-400 transition-all cursor-pointer"
          >
            <div className="relative h-56 overflow-hidden bg-stone-200">
              <img 
                src={material.imageUrl} 
                alt={material.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase tracking-wider font-bold bg-ochre-600 px-2 py-0.5 rounded-sm mb-1 inline-block">
                  {material.category}
                </span>
                <h3 className="text-lg font-bold leading-tight">{material.name}</h3>
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between text-sm text-stone-600">
               <div className="flex items-center gap-2">
                 <Map size={14} className="text-stone-400" />
                 <span>{material.country}</span>
               </div>
               <div className="flex items-center gap-1 text-ochre-600 font-medium group-hover:translate-x-1 transition-transform">
                 <span>Fiche technique</span>
                 <ChevronRight size={14} />
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal / Slide-over */}
      {activeMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm" onClick={() => setActiveMaterial(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row overflow-hidden" onClick={e => e.stopPropagation()}>
            
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={activeMaterial.imageUrl} 
                alt={activeMaterial.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setActiveMaterial(null)}
                className="absolute top-4 left-4 bg-white/20 hover:bg-white/40 backdrop-blur p-2 rounded-full text-white md:hidden"
              >
                <X size={20} />
              </button>
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <span className="text-xs font-bold text-ochre-600 uppercase tracking-widest">{activeMaterial.category}</span>
                   <h2 className="text-3xl font-bold text-stone-900 mt-1">{activeMaterial.name}</h2>
                   <div className="flex items-center gap-2 text-stone-500 text-sm mt-1">
                     <Map size={14} /> {activeMaterial.country}
                   </div>
                </div>
                <button 
                  onClick={() => setActiveMaterial(null)}
                  className="hidden md:block text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-2">Description</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">{activeMaterial.description}</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                  <div className="flex items-start gap-3">
                    <Thermometer className="text-forest mt-0.5" size={20} />
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">Propriétés Thermiques</h4>
                      <p className="text-xs text-stone-600 mt-1">{activeMaterial.thermalProperties}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="border border-stone-200 p-3 rounded-lg text-center">
                     <span className="block text-2xl font-bold text-stone-900">{activeMaterial.carbonFootprint}</span>
                     <span className="text-[10px] text-stone-500 uppercase">kg CO2e / kg</span>
                   </div>
                   <div className="bg-ochre-50 border border-ochre-100 p-3 rounded-lg text-center flex flex-col justify-center items-center">
                     <span className="text-ochre-700 font-bold text-sm">Bio-sourcé</span>
                     <span className="text-[10px] text-ochre-600">Certifié Local</span>
                   </div>
                </div>
              </div>

              <button className="mt-8 w-full bg-stone-900 text-white py-3 rounded-lg font-medium hover:bg-stone-800 transition-colors">
                Ajouter au projet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialLibrary;