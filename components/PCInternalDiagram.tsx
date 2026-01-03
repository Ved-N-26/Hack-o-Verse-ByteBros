
import React from 'react';

interface DiagramProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const PCInternalDiagram: React.FC<DiagramProps> = ({ selectedId, onSelect }) => {
  // Coordinates for the floating labels based on SVG percentages
  const componentMap = [
    { id: 'mobo_base', label: 'Motherboard', x: 50, y: 45 },
    { id: 'cpu_cooler', label: 'CPU Cooler', x: 50, y: 35 },
    { id: 'ram_sticks', label: 'Memory Array', x: 65, y: 35 },
    { id: 'gpu_card', label: 'Graphics Accelerator', x: 45, y: 55 },
    { id: 'psu_block', label: 'Power Unit', x: 30, y: 85 },
    { id: 'storage_drive', label: 'Storage Array', x: 80, y: 60 },
    { id: 'case_shell', label: 'Chassis', x: 10, y: 10 },
  ];

  const getPartClass = (id: string) => {
    return `pc-part transition-all duration-500 cursor-pointer ${
      selectedId === id ? 'is-active' : 'opacity-60 hover:opacity-100'
    }`;
  };

  return (
    <div className="relative w-full aspect-square bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl group">
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* The SVG Diagram */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full p-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Chassis / Case */}
        <path
          id="case_shell"
          onClick={() => onSelect('case_shell')}
          className={getPartClass('case_shell')}
          d="M40,20 L360,20 L380,50 L380,380 L20,380 L20,50 Z"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="4"
        />

        {/* Motherboard */}
        <rect
          id="mobo_base"
          onClick={() => onSelect('mobo_base')}
          className={getPartClass('mobo_base')}
          x="80" y="60" width="240" height="260"
          rx="8"
          fill="#0f172a"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Power Supply Unit */}
        <rect
          id="psu_block"
          onClick={() => onSelect('psu_block')}
          className={getPartClass('psu_block')}
          x="40" y="320" width="120" height="50"
          rx="4"
          fill="#020617"
          stroke="#1e293b"
        />

        {/* CPU Cooler */}
        <rect
          id="cpu_cooler"
          onClick={() => onSelect('cpu_cooler')}
          className={getPartClass('cpu_cooler')}
          x="140" y="100" width="80" height="80"
          rx="10"
          fill="#334155"
          stroke="#64748b"
        />

        {/* RAM Sticks */}
        <g id="ram_sticks" onClick={() => onSelect('ram_sticks')} className={getPartClass('ram_sticks')}>
          <rect x="230" y="100" width="10" height="80" rx="2" fill="#475569" />
          <rect x="245" y="100" width="10" height="80" rx="2" fill="#475569" />
          <rect x="260" y="100" width="10" height="80" rx="2" fill="#475569" />
        </g>

        {/* GPU Card */}
        <path
          id="gpu_card"
          onClick={() => onSelect('gpu_card')}
          className={getPartClass('gpu_card')}
          d="M90,200 L340,200 L340,260 L90,260 Z"
          fill="#1e293b"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Storage Drive */}
        <rect
          id="storage_drive"
          onClick={() => onSelect('storage_drive')}
          className={getPartClass('storage_drive')}
          x="330" y="100" width="40" height="150"
          rx="4"
          fill="#0f172a"
          stroke="#1e293b"
        />
      </svg>

      {/* Floating Labels Overlay */}
      {componentMap.map((comp) => (
        <div
          key={comp.id}
          className={`absolute transition-all duration-300 pointer-events-none ${
            selectedId === comp.id ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
          style={{
            left: `${comp.x}%`,
            top: `${comp.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="bg-blue-600/90 backdrop-blur-md text-white tech-font text-[10px] font-bold px-3 py-1.5 rounded-lg border border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)] whitespace-nowrap flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {comp.label}
          </div>
          {/* Connector Line (Decorative) */}
          <div className="w-[1px] h-8 bg-gradient-to-t from-blue-500 to-transparent mx-auto" />
        </div>
      ))}

      <style>{`
        .pc-part.is-active {
          fill: #06b6d4 !important;
          stroke: #22d3ee !important;
          filter: url(#neon-glow);
          opacity: 1 !important;
        }
        .pc-part:hover {
          stroke: #3b82f6;
          stroke-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default PCInternalDiagram;
