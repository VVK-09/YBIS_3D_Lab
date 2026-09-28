import { chromium } from "playwright";

async function main() {
  console.log("Launching Edge browser...");
  const browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log("Navigating to http://127.0.0.1:8080/ ...");
  await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  console.log("Waiting for preloader and dialog...");
  const enterBtn = page.getByRole("button", { name: /Enter 3D Lab/i });
  await enterBtn.waitFor({ state: "visible", timeout: 15000 });
  console.log("Clicking Enter 3D Lab...");
  await enterBtn.click();
  await enterBtn.waitFor({ state: "detached", timeout: 10000 });
  console.log("Dialog dismissed, lab loaded!");

  await page.waitForTimeout(3000);

  // Capture overview screenshot
  const overviewPath = "screenshots/monument_overview.png";
  await page.screenshot({ path: overviewPath });
  console.log("Saved screenshot:", overviewPath);

  // Slightly orbit/tilt camera to verify 3D depth and parallax
  const canvas = await page.$("canvas");
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 + 120, box.y + box.height / 2 - 50, { steps: 10 });
      await page.mouse.up();
      await page.waitForTimeout(2000);
      const orbitPath = "screenshots/monument_orbit.png";
      await page.screenshot({ path: orbitPath });
      console.log("Saved orbit screenshot:", orbitPath);
    }
  }

  await browser.close();
  console.log("DONE");
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
