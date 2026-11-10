import { imageDirectories, imageWidths } from "./config.js";

export function optimizedImage(
  src: string,
  fallbackWidth: (typeof imageWidths)[number],
  enabled = !import.meta.env.DEV && import.meta.env.VITE_VERCEL_IMAGE_OPTIMIZATION === "true",
): { src: string; srcset?: string } {
  if (!enabled || !URL.canParse(src)) return { src };

  const parsed = new URL(src);
  const allowed =
    parsed.protocol === "https:" &&
    parsed.hostname === "dragonball-api.com" &&
    !parsed.port &&
    !parsed.username &&
    !parsed.password &&
    imageDirectories.some((directory) => parsed.pathname.startsWith(`/${directory}/`));
  if (!allowed) return { src };

  const url = (width: number) => `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;

  return {
    src: url(fallbackWidth),
    srcset: imageWidths.map((width) => `${url(width)} ${width}w`).join(", "),
  };
}
