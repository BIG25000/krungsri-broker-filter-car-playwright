// global-setup.js
const { chromium, expect } = require("@playwright/test");

module.exports = async (config) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://www.krungsribroker.com/", {
    waitUntil: "domcontentloaded",
  });

  await page.getByRole("button", { name: "ยอมรับ" }).click();

  const popupPromise = page
    .waitForEvent("popup", { timeout: 5000 })
    .catch(() => null);

  await page
    .getByRole("link", {
      name: "ประกันรถยนต์พร้อมซื้อ",
      exact: true,
    })
    .click();

  const popup = await popupPromise;
  const targetPage = popup || page;

  await targetPage.waitForURL(
    /insurance\.krungsribroker\.com\/online\/criteria.*/
  );

  //รอให้โหลด section
  await targetPage
    .locator('[data-test-id="criteria-content"]')
    .getByText("จะหาข้อมูลเหล่านี้ได้จากไหน ?")
    .waitFor();

  await expect(
    targetPage.locator('[data-test-id="criteria-content"]')
  ).toContainText("จะหาข้อมูลเหล่านี้ได้จากไหน ?");

  // เก็บ state ลงไฟล์
  await targetPage.context().storageState({ path: "storageState.json" });

  await browser.close();
};
