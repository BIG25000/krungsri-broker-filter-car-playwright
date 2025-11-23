# Filter Car Type until Insurance Type – Playwright Test

This project is a Playwright test suite for the  
**“Filter Car Type until Insurance Type”** flow on the Krungsri Broker Insurance website.

---

## 1. Prerequisites

Before running the tests, please make sure you have:

1. **Node.js and npm**

   - Recommended Node.js version: **18 or later (LTS)**
   - npm comes bundled with Node.js
   - Check your versions with:
     ```bash
     node -v
     npm -v
     ```

2. **Git (optional but recommended)**

   - Used if you clone the project with `git clone`.

3. **Internet connection**

   - The tests run against the real website (no mocks).
   - You must be able to access:
     - `https://www.krungsribroker.com`
     - `https://insurance.krungsribroker.com`  
       (You must first visit `https://www.krungsribroker.com` and open the **Filter Car Type until Insurance Type** feature from there at least once, before you can access `https://insurance.krungsribroker.com` directly.)

4. **Allow pop-ups for the site**

   - The **“ประกันรถยนต์พร้อมซื้อ …”** link opens  
     `insurance.krungsribroker.com` in a new tab/window.
   - Pop-ups from `www.krungsribroker.com` must not be blocked.

5. **Supported OS**

   - Windows, macOS, or Linux that can run Chromium/Firefox/WebKit.

6. **Code editor (optional)**
   - Visual Studio Code is recommended, and you can install the Playwright extension to help with debugging.

---

## 2. Install Dependencies

After cloning or downloading the project, run:

```bash
# Initialize the Node project (if needed)
npm init

# Initialize Playwright in the project
npm init playwright@latest

# Run the test script
npx playwright test
```
# krungsri-broker-filter-car-playwright
