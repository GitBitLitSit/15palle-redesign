"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, type PanInfo } from "motion/react"
import { ArrowLeft, ArrowRight, ArrowsOut, X } from "@phosphor-icons/react"
import { asset } from "@/lib/asset"

const photos = [
  { src: asset("/foto/aura2-expanded.webp"), alt: "I divani bianchi della lounge sotto il soffitto di glicine" },
  { src: asset("/foto/newbar2.webp"), alt: "Le spine di birra sul bancone, tra fiori e bottiglie" },
  { src: asset("/foto/bancone.jpg"), alt: "Il bancone del bar con i fiori appesi al soffitto" },
  { src: asset("/foto/newbar1.webp"), alt: "Lo scaffale dei distillati con le coppe del circolo" },
  { src: asset("/foto/newbar3.webp"), alt: "Bottiglie di whisky e rum sul bancone" },
  { src: asset("/foto/lounge-fiori.jpg"), alt: "Sgabelli rossi e tavolini alti nella sala" },
]

// How the cards under the top one peek out: rotation (deg) and drop (px).
const PEEK = [
  { rotate: 0, y: 0 },
  { rotate: -4, y: 12 },
  { rotate: 5, y: 22 },
]

const SWIPE = 80

/**
 * The bar photos as a pile of prints. Swipe the top one away (or use the arrows) to send it to the
 * back; tap it to see the photo full screen, uncropped.
 */
export function BarDeck() {
  const [order, setOrder] = useState(() => photos.map((_, i) => i))
  const [viewer, setViewer] = useState<number | null>(null)
  const top = order[0]
  // Gesture handlers are attached when a card mounts, so they read the live order from a ref.
  const orderRef = useRef(order)
  orderRef.current = order
  // A swipe ends with the finger still on the card, which also counts as a tap: ignore that one.
  const dragged = useRef(false)
  const openTop = useCallback(() => {
    if (dragged.current) {
      dragged.current = false
      return
    }
    setViewer(orderRef.current[0])
  }, [])

  const next = useCallback(() => setOrder((o) => [...o.slice(1), o[0]]), [])
  const prev = useCallback(() => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]), [])

  function onDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > SWIPE || Math.abs(info.velocity.x) > 500) {
      if (info.offset.x < 0) next()
      else prev()
    }
  }

  return (
    <div>
      <motion.div
        className="relative mx-auto aspect-[4/3.5] w-full max-w-[520px] touch-pan-y select-none"
        initial={{ opacity: 0, y: 50, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 70, damping: 16 }}
      >
        {order
          .map((photoIndex, depth) => ({ photoIndex, depth }))
          .reverse()
          .map(({ photoIndex, depth }) => {
            const p = photos[photoIndex]
            const peek = PEEK[Math.min(depth, PEEK.length - 1)]
            const isTop = depth === 0
            return (
              <motion.div
                key={p.src}
                className={`absolute inset-x-0 top-0 aspect-[4/3] overflow-hidden rounded-[4px] border-[6px] border-osso bg-osso shadow-[0_24px_50px_-20px_rgb(0_0_0/0.9)] ${
                  isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                }`}
                style={{ zIndex: photos.length - depth }}
                initial={false}
                animate={{ x: 0, y: peek.y, rotate: peek.rotate, scale: 1 - Math.min(depth, 2) * 0.03, opacity: depth < PEEK.length ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
                drag={isTop ? "x" : false}
                dragSnapToOrigin
                dragElastic={0.9}
                onDragStart={() => (dragged.current = true)}
                onDragEnd={onDragEnd}
                onTap={openTop}
                whileDrag={{ scale: 1.02, rotate: 0 }}
              >
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 520px, 92vw" className="pointer-events-none object-cover" draggable={false} />
                {isTop && (
                  <span className="absolute right-2 bottom-2 flex h-9 w-9 items-center justify-center rounded-full bg-nero/70 text-osso backdrop-blur-sm" aria-hidden>
                    <ArrowsOut size={18} />
                  </span>
                )}
              </motion.div>
            )
          })}
      </motion.div>

      <div className="mx-auto mt-6 flex max-w-[520px] items-center justify-between gap-4">
        <button type="button" onClick={prev} aria-label="Foto precedente" className="flex h-12 w-12 items-center justify-center border border-linea transition active:scale-95">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1.5" aria-hidden>
            {photos.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === top ? "w-5 bg-arancio" : "w-1.5 bg-osso/30"}`} />
            ))}
          </div>
          <button type="button" onClick={() => setViewer(top)} className="text-[14px] text-cromo underline decoration-linea underline-offset-4">
            Scorri o tocca per ingrandire
          </button>
        </div>
        <button type="button" onClick={next} aria-label="Foto successiva" className="flex h-12 w-12 items-center justify-center border border-linea transition active:scale-95">
          <ArrowRight size={20} />
        </button>
      </div>

      <AnimatePresence>
        {viewer !== null && <Viewer start={viewer} onClose={(last) => { setViewer(null); setOrder(photos.map((_, i) => (last + i) % photos.length)) }} />}
      </AnimatePresence>
    </div>
  )
}

/** Full-screen photo viewer: swipe sideways to browse, swipe down or press Esc to close. */
function Viewer({ start, onClose }: { start: number; onClose: (last: number) => void }) {
  const [index, setIndex] = useState(start)
  const [dir, setDir] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const go = useCallback((d: number) => {
    setDir(d)
    setIndex((i) => (i + d + photos.length) % photos.length)
  }, [])
  const close = useCallback(() => onClose(index), [onClose, index])

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
      previous?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [close, go])

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y > 120 || info.velocity.y > 700) return close()
    if (info.offset.x < -SWIPE || info.velocity.x < -500) go(1)
    else if (info.offset.x > SWIPE || info.velocity.x > 500) go(-1)
  }

  const p = photos[index]

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Foto del bar"
      className="fixed inset-0 z-[80] flex flex-col bg-nero pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <span className="kicker text-cromo tabular-nums">
          {index + 1} / {photos.length}
        </span>
        <button ref={closeRef} type="button" onClick={close} aria-label="Chiudi" className="flex h-12 w-12 items-center justify-center">
          <X size={26} />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={p.src}
            custom={dir}
            className="absolute inset-0 touch-none"
            variants={{
              enter: (d: number) => ({ x: d >= 0 ? "60%" : "-60%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d >= 0 ? "-60%" : "60%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            drag
            dragSnapToOrigin
            dragElastic={0.6}
            onDragEnd={onDragEnd}
          >
            <Image src={p.src} alt={p.alt} fill sizes="100vw" className="pointer-events-none object-contain" draggable={false} />
          </motion.div>
        </AnimatePresence>

        <button type="button" onClick={() => go(-1)} aria-label="Foto precedente" className="absolute top-1/2 left-4 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-nero/60 lg:flex">
          <ArrowLeft size={22} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Foto successiva" className="absolute top-1/2 right-4 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-nero/60 lg:flex">
          <ArrowRight size={22} />
        </button>
      </div>

      <p className="px-5 py-5 text-center text-[15px] text-cromo">{p.alt}</p>
    </motion.div>
  )
}
