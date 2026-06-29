// services/types/dukung.ts

export interface HeroDukung {
  id: number;
  title: string;
  relawan: string;
  donatur: string;
  pendukung_petisi: string;
  __component: "hero.hero-dukung";
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

export interface DukungDefault {
  id: number;
  title: string;
  subtitle: string;
  summary: string;
  link: string;
  title_section: string;
  content: RichTextBlock[];
  slug: string;
  __component: "dukung.dukung-default";
}

export interface BlockSection {
  id: number;
  title: string;
  summary: string;
}

export interface DukungDonasi {
  id: number;
  title: string;
  title_section_1: string;
  description: string;
  summary: string;
  title_section_2: string;
  block_section: BlockSection[];
  blok_dukung: BlockSection[];
  __component: "dukung.dukung-donasi";
}

export type ContentDukung = DukungDefault | DukungDonasi;

export interface DukungData {
  id: number;
  documentId: string;
  locale: string;
  hero: HeroDukung[];
  content_dukung: ContentDukung[];
}

export interface DukungResponse {
  data: DukungData;
  meta: object;
}

export type AnyDukungContent = DukungDefault | DukungDonasi;
