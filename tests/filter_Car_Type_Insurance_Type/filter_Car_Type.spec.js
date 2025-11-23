import { test, expect } from "@playwright/test";
import {
  gotoToyotaAlphard2024Result,
  scrollToBottom,
} from "../../helpers/filterCarHelpers";

test("FCT_001	Happy Path: Select TOYOTA ALPHARD 2024 and see Insurance Type", async ({
  page,
}) => {
  await gotoToyotaAlphard2024Result(page);

  await expect(page.locator('[data-test-id="sidebar-filter"]')).toContainText(
    "TOYOTA ALPHARD Van 4dr HV 2.5 A 2020"
  );

  const productCards = page.locator('[data-test-id="product-card"]');
  await expect(productCards.first()).toBeVisible();

  await expect(page.locator("section")).toContainText("18 ผลการค้นหา");
  await expect(page.getByRole("img", { name: "logo" }).nth(1)).toBeVisible();
  await expect(page.locator(".icon-agm-thumbs-up")).toBeVisible();
  await expect(
    page.locator('[data-test-id="motor-product-list"]')
  ).toContainText("ทุนประกัน");
  await expect(
    page.locator('[data-test-id="motor-product-list"]')
  ).toContainText("ค่าเสียหายส่วนแรก");
  await expect(
    page.locator('[data-test-id="motor-product-list"]')
  ).toContainText("ทรัพย์สินบุคคลภายนอก");
  await expect(
    page.locator('[data-test-id="motor-product-list"]')
  ).toContainText("ประเภทการซ่อม");
  await expect(
    page.locator('[data-test-id="motor-product-list"]')
  ).toContainText("เปรียบเทียบ");
  await expect(
    page.locator('[data-test-id="motor-product-list"]')
  ).toContainText("ซื้อแผนประกัน");
  await expect(
    page.locator('[data-test-id="motor-product-list"]')
  ).toContainText("ดูรายละเอียด");
});

test("FCT_002	Required Fields: Click Next without filling anything", async ({
  page,
}) => {
  await page.goto(
    "https://insurance.krungsribroker.com/online/criteria?utm_source=kgib_website&utm_medium=me"
  );

  await page.locator('[data-test-id="next-page-button"]').click();

  const carBrandCard = page.locator(
    '[data-test-id="car-brand-wrap-radio-card-0"]'
  );

  await expect(carBrandCard).toBeVisible();

  await expect(carBrandCard).toHaveCSS("border-color", "rgb(248, 113, 113)");
});

test("FCT_003	Age Calculation: Car age is calculated correctly", async ({
  page,
}) => {
  await page.goto(
    "https://insurance.krungsribroker.com/online/criteria?utm_source=kgib_website&utm_medium=me"
  );

  await page.locator('[data-test-id="car-brand-wrap-radio-card-0"]').click();
  await page
    .locator('[data-test-id="car-model-selectinput-text-field"]')
    .click();
  await page
    .locator('[data-test-id="car-model-selectinput-dropdown-card-item-2"]')
    .click();

  await page.locator('[data-test-id="year-group-text-field"]').click();

  const yearItem0 = page.locator(
    '[data-test-id="year-group-dropdown-card-item-0"]'
  );

  const yearCarText = (await yearItem0.innerText()).trim();
  // console.log("year item 0 =", yearCarText);

  await yearItem0.click();

  const baseYear = 2026;
  const expectedAge = baseYear - yearCarText;

  await expect(page.locator('[data-test-id="criteria-content"]')).toContainText(
    `${expectedAge} ปี`
  );
});

test("FCT_004	Change brand clears related fields", async ({ page }) => {
  await page.goto(
    "https://insurance.krungsribroker.com/online/criteria?utm_source=kgib_website&utm_medium=me"
  );

  await page.locator('[data-test-id="car-brand-wrap-radio-card-0"]').click();

  await page
    .locator('[data-test-id="car-model-selectinput-text-field"]')
    .click();
  await page
    .locator('[data-test-id="car-model-selectinput-dropdown-card-item-2"]')
    .click();

  await page.locator('[data-test-id="year-group-text-field"]').click();
  await page
    .locator('[data-test-id="year-group-dropdown-card-item-0"]')
    .click();

  await page.locator('[data-test-id="car-submodel-text-field"]').click();
  await page
    .locator('[data-test-id="car-submodel-dropdown-card-item-0"]')
    .click();

  await page.locator('[data-test-id="car-licenseType-text-field"]').click();
  await page
    .locator('[data-test-id="car-licenseType-dropdown-card-item-0"]')
    .click();

  await page.locator('[data-test-id="car-brand-wrap-radio-card-1"]').click();

  await expect(
    page.locator('[data-test-id="car-model-selectinput-wrap-icon-close"]')
  ).not.toBeVisible();
  await expect(
    page.locator('[data-test-id="year-group-wrap-icon-close"]')
  ).not.toBeVisible();
  await expect(
    page.locator('[data-test-id="car-submodel-wrap-icon-close"]')
  ).not.toBeVisible();
  await expect(
    page.locator('[data-test-id="car-licenseType-wrap-icon-close"]')
  ).not.toBeVisible();
});

test("FCT_005	Result - Default Insurance Class Filter", async ({ page }) => {
  await gotoToyotaAlphard2024Result(page);
  // checkbox
  await expect(page.locator('[data-test-id="all"]').first()).toBeChecked();
  await expect(page.locator('[data-test-id="2+"]')).toBeChecked();
  await expect(page.locator('[data-test-id="3+"]')).toBeChecked();
  await expect(page.locator('[data-test-id="all"]').nth(1)).toBeChecked();
  await expect(page.locator('[data-test-id="1"]')).toBeChecked();
  await expect(
    page.getByRole("radio", { name: "ผลิตภัณฑ์ที่แนะนำ" })
  ).toBeChecked();
  await expect(page.locator('[data-test-id="all"]').nth(2)).toBeChecked();
  await expect(page.locator('[data-test-id="VIRIYAH"]')).toBeChecked();
  // not-checkbox
  await expect(
    page.getByRole("radio", { name: "ราคาต่ำสุดไปสูงสุด" })
  ).not.toBeChecked();
  await expect(
    page.getByRole("radio", { name: "ราคาสูงสุดไปต่ำสุด" })
  ).not.toBeChecked();
});

test("FCT_006	Insurance Class Filter: Select only Class 3+", async ({
  page,
}) => {
  await gotoToyotaAlphard2024Result(page);

  await page.locator('[data-test-id="all"]').first().uncheck();
  await page.goto(
    "https://insurance.krungsribroker.com/online/catalogue?carBrand=TOYOTA&carLicenseType=110&carModel=ALPHARD&carSubModel=Van%204dr%20VIP%203.5%20A&objectiveKeyFromState=CP&page=1&productType=dummy%20for%20do%20not%20choose%20anything.&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&vehicleType=4W&yearGroup=2020&utm_source=kgib_website&utm_medium=menu&utm_campaign=mov_fullpayment"
  );
  await page.locator('[data-test-id="3+"]').check();
  await page.goto(
    "https://insurance.krungsribroker.com/online/catalogue?carBrand=TOYOTA&carLicenseType=110&carModel=ALPHARD&carSubModel=Van%204dr%20VIP%203.5%20A&objectiveKeyFromState=CP&page=1&productType=3%2B&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&vehicleType=4W&yearGroup=2020&utm_source=kgib_website&utm_medium=menu&utm_campaign=mov_fullpayment"
  );

  // มีการ์ดอย่างน้อย 1 ใบก่อน
  await expect(
    page.locator('[data-test-id="product-card"]').first()
  ).toBeVisible();

  // ทุก product-type ต้องเป็น "ชั้น 3+"
  const productTypes = page.locator('[data-test-id="product-type-text"]');

  const count = await productTypes.count();
  expect(count).toBeGreaterThan(0); // ถ้าอยากบังคับว่าต้องมีอย่างน้อย 1 อัน

  await expect(productTypes).toHaveText(Array(count).fill("ชั้น 3+"));
});

test("FCT_007	Repair Type Filter: Select only dealer repair", async ({
  page,
}) => {
  await gotoToyotaAlphard2024Result(page);
  await page.locator('[data-test-id="all"]').nth(1).uncheck();
  await page.goto(
    "https://insurance.krungsribroker.com/online/catalogue?carBrand=TOYOTA&carLicenseType=110&carModel=ALPHARD&carSubModel=Van%204dr%20VIP%203.5%20A&claimType=dummy%20for%20do%20not%20choose%20anything.&objectiveKeyFromState=CP&page=1&productType=2%2B&productType=3%2B&totalPremiumMax=13000&totalPremiumMin=7000&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_campaign=mov_fullpayment&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_medium=menu&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&utm_source=kgib_website&vehicleType=4W&yearGroup=2020&utm_source=kgib_website&utm_medium=menu&utm_campaign=mov_fullpayment"
  );
  await expect(page.locator("section")).toContainText(
    "ไม่พบแผนประกันที่ท่านค้นหา"
  );
  await expect(
    page.getByRole("button", { name: "ให้เจ้าหน้าที่ติดต่อกลับ", exact: true })
  ).toBeVisible();
});

test("FCT_008	Price Range Filter: Decrease price range", async ({ page }) => {
  await gotoToyotaAlphard2024Result(page);

  const slider = page.getByRole("slider");

  await slider.fill("7000");

  const sliderValue = Number(await slider.inputValue());
  // console.log(sliderValue);

  const premiumLocator = page.locator('[data-test-id="premium"]');
  await page.waitForTimeout(3000);
  await expect(premiumLocator).toBeVisible();

  const premiumText = (await premiumLocator.innerText()).trim();
  // console.log(premiumText);
  const premiumNumber = parseFloat(premiumText.replace(/[^\d.]/g, ""));
  // console.log(premiumNumber);

  expect(premiumNumber).toBeLessThanOrEqual(sliderValue);
});

test("FCT_009	Sorting: Price low to high", async ({ page }) => {
  await gotoToyotaAlphard2024Result(page);
  await page.getByRole("radio", { name: "ราคาต่ำสุดไปสูงสุด" }).click();
  await page.goto(
    "https://insurance.krungsribroker.com/online/catalogue?carBrand=TOYOTA&carLicenseType=110&carModel=ALPHARD&carSubModel=Van%204dr%20VIP%203.5%20A&objectiveKeyFromState=CP&sorting=ascending&utm_campaign=mov_fullpayment&utm_medium=menu&utm_source=kgib_website&vehicleType=4W&yearGroup=2020&utm_source=kgib_website&utm_medium=menu&utm_campaign=mov_fullpayment"
  );

  // รอให้มี premium อย่างน้อย 1 ตัว
  const premiumLocator = page.locator('[data-test-id="premium"]');
  await expect(premiumLocator.first()).toBeVisible();

  // ดึง text ของราคาทั้งหมด
  const premiumTexts = await premiumLocator.allInnerTexts();

  // แปลง text -> number เช่น "6,600.00 บาท/ปี" => 6600
  const prices = premiumTexts.map((raw) => {
    const match = raw.replace(/\s/g, "").match(/([\d,.]+)/); // ดึงเฉพาะ "6,600.00"
    const numeric = match[1].replace(/,/g, ""); // "6,600.00" -> "6600.00"
    return Number(numeric);
  });

  // ต้องมีอย่างน้อย 1 ราคา
  expect(prices.length).toBeGreaterThan(0);

  // สร้าง array ที่ sort แล้วไว้เทียบ
  const sorted = [...prices].sort((a, b) => a - b);

  // เช็คว่าลำดับที่เจอเท่ากับลำดับที่ sort แล้ว => เรียงจากน้อยไปมากจริง
  expect(prices).toEqual(sorted);
});

test("FCT_010	Result Count Matches Cards", async ({ page }) => {
  await gotoToyotaAlphard2024Result(page);

  await expect(page.locator("section")).toContainText("18 ผลการค้นหา");

  const resultSection = page.locator('section:has-text("ผลการค้นหา")').first();
  await expect(resultSection).toBeVisible();

  const text = await resultSection.innerText();
  const match = text.match(/(\d+)\s*ผลการค้นหา/);

  const expectedCount = Number(match[1]); // เลข 18 จากข้อความ

  const productCards = await page
    .locator('[data-test-id="product-card"]')
    .count();

  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(800); // รอให้การ์ดใหม่โหลด
  }
  const cardsFrom7 = await page.locator("div:nth-child(n+7) > .card").count();
  // console.log(cardsFrom7);
  // console.log(expectedCount);
  // console.log(productCards);
  expect(productCards + cardsFrom7).toBe(expectedCount);
});

test("FCT_011	Change Criteria and Result changes", async ({ page }) => {
  await gotoToyotaAlphard2024Result(page);

  await expect(page.locator('[data-test-id="sidebar-filter"]')).toContainText(
    "TOYOTA ALPHARD Van 4dr HV 2.5 A 2020"
  );
  await page.getByRole("button", { name: " แก้ไขข้อมูลรถยนต์" }).click();

  await page.waitForTimeout(3000);

  await page
    .locator('[data-test-id="car-model-selectinput-wrap-icon-close"]')
    .click();
  await page.locator('[data-test-id="car-brand-wrap-radio-card-2"]').click();
  await page
    .locator('[data-test-id="car-model-selectinput-text-field"]')
    .click();
  await page
    .locator('[data-test-id="car-model-selectinput-dropdown-card-item-0"]')
    .click();
  await page.locator('[data-test-id="year-group-text-field"]').click();
  await page
    .locator('[data-test-id="year-group-dropdown-card-item-0"]')
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

  // await page.waitForTimeout(3000);

  await expect(
    page.locator('[data-test-id="sidebar-filter"]')
  ).not.toContainText("TOYOTA ALPHARD Van 4dr HV 2.5 A 2020");

  await expect(page.locator('[data-test-id="sidebar-filter"]')).toContainText(
    "HONDA ACCORD Sedan 4dr e:HEV 2.0 A 2024"
  );
});
