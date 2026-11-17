import adapter from "@sveltejs/adapter-auto";
import vercel from "@sveltejs/adapter-vercel";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig, lazyPlugins } from "vite-plus";
import { imageWidths, imageRemotePatterns } from "./src/lib/shared/images/config.js";

const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  define: {
    "import.meta.env.VITE_VERCEL_IMAGE_OPTIMIZATION": JSON.stringify(isVercel ? "true" : "false"),
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "server",
          environment: "node",
          setupFiles: ["./src/lib/core/msw/setup.server.ts"],
          include: ["src/**/*.test.ts"],
          exclude: ["src/**/components/**"],
        },
      },
      {
        // A condição "browser" exigida pelo Svelte nos testes de componentes quebra o MSW Node.
        extends: true,
        plugins: [svelteTesting()],
        test: {
          name: "components",
          environment: "jsdom",
          include: ["src/**/components/**/*.test.ts"],
        },
      },
    ],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  plugins: lazyPlugins(() => [
    tailwindcss(),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },

      adapter: isVercel
        ? vercel({
            images: {
              sizes: [...imageWidths],
              domains: [],
              remotePatterns: imageRemotePatterns,
              formats: ["image/webp"],
              minimumCacheTTL: 86400,
            },
          })
        : adapter(),
    }),
  ]),
});
