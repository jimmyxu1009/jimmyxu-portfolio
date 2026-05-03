export interface Project {
  id: string;
  title: string;
  image: string;
  tags: string[];
  link?: string;
  hideTitle?: boolean;
  techs?: string[];
  description?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ToolStack {
  name: string;
  category: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
  link?: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
  items: GalleryItem[];
}
