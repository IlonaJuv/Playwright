import { test, expect } from "@playwright/test";
import { TIMEOUT } from "dns";
const AxeBuilder = require('@axe-core/playwright').default;
import { createHtmlReport } from 'axe-html-reporter';
const { chromium } = require('playwright')
test("Email in wrong format", async ({ page }) => {



  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Login Test',
      'name': 'Login Test',
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true,
      'geoLocation': 'FI'
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })
  page = await browser.newPage();

  await page.goto("https://areena.yle.fi/tv");
  
  //await page.getByText('Hyväksy Kaikki').click();

  await page.getByRole("button", { name: "Kirjaudu", exact: true }).click();
  await new Promise(r => setTimeout(r, 1000));
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
    try {
      const results = await new AxeBuilder({ page }).analyze();

      createHtmlReport({
        results,
        options: {
          reportFileName: 'login_accessibility.html'
        }
      })
    } catch (e) {

    }
    await browser.close()
},{timeout: 60000});