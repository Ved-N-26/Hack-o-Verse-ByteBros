
export interface Laptop {
  id: string;
  name: string;
  brand: string;
  cpu: string;
  gpu: string;
  ram: number;
  storageSize: number; // In GB
  displaySize: number; // In inches
  weight: number; // In kg
  screen: {
    nits: number;
    srgb: number;
    resolution: string;
  };
  benchmarks: {
    cpu: number; // 0-100 score
    gpu: number; // 0-100 score
    buildQuality: number; // 0-100 score
  };
  price: number;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
}

export enum Section {
  LAPTOPS = 'LAPTOPS',
  CONCIERGE = 'CONCIERGE',
  BUILDER = 'BUILDER'
}

export interface PCPart {
  id: string;
  name: string;
  type: 'CPU' | 'Motherboard' | 'Cooling' | 'RAM' | 'GPU' | 'Storage' | 'PSU' | 'Case';
  price: number;
  tdp?: number;
  socket?: string;
  wattage?: number;
}

export interface PCBuild {
  id: string;
  name: string;
  cpu?: PCPart;
  motherboard?: PCPart;
  cooling?: PCPart;
  ram?: PCPart;
  gpu?: PCPart;
  storage?: PCPart;
  psu?: PCPart;
  cases?: PCPart;
}
