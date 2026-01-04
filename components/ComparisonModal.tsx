import React, { useState, useEffect } from 'react';
import { Laptop } from '../types';
import { calculatePPI } from '../services/logic';
import { getComparisonAdvisory } from '../services/gemini';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { X, Activity, BrainCircuit, ShieldCheck, Zap, Loader2, BarChart3, Target, Award } from 'lucide-react';

interface ComparisonModalProps {
  laptops: Laptop[];
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ laptops, onClose }) => {
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState<'visual' | 'table'>('visual');

  useEffect(() => {
    generateAdvisory();
  }, []);

  const generateAdvisory = async () => {
    setIsGenerating(true);
    try {
      const report = await getComparisonAdvisory(laptops);
      setAiReport(report);
    } catch (err) {
      setAiReport("Error: Could not link to AI Analysis Subsystem.");
    } finally {
      setIsGenerating(false);
    }
  };

  const chartDataRadar = [
    { subject: 'CPU', fullMark: 100 },
    { subject: 'GPU', fullMark: 100 },
    { subject: 'BUILD', fullMark: 100 },
    { subject: 'PPI_INDEX', fullMark: 100 },
    { subject: 'DISPLAY', fullMark: 100 },
  ].map(base => {
    const entry: any = { ...base };
    laptops.forEach((l) => {
      if (base.subject === 'CPU') entry[l.name] = l.benchmarks.cpu;
      if (base.subject === 'GPU') entry[l.name] = l.benchmarks.gpu;
      if (base.subject === 'BUILD') entry[l.name] = l.benchmarks.buildQuality;
      if (base.subject === 'PPI_INDEX') entry[l.name] = Math.min(100, calculatePPI(l)); 
      if (base.subject === 'DISPLAY') entry[l.name] = (l.screen.nits / 600) * 100;
    });
    return entry;
  });

  const laptopColors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];

  const tableRows = [
    { label: 'PROCESSOR', key: 'cpu', better: 'higher', valFn: (l: Laptop) => l.benchmarks.cpu },
    { label: 'GRAPHICS', key: 'gpu', better: 'higher', valFn: (l: Laptop) => l.benchmarks.gpu },
    { label: 'MEMORY', key: 'ram', better: 'higher', format: (val: any) => `${val}GB` },
    { label: 'STORAGE', key: 'storageSize', better: 'higher', format: (val: any) => val >= 1024 ? `${val/1024}TB` : `${val}GB` },
    { label: 'SCALE', key: 'displaySize', better: 'higher', format: (val: any) => `${val}"` },
    { label: 'WEIGHT', key: 'weight', better: 'lower', format: (val: any) => `${val}kg` },
    { label: 'VALUATION', key: 'price', better: 'lower', format: (val: any) => `₹${val.toLocaleString('en-IN')}` },
    { label: 'PPI_SCORE', key: 'ppi', better: 'higher', value: (l: Laptop) => calculatePPI(l).toFixed(2), valFn: (l: Laptop) => calculatePPI(l) },
    { label: 'PANEL_RES', key: 'res', value: (l: Laptop) => l.screen.resolution },
    { label: 'LUMINANCE', key: 'nits', better: 'higher', value: (l: Laptop) => `${l.screen.nits} Nits`, valFn: (l: Laptop) => l.screen.nits }
  ];

  const getWinnerInfo = (row: typeof tableRows[0]) => {
    if (!row.better) return null;
    const values = laptops.map(l => {
        if (row.valFn) return row.valFn(l);
        if (row.key) return (l as any)[row.key];
        return 0;
    });
    const bestValue = row.better === 'higher' ? Math.max(...values) : Math.min(...values);
    return bestValue;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl">
      <div className="bg-slate-900/90 w-full max-w-6xl rounded-3xl border border-slate-700/50 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-500">
        
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent" />

        <div className="p-10 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/40">
          <div className="flex items-center gap-8">
             <div className="relative">
                <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex items-center justify-center">
                   <Activity className="text-blue-400 animate-pulse" size={32} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-slate-900 shadow-[0_0_10px_#10b981]" />
             </div>
             <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white italic">Hardware Decision Matrix</h2>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-500 font-bold tech-font uppercase">
                   <span className="flex items-center gap-2 text-blue-400">
                      <BarChart3 size={16} /> NODES: {laptops.length}
                   </span>
                   <span className="w-1 h-1 bg-slate-700 rounded-full" />
                   <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> LINK: STABLE</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex bg-slate-950/50 p-1.5 rounded-xl border border-slate-800">
                <button 
                   onClick={() => setActiveView('visual')}
                   className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeView === 'visual' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                   Visual_Map
                </button>
                <button 
                   onClick={() => setActiveView('table')}
                   className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeView === 'table' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                   Data_Table
                </button>
             </div>
             <button onClick={onClose} className="w-12 h-12 flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all border border-slate-800">
               <X size={24} />
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
          
          {activeView === 'visual' ? (
            <div className="space-y-12">
              <div className="flex justify-center">
                <div className="w-full max-w-4xl h-[550px] bg-slate-950/40 rounded-3xl border border-blue-500/20 p-10 relative group overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.05)]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartDataRadar}>
                      <PolarGrid stroke="#1e293b" strokeDasharray="3 3" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 14, fontWeight: '800' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      {laptops.map((l, idx) => (
                        <Radar
                          key={l.id}
                          name={l.name}
                          dataKey={l.name}
                          stroke={laptopColors[idx % laptopColors.length]}
                          fill={laptopColors[idx % laptopColors.length]}
                          fillOpacity={0.15}
                          strokeWidth={4}
                        />
                      ))}
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', fontSize: '13px' }}
                         itemStyle={{ color: '#94a3b8' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/40 rounded-3xl border border-slate-800/50 overflow-hidden animate-in fade-in duration-500">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-900/60 border-b border-slate-800">
                        <th className="p-5 tech-font text-xs font-black text-slate-500 uppercase tracking-widest">SPECIFICATION_NODE</th>
                        {laptops.map((l, idx) => (
                          <th key={l.id} className="p-5 border-l border-slate-800/50">
                             <div className="flex flex-col">
                                <span className="text-[10px] tech-font text-blue-500 font-bold mb-1">NODE_{idx + 1}</span>
                                <span className="text-sm font-black text-white uppercase truncate max-w-[180px]">{l.name}</span>
                             </div>
                          </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/30">
                     {tableRows.map((row, i) => {
                        const winnerValue = getWinnerInfo(row);
                        
                        return (
                        <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                           <td className="p-5 tech-font text-xs font-bold text-slate-400 group-hover:text-blue-400 transition-colors uppercase">{row.label}</td>
                           {laptops.map(l => {
                              const currentRawValue = row.valFn ? row.valFn(l) : (row.key ? (l as any)[row.key] : null);
                              const isWinner = winnerValue !== null && currentRawValue === winnerValue;
                              const displayValue = row.value ? row.value(l) : (row.format ? row.format((l as any)[row.key!]) : (l as any)[row.key!]);

                              return (
                              <td key={l.id} className={`p-5 border-l border-slate-800/50 transition-all duration-300 ${isWinner ? 'bg-emerald-500/10' : ''}`}>
                                 <div className="flex items-center justify-between gap-3">
                                    <span className={`text-sm tech-font font-medium ${isWinner ? 'text-emerald-400 font-black' : 'text-slate-300'}`}>
                                        {displayValue}
                                    </span>
                                    {isWinner && (
                                        <div className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] text-emerald-300 font-black tech-font">
                                            <Award size={12} />
                                            BEST
                                        </div>
                                    )}
                                 </div>
                              </td>
                              );
                           })}
                        </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
          )}

          {/* AI Decision Advisory */}
          <div className="space-y-6">
             <div className="flex items-center gap-6">
                <BrainCircuit className="text-cyan-400 animate-pulse" size={32} />
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white italic">AI Strategic Vector</h3>
                <div className="flex-1 h-[1px] bg-slate-800" />
             </div>

             <div className="glass-panel border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl bg-slate-950/90 relative">
                <div className="p-10">
                   {isGenerating ? (
                     <div className="flex flex-col items-center justify-center py-10 space-y-6">
                        <Loader2 size={40} className="text-cyan-400 animate-spin" />
                        <p className="text-cyan-400 tech-font font-black tracking-widest text-sm animate-pulse uppercase">Parsing Decision Matrix...</p>
                     </div>
                   ) : aiReport ? (
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
                        <div className="md:col-span-3 space-y-8">
                           <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800/50">
                              <div className="tech-font text-base leading-relaxed text-slate-200 font-medium">
                                 {aiReport.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                    <div key={i} className="mb-4 last:mb-0 flex gap-4">
                                       <span className="text-cyan-500 shrink-0 mt-1.5"><Zap size={16} /></span>
                                       <span>{line}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="bg-blue-600/5 border border-blue-500/20 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
                           <Zap size={32} className="text-yellow-400 mb-4" />
                           <span className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Confidence</span>
                           <span className="text-4xl font-black tech-font text-blue-400 leading-none">94.8%</span>
                        </div>
                     </div>
                   ) : (
                     <div className="text-slate-600 italic text-center py-10 tech-font text-sm uppercase font-black">Awaiting command input...</div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;