// src/data/projectsData.ts
import firstProject from "@/assets/cardImages/ReactJs-Chat-App/ReactJs-Chat-App.png";
import secondProject from "@/assets/cardImages/ReactJs-E-commerce/ReactJs-E-commerce.png";
import thirdProject from "@/assets/cardImages/Laravel-E-commerce/Laravel-E-commerce.jpg";
import fourthProject from "@/assets/cardImages/ChessJs/ChessJs.png";
import fifthProject from "@/assets/cardImages/NextJs-E-commerce/NextJs-E-commerce.jpg";
import sixthProject from "@/assets/cardImages/Figma/figma.jpg";
import seventhProject from "@/assets/cardImages/WordPress-E-commerce/WordPress-E-commerce.png";

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
    dependencies: "Next.js 16, TypeScript, Tailwind CSS 4, Prisma, GraphQL, Zustand",
    image: fifthProject,
    liveUrl: "https://next-js-e-commerce-999.vercel.app",
    githubUrl: "https://github.com/Federico-Aguirre/next.js-e-commerce",
    videoUrl: "/videos/nextjs-e-commerce-video.mp4",
    descriptionKey: "nextJsEcommerceDescription",
  },
  {
    slug: "laravel-ecommerce",
    category: "main",
    title: "Laravel E-commerce",
    dependencies: "Laravel, PHP, JavaScript, Sass, Tailwind, PHPUnit, Dusk, Socialite, PayPal, OAuth 2.0, Docker, Neon",
    image: thirdProject,
    liveUrl: "https://veterinaria-laravel.onrender.com",
    githubUrl: "https://github.com/Federico-Aguirre/Veterinaria_Laravel",
    videoUrl: "",
    descriptionKey: "laravelEcommerceDescription",
  },
  {
    slug: "chat-app",
    category: "main",
    title: "React.js Chat App",
    dependencies: "React 19, TypeScript, Node.js, Express, Socket.IO, Redux, Tailwind CSS 4, MongoDB, JWT, Google OAuth, Cloudinary",
    image: firstProject,
    liveUrl: "https://federico-aguirre-chat-app.vercel.app",
    githubUrl: "https://github.com/Federico-Aguirre/ChatApp",
    videoUrl: "",
    descriptionKey: "chatAppDescription",
  },
  {
    slug: "react-ecommerce",
    category: "lab",
    title: "React.js E-commerce",
    dependencies: "React, Bootstrap, CSS, React Router, Firebase",
    image: secondProject,
    liveUrl: "http://reactjs-ecommerce-by-federico-aguirre.netlify.app",
    githubUrl: "https://github.com/Federico-Aguirre/React-E-commerce",
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
    githubUrl: "https://github.com/Federico-Aguirre/ChessJs",
    videoUrl: "/videos/chess-app-video.mp4",
    descriptionKey: "chessAppDescription",
  },
  {
    slug: "maquetado-figma",
    category: "lab",
    title: "Diseño y Maquetado UI/UX",
    dependencies: "Figma, Auto Layout, UI/UX, Design System",
    image: sixthProject,
    liveUrl: "https://www.figma.com/design/PNNaoufOWP0vxIJh3ffMIE/pp3-veterinaria?node-id=0-1&t=hYgPxQSrvHHWgPE0-1",
    videoUrl: "/videos/figma-video.mp4", 
    descriptionKey: "figmaProjectDescription",
  },
  {
    slug: "wordPress-ecommerce",
    category: "lab",
    title: "WordPress E-commerce",
    dependencies: "WordPress, WooCommerce, Elementor, Astra",
    image: seventhProject,
    liveUrl: "https://wordpress-e-commerce.infinityfreeapp.com",
    videoUrl: "",
    descriptionKey: "wordPressEcommerceDescription",
  }
];