import type { Metadata, Viewport } from "next"
import { Big_Shoulders, Barlow } from "next/font/google"
import "./globals.css"
import { MotionProvider } from "@/components/motion-provider"

// Industrial Chicago signage for display, highway-sign lettering for text.
const shoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-shoulders",
  display: "swap",
})

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "15 Palle · Biliardo e bar a Bolzano",
    template: "%s · 15 Palle",
  },
  description:
    "34 tavoli da biliardo e un bar in Via Bruno Buozzi 12, Bolzano. Aperti tutti i giorni dalle 14:30.",
}

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${shoulders.variable} ${barlow.variable}`} data-scroll-behavior="smooth">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
