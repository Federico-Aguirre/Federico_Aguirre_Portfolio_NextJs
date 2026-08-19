// src/data/projectsData.ts
import firstProject from "@/assets/cardImages/ReactJs-Chat-App/ReactJs-Chat-App.png";
import secondProject from "@/assets/cardImages/ReactJs-E-commerce/ReactJs-E-commerce.png";
import thirdProject from "@/assets/cardImages/Laravel-E-commerce/Laravel-E-commerce.jpg";
import fourthProject from "@/assets/cardImages/ChessJs/ChessJs.png";
import fifthProject from "@/assets/cardImages/NextJs E-commerce/nextjs ecommerce.jpg";
import sixthProject from "@/assets/cardImages/Figma/figma.jpg";
import { StaticImageData } from "next/image";

export interface ProjectData {
  slug: string;
  category?: "main" | "lab"; // Se agrega para que TypeScript reconozca el filtro por categoría
  title: string;
  dependencies: string;
  image: StaticImageData;
  liveUrl: string;
  githubUrl?: string;
  videoUrl: string;
  descriptionKey: string;
}

// 👈 Exportamos el tipo 'Project' como alias para mantener coherencia en la app
export type Project = ProjectData;

export const PROJECTS_DATA: ProjectData[] = [
  {
    slug: "nextJs-ecommerce",
    category: "main",
    title: "NextJs E-commerce",
    dependencies: "Next.js 16, TypeScript, Tailwind 4, Prisma, GraphQL, Zustand",
    image: fifthProject,
    liveUrl: "https://next-js-e-commerce-999.vercel.app",
    videoUrl: "/videos/nextjs-e-commerce-video.mp4",
    descriptionKey: "nextJsEcommerceDescription",
  },
  {
    slug: "laravel-ecommerce",
    category: "main",
    title: "Laravel E-commerce",
    dependencies: "Laravel, JavaScript, SASS, Tailwind, PHP Unit, Laravel Dusk, Laravel Socialite, Paypal SDK, OAuth 2.0, Render, Neon, Docker",
    image: thirdProject,
    liveUrl: "https://veterinaria-laravel.onrender.com",
    videoUrl: "",
    descriptionKey: "laravelEcommerceDescription",
  },
  {
    slug: "chat-app",
    category: "main",
    title: "React.js Chat App",
    dependencies: "React 19, TypeScript, Node.js, Express, Socket.IO, Redux Toolkit, Tailwind CSS v4, MongoDB, JWT, Google OAuth 2.0, Cloudinary.",
    image: firstProject,
    liveUrl: "https://federico-aguirre.github.io/ChatApp",
    videoUrl: "",
    descriptionKey: "chatAppDescription",
  },
  {
    slug: "react-ecommerce",
    category: "lab",
    title: "React.js E-commerce",
    dependencies: "React.js, Bootstrap, CSS, react-router-dom, Firebase",
    image: secondProject,
    liveUrl: "http://reactjs-ecommerce-by-federico-aguirre.netlify.app",
    videoUrl: "",
    descriptionKey: "reactJsEcommerceDescription",
  },
  {
    slug: "chess-app",
    category: "lab",
    title: "Chess App",
    dependencies: "HTML, CSS, JavaScript",
    image: fourthProject,
    liveUrl: "https://chessappjs.netlify.app",
    videoUrl: "/videos/chess-app-video.mp4",
    descriptionKey: "chessAppDescription",
  },
  {
    slug: "maquetado-figma",
    category: "lab",
    title: "Diseño y Maquetado UI/UX",
    dependencies: "Figma, Auto Layout, Design System, UI/UX",
    image: sixthProject,
    liveUrl: "https://www.figma.com/design/PNNaoufOWP0vxIJh3ffMIE/pp3-veterinaria?node-id=0-1&t=hYgPxQSrvHHWgPE0-1",
    videoUrl: "/videos/figma-video.mp4", 
    descriptionKey: "figmaProjectDescription",
  }
];