"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { motion } from "motion/react"
import { ArrowLeft, SignOut } from "@phosphor-icons/react"
import { asset } from "@/lib/asset"

// Sample member for the design preview. The real pass reads the member from the API.
const demoMember = {
  name: "Giulia Rinaldi",
  memberSince: "marzo 2025",
  qrUuid: "3f9c2a71-5b8e-4d0a-9e61-7c2d4b8a1f05",
}

export default function Tessera() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    try {
      setEmail(sessionStorage.getItem("15palle-email"))
    } catch {}
  }, [])

  return (
    <div className="flex min-h-[100svh] flex-col px-5 pt-[max(16px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex h-14 w-full max-w-[420px] items-center justify-between">
        <Link href="/" className="-ml-2 inline-flex h-11 items-center gap-1.5 px-2 text-[15px] text-cromo">
          <ArrowLeft size={20} />
          Sito
        </Link>
        <Link href="/area-soci" className="-mr-2 inline-flex h-11 items-center gap-1.5 px-2 text-[15px] text-cromo">
          Esci
          <SignOut size={20} />
        </Link>
      </div>

      <main className="flex flex-1 flex-col items-center justify-center py-6">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="bg-cuoio-2 w-full max-w-[380px] overflow-hidden shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]"
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-3">
              <Image src={asset("/foto/logo.webp")} alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
              <div>
                <p className="display text-[20px]">15 Palle</p>
                <p className="text-[13px] text-osso/75">Tessera socio</p>
              </div>
            </div>
            <span className="kicker text-arancio">Bolzano</span>
          </div>

          <div className="px-6 pt-7">
            <p className="display text-[32px]">{demoMember.name}</p>
            {email && <p className="mt-1 truncate text-[14px] text-osso/75">{email}</p>}
            <p className="mt-1 text-[14px] text-osso/75">Socio da {demoMember.memberSince}</p>
          </div>

          <div className="m-6 bg-white p-5">
            <QRCodeSVG value={demoMember.qrUuid} size={512} level="M" className="h-auto w-full" aria-label="QR code della tessera" />
          </div>

          <p className="border-t border-white/15 px-6 py-4 text-center text-[15px] font-medium">Mostra il codice all&apos;ingresso</p>
        </motion.div>

        <p className="mt-6 max-w-[34ch] text-center text-[13px] text-cromo">Anteprima con un socio di esempio. Il QR non è valido.</p>
      </main>
    </div>
  )
}
