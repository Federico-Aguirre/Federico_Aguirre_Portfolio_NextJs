"use client"
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { motion, useMotionValue, animate, PanInfo } from "framer-motion"
import Image from "next/image"
import styles from "@/scss/components/about/skillsRoulette.module.scss"
import { useTranslations } from "next-intl"

// --- ESTRUCTURA DE DATOS (IDs e Iconos solamente) ---
const DATA_SKELETON = [
  {
    id: "frontend",
    mainIcon: "react.svg",
    techs: [
      { id: "javascript", icon: "javascript.svg" },
      { id: "typescript", icon: "typescript.svg" },
      { id: "react", icon: "react.svg" },
      { id: "nextjs", icon: "nextjs.svg" },
      { id: "redux", icon: "redux.svg" },
      { id: "zustand", icon: "zustand.svg" },
      { id: "html", icon: "html.svg" },
      { id: "css", icon: "css.svg" },
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

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width)
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const ITEM_COUNT = items.length
  const STRIDE = cardWidth + gap 
  const totalContentWidth = items.length * STRIDE - gap
  
  // LOGICA ANTIPARPADEO
  const isStaticMode = containerWidth === 0 || totalContentWidth < (containerWidth - 30)
  
  const BUFFER_SETS = isStaticMode ? 1 : 5
  const CENTER_SET_INDEX = Math.floor(BUFFER_SETS / 2)

  const displayItems = useMemo(() => {
    if (isStaticMode) return items.map((item, idx) => ({ ...item, uKey: `static-${idx}` }))
    const sets = []
    for (let i = 0; i < BUFFER_SETS; i++) {
        sets.push(...items.map((item, idx) => ({
            ...item,
            uKey: `s${i}-${idx}-${item.id}` // Usamos item.id ahora
        })))
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

  const animateTo = useCallback((target: number, immediate = false) => {
    if (immediate) {
        x.set(target)
    } else {
        animate(x, target, { type: "spring", stiffness: 300, damping: 30, mass: 0.8, onComplete: snapToCenterSet })
    }
  }, [x, snapToCenterSet])

  useEffect(() => {
    if (containerWidth === 0) return
    if (isStaticMode) { x.set(0); return }
    const itemIndex = items.findIndex(i => i.id === selectedItem.id)
    const safeIndex = itemIndex === -1 ? 0 : itemIndex
    const globalIndex = (CENTER_SET_INDEX * ITEM_COUNT) + safeIndex
    const targetX = getXForIndex(globalIndex)
    animateTo(targetX, true) 
  }, [containerWidth, items, ITEM_COUNT, getXForIndex, animateTo, x, isStaticMode, CENTER_SET_INDEX, selectedItem])

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
    if (isDragging.current) return
    snapToCenterSet() 
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
    if (isStaticMode) { onSelect(item) } else { animateTo(getXForIndex(idx)); onSelect(item) }
  }

  return (
    <div className={styles.wheelContainer} ref={containerRef} style={{ justifyContent: isStaticMode ? 'center' : 'flex-start' }}>
      
      {!isStaticMode && <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => handleArrow("prev")}>&#8249;</button>}
      
      <div className={styles.trackContainer}>
        {isStaticMode ? (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: gap, 
                width: '100%',
                padding: '30px 0' 
            }}>
                {displayItems.map((item) => {
                     const isSelected = item.id === selectedItem.id
                     return <div key={item.uKey} onClick={() => handleClick(0, item)} style={{ width: cardWidth, flexShrink: 0 }}>{renderCard(item, isSelected)}</div>
                })}
            </div>
        ) : (
            <motion.div 
                className={styles.track}
                style={{ x, width: 'max-content', gap: gap }}
                drag="x" dragElastic={0.05} onDragStart={() => isDragging.current = true} onDragEnd={handleDragEnd}
                whileTap={{ cursor: 'grabbing' }}
            >
                {displayItems.map((item, idx) => {
                    const isSelected = item.id === selectedItem.id
                    return <motion.div key={item.uKey} style={{ width: cardWidth, flexShrink: 0 }} onClick={() => handleClick(idx, item)} whileHover={{ scale: 1.05 }}>{renderCard(item, isSelected)}</motion.div>
                })}
            </motion.div>
        )}
      </div>

      {!isStaticMode && <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => handleArrow("next")}>&#8250;</button>}
    </div>
  )
}

const SkillsRoulette = () => {
  const t = useTranslations("about.SkillsSection") // <-- Hook de traducción

  // Construimos los datos con textos dinámicos usando useMemo
  const categoriesWithData = useMemo(() => {
    return DATA_SKELETON.map(cat => ({
      ...cat,
      title: t(`categories.${cat.id}`), // Traduce "Frontend", "Backend", etc.
      techs: cat.techs.map(tech => ({
        ...tech,
        name: t(`techs.${tech.id}.name`), // Traduce "React"
        desc: t(`techs.${tech.id}.desc`)  // Traduce la descripción
      }))
    }))
  }, [t])

  // Usamos IDs para el estado para evitar problemas al cambiar de idioma
  const [activeCategoryId, setActiveCategoryId] = useState("frontend")
  const [activeTechId, setActiveTechId] = useState("javascript")

  // Obtenemos los objetos activos basados en los IDs y la data traducida actual
  const activeCategory = categoriesWithData.find(c => c.id === activeCategoryId) || categoriesWithData[0]
  const activeTech = activeCategory.techs.find(t => t.id === activeTechId) || activeCategory.techs[0]

  const handleCategorySelect = (category: any) => {
    setActiveCategoryId(category.id)
    if (category.techs.length > 0) {
      setActiveTechId(category.techs[0].id)
    }
  }

  const NEON_BLUE = "#00E5FF" 
  const NEON_GLOW = "0 0 20px rgba(0, 229, 255, 0.4)" 

  return (
    <div className={styles.rouletteWrapper}>
      
      {/* 1. CATEGORÍAS */}
      <div style={{ width: '100%', zIndex: 10 }}>
        <RouletteWheel 
            key="categories-wheel"
            items={categoriesWithData}
            selectedItem={activeCategory}
            onSelect={handleCategorySelect}
            cardWidth={130}
            gap={20}
            renderCard={(item, isActive) => (
                <div 
                    className={styles.card}
                    style={{
                        border: isActive ? `2px solid ${NEON_BLUE}` : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isActive ? NEON_GLOW : 'none',
                        background: isActive ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                        transform: isActive ? 'translateY(-5px)' : 'none',
                    }}
                >
                    <Image src={`/svg/skills-logo/${item.mainIcon}`} alt={item.title} width={35} height={35} priority unoptimized />
                    <span style={{ color: isActive ? NEON_BLUE : '#aaa', fontWeight: isActive ? 'bold' : 'normal' }}>
                        {item.title}
                    </span>
                </div>
            )}
        />
      </div>

      {/* 2. SKILLS */}
      <div key={activeCategory.id} style={{ width: '100%', zIndex: 5 }}>
        <RouletteWheel 
          items={activeCategory.techs}
          selectedItem={activeTech}
          onSelect={(tech) => setActiveTechId(tech.id)} // Guardamos solo el ID
          cardWidth={90}
          gap={30} 
          renderCard={(tech, isActive) => (
            <div 
                className={styles.techItem}
                style={{
                    border: isActive ? `2px solid ${NEON_BLUE}` : '1px solid rgba(255, 255, 255, 0.1)', margin: "10px 0",
                    boxShadow: isActive ? NEON_GLOW : 'none',
                    background: isActive ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                }}
            >
              <Image src={`/svg/skills-logo/${tech.icon}`} alt={tech.name} width={40} height={40} priority />
              <span style={{ 
                  color: isActive ? NEON_BLUE : '#888', 
                  fontWeight: isActive ? 'bold' : 'normal',
                  marginTop: '8px'
               }}>
                {tech.name}
              </span>
            </div>
          )}
        />
      </div>

      {/* 3. DESCRIPCIÓN */}
      {activeTech && (
          <motion.div 
            className={styles.descriptionBox}
            key={activeTech.id} // Key por ID para reinicio limpio de animación
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4>{activeTech.name}</h4>
            <p>{activeTech.desc}</p>
          </motion.div>
      )}

    </div>
  )
}

export default SkillsRoulette