// Club data from the existing 15 Palle site and public sources:
// Alto Adige (2011, 2019), FIBIS news (2021-2024), FIBIS club register, AZBilliards (2011),
// Google Maps listing (rating as seen Oct 2026).
export const club = {
  name: "15 Palle",
  fullName: "Circolo sportivo 15 Palle",
  legalName: "A.S.D. 15 Quindici Palle",
  street: "Via Bruno Buozzi, 12",
  city: "39100 Bolzano BZ",
  phoneDisplay: "+39 392 810 0919",
  phoneTel: "+393928100919",
  email: "sala15palle@yahoo.it",
  facebook: "https://www.facebook.com/15pallebolzano.it",
  // PLACEHOLDERS: no Instagram account or tax code found online. Confirm with the club before going live.
  instagram: "https://www.instagram.com/15pallebolzano/",
  taxCode: "C.F. 00000000000",
  mapsHref: "https://maps.app.goo.gl/m9vFp5QStRofnNaJ9",
  mapsEmbed:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("Circolo sportivo 15 Palle, Via Bruno Buozzi, 12, 39100 Bolzano BZ") +
    "&output=embed",
}

export const TABLES = 34
export const GOOGLE_RATING = "4,5"
export const GOOGLE_REVIEWS = 259

export type ClubEvent = {
  /** "2026-10-25" for a set day, "2024-05" when only the month is known. */
  date: string
  time?: string
  title: string
  detail: string
  tag: string
}

// Upcoming: PLACEHOLDERS for the demo. Replace with the real calendar from the club.
// Past: national events hosted at Via Buozzi 12 (the 2011 finals were at the old hall, Via Giotto 21).
export const events: ClubEvent[] = [
  { date: "2026-10-25", time: "15:00", tag: "Palla 9", title: "Torneo sociale d'autunno", detail: "Aperto a tutti i soci. Iscrizioni al bancone entro venerdì." },
  { date: "2026-11-15", time: "14:30", tag: "Palla 8", title: "Domenica a coppie", detail: "Coppie sorteggiate, un esperto e un principiante. Si gioca fino alla finale." },
  { date: "2026-12-13", time: "16:00", tag: "Palla 8", title: "Torneo di Natale", detail: "Gara, cena e premiazione. Posti limitati." },
  { date: "2024-05", tag: "FIBIS", title: "Finali Campionati Italiani a squadre", detail: "Il primo tricolore pool della stagione 2023/24. 9 squadre." },
  { date: "2024-01", tag: "FIBIS", title: "Italy Cup of Pool, 4ª edizione", detail: "Vincono Corrieri e Cordelli. Lo stesso weekend: 3ª prova NBC e 2ª prova IPT Serie A." },
  { date: "2023-05", tag: "RAI Sport", title: "Finali Campionati Italiani Pool 8/15", detail: "Serie A, A2, B e C. Quattro giorni di gara, finali riprese da RAI Sport." },
  { date: "2023-05", tag: "Palla 9", title: "Italian Pool Tour, 6ª prova", detail: "Ultima tappa del tour. 32 Nazionali più Serie A e B." },
  { date: "2021-01", tag: "Palla 10", title: "Italian Pool Tour, 2ª prova", detail: "101 atleti: 26 Nazionali, 38 Serie A, 37 Serie B." },
  { date: "2019-01", tag: "Palla 8", title: "Campionato Italiano FIBIS, 2ª prova", detail: "160 iscritti, 8 tavoli in diretta streaming." },
  { date: "2011-06", tag: "Americana", title: "Finali nazionali di americana 8-15", detail: "128 giocatori da tutta Italia." },
]

const MONTHS = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
const MONTHS_LONG = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
const WEEKDAYS = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]

/** Pieces for the big date blocks: day (if known), short and long month, weekday, year. */
export function eventDate(e: ClubEvent) {
  const [y, m, d] = e.date.split("-").map(Number)
  const weekday = d ? WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] : undefined
  return { year: y, month: MONTHS[m - 1], monthLong: MONTHS_LONG[m - 1], day: d as number | undefined, weekday }
}

/** Upcoming (soonest first) and past (newest first), relative to an ISO day like "2026-10-10". */
export function splitEvents(today: string) {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))
  return {
    upcoming: sorted.filter((e) => e.date >= today),
    past: sorted.filter((e) => e.date < today).reverse(),
  }
}

/** Today's date in Bolzano as "YYYY-MM-DD". */
export function romeToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(new Date())
}

export const OPEN_AT = 14 * 60 + 30

// Index matches Date.getDay(): 0 = Sunday.
export const week = [
  { day: "Domenica", short: "Dom", close: "24:00" },
  { day: "Lunedì", short: "Lun", close: "1:00" },
  { day: "Martedì", short: "Mar", close: "1:00" },
  { day: "Mercoledì", short: "Mer", close: "1:00" },
  { day: "Giovedì", short: "Gio", close: "1:00" },
  { day: "Venerdì", short: "Ven", close: "1:00" },
  { day: "Sabato", short: "Sab", close: "1:00" },
]

/** Current weekday (0 = Sunday) and minutes after midnight in Bolzano. */
export function romeNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"))
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) }
}

export function openState(date = new Date()) {
  const { day, minutes } = romeNow(date)
  const yesterday = (day + 6) % 7
  // Still open until 1:00 after a Monday-Saturday evening.
  if (minutes < 60 && yesterday !== 0) return { open: true, until: "1:00" }
  if (minutes >= OPEN_AT) return { open: true, until: week[day].close }
  return { open: false, until: null }
}
