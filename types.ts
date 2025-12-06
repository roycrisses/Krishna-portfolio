export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  previewMode?: 'iframe' | 'image';
}

export interface Experience {
  id: number;
  year: string;
  title: string;
  organization: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}
