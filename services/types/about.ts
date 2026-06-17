export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
}

export interface HeroAbout {
  id: number;
  Title: string;
  Summary_1: string;
  Summary_2: string;
  __component: "hero.hero-about";
}

export interface AboutData {
  id: number;
  documentId: string;
  locale: string;
  title_section: string;
  summary_section: string;
  Hero: HeroAbout[];
}

export interface AboutResponse {
  data: AboutData;
  meta: object;
}

export interface CardAuraDetail {
  id: number;
  title: string;
  content: string; // markdown string dengan bullet points
}

export interface CardAuraItem {
  id: number;
  documentId: string;
  aura: string;
  slug: string;
  image: StrapiImage;
  detail: CardAuraDetail;
}

export interface CardAuraResponse {
  data: CardAuraItem[];
  meta: object;
}
