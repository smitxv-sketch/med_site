import { useState, useEffect, useCallback, useMemo } from 'react';
import { Slot } from '../types';
import { getSlots } from '../services/api';

export const useDoctorSlots = (doctorId: string, initialDate: string, city: string = 'chel', specialty?: string) => {
  const [allSlots, setAllSlots] = useState<Slot[]>([]);
  const [rawSlots, setRawSlots] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = useCallback(async () => {
    if (!doctorId) {
      setAllSlots([]);
      setRawSlots(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await getSlots(city, doctorId, '', specialty);
      const fetchedSlots = response.slots || [];
      setAllSlots(fetchedSlots);
      setRawSlots(response.rawData || null);
      
      if (fetchedSlots.length > 0) {
        const uniqueDates = Array.from(new Set(fetchedSlots.map((s: Slot) => s.date).filter(Boolean))) as string[];
        uniqueDates.sort();
        if (uniqueDates.length > 0) {
          setSelectedDate((prev: string) => !uniqueDates.includes(prev) ? uniqueDates[0] : prev);
        }
      }
    } catch (err) {
      console.error('Failed to fetch slots', err);
      setError('Failed to load slots');
      setAllSlots([]);
      setRawSlots(null);
    } finally {
      setLoading(false);
    }
  }, [city, doctorId, specialty]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const availableDates = useMemo(() => {
    const dates = Array.from(new Set(allSlots.map(s => s.date).filter(Boolean))) as string[];
    dates.sort();
    return dates;
  }, [allSlots]);
  const slotsForSelectedDate = useMemo(() => allSlots.filter(s => s.date === selectedDate), [allSlots, selectedDate]);

  return {
    slots: slotsForSelectedDate,
    availableDates,
    rawSlots,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    refresh: fetchSlots
  };
};
