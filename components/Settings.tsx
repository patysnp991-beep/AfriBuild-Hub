import React, { useState } from 'react';
import { User, Smartphone, Globe, HardDrive, Bell, Moon, Sun, Trash2, Download, ChevronRight, Save, WifiOff } from 'lucide-react';
import { clearCache } from '../services/storageService';

const Settings: React.FC = () => {
  const [dataSaver, setDataSaver] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [cacheSize, setCacheSize] = useState('14.2 MB');

  const handleClearCache = () => {
    // Simulation du nettoyage de cache
    localStorage.clear(); 
    setCacheSize('0 KB');
    alert('Le cache local a été vidé avec succès.');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <header>
        <h1 className="text-3xl font-bold text-stone-900">Paramètres</h1>
        <p className="text-stone-500">Gérez votre profil, vos préférences et vos données hors-ligne.</p>
      </header>

      {/* Section Profil */}
      <section className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-ochre-100 flex items-center justify-center text-ochre-700 text-xl font-bold border-2 border-white shadow-sm">
                    AR
                </div>
                <div>
                    <h2 className="text-lg font-bold text-stone-900">Amina R.</h2>
                    <p className="text-stone-500 text-sm">Architecte Lead</p>
                </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors">
                Modifier le profil
            </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Agence</label>
                <input type="text" defaultValue="AfriBuild Studio" className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50 text-stone-800 focus:ring-1 focus:ring-ochre-500 outline-none transition-all" />
            </div>
            <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Zone Climatique par défaut</label>
                <div className="relative">
                    <Globe className="absolute left-3 top-3 text-stone-400" size={18} />
                    <input type="text" defaultValue="Cotonou, Bénin (Tropical)" className="w-full p-3 pl-10 border border-stone-200 rounded-lg bg-stone-50 text-stone-800 focus:ring-1 focus:ring-ochre-500 outline-none transition-all" />
                </div>
            </div>
        </div>
      </section>

      {/* Section Préférences */}
      <section className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-stone-50/50 border-b border-stone-100 font-bold text-stone-700 flex items-center gap-2">
            <Smartphone size={18} className="text-ochre-600" />
            <span>Expérience Utilisateur</span>
        </div>
        
        <div className="divide-y divide-stone-100">
            {/* Mode Sombre */}
            <div className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
                <div className="flex gap-3 items-center">
                    <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
                        {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <div>
                        <p className="font-medium text-stone-900">Thème d'affichage</p>
                        <p className="text-xs text-stone-500">Basculer entre mode clair et sombre</p>
                    </div>
                </div>
                <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`}
                >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${darkMode ? 'left-7' : 'left-1'}`}></div>
                </button>
            </div>

            {/* Économie de Données */}
            <div className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
                <div className="flex gap-3 items-center">
                    <div className="p-2 bg-ochre-100 rounded-lg text-ochre-600">
                        <WifiOff size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-stone-900">Mode "Faible Connexion"</p>
                        <p className="text-xs text-stone-500">Réduit la qualité des textures pour économiser la bande passante</p>
                    </div>
                </div>
                <button 
                    onClick={() => setDataSaver(!dataSaver)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${dataSaver ? 'bg-forest' : 'bg-stone-200'}`}
                >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${dataSaver ? 'left-7' : 'left-1'}`}></div>
                </button>
            </div>

            {/* Notifications */}
            <div className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
                <div className="flex gap-3 items-center">
                    <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
                        <Bell size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-stone-900">Alertes Bioclimatiques</p>
                        <p className="text-xs text-stone-500">Recevoir des conseils selon la météo locale</p>
                    </div>
                </div>
                <button 
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${notifications ? 'bg-forest' : 'bg-stone-200'}`}
                >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${notifications ? 'left-7' : 'left-1'}`}></div>
                </button>
            </div>
        </div>
      </section>

      {/* Section Stockage Hors-ligne */}
      <section className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-stone-50/50 border-b border-stone-100 font-bold text-stone-700 flex items-center gap-2">
            <HardDrive size={18} className="text-ochre-600" />
            <span>Gestion Hors-ligne</span>
        </div>
        <div className="p-6">
            <div className="flex items-center justify-between mb-6 p-4 bg-stone-50 rounded-lg border border-stone-100">
                <div>
                    <p className="text-xs font-bold text-stone-400 uppercase mb-1">Espace utilisé</p>
                    <p className="text-2xl font-bold text-stone-900">{cacheSize}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-stone-400 uppercase mb-1">Dernière synchro</p>
                    <p className="text-sm font-medium text-stone-800 flex items-center justify-end gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Aujourd'hui, 10:42
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-stone-900 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors shadow-md">
                    <Download size={18} />
                    Télécharger tout le contenu
                </button>
                <button 
                    onClick={handleClearCache}
                    className="flex-1 border border-red-200 text-red-600 bg-red-50 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                >
                    <Trash2 size={18} />
                    Vider le cache
                </button>
            </div>
            <p className="text-xs text-stone-400 mt-3 text-center">
                Permet d'utiliser la Texture-Thèque et le Calculateur sans connexion internet.
            </p>
        </div>
      </section>

      <div className="text-center py-6">
        <p className="text-sm font-bold text-stone-900">AfriBuild Hub</p>
        <p className="text-xs text-stone-400">Version 1.2.0 • Build Bioclimatique</p>
      </div>
    </div>
  );
};

export default Settings;
