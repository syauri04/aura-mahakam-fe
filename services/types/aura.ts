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

export interface AuraIntro {
  id: number;
  title: string;
  summary: string;
}

export interface AuraDetail {
  id: number;
  title: string;
  content: string;
}

export interface AuraData {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  button_variant: string;
  locale: string;
  image: StrapiImage | null;
  intro: AuraIntro | null;
  Detail: AuraDetail[];
}

export interface AuraResponse {
  data: AuraData[];
  meta: object;
}
