// services/types/kegiatan.ts

export interface StrapiImageFormat {
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
export interface ButtonLink {
  id: number;
  title: string; // bukan label, dari JSON ternyata "title"
  link: string; // bukan href, dari JSON ternyata "link"
}
export interface RichTextChild {
  type: string;
  text?: string;
  bold?: boolean;
  children?: RichTextChild[];
}

export interface RichTextBlock {
  type: string;
  format?: string;
  children: RichTextChild[];
}

export interface CardKegiatanSection {
  id: number;
  title: string;
  subtitle: string;
  content: RichTextBlock[];
  add_quotes: "yes" | "no";
  quotes: string | null;
  notes: string | null;
  button_link: ButtonLink[];
}

export interface ContentSuaraRef {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  type: string;
  datePost: string | null;
  createdAt: string;
  locale: string;
}

export interface KegiatanThemeDefault {
  id: number;
  title: string;
  summary: string;
  description: RichTextBlock[];
  dateEvent: string;
  id_embed_youtube: string;
  content_suara: ContentSuaraRef | null;
  __component: "kegiatan.theme-default";
}

export interface KegiatanThemeMahakam {
  id: number;
  title: string;
  summary: string;
  description: RichTextBlock[];
  dateEvent: string;
  title_section_1: string;
  id_embed_youtube: string;
  title_section_2: string;
  summary_section_2: string;
  description_section_2: RichTextBlock[];
  image_section_1: StrapiImageFormat | null;
  card_kegiatan_section_1: CardKegiatanSection[];
  card_kegiatan_section_2: CardKegiatanSection[];
  __component: "kegiatan.theme-mahakam";
}

export type SubKegiatan = KegiatanThemeDefault | KegiatanThemeMahakam;

export interface KegiatanData {
  id: number;
  documentId: string;
  locale: string;
  sub_kegiatan: SubKegiatan[];
}

export interface KegiatanResponse {
  data: KegiatanData;
  meta: object;
}
