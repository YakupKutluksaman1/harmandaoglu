import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "media", "katalog");
const outFile = path.join(outDir, "harmandaoglu-katalog-2026.pdf");
const pdfPath = "/katalog/pdf?export=1"; // iç üretim; kullanıcı /katalog → PDF indir
const fallbackPort = "3099";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function canOpenPdf(baseUrl) {
  const url = `${baseUrl}${pdfPath}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return false;
    const html = await res.text();
    return html.includes("catalog-page");
  } catch {
    return false;
  }
}

async function resolveBaseUrl() {
  if (process.env.CATALOG_BASE_URL) {
    return process.env.CATALOG_BASE_URL.replace(/\/$/, "");
  }

  const ports = process.env.CATALOG_PORT
    ? [process.env.CATALOG_PORT]
    : ["3000", "3001", "3002"];

  for (const port of ports) {
    const base = `http://127.0.0.1:${port}`;
    if (await canOpenPdf(base)) {
      console.log(`Sunucu bulundu: ${base}`);
      return base;
    }
  }

  try {
    await access(path.join(root, ".next", "BUILD_ID"));
  } catch {
    throw new Error(
      "Çalışan sunucu yok ve .next build bulunamadı.\n" +
        "  npm run build\n" +
        "  npm run dev   (veya npm run start)\n" +
        "  npm run catalog:pdf",
    );
  }

  console.log(`Geçici sunucu başlatılıyor (port ${fallbackPort})…`);
  const child = spawn(
    "npm run start -- -p " + fallbackPort,
    [],
    { cwd: root, stdio: "ignore", shell: true, env: { ...process.env, PORT: fallbackPort } },
  );

  const base = `http://127.0.0.1:${fallbackPort}`;
  for (let i = 0; i < 45; i++) {
    if (await canOpenPdf(base)) {
      return { base, child };
    }
    await sleep(1000);
  }

  child.kill();
  throw new Error("Geçici sunucu açılamadı (next start).");
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const resolved = await resolveBaseUrl();
  const baseUrl = typeof resolved === "string" ? resolved : resolved.base;
  const tempChild = typeof resolved === "object" ? resolved.child : null;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1123, height: 794 });

  const url = `${baseUrl}${pdfPath}`;
  console.log(`Opening ${url} …`);

  const response = await page.goto(url, {
    waitUntil: "networkidle",
    timeout: 120_000,
  });

  if (!response || !response.ok()) {
    await browser.close();
    if (tempChild) tempChild.kill();
    throw new Error(
      `Sayfa açılamadı (HTTP ${response?.status() ?? "?"}). /katalog/pdf rotası yok veya eski sunucu çalışıyor.`,
    );
  }

  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts?.ready);
  const count = await page.locator("section.catalog-page").count();
  if (count < 1) {
    await browser.close();
    if (tempChild) tempChild.kill();
    throw new Error(
      "Katalog sayfası render edilmedi (404 veya eski build). npm run build sonrası tekrar deneyin.",
    );
  }

  await page.waitForTimeout(600);

  await page.pdf({
    path: outFile,
    format: "A4",
    landscape: true,
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    preferCSSPageSize: true,
    scale: 1,
  });

  await browser.close();
  if (tempChild) tempChild.kill();

  console.log(`\nKatalog PDF: ${outFile}\n`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});