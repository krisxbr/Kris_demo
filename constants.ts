import { Lesson, MapAsset } from './types';

export const FALLBACK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'>
    <defs>
      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0%' stop-color='#eff6ff'/>
        <stop offset='100%' stop-color='#e0f2fe'/>
      </linearGradient>
    </defs>
    <rect width='1200' height='400' fill='url(#g)'/>
    <g fill='none' stroke='#2563eb' stroke-width='2' opacity='0.35'>
      <path d='M0,260 Q200,180 400,230 T800,220 T1200,240'/>
      <path d='M0,300 Q250,260 500,290 T1000,280 T1200,300'/>
    </g>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='28' fill='#1f2937'>Map preview</text>
    <text x='50%' y='58%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='14' fill='#4b5563'>Fallback image (no network needed)</text>
  </svg>`
)}`;

export const MOCK_LESSONS: Lesson[] = [
  {
    id: "l1",
    title: "Ancient Rome: Forum & Temples",
    author: "Interactive Bulgaria Foundation",
    tags: ["History", "Ancient Rome", "VR Ready", "Architecture", "Italy", "Educational", "360 Tour"],
    language: "EN",
    level: "Intermediate",
    rating: 4.8,
    favorites: 812,
    thumb: "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop",
    location: { country: "Italy", city: "Rome" },
  },
  {
    id: "l2",
    title: "Bulgarian Revival Architecture",
    author: "SENA Competence Center",
    tags: ["Architecture", "Culture", "360°"],
    language: "BG",
    level: "Beginner",
    rating: 4.6,
    favorites: 421,
    thumb: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=1200&auto=format&fit=crop",
    location: { country: "Bulgaria", city: "Koprivshtitsa" },
  },
  {
    id: "l3",
    title: "Marine Ecosystems: Coastal Dunes",
    author: "AI Resource Center",
    tags: ["Biology", "Environment", "Quiz"],
    language: "EN",
    level: "Advanced",
    rating: 4.9,
    favorites: 1021,
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    location: { country: "Greece", city: "Lefkada" },
  },
  {
    id: "l4",
    title: "Vienna: Baroque Palace Symbols",
    author: "European School Brussels IV",
    tags: ["Art", "Baroque", "Symbols"],
    language: "EN",
    level: "Intermediate",
    rating: 4.7,
    favorites: 593,
    thumb: "https://images.unsplash.com/photo-1544829728-e5cb9eedf658?q=80&w=1200&auto=format&fit=crop",
    location: { country: "Austria", city: "Vienna" },
  },
];

export const MOCK_USER_ID = "user_01";

export const MOCK_MAP_ASSETS: MapAsset[] = [
  {
    id: "ma1",
    title: "Old Town, Koprivshtitsa",
    author: "SENA Competence Center",
    authorId: "user_02",
    tags: ["Architecture", "Culture", "360°", "Bulgaria"],
    description: "A panoramic view of the iconic architecture in Koprivshtitsa, showcasing the Bulgarian Revival period.",
    thumb: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=800&auto=format&fit=crop",
    visibility: "Public",
  },
  {
    id: "ma2",
    title: "Roman Forum Ruins",
    author: "Interactive Bulgaria Foundation",
    authorId: "user_01",
    tags: ["History", "Ancient Rome", "VR Ready", "Italy"],
    description: "Explore the heart of ancient Rome. This 360° image captures the remaining columns and structures of the Forum.",
    thumb: "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=800&auto=format&fit=crop",
    visibility: "Public",
  },
  {
    id: "ma3",
    title: "Coastal Dunes of Lefkada",
    author: "AI Resource Center",
    authorId: "user_03",
    tags: ["Biology", "Environment", "Greece"],
    description: "A serene 360° view of the coastal dunes and turquoise waters of Lefkada, Greece. An ideal asset for environmental studies.",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    visibility: "Public",
  },
  {
    id: "ma4",
    title: "Belvedere Palace, Vienna",
    author: "European School Brussels IV",
    authorId: "user_04",
    tags: ["Art", "Baroque", "Austria", "Vienna"],
    description: "A stunning panoramic shot of the Belvedere Palace in Vienna, a masterpiece of Baroque architecture.",
    thumb: "https://images.unsplash.com/photo-1544829728-e5cb9eedf658?q=80&w=800&auto=format&fit=crop",
    visibility: "Public",
  },
  {
    id: "ma5",
    title: "My Secret Garden Spot",
    author: "Interactive Bulgaria Foundation",
    authorId: "user_01",
    tags: ["Personal", "Nature", "Quiet"],
    description: "A personal 360° image from my private garden. Not for public use.",
    thumb: "https://images.unsplash.com/photo-1444090542259-0af8fa96557e?q=80&w=800&auto=format&fit=crop",
    visibility: "Private",
  },
];

export const QA: Array<{ q: string; a: string }> = [
  { q: "Is Study360 free?", a: "Yes. All assets are free for educational use. Copyright stays with authors." },
  { q: "Can I use public images from the map in my lessons?", a: "Yes, you can build lessons using public map assets or your own uploads." },
  { q: "How do I embed a lesson?", a: "After publishing, copy the link or iframe and paste it into Moodle, Google Sites, or any website." },
  { q: "Which file types can I upload?", a: "360° images (.jpg) and 360° videos (.mp4) are supported in this mock." },
];