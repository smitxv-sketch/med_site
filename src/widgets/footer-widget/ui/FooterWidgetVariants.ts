export interface FooterData {
  text?: string;
  navigation?: Array<{
    label: string;
    link: string;
  }>;
  socials?: Array<{
    icon: string;
    link: string;
  }>;
}
