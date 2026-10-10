import { ArrowUpRight, Phone } from "@phosphor-icons/react/dist/ssr"
import { Header } from "@/components/header"
import { BottomBar } from "@/components/bottom-bar"
import { Footer } from "@/components/footer"
import { HallReveal, Hero, ParallaxPhoto, Patch, RiseText, SpeedBand, Tonight } from "@/components/scenes"
import { BarDeck } from "@/components/bar-deck"
import { NextEvent } from "@/components/events"
import { Gallery } from "@/components/gallery"
import Link from "next/link"
import { club, TABLES } from "@/lib/club"

const wrap = "mx-auto w-full max-w-[1200px] px-5 lg:px-10"

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />

        {/* PROSSIMO EVENTO */}
        <section className={`${wrap} py-16 lg:py-24`}>
          <NextEvent />
        </section>

        {/* LA SALA */}
        <section id="sala" className="scroll-mt-16">
          <HallReveal tables={TABLES} />
        </section>

        {/* IL CAMPIONE */}
        <section id="campione" className={`${wrap} grid scroll-mt-16 gap-14 py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-40`}>
          <div>
            <h2 className="display text-[68px] sm:text-[96px] lg:text-[120px]">
              <RiseText lines={["Arriva", "in Harley."]} />
              <RiseText lines={["Gioca da", "campione."]} className="text-arancio" />
            </h2>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-linea pt-6">
              {[
                ["8×", "Campione italiano"],
                ["2011", "Campione europeo"],
                ["2023", "Italy Cup of Pool"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="display text-[44px] text-arancio sm:text-[56px]">{n}</dt>
                  <dd className="mt-1 text-[14px] leading-snug text-cromo">{l}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[16px] text-cromo">Stefano Bazzana, il titolare.</p>
          </div>
          <div className="flex justify-center">
            <Patch text="8 volte campione italiano · campione europeo 2011 · " size={300} />
          </div>
        </section>

        {/* LE GARE */}
        <section id="gare" className="scroll-mt-16 border-y border-linea bg-cuoio py-24 lg:py-32">
          <div className={wrap}>
            <h2 className="display text-[60px] sm:text-[84px] lg:text-[110px]">
              <RiseText lines={["Qui si gioca", "il campionato."]} />
            </h2>
          </div>
          <ParallaxPhoto
            src="/foto/hero-focus.webp"
            alt="Un tavolo da gara con il cartello FIBIS, pronto per la finale"
            className="mx-5 mt-12 h-[62svh] max-h-[640px] min-h-[380px] rounded-[20px] lg:mx-10"
            position="50% 55%"
          />
          <div className="mt-12">
            <SpeedBand items={["Finali italiane", "Italy Cup of Pool", "RAI Sport", "Italian Pool Tour", "FIBIS"]} />
          </div>
          <div className={`${wrap} mt-12 grid gap-10 lg:grid-cols-2`}>
            <p className="display text-[34px] leading-[1] text-osso/80 sm:text-[44px]">
              Finali italiane nel 2023 e 2024, <span className="text-arancio">in diretta su RAI Sport.</span>
            </p>
            <Link
              href="/eventi"
              className="group flex h-16 items-center justify-between border-y border-linea text-[17px] font-semibold tracking-[0.08em] uppercase"
            >
              Eventi in arrivo e archivio
              <ArrowUpRight size={22} className="text-arancio transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </section>

        {/* IL BAR */}
        <section id="bar" className={`${wrap} grid scroll-mt-16 gap-14 py-28 lg:grid-cols-2 lg:items-center lg:py-40`}>
          <div>
            <h2 className="display text-[60px] sm:text-[84px] lg:text-[100px]">
              <RiseText lines={["Tra una partita", "e l'altra."]} />
            </h2>
            <p className="mt-8 max-w-[36ch] text-[18px] leading-relaxed text-cromo">
              Birra alla spina, vini e distillati. Divani sotto il glicine.
            </p>
          </div>
          <BarDeck />
        </section>

        {/* GALLERIA */}
        <section className="pb-28 lg:pb-40">
          <h2 className={`${wrap} display mb-10 text-[60px] sm:text-[84px] lg:text-[100px]`}>
            <RiseText lines={["Dentro", "il 15 Palle."]} />
          </h2>
          <Gallery />
        </section>

        {/* CORSI: the one orange block */}
        <section className="bg-arancio text-nero">
          <div className={`${wrap} py-20 lg:flex lg:items-end lg:justify-between lg:py-28`}>
            <div>
              <h2 className="display text-[64px] sm:text-[90px] lg:text-[110px]">
                <RiseText lines={["Vuoi", "imparare?"]} />
              </h2>
              <p className="mt-6 max-w-[34ch] text-[18px] leading-relaxed font-medium">
                Corsi per bambini, ragazzi e adulti. Qualcuno è arrivato in Serie B.
              </p>
            </div>
            <a
              href={`tel:${club.phoneTel}`}
              className="mt-8 inline-flex h-14 items-center gap-3 bg-nero px-7 text-[16px] font-semibold tracking-[0.08em] text-osso uppercase transition active:scale-[0.97] lg:mt-0"
            >
              <Phone size={20} />
              Chiedi dei corsi
            </a>
          </div>
        </section>

        {/* ORARI */}
        <section id="orari" className={`${wrap} scroll-mt-16 py-28 lg:py-40`}>
          <Tonight />
          <div className="mt-14 grid gap-10 border-t border-linea pt-10 lg:grid-cols-3">
            <dl className="space-y-4 text-[18px]">
              <div>
                <dt className="text-cromo">Lunedì - sabato</dt>
                <dd className="font-semibold">14:30 - 1:00</dd>
              </div>
              <div>
                <dt className="text-cromo">Domenica</dt>
                <dd className="font-semibold">14:30 - 24:00</dd>
              </div>
            </dl>
            <div className="text-[18px]">
              <p className="font-semibold">{club.street}</p>
              <p className="text-cromo">{club.city}</p>
              <a href={`tel:${club.phoneTel}`} className="mt-4 block font-semibold">
                {club.phoneDisplay}
              </a>
            </div>
            <div className="hidden lg:block">
              <a
                href={club.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center gap-3 bg-arancio px-7 text-[16px] font-semibold tracking-[0.08em] text-nero uppercase"
              >
                Apri la mappa
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomBar />
    </>
  )
}
