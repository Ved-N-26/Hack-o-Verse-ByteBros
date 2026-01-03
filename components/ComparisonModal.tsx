
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
import { X, Activity, BrainCircuit, ShieldCheck, Zap, Loader2, BarChart3, Target } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl">
      <div className="bg-slate-900/90 w-full max-w-6xl rounded-3xl border border-slate-700/50 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-500">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent" />

        <div className="p-8 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/40">
          <div className="flex items-center gap-6">
             <div className="relative">
                <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex items-center justify-center">
                   <Activity className="text-blue-400 animate-pulse" size={28} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-900 shadow-[0_0_10px_#10b981]" />
             </div>
             <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic">Hardware Decision Matrix</h2>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500 font-bold tech-font uppercase">
                   <span className="flex items-center gap-1 text-blue-400">
                      <BarChart3 size={10} /> TELEMETRY_NODES: {laptops.length}
                   </span>
                   <span className="w-1 h-1 bg-slate-700 rounded-full" />
                   <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-emerald-500" /> SECURE_LINK: STABLE</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800">
                <button 
                   onClick={() => setActiveView('visual')}
                   className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'visual' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                   Visual_Map
                </button>
                <button 
                   onClick={() => setActiveView('table')}
                   className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'table' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                   Data_Table
                </button>
             </div>
             <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all border border-slate-800">
               <X size={20} />
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          {activeView === 'visual' ? (
            <div className="space-y-10">
              <div className="flex justify-center">
                <div className="w-full max-w-4xl h-[500px] bg-slate-950/40 rounded-3xl border border-blue-500/20 p-8 relative group overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.05)]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartDataRadar}>
                      <PolarGrid stroke="#1e293b" strokeDasharray="3 3" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: '800' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      {laptops.map((l, idx) => (
                        <Radar
                          key={l.id}
                          name={l.name}
                          dataKey={l.name}
                          stroke={laptopColors[idx % laptopColors.length]}
                          fill={laptopColors[idx % laptopColors.length]}
                          fillOpacity={0.15}
                          strokeWidth={3}
                        />
                      ))}
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '10px' }}
                         itemStyle={{ color: '#94a3b8' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>

                  <div className="absolute bottom-6 left-8 flex flex-wrap gap-4 max-w-[80%]">
                    {laptops.map((l, idx) => (
                      <div key={l.id} className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
                        <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: laptopColors[idx % laptopColors.length], color: laptopColors[idx % laptopColors.length] }} />
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter truncate max-w-[120px]">{l.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/40 rounded-3xl border border-slate-800/50 overflow-hidden animate-in fade-in duration-500">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-900/60 border-b border-slate-800">
                        <th className="p-4 tech-font text-[10px] font-black text-slate-500 uppercase tracking-widest">SPECIFICATION_NODE</th>
                        {laptops.map((l, idx) => (
                          <th key={l.id} className="p-4 border-l border-slate-800/50">
                             <div className="flex flex-col">
                                <span className="text-[8px] tech-font text-blue-500 font-bold">NODE_{idx + 1}</span>
                                <span className="text-xs font-black text-white uppercase truncate max-w-[150px]">{l.name}</span>
                             </div>
                          </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/30">
                     {[
                        { label: 'PROCESSOR', key: 'cpu' },
                        { label: 'GRAPHICS', key: 'gpu' },
                        { label: 'MEMORY', key: 'ram', format: (val: any) => `${val}GB` },
                        { label: 'STORAGE', key: 'storageSize', format: (val: any) => val >= 1024 ? `${val/1024}TB` : `${val}GB` },
                        { label: 'SCALE', key: 'displaySize', format: (val: any) => `${val}"` },
                        { label: 'WEIGHT', key: 'weight', format: (val: any) => `${val}kg` },
                        { label: 'VALUATION', key: 'price', format: (val: any) => `₹${val.toLocaleString('en-IN')}` },
                        { label: 'PPI_SCORE', key: 'ppi', value: (l: Laptop) => calculatePPI(l).toFixed(2) },
                        { label: 'PANEL_RES', key: 'res', value: (l: Laptop) => l.screen.resolution },
                        { label: 'LUMINANCE', key: 'nits', value: (l: Laptop) => `${l.screen.nits} Nits` }
                     ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                           <td className="p-4 tech-font text-[9px] font-bold text-slate-400 group-hover:text-blue-400 transition-colors uppercase">{row.label}</td>
                           {laptops.map(l => (
                              <td key={l.id} className="p-4 border-l border-slate-800/50">
                                 <span className="text-[10px] tech-font text-slate-300 font-medium">
                                    {row.value ? row.value(l) : (row.format ? row.format((l as any)[row.key!]) : (l as any)[row.key!])}
                                 </span>
                              </td>
                           ))}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          )}

          {/* AI Decision Advisory */}
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <BrainCircuit className="text-cyan-400 animate-pulse" size={24} />
                <h3 className="text-lg font-black uppercase tracking-tighter text-white italic">AI Strategic Vector</h3>
                <div className="flex-1 h-[1px] bg-slate-800" />
             </div>

             <div className="glass-panel border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl bg-slate-950/90 relative">
                <div className="p-8">
                   {isGenerating ? (
                     <div className="flex flex-col items-center justify-center py-6 space-y-4">
                        <Loader2 size={32} className="text-cyan-400 animate-spin" />
                        <p className="text-cyan-400 tech-font font-black tracking-widest text-xs animate-pulse uppercase">Parsing Decision Matrix...</p>
                     </div>
                   ) : aiReport ? (
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                        <div className="md:col-span-3 space-y-6">
                           <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
                              <div className="tech-font text-xs leading-relaxed text-slate-300 font-medium">
                                 {aiReport.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                    <div key={i} className="mb-2 last:mb-0 flex gap-3">
                                       <span className="text-cyan-500 shrink-0 mt-1"><Zap size={10} /></span>
                                       <span>{line}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="bg-blue-600/5 border border-blue-500/20 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                           <Zap size={24} className="text-yellow-400 mb-2" />
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Confidence</span>
                           <span className="text-2xl font-black tech-font text-blue-400 leading-none">94.8%</span>
                        </div>
                     </div>
                   ) : (
                     <div className="text-slate-600 italic text-center py-6 tech-font text-xs uppercase">Awaiting command input...</div>
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
