export type PriceItem = {
  id: string;
  name: string;
  price: string; // Formatting it directly as a string for now, e.g. "7500 ₽"
};

export type PriceCategory = {
  id: string;
  name: string;
  tabId: string; // Defines which root tab it belongs to (e.g. 'consultation', 'diagnostics')
  items: PriceItem[];
};

export const PRICING_TABS = [
  { id: 'all', label: 'Все услуги' },
  { id: 'consultation', label: 'Прием врачей' },
  { id: 'diagnostics', label: 'Диагностика' },
  { id: 'programs', label: 'Комплексные программы' },
  { id: 'treatment', label: 'Лечение' }
];

export const pricesDb: PriceCategory[] = [
  {
    id: 'anesthesiology',
    name: 'Анестезиология',
    tabId: 'treatment',
    items: [
      { id: 'a1', name: 'Анестезиологическое пособие (внутривенная анестезия) 15 мин', price: '4 000 ₽' },
      { id: 'a2', name: 'Анестезиологическое пособие (внутривенная анестезия) 30 мин', price: '6 000 ₽' }
    ]
  },
  {
    id: 'biopsy',
    name: 'Биопсия яичка Micro TESE',
    tabId: 'treatment',
    items: [
      { id: 'b1', name: 'Биопсия яичка Micro TESE у мужчин', price: '45 000 ₽' }
    ]
  },
  {
    id: 'pregnancy_care',
    name: 'Ведение беременности',
    tabId: 'programs',
    items: [
      { id: 'v1', name: 'Программа ведения беременности "Оптимальная"', price: '120 000 ₽' }
    ]
  },
  {
    id: 'gastroenterology',
    name: 'Гастроэнтерология',
    tabId: 'consultation',
    items: [
      { id: 'g1', name: 'Прием врача-гастроэнтеролога', price: '3 500 ₽' },
      { id: 'g2', name: 'Повторный прием врача-гастроэнтеролога', price: '3 000 ₽' },
    ]
  },
  {
    id: 'cardiology',
    name: 'Кардиология',
    tabId: 'consultation',
    items: [
      { id: 'c1', name: 'Прием врача-кардиолога (главного специалиста Клиники) для коррекции терапии', price: '7 500 ₽' },
      { id: 'c2', name: 'Прием врача-кардиолога (главного специалиста Клиники)', price: '8 800 ₽' },
      { id: 'c3', name: 'Прием врача-кардиолога (ведущего специалиста Клиники) для коррекции терапии', price: '5 900 ₽' },
      { id: 'c4', name: 'Прием врача-кардиолога (ведущего специалиста Клиники)', price: '6 700 ₽' },
      { id: 'c5', name: 'Прием врача-кардиолога', price: '5 800 ₽' }
    ]
  },
  {
    id: 'colonoscopy',
    name: 'Колоноскопия (ФКС) под наркозом',
    tabId: 'diagnostics',
    items: [
      { id: 'col1', name: 'Видеоколоноскопия (ФКС) под внутривенной анестезией', price: '11 500 ₽' }
    ]
  },
  {
    id: 'coloproctology',
    name: 'Колопроктология',
    tabId: 'consultation',
    items: [
      { id: 'cp1', name: 'Прием врача-колопроктолога', price: '4 500 ₽' }
    ]
  },
  {
    id: 'colposcopy',
    name: 'Кольпоскопия шейки матки',
    tabId: 'diagnostics',
    items: [
      { id: 'clps1', name: 'Расширенная видеокольпоскопия', price: '2 800 ₽' }
    ]
  },
  {
    id: 'neurology',
    name: 'Неврология',
    tabId: 'consultation',
    items: [
      { id: 'n1', name: 'Прием врача-невролога', price: '4 000 ₽' }
    ]
  },
  {
    id: 'nephrology',
    name: 'Нефрология',
    tabId: 'consultation',
    items: [
      { id: 'nph1', name: 'Прием врача-нефролога', price: '4 200 ₽' }
    ]
  },
  {
    id: 'oncology',
    name: 'Онкология',
    tabId: 'consultation',
    items: [
      { id: 'o1', name: 'Прием врача-онколога', price: '5 000 ₽' }
    ]
  },
  {
    id: 'vrt',
    name: 'Отделение ВРТ',
    tabId: 'treatment',
    items: [
      { id: 'vrt1', name: 'Программа ЭКО базовая', price: '150 000 ₽' }
    ]
  },
  {
    id: 'ultrasound',
    name: 'УЗИ в гинекологии',
    tabId: 'diagnostics',
    items: [
      { id: 'u1', name: 'УЗИ органов малого таза (трансвагинально)', price: '2 500 ₽' }
    ]
  },
  {
    id: 'ultrasound_general',
    name: 'УЗИ общее',
    tabId: 'diagnostics',
    items: [
      { id: 'u2', name: 'УЗИ брюшной полости', price: '3 200 ₽' }
    ]
  },
  {
    id: 'fgds',
    name: 'ФГДС под наркозом (гастроскопия)',
    tabId: 'diagnostics',
    items: [
      { id: 'f1', name: 'Видеоэзофагогастродуоденоскопия (ФГДС) с седацией', price: '8 500 ₽' }
    ]
  }
];
