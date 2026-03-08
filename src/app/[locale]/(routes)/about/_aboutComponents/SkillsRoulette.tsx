"use client"
import React, { useEffect, useState, useRef, useMemo, useCallback, useTransition } from "react"
import { motion, useMotionValue, animate, PanInfo } from "framer-motion"
import styles from "@/scss/components/about/skillsRoulette.module.scss"
import { useTranslations } from "next-intl"

// --- IMPORTACIÓN NAMESPACE DE ICONOS ---
import * as Icons from "@/app/components/icons"

const ICONS_MAP: Record<string, React.ElementType> = {
  "reactjs": Icons.ReactIcon,
  "javascript": Icons.JavaScriptIcon,
  "typescript": Icons.TypeScriptIcon,
  "nextjs": Icons.NextJsIcon,
  "redux": Icons.ReduxIcon,
  "zustand": Icons.ZustandIcon,
  "html": Icons.HtmlIcon,
  "css": Icons.CssIcon,
  "postcss": Icons.PostCssIcon,
  "sass": Icons.SassIcon,
  "tailwind": Icons.TailwindIcon,
  "material-ui": Icons.MaterialUiIcon,
  "bootstrap": Icons.BootstrapIcon,
  "framer-motion": Icons.FramerMotionIcon,
  "particle": Icons.ParticleIcon,
  "million": Icons.MillionIcon,
  "mantine": Icons.MantineIcon,
  "nodejs": Icons.NodeJsIcon,
  "express": Icons.ExpressJsIcon,
  "php": Icons.PhpIcon,
  "laravel": Icons.LaravelIcon,
  "socket-io": Icons.SocketIoIcon,
  "wordpress": Icons.WordPressIcon,
  "woocommerce": Icons.WooCommerceIcon,
  "rest-api": Icons.RestApiIcon,
  "sql": Icons.SqlIcon,
  "mysql": Icons.MySqlIcon,
  "postgresql": Icons.PostgreSqlIcon,
  "supabase": Icons.SupabaseIcon,
  "firebase": Icons.FirebaseIcon,
  "aws": Icons.AwsIcon,
  "vercel": Icons.VercelIcon,
  "netlify": Icons.NetlifyIcon,
  "heroku": Icons.HerokuIcon,
  "render": Icons.RenderIcon,
  "neon": Icons.NeonIcon,
  "google-cloud": Icons.GoogleCloudIcon,
  "git": Icons.GitIcon,
  "github": Icons.GitHubIcon,
  "gitlab": Icons.GitLabIcon,
  "docker": Icons.DockerIcon,
  "jenkins": Icons.JenkinsIcon,
  "figma": Icons.FigmaIcon,
  "ux-design": Icons.UxDesignIcon,
  "jira": Icons.JiraIcon,
  "trello": Icons.TrelloIcon,
  "postman": Icons.PostmanIcon,
  "babel": Icons.BabelIcon,
  "jest": Icons.JestIcon,
  "php-unit": Icons.PhpUnitIcon,
  "laravel-dusk": Icons.LaravelDuskIcon,
  "manual-testing": Icons.ManualTestingIcon,
}

const DATA_SKELETON = [
  { id: "frontend", mainIcon: "reactjs", techs: [ { id: "javascript", icon: "javascript" }, { id: "typescript", icon: "typescript" }, { id: "react", icon: "reactjs" }, { id: "nextjs", icon: "nextjs" }, { id: "redux", icon: "redux" }, { id: "zustand", icon: "zustand" }, { id: "html", icon: "html" }, { id: "css", icon: "css" }, { id: "postcss", icon: "postcss" }, { id: "sass", icon: "sass" }, { id: "tailwind", icon: "tailwind" }, { id: "materialui", icon: "material-ui" }, { id: "bootstrap", icon: "bootstrap" }, { id: "framer", icon: "framer-motion" }, { id: "particle", icon: "particle" }, { id: "million", icon: "million" }, { id: "mantine", icon: "mantine" } ] },
  { id: "backend", mainIcon: "nodejs", techs: [ { id: "nodejs", icon: "nodejs" }, { id: "express", icon: "express" }, { id: "php", icon: "php" }, { id: "laravel", icon: "laravel" }, { id: "socketio", icon: "socket-io" }, { id: "wordpress", icon: "wordpress" }, { id: "woocommerce", icon: "woocommerce" }, { id: "restapi", icon: "rest-api" } ] },
  { id: "db", mainIcon: "sql", techs: [ { id: "sql", icon: "sql" }, { id: "mysql", icon: "mysql" }, { id: "postgresql", icon: "postgresql" }, { id: "supabase", icon: "supabase" }, { id: "firebase", icon: "firebase" } ] },
  { id: "hosting", mainIcon: "aws", techs: [ { id: "vercel", icon: "vercel" }, { id: "netlify", icon: "netlify" }, { id: "heroku", icon: "heroku" }, { id: "render", icon: "render" }, { id: "neon", icon: "neon" }, { id: "aws", icon: "aws" }, { id: "googlecloud", icon: "google-cloud" } ] },
  { id: "devops", mainIcon: "git", techs: [ { id: "git", icon: "git" }, { id: "github", icon: "github" }, { id: "gitlab", icon: "gitlab" }, { id: "docker", icon: "docker" }, { id: "jenkins", icon: "jenkins" } ] },
  { id: "design", mainIcon: "figma", techs: [ { id: "figma", icon: "figma" }, { id: "uxdesign", icon: "ux-design" } ] },
  { id: "tools", mainIcon: "jira", techs: [ { id: "jira", icon: "jira" }, { id: "trello", icon: "trello" }, { id: "postman", icon: "postman" }, { id: "babel", icon: "babel" } ] },
  { id: "testing", mainIcon: "jest", techs: [ { id: "jest", icon: "jest" }, { id: "phpunit", icon: "php-unit" }, { id: "laraveldusk", icon: "laravel-dusk" }, { id: "manualtesting", icon: "manual-testing" } ] }
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
            <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => handleArrow("prev")} style={{ zIndex: 20, cursor: 'pointer' }}>&#8249;</button>
            <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => handleArrow("next")} style={{ zIndex: 20, cursor: 'pointer' }}>&#8250;</button>
        </>
      )}
      <div style={{ width: '100%', overflow: 'hidden', padding: '20px 0', touchAction: 'pan-y' }}>
        {isStaticMode ? (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: `${gap}px`, width: '100%' }}>
                {displayItems.map((item) => (
                    <div key={item.uKey} onClick={() => handleClick(0, item)} style={{ width: `${cardWidth}px`, height: `${cardWidth}px`, cursor: 'pointer', flexShrink: 0 }}>
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
                            style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px`, height: `${cardWidth}px`, flexShrink: 0, position: 'relative' }} 
                            onClick={() => handleClick(item.visualIndex, item)} 
                            initial={{ scale: 1 }} // Valor inicial explícito
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
    <div className={styles.rouletteWrapper} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', overflowX: 'hidden', minHeight: '600px' }}>
      
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
                        border: isActive ? `2px solid ${NEON_BLUE}` : '1px solid rgba(255, 255, 255, 0.05)',
                        boxShadow: isActive ? NEON_GLOW : 'none',
                        background: isActive ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                        width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', transition: 'all 0.3s ease',
                        opacity: isActive ? 1 : 0.5, filter: isActive ? 'none' : 'grayscale(10%)'
                    }}
                >
                    <div style={{ pointerEvents: 'none', userSelect: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {IconComponent && <IconComponent width={isMobile ? 22 : 28} height={isMobile ? 22 : 28} isActive={isActive} />}
                        <span style={{ fontWeight: isActive ? 'bold' : 'normal', fontSize: isMobile ? '0.7rem' : '0.85rem', textAlign: 'center', marginTop: '6px', lineHeight: '1.2' }}>
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
                    border: isActive ? `2px solid ${NEON_BLUE}` : '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: isActive ? NEON_GLOW : 'none',
                    background: isActive ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 0, 0, 0.2)',
                    width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5px', borderRadius: '8px', boxSizing: 'border-box', transition: 'all 0.3s ease',
                    opacity: isActive ? 1 : 0.5, filter: isActive ? 'none' : 'grayscale(10%)'
                }}
            >
              <div style={{ pointerEvents: 'none', userSelect: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  {TechIconComponent && <TechIconComponent width={isMobile ? 24 : 30} height={isMobile ? 24 : 30} isActive={isActive} />}
                  <span style={{ fontWeight: isActive ? 'bold' : 'normal', marginTop: '4px', fontSize: isMobile ? '0.65rem' : '0.75rem', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '90%' }}>
                    {tech.name}
                  </span>
              </div>
            </div>
          )}}
        />
      </div>

      <div style={{ width: '100%', height: '50px', flexShrink: 0 }} />

      {/* DESCRIPCIÓN - SECCIÓN CRÍTICA CORREGIDA */}
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '-15px' }}>
        {activeTech && (
            <motion.div 
                key={activeTech.id} 
                initial={{ opacity: 0, y: 10 }} // Punto de inicio explícito para evitar undefined
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    margin: 0, padding: '8px 15px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                    textAlign: 'center', width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '12px' 
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

export default SkillsRoulette;