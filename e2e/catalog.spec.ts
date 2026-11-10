import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    return url.hostname === "127.0.0.1" && url.port === "4179" ? route.continue() : route.abort();
  });
});

test("carrega dados controlados no SSR e navega até os detalhes", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Catálogo de personagens" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("link", { name: "Ver detalhes de Goku" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ver detalhes de Vegeta" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Ver detalhes de Goku" }).locator("img"),
  ).toHaveAttribute("src", "https://dragonball-api.com/characters/goku_normal.webp");

  await page.getByRole("link", { name: "Ver detalhes de Goku" }).click();
  await expect(page).toHaveURL(/\/characters\/1$/);
  await expect(page.getByRole("heading", { name: "Goku", level: 1 })).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Conheça Goku/);
  await expect(page.getByText("A Saiyan hero.")).toBeVisible();
  await expect(page.locator("main img")).toHaveCount(3);
  await expect(page.getByRole("img", { name: "Earth" })).toHaveAttribute(
    "src",
    "https://dragonball-api.com/planetas/Tierra_Dragon_Ball_Z.webp",
  );
});

test("busca personagem por nome e abre seus detalhes", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Buscar personagem" }).fill("vegeta");

  const search = page.getByRole("region", { name: "Busca de personagens" });
  await expect(search.locator("img")).toHaveAttribute(
    "src",
    "https://dragonball-api.com/characters/vegeta_normal.webp",
  );
  await search.getByRole("link", { name: /Vegeta/ }).click();
  await expect(page).toHaveURL(/\/characters\/2$/);
  await expect(page.getByRole("heading", { name: "Vegeta", level: 1 })).toBeVisible();
});

test("apresenta erro para personagem inexistente", async ({ page }) => {
  const response = await page.goto("/characters/999");

  expect(response?.status()).toBe(404);
  await expect(page.getByText("Personagem não encontrado.")).toBeVisible();
});

test("seleciona dois personagens e abre a comparação", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("article")
    .filter({ has: page.getByRole("link", { name: "Ver detalhes de Goku" }) })
    .getByRole("button", { name: "Comparar" })
    .click();
  await page
    .getByRole("article")
    .filter({ has: page.getByRole("link", { name: "Ver detalhes de Vegeta" }) })
    .getByRole("button", { name: "Comparar" })
    .click();
  await page.getByRole("link", { name: "Comparar Goku e Vegeta" }).click();

  await expect(page).toHaveURL(/\/versus\/1\/2$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Goku");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Vegeta");
  await expect(page.getByText(/Não é indicado um vencedor/)).toBeVisible();
  await expect(page.locator("main img")).toHaveCount(3);
});

test.describe("antes da hidratação", () => {
  test.use({ javaScriptEnabled: false });

  test("não permite selecionar personagens antes de iniciar a aplicação", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Comparar" })).toHaveCount(2);
    await expect(page.getByRole("button", { name: "Comparar" }).first()).toBeDisabled();
    await expect(page.getByRole("button", { name: "Comparar" }).last()).toBeDisabled();
  });
});
