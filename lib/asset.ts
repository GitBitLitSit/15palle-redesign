// On GitHub Pages the site lives under /15palle-redesign. next/image does not add the base path to
// plain string sources, so every file in /public goes through this helper.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export const asset = (path: string) => `${BASE_PATH}${path}`
