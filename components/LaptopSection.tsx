
import React, { useState, useMemo } from 'react';
import { MOCK_LAPTOPS } from '../constants';
import { Laptop } from '../types';
import { calculatePPI } from '../services/logic';
import { extractLaptopsFromBatch } from '../services/gemini';
import { 
  Plus, Check, Laptop as LaptopIcon, Terminal, Activity, 
  Monitor, Cpu, HardDrive, ShieldCheck, Link as LinkIcon, 
  Globe, Loader2, PlayCircle, X, Layers, Filter, 
  ChevronDown, Search, Weight, Ruler, Scale, ChevronRight
} from 'lucide-react';
import ComparisonTray from './ComparisonTray';
import ComparisonModal from './ComparisonModal';

const LaptopSection: React.FC = () => {
  const [laptops, setLaptops] = useState<Laptop[]>(MOCK_LAPTOPS);
  const [selectedLaptops, setSelectedLaptops] = useState<Laptop[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  
  // Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    brands: [] as string[],
    ram: [] as number[],
    display: [] as string[], // 'small', 'medium', 'large'
    storage: [] as number[],
    cpuBrand: [] as string[], // 'Intel', 'AMD', 'Apple'
    weightRange: [] as string[], // 'ultralight', 'balanced', 'heavy'
    priceRange: 600000,
  });

  const [urlInput, setUrlInput] = useState('');
  const [stagedLinks, setStagedLinks] = useState<string[]>([]);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);
  const [importStatus, setImportStatus] = useState<string[]>([]);

  // Derived Filter Options
  const brands = useMemo(() => Array.from(new Set(MOCK_LAPTOPS.map(l => l.brand))), []);
  
  const filteredLaptops = useMemo(() => {
    return laptops.filter(l => {
      const matchSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBrand = filters.brands.length === 0 || filters.brands.includes(l.brand);
      const matchRam = filters.ram.length === 0 || filters.ram.includes(l.ram);
      const matchStorage = filters.storage.length === 0 || filters.storage.includes(l.storageSize);
      const matchPrice = l.price <= filters.priceRange;
      
      const matchDisplay = filters.display.length === 0 || filters.display.some(d => {
        if (d === 'small') return l.displaySize < 14;
        if (d === 'medium') return l.displaySize >= 14 && l.displaySize <= 15.6;
        if (d === 'large') return l.displaySize > 15.6;
        return true;
      });

      const matchCPU = filters.cpuBrand.length === 0 || filters.cpuBrand.some(c => l.cpu.includes(c));
      
      const matchWeight = filters.weightRange.length === 0 || filters.weightRange.some(w => {
        if (w === 'ultralight') return l.weight < 1.4;
        if (w === 'balanced') return l.weight >= 1.4 && l.weight <= 1.9;
        if (w === 'heavy') return l.weight > 1.9;
        return true;
      });

      return matchSearch && matchBrand && matchRam && matchStorage && matchPrice && matchDisplay && matchCPU && matchWeight;
    });
  }, [laptops, searchQuery, filters]);

  const toggleFilter = (category: keyof typeof filters, value: any) => {
    setFilters(prev => {
      const current = prev[category] as any[];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const toggleSelection = (laptop: Laptop) => {
    if (selectedLaptops.find(l => l.id === laptop.id)) {
      setSelectedLaptops(selectedLaptops.filter(l => l.id !== laptop.id));
    } else if (selectedLaptops.length < 4) {
      setSelectedLaptops([...selectedLaptops, laptop]);
    }
  };

  const addLinkToStage = () => {
    const trimmed = urlInput.trim();
    if (trimmed && !stagedLinks.includes(trimmed)) {
      setStagedLinks([...stagedLinks, trimmed]);
      setUrlInput('');
    }
  };

  const removeStagedLink = (index: number) => {
    setStagedLinks(stagedLinks.filter((_, i) => i !== index));
  };

  const processBatch = async () => {
    if (stagedLinks.length === 0) return;
    setIsBatchProcessing(true);
    setImportStatus(['INITIATING_TURBO_BATCH...', 'BYPASSING_BOT_CHALLENGE...', `TARGETING_${stagedLinks.length}_NODES...`]);
    try {
      const newImportedLaptops = await extractLaptopsFromBatch(stagedLinks);
      if (newImportedLaptops.length > 0) {
        setLaptops(prev => [...newImportedLaptops, ...prev]);
        setImportStatus(prev => [...prev, `BATCH_SUCCESS: ${newImportedLaptops.length}_NODES_SYNCED`]);
        const batchToSelect = newImportedLaptops.slice(0, 4);
        setSelectedLaptops(batchToSelect);
        if (batchToSelect.length >= 2) setIsModalOpen(true);
      } else {
        setImportStatus(prev => [...prev, 'ERROR: BATCH_EXTRACTION_RETURNED_NULL']);
      }
      setStagedLinks([]);
    } catch (error) {
      setImportStatus(prev => [...prev, 'CRITICAL: SEQUENCER_HANDSHAKE_TIMEOUT']);
    } finally {
      setIsBatchProcessing(false);
      setTimeout(() => setImportStatus([]), 5000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 section-fade">
      {/* Filters Sidebar */}
      <aside className="lg:w-72 shrink-0">
        <div className="glass-panel border-slate-800 rounded-3xl p-6 bg-slate-950/40 sticky top-24 transition-all duration-300">
          <button 
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="w-full flex items-center justify-between mb-2 group"
          >
            <div className="flex items-center gap-2">
              <Filter size={14} className={isFiltersExpanded ? 'text-blue-400' : 'text-slate-500'} />
              <h3 className={`text-xs font-black tech-font uppercase tracking-widest transition-colors ${isFiltersExpanded ? 'text-blue-400' : 'text-slate-300 group-hover:text-blue-300'}`}>
                Filter_Grid
              </h3>
            </div>
            <div className={`transition-transform duration-300 ${isFiltersExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown size={16} className="text-slate-500 group-hover:text-blue-400" />
            </div>
          </button>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isFiltersExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2 pb-2">
              <div className="flex justify-end">
                <button 
                  onClick={() => setFilters({ brands: [], ram: [], display: [], storage: [], cpuBrand: [], weightRange: [], priceRange: 600000 })}
                  className="text-[9px] font-bold text-slate-500 hover:text-white transition-colors"
                >
                  RESET_ALL
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={12} />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search models..."
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-[10px] tech-font focus:outline-none focus:border-blue-500/50"
                />
              </div>

              {/* Price Slider */}
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Price Range: ₹{filters.priceRange.toLocaleString()}</p>
                <input 
                  type="range" min="30000" max="600000" step="5000"
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
                  className="w-full accent-blue-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Brands */}
              <FilterGroup title="Brands" options={brands} selected={filters.brands} onToggle={(v) => toggleFilter('brands', v)} />

              {/* RAM */}
              <FilterGroup title="Memory (RAM)" options={[8, 16, 32, 64]} selected={filters.ram} onToggle={(v) => toggleFilter('ram', v)} suffix="GB" />

              {/* Storage */}
              <FilterGroup title="Storage Capacity" options={[256, 512, 1024, 2048, 4096]} selected={filters.storage} onToggle={(v) => toggleFilter('storage', v)} formatLabel={(v) => v >= 1024 ? `${v/1024}TB` : `${v}GB`} />

              {/* CPU Brand */}
              <FilterGroup title="Architecture" options={['Intel', 'AMD', 'Apple']} selected={filters.cpuBrand} onToggle={(v) => toggleFilter('cpuBrand', v)} />

              {/* Display Size */}
              <FilterGroup 
                title="Panel Scale" 
                options={[{id: 'small', l: '< 14"'}, {id: 'medium', l: '14-15.6"'}, {id: 'large', l: '> 15.6"'}]} 
                selected={filters.display} 
                onToggle={(v) => toggleFilter('display', v)}
                isObject 
              />

              {/* Weight */}
              <FilterGroup 
                title="Mass Vector" 
                options={[{id: 'ultralight', l: '< 1.4kg'}, {id: 'balanced', l: '1.4-1.9kg'}, {id: 'heavy', l: '> 1.9kg'}]} 
                selected={filters.weightRange} 
                onToggle={(v) => toggleFilter('weightRange', v)}
                isObject 
              />
            </div>
          </div>
          
          {!isFiltersExpanded && (
            <p className="text-[9px] text-slate-600 font-bold tech-font uppercase text-center mt-2 animate-pulse">Expand for Tuning</p>
          )}
        </div>
      </aside>

      {/* Main Grid */}
      <div className="flex-1 space-y-8">
        {/* URL Importer HUD */}
        <div className="glass-panel border-blue-500/20 rounded-3xl p-6 relative overflow-hidden bg-slate-950/60 shadow-2xl">
           <div className="flex items-center gap-3 mb-6">
              <Layers className="text-blue-400" size={20} />
              <h3 className="text-sm font-black tech-font uppercase tracking-widest text-slate-300">Modular Link Sequencer</h3>
           </div>
           <div className="flex flex-col md:flex-row items-stretch gap-4">
              <div className="flex-1 relative">
                 <input 
                   value={urlInput}
                   onChange={(e) => setUrlInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && addLinkToStage()}
                   placeholder="PASTE_AMAZON_FLIPKART_URL..."
                   className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl py-3 px-10 text-sm tech-font focus:outline-none focus:border-blue-500/50"
                 />
                 <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                 <button onClick={addLinkToStage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-xl"><Plus size={18}/></button>
              </div>
              <button onClick={processBatch} disabled={stagedLinks.length === 0 || isBatchProcessing} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                {isBatchProcessing ? <Loader2 className="animate-spin" /> : 'Compare_Batch'}
              </button>
           </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter uppercase italic">
             Hardware_Archive <span className="text-blue-500 text-xs font-mono not-italic bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{filteredLaptops.length} FOUND</span>
           </h2>
        </div>

        {/* Laptop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredLaptops.map((laptop, index) => {
            const isSelected = selectedLaptops.find(l => l.id === laptop.id);
            const ppi = calculatePPI(laptop);
            
            return (
              <div 
                key={laptop.id}
                className={`stagger-item group glass-panel tech-border-corner transition-all duration-500 ${isSelected ? 'border-blue-500/60 bg-blue-500/5' : 'border-slate-800'} rounded-2xl overflow-hidden flex flex-col h-[580px]`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={laptop.image} alt={laptop.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 grayscale-[0.3] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                     <span className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded tech-font text-[8px] text-white border border-white/10 uppercase tracking-widest">{laptop.brand}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                     <div className="bg-blue-600/90 text-white text-[9px] font-black tech-font px-2 py-1 rounded shadow-lg">V_{ppi.toFixed(1)}</div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-black text-md leading-tight text-white mb-4 uppercase tracking-tight group-hover:text-blue-400 transition-colors">{laptop.name}</h3>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <SpecItem icon={Cpu} label="CPU" value={laptop.cpu} />
                    <SpecItem icon={HardDrive} label="GPU" value={laptop.gpu} />
                    <SpecItem icon={Terminal} label="RAM" value={`${laptop.ram}GB`} />
                    <SpecItem icon={Monitor} label="DISPLAY" value={`${laptop.displaySize}" ${laptop.screen.resolution}`} />
                    <SpecItem icon={Activity} label="STORAGE" value={laptop.storageSize >= 1024 ? `${laptop.storageSize/1024}TB` : `${laptop.storageSize}GB`} />
                    <SpecItem icon={Scale} label="WEIGHT" value={`${laptop.weight}kg`} />
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mb-1">VALUATION</p>
                      <p className="text-xl font-black tech-font text-emerald-400">₹{laptop.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button 
                      onClick={() => toggleSelection(laptop)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'bg-slate-900 text-slate-500 hover:bg-slate-800 border border-slate-800'}`}
                    >
                      {isSelected ? <Check size={20} /> : <Plus size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredLaptops.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
             <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 text-slate-600">
                <X size={32} />
             </div>
             <p className="tech-font text-slate-500 uppercase tracking-widest text-xs">No matching hardware nodes detected</p>
          </div>
        )}
      </div>

      <ComparisonTray 
        items={selectedLaptops} 
        onRemove={(id) => setSelectedLaptops(selectedLaptops.filter(l => l.id !== id))}
        onCompare={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <ComparisonModal 
          laptops={selectedLaptops} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

const FilterGroup: React.FC<{ 
  title: string, options: any[], selected: any[], onToggle: (v: any) => void, suffix?: string, formatLabel?: (v: any) => string, isObject?: boolean 
}> = ({ title, options, selected, onToggle, suffix = "", formatLabel, isObject }) => {
  return (
    <div className="space-y-3">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const id = isObject ? opt.id : opt;
          const label = isObject ? opt.l : (formatLabel ? formatLabel(opt) : `${opt}${suffix}`);
          const isSelected = selected.includes(id);
          return (
            <button 
              key={id}
              onClick={() => onToggle(id)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-bold tech-font border transition-all ${
                isSelected ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const SpecItem: React.FC<{ icon: any, label: string, value: string }> = ({ icon: Icon, label, value }) => (
  <div className="bg-slate-900/50 p-2 rounded border border-slate-800/40">
    <div className="flex items-center gap-1.5 text-slate-600 mb-1">
      <Icon size={10} />
      <span className="text-[7px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-[9px] text-slate-300 tech-font truncate font-medium">{value}</p>
  </div>
);

export default LaptopSection;
