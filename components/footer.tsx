import Image from "next/image"
import Link from "next/link"
import { EnvelopeSimple, FacebookLogo, Phone } from "@phosphor-icons/react/dist/ssr"
import { asset } from "@/lib/asset"
import { club } from "@/lib/club"

const icon = "flex h-11 w-11 items-center justify-center border border-linea text-osso transition hover:border-arancio hover:text-arancio active:scale-95"

/** Compact on phones: brand, three contact icons, one legal line. The big wordmark only on desktop. */
export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-linea pb-24 lg:pb-0">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-7 lg:px-10">
        <div className="flex items-center gap-3">
          <Image src={asset("/foto/logo.webp")} alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
          <div>
            <p className="display text-[22px] leading-none">
              15 <span className="text-arancio">Palle</span>
            </p>
            <p className="mt-1 text-[13px] text-cromo">FIBIS e UISP</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a href={club.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className={icon}>
            <FacebookLogo size={20} weight="fill" />
          </a>
          <a href={`mailto:${club.email}`} aria-label={`Email: ${club.email}`} className={icon}>
            <EnvelopeSimple size={20} />
          </a>
          <a href={`tel:${club.phoneTel}`} aria-label={`Telefono: ${club.phoneDisplay}`} className={icon}>
            <Phone size={20} />
          </a>
        </div>
      </div>

      <p aria-hidden className="display hidden text-center text-[26vw] leading-[0.78] text-cuoio-2 select-none lg:block">
        15 Palle
      </p>

      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 border-t border-linea px-5 py-4 text-[13px] text-cromo lg:px-10">
        <p>© {new Date().getFullYear()} {club.legalName}</p>
        <div className="flex gap-4">
          <Link href="/area-soci" className="text-osso">
            Area soci
          </Link>
          <a href="#">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
