
import React from 'react';
import { Laptop } from '../types';
import { X, Play } from 'lucide-react';

interface ComparisonTrayProps {
  items: Laptop[];
  onRemove: (id: string) => void;
  onCompare: () => void;
}

const ComparisonTray: React.FC<ComparisonTrayProps> = ({ items, onRemove, onCompare }) => {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4">
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-4 flex items-center gap-4">
        <div className="flex-1 flex gap-3 overflow-x-auto pb-1 custom-scrollbar">
          {items.map((item) => (
            <div key={item.id} className="relative flex-shrink-0 group">
              <div className="w-14 h-14 rounded-lg bg-slate-800 border border-slate-600 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={() => onRemove(item.id)}
                className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {items.length < 4 && (
             <div className="w-14 h-14 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-xs text-center">
                Add More
             </div>
          )}
        </div>
        
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[10px] text-slate-400 uppercase font-bold">{items.length} Selected</span>
          <button 
            onClick={onCompare}
            disabled={items.length < 2}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-lg shadow-blue-500/20"
          >
            <Play size={18} fill="currentColor" />
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTray;
