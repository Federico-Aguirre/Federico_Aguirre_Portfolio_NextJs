"use client"
import React, { useEffect, useState, useRef, useMemo, useCallback, useTransition } from "react"
import { motion, useMotionValue, animate, PanInfo } from "framer-motion"
import styles from "@/scss/components/about/skillsRoulette.module.scss"
import { useTranslations } from "next-intl"

// --- IMPORTACIÓN NAMESPACE DE ICONOS ---
import * as Icons from "@/app/components/icons"

// --- MAPEO DE IMÁGENES ---
const ICONS_MAP: Record<string, React.ElementType> = {
  // Frontend
  "reactjs.svg": Icons.ReactIcon,
  "javascript.svg": Icons.JavaScriptIcon,
  "typescript.svg": Icons.TypeScriptIcon,
  "nextjs.svg": Icons.NextJsIcon,
  "redux.svg": Icons.ReduxIcon,
  "zustand.svg": Icons.ZustandIcon,
  "html.svg": Icons.HtmlIcon,
  "css.svg": Icons.CssIcon,
  "postcss.svg": Icons.PostCssIcon,
  "sass.svg": Icons.SassIcon,
  "tailwind.svg": Icons.TailwindIcon,
  "material-ui.svg": Icons.MaterialUiIcon,
  "bootstrap.svg": Icons.BootstrapIcon,
  "framer-motion.svg": Icons.FramerMotionIcon,
  
  // Backend
  "nodejs.svg": Icons.NodeJsIcon,
  "express.svg": Icons.ExpressJsIcon,
  "php.svg": Icons.PhpIcon,
  "laravel.svg": Icons.LaravelIcon,
  "socket-io.svg": Icons.SocketIoIcon,
  "wordpress.svg": Icons.WordPressIcon,
  "woocommerce.svg": Icons.WooCommerceIcon,
  "rest-api.svg": Icons.RestApiIcon,

  // DB
  "sql.svg": Icons.SqlIcon,
  "mysql.svg": Icons.MySqlIcon,
  "postgresql.svg": Icons.PostgreSqlIcon,
  "supabase.svg": Icons.SupabaseIcon,
  "firebase.svg": Icons.FirebaseIcon,

  // Hosting
  "aws.svg": Icons.AwsIcon,
  "vercel.svg": Icons.VercelIcon,
  "netlify.svg": Icons.NetlifyIcon,
  "heroku.svg": Icons.HerokuIcon,
  "render.svg": Icons.RenderIcon,
  "neon.svg": Icons.NeonIcon,
  "google-cloud.svg": Icons.GoogleCloudIcon,

  // DevOps
  "git.svg": Icons.GitIcon,
  "github.svg": Icons.GitHubIcon,
  "gitlab.svg": Icons.GitLabIcon,
  "docker.svg": Icons.DockerIcon,
  "jenkins.svg": Icons.JenkinsIcon,

  // Design
  "figma.svg": Icons.FigmaIcon,
  "ux-design.svg": Icons.UxDesignIcon,

  // Tools
  "jira.svg": Icons.JiraIcon,
  "trello.svg": Icons.TrelloIcon,
  "postman.svg": Icons.PostmanIcon,

  // Testing
  "jest.svg": Icons.JestIcon,
  "php-unit.svg": Icons.PhpUnitIcon,
  "laravel-dusk.svg": Icons.LaravelDuskIcon,
  "manual-testing.svg": Icons.ManualTestingIcon,
}

// --- DATOS (Sin cambios) ---
const DATA_SKELETON = [
  {
    id: "frontend",
    mainIcon: "reactjs.svg",
    techs: [
      { id: "javascript", icon: "javascript.svg" },
      { id: "typescript", icon: "typescript.svg" },
      { id: "react", icon: "reactjs.svg" },
      { id: "nextjs", icon: "nextjs.svg" },
      { id: "redux", icon: "redux.svg" },
      { id: "zustand", icon: "zustand.svg" },
      { id: "html", icon: "html.svg" },
      { id: "css", icon: "css.svg" },
      { id: "postcss", icon: "postcss.svg" },
      { id: "sass", icon: "sass.svg" },
      { id: "tailwind", icon: "tailwind.svg" },
      { id: "materialui", icon: "material-ui.svg" },
      { id: "bootstrap", icon: "bootstrap.svg" },
      { id: "framer", icon: "framer-motion.svg" },
    ]
  },
  {
    id: "backend",
    mainIcon: "nodejs.svg",
    techs: [
      { id: "nodejs", icon: "nodejs.svg" },
      { id: "express", icon: "express.svg" },
      { id: "php", icon: "php.svg" },
      { id: "laravel", icon: "laravel.svg" },
      { id: "socketio", icon: "socket-io.svg" },
      { id: "wordpress", icon: "wordpress.svg" },
      { id: "woocommerce", icon: "woocommerce.svg" },
      { id: "restapi", icon: "rest-api.svg" },
    ]
  },
  {
    id: "db",
    mainIcon: "sql.svg",
    techs: [
      { id: "sql", icon: "sql.svg" },
      { id: "mysql", icon: "mysql.svg" },
      { id: "postgresql", icon: "postgresql.svg" },
      { id: "supabase", icon: "supabase.svg" },
      { id: "firebase", icon: "firebase.svg" },
    ]
  },
  {
    id: "hosting",
    mainIcon: "aws.svg",
    techs: [
      { id: "vercel", icon: "vercel.svg" },
      { id: "netlify", icon: "netlify.svg" },
      { id: "heroku", icon: "heroku.svg" },
      { id: "render", icon: "render.svg" },
      { id: "neon", icon: "neon.svg" },
      { id: "aws", icon: "aws.svg" },
      { id: "googlecloud", icon: "google-cloud.svg" },
    ]
  },
  {
    id: "devops",
    mainIcon: "git.svg",
    techs: [
      { id: "git", icon: "git.svg" },
      { id: "github", icon: "github.svg" },
      { id: "gitlab", icon: "gitlab.svg" },
      { id: "docker", icon: "docker.svg" },
      { id: "jenkins", icon: "jenkins.svg" },
    ]
  },
  {
    id: "design",
    mainIcon: "figma.svg",
    techs: [
      { id: "figma", icon: "figma.svg" },
      { id: "uxdesign", icon: "ux-design.svg" },
    ]
  },
  {
    id: "tools",
    mainIcon: "jira.svg",
    techs: [
      { id: "jira", icon: "jira.svg" },
      { id: "trello", icon: "trello.svg" },
      { id: "postman", icon: "postman.svg" },
    ]
  },
  {
    id: "testing",
    mainIcon: "jest.svg",
    techs: [
      { id: "jest", icon: "jest.svg" },
      { id: "phpunit", icon: "php-unit.svg" },
      { id: "laraveldusk", icon: "laravel-dusk.svg" },
      { id: "manualtesting", icon: "manual-testing.svg" },
    ]
  }
]

interface RouletteProps {
  items: any[]
  selectedItem: any
  onSelect: (item: any) => void
  cardWidth: number 
  gap: number       
  renderCard: (item: any, isActive: boolean) => React.ReactNode
}

const RouletteWheel = ({ items, selectedItem, onSelect, cardWidth, gap, renderCard }: RouletteProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const isDragging = useRef(false)
  
  const x = useMotionValue(0)
  
  const ITEM_COUNT = items.length
  const STRIDE = cardWidth + gap
  const totalContentWidth = (ITEM_COUNT * cardWidth) + ((ITEM_COUNT - 1) * gap)
  
  const isStaticMode = containerWidth > 0 && (containerWidth >= totalContentWidth)
  
  const BUFFER_SETS = isStaticMode ? 1 : 5
  const CENTER_SET_INDEX = Math.floor(BUFFER_SETS / 2)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) return;
        const width = entries[0].contentRect.width
        if (width > 0) setContainerWidth(width)
      })
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const displayItems = useMemo(() => {
    if (isStaticMode) return items.map((item, idx) => ({ ...item, uKey: `static-${item.id}-${idx}`, visualIndex: idx }))
    const sets = []
    let globalIndexCounter = 0
    for (let i = 0; i < BUFFER_SETS; i++) {
        const set = items.map((item, idx) => ({ 
            ...item, 
            uKey: `s${i}-${idx}-${item.id}`,
            visualIndex: globalIndexCounter++ 
        }))
        sets.push(...set)
    }
    return sets
  }, [items, BUFFER_SETS, isStaticMode])

  const getXForIndex = useCallback((index: number) => {
    if (!containerWidth) return 0
    const itemLeftPosition = index * STRIDE
    const centerOffset = (containerWidth / 2) - (cardWidth / 2)
    return -itemLeftPosition + centerOffset
  }, [containerWidth, cardWidth, STRIDE])

  const snapToCenterSet = useCallback(() => {
     if (isStaticMode) return
     const currentX = x.get()
     const centerOffset = (containerWidth / 2) - (cardWidth / 2)
     const relativeX = currentX - centerOffset
     const rawIndex = -relativeX / STRIDE
     const currentIndex = Math.round(rawIndex)
     const realIndex = ((currentIndex % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT
     const centerSetIndex = (CENTER_SET_INDEX * ITEM_COUNT) + realIndex
     const newX = getXForIndex(centerSetIndex)
     x.set(newX)
  }, [x, containerWidth, cardWidth, STRIDE, ITEM_COUNT, CENTER_SET_INDEX, getXForIndex, isStaticMode])

  const animateTo = useCallback((targetX: number, immediate = false) => {
    if (immediate) {
        x.set(targetX)
    } else {
        animate(x, targetX, { 
            type: "spring", 
            stiffness: 250, 
            damping: 30, 
            onComplete: () => { snapToCenterSet() }
        })
    }
  }, [x, snapToCenterSet])

  useEffect(() => {
    if (isStaticMode) { x.set(0); return }
    if (containerWidth > 0) {
        const itemIndex = items.findIndex(i => i.id === selectedItem.id)
        const safeIndex = itemIndex === -1 ? 0 : itemIndex
        const globalIndex = (CENTER_SET_INDEX * ITEM_COUNT) + safeIndex
        const targetX = getXForIndex(globalIndex)
        animateTo(targetX, true)
    }
  }, [containerWidth, items, isStaticMode]) 

  const handleDragEnd = (e: any, info: PanInfo) => {
    isDragging.current = false
    const velocity = info.velocity.x
    const predictedX = x.get() + (velocity * 0.2)
    const centerOffset = (containerWidth / 2) - (cardWidth / 2)
    const relativeX = predictedX - centerOffset
    const snapIndex = Math.round(-relativeX / STRIDE)
    animateTo(getXForIndex(snapIndex))
    const realIndex = ((snapIndex % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT
    onSelect(items[realIndex])
  }

  const handleArrow = (dir: "prev" | "next") => {
    if (isDragging.current || isStaticMode) return
    const currentX = x.get()
    const targetX = dir === "next" ? currentX - STRIDE : currentX + STRIDE
    animateTo(targetX)
    const centerOffset = (containerWidth / 2) - (cardWidth / 2)
    const relativeX = targetX - centerOffset
    const snapIndex = Math.round(-relativeX / STRIDE)
    const realIndex = ((snapIndex % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT
    onSelect(items[realIndex])
  }

  const handleClick = (idx: number, item: any) => {
    if (isStaticMode) { 
        onSelect(item) 
    } else { 
        const targetX = getXForIndex(idx)
        animateTo(targetX)
        onSelect(item)
    }
  }

  return (
    <div className={styles.wheelContainer} ref={containerRef} style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {!isStaticMode && (
        <>
            <button 
                className={`${styles.arrow} ${styles.arrowLeft}`} 
                onClick={() => handleArrow("prev")}
                style={{ zIndex: 20, cursor: 'pointer' }}
            >
                &#8249;
            </button>
            <button 
                className={`${styles.arrow} ${styles.arrowRight}`} 
                onClick={() => handleArrow("next")}
                style={{ zIndex: 20, cursor: 'pointer' }}
            >
                &#8250;
            </button>
        </>
      )}
      
      <div style={{ width: '100%', overflow: 'hidden', padding: '20px 0', touchAction: 'pan-y' }}>
        {isStaticMode ? (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: `${gap}px`, width: '100%' }}>
                {displayItems.map((item) => (
                    <div 
                        key={item.uKey} 
                        onClick={() => handleClick(0, item)}
                        style={{
                            width: `${cardWidth}px`,
                            height: `${cardWidth}px`, 
                            cursor: 'pointer',
                            flexShrink: 0
                        }}
                    >
                        {renderCard(item, item.id === selectedItem.id)}
                    </div>
                ))}
            </div>
        ) : (
            <motion.div 
                style={{ x, display: "flex", flexDirection: "row", gap: `${gap}px`, width: "max-content", padding: 0 }} 
                drag="x" 
                dragConstraints={{ left: -50000, right: 50000 }} 
                dragElastic={0.05} 
                onDragStart={() => isDragging.current = true} 
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: 'grabbing' }}
            >
                {displayItems.map((item, idx) => {
                    const isSelected = item.id === selectedItem.id
                    return (
                        <motion.div 
                            key={item.uKey} 
                            style={{ 
                                width: `${cardWidth}px`, 
                                minWidth: `${cardWidth}px`, 
                                height: `${cardWidth}px`, 
                                flexShrink: 0,
                                position: 'relative'
                            }} 
                            onClick={() => handleClick(item.visualIndex, item)} 
                            whileHover={{ scale: 1.05 }}
                        >
                            {renderCard(item, isSelected)}
                        </motion.div>
                    )
                })}
            </motion.div>
        )}
      </div>
    </div>
  )
}

const SkillsRoulette = () => {
  const t = useTranslations("about.SkillsSection") 
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setIsMounted(true)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize() 
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const categoriesWithData = useMemo(() => {
    return DATA_SKELETON.map(cat => ({
      ...cat,
      title: t(`categories.${cat.id}`),
      techs: cat.techs.map(tech => ({
        ...tech,
        name: t(`techs.${tech.id}.name`),
        desc: t(`techs.${tech.id}.desc`)
      }))
    }))
  }, [t])

  const [activeCategoryId, setActiveCategoryId] = useState("frontend")
  const [activeTechId, setActiveTechId] = useState("javascript")

  const activeCategory = categoriesWithData.find(c => c.id === activeCategoryId) || categoriesWithData[0]
  const activeTech = activeCategory.techs.find(t => t.id === activeTechId) || activeCategory.techs[0]

  const handleCategorySelect = (category: any) => {
    if (category.id === activeCategoryId) return
    startTransition(() => {
        setActiveCategoryId(category.id)
        if (category.techs.length > 0) {
            setActiveTechId(category.techs[0].id)
        }
    })
  }

  const NEON_BLUE = "#00E5FF" 
  const NEON_GLOW = "0 0 20px rgba(0, 229, 255, 0.4)" 
  
  const CATEGORY_WIDTH = isMobile ? 80 : 100 
  const TECH_WIDTH = isMobile ? 65 : 75
  const GAP_SIZE = isMobile ? 15 : 25 

  if (!isMounted) return <div style={{ minHeight: '600px', width: '100%' }}></div>;

  return (
    <div 
        className={styles.rouletteWrapper} 
        style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            width: '100%', 
            // FIX: Asegura que el componente nunca exceda el ancho de la pantalla
            maxWidth: '100%', 
            overflowX: 'hidden',
            minHeight: '600px' 
        }}
    >
      
      {/* SECCIÓN CATEGORÍAS */}
      <div style={{ width: '100%', zIndex: 10 }}>
        <RouletteWheel 
            key="categories-wheel"
            items={categoriesWithData}
            selectedItem={activeCategory}
            onSelect={handleCategorySelect}
            cardWidth={CATEGORY_WIDTH}
            gap={GAP_SIZE}
            renderCard={(item, isActive) => {
                const IconComponent = ICONS_MAP[item.mainIcon];
                return (
                <div 
                    className={styles.card}
                    style={{
                        // FIX VISUAL: Inactivas = borde gris oscuro, fondo casi transparente, filtro gris y opacidad baja
                        border: isActive ? `2px solid ${NEON_BLUE}` : '1px solid rgba(255, 255, 255, 0.05)',
                        boxShadow: isActive ? NEON_GLOW : 'none',
                        background: isActive ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                        width: '100%', 
                        height: '100%', 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '12px',
                        // Transición suave para el efecto de activación
                        transition: 'all 0.3s ease',
                        opacity: isActive ? 1 : 0.5,
                        filter: isActive ? 'none' : 'grayscale(10%)'
                    }}
                >
                    <div style={{ pointerEvents: 'none', userSelect: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {IconComponent && <IconComponent width={isMobile ? 22 : 28} height={isMobile ? 22 : 28} isActive={isActive} />}
                        <span style={{ 
                            fontWeight: isActive ? 'bold' : 'normal',
                            fontSize: isMobile ? '0.7rem' : '0.85rem',
                            textAlign: 'center',
                            marginTop: '6px',
                            lineHeight: '1.2'
                        }}>
                            {item.title}
                        </span>
                    </div>
                </div>
            )}}
        />
      </div>

      {/* SECCIÓN SKILLS */}
      <div style={{ width: '100%', zIndex: 5, opacity: isPending ? 0.5 : 1, transition: 'opacity 0.2s ease'}}>
        <RouletteWheel 
          key={`tech-wheel-${activeCategoryId}`}
          items={activeCategory.techs}
          selectedItem={activeTech}
          onSelect={(tech) => setActiveTechId(tech.id)}
          cardWidth={TECH_WIDTH}
          gap={GAP_SIZE} 
          renderCard={(tech, isActive) => {
            const TechIconComponent = ICONS_MAP[tech.icon];
            return (
            <div 
                className={styles.techItem}
                style={{
                    // FIX VISUAL: Mismo tratamiento para items de tecnología
                    border: isActive ? `2px solid ${NEON_BLUE}` : '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: isActive ? NEON_GLOW : 'none',
                    background: isActive ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 0, 0, 0.2)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5px',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                    opacity: isActive ? 1 : 0.5,
                    filter: isActive ? 'none' : 'grayscale(10%)'
                }}
            >
              <div style={{ pointerEvents: 'none', userSelect: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  {TechIconComponent && <TechIconComponent width={isMobile ? 24 : 30} height={isMobile ? 24 : 30} isActive={isActive} />}
                  <span style={{ 
                      fontWeight: isActive ? 'bold' : 'normal',
                      marginTop: '4px',
                      fontSize: isMobile ? '0.65rem' : '0.75rem', 
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '90%'
                   }}>
                    {tech.name}
                  </span>
              </div>
            </div>
          )}}
        />
      </div>

      <div style={{ width: '100%', height: '50px', flexShrink: 0 }} />

      {/* DESCRIPCIÓN */}
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '-15px' }}>
        {activeTech && (
            <motion.div 
                key={activeTech.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    margin: 0, 
                    padding: '8px 15px', 
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px' 
                }}
            >
                <h4 style={{ color: NEON_BLUE, margin: 0, fontSize: '1rem', lineHeight: '1' }}>{activeTech.name}</h4>
                <p style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: '1.3', margin: 0 }}>{activeTech.desc}</p>
            </motion.div>
        )}
      </div>
    </div>
  )
}

export default SkillsRoulette