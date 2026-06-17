export interface ContentSuaraCoverImage {
  url: string;
  alternativeText: string | null;
  formats: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

export interface HeroSuara {
  id: number;
  title: string;
  summary: string;
  __component: "hero.hero-about";
}

export interface CategorySuara {
  id: number;
  slug: string;
  title: string;
  summary: string;
}

export interface SuaraData {
  id: number;
  documentId: string;
  locale: string;
  category_suara: CategorySuara[];
  hero: HeroSuara[];
}

export interface SuaraResponse {
  data: SuaraData;
  meta: object;
}

export interface ContentSuaraItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  type: string;
  datePost: string;
  createdAt: string;
  cover_image: ContentSuaraCoverImage | null;
}

export interface ContentSuaraResponse {
  data: ContentSuaraItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
