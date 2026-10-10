import type { Metadata } from "next"
import { LegalPage, Section } from "@/components/legal-page"
import { club } from "@/lib/club"

export const metadata: Metadata = {
  title: "Impressum · Note legali · 15 Palle Bolzano",
  description: "Dati legali dell'associazione sportiva dilettantistica 15 Quindici Palle, Bolzano.",
}

// Template text for the design preview. Have it reviewed before the site goes live.
export default function Impressum() {
  return (
    <LegalPage title="Impressum" subtitle="Note legali e informazioni sul gestore del sito.">
      <Section title="Gestore del sito">
        <p>
          {club.legalName}
          <br />
          Associazione sportiva dilettantistica
          <br />
          {club.street}
          <br />
          {club.city}, Italia
          <br />
          {club.taxCode}
        </p>
      </Section>

      <Section title="Contatti">
        <p>
          Tel. <a href={`tel:${club.phoneTel}`}>{club.phoneDisplay}</a>
          <br />
          Email: <a href={`mailto:${club.email}`}>{club.email}</a>
        </p>
      </Section>

      <Section title="Affiliazioni">
        <p>Affiliata alla Federazione Italiana Biliardo Sportivo (FIBIS) e all&apos;Unione Italiana Sport Per tutti (UISP).</p>
      </Section>

      <Section title="Responsabile dei contenuti">
        <p>Il presidente pro tempore dell&apos;associazione, presso la sede indicata sopra.</p>
      </Section>

      <Section title="Contenuti e link">
        <p>
          Curiamo i contenuti con attenzione ma non possiamo garantirne la completezza: orari ed eventi possono cambiare, nel dubbio chiamaci. Non siamo
          responsabili dei contenuti dei siti esterni a cui rimandiamo.
        </p>
      </Section>

      <Section title="Foto">
        <p>Le foto della sala sono del 15 Palle. Non usarle senza il nostro permesso.</p>
      </Section>
    </LegalPage>
  )
}
