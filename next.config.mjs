import { fileURLToPath } from "node:url"
import { dirname } from "node:path"

// Set by the GitHub Pages workflow (e.g. "/15palle-redesign"); empty for local development.
const basePath = process.env.PAGES_BASE_PATH ?? ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  // The build date lets the static page split upcoming/past events before the browser corrects it.
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10) },
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  // GitHub Pages is static hosting, so there is no image optimizer; the photos are already small webp files.
  images: { unoptimized: true },
}

export default nextConfig
