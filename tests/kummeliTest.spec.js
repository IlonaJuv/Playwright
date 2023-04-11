const { test, expect } = require('@playwright/test');

test('Find fifth episode of third season', async ({ page }) => {
  await page.goto('https://areena.yle.fi/1-3339547');

  const seasonElement = await page.locator('li.DesktopDropdown_item__QxPNK:nth-child(3) button.AlternateButton_root__5TY0i');
  await seasonElement.click();

  const episodeElement = await page.locator('section > div > div > div > div:nth-child(2) > div > ul > li:nth-child(5)');

  const episodeName = await episodeElement.locator('div > div:nth-child(2) > h3 > a').innerText();
  const episodeDate = await episodeElement.locator('div > div:nth-child(2) > div > div > span:nth-child(2)').innerText();

  expect(episodeName).toContain('5. Kummeli');
  expect(episodeDate).toContain('ti 8.3.2016');
});