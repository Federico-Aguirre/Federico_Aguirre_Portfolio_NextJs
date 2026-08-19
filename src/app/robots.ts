import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Permite el acceso a todos los buscadores (Google, Bing, etc.)
      allow: "/",     // Les permite indexar todo el sitio web
    },
    // RUTA OPCIONAL SI LLEGARAS A TENER SITEMAP:
    // sitemap: "https://federico-aguirre-portfolio-next-js.vercel.app/sitemap.xml",
  };
}