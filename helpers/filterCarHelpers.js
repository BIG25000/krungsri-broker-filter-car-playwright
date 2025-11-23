import { test, expect } from "@playwright/test";

test.use({ storageState: "storageState.json" });

export async function gotoCriteriaPage(page) {
  await page.goto(
    "https://insurance.krungsribroker.com/online/criteria?utm_source=kgib_website&utm_medium=m"
  );
  await expect(page.locator('[data-test-id="criteria-content"]')).toBeVisible();
}

export async function gotoToyotaAlphard2024Result(page) {
  if (!(await page.url()).includes("/online/criteria")) {
    await gotoCriteriaPage(page);
  }

  await page.locator('[data-test-id="car-brand-wrap-radio-card-0"]').click();

  await page
    .locator('[data-test-id="car-model-selectinput-text-field"]')
    .click();
  await page
    .locator('[data-test-id="car-model-selectinput-dropdown-card-item-2"]')
    .click();

  await page.locator('[data-test-id="year-group-text-field"]').click();
  await page
    .locator('[data-test-id="year-group-dropdown-card-item-4"]')
    .click();

  await page.locator('[data-test-id="car-submodel-text-field"]').click();
  await page
    .locator('[data-test-id="car-submodel-dropdown-card-item-0"]')
    .click();

  await page.locator('[data-test-id="car-licenseType-text-field"]').click();
  await page
    .locator('[data-test-id="car-licenseType-dropdown-card-item-0"]')
    .click();

  await page.locator('[data-test-id="next-page-button"]').click();

  await expect(page.locator('[data-test-id="sidebar-filter"]')).toBeVisible();
}

export async function scrollToBottom(page) {
  while (true) {
    const previousHeight = await page.evaluate(
      () => document.body.scrollHeight
    );

    // เลื่อนลงทีละ 1 หน้าจอ
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    // รอให้ของใหม่โหลด (lazy load)
    await page.waitForTimeout(1000);

    const newHeight = await page.evaluate(() => document.body.scrollHeight);

    // ถ้าความสูงไม่เพิ่มแล้ว แปลว่าโหลดครบแล้ว
    if (newHeight === previousHeight) break;
  }
}
