
import React, { useState, useEffect } from 'react';
import { Section } from './types';
import LaptopSection from './components/LaptopSection';
import Chatbot from './components/Chatbot';
import PCBuilderSection from './components/PCBuilderSection';
import { Laptop, MessageSquare, Terminal, Github, UserCircle, Settings, Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.LAPTOPS);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-500">
      {/* Decorative Blur Spots */}
      <div className="fixed top-[-10%] right-[-10%] w-1/3 h-1/3 bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="fixed bottom-[-10%] left-[-10%] w-1/3 h-1/3 bg-cyan-600/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Navigation */}
      <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg ${theme === 'dark' ? 'bg-blue-600 shadow-blue-500/20' : 'bg-indigo-600 shadow-indigo-500/30'}`}>
              <Terminal size={18} className="text-white" />
            </div>
            <h1 className={`text-xl font-bold tracking-tight transition-colors ${theme === 'dark' ? 'bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400' : 'text-slate-900'}`}>
              TechCompare <span className={theme === 'dark' ? 'text-blue-500 tech-font' : 'text-indigo-600 tech-font'}>AI</span>
            </h1>
          </div>
          
          <div className={`hidden md:flex items-center gap-2 p-1.5 rounded-2xl border shadow-inner transition-colors ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-indigo-100 shadow-indigo-100/20'}`}>
            {[
              { id: Section.LAPTOPS, label: 'Laptops', icon: Laptop, color: 'blue' },
              { id: Section.BUILDER, label: 'PC Builder', icon: Settings, color: 'cyan' },
              { id: Section.CONCIERGE, label: 'AI Concierge', icon: MessageSquare, color: 'violet' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all transform active:scale-95 ${
                  activeSection === tab.id 
                  ? (theme === 'dark' 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/40 translate-y-[-1px]' 
                      : 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/40 translate-y-[-1px]')
                  : (theme === 'dark'
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50')
                }`}
              >
                <tab.icon size={16} className={activeSection === tab.id ? 'animate-bounce' : ''} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all group overflow-hidden ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-blue-400' : 'bg-white border-indigo-200 text-indigo-400 hover:text-indigo-600 shadow-lg shadow-indigo-100'}`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                 <div className={`absolute transition-all duration-500 transform ${theme === 'dark' ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-90'}`}>
                    <Moon size={18} />
                 </div>
                 <div className={`absolute transition-all duration-500 transform ${theme === 'light' ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-10 opacity-0 -rotate-90'}`}>
                    <Sun size={18} />
                 </div>
              </div>
            </button>

            <button className={`${theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-indigo-600'} transition-colors hover:rotate-12 transform hidden sm:block`}>
              <Github size={20} />
            </button>
            <button className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border transition-all shadow-lg group ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-indigo-200 shadow-indigo-100'}`}>
              <UserCircle size={18} className={`${theme === 'dark' ? 'text-blue-400' : 'text-indigo-500'} group-hover:scale-110 transition-transform`} />
              <span className="text-[10px] font-black uppercase tracking-widest tech-font">Admin</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 relative z-10">
        <div key={activeSection} className="section-fade">
          {activeSection === Section.LAPTOPS && <LaptopSection />}
          {activeSection === Section.BUILDER && <PCBuilderSection />}
          {activeSection === Section.CONCIERGE && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-500">
                <div className={`inline-block p-1 rounded-full mb-4 shadow-lg ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-blue-500/20' : 'bg-gradient-to-r from-indigo-500 to-violet-500 shadow-indigo-500/30'}`}>
                    <div className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} px-6 py-2 rounded-full`}>
                         <h2 className={`text-2xl font-bold uppercase tracking-[0.3em] tech-font ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Hardware Concierge</h2>
                    </div>
                </div>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600 font-medium'} max-w-md mx-auto italic`}>Neural-linked advisory for creative professionals and high-performance gaming deployments.</p>
              </div>
              <Chatbot context={{ 
                activeSection, 
                timestamp: new Date().toISOString() 
              }} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t py-10 px-4 mt-auto transition-colors ${theme === 'dark' ? 'bg-slate-950/50 border-slate-900/80' : 'bg-white/80 border-indigo-100 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)]'}`} />
            <p className={`text-xs font-bold tech-font uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>System_Status: Operational</p>
          </div>
          <p className={`text-[10px] uppercase font-black tracking-widest ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>© 2024 TechCompare AI // IN_REGION_SOUTH</p>
          <div className={`flex gap-8 text-[9px] uppercase tracking-[0.2em] font-black ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-indigo-600'}`}>Data_Protocol</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-indigo-400'}`}>API_Access</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'}`}>Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
