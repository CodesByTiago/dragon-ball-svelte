import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const target = process.argv[2] ?? "http://127.0.0.1:5173/";

let url;
try {
  url = new URL(target);
} catch {
  console.error("Informe uma URL HTTP ou HTTPS absoluta para a auditoria.");
  process.exit(1);
}

if (!["http:", "https:"].includes(url.protocol) || process.argv.length > 3) {
  console.error("Uso: pnpm audit:seo [URL HTTP ou HTTPS]");
  process.exit(1);
}

const chromePath = chromium.executablePath();
if (!existsSync(chromePath)) {
  console.error("Chromium não encontrado. Execute: pnpm exec playwright install chromium");
  process.exit(1);
}

const cli = fileURLToPath(import.meta.resolve("lighthouse/cli/index.js"));
const result = spawnSync(
  process.execPath,
  [
    cli,
    url.href,
    "--chrome-flags=--headless",
    "--output=html",
    "--output-path=./lighthouse-report.html",
  ],
  { env: { ...process.env, CHROME_PATH: chromePath }, stdio: "inherit" },
);

if (result.error) {
  console.error("Não foi possível iniciar o Lighthouse:", result.error.message);
  process.exit(1);
}

if (result.status === null) {
  console.error(`Lighthouse interrompido pelo sinal ${result.signal}.`);
  process.exit(1);
}

process.exit(result.status);
