import React, { useState } from 'react';
import { LayoutDashboard, Library, Calculator, Settings as SettingsIcon, Menu, Layers, Leaf } from 'lucide-react';
import Dashboard from './components/Dashboard';
import MaterialLibrary from './components/MaterialLibrary';
import CarbonCalculator from './components/CarbonCalculator';
import TextureVisualizer from './components/TextureVisualizer';
import Settings from './components/Settings';

type View = 'dashboard' | 'materials' | 'visualizer' | 'calculator' | 'settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'materials': return <MaterialLibrary />;
      case 'visualizer': return <TextureVisualizer />;
      case 'calculator': return <CarbonCalculator />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: React.ElementType; label: string }) => (
    <button 
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
        ${currentView === view 
          ? 'bg-stone-200/50 text-ochre-600 border-r-4 border-ochre-600' 
          : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'}`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 h-screen w-64 bg-white border-r border-stone-200 z-30 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-2 border-b border-stone-100">
          <div className="bg-forest p-2 rounded-lg">
            <Leaf className="text-white" size={20} />
          </div>
          <div>
            <span className="block text-xl font-bold tracking-tight text-stone-900 leading-none">AfriBuild</span>
            <span className="text-xs text-ochre-600 font-bold uppercase tracking-widest">Hub</span>
          </div>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          <NavItem view="dashboard" icon={LayoutDashboard} label="Tableau de bord" />
          <NavItem view="visualizer" icon={Layers} label="Visualiseur 3D" />
          <NavItem view="materials" icon={Library} label="Texture-Thèque" />
          <NavItem view="calculator" icon={Calculator} label="Impact Carbone" />
          <NavItem view="settings" icon={SettingsIcon} label="Paramètres" />
        </nav>

        <div className="absolute bottom-0 w-full p-6 bg-stone-50 border-t border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ochre-200 flex items-center justify-center text-ochre-800 font-bold">
              AR
            </div>
            <div>
              <p className="text-sm font-bold text-stone-800">Amina R.</p>
              <p className="text-xs text-stone-500">Architecte Lead</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex-none flex items-center justify-between p-4 bg-white border-b border-stone-200 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Leaf className="text-forest" size={20} />
            <span className="font-bold text-stone-900">AfriBuild Hub</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="text-stone-600" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
