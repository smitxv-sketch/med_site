export interface SpecialOffer {
  id: string;
  title: string;
  validUntil: string;
  image?: string;
}

export interface ISpecialOffersRepository {
  getSpecialOffers(): Promise<SpecialOffer[]>;
}

const mockSpecialOffers: SpecialOffer[] = [
  {
    id: 'pensioners',
    title: 'Скидка 10% пенсионерам на все услуги клиники',
    validUntil: '31 декабря 2026 года',
    image: 'https://www.tgu-dpo.ru/wp-content/uploads/2026/04/uvelichit-pensiyu-po-starosti.jpg'
  },
  {
    id: 'svo',
    title: 'Скидка 15% участникам СВО и членам их семей',
    validUntil: '31 декабря 2026 года',
    image: 'https://www.pnp.ru//upload/entities/2023/08/02/16/article/detailPicture/8a/7f/16/6e/bd391a97c7813f9a7748f2b2462b52ed.webp'
  },
  {
    id: 'students',
    title: 'Учись студент и будь спокоен за свое здоровье, скидка 7% студентам',
    validUntil: '31 декабря 2026 года',
    image: 'https://vogazeta.ru/uploads/full_size_1663225811-dcc483ce2f009ced264ee0735acd1331.jpg'
  },
  {
    id: 'eko',
    title: 'ЭКО за 99000₽ и криоперенос за 49000₽',
    validUntil: '31 декабря 2026 года',
    image: 'https://myclinic.by/sites/default/files/inline-images/Kak-delaetsya-EKO.jpg'
  }
];

export class MockSpecialOffersRepository implements ISpecialOffersRepository {
  async getSpecialOffers(): Promise<SpecialOffer[]> {
    return Promise.resolve(mockSpecialOffers);
  }
}
