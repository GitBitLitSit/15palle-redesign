import type { Metadata } from "next"
import { LegalPage, Section } from "@/components/legal-page"
import { club } from "@/lib/club"

export const metadata: Metadata = {
  title: "Datenschutz · Privacy · 15 Palle Bolzano",
  description: "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).",
}

// Template text for the design preview. Have it reviewed before the site goes live.
export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutz" subtitle="Informativa privacy ai sensi del Regolamento UE 2016/679 (GDPR). Ultimo aggiornamento: ottobre 2026.">
      <Section title="Titolare del trattamento">
        <p>
          {club.legalName}
          <br />
          {club.street}, {club.city}
          <br />
          {club.taxCode}
          <br />
          Email: <a href={`mailto:${club.email}`}>{club.email}</a> · Tel. <a href={`tel:${club.phoneTel}`}>{club.phoneDisplay}</a>
        </p>
      </Section>

      <Section title="Quali dati trattiamo">
        <ul>
          <li>Dati di navigazione tecnici (indirizzo IP, browser, orario), necessari a mostrare il sito e conservati dal fornitore di hosting.</li>
          <li>Indirizzo email e dati del tesseramento, se accedi all&apos;area soci.</li>
          <li>I dati che ci mandi tu, quando ci scrivi o ci chiami.</li>
        </ul>
      </Section>

      <Section title="Perché e su quale base">
        <ul>
          <li>Gestire il tesseramento e l&apos;accesso alla sala (art. 6.1.b GDPR, esecuzione del rapporto associativo).</li>
          <li>Rispondere alle tue richieste (art. 6.1.b GDPR).</li>
          <li>Tenere il sito sicuro e funzionante (art. 6.1.f GDPR, legittimo interesse).</li>
          <li>Rispettare obblighi di legge, ad esempio fiscali e sportivi (art. 6.1.c GDPR).</li>
        </ul>
      </Section>

      <Section title="Cookie">
        <p>
          Il sito usa solo cookie tecnici necessari al funzionamento. Non usiamo cookie di profilazione né strumenti di analisi. I link a Google Maps,
          Facebook e Instagram portano a servizi esterni con proprie informative.
        </p>
      </Section>

      <Section title="Per quanto tempo">
        <p>
          I dati dei soci sono conservati per la durata del tesseramento e poi per il tempo previsto dalla legge. Le richieste di contatto sono cancellate
          quando non servono più.
        </p>
      </Section>

      <Section title="I tuoi diritti">
        <p>
          Puoi chiedere in ogni momento accesso, rettifica, cancellazione, limitazione, portabilità o opporti al trattamento (artt. 15-22 GDPR),
          scrivendo a <a href={`mailto:${club.email}`}>{club.email}</a>. Hai anche diritto di proporre reclamo al{" "}
          <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">
            Garante per la protezione dei dati personali
          </a>
          .
        </p>
      </Section>
    </LegalPage>
  )
}
