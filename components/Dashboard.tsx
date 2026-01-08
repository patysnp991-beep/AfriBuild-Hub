import React from 'react';
import { Plus, ArrowRight, LayoutGrid, Clock } from 'lucide-react';
import { Project } from '../types';
import BioclimaticWidget from './BioclimaticWidget';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Villa Ouidah',
    location: 'Ouidah, Bénin',
    status: 'En cours',
    completion: 65,
    // Modern tropical villa, warm tones, architectural
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Éco-Lodge Casamance',
    location: 'Ziguinchor, Sénégal',
    status: 'Concept',
    completion: 20,
    // Thatched roof lodge, nature, tropical
    thumbnailUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Bibliothèque Communautaire',
    location: 'Kigali, Rwanda',
    status: 'Terminé',
    completion: 100,
    // Brick/Red architecture, public building
    thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Bonjour, Architecte.</h1>
        <p className="text-stone-500">Voici un aperçu de vos projets durables.</p>
      </header>

      <BioclimaticWidget />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LayoutGrid className="text-stone-400" size={20} />
          <h2 className="text-xl font-bold text-stone-800">Projets Récents</h2>
        </div>
        <button className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          <Plus size={16} />
          Nouveau Projet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {MOCK_PROJECTS.map((project) => (
          <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 group cursor-pointer">
            <div className="relative h-40 overflow-hidden">
              <img 
                src={project.thumbnailUrl} 
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide shadow-sm
                  ${project.status === 'Terminé' ? 'bg-forest text-white' : 
                    project.status === 'En cours' ? 'bg-ochre-500 text-white' : 'bg-white/90 text-stone-600 backdrop-blur'}`}>
                  {project.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-stone-900 mb-1">{project.title}</h3>
              <p className="text-xs text-stone-500 flex items-center gap-1 mb-4">
                <Clock size={12} /> Dernière modif. il y a 2j
              </p>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-stone-600 font-medium">
                  <span>Progression</span>
                  <span>{project.completion}%</span>
                </div>
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-forest rounded-full" 
                    style={{ width: `${project.completion}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;