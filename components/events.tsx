"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, Phone } from "@phosphor-icons/react"
import { club, eventDate, romeToday, splitEvents, type ClubEvent } from "@/lib/club"

const ease = [0.16, 1, 0.3, 1] as const

/** Starts from the build date (same on server and client), then switches to today's date in Bolzano. */
export function useEvents() {
  const [today, setToday] = useState(process.env.NEXT_PUBLIC_BUILD_DATE ?? "2026-01-01")
  useEffect(() => setToday(romeToday()), [])
  return { ...splitEvents(today), today }
}

/** "Oggi", "Domani" or "Tra 15 giorni", from two ISO days. */
function countdown(today: string, date: string) {
  const days = Math.round((Date.parse(date) - Date.parse(today)) / 86_400_000)
  if (days <= 0) return { lead: "Si gioca", n: "oggi", tail: "" }
  if (days === 1) return { lead: "Si gioca", n: "domani", tail: "" }
  return { lead: "Mancano", n: String(days), tail: " giorni" }
}

/* ------------------------------------------------------- HOME PROMO */

/**
 * The next event as a fight-night bill: a huge outlined date, the name cut across it,
 * a ticket strip with day, time and game, and how many days are left.
 * Falls back to the latest past event if the calendar is empty.
 */
export function NextEvent() {
  const { upcoming, past, today } = useEvents()
  const e = upcoming[0] ?? past[0]
  if (!e) return null
  const d = eventDate(e)
  const isNext = upcoming.length > 0 && !!d.day
  const big = d.day ? `${String(d.day).padStart(2, "0")}.${e.date.slice(5, 7)}` : `${d.month} ${String(d.year).slice(2)}`
  const left = isNext ? countdown(today, e.date) : null
  const strip = d.day ? [d.weekday, e.time ? `Ore ${e.time}` : null, e.tag] : [d.monthLong, String(d.year), e.tag]

  return (
    <div className="lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
      <div className="relative">
        {/* The visibility check sits on the mask: the hidden numerals themselves never count as in view. */}
        <motion.p
          aria-hidden
          className="display overflow-hidden pt-[0.08em] text-[clamp(130px,42vw,340px)] leading-[0.78]"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            className="block text-transparent [-webkit-text-stroke:2px_var(--color-arancio)]"
            variants={{ hidden: { y: "100%" }, shown: { y: 0 } }}
            transition={{ duration: 1, ease }}
          >
            {big}
          </motion.span>
        </motion.p>
        <motion.h2
          className="display relative -mt-[0.55em] text-[clamp(52px,15vw,96px)] leading-[0.88] lg:hidden"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
        >
          {e.title}
        </motion.h2>
      </div>

      <div>
        <h2 className="display hidden text-[88px] leading-[0.88] lg:block">{e.title}</h2>

        <ul className="mt-8 grid grid-cols-3 border-y border-linea lg:mt-10">
          {strip.map((t, i) => (
            <li
              key={i}
              className={`display flex h-16 items-center justify-center text-[22px] sm:text-[26px] ${i > 0 ? "border-l border-linea" : ""} ${
                i === 2 ? "text-arancio" : ""
              }`}
            >
              {t}
            </li>
          ))}
        </ul>

        {left ? (
          <p className="display mt-6 text-[34px] leading-none text-osso/60 sm:text-[44px]" suppressHydrationWarning>
            {left.lead} <span className="text-osso">{left.n}</span>
            {left.tail}
          </p>
        ) : (
          <p className="mt-6 text-[16px] leading-relaxed text-cromo">{e.detail}</p>
        )}

        <div className="mt-8 flex items-center gap-5 whitespace-nowrap">
          {isNext && (
            <a
              href={`tel:${club.phoneTel}`}
              className="inline-flex h-14 items-center gap-3 bg-arancio px-7 text-[16px] font-semibold tracking-[0.08em] text-nero uppercase transition active:scale-[0.97]"
            >
              <Phone size={20} />
              Iscriviti
            </a>
          )}
          <Link href="/eventi" className="group inline-flex items-center gap-2 text-[15px] font-semibold tracking-[0.08em] uppercase">
            Tutti gli eventi
            <ArrowRight size={18} className="text-arancio transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------- EVENTS PAGE */

function UpcomingCard({ e, i }: { e: ClubEvent; i: number }) {
  const d = eventDate(e)
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: i * 0.08, ease }}
      className={`grid grid-cols-[auto_1fr] overflow-hidden rounded-[20px] border ${i === 0 ? "border-arancio/60 bg-cuoio-2" : "border-linea bg-cuoio"}`}
    >
      <div className={`flex w-[96px] flex-col items-center justify-center px-2 py-6 sm:w-[140px] ${i === 0 ? "bg-arancio text-nero" : "border-r border-linea"}`}>
        <span className="display text-[64px] leading-[0.8] sm:text-[88px]">{d.day}</span>
        <span className={`display mt-2 text-[22px] sm:text-[28px] ${i === 0 ? "" : "text-arancio"}`}>{d.month}</span>
      </div>
      <div className="p-5 sm:p-8">
        <span className="text-[13px] font-semibold tracking-[0.12em] text-arancio uppercase">
          {d.weekday} {e.time && `· ${e.time}`} · {e.tag}
        </span>
        <h3 className="display mt-2 text-[32px] leading-[0.95] sm:text-[48px]">{e.title}</h3>
        <p className="mt-3 max-w-[44ch] text-[16px] leading-relaxed text-cromo">{e.detail}</p>
        <a
          href={`tel:${club.phoneTel}`}
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-osso/30 px-5 text-[13px] font-semibold tracking-[0.1em] uppercase transition active:scale-[0.97] hover:border-arancio hover:text-arancio"
        >
          <Phone size={16} />
          Iscriviti
        </a>
      </div>
    </motion.li>
  )
}

export function EventsList() {
  const { upcoming, past } = useEvents()
  const years = [...new Set(past.map((e) => eventDate(e).year))]

  return (
    <>
      <section className="mt-14">
        <h2 className="display text-[44px] sm:text-[64px]">
          In arrivo <span className="text-arancio">{upcoming.length > 0 && upcoming.length}</span>
        </h2>
        {upcoming.length > 0 ? (
          <ul className="mt-6 grid gap-4">
            {upcoming.map((e, i) => (
              <UpcomingCard key={e.date + e.title} e={e} i={i} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-[20px] border border-linea bg-cuoio p-6 text-[17px] text-cromo">
            Il calendario è in preparazione. Chiamaci al{" "}
            <a href={`tel:${club.phoneTel}`} className="font-semibold text-osso">
              {club.phoneDisplay}
            </a>{" "}
            per sapere cosa bolle in pentola.
          </p>
        )}
      </section>

      <section className="mt-24">
        <h2 className="display text-[44px] sm:text-[64px]">Già giocati qui</h2>
        <div className="mt-6">
          {years.map((y) => (
            <div key={y} className="grid grid-cols-[72px_1fr] gap-4 border-t border-linea py-6 sm:grid-cols-[140px_1fr]">
              <span className="display text-[34px] leading-none text-osso/40 sm:text-[56px]">{y}</span>
              <ul className="space-y-6">
                {past
                  .filter((e) => eventDate(e).year === y)
                  .map((e) => (
                    <motion.li
                      key={e.date + e.title}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, ease }}
                    >
                      <span className="text-[13px] font-semibold tracking-[0.12em] text-arancio uppercase">
                        {eventDate(e).monthLong} · {e.tag}
                      </span>
                      <span className="mt-1 block text-[19px] leading-snug font-semibold">{e.title}</span>
                      <span className="mt-1 block text-[15px] leading-snug text-cromo">{e.detail}</span>
                    </motion.li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
