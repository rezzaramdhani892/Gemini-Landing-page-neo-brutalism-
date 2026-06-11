import { Project, Skill, Sticker } from './types';

export const USER_INFO = {
  name: "MAX DEVEReux",
  role: "CREATIVE SITE WEB ARCHITECT",
  bio: "Crafting extremely loud interfaces, solid backend architectures, and high-contrast digital playgrounds. I hate boring grids, standard layouts, and bland colors. Let's build the future with giant thick borders.",
  avatar: "/src/assets/images/avatar_male_hoodie_1781199576411.jpg",
  status: "OPEN FOR CHAOTIC COLLABORATIONS",
  location: "UTC+7 / TOKYO-JAKARTA TIMEZONE",
  tags: ["#NEOBRUTALISM", "#REACT19", "#TAILWIND_V4", "#NO_BORING_DESIGN"]
};

export const PROJECTS: Project[] = [
  {
    id: "anarchy-engine",
    title: "ANARCHY ENGINE v2.0",
    description: "High-performance shader simulator that bypasses traditional layout rules for full pixel control.",
    detailedText: "Anarchy Engine is an experimental GPU-accelerated graphic interpreter using React hooks and WebGL. It lets designers bypass structured grid restrictions to position DOM components in organic, momentum-based visual nodes.",
    tags: ["React 19", "WebGL", "TypeScript", "TailwindCSS"],
    color: "pink",
    link: "https://github.com/example/anarchy-engine",
    demoUrl: "#",
    stats: [
      { label: "Stars", value: "3.4k" },
      { label: "Performance", value: "60fps" },
      { label: "Dependencies", value: "0" }
    ]
  },
  {
    id: "neo-dock",
    title: "NEO-DOCK INTERACTIVE",
    description: "Minimalist desk companion equipped with dynamic clocks, widgets, & retro synthesizers.",
    detailedText: "A virtual workspace replacement designed for developers who love clutter-free physical setups but crave intense, high-contrast digital utility. Featuring a real-time system monitor, coffee intake tracker, and high-fidelity soundboard.",
    tags: ["TypeScript", "LocalStorage", "Motion", "WebAudio"],
    color: "yellow",
    link: "https://github.com/example/neo-dock",
    demoUrl: "#",
    stats: [
      { label: "Users", value: "12,900" },
      { label: "Themes", value: "Mono Only" },
      { label: "Weight", value: "48KB" }
    ]
  },
  {
    id: "pixel-chaos",
    title: "PIXEL CHAOS STAMP",
    description: "Collaborative, real-time pixel board allowing multiple visitors to stamp customized vector stickers.",
    detailedText: "Pixel Chaos redefines digital guestbooks by replacing simple text lines with high-contrast, randomized visual stamp cards. Features persistent browser serialization and custom micro-stretching layout grids.",
    tags: ["React Hooks", "Bento Grid", "CSS Canvas"],
    color: "green",
    link: "https://github.com/example/pixel-chaos",
    demoUrl: "#",
    stats: [
      { label: "Stickers", value: "54,201" },
      { label: "Speed", value: "<12ms" },
      { label: "Rating", value: "9.9/10" }
    ]
  },
  {
    id: "void-chat",
    title: "VOID SECURE TERMINAL",
    description: "An offline-first aesthetic shell messaging portal with bespoke Neobrutalist layouts.",
    detailedText: "Void is an interactive, heavily styled messaging sandbox that relies on browser cookies and symmetric encoding. Built to demonstrate that cryptographic applications can look strikingly beautiful rather than visually flat.",
    tags: ["NodeJS", "Crypto API", "Custom CSS"],
    color: "blue",
    link: "https://github.com/example/void-chat",
    demoUrl: "#",
    stats: [
      { label: "Keys", value: "256-bit" },
      { label: "Style", value: "Industrial" },
      { label: "Load Time", value: "0.2s" }
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: "React 19 / Vite", category: "frontend", level: 9, color: "bg-neo-yellow", description: "Bespoke rendering, hook optimization, custom client states." },
  { name: "Tailwind CSS v4", category: "frontend", level: 10, color: "bg-neo-blue", description: "Utterly clean utility setups, custom CSS variables, pure components." },
  { name: "Motion Animations", category: "frontend", level: 9, color: "bg-neo-pink", description: "Smooth spring mechanics, layout shifts, staggering effects." },
  { name: "NodeJS / Express", category: "backend", level: 8, color: "bg-neo-purple", description: "High-performance endpoint proxying, middleware architectures." },
  { name: "LocalStorage Engines", category: "backend", level: 9, color: "bg-neo-orange", description: "No-SQL instant local states, deep nested object tracking." },
  { name: "Authentic Design", category: "design", level: 10, color: "bg-neo-green", description: "Thick lines, striking shadows, maximum legibility." }
];

export const STICKERS: Sticker[] = [
  { id: "1", text: "DRAG ME!", icon: "Grab", color: "bg-neo-yellow", defaultX: 10, defaultY: 15 },
  { id: "2", text: "CSS IS ART", icon: "Palette", color: "bg-neo-pink", defaultX: 70, defaultY: 10 },
  { id: "3", text: "CODE IS LAW", icon: "Code", color: "bg-neo-green", defaultX: 45, defaultY: 35 },
  { id: "4", text: "COFFEE FUEL", icon: "Coffee", color: "bg-neo-orange", defaultX: 20, defaultY: 65 },
  { id: "5", text: "BUG CREATOR", icon: "Bug", color: "bg-neo-blue", defaultX: 75, defaultY: 60 }
];
