import { test, expect } from "@playwright/test";
import { TIMEOUT } from "dns";

test("Email in wrong format", async ({ page }) => {
  await page.goto("https://areena.yle.fi/tv");
  await page.getByRole("button", { name: "Kirjaudu", exact: true }).click();
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByRole("button", { name: "Luo Yle Tunnus" })
    .click();
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByLabel("Sähköposti")
    .fill("asdasdasd");
  await page
    .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
    .getByLabel("Sähköposti")
    .press("Tab");

  await expect(
    page
      .frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
      .getByText("Tarkista sähköpostiosoitteen muoto")
  ).toHaveText(/Tarkista sähköpostiosoitteen muoto./g);
},{timeout: 60000});