// services/types/petisi.ts
import { StrapiImage } from "./about";

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

export interface PetisiItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  content: RichTextBlock[];
  jumlah_ttd: string;
  link_petisi: string;
  datePetisi: string;
  createdAt: string;
  cover_image: StrapiImage | null;
}

export interface PetisiResponse {
  data: PetisiItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
