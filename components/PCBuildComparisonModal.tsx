
import React from 'react';
import { PCBuild, PCPart } from '../types';
import { calculateTotalBuildPrice, calculateTotalBuildTDP, checkCompatibility } from '../services/logic';
import { X, Zap, Cpu, HardDrive, Layout, Power, Box, Activity, Wind, Database, CheckCircle, AlertTriangle } from 'lucide-react';

interface PCBuildComparisonModalProps {
  buildA: PCBuild;
  buildB: PCBuild;
  onClose: () => void;
}

const PCBuildComparisonModal: React.FC<PCBuildComparisonModalProps> = ({ buildA, buildB, onClose }) => {
  const statsA = {
    price: calculateTotalBuildPrice(buildA),
    tdp: calculateTotalBuildTDP(buildA),
    comp: checkCompatibility(buildA)
  };
  const statsB = {
    price: calculateTotalBuildPrice(buildB),
    tdp: calculateTotalBuildTDP(buildB),
    comp: checkCompatibility(buildB)
  };

  const partTypes: { type: PCPart['type']; icon: any; key: keyof PCBuild }[] = [
    { type: 'CPU', icon: Cpu, key: 'cpu' },
    { type: 'Motherboard', icon: Layout, key: 'motherboard' },
    { type: 'Cooling', icon: Wind, key: 'cooling' },
    { type: 'RAM', icon: Activity, key: 'ram' },
    { type: 'GPU', icon: HardDrive, key: 'gpu' },
    { type: 'Storage', icon: Database, key: 'storage' },
    { type: 'PSU', icon: Power, key: 'psu' },
    { type: 'Case', icon: Box, key: 'cases' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl">
      <div className="bg-slate-900 w-full max-w-5xl rounded-3xl border border-slate-700/50 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center gap-3">
            <Zap className="text-blue-500 animate-pulse" size={24} />
            <h2 className="text-xl font-bold tech-font tracking-tight text-white uppercase italic">Build_Vector_Comparison</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-2 gap-8 relative">
            {/* Divider */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-slate-800 hidden md:block" />

            {/* Build A */}
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-[10px] tech-font text-blue-500 font-black uppercase tracking-widest">DEPLOYMENT_A</span>
                <h3 className="text-2xl font-black text-white uppercase italic">{buildA.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">TOTAL_INVESTMENT</p>
                  <p className="text-lg font-bold tech-font text-emerald-400">₹{statsA.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">THERMAL_TDP</p>
                  <p className="text-lg font-bold tech-font text-blue-400">{statsA.tdp}W</p>
                </div>
              </div>

              <div className="space-y-4">
                {partTypes.map(({ type, icon: Icon, key }) => {
                  const part = buildA[key] as PCPart | undefined;
                  return (
                    <div key={type} className="flex items-center gap-4 p-3 bg-slate-800/30 rounded-xl border border-slate-800">
                      <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">{type}</p>
                        <p className="text-xs font-bold text-white tech-font truncate">{part?.name || '---'}</p>
                      </div>
                      {part && <span className="text-[9px] text-slate-400 tech-font">₹{part.price.toLocaleString('en-IN')}</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Build B */}
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-[10px] tech-font text-cyan-500 font-black uppercase tracking-widest">DEPLOYMENT_B</span>
                <h3 className="text-2xl font-black text-white uppercase italic">{buildB.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">TOTAL_INVESTMENT</p>
                  <p className="text-lg font-bold tech-font text-emerald-400">₹{statsB.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">THERMAL_TDP</p>
                  <p className="text-lg font-bold tech-font text-cyan-400">{statsB.tdp}W</p>
                </div>
              </div>

              <div className="space-y-4">
                {partTypes.map(({ type, icon: Icon, key }) => {
                  const part = buildB[key] as PCPart | undefined;
                  return (
                    <div key={type} className="flex items-center gap-4 p-3 bg-slate-800/30 rounded-xl border border-slate-800">
                      <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">{type}</p>
                        <p className="text-xs font-bold text-white tech-font truncate">{part?.name || '---'}</p>
                      </div>
                      {part && <span className="text-[9px] text-slate-400 tech-font">₹{part.price.toLocaleString('en-IN')}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-950/80 border-t border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statsA.comp.compatible ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">BUILD_A: {statsA.comp.compatible ? 'VALID' : 'CONFLICT'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statsB.comp.compatible ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">BUILD_B: {statsB.comp.compatible ? 'VALID' : 'CONFLICT'}</span>
            </div>
          </div>
          <p className="text-[10px] tech-font text-slate-500 uppercase font-black">Delta: ₹{Math.abs(statsA.price - statsB.price).toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
};

export default PCBuildComparisonModal;
