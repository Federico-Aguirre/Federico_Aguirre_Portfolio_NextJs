"use client"
import React, { useEffect, useState, useRef, useMemo, useLayoutEffect } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import { useTranslations } from "next-intl"
import * as Icons from "@/app/components/icons"

const ICONS_MAP: Record<string, React.ElementType> = {
  "reactJs": Icons.ReactIcon, "javascript": Icons.JavaScriptIcon, "typescript": Icons.TypeScriptIcon,
  "nextJs": Icons.NextJsIcon, "redux": Icons.ReduxIcon, "zustand": Icons.ZustandIcon,
  "html": Icons.HtmlIcon, "css": Icons.CssIcon, "postCss": Icons.PostCssIcon,
  "sass": Icons.SassIcon, "tailwind": Icons.TailwindIcon, "materialUi": Icons.MaterialUiIcon,
  "bootstrap": Icons.BootstrapIcon, "framerMotion": Icons.FramerMotionIcon, "particle": Icons.ParticleIcon,
  "million": Icons.MillionIcon, "mantine": Icons.MantineIcon, "nodeJs": Icons.NodeJsIcon,
  "express": Icons.ExpressJsIcon, "php": Icons.PhpIcon, "laravel": Icons.LaravelIcon,
  "socketIo": Icons.SocketIoIcon, "wordPress": Icons.WordPressIcon, "wooCommerce": Icons.WooCommerceIcon,
  "restApi": Icons.RestApiIcon, "sql": Icons.SqlIcon, "mySql": Icons.MySqlIcon,
  "postgreSql": Icons.PostgreSqlIcon, "supabase": Icons.SupabaseIcon, "firebase": Icons.FirebaseIcon,
  "aws": Icons.AwsIcon, "vercel": Icons.VercelIcon, "netlify": Icons.NetlifyIcon,
  "heroku": Icons.HerokuIcon, "render": Icons.RenderIcon, "neon": Icons.NeonIcon,
  "googleCloud": Icons.GoogleCloudIcon, "git": Icons.GitIcon, "gitHub": Icons.GitHubIcon,
  "gitLab": Icons.GitLabIcon, "docker": Icons.DockerIcon, "jenkins": Icons.JenkinsIcon,
  "figma": Icons.FigmaIcon, "uxDesign": Icons.UxDesignIcon, "jira": Icons.JiraIcon,
  "trello": Icons.TrelloIcon, "postman": Icons.PostmanIcon, "babel": Icons.BabelIcon,
  "jest": Icons.JestIcon, "phpUnit": Icons.PhpUnitIcon, "laravelDusk": Icons.LaravelDuskIcon,
  "manualTesting": Icons.ManualTestingIcon,
}

const DATA_SKELETON = [
  { id: "frontend", mainIcon: "reactJs", techs: [ { id: "javascript", icon: "javascript" }, { id: "typescript", icon: "typescript" }, { id: "reactJs", icon: "reactJs" }, { id: "nextJs", icon: "nextJs" }, { id: "redux", icon: "redux" }, { id: "zustand", icon: "zustand" }, { id: "html", icon: "html" }, { id: "css", icon: "css" }, { id: "postCss", icon: "postCss" }, { id: "sass", icon: "sass" }, { id: "tailwind", icon: "tailwind" }, { id: "materialUi", icon: "materialUi" }, { id: "bootstrap", icon: "bootstrap" }, { id: "framerMotion", icon: "framerMotion" }, { id: "particle", icon: "particle" }, { id: "million", icon: "million" }, { id: "mantine", icon: "mantine" } ] },
  { id: "backend", mainIcon: "nodeJs", techs: [ { id: "nodeJs", icon: "nodeJs" }, { id: "express", icon: "express" }, { id: "php", icon: "php" }, { id: "laravel", icon: "laravel" }, { id: "socketIo", icon: "socketIo" }, { id: "wordPress", icon: "wordPress" }, { id: "wooCommerce", icon: "wooCommerce" }, { id: "restApi", icon: "restApi" } ] },
  { id: "db", mainIcon: "sql", techs: [ { id: "sql", icon: "sql" }, { id: "mySql", icon: "mySql" }, { id: "postgreSql", icon: "postgreSql" }, { id: "supabase", icon: "supabase" }, { id: "firebase", icon: "firebase" } ] },
  { id: "hosting", mainIcon: "aws", techs: [ { id: "vercel", icon: "vercel" }, { id: "netlify", icon: "netlify" }, { id: "heroku", icon: "heroku" }, { id: "render", icon: "render" }, { id: "neon", icon: "neon" }, { id: "aws", icon: "aws" }, { id: "googleCloud", icon: "googleCloud" } ] },
  { id: "devops", mainIcon: "git", techs: [ { id: "git", icon: "git" }, { id: "gitHub", icon: "gitHub" }, { id: "gitLab", icon: "gitLab" }, { id: "docker", icon: "docker" }, { id: "jenkins", icon: "jenkins" } ] },
  { id: "design", mainIcon: "figma", techs: [ { id: "figma", icon: "figma" }, { id: "uxDesign", icon: "uxDesign" } ] },
  { id: "tools", mainIcon: "jira", techs: [ { id: "jira", icon: "jira" }, { id: "trello", icon: "trello" }, { id: "postman", icon: "postman" }, { id: "babel", icon: "babel" } ] },
  { id: "testing", mainIcon: "jest", techs: [ { id: "jest", icon: "jest" }, { id: "phpUnit", icon: "phpUnit" }, { id: "laravelDusk", icon: "laravelDusk" }, { id: "manualTesting", icon: "manualTesting" } ] }
]

const RouletteWheel = ({ items, selectedId, onSelect, size, gap, renderCard }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const stride = size + gap;

  const tripleItems = useMemo(() => 
    [...items, ...items, ...items].map((it, i) => ({ ...it, uKey: `w-${i}-${it.id}` })), 
  [items]);

  const centerWheel = (isImmediate = false) => {
    if (!containerRef.current) return;
    
    // getBoundingClientRect es vital en móvil para obtener el ancho real tras el padding del padre
    const rect = containerRef.current.getBoundingClientRect();
    const containerWidth = rect.width;
    
    const itemIndex = items.findIndex((it: any) => it.id === selectedId);
    if (itemIndex === -1) return;

    // Cálculo central exacto
    const targetX = -((items.length + itemIndex) * stride) + (containerWidth / 2) - (size / 2);
    
    if (isImmediate) {
      x.set(targetX);
    } else {
      animate(x, targetX, { type: "spring", stiffness: 200, damping: 25 });
    }
  };

  // Usamos useLayoutEffect para que el cálculo ocurra antes de que el usuario vea el "salto"
  useLayoutEffect(() => {
    centerWheel(true);
    const handleResize = () => centerWheel(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedId, items.length, size]);

  const move = (dir: number) => {
    const idx = items.findIndex((it: any) => it.id === selectedId);
    let next = (idx + dir + items.length) % items.length;
    onSelect(items[next]);
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        position: 'relative', 
        height: `${size + 25}px`, 
        margin: '10px 0', 
        overflow: 'hidden',
        touchAction: 'pan-y' // Evita scroll accidental en móvil
      }}
    >
      {/* Flechas con z-index alto para móvil */}
<div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', padding: '0 2px', zIndex: 100, pointerEvents: 'none' }}>
  
  {/* Botón Izquierdo */}
  <motion.button 
    onClick={() => move(-1)} 
    whileHover={{ 
      backgroundColor: "#00E5FF", // El celeste del borde
      color: "#000000",           // La flecha se vuelve negra
      scale: 1.1                  // Opcional: un pequeño crecimiento
    }}
    transition={{ duration: 0.2 }}
    style={{ 
      pointerEvents: 'auto', 
      background: 'rgba(0,0,0,0.8)', 
      border: '1px solid #00E5FF', 
      color: '#00E5FF', 
      borderRadius: '50%', 
      width: '35px', 
      height: '35px', 
      cursor: 'pointer', 
      fontSize: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    ‹
  </motion.button>

  {/* Botón Derecho */}
  <motion.button 
    onClick={() => move(1)} 
    whileHover={{ 
      backgroundColor: "#00E5FF", 
      color: "#000000",
      scale: 1.1 
    }}
    transition={{ duration: 0.2 }}
    style={{ 
      pointerEvents: 'auto', 
      background: 'rgba(0,0,0,0.8)', 
      border: '1px solid #00E5FF', 
      color: '#00E5FF', 
      borderRadius: '50%', 
      width: '35px', 
      height: '35px', 
      cursor: 'pointer', 
      fontSize: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    ›
  </motion.button>
</div>
      
      <motion.div style={{ x, display: 'flex', gap: `${gap}px`, width: 'max-content', height: '100%', alignItems: 'center' }}>
        {tripleItems.map((item) => (
          <div key={item.uKey} onClick={() => onSelect(item)} style={{ width: size, height: size, flexShrink: 0 }}>
            {renderCard(item, item.id === selectedId)}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const SkillsRoulette = () => {
  const t = useTranslations("about.SkillsSection");
  const [mounted, setMounted] = useState(false);
  const [activeCatId, setActiveCatId] = useState("frontend");
  const [activeTechId, setActiveTechId] = useState("javascript");

  useEffect(() => setMounted(true), []);

  const categories = useMemo(() => DATA_SKELETON.map(cat => ({
    ...cat,
    name: t(`categories.${cat.id}`),
    techs: cat.techs.map(tech => ({
      ...tech,
      label: t(`techs.${tech.id}.name`),
      description: t(`techs.${tech.id}.desc`)
    }))
  })), [t]);

  const activeCategory = categories.find(c => c.id === activeCatId) || categories[0];
  const activeTech = activeCategory.techs.find(tk => tk.id === activeTechId) || activeCategory.techs[0];

  if (!mounted) return null;

  return (
    <div style={{ 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '10px', 
      maxWidth: '100vw', 
      overflow: 'hidden',
      padding: '10px 0' 
    }}>
      
      {/* RUEDA 1: CATEGORÍAS */}
      <RouletteWheel 
        items={categories} 
        selectedId={activeCatId}
        onSelect={(c: any) => { setActiveCatId(c.id); setActiveTechId(c.techs[0].id); }}
        size={110} gap={15}
        renderCard={(item: any, active: boolean) => {
          const Icon = ICONS_MAP[item.mainIcon];
          return (
            <div style={{
              width: '100%', height: '100%', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: active ? '2px solid #00E5FF' : '1px solid rgba(255,255,255,0.1)',
              background: active ? 'rgba(0,229,255,0.15)' : 'rgba(0,0,0,0.5)',
              transform: active ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease-out'
            }}>
              {Icon && <Icon width={28} height={28} isActive={active} />}
              <span style={{ fontSize: '0.6rem', marginTop: '5px', color: active ? '#fff' : '#888', textAlign: 'center' }}>{item.name}</span>
            </div>
          )
        }}
      />

      {/* RUEDA 2: TECS */}
      <RouletteWheel 
        key={`wheel-tech-${activeCatId}`}
        items={activeCategory.techs} 
        selectedId={activeTechId}
        onSelect={(tk: any) => setActiveTechId(tk.id)}
        size={85} gap={15}
        renderCard={(tk: any, active: boolean) => {
          const Icon = ICONS_MAP[tk.icon];
          return (
            <div style={{
              width: '100%', height: '100%', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: active ? '2px solid #00E5FF' : '1px solid rgba(255,255,255,0.1)',
              background: active ? 'rgba(0,229,255,0.15)' : 'rgba(0,0,0,0.5)',
              transition: 'all 0.2s'
            }}>
              {Icon && <Icon width={35} height={35} isActive={active} />}
            </div>
          )
        }}
      />

      {/* INFO BOX */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 5px' }}>
        <motion.div 
          key={activeTechId}
          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          style={{
            width: '95%', padding: '15px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid #00E5FF'
          }}
        >
          <h4 style={{ color: '#00E5FF', margin: '0 0 5px 0', fontSize: '1rem' }}>{activeTech.label}</h4>
          <p style={{ color: '#ddd', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>{activeTech.description}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsRoulette;