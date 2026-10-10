"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { asset } from "@/lib/asset"

const links = [
  { href: asset("/eventi/"), label: "Eventi" },
  { href: asset("/#sala"), label: "La sala" },
  { href: asset("/#campione"), label: "Il campione" },
  { href: asset("/#bar"), label: "Il bar" },
  { href: asset("/#orari"), label: "Orari" },
]

/** Transparent over the hero, solid once you scroll. Menu is a full-screen sheet on phones. */
export function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 60))

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
          solid || open ? "bg-nero/90 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 lg:px-10">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5" aria-label="15 Palle, home">
            <Image src={asset("/foto/logo.webp")} alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-full" priority />
            <span className="display text-[24px] tracking-wide">
              15 <span className="text-arancio">Palle</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="kicker !text-[14px] text-osso/75 transition-colors hover:text-arancio">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <Link
            href="/area-soci"
            className="kicker hidden h-10 items-center border border-osso/40 px-5 !text-[14px] transition hover:border-arancio hover:text-arancio lg:inline-flex"
          >
            Area soci
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
          >
            <span className={`h-[2px] w-6 bg-osso transition-transform duration-300 ${open ? "translate-y-[4.5px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-6 bg-osso transition-transform duration-300 ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-nero/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {open && (
          <motion.div
            key="menu"
            id="menu"
            className="fixed inset-x-0 top-0 z-40 bg-nero px-5 pt-[calc(64px+env(safe-area-inset-top)+8px)] pb-8 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] lg:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul>
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-linea">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display flex h-[72px] items-center text-[52px]"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
