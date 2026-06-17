import { UserProfile, QuickActionItem, Appointment, HealthStory, Promotion } from './types';

export const mockUserProfiles: UserProfile[] = [
  {
    id: 'u1',
    name: 'Елена (Вы)',
    avatarUrl: 'https://i.pravatar.cc/100?img=5',
    familyProfileMode: true,
  },
  {
    id: 'u2',
    name: 'Артём (Сын)',
    avatarUrl: 'https://i.pravatar.cc/100?img=11',
    familyProfileMode: false, // Child doesn't have family management
  }
];

export const mockQuickActions: QuickActionItem[] = [
  { id: 'qa_docs', icon: '🩺', label: 'Прием врачей', action: '/doctors' },
  { id: 'qa_tests', icon: '🧬', label: 'Диагностика', action: '/diagnostics' },
  { id: 'qa_programs', icon: '📋', label: 'Комплексные программы', action: '/programs' },
  { id: 'qa_treatment', icon: '💊', label: 'Лечение', action: '/treatment' },
];

export const mockPromotions: Promotion[] = [
  {
    id: 'p1',
    title: 'Весенний Чек-ап',
    subtitle: '1-14 мая: проверка витаминов с выгодой 20%',
    bgUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    actionUrl: '/promotions/spring'
  },
];

export const mockSpecialOffers: Promotion[] = [
  {
    id: 'so1',
    title: 'Детский паспорт',
    subtitle: 'Постоянная программа для школ и садиков',
    bgUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    actionUrl: '/promotions/kids'
  },
  {
    id: 'so2',
    title: 'Скидка пенсионерам',
    subtitle: 'Скидка 10% на все услуги клиники (постоянная)',
    bgUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
    actionUrl: '/promotions/senior'
  }
];

export const mockAppointments: Record<string, Appointment | null> = {
  'u1': {
    id: 'app1',
    date: new Date('2026-10-24T14:30:00'),
    address: 'ул. 40-летия Победы, 11',
    doctor: {
      id: 'd1',
      name: 'Иванов Сергей',
      specialty: 'Врач-гастроэнтеролог',
      avatarUrl: 'https://i.pravatar.cc/100?img=1'
    }
  },
  'u2': {
    id: 'app2',
    date: new Date('2026-11-02T10:00:00'),
    address: 'пр. Ленина, 50',
    doctor: {
      id: 'd2',
      name: 'Смирнова Анна',
      specialty: 'Врач-педиатр',
      avatarUrl: 'https://i.pravatar.cc/100?img=9'
    }
  }
};

export const mockHealthStories: HealthStory[] = [
  { 
    id: 's1', 
    title: 'Осень без простуд', 
    imgUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 's2', 
    title: 'Как копить?', 
    imgUrl: 'https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 's3', 
    title: '1 год клинике', 
    imgUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80' 
  }
];
