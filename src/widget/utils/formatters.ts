export const formatSpecialty = (name: string, config?: any) => {
  if (!name) return '';
  
  let formatted = name;
  
  // Check if prefix removal is enabled (default to true)
  const removePrefixEnabled = config?.formatting?.specialty?.remove_doctor_prefix ?? true;
  
  if (removePrefixEnabled) {
    // Use regex to handle different types of dashes (hyphen -, en-dash –, em-dash —) and spaces
    formatted = formatted.replace(/^врач\s*[-–—]\s*|^врач\s+/i, '');
  }

  // Remove common suffixes to group specialties better
  const suffixesToRemove = [
    /\s+(высшей|первой|второй)\s+(квалификационной\s+)?категории/i,
    /\s+к\.м\.н\./i,
    /\s+д\.м\.н\./i,
    /\s+кандидат\s+медицинских\s+наук/i,
    /\s+доктор\s+медицинских\s+наук/i,
    /\s+профессор/i,
    /\s+доцент/i,
    /\s+академик/i,
    /\s+главный\s+врач/i,
    /\s+заведующий\s+отделением/i,
    /\s+заведующая\s+отделением/i,
    /\s+ведущий\s+специалист/i,
  ];

  suffixesToRemove.forEach(regex => {
    formatted = formatted.replace(regex, '');
  });

  // Clean up any trailing commas, spaces, or dashes left after removing suffixes
  formatted = formatted.replace(/[\s,.\-–—]+$/, '');
  
  const shouldCapitalize = config?.formatting?.specialty?.capitalize ?? true;
  
  if (shouldCapitalize && formatted.length > 0) {
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  
  return formatted.trim();
};

export const formatExperience = (years: number | undefined | null): string => {
  if (years === undefined || years === null) return '';
  
  const lastDigit = years % 10;
  const lastTwoDigits = years % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${years} лет`;
  }

  if (lastDigit === 1) {
    return `${years} год`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${years} года`;
  }

  return `${years} лет`;
};

/**
 * Formats text with proper typography rules (non-breaking spaces for numbers, currencies, and short prepositions)
 * to prevent awkward line breaks.
 */
export const formatTypography = (text: string | undefined | null): string => {
  if (!text) return '';
  
  let formatted = text;
  
  // Non-breaking space between numbers (e.g., "3 500" -> "3 500")
  formatted = formatted.replace(/(\d)\s+(?=\d)/g, '$1\u00A0');
  
  // Non-breaking space between number and currency/percent (e.g., "500 ₽" -> "500 ₽")
  formatted = formatted.replace(/(\d)\s+([₽$€%])/g, '$1\u00A0$2');
  
  // Non-breaking space after short prepositions/conjunctions
  const prepositions = ['в', 'без', 'до', 'для', 'за', 'через', 'над', 'по', 'из', 'у', 'около', 'под', 'о', 'про', 'на', 'к', 'перед', 'при', 'с', 'между', 'и', 'а', 'но', 'от'];
  const prepRegex = new RegExp(`(^|\\s)(${prepositions.join('|')})\\s+`, 'gi');
  
  // Apply twice to catch consecutive prepositions
  formatted = formatted.replace(prepRegex, '$1$2\u00A0');
  formatted = formatted.replace(prepRegex, '$1$2\u00A0');
  
  return formatted;
};
