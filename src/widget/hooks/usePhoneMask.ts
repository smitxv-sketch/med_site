import { useState, ChangeEvent } from 'react';

export const usePhoneMask = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    let formatted = input;
    if (input.length > 0) {
      formatted = `(${input.slice(0, 3)}`;
    }
    if (input.length > 3) {
      formatted += `) ${input.slice(3, 6)}`;
    }
    if (input.length > 6) {
      formatted += `-${input.slice(6, 10)}`;
    }
    setValue(formatted);
  };

  return { value, onChange: handleChange, setValue };
};
