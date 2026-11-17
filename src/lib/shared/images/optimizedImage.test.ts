import { describe, expect, it } from "vite-plus/test";
import { imageRemotePatterns, imageWidths } from "./config.js";
import { optimizedImage } from "./optimizedImage.js";

describe("optimizedImage", () => {
  const src = "https://dragonball-api.com/characters/goku.webp?version=1";

  it("uses configured Vercel URLs and responsive widths", () => {
    const result = optimizedImage(src, 320, true);
    const expectedUrl = (width: number) =>
      `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
    expect(result.src).toBe(expectedUrl(320));
    expect(result.srcset).toBe(
      imageWidths.map((width) => `${expectedUrl(width)} ${width}w`).join(", "),
    );
  });

  it.each(["characters", "planetas", "transformaciones", "transformations"])(
    "accepts the API image directory %s",
    (directory) => {
      expect(
        optimizedImage(`https://dragonball-api.com/${directory}/image.webp`, 160, true).src,
      ).toMatch(/^\/_vercel\/image\?/);
      expect(
        imageRemotePatterns.some(
          ({ hostname, pathname }) =>
            new RegExp(hostname).test("dragonball-api.com") &&
            new RegExp(pathname).test(`/${directory}/image.webp`),
        ),
      ).toBe(true);
    },
  );

  it("keeps the original source outside Vercel", () => {
    expect(optimizedImage(src, 320, false)).toEqual({ src });
  });

  it.each([
    "",
    "not a URL",
    "http://dragonball-api.com/characters/goku.webp",
    "https://dragonball-api.com.evil.example/characters/goku.webp",
    "https://dragonball-api.com:8443/characters/goku.webp",
    "https://user@dragonball-api.com/characters/goku.webp",
    "https://dragonball-api.com/characters/../api/characters",
    "https://dragonball-api.com/other/goku.webp",
  ])("does not send an unsupported URL to Vercel: %s", (source) => {
    expect(optimizedImage(source, 320, true)).toEqual({ src: source });
  });

  it("uses anchored remote hostname and path patterns", () => {
    for (const { hostname, pathname } of imageRemotePatterns) {
      expect(new RegExp(hostname).test("dragonball-api.com.evil.example")).toBe(false);
      expect(new RegExp(pathname).test("/other/characters/image.webp")).toBe(false);
    }
  });
});
