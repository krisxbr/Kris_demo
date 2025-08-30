export type IconProps = {
  className?: string;
};

export type Lesson = {
  id: string;
  title: string;
  author: string;
  tags: string[];
  language: string;
  level: "Beginner" | "Intermediate" | "Advanced" | string;
  rating: number;
  favorites: number;
  thumb: string;
  location: { country: string; city: string };
};

export type MapAsset = {
  id: string;
  title: string;
  author: string;
  authorId: string;
  tags: string[];
  description: string;
  thumb: string;
  visibility: "Public" | "Private";
};

export type Page = "Home" | "Map" | "Lessons" | "Create" | "About";