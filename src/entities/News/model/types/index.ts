interface ILang {
  en: string;
  ru: string;
  qq: string;
  kk: string;
  uz: string;
  oz: string;
}

export interface INewsForm {
  title: ILang;
  description: ILang;
  status: NewsStatus;
  publishedAt: string | string[];
}

export interface IPostNews extends INewsForm {
  images: string[];
}

interface IAuthor {
  id: number;
  email: string;
  name: string;
}

export enum NewsStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
  PENDING = "PENDING",
}

export interface INews {
  id: number;
  author: IAuthor;
  authorId: number;

  description: string;
  title: string;
  images: string[];
  publishedAt: string;
  status: NewsStatus;

  createdAt: string;
  updatedAt: string;
}

export interface INewsOne {
  title: ILang;
  description: ILang;
  status: NewsStatus;
  images: string[];
}
