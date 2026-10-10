"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useId, useState } from "react"
import { ArrowLeft, CircleNotch } from "@phosphor-icons/react"
import { asset } from "@/lib/asset"

type Step = "email" | "code"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Design preview only: no request leaves the browser. The real app sends the code by email.
const fakeRequest = () => new Promise((r) => setTimeout(r, 900))

export default function AreaSoci() {
  const router = useRouter()
  const emailId = useId()
  const codeId = useId()
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function sendCode(e: React.FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError("Inserisci un indirizzo email valido.")
      return
    }
    setError(null)
    setBusy(true)
    await fakeRequest()
    setBusy(false)
    setStep("code")
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault()
    if (!/^\d{6}$/.test(code)) {
      setError("Il codice ha 6 cifre. Controlla l'email che ti abbiamo inviato.")
      return
    }
    setError(null)
    setBusy(true)
    await fakeRequest()
    try {
      sessionStorage.setItem("15palle-email", email.trim())
    } catch {}
    router.push("/area-soci/tessera")
  }

  const input =
    "h-14 w-full border border-white/15 bg-cuoio px-4 text-[17px] text-osso outline-none transition placeholder:text-cromo/70 focus:border-arancio focus:ring-4 focus:ring-arancio/15 aria-[invalid=true]:border-[#ff7b72]"

  return (
    <div className="grid min-h-[100svh] lg:grid-cols-2">
      <div className="flex flex-col px-5 pt-[max(16px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))] lg:px-12">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="-ml-2 inline-flex h-11 items-center gap-1.5 px-2 text-[15px] text-cromo" aria-label="Torna al sito">
            <ArrowLeft size={20} />
            Sito
          </Link>
          <Image src={asset("/foto/logo.webp")} alt="15 Palle" width={36} height={36} className="h-9 w-9 rounded-full" />
        </div>

        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-10">
          <h1 className="display text-[40px]">{step === "email" ? "Area soci" : "Controlla la posta"}</h1>
          <p className="mt-3 leading-relaxed text-cromo">
            {step === "email" ? (
              "Ti mandiamo un codice via email per aprire la tua tessera."
            ) : (
              <>
                Abbiamo inviato un codice a <span className="font-semibold text-osso">{email}</span>.
              </>
            )}
          </p>

          {step === "email" ? (
            <form onSubmit={sendCode} noValidate className="mt-10 flex flex-col gap-2">
              <label htmlFor={emailId} className="text-[15px] font-medium">
                Email
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={`${emailId}-msg`}
                className={input}
                placeholder="nome@esempio.it"
              />
              <p id={`${emailId}-msg`} className={`text-[14px] ${error ? "text-[#ff8a80]" : "text-cromo"}`}>
                {error ?? "Usa l'email con cui ti sei iscritto."}
              </p>
              <Submit busy={busy} label="Invia codice" />
            </form>
          ) : (
            <form onSubmit={verify} noValidate className="mt-10 flex flex-col gap-2">
              <label htmlFor={codeId} className="text-[15px] font-medium">
                Codice di verifica
              </label>
              <input
                id={codeId}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                aria-invalid={!!error}
                aria-describedby={`${codeId}-msg`}
                className={`${input} text-center text-[28px] tracking-[0.4em] tabular-nums`}
                placeholder="000000"
              />
              <p id={`${codeId}-msg`} className={`text-[14px] ${error ? "text-[#ff8a80]" : "text-cromo"}`}>
                {error ?? "Anteprima: va bene qualsiasi codice di 6 cifre."}
              </p>
              <Submit busy={busy} label="Apri la tessera" />
              <button
                type="button"
                onClick={() => {
                  setStep("email")
                  setCode("")
                  setError(null)
                }}
                className="mt-2 h-11 self-center text-[15px] font-medium text-arancio"
              >
                Usa un&apos;altra email
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[12px] text-cromo lg:text-left">Anteprima del design. Nessun dato viene inviato.</p>
      </div>

      <div className="relative hidden lg:block">
        <Image src={asset("/foto/aura.webp")} alt="Un giocatore prepara il colpo" fill priority sizes="50vw" className="object-cover" />
      </div>
    </div>
  )
}

function Submit({ busy, label }: { busy: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="mt-4 inline-flex h-14 items-center justify-center gap-2 bg-arancio text-[17px] font-semibold text-nero transition active:scale-[0.98] disabled:opacity-80"
    >
      {busy ? (
        <>
          <CircleNotch size={20} className="animate-spin motion-reduce:animate-none" />
          Un momento...
        </>
      ) : (
        label
      )}
    </button>
  )
}
