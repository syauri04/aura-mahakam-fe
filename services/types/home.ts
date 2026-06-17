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

export interface HeroHome {
  id: number;
  Summary: string;
  __component: "hero.hero-home";
}

export interface CardKegiatan {
  id: number;
  title: string;
  button_text: string;
  button_colors: string;
  button_link: string;
  image: StrapiImage | null;
}

export interface HomeData {
  id: number;
  documentId: string;
  locale: string;
  embed_youtube: string;
  hero: HeroHome[];
  card_kegiatan: CardKegiatan[];
}

export interface HomeResponse {
  data: HomeData;
  meta: object;
}
