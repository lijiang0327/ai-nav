export interface Subcategory {
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  subcategories?: Subcategory[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  isHot?: boolean;
  isNew?: boolean;
  image?: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  keywords: string[];
  url: string;
}
