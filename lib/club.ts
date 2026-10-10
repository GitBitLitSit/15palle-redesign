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
  mapsHref: "https://maps.app.goo.gl/m9vFp5QStRofnNaJ9",
  mapsEmbed:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("Circolo sportivo 15 Palle, Via Bruno Buozzi, 12, 39100 Bolzano BZ") +
    "&output=embed",
}

export const TABLES = 34
export const GOOGLE_RATING = "4,5"
export const GOOGLE_REVIEWS = 259

// National events hosted at Via Buozzi 12 (the 2011 finals were at the old hall, Via Giotto 21).
export const events = [
  { when: "Mag 2024", title: "Finali Campionati Italiani a squadre", detail: "Il primo tricolore pool della stagione 2023/24. 9 squadre." },
  { when: "Gen 2024", title: "Italy Cup of Pool, 4ª edizione", detail: "Vincono Corrieri e Cordelli. Lo stesso weekend: 3ª prova NBC e 2ª prova IPT Serie A." },
  { when: "Mag 2023", title: "Finali Campionati Italiani Pool 8/15", detail: "Serie A, A2, B e C. Quattro giorni di gara, finali riprese da RAI Sport." },
  { when: "Mag 2023", title: "Italian Pool Tour, 6ª prova", detail: "Palla 9, ultima tappa del tour. 32 Nazionali più Serie A e B." },
  { when: "Gen 2021", title: "Italian Pool Tour, 2ª prova", detail: "Palla 10. 101 atleti: 26 Nazionali, 38 Serie A, 37 Serie B." },
  { when: "Gen 2019", title: "Campionato Italiano FIBIS, 2ª prova", detail: "Palla 8. 160 iscritti, 8 tavoli in diretta streaming." },
  { when: "Giu 2011", title: "Finali nazionali di americana 8-15", detail: "128 giocatori da tutta Italia." },
]

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
