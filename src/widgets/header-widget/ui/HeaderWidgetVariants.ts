export interface HeaderData {
  logo?: {
    url?: string;
    text?: string;
  };
  navigation?: Array<{
    label: string;
    link: string;
  }>;
  contact?: {
    phone?: string;
    actionLabel?: string;
  };
}
