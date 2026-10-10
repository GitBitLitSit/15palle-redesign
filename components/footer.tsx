import Link from "next/link"
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr"
import { club } from "@/lib/club"

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-linea pb-28 lg:pb-0">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 pt-14 text-[16px] leading-relaxed text-cromo sm:grid-cols-3 lg:px-10">
        <div>
          <p className="text-osso">{club.legalName}</p>
          <p>Affiliata FIBIS e UISP</p>
        </div>
        <div>
          <p>{club.street}</p>
          <p>{club.city}</p>
          <a href={`mailto:${club.email}`} className="text-osso underline decoration-linea underline-offset-4">
            {club.email}
          </a>
        </div>
        <div className="flex flex-col">
          <a href={club.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-osso">
            <FacebookLogo size={18} weight="fill" />
            Facebook
          </a>
          <Link href="/area-soci" className="text-osso">
            Area soci
          </Link>
          <a href="#">Privacy</a>
        </div>
      </div>

      <p aria-hidden className="display mt-12 text-center text-[31vw] leading-[0.78] text-cuoio-2 select-none lg:text-[26vw]">
        15 Palle
      </p>
      <p className="mx-auto max-w-[1200px] px-5 py-6 text-[13px] text-cromo lg:px-10">
        © {new Date().getFullYear()} {club.fullName}
      </p>
    </footer>
  )
}
