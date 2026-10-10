import { ArrowUpRight, Phone } from "@phosphor-icons/react/dist/ssr"
import { Header } from "@/components/header"
import { BottomBar } from "@/components/bottom-bar"
import { Footer } from "@/components/footer"
import { HallReveal, Hero, Patch, RiseText, ScrollWords, SpeedBand, Tonight } from "@/components/scenes"
import { BarDeck } from "@/components/bar-deck"
import { club, events, TABLES } from "@/lib/club"

const wrap = "mx-auto w-full max-w-[1200px] px-5 lg:px-10"

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />

        {/* MANIFESTO: lights up as you read */}
        <section className={`${wrap} py-28 lg:py-40`}>
          <ScrollWords
            text="Trentaquattro tavoli. Un bancone lungo. Divani sotto il glicine. E gente che arriva in moto e resta fino all'una."
            accent={["moto"]}
          />
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
            <p className="mt-8 max-w-[38ch] text-[18px] leading-relaxed text-cromo">
              Stefano Bazzana, titolare del 15 Palle. Otto titoli italiani e un europeo di pool continuo, vinto nel 2011 con una
              finale chiusa 100 a 47. Nel 2023 si è preso anche la Italy Cup of Pool, in coppia con Andrea Grosso.
            </p>
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
          <div className="mt-12">
            <SpeedBand items={["Finali italiane", "Italy Cup of Pool", "RAI Sport", "Italian Pool Tour", "FIBIS"]} />
          </div>
          <div className={`${wrap} mt-12 grid gap-10 lg:grid-cols-2`}>
            <p className="max-w-[40ch] text-[18px] leading-relaxed text-cromo">
              Dal 2011 il 15 Palle ospita gare nazionali della Federazione Italiana Biliardo Sportivo. Nel 2023 e nel 2024 si sono
              giocate qui le finali dei campionati italiani, con le telecamere di RAI Sport.
            </p>
            <details className="group border-t border-linea">
              <summary className="flex h-16 cursor-pointer list-none items-center justify-between text-[17px] font-semibold uppercase tracking-[0.08em] [&::-webkit-details-marker]:hidden">
                Tutte le {events.length} gare ospitate
                <span className="text-[28px] font-normal text-arancio transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <ul className="pb-4">
                {events.map((e) => (
                  <li key={e.when + e.title} className="grid grid-cols-[88px_1fr] gap-4 border-t border-linea py-4">
                    <span className="display text-[24px] text-arancio">{e.when}</span>
                    <span>
                      <span className="block font-semibold">{e.title}</span>
                      <span className="mt-0.5 block text-[16px] leading-snug text-cromo">{e.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </section>

        {/* IL BAR */}
        <section id="bar" className={`${wrap} grid scroll-mt-16 gap-14 py-28 lg:grid-cols-2 lg:items-center lg:py-40`}>
          <div>
            <h2 className="display text-[60px] sm:text-[84px] lg:text-[100px]">
              <RiseText lines={["Tra una partita", "e l'altra."]} />
            </h2>
            <p className="mt-8 max-w-[36ch] text-[18px] leading-relaxed text-cromo">
              Birra alla spina, vini, distillati e qualcosa da sgranocchiare. Divani bianchi sotto il soffitto di glicine, per chi
              gioca e per chi guarda.
            </p>
          </div>
          <BarDeck />
        </section>

        {/* CORSI: the one orange block */}
        <section className="bg-arancio text-nero">
          <div className={`${wrap} py-20 lg:flex lg:items-end lg:justify-between lg:py-28`}>
            <div>
              <h2 className="display text-[64px] sm:text-[90px] lg:text-[110px]">
                <RiseText lines={["Vuoi", "imparare?"]} />
              </h2>
              <p className="mt-6 max-w-[34ch] text-[18px] leading-relaxed font-medium">
                Corsi per bambini, ragazzi e adulti, con istruttori qualificati. Alcuni nostri allievi sono arrivati in Serie B.
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
