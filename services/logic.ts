
import { Laptop, PCBuild } from '../types';

/**
 * PPI = ((CPU * 0.4) + (GPU * 0.4) + (Build * 0.2)) / Price
 * Adjusted for INR scale (multiplier 100,000)
 */
export const calculatePPI = (laptop: Laptop): number => {
  const score = (
    (laptop.benchmarks.cpu * 0.4) + 
    (laptop.benchmarks.gpu * 0.4) + 
    (laptop.benchmarks.buildQuality * 0.2)
  );
  return (score / laptop.price) * 100000;
};

// Added calculation logic for PC builds
export const calculateTotalBuildPrice = (build: PCBuild): number => {
  return [
    build.cpu, build.motherboard, build.cooling, build.ram, 
    build.gpu, build.storage, build.psu, build.cases
  ].reduce((total, part) => total + (part?.price || 0), 0);
};

// Added TDP calculation logic for PC builds
export const calculateTotalBuildTDP = (build: PCBuild): number => {
  return [
    build.cpu, build.motherboard, build.cooling, build.ram, 
    build.gpu, build.storage, build.psu, build.cases
  ].reduce((total, part) => total + (part?.tdp || 0), 0);
};

// Added compatibility checking logic for PC builds
export const checkCompatibility = (build: PCBuild): { compatible: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  if (build.cpu && build.motherboard) {
    if (build.cpu.socket !== build.motherboard.socket) {
      issues.push(`CPU socket (${build.cpu.socket}) mismatch with Motherboard socket (${build.motherboard.socket})`);
    }
  }
  
  if (build.psu) {
    const estimatedTdp = calculateTotalBuildTDP(build);
    if (build.psu.wattage && build.psu.wattage < estimatedTdp + 100) {
      issues.push(`PSU wattage (${build.psu.wattage}W) may be insufficient for build (estimated ${estimatedTdp}W + 100W overhead)`);
    }
  }

  return {
    compatible: issues.length === 0,
    issues
  };
};
