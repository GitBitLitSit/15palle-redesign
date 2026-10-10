import type { Metadata } from "next"
import { Header } from "@/components/header"
import { BottomBar } from "@/components/bottom-bar"
import { Footer } from "@/components/footer"
import { ParallaxPhoto, RiseText } from "@/components/scenes"
import { EventsList } from "@/components/events"

export const metadata: Metadata = {
  title: "Eventi · 15 Palle Bolzano",
  description: "Tornei in arrivo e le gare nazionali giocate al 15 Palle, Via Bruno Buozzi 12, Bolzano.",
}

export default function Eventi() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <section className="relative isolate flex min-h-[56svh] flex-col justify-end">
          <ParallaxPhoto
            src="/foto/hero-focus.webp"
            alt="Un tavolo da gara con il cartello FIBIS"
            className="!absolute inset-0 -z-10"
            position="50% 55%"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-nero via-nero/50 to-nero/20" />
          <h1 className="display mx-auto w-full max-w-[1200px] px-5 pb-6 text-[clamp(96px,30vw,220px)] leading-[0.8] lg:px-10">
            <RiseText lines={["Eventi"]} />
          </h1>
        </section>

        <div className="mx-auto w-full max-w-[1200px] px-5 pb-28 lg:px-10 lg:pb-40">
          <EventsList />
        </div>
      </main>
      <Footer />
      <BottomBar />
    </>
  )
}
