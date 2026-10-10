"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView, useScroll, useTransform } from "motion/react"
import { openState } from "@/lib/club"
import { asset } from "@/lib/asset"

const ease = [0.16, 1, 0.3, 1] as const

/** "Aperti ora fino all'1:00" or "Chiusi, apriamo alle 14:30", computed in Bolzano time after mount. */
export function useOpenLabel(fallback = "Tutti i giorni dalle 14:30") {
  const [label, setLabel] = useState<{ text: string; open: boolean | null }>({ text: fallback, open: null })
  useEffect(() => {
    const update = () => {
      const s = openState()
      setLabel(s.open ? { text: `Aperti ora, fino alle ${s.until}`, open: true } : { text: "Chiusi ora, apriamo alle 14:30", open: false })
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])
  return label
}

/* ------------------------------------------------------------------ HERO */

function Letters({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.04em] ${className ?? ""}`} aria-hidden>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.05, ease }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  )
}

/** Full-screen photo; the name rises letter by letter, then drifts away as you scroll. */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const status = useOpenLabel()

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={{ y: imgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease }}
        >
          <Image src={asset("/foto/aura.webp")} alt="Un giocatore prepara la spaccata sotto le luci della sala" fill priority sizes="100vw" className="object-cover object-[60%_35%]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/40 to-nero/30" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="mx-auto w-full max-w-[1200px] px-5 pb-32 lg:px-10 lg:pb-20">
        <h1 className="display text-[clamp(112px,44vw,300px)] leading-[0.8]">
          <span className="sr-only">15 Palle</span>
          <Letters text="15" delay={0.25} className="text-arancio" />
          <Letters text="PALLE" delay={0.4} className="text-[0.74em]" />
        </h1>
        <motion.div
          className="mt-6 h-[2px] origin-left bg-arancio"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.9, ease }}
        />
        <motion.div
          className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <StatusTag status={status} />
          <span className="text-[16px] text-osso/80">Via Bruno Buozzi 12, Bolzano</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

/** Open/closed pill: green pulse when open, orange when closed. */
function StatusTag({ status }: { status: { text: string; open: boolean | null } }) {
  const tone = status.open === null ? "border-osso/30 text-osso" : status.open ? "border-[#5fd068]/50 text-[#8ee497]" : "border-arancio/60 text-arancio"
  const dot = status.open ? "bg-[#5fd068]" : "bg-arancio"
  return (
    <span
      aria-live="polite"
      className={`inline-flex h-11 items-center gap-2.5 rounded-full border bg-nero/60 px-5 text-[14px] font-semibold tracking-[0.1em] uppercase backdrop-blur-md ${tone}`}
    >
      {status.open !== null && (
        <span className="relative flex h-2.5 w-2.5">
          <span className={`absolute inset-0 animate-ping rounded-full opacity-70 ${dot}`} />
          <span className={`relative h-2.5 w-2.5 rounded-full ${dot}`} />
        </span>
      )}
      {status.text.replace(" ora,", " ·")}
    </span>
  )
}

/* ------------------------------------------------------- PARALLAX PHOTO */

/** A photo that slides slightly slower than the page, so it feels like a window. */
export function ParallaxPhoto({ src, alt, className = "", position = "50% 50%" }: { src: string; alt: string; className?: string; position?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image src={asset(src)} alt={alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------- THE HALL */

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(to)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  )
}

/** The hall photo opens from a framed card to full width as it scrolls into place. */
export function HallReveal({ tables }: { tables: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(10% 7% 10% 7% round 28px)", "inset(0% 0% 0% 0% round 0px)"])
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1])

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ clipPath }} className="relative h-[85svh] max-h-[820px] min-h-[520px] overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image src={asset("/foto/table-upscale.webp")} alt="La sala del 15 Palle: file di tavoli da pool sotto le lampade" fill sizes="100vw" className="object-cover object-[35%_50%]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-nero/90 via-nero/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1200px] px-5 pb-10 lg:px-10 lg:pb-16">
          <p className="display text-[clamp(120px,40vw,280px)] leading-[0.8] text-osso">
            <CountUp to={tables} />
          </p>
          <p className="kicker mt-2 text-osso">Tavoli da torneo</p>
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------- THE PATCH */

/** Round biker-style patch with the owner's titles, slowly turning. */
export function Patch({ text, size = 260 }: { text: string; size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id="patch-circle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="none" stroke="var(--color-arancio)" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="var(--color-linea)" strokeWidth="1" />
        <text fill="var(--color-osso)" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: 3, textTransform: "uppercase" }}>
          <textPath href="#patch-circle" textLength="512" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[24%] overflow-hidden rounded-full">
        <Image src={asset("/foto/logo.webp")} alt="Logo 15 Palle" fill sizes="140px" className="object-cover" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------- SPEED BAND */

/** Event names run sideways with your scroll, like a sign seen from a moving bike. */
export function SpeedBand({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-55%"])
  const line = [...items, ...items]
  return (
    <div ref={ref} className="overflow-hidden py-2" aria-hidden>
      <motion.div style={{ x }} className="display flex w-max gap-8 text-[72px] whitespace-nowrap sm:text-[110px]">
        {line.map((t, i) => (
          <span key={i} className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-osso)]" : "text-osso"}>
            {t}
            <span className="ml-8 text-arancio">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------- GENERIC REVEAL */

/**
 * Lines that slide up out of a mask when they reach the screen.
 * The visibility check sits on the wrapper: a line hidden by its own mask never counts as "in view".
 */
export function RiseText({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <motion.span
      className={`block ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.05em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "105%" }, shown: { y: 0 } }}
            transition={{ duration: 0.85, ease }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/* ------------------------------------------------------- TONIGHT */

/** Big answer to the only question that matters at 22:00: are they open? */
export function Tonight() {
  const status = useOpenLabel("Aperti tutti i giorni")
  const [headline, sub] =
    status.open === null ? ["Tutti i giorni", "dalle 14:30"] : status.open ? ["Aperti ora", status.text.split(", ")[1]] : ["Chiusi ora", "apriamo alle 14:30"]
  return (
    <div aria-live="polite">
      <p className={`display text-[clamp(72px,22vw,160px)] ${status.open ? "text-arancio" : "text-osso"}`}>{headline}</p>
      <p className="display mt-1 text-[clamp(36px,10vw,72px)] text-osso/70">{sub}</p>
    </div>
  )
}
