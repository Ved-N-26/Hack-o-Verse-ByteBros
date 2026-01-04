import { Laptop, PCPart } from './types';

export const MOCK_LAPTOPS: Laptop[] = [
  {
    id: '1',
    name: 'MacBook Air M3 (13-inch)',
    brand: 'Apple',
    cpu: 'Apple M3 (8-core)',
    gpu: 'M3 10-core GPU',
    ram: 16,
    storageSize: 512,
    displaySize: 13.6,
    weight: 1.24,
    screen: { nits: 500, srgb: 100, resolution: '2560 x 1664' },
    benchmarks: { cpu: 85, gpu: 72, buildQuality: 98 },
    price: 114900,
    image: 'https://cdn.mos.cms.futurecdn.net/v2/t:0,l:328,cw:2099,ch:1181,q:80,w:2099/FfWtj8AdVGanoRqUPFt6jT.jpg'
  },
  {
    id: '2',
    name: 'ASUS Vivobook 16X',
    brand: 'ASUS',
    cpu: 'Intel Core i5-13500H',
    gpu: 'RTX 3050 (50W)',
    ram: 16,
    storageSize: 512,
    displaySize: 16.0,
    weight: 1.80,
    screen: { nits: 300, srgb: 45, resolution: '1920 x 1200' },
    benchmarks: { cpu: 75, gpu: 60, buildQuality: 70 },
    price: 68990,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '3',
    name: 'HP Victus 15',
    brand: 'HP',
    cpu: 'AMD Ryzen 5 7535HS',
    gpu: 'RTX 2050',
    ram: 16,
    storageSize: 512,
    displaySize: 15.6,
    weight: 2.29,
    screen: { nits: 250, srgb: 45, resolution: '1920 x 1080' },
    benchmarks: { cpu: 68, gpu: 45, buildQuality: 65 },
    price: 54990,
    image: 'https://in-files.apjonlinecdn.com/landingpages/npi/hp-victus-15-laptop/intel/images/w100_slide1_v2.png'
  },
  {
    id: '4',
    name: 'Lenovo Legion Slim 5i',
    brand: 'Lenovo',
    cpu: 'Intel Core i7-13700H',
    gpu: 'RTX 4060 (125W)',
    ram: 16,
    storageSize: 1024,
    displaySize: 16.0,
    weight: 2.40,
    screen: { nits: 500, srgb: 100, resolution: '2560 x 1600' },
    benchmarks: { cpu: 88, gpu: 82, buildQuality: 88 },
    price: 132990,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '5',
    name: 'Razer Blade 16 (2024)',
    brand: 'Razer',
    cpu: 'Intel Core i9-14900HX',
    gpu: 'RTX 4090 (175W)',
    ram: 32,
    storageSize: 2048,
    displaySize: 16.0,
    weight: 2.45,
    screen: { nits: 1000, srgb: 100, resolution: '3840 x 2400 (Mini-LED)' },
    benchmarks: { cpu: 98, gpu: 99, buildQuality: 95 },
    price: 459990,
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '6',
    name: 'Dell XPS 15 9530',
    brand: 'Dell',
    cpu: 'Intel Core i9-13900H',
    gpu: 'RTX 4070',
    ram: 32,
    storageSize: 1024,
    displaySize: 15.6,
    weight: 1.92,
    screen: { nits: 500, srgb: 100, resolution: '3456 x 2160 (OLED)' },
    benchmarks: { cpu: 92, gpu: 85, buildQuality: 96 },
    price: 284990,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '7',
    name: 'ASUS ROG Zephyrus G14',
    brand: 'ASUS',
    cpu: 'AMD Ryzen 9 8945HS',
    gpu: 'RTX 4070 (90W)',
    ram: 32,
    storageSize: 1024,
    displaySize: 14.0,
    weight: 1.50,
    screen: { nits: 500, srgb: 100, resolution: '2880 x 1800 (OLED)' },
    benchmarks: { cpu: 94, gpu: 88, buildQuality: 90 },
    price: 189990,
    image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '8',
    name: 'HP Spectre x360 14',
    brand: 'HP',
    cpu: 'Intel Core Ultra 7 155H',
    gpu: 'Intel Arc Graphics',
    ram: 16,
    storageSize: 1024,
    displaySize: 14.0,
    weight: 1.45,
    screen: { nits: 400, srgb: 100, resolution: '2880 x 1920 (OLED)' },
    benchmarks: { cpu: 84, gpu: 55, buildQuality: 94 },
    price: 164990,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '9',
    name: 'Acer Swift Go 14',
    brand: 'Acer',
    cpu: 'Intel Core Ultra 5 125H',
    gpu: 'Intel Arc Graphics',
    ram: 16,
    storageSize: 512,
    displaySize: 14.0,
    weight: 1.32,
    screen: { nits: 400, srgb: 100, resolution: '2880 x 1800 (OLED)' },
    benchmarks: { cpu: 80, gpu: 50, buildQuality: 78 },
    price: 79990,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '10',
    name: 'MSI Titan GT77 HX',
    brand: 'MSI',
    cpu: 'Intel Core i9-13980HX',
    gpu: 'RTX 4090 (175W)',
    ram: 64,
    storageSize: 4096,
    displaySize: 17.3,
    weight: 3.30,
    screen: { nits: 1000, srgb: 100, resolution: '3840 x 2160 (Mini-LED)' },
    benchmarks: { cpu: 99, gpu: 100, buildQuality: 88 },
    price: 549990,
    image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/computer/3/t/j/-original-imahcyp7p4jvn3d4.jpeg?q=90'
  },
  {
    id: '11',
    name: 'ASUS Zenbook 14 OLED',
    brand: 'ASUS',
    cpu: 'Intel Core Ultra 7 155H',
    gpu: 'Intel Arc Graphics',
    ram: 16,
    storageSize: 1024,
    displaySize: 14.0,
    weight: 1.20,
    screen: { nits: 600, srgb: 100, resolution: '2880 x 1800 (OLED)' },
    benchmarks: { cpu: 85, gpu: 56, buildQuality: 91 },
    price: 114990,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '12',
    name: 'Microsoft Surface Laptop 5',
    brand: 'Microsoft',
    cpu: 'Intel Core i7-1255U',
    gpu: 'Intel Iris Xe',
    ram: 16,
    storageSize: 512,
    displaySize: 13.5,
    weight: 1.27,
    screen: { nits: 400, srgb: 100, resolution: '2256 x 1504' },
    benchmarks: { cpu: 72, gpu: 35, buildQuality: 93 },
    price: 139990,
    image: 'https://www.express-service.com.ua/upload/iblock/dfa/wvj42vk1tat6rp756b9ys0985kzbo53d/6523e085b47f2_1724564_zoom.jpg'
  },
  {
    id: '13',
    name: 'Lenovo Yoga Slim 7i Carbon',
    brand: 'Lenovo',
    cpu: 'Intel Core i7-1360P',
    gpu: 'Intel Iris Xe',
    ram: 16,
    storageSize: 512,
    displaySize: 13.3,
    weight: 0.97,
    screen: { nits: 400, srgb: 100, resolution: '2560 x 1600' },
    benchmarks: { cpu: 78, gpu: 40, buildQuality: 89 },
    price: 124990,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: '14',
    name: 'HP Omen 16',
    brand: 'HP',
    cpu: 'Intel Core i7-14700HX',
    gpu: 'RTX 4070 (140W)',
    ram: 16,
    storageSize: 1024,
    displaySize: 16.1,
    weight: 2.37,
    screen: { nits: 300, srgb: 100, resolution: '2560 x 1440' },
    benchmarks: { cpu: 94, gpu: 90, buildQuality: 82 },
    price: 159990,
    image: 'https://www.hp.com/content/dam/sites/omen/worldwide/laptops/2023-omen-16-intel/hero-1-v2-2x.png'
  },
  {
    id: '15',
    name: 'Samsung Galaxy Book4 Ultra',
    brand: 'Samsung',
    cpu: 'Intel Core Ultra 9 185H',
    gpu: 'RTX 4070',
    ram: 32,
    storageSize: 1024,
    displaySize: 16.0,
    weight: 1.86,
    screen: { nits: 400, srgb: 120, resolution: '2880 x 1800 (AMOLED)' },
    benchmarks: { cpu: 96, gpu: 86, buildQuality: 92 },
    price: 249990,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

export const MOCK_PARTS: PCPart[] = [
  // CPUs - Intel
  { id: 'cpu-i9-14900k', name: 'Intel Core i9-14900K', type: 'CPU', price: 54900, tdp: 125, socket: 'LGA1700' },
  { id: 'cpu-i7-14700k', name: 'Intel Core i7-14700K', type: 'CPU', price: 38900, tdp: 125, socket: 'LGA1700' },
  { id: 'cpu-i5-13600k', name: 'Intel Core i5-13600K', type: 'CPU', price: 29500, tdp: 125, socket: 'LGA1700' },
  { id: 'cpu-i5-12400f', name: 'Intel Core i5-12400F', type: 'CPU', price: 12800, tdp: 65, socket: 'LGA1700' },
  
  // CPUs - AMD
  { id: 'cpu-r9-7950x3d', name: 'AMD Ryzen 9 7950X3D', type: 'CPU', price: 62500, tdp: 120, socket: 'AM5' },
  { id: 'cpu-r7-7800x3d', name: 'AMD Ryzen 7 7800X3D', type: 'CPU', price: 38500, tdp: 120, socket: 'AM5' },
  { id: 'cpu-r7-7700x', name: 'AMD Ryzen 7 7700X', type: 'CPU', price: 28900, tdp: 105, socket: 'AM5' },
  { id: 'cpu-r5-7600', name: 'AMD Ryzen 5 7600', type: 'CPU', price: 18500, tdp: 65, socket: 'AM5' },

  // Motherboards - LGA1700
  { id: 'mobo-z790-hero', name: 'ASUS ROG Maximus Z790 Hero', type: 'Motherboard', price: 62000, socket: 'LGA1700' },
  { id: 'mobo-z790-elite', name: 'Gigabyte Z790 AORUS ELITE AX', type: 'Motherboard', price: 28900, socket: 'LGA1700' },
  { id: 'mobo-b760-wifi', name: 'ASUS Prime B760M-A WiFi', type: 'Motherboard', price: 15500, socket: 'LGA1700' },
  { id: 'mobo-h610m', name: 'MSI PRO H610M-E DDR4', type: 'Motherboard', price: 7200, socket: 'LGA1700' },

  // Motherboards - AM5
  { id: 'mobo-x670e-taichi', name: 'ASRock X670E Taichi', type: 'Motherboard', price: 48500, socket: 'AM5' },
  { id: 'mobo-b650-tomahawk', name: 'MSI MAG B650 Tomahawk WiFi', type: 'Motherboard', price: 21500, socket: 'AM5' },
  { id: 'mobo-b650m-ds3h', name: 'Gigabyte B650M DS3H', type: 'Motherboard', price: 14800, socket: 'AM5' },

  // GPUs - NVIDIA
  { id: 'gpu-rtx-4090', name: 'NVIDIA RTX 4090 24GB', type: 'GPU', price: 185000, tdp: 450 },
  { id: 'gpu-rtx-4080-super', name: 'NVIDIA RTX 4080 Super', type: 'GPU', price: 105000, tdp: 320 },
  { id: 'gpu-rtx-4070-ti-super', name: 'NVIDIA RTX 4070 Ti Super', type: 'GPU', price: 79500, tdp: 285 },
  { id: 'gpu-rtx-4070-super', name: 'NVIDIA RTX 4070 Super', type: 'GPU', price: 59900, tdp: 220 },
  { id: 'gpu-rtx-4060-ti', name: 'NVIDIA RTX 4060 Ti 8GB', type: 'GPU', price: 38500, tdp: 160 },
  { id: 'gpu-rtx-3060', name: 'NVIDIA RTX 3060 12GB', type: 'GPU', price: 25500, tdp: 170 },

  // GPUs - AMD
  { id: 'gpu-rx-7900-xtx', name: 'AMD Radeon RX 7900 XTX', type: 'GPU', price: 92000, tdp: 355 },
  { id: 'gpu-rx-7800-xt', name: 'AMD Radeon RX 7800 XT', type: 'GPU', price: 49900, tdp: 263 },
  { id: 'gpu-rx-7600-xt', name: 'AMD Radeon RX 7600 XT', type: 'GPU', price: 32500, tdp: 190 },

  // RAM
  { id: 'ram-ddr5-64gb', name: 'G.Skill Trident Z5 RGB 64GB DDR5 6000', type: 'RAM', price: 22500, tdp: 10 },
  { id: 'ram-ddr5-32gb', name: 'Corsair Vengeance 32GB DDR5 6000MHz', type: 'RAM', price: 11000, tdp: 5 },
  { id: 'ram-ddr5-16gb', name: 'Kingston Fury Beast 16GB DDR5 5200', type: 'RAM', price: 5800, tdp: 5 },
  { id: 'ram-ddr4-16gb', name: 'Corsair Vengeance LPX 16GB DDR4 3200', type: 'RAM', price: 3800, tdp: 5 },

  // Cooling
  { id: 'cool-kraken-360', name: 'NZXT Kraken Elite 360 RGB', type: 'Cooling', price: 24500, tdp: 15 },
  { id: 'cool-noctua-d15', name: 'Noctua NH-D15 chromax.black', type: 'Cooling', price: 9800, tdp: 5 },
  { id: 'cool-ak620', name: 'Deepcool AK620 Digital', type: 'Cooling', price: 6500, tdp: 5 },
  { id: 'cool-hyper-212', name: 'Cooler Master Hyper 212 Halo', type: 'Cooling', price: 3200, tdp: 5 },

  // Storage
  { id: 'stor-990-pro-2tb', name: 'Samsung 990 Pro 2TB NVMe', type: 'Storage', price: 17500, tdp: 8 },
  { id: 'stor-crucial-t700-2tb', name: 'Crucial T700 2TB Gen5', type: 'Storage', price: 28500, tdp: 12 },
  { id: 'stor-sn850x-1tb', name: 'WD Black SN850X 1TB', type: 'Storage', price: 9200, tdp: 8 },
  { id: 'stor-crucial-p3-1tb', name: 'Crucial P3 1TB NVMe', type: 'Storage', price: 5200, tdp: 5 },

  // PSUs
  { id: 'psu-thor-1200', name: 'ASUS ROG Thor 1200W Platinum II', type: 'PSU', price: 32500, wattage: 1200 },
  { id: 'psu-rm1000x', name: 'Corsair RM1000x Shift', type: 'PSU', price: 17500, wattage: 1000 },
  { id: 'psu-evga-850', name: 'EVGA SuperNOVA 850G+', type: 'PSU', price: 12500, wattage: 850 },
  { id: 'psu-cv650', name: 'Corsair CV650 650W 80 Plus Bronze', type: 'PSU', price: 4800, wattage: 650 },

  // Cases
  { id: 'case-h9-elite', name: 'NZXT H9 Elite', type: 'Case', price: 21500 },
  { id: 'case-o11-evo', name: 'Lian Li O11 Dynamic EVO', type: 'Case', price: 16500 },
  { id: 'case-north', name: 'Fractal Design North', type: 'Case', price: 14500 },
  { id: 'case-4000d', name: 'Corsair 4000D Airflow', type: 'Case', price: 8900 },
  { id: 'case-h5-flow', name: 'NZXT H5 Flow', type: 'Case', price: 7800 }
];