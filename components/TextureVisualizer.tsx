import React, { useState } from 'react';
import { Layers, Maximize, CheckCircle, Info, RefreshCw } from 'lucide-react';
import { Material } from '../types';

// Textures sélectionnées pour leur fidélité visuelle au matériau - Synchronisées avec la Library
const TEXTURES = [
  { 
    id: 't1', 
    name: 'Terre de Barre (Bénin)', 
    type: 'wall', 
    // Texture: Mur en pisé / Rammed earth texture - Rouge/Ocre
    url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800', 
    color: '#883a27' 
  },
  { 
    id: 't2', 
    name: 'Bambou Tressé', 
    type: 'wall', 
    // Texture: Tressage Bambou / Woven Bamboo
    url: 'https://images.unsplash.com/photo-1621262331586-b4bb68404a3e?auto=format&fit=crop&q=80&w=800', 
    color: '#d97706' 
  },
  { 
    id: 't3', 
    name: 'Béton de Latérite', 
    type: 'wall', 
    // Texture: Béton rouge / Red concrete wall (Pas de cyclistes)
    url: 'https://images.unsplash.com/photo-1563815392686-2244400490df?auto=format&fit=crop&q=80&w=800', 
    color: '#b45309' 
  },
  { 
    id: 't4', 
    name: 'Pierre de Cotonou', 
    type: 'floor', 
    // Texture: Pierre naturelle irrégulière / Stone wall
    url: 'https://images.unsplash.com/photo-1596245089223-288219463b2f?auto=format&fit=crop&q=80&w=800', 
    color: '#a8a29e' 
  },
  { 
    id: 't5', 
    name: 'Bois d\'Iroko', 
    type: 'floor', 
    // Texture: Bois sombre / Dark wood floor
    url: 'https://images.unsplash.com/photo-1610496886475-4c07b9a52865?auto=format&fit=crop&q=80&w=800', 
    color: '#78350f' 
  },
  { 
    id: 't6', 
    name: 'Carreaux Ciment', 
    type: 'floor', 
    // Texture: Carreau ciment motif / Patterned tiles
    url: 'https://images.unsplash.com/photo-1626284638709-328639207043?auto=format&fit=crop&q=80&w=800', 
    color: '#57534e' 
  },
];

const TextureVisualizer: React.FC = () => {
  const [activeSurface, setActiveSurface] = useState<'wall' | 'floor'>('wall');
  const [wallTexture, setWallTexture] = useState(TEXTURES[0]);
  const [floorTexture, setFloorTexture] = useState(TEXTURES[3]);

  const availableTextures = TEXTURES.filter(t => t.type === activeSurface || t.type === 'both');

  const handleApply = (texture: typeof TEXTURES[0]) => {
    if (activeSurface === 'wall') setWallTexture(texture);
    if (activeSurface === 'floor') setFloorTexture(texture);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      
      {/* Configuration Panel */}
      <div className="w-full md:w-1/3 bg-white rounded-xl border border-stone-200 p-6 flex flex-col order-2 md:order-1 h-fit">
        <div className="flex items-center gap-2 mb-6 text-stone-900">
          <Layers size={24} className="text-forest" />
          <h2 className="text-xl font-bold">Studio de Textures</h2>
        </div>

        {/* Surface Selector */}
        <div className="flex bg-stone-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveSurface('wall')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeSurface === 'wall' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Murs
          </button>
          <button
            onClick={() => setActiveSurface('floor')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeSurface === 'floor' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Sols
          </button>
        </div>

        {/* Texture Grid */}
        <div className="space-y-4">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Matériaux disponibles ({availableTextures.length})
          </p>
          <div className="grid grid-cols-2 gap-3">
            {availableTextures.map((texture) => {
              const isActive = (activeSurface === 'wall' && wallTexture.id === texture.id) ||
                               (activeSurface === 'floor' && floorTexture.id === texture.id);
              return (
                <button
                  key={texture.id}
                  onClick={() => handleApply(texture)}
                  className={`relative group overflow-hidden rounded-lg border-2 text-left transition-all ${
                    isActive ? 'border-ochre-500 ring-2 ring-ochre-100' : 'border-transparent hover:border-stone-300'
                  }`}
                >
                  <div className="h-20 w-full bg-stone-200 relative">
                     <img src={texture.url} alt={texture.name} className="w-full h-full object-cover" />
                     {isActive && (
                       <div className="absolute inset-0 bg-ochre-500/20 flex items-center justify-center">
                         <CheckCircle className="text-white drop-shadow-md" size={24} />
                       </div>
                     )}
                  </div>
                  <div className="p-2 bg-stone-50">
                    <p className="text-xs font-bold text-stone-800 truncate">{texture.name}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Technical Info Widget */}
        <div className="mt-8 p-4 bg-stone-50 rounded-lg border border-stone-200">
           <div className="flex items-center gap-2 mb-2 text-ochre-600">
             <Info size={16} />
             <span className="text-xs font-bold uppercase">Info Bioclimatique</span>
           </div>
           <p className="text-sm text-stone-600 leading-relaxed">
             {activeSurface === 'wall' 
               ? `${wallTexture.name} offre une excellente inertie thermique, idéale pour lisser les pics de chaleur à Cotonou.` 
               : `${floorTexture.name} reste frais au toucher et favorise la ventilation naturelle au sol.`}
           </p>
        </div>
      </div>

      {/* Visualizer Preview */}
      <div className="w-full md:w-2/3 order-1 md:order-2">
        <div className="bg-stone-900 rounded-xl overflow-hidden shadow-2xl relative aspect-[4/3] md:aspect-auto md:h-full">
            {/* Ambient Lighting Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black/30 to-transparent mix-blend-multiply"></div>
            
            {/* The Room */}
            <div className="absolute inset-0 flex flex-col">
              
              {/* Back Wall */}
              <div 
                className="flex-[2] relative transition-all duration-700 ease-in-out bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${wallTexture.url})`,
                }}
              >
                {/* Shadow/Depth for corners */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 mix-blend-multiply"></div>
                
                {/* Window Placeholder to give context */}
                <div className="absolute top-1/4 right-1/4 w-1/3 h-1/2 bg-stone-100/10 backdrop-blur-sm border border-stone-100/20 rounded-sm overflow-hidden shadow-inner">
                   <div className="w-full h-full bg-gradient-to-br from-blue-100/20 to-orange-100/10 mix-blend-soft-light"></div>
                </div>
              </div>

              {/* Floor */}
              <div 
                className="flex-1 relative transition-all duration-700 ease-in-out bg-cover bg-center origin-top"
                style={{ 
                  backgroundImage: `url(${floorTexture.url})`,
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Floor perspective trick */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent mix-blend-multiply"></div>
              </div>

            </div>

            {/* Labels Overlay */}
            <div className="absolute bottom-6 left-6 z-30 flex gap-4">
              <div className="bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-mono border border-white/20">
                MUR: {wallTexture.name}
              </div>
              <div className="bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-mono border border-white/20">
                SOL: {floorTexture.name}
              </div>
            </div>

            <button className="absolute top-4 right-4 z-30 p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg text-white transition-colors">
              <Maximize size={20} />
            </button>
        </div>
      </div>

    </div>
  );
};

export default TextureVisualizer;