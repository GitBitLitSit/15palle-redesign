import Link from "next/link"
import { MapPin, Phone } from "@phosphor-icons/react/dist/ssr"
import { club } from "@/lib/club"

/** Thumb-reach actions on phones: call, directions, member pass. */
export function BottomBar() {
  const base = "flex h-[52px] items-center justify-center gap-2 text-[15px] font-semibold uppercase tracking-[0.08em] transition active:scale-[0.97]"
  return (
    <nav
      aria-label="Azioni rapide"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-linea bg-nero/90 px-3 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))] backdrop-blur-lg lg:hidden"
    >
      <div className="grid grid-cols-[1fr_1fr_1.25fr] gap-2">
        <a href={`tel:${club.phoneTel}`} className={`${base} border border-linea`}>
          <Phone size={18} />
          Chiama
        </a>
        <a href={club.mapsHref} target="_blank" rel="noreferrer" className={`${base} border border-linea`}>
          <MapPin size={18} />
          Mappa
        </a>
        <Link href="/area-soci" className={`${base} bg-arancio text-nero`}>
          Area soci
        </Link>
      </div>
    </nav>
  )
}
