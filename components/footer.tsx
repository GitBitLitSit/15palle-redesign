import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr"
import { asset } from "@/lib/asset"
import { club } from "@/lib/club"

const social = "flex h-11 w-11 items-center justify-center border border-linea text-osso transition hover:border-arancio hover:text-arancio active:scale-95"
const head = "mb-3 text-[12px] font-semibold tracking-[0.14em] text-arancio uppercase"
const link = "transition-colors hover:text-arancio"

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-linea bg-cuoio pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 lg:grid-cols-[1.3fr_2fr] lg:gap-20 lg:px-10 lg:py-20">
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label="15 Palle, home">
            <Image src={asset("/foto/logo.webp")} alt="" width={44} height={44} className="h-11 w-11 rounded-full" />
            <span className="display text-[28px] leading-none">
              15 <span className="text-arancio">Palle</span>
            </span>
          </Link>
          <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-cromo">
            Sala biliardo, bar e tornei nazionali nel cuore di Bolzano.
          </p>
          <div className="mt-5 flex gap-2">
            <a href={club.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={social}>
              <InstagramLogo size={20} />
            </a>
            <a href={club.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className={social}>
              <FacebookLogo size={20} weight="fill" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-[15px] leading-relaxed sm:grid-cols-4">
          <div>
            <p className={head}>Visita</p>
            <p>Via Bruno Buozzi 12</p>
            <p className="text-cromo">39100 Bolzano</p>
            <a href={club.mapsHref} target="_blank" rel="noreferrer" className={`mt-1 inline-flex items-center gap-1 ${link}`}>
              Indicazioni <ArrowUpRight size={14} />
            </a>
          </div>
          <div>
            <p className={head}>Orari</p>
            <p>Lun - Sab</p>
            <p className="text-cromo">14:30 - 1:00</p>
            <p className="mt-1">Dom</p>
            <p className="text-cromo">14:30 - 24:00</p>
          </div>
          <div className="min-w-0">
            <p className={head}>Contatti</p>
            <a href={`tel:${club.phoneTel}`} className={`block ${link}`}>
              {club.phoneDisplay}
            </a>
            <a href={`mailto:${club.email}`} className={`block truncate text-cromo ${link}`}>
              {club.email}
            </a>
          </div>
          <div>
            <p className={head}>Il club</p>
            <ul className="space-y-0.5">
              <li>
                <Link href="/eventi" className={link}>
                  Eventi
                </Link>
              </li>
              <li>
                <Link href="/area-soci" className={link}>
                  Area soci
                </Link>
              </li>
              <li className="text-cromo">Affiliato FIBIS e UISP</li>
            </ul>
          </div>
        </div>
      </div>

      <p aria-hidden className="display hidden text-center text-[26vw] leading-[0.78] text-cuoio-2 select-none lg:block">
        15 Palle
      </p>

      <div className="border-t border-linea">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-5 text-[13px] text-cromo sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>
            © {new Date().getFullYear()} {club.legalName} · {club.taxCode}
          </p>
          <div className="flex gap-5">
            <Link href="/datenschutz" className={`text-osso ${link}`}>
              Datenschutz
            </Link>
            <Link href="/impressum" className={`text-osso ${link}`}>
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
