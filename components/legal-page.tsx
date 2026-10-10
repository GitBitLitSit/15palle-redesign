import { Header } from "@/components/header"
import { BottomBar } from "@/components/bottom-bar"
import { Footer } from "@/components/footer"

/** Shared shell for the legal pages: plain, readable, no animation. */
export function LegalPage({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[760px] px-5 pt-32 pb-24 lg:px-10 lg:pt-40">
        <h1 className="display text-[64px] sm:text-[96px]">{title}</h1>
        <p className="mt-3 text-[15px] text-cromo">{subtitle}</p>
        <div className="mt-12 space-y-10 text-[16px] leading-relaxed text-osso/85 [&_a]:text-osso [&_a]:underline [&_a]:decoration-linea [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
          {children}
        </div>
      </main>
      <Footer />
      <BottomBar />
    </>
  )
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="display text-[30px] text-osso">{title}</h2>
      {children}
    </section>
  )
}
