"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll } from "motion/react"
import { ArrowLeft, ArrowRight, ArrowsOut } from "@phosphor-icons/react"
import { asset } from "@/lib/asset"
import { Viewer, type Photo } from "@/components/bar-deck"

const slides: (Photo & { title: string })[] = [
  { src: asset("/foto/lounge.webp"), title: "La lounge", alt: "Divani, sgabelli e i tavoli sullo sfondo, sotto il glicine" },
  { src: asset("/foto/mano.webp"), title: "Il triangolo", alt: "Una mano prepara le palle sul panno blu" },
  { src: asset("/foto/another-one.webp"), title: "Il bancone", alt: "Il bancone e la sala, con il soffitto di fiori" },
  { src: asset("/foto/newbar4.webp"), title: "Le coppe", alt: "Trofei, gin e distillati dietro la vetrina" },
  { src: asset("/foto/newbar5.webp"), title: "Il frigo", alt: "La vetrina dei distillati accanto al frigo delle bibite" },
]

/** A swipeable strip of photos: native scroll-snap on phones, arrows on desktop, tap for full screen. */
export function Gallery() {
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const [viewer, setViewer] = useState<number | null>(null)
  const { scrollXProgress } = useScroll({ container: track })

  function onScroll() {
    const el = track.current
    if (!el) return
    const slide = el.children[0] as HTMLElement
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    setActive(atEnd ? slides.length - 1 : Math.round(el.scrollLeft / (slide.offsetWidth + 16)))
  }

  function go(i: number) {
    const el = track.current
    const target = el?.children[Math.max(0, Math.min(slides.length - 1, i))] as HTMLElement | undefined
    if (el && target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: "smooth" })
  }

  return (
    <div>
      <ul
        ref={track}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] lg:px-[max(40px,calc((100vw-1200px)/2+40px))] [&::-webkit-scrollbar]:hidden"
        aria-label="Galleria foto"
      >
        {slides.map((s, i) => (
          <li
            key={s.src}
            className={`relative aspect-[4/5] w-[82vw] max-w-[760px] shrink-0 snap-start overflow-hidden rounded-[20px] transition-[opacity,transform] duration-500 sm:aspect-[3/2] ${
              i === active ? "opacity-100" : "scale-[0.96] opacity-45"
            }`}
          >
            <button type="button" onClick={() => setViewer(i)} className="absolute inset-0 block" aria-label={`Ingrandisci: ${s.title}`}>
              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 760px, 82vw" className="object-cover" draggable={false} />
              <span className="absolute inset-0 bg-gradient-to-t from-nero/85 via-nero/0 to-nero/0" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-left">
                <span>
                  <span className="display block text-[18px] text-arancio">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display block text-[40px] leading-[0.9] text-osso sm:text-[56px]">{s.title}</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nero/60 text-osso backdrop-blur-sm" aria-hidden>
                  <ArrowsOut size={18} />
                </span>
              </span>
            </button>
          </li>
        ))}
        <li aria-hidden className="w-px shrink-0" />
      </ul>

      <div className="mx-auto mt-6 flex max-w-[1200px] items-center gap-5 px-5 lg:px-10">
        <span className="display w-[64px] text-[22px] tabular-nums">
          {String(active + 1).padStart(2, "0")}
          <span className="text-osso/40"> / {String(slides.length).padStart(2, "0")}</span>
        </span>
        <div className="relative h-[2px] flex-1 bg-linea">
          <motion.div style={{ scaleX: scrollXProgress }} className="absolute inset-0 origin-left bg-arancio" />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Foto precedente" className="flex h-12 w-12 items-center justify-center border border-linea transition active:scale-95 disabled:opacity-30">
            <ArrowLeft size={20} />
          </button>
          <button type="button" onClick={() => go(active + 1)} disabled={active === slides.length - 1} aria-label="Foto successiva" className="flex h-12 w-12 items-center justify-center border border-linea transition active:scale-95 disabled:opacity-30">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {viewer !== null && (
          <Viewer
            photos={slides}
            start={viewer}
            label="Galleria foto"
            onClose={(last) => {
              setViewer(null)
              go(last)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
