import { Service, Doctor } from '../types';
import { formatSpecialty } from './formatters';

export const getGroupedServices = (
  services: Service[],
  allDoctors: Doctor[],
  config: any,
  searchQuery: string,
  selectedBranchName: string | null,
  _branches: Record<string, any>,
  disableFiltering: boolean = false
): Record<string, Service[]> => {
  if (!config?.specialty_groups?.rules) return {};

  const groups: Record<string, Service[]> = {};
  const rules = config.specialty_groups.rules;

  // Initialize groups
  Object.keys(rules).forEach(groupName => {
    groups[groupName] = [];
  });

  // 1. Determine valid specialties from allDoctors based on selected branch
  const validSpecialties = new Set<string>();
  
  allDoctors.forEach(d => {
    if (d.specialty) {
      if (!selectedBranchName || d.offerings?.some(o => (o.branch.short || o.branch.name) === selectedBranchName)) {
        const specs = d.specialty.split(',').map(s => s.trim()).filter(Boolean);
        specs.forEach(s => validSpecialties.add(s));
      }
    }
  });

  services.forEach(service => {
    // Filter by search query if present
    if (searchQuery && !service.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return;
    }

    // Filter by validSpecialties (which respects branch selection)
    if (!disableFiltering && !validSpecialties.has(service.name)) {
      return;
    }

    let placed = false;
    for (const [groupName, patterns] of Object.entries(rules)) {
      for (const pattern of (patterns as string[])) {
        try {
          const regex = new RegExp(pattern, 'i');
          if (regex.test(service.name)) {
            groups[groupName].push(service);
            placed = true;
            break; 
          }
        } catch (e) {
          console.warn(`Invalid regex pattern: ${pattern}`, e);
        }
      }
      if (placed) break;
    }
  });

  // Filter out empty groups and deduplicate by formatted name
  const nonEmptyGroups: Record<string, Service[]> = {};
  Object.entries(groups).forEach(([name, items]) => {
    if (items.length > 0) {
      const uniqueItems = new Map<string, Service>();
      items.forEach(item => {
        const formatted = formatSpecialty(item.name, config);
        // Prefer the one with "Врач" if there's a collision
        if (!uniqueItems.has(formatted) || item.name.includes('Врач')) {
          uniqueItems.set(formatted, item);
        }
      });
      nonEmptyGroups[name] = Array.from(uniqueItems.values());
    }
  });

  return nonEmptyGroups;
};

export const getFilteredDoctors = (
  allDoctors: Doctor[],
  selectedBranchName: string | null,
  searchQuery: string,
  _branches: Record<string, any>,
  disableFiltering: boolean = false
): Doctor[] => {
  let result = allDoctors;

  // Filter by branch
  if (!disableFiltering && selectedBranchName) {
    result = result.filter(d => d.offerings?.some(o => (o.branch.short || o.branch.name) === selectedBranchName));
  }

  if (!searchQuery) return []; // Only show doctors on search? Or if branch selected?
  
  const query = searchQuery.toLowerCase();
  result = result.filter(d => 
    d.name.toLowerCase().includes(query) || 
    (d.specialty && d.specialty.toLowerCase().includes(query))
  );

  return result;
};
