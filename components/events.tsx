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
  return splitEvents(today)
}

/* ------------------------------------------------------- HOME PROMO */

/** The next event on the home page. Falls back to the latest past one if the calendar is empty. */
export function NextEvent() {
  const { upcoming, past } = useEvents()
  const e = upcoming[0] ?? past[0]
  if (!e) return null
  const d = eventDate(e)
  const isNext = upcoming.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease }}
    >
      <Link
        href="/eventi"
        className="group relative grid grid-cols-[auto_1fr] overflow-hidden rounded-[20px] border border-linea bg-cuoio transition active:scale-[0.99]"
      >
        <div className="flex w-[112px] flex-col items-center justify-center bg-arancio px-3 py-6 text-nero sm:w-[150px]">
          {d.day ? (
            <>
              <span className="display text-[72px] leading-[0.8] sm:text-[96px]">{d.day}</span>
              <span className="display mt-2 text-[24px] sm:text-[30px]">{d.month}</span>
            </>
          ) : (
            <>
              <span className="display text-[34px]">{d.month}</span>
              <span className="display text-[44px] leading-[0.9]">{d.year}</span>
            </>
          )}
        </div>
        <div className="flex flex-col justify-center gap-2 p-5 sm:p-8">
          <span className="text-[13px] font-semibold tracking-[0.12em] text-arancio uppercase">
            {isNext ? "Prossimo evento" : "Ultimo evento"}
          </span>
          <span className="display text-[34px] leading-[0.95] sm:text-[52px]">{e.title}</span>
          <span className="text-[15px] text-cromo">
            {d.day ? `${d.weekday} ${d.day} ${d.monthLong}${e.time ? `, ore ${e.time}` : ""}` : `${d.monthLong} ${d.year}`}
          </span>
          <span className="mt-2 inline-flex items-center gap-2 text-[14px] font-semibold tracking-[0.08em] uppercase">
            Tutti gli eventi
            <ArrowRight size={16} className="text-arancio transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
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
