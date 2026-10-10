import { ArrowUpRight, Phone } from "@phosphor-icons/react/dist/ssr"
import { Header } from "@/components/header"
import { BottomBar } from "@/components/bottom-bar"
import { Footer } from "@/components/footer"
import { HallReveal, Hero, Patch, RiseText, Schedule, SpeedBand } from "@/components/scenes"
import { BarDeck } from "@/components/bar-deck"
import { NextEvent } from "@/components/events"
import { Gallery } from "@/components/gallery"
import { club, TABLES } from "@/lib/club"

const wrap = "mx-auto w-full max-w-[1200px] px-5 lg:px-10"

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />

        {/* PROSSIMO EVENTO */}
        <section id="eventi" className="scroll-mt-16 py-16 lg:py-24">
          <SpeedBand items={["Finali italiane", "Italy Cup of Pool", "RAI Sport", "Italian Pool Tour", "FIBIS"]} />
          <div className={`${wrap} mt-10 lg:mt-14`}>
            <NextEvent />
          </div>
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
          <h2 className="display text-[64px] sm:text-[90px] lg:text-[110px]">
            <RiseText lines={["Ci vediamo", "al tavolo."]} />
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <Schedule />
            <div className="text-[18px]">
              <p className="font-semibold">{club.street}</p>
              <p className="text-cromo">{club.city}</p>
              <a href={`tel:${club.phoneTel}`} className="mt-4 block font-semibold">
                {club.phoneDisplay}
              </a>
              <a
                href={club.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-8 hidden h-14 items-center gap-3 bg-arancio px-7 text-[16px] font-semibold tracking-[0.08em] text-nero uppercase lg:inline-flex"
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
