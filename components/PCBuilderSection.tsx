import React, { useState, useMemo } from 'react';
import { MOCK_PARTS } from '../constants';
import { PCBuild, PCPart } from '../types';
import { checkCompatibility, calculateTotalBuildPrice, calculateTotalBuildTDP } from '../services/logic';
import PCBuildComparisonModal from './PCBuildComparisonModal';
import { 
  Cpu, HardDrive, Layout, Power, Zap, AlertTriangle, 
  CheckCircle, Trash2, Box, Activity, Wind, 
  Database, Settings, ListChecks, Layers, ArrowLeftRight, ChevronRight
} from 'lucide-react';

const PCBuilderSection: React.FC = () => {
  const [buildA, setBuildA] = useState<PCBuild>({ id: 'build-a', name: 'Elite Performance A' });
  const [buildB, setBuildB] = useState<PCBuild>({ id: 'build-b', name: 'Modular Workstation B' });
  const [activeBuildId, setActiveBuildId] = useState<'build-a' | 'build-b'>('build-a');
  const [showComparison, setShowComparison] = useState(false);

  const activeBuild = activeBuildId === 'build-a' ? buildA : buildB;
  const setBuild = activeBuildId === 'build-a' ? setBuildA : setBuildB;

  const addPart = (part: PCPart) => {
    const key = part.type.toLowerCase() + (part.type === 'Case' ? 's' : '');
    setBuild({ ...activeBuild, [key]: part });
  };

  const removePart = (type: string) => {
    const key = type.toLowerCase() + (type === 'Case' ? 's' : '');
    const newBuild = { ...activeBuild };
    delete (newBuild as any)[key];
    setBuild(newBuild);
  };

  const stats = useMemo(() => ({
    a: {
      price: calculateTotalBuildPrice(buildA),
      tdp: calculateTotalBuildTDP(buildA),
      comp: checkCompatibility(buildA)
    },
    b: {
      price: calculateTotalBuildPrice(buildB),
      tdp: calculateTotalBuildTDP(buildB),
      comp: checkCompatibility(buildB)
    }
  }), [buildA, buildB]);

  const activeStats = activeBuildId === 'build-a' ? stats.a : stats.b;

  const partTypes: { type: PCPart['type']; icon: any }[] = [
    { type: 'CPU', icon: Cpu },
    { type: 'Motherboard', icon: Layout },
    { type: 'Cooling', icon: Wind },
    { type: 'RAM', icon: Activity },
    { type: 'GPU', icon: HardDrive },
    { type: 'Storage', icon: Database },
    { type: 'PSU', icon: Power },
    { type: 'Case', icon: Box },
  ];

  return (
    <div className="space-y-8 section-fade">
      {/* Build Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 shadow-inner w-full sm:w-auto">
          <button 
            onClick={() => setActiveBuildId('build-a')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeBuildId === 'build-a' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105 z-10' 
              : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${stats.a.comp.compatible ? 'bg-emerald-400' : 'bg-red-400'}`} />
            Deployment_A
          </button>
          <button 
            onClick={() => setActiveBuildId('build-b')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeBuildId === 'build-b' 
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20 scale-105 z-10' 
              : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${stats.b.comp.compatible ? 'bg-emerald-400' : 'bg-red-400'}`} />
            Deployment_B
          </button>
        </div>

        <button 
          onClick={() => setShowComparison(true)}
          className="flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-700 hover:border-blue-500/50 transition-all active:scale-95 group shadow-lg"
        >
          <ArrowLeftRight size={14} className="group-hover:rotate-180 transition-transform duration-500" />
          Compare_Dual_Configurations
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configuration List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel border border-slate-700/50 rounded-3xl p-8 relative overflow-hidden bg-slate-950/40">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${activeBuildId === 'build-a' ? 'bg-blue-600/20 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-cyan-600/20 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'}`}>
                    <Settings size={22} className="animate-spin-slow" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black tech-font tracking-tight text-white italic uppercase">{activeBuild.name}</h3>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Terminal_Active: {activeBuildId.toUpperCase()}</p>
                 </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partTypes.map(({ type, icon: Icon }) => {
                const key = type.toLowerCase() + (type === 'Case' ? 's' : '');
                const selectedPart = (activeBuild as any)[key] as PCPart | undefined;

                return (
                  <div 
                    key={type} 
                    className={`p-5 rounded-2xl border transition-all duration-300 h-full flex flex-col ${
                      selectedPart 
                        ? (activeBuildId === 'build-a' ? 'bg-blue-600/10 border-blue-500/40' : 'bg-cyan-600/10 border-cyan-500/40') 
                        : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${selectedPart ? (activeBuildId === 'build-a' ? 'bg-blue-500/20 text-blue-400' : 'bg-cyan-500/20 text-cyan-400') : 'bg-slate-800 text-slate-500'}`}>
                          <Icon size={18} />
                        </div>
                        <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{type}</span>
                      </div>
                      {selectedPart && (
                        <button onClick={() => removePart(type)} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {selectedPart ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold tech-font text-white leading-tight">{selectedPart.name}</h4>
                        <div className="flex items-center justify-between mt-3 bg-black/30 p-2 rounded-lg">
                           <span className="text-[11px] text-emerald-400 font-bold tech-font">₹{selectedPart.price.toLocaleString('en-IN')}</span>
                           {selectedPart.tdp && <span className="text-[9px] text-slate-500 tech-font">{selectedPart.tdp}W_TDP</span>}
                           {selectedPart.socket && <span className="text-[9px] text-blue-400 tech-font">{selectedPart.socket}</span>}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 flex-1">
                         <div className="flex-1 overflow-y-auto max-h-[160px] custom-scrollbar pr-2 space-y-2">
                          {MOCK_PARTS.filter(p => p.type === type).map(p => (
                            <button 
                              key={p.id} 
                              onClick={() => addPart(p)}
                              className="w-full text-left p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/60 hover:border-blue-500/50 transition-all flex items-center justify-between group"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="text-[10px] font-bold text-slate-200 truncate group-hover:text-white">{p.name}</p>
                                <div className="flex items-center gap-3 mt-1">
                                   <p className="text-[9px] text-emerald-500 tech-font">₹{p.price.toLocaleString('en-IN')}</p>
                                   {p.tdp && <span className="text-[8px] text-slate-500 tech-font">{p.tdp}W</span>}
                                   {p.socket && <span className="text-[8px] text-blue-500/70 tech-font">{p.socket}</span>}
                                </div>
                              </div>
                              <ChevronRight size={12} className="text-slate-600 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" />
                            </button>
                          ))}
                         </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Build Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden h-full flex flex-col sticky top-24">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <Layers size={18} className={activeBuildId === 'build-a' ? 'text-blue-400' : 'text-cyan-400'} />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Build_Telemetry</h3>
               </div>
               <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor] ${activeBuildId === 'build-a' ? 'bg-blue-500 text-blue-500' : 'bg-cyan-500 text-cyan-500'}`} />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">REAL_TIME</span>
               </div>
            </div>
            
            <div className="space-y-8 flex-1">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-6 bg-slate-950/60 border border-slate-800 rounded-2xl group hover:border-emerald-500/30 transition-colors">
                  <p className="text-[9px] text-slate-500 font-black uppercase mb-2 tracking-widest">Total_Investment</p>
                  <p className="text-3xl font-bold tech-font text-emerald-400">₹{activeStats.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-6 bg-slate-950/60 border border-slate-800 rounded-2xl group hover:border-blue-500/30 transition-colors">
                  <p className="text-[9px] text-slate-500 font-black uppercase mb-2 tracking-widest">Energy_Vector</p>
                  <div className="flex items-end gap-2">
                     <p className={`text-3xl font-bold tech-font ${activeBuildId === 'build-a' ? 'text-blue-400' : 'text-cyan-400'}`}>{activeStats.tdp}W</p>
                     <span className="text-[9px] text-slate-600 tech-font mb-1 italic">NOMINAL_TDP</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-2 mb-2">
                    <ListChecks size={14} className="text-slate-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Constraint_Validator</span>
                 </div>
                 
                 <div className={`p-6 rounded-2xl border transition-all duration-500 ${activeStats.comp.compatible ? 'bg-emerald-500/5 border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' : 'bg-red-500/5 border-red-500/20 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]'}`}>
                   <div className="flex items-center gap-3 mb-4">
                     {activeStats.comp.compatible ? (
                       <CheckCircle className="text-emerald-500" size={20} />
                     ) : (
                       <AlertTriangle className="text-red-500 animate-bounce" size={20} />
                     )}
                     <span className={`text-xs font-black uppercase tracking-widest ${activeStats.comp.compatible ? 'text-emerald-500' : 'text-red-500'}`}>
                       {activeStats.comp.compatible ? 'Topology_Sync_Optimal' : 'Hardware_Conflict'}
                     </span>
                   </div>
                   <div className="space-y-3">
                      {activeStats.comp.compatible ? (
                        <p className="text-[11px] text-slate-400 leading-relaxed italic">
                          All hardware handshakes verified. Power delivery is within stable operating parameters.
                        </p>
                      ) : (
                        activeStats.comp.issues.map((issue, i) => (
                          <div key={i} className="flex gap-3 text-[11px] text-red-400/90 leading-tight">
                             <span className="mt-1 shrink-0"><Zap size={12} /></span>
                             <span className="tech-font">{issue}</span>
                          </div>
                        ))
                      )}
                   </div>
                 </div>
              </div>

              <div className="space-y-6 mt-auto">
                 <button 
                   className={`w-full group relative text-white font-bold py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.2em] border-t border-white/10 active:scale-95 disabled:opacity-30 disabled:grayscale overflow-hidden ${activeBuildId === 'build-a' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30' : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30'}`}
                   onClick={() => alert("Deployment manifest generated.")}
                   disabled={!activeStats.comp.compatible || activeStats.price === 0}
                 >
                   <span className="relative z-10">Execute_Protocol_{activeBuildId === 'build-a' ? 'A' : 'B'}</span>
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showComparison && (
        <PCBuildComparisonModal 
          buildA={buildA} 
          buildB={buildB} 
          onClose={() => setShowComparison(false)} 
        />
      )}
    </div>
  );
};

export default PCBuilderSection;