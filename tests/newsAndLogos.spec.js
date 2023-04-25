import { test, expect } from "@playwright/test";
const AxeBuilder = require('@axe-core/playwright').default;
import { createHtmlReport } from 'axe-html-reporter';
const { chromium } = require('playwright')
test.describe("22:00 news program", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://areena.yle.fi/tv/opas");
        try {
              const results = await new AxeBuilder({ page }).analyze();

              createHtmlReport({
                results,
                options: {
                  reportFileName: 'NewsAndLogos.html'
                }
              })
            } catch (e) {

            }
  });

  test("has title", async ({ page }) => {

    const capabilities = {
      'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'newsAndLogos Test',
        'name': 'newsAndLogos Test',
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
    await page.goto("https://areena.yle.fi/tv/opas");
     //await page.getByText('Hyväksy Kaikki').click();
    await expect(page).toHaveTitle(
      "TV-opas | Ohjelmat tänään | Areena | yle.fi"
    );
    await browser.close()
  });

  test('has "Kymmenen uutiset" at 22.00', async ({ page }) => {
    await expect(page.getByText("Kymmenen uutiset")).not.toBeNull();
  
    await page.getByRole('checkbox', { name: 'Näytä menneet ohjelmat' }).check();
  
    expect(await page.getByRole('checkbox', { name: 'Näytä menneet ohjelmat' }).isChecked()).toBeTruthy();
  
  
    const elementHandle = await page.locator('.schedule-card__header:has-text("Kymmenen uutiset")');
    expect(await elementHandle.innerText()).toContain('22.00');
  
    await elementHandle.screenshot({ path: 'screenshot.png' });
  });

  test.describe("channel logos", () => {
    test("TV1", async ({ page }) => {
      const TV1 = await page.$('div[aria-label="Yle TV1"]');
      expect(TV1).not.toBeNull();
    });

    test("TV2", async ({ page }) => {
      const TV2 = await page.$('div[aria-label="Yle TV2"]');
      expect(TV2).not.toBeNull();
    });

    test("fem", async ({ page }) => {
      const fem = await page.$('div[aria-label="Yle Teema Fem"]');
      expect(fem).not.toBeNull();
    });

    test("mtv3", async ({ page }) => {
      const mtv3 = await page.$('div[aria-label="MTV3"]');
      expect(mtv3).not.toBeNull();
    });

    test("nelonen", async ({ page }) => {
      const nelonen = await page.$('div[aria-label="Nelonen"]');
      expect(nelonen).not.toBeNull();
    });

    test("sub", async ({ page }) => {
      const sub = await page.$('div[aria-label="Sub"]');
      expect(sub).not.toBeNull();

    });

    test("TV5", async ({ page }) => {
      const TV5 = await page.$('div[aria-label="TV5"]');
      expect(TV5).not.toBeNull();
    });

    test("Liv", async ({ page }) => {
      const liv = await page.$('div[aria-label="Liv"]');
      expect(liv).not.toBeNull();
    });

    test("JIM", async ({ page }) => {
      const jim = await page.$('div[aria-label="JIM"]');
      expect(jim).not.toBeNull();

    });
  });

});